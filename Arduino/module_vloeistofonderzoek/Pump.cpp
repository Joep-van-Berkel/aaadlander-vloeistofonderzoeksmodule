#include <Arduino.h>
#include "Pump.h"

const int motorPin1 = 6;
const int motorPin2 = 5;
int speed = 100;

void pumpSetup() {
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
}

void pumpStop(){
  analogWrite(motorPin1, 0);
  analogWrite(motorPin2, 0);
}

void pumpIntoModule() {
  analogWrite(motorPin2, 0);
  analogWrite(motorPin1, speed);
  delay(5000);

  pumpStop();
}

void unloadLiquidFromModule() {
  analogWrite(motorPin1, 0);
  analogWrite(motorPin2, speed);
  delay(5000);

  pumpStop();
}

