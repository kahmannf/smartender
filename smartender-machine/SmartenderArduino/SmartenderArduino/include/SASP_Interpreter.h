/* 
* SASP_Interpreter.h
*
* Created: 25.07.2018 16:39:07
* Author: Laptop
*/


#ifndef __SASP_INTERPRETER_H__
#define __SASP_INTERPRETER_H__

// Smartender Arduino Serial Protocol Interpreter
class SASP_Interpreter
{
//variables
public:
protected:
private:

//functions
public:
	SASP_Interpreter(unsigned long, uint8_t);
	~SASP_Interpreter();
protected:
private:
	SASP_Interpreter( const SASP_Interpreter &c );
	SASP_Interpreter& operator=( const SASP_Interpreter &c );

}; //SASP_Interpreter

#endif //__SASP_INTERPRETER_H__
