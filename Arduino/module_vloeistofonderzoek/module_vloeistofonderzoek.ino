#include "lpp.h"
#include "Led.h"
#include <Arduino.h>
#include <printf.h>
#include <SPI.h>
#include <nRF24L01.h>       // to handle this particular modem drive
#include "RF24.h"           // the library which helps us to control the radio mode
#include "Temperature.h"    // temperatuur header file
#include "Pump.h"           // Pump C header file
#include "ServoControl.h"   // ServoControl C header file

#define LEDPIN 4            
#define NOACK_PIN 2         // Digital pin to flag NOACK received by nRF2
#define CE_PIN 7            // RF-NANO usb-c, Arduino-uno -> 7, RF-NANO micro-usb -> 9
#define CSN_PIN 8           // RF-NANO usb-c, Arduino-uno -> 8, RF-NANO micro-usb -> 1

// Initialise sensors
DS18B20Sensor tempSensor;

// Initialise actuators
Led led;
int ledState = LOW;         // ledState used to set the LED
Led nRF24Led;               

#define RF24_PAYLOAD_SIZE 32
#define AAAD_ARO 2
#define AAAD_MODULE 3

RF24 radio(CE_PIN, CSN_PIN);

const uint8_t rf24_channel[] = {100,105,110,115,120}; 	             // Radio channels set depending on satellite number
const uint64_t addresses[] = {
  0x4141414430LL, 0x4141414431LL, 0x4141414432LL,
  0x4141414433LL, 0x4141414434LL, 0x4141414435LL                     // with radioNumber set to zero, the tx pipe will be 'AAAD0', which is basically HEX'4141414430', which is remote DESTINATION address for our transmitted data. The rx pipe code is the local receive address, which is what the remote device needs to set for the remote devices 'tx' pipe code.
};

uint8_t txData[RF24_PAYLOAD_SIZE];
uint8_t rxData[RF24_PAYLOAD_SIZE];
uint8_t bytes;

// Timing configuration
unsigned long previousMillis = 0;                                     // will store last time LED was update
unsigned long currentMillis;
unsigned long sampleTime = 1000;                                      // milliseconds of on-tim

// int to hex converter
void print2Hex(unsigned v) {
  Serial.print("0123456789ABCDEF"[v >> 4]);
  Serial.print("0123456789ABCDEF"[v & 0xF]);
}

void setup() {

  Serial.begin(9600);
  Serial.println("\n\nnRF24 Application ARO" + String(AAAD_ARO) + ", Module" + String(AAAD_MODULE) + " Started!\n");

  // Activate actuators
  led.begin(LEDPIN);
  led.setState(ledState);
  nRF24Led.begin(NOACK_PIN);
  nRF24Led.setState(LOW);

  // Activate temperature sensor
  tempSensor.begin();

  // Activate pump
  pumpSetup();

  // Activate servo
  servoSetup();

  // Activate Radio
  printf_begin();
  SPI.begin();
  radio.begin();                                                     // Ativate the modem
  radio.setAddressWidth(5);                                          // Set Address width
  radio.setRetries(15, 15);                                          // delaytime 4000uS and retry count is 1
  radio.setPayloadSize(RF24_PAYLOAD_SIZE);    
  radio.setPALevel(RF24_PA_HIGH, 1);                                 // Set the PA Level low to prevent power supply related issues
  radio.setDataRate(RF24_250KBPS);                                   // choosing 250K bit per second radio frequency data rate
  radio.setChannel(rf24_channel[AAAD_ARO]);
  radio.openWritingPipe(addresses[AAAD_MODULE]);
  radio.openReadingPipe(1, addresses[AAAD_MODULE]);

  Serial.println("\nnRF24 Setup Initialized");
  radio.printDetails();
  delay(500);
  radio.startListening();
}

void loop() {

  currentMillis = millis();                                         // check of het tijd is voor een update

    if (currentMillis - previousMillis >= sampleTime) {

    // Vraag tijd op
    unsigned long timeStamp = millis() / 1000;                      

    // Vraag temperatuur op
    float tempC = tempSensor.getTemperature();
    int16_t tempLpp = tempC * 10;

    // Start met bouwen van de payload
    uint8_t cursor = 0;

    // UnixTime aan payload toevoegen
    txData[cursor++] = 1;                                           // Kanaal nummer 1
    txData[cursor++] = LPP_UNIXTIME;                                // Datatype LPP_UNIXTIME (133)
    txData[cursor++] = timeStamp >> 24;
    txData[cursor++] = timeStamp >> 16;
    txData[cursor++] = timeStamp >> 8;
    txData[cursor++] = timeStamp;

    // Temperatuur aan payload toevoegen
    txData[cursor++] = 2;                                           // Kanaal nummer 2
    txData[cursor++] = LPP_TEMPERATURE;                             // Datatype LPP_TEMPERATURE (103)
    txData[cursor++] = tempLpp >> 8;                                // high byte
    txData[cursor++] = tempLpp & 0xFF;                              // low byte

    while (cursor < RF24_PAYLOAD_SIZE) {txData[cursor++] = 0;}      // Rest opvullen met nullen tot 32 bytes.

/****************** Transmit Mode ***************************/

    // Print transmit data in Hex format
    Serial.print("txData: ");
    for (size_t i = 0; i < cursor; ++i) {
      if (i != 0) Serial.print(" ");
      print2Hex(txData[i]);
    }
    Serial.println();

    radio.stopListening();                                           // First, stop listening so we can talk

    // Transmit data to radio
    if (radio.write(&txData, sizeof(txData))) {
      Serial.println("ACK received!");
      nRF24Led.setState(LOW);                                        // Clear led to signal there is communicatio
    } else {
      Serial.println("No ACK received!");
      nRF24Led.setState(HIGH);                                       // Set led to signal no communicatio
    }

    radio.startListening();                                          // Now, continue listening
    previousMillis = currentMillis;
  }

  /****************** Receive Mode ***************************/

  if (radio.available()) {                                           //'available' means whether valid bytes have been received and are waiting to be read from the receive buffe
    while (radio.available()) {                                      // While there is data read
      bytes = radio.getPayloadSize();
      radio.read(rxData, bytes);                                     // read value from the configured pip
    }

    // Print received data in Hex format
    Serial.print("rxData: ");
    for (size_t i = 0; i < RF24_PAYLOAD_SIZE; ++i) {
      if (i != 0) Serial.print(" ");
      print2Hex(rxData[i]);
    }
    Serial.println();

    // Switch led on Received command for channel 1 
    if (rxData[0] == 1 && rxData[1] == LPP_DIGITAL_OUTPUT) {          // [0] = channelnumber
      if (rxData[2] == 0xFF) {                                        // [1] = datatype
        Serial.println("Led=ON");                                     // [2] = value 
        led.setState(HIGH);                                           // 255 decimal   =   0xFF Hexadecimal
      }                                                               // 0 decimal     =   0 hexadecimal
      if (rxData[2] == 0x7F) {
        Serial.println("Led=OFF");
        led.setState(LOW);
      }
    }

    // activate pump on received command
    if (rxData[0] == 2 && rxData[1] == LPP_DIGITAL_OUTPUT) {
      if (rxData[2] == 0xFF ){
        pumpIntoModule();
      }
      if (rxData[0] == 2 && rxData[1] == LPP_DIGITAL_OUTPUT) {
        if (rxData[2] == 0){
          unloadLiquidFromModule();
        }
      }
    }

    //activate servo on received command
    if (rxData[0] == 3 && rxData[1] == LPP_DIGITAL_OUTPUT) {
      if (rxData[2] == 0xFF ){
        unfoldModule();
      }
      if (rxData[0] == 3 && rxData[1] == LPP_DIGITAL_OUTPUT){
        if (rxData[2] == 0){
          foldModule();
        }
      }
    }


  }
}   // Loop
