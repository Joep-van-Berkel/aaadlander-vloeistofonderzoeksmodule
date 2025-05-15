#include "Led.h"
#include <Arduino.h>

Led::Led() {}
Led::~Led() {}

void Led::begin(int pin) {
  _pin = pin;
  pinMode(pin, OUTPUT);
}

bool Led::getState() {
  return _ledState;
}

void Led::setState(bool state) {
  _ledState = state;
  digitalWrite(_pin, state);
}
