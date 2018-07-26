/* 
* SASP_Interpreter.cpp
*
* Created: 25.07.2018 16:53:45
* Author: Laptop
*/

#include "../../ArduinoCore/include/core/Arduino.h"
#include "../include/SASP_Interpreter.h"

SASP_Interpreter::SASP_Interpreter(ArduinoCommunicator * communicator)
{
  this->communicator = communicator;
  this->frame = new SASP_Frame();
  this->responder = new SASP_Responder(communicator);
}

void SASP_Interpreter::do_cycle()
{
  this->process_incomming();
}

void SASP_Interpreter::process_incomming()
{
  if(this->communicator->available())
  {
    int value = this->communicator->read();
    //this->communicator->send(value);
    this->frame->append(value);
    update_status();
  }
}



void SASP_Interpreter::update_status()
{
  this->responder->respond_if_neccessary(this->frame->status);
}

// default destructor
SASP_Interpreter::~SASP_Interpreter()
{
  
} //~SASP_Interpreter
