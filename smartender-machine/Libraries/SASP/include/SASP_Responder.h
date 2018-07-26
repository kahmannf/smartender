/* 
* SASP_Responder.h
*
* Created: 25.07.2018 18:40:56
* Author: Laptop
*/


#ifndef __SASP_RESPONDER_H__
#define __SASP_RESPONDER_H__

#include "SASP_Frame.h"
#include "../../ArduinoCommunicator/include/ArduinoCommunicator.h"

class SASP_Responder
{
//variables
public:
protected:
private:
  ArduinoCommunicator * communicator;
  unsigned long last_status;

//functions
public:
  void respond_if_neccessary(unsigned long status);
	SASP_Responder(ArduinoCommunicator * communicator);
	~SASP_Responder();
protected:
private:
	SASP_Responder( const SASP_Responder &c );
	SASP_Responder& operator=( const SASP_Responder &c );

}; //SASP_Responder

#endif //__SASP_RESPONDER_H__
