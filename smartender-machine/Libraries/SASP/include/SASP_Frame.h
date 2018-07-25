/* 
* SASP_Frame.h
*
* Created: 25.07.2018 16:53:35
* Author: Laptop
*/


#ifndef __SASP_FRAME_H__
#define __SASP_FRAME_H__

// SASP_Frame life cycle definition

#define SASP_FRAME_STATUS_CLEAN 1
#define SASP_FRAME_STATUS_HEADER 2
#define SASP_FRAME_STATUS_BODY 4
#define SASP_FRAME_STATUS_COMPLETE 8
#define SASP_FRAME_STATUS_CANCELED 16


class SASP_Frame
{
//variables
public:
protected:
private:

//functions
public:
  void append(int value);
	SASP_Frame();
	~SASP_Frame();
protected:
private:
	SASP_Frame( const SASP_Frame &c );
	SASP_Frame& operator=( const SASP_Frame &c );

}; //SASP_Frame

#endif //__SASP_FRAME_H__
