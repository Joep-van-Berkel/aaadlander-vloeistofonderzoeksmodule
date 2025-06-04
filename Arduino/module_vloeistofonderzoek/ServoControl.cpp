#include <Arduino.h>
#include <Servo.h>
#include "ServoControl.h"

static Servo servo1;
static Servo servo2;
const int SERVO1_PIN = 9; 
const int SERVO2_PIN = 10;

void servoSetup() {

    servo1.write(0);
    servo2.write(180);
}

void unfoldModule() {
    
    // Servo1: van 0 naar 65 graden
    servo2.attach(SERVO2_PIN);
    for (int pos = 180; pos >= 90; pos--) {
        servo2.write(pos);
        delay(15);
    }
    servo2.detach();

    // Servo1: van 0 naar 65 graden
    servo1.attach(SERVO1_PIN);
    for (int pos = 0; pos <= 65; pos++) {
        servo1.write(pos);
        delay(15);
    }
    servo1.detach();
}

void foldModule() {

    // Servo1: van 65 terug naar 0 graden
    servo1.attach(SERVO1_PIN);
    for (int pos = 65; pos >= 0; pos--) {
        servo1.write(pos);
        delay(15);
    }
    servo1.detach();

    // Servo2: van 90 terug naar 180 graden
    servo2.attach(SERVO2_PIN);
    for (int pos = 90; pos <= 180; pos++) {
        servo2.write(pos);
        delay(15);
    }
    servo2.detach();
}



