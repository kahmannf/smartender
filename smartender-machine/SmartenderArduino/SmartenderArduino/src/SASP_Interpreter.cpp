/* 
* SASP_Interpreter.cpp
*
* Created: 25.07.2018 16:39:07
* Author: Laptop
*/


#include "../include/SASP_Interpreter.h"

// default constructor
SASP_Interpreter::SASP_Interpreter(unsigned long baud, uint8_t config)
{
  // start serial communication
  Serial.begin(baud, config);
  
} //SASP_Interpreter

// default destructor
SASP_Interpreter::~SASP_Interpreter()
{
  Serial.end();
} //~SASP_Interpreter
