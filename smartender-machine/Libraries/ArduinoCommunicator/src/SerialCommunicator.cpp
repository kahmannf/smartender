/* 
* SerialCommunicator.cpp
*
* Created: 25.07.2018 17:22:59
* Author: Laptop
*/


#include "../include/SerialCommunicator.h"


SerialCommunicator::SerialCommunicator()
{
  this->init(9600, SERIAL_8N1);
}

SerialCommunicator::SerialCommunicator(unsigned long baud, uint8_t config)
{
  this->init(baud, config);
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
  int isAvailable = Serial.available();
  return isAvailable;
}

int SerialCommunicator::read()
{
  int value = Serial.read();
  return value;
}

// default destructor
SerialCommunicator::~SerialCommunicator()
{
  Serial.end();
} //~SerialCommunicator
