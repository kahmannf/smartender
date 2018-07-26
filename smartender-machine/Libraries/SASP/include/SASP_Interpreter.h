/* 
* SASP_Interpreter.h
*
* Created: 25.07.2018 16:53:45
* Author: Laptop
*/


#ifndef __SASP_INTERPRETER_H__
#define __SASP_INTERPRETER_H__

#include "SASP_Frame.h"
#include "SASP_Responder.h"
#include "../../ArduinoCommunicator/include/ArduinoCommunicator.h"

class SASP_Interpreter
{
//variables
public:
protected:
private:
  SASP_Frame * frame;
  SASP_Responder * responder;
  ArduinoCommunicator * communicator;

//functions
public:
  void do_cycle();
	SASP_Interpreter(ArduinoCommunicator * communicator);
	~SASP_Interpreter();
protected:
private:
  void process_incomming();
  void update_status();
	SASP_Interpreter( const SASP_Interpreter &c );
	SASP_Interpreter& operator=( const SASP_Interpreter &c );

}; //SASP_Interpreter

#endif //__SASP_INTERPRETER_H__
