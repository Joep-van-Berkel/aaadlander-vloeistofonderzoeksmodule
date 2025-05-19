#ifndef TEMPERATURE_H
#define TEMPERATURE_H

#include <OneWire.h>
#include <DallasTemperature.h>

// Aansluiting van de DS18B20 op pin 2
#define ONE_WIRE_BUS 2

class DS18B20Sensor {
  private:
    OneWire oneWire;
    DallasTemperature sensors;

  public:
    // Constructor initialiseert OneWire en DallasTemperature
    DS18B20Sensor() : oneWire(ONE_WIRE_BUS), sensors(&oneWire) {}

    // Start communicatie met de sensor
    void begin() {
      sensors.begin();
    }

    // Lees de temperatuur uit in graden Celsius
    float getTemperature() {
      sensors.requestTemperatures();
      return sensors.getTempCByIndex(0);  // Leest temperatuur van eerste sensor op de bus
    }
};

#endif
