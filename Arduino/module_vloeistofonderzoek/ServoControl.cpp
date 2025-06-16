#include <Arduino.h>
#include <Servo.h>
#include "ServoControl.h"

static Servo servo1;
static Servo servo2;
const int SERVO1_PIN = 9; 
const int SERVO2_PIN = 10;

void servoSetup() {

    servo1.attach(SERVO1_PIN);
    servo2.attach(SERVO2_PIN);

    servo1.write(0);
    servo2.write(180);

}

void unfoldModule() {
    
    // Servo2: van 0 naar 65 graden
    for (int pos = 180; pos >= 90; pos--) {
        servo2.write(pos);
        delay(15);
    }
    

    // Servo1: van 0 naar 75 graden
    for (int pos = 0; pos <= 75; pos++) {
        servo1.write(pos);
        delay(15);
    }
    
}

void foldModule() {

    // Servo1: van 75 terug naar 0 graden
    for (int pos = 75; pos >= 0; pos--) {
        servo1.write(pos);
        delay(15);
    }

    // Servo2: van 90 terug naar 180 graden
    for (int pos = 90; pos <= 180; pos++) {
        servo2.write(pos);
        delay(15);
    }
}



