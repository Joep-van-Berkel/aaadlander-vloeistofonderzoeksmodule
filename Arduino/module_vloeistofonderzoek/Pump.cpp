#include <Arduino.h>
#include "Pump.h"

const int motorPin1 = 9;
const int motorPin2 = 10;
int speed = 150;

void pumpSetup() {
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
}

void pumpIntoModule() {
  analogWrite(motorPin2, 0);
  analogWrite(motorPin1, speed);
  delay(3000);
  analogWrite(motorPin1, 0);
}

void unloadLiquidFromModule() {
  analogWrite(motorPin1, 0);
  analogWrite(motorPin2, 250);
  delay(3000);
  analogWrite(motorPin2, 0);
}
