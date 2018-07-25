/* 
* SerialCommunicator.cpp
*
* Created: 25.07.2018 17:22:59
* Author: Laptop
*/


#include "../include/SerialCommunicator.h"


SerialCommunicator::SerialCommunicator()
{
  init(9600, SERIAL_8N1);
}

SerialCommunicator::SerialCommunicator(unsigned long baud, uint8_t config)
{
  init(baud, config);
} 

void SerialCommunicator::init(unsigned long baud, uint8_t config)
{
  Serial.begin(baud, config);
}

void SerialCommunicator::send(int value)
{
  Serial.write(value);
}

int SerialCommunicator::available()
{
  return Serial.available();
}

int SerialCommunicator::read()
{
  return Serial.read();
}

// default destructor
SerialCommunicator::~SerialCommunicator()
{
  Serial.end();
} //~SerialCommunicator
