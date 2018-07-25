/* 
* SASP_Interpreter.h
*
* Created: 25.07.2018 16:53:45
* Author: Laptop
*/

#include "SASP_Frame.h"

#ifndef __SASP_INTERPRETER_H__
#define __SASP_INTERPRETER_H__


class SASP_Interpreter
{
//variables
public:
protected:
private:
  SASP_Frame * frame;

//functions
public:
	SASP_Interpreter();
	~SASP_Interpreter();
protected:
private:
	SASP_Interpreter( const SASP_Interpreter &c );
	SASP_Interpreter& operator=( const SASP_Interpreter &c );

}; //SASP_Interpreter

#endif //__SASP_INTERPRETER_H__
