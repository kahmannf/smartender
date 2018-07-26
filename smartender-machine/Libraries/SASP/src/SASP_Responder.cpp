/* 
* SASP_Responder.cpp
*
* Created: 25.07.2018 18:40:56
* Author: Laptop
*/


#include "../include/SASP_Responder.h"

// default constructor
SASP_Responder::SASP_Responder(ArduinoCommunicator * communicator)
{
  this->communicator = communicator;
  this->last_status = SASP_FRAME_STATUS_UNINITIALIZED;
} //SASP_Responder

void SASP_Responder::respond_if_neccessary(unsigned long status)
{
  if(status != this->last_status)
  {
     this->last_status = status;
     this->communicator->send(status);
  }
}

// default destructor
SASP_Responder::~SASP_Responder()
{
} //~SASP_Responder
