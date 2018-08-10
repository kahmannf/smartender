/* 
* SASP_Frame.h
*
* Created: 25.07.2018 16:53:35
* Author: Laptop
*/

#ifndef __SASP_FRAME_H__
#define __SASP_FRAME_H__

//default SASP_VERSION is 0

#ifndef SASP_VERSION
#define SASP_VERSION 0
#endif

// SASP_Frame life cycle definition

#define SASP_FRAME_STATUS_UNINITIALIZED 0
#define SASP_FRAME_STATUS_CLEAN 1
#define SASP_FRAME_STATUS_HEADER 2
#define SASP_FRAME_STATUS_BODY 3
#define SASP_FRAME_STATUS_ENDING 4
#define SASP_FRAME_STATUS_COMPLETE 5
#define SASP_FRAME_STATUS_CANCELED 6

#if SASP_VERSION == 0

#define SASP_HEADER_LENGTH 7
#define SASP_VERSION_START_INDEX 3
#define SASP_VERSION_END_INDEX 4

#endif


#ifndef SASP_MAX_FRAME_LENGTH
//as defined by protocol version 0: 2 Bytes for the length + 11 bytes for header and end => 2 ^ 16 + 11 
//#define SASP_MAX_FRAME_LENGTH 65536 + 11
// max length set to 255 + 11 (1 Byte for length because of long initialization time)
#define SASP_MAX_FRAME_LENGTH 255 + 11
#endif

#ifndef SASP_HEADER_LENGTH
#error "No SASP_HEADER_LENGTH for targeted SASP version defined"
#endif

#ifndef SASP_VERSION_START_INDEX
#error "No SASP_VERSION_START_INDEX for targeted SASP version defined"
#endif

#ifndef SASP_VERSION_END_INDEX
#error "No SASP_VERSION_END_INDEX for targeted SASP version defined"
#endif


class SASP_Frame
{
  
//variables
public:
  unsigned long status;
protected:
private:
  int * data;
  int bytes_read;

//functions
public:
  void append(int value);
	SASP_Frame();
	~SASP_Frame();
protected:
private:
  void evaluate_status();
  void clean();
  void check_for_header_start();
  void finalize_header();
  void finalize_body();
  void finalize_frame();
  long get_header_version_field();
	SASP_Frame( const SASP_Frame &c );
	SASP_Frame& operator=( const SASP_Frame &c );

}; //SASP_Frame

#endif //__SASP_FRAME_H__
