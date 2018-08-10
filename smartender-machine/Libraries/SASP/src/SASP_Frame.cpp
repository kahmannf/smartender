/* 
* SASP_Frame.cpp
*
* Created: 25.07.2018 16:53:35
* Author: Laptop
*/

#include "../include/SASP_Frame.h"

// default constructor
SASP_Frame::SASP_Frame()
{
  this->data = new int[SASP_MAX_FRAME_LENGTH];
  this->clean();
} //SASP_Frame

void SASP_Frame::clean()
{
  for (int i = 0; i < SASP_MAX_FRAME_LENGTH; i++) 
  {
    this->data[i] = 0; 
  }
  this->bytes_read = 0;
  this->status = SASP_FRAME_STATUS_CLEAN;
}

void SASP_Frame::append(int value)
{
  if(this->bytes_read < SASP_MAX_FRAME_LENGTH)
  {
    if(this->status != SASP_FRAME_STATUS_CANCELED)
    {
      this->data[this->bytes_read] = value;
      this->bytes_read = this->bytes_read + 1;
      this->evaluate_status();
    }
  } 
  else 
  {
    this->status = SASP_FRAME_STATUS_CANCELED;
  }
}

void SASP_Frame::evaluate_status()
{
  switch(this->status)
  {
    case SASP_FRAME_STATUS_CLEAN:
      this->check_for_header_start();
      break;
    case SASP_FRAME_STATUS_HEADER:
      this->finalize_header();
      break;
    case SASP_FRAME_STATUS_BODY:
      this->finalize_body();
      break;
    case SASP_FRAME_STATUS_ENDING:
      this->finalize_frame();
      break;
  }
}

void SASP_Frame::check_for_header_start()
{
  if (this->bytes_read == 3)
  {
    if(this->data[0] == 255 && this->data[1] == 255 && this->data[2] == 255)
    {
      this->status = SASP_FRAME_STATUS_HEADER;
    }
    else
    {
      this->status = SASP_FRAME_STATUS_CANCELED;
    }
  }
}

void SASP_Frame::finalize_header()
{
  if(this->bytes_read == SASP_HEADER_LENGTH)
  {
    if(this->get_header_version_field() != SASP_VERSION)
    {
      this->status = SASP_FRAME_STATUS_CANCELED;
    }
    
  }
}

void SASP_Frame::finalize_body()
{
}

void SASP_Frame::finalize_frame()
{
}

long SASP_Frame::get_header_version_field()
{
  if(this->bytes_read < SASP_HEADER_LENGTH)
  {
    return -1;
  }
  else 
  {
    int version = 0;
    for(int i = SASP_VERSION_END_INDEX; i >= SASP_VERSION_START_INDEX; i--)
    {
      if((SASP_VERSION_END_INDEX - i) * 8 > 0)
      {
        version = version | (this->data[i] << (SASP_VERSION_END_INDEX - i) * 8) 
      }
      else 
      {
        version = version | (this->data[i]);
      }
    }
    return version;
  }
}


// default destructor
SASP_Frame::~SASP_Frame()
{
} //~SASP_Frame
