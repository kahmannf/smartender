/*
 * SmartenderArduino.cpp
 *
 * Created: 25.07.2018 16:00:27
 * Author : Felix Kahmann
 */ 

#define F_CPU 16000000UL

#define SASP_VERSION 0

#include <avr/io.h>
#include "../../Libraries/ArduinoCore/include/core/Arduino.h"
#include "../../Libraries/SASP/include/SASP_Interpreter.h"
#include "../../Libraries/ArduinoCommunicator/include/ArduinoCommunicator.h"
#include "../../Libraries/ArduinoCommunicator/include/SerialCommunicator.h"

int main(void)
{
  init();
  
  // intialize communicator
  ArduinoCommunicator * communicator = new SerialCommunicator(9600, SERIAL_8N1);
  
  //initialize SASP-components
  
  SASP_Interpreter * interpreter = new SASP_Interpreter(communicator);

  
  
  
  // set pins 2 - 7 to output, pin 0 (RX) and 1 (TX) keep their value
  DDRD |= 0b11111100;
  // set pins 8 - 13 to output, the two high bits are mapped to crystal pins and not usable
  DDRB |= 0b00111111;
  
  // bits associated with the pins that are set to output above are set to 1 
  // which result in a low value in the relay
  PORTD |=  0b11111100;
  PORTB |=  0b00111111;
  
  int high = 0;
  
  //main program loop
  while (1) 
  {
    interpreter->do_cycle();
    
    //if(high)
    //{
      //PORTD |= (1<<(5));
      //high = 0;
    //}
    //else
    //{
      //PORTD &= ~(1<<(5));
      //high = 1;
    //}
    //_delay_ms(1000);
  }
}

