/*
 * SmartenderArduino.cpp
 *
 * Created: 25.07.2018 16:00:27
 * Author : Felix Kahmann
 */ 

#define F_CPU 16000000UL

#include <avr/io.h>
#include "../../Libraries/ArduinoCore/include/core/Arduino.h"
#include "../../Libraries/SASP/include/SASP_Interpreter.h"

int main(void)
{
  SASP_Interpreter * interpreter = new SASP_Interpreter(9600, SERIAL_8N1);
  
  /* Replace with your application code */
  while (1) 
  {
    interpreter
  }
}

