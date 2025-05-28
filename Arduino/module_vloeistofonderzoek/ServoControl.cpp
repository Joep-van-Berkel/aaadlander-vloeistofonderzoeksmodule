#include <Arduino.h>
#include <Servo.h>
#include "ServoControl.h"

static Servo myServo;
const int SERVO_PIN = 9; // pas aan naar de juiste pin

void servoSetup() {
    myServo.attach(SERVO_PIN);
    myServo.write(0); // startpositie
}

void unfoldModule() {
    Serial.println("Servo unfold!");

    myServo.write(90); // open
}

void foldModule() {
    Serial.println("Servo fold!");

    myServo.write(0); // dicht
}
