#include <Arduino.h>
#include <Servo.h>
#include "ServoControl.h"

static Servo myServo;
const int SERVO_PIN = 10; // pas aan naar de juiste pin

void servoSetup() {
    myServo.attach(SERVO_PIN);
    myServo.write(0); // startpositie
}

void unfoldModule() {
    myServo.write(90); // open
}

void foldModule() {
    myServo.write(0); // dicht
}
