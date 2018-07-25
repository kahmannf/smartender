/* 
* SerialCommunicator.h
*
* Created: 25.07.2018 17:22:59
* Author: Laptop
*/


#ifndef __SERIALCOMMUNICATOR_H__
#define __SERIALCOMMUNICATOR_H__

#include "ArduinoCommunicator.h"
#include "../../ArduinoCore/include/core/Arduino.h"

class SerialCommunicator : public ArduinoCommunicator
{
//variables
public:
protected:
private:

//functions
public:
	SerialCommunicator();
  SerialCommunicator(unsigned long baud, uint8_t config);
	~SerialCommunicator();
  void send(int value);
  int available();
  int read();
protected:
private:
  void init(unsigned long baud, uint8_t config);
	SerialCommunicator( const SerialCommunicator &c );
	SerialCommunicator& operator=( const SerialCommunicator &c );

}; //SerialCommunicator

#endif //__SERIALCOMMUNICATOR_H__
