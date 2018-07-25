/* 
* ArduinoCommunicator.h
*
* Created: 25.07.2018 17:22:35
* Author: Laptop
*/


#ifndef __ARDUINOCOMMUNICATOR_H__
#define __ARDUINOCOMMUNICATOR_H__


class ArduinoCommunicator
{
//functions
public:
	virtual ~ArduinoCommunicator(){}
	virtual void send(int value) = 0;
	virtual int available() = 0;
  virtual int read() = 0;

}; //ArduinoCommunicator

#endif //__ARDUINOCOMMUNICATOR_H__
