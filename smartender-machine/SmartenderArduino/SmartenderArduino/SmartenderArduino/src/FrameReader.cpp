/*
 * FrameReader.cpp
 *
 * Created: 12.07.2018 23:12:08
 *  Author: Laptop
 */ 
#include "FrameReader.h"
#include <Arduino.h>

struct Frame frame;

void fr_init() 
{
	frame = new Frame();

#if PROTOCOL_VERSION == 1
	frame.header = new byte[HEADER_LENGTH];
	frame.data = new byte[MAX_DATA_LENGTH];
  frame.chunk = new byte[CHUNK_LENGTH];
  frame.header_index = 0;
  frame.data_index = 0;
  frame.chunck_index = 0;
  frame.length = 0;
  frame.reading = 0;
#endif

  Serial.begin(9600);
}

void fr_reset() 
{
	delete frame.header;
	delete frame.data;
	delete frame;
	fr_init();
}

void fr_read() 
{
  while(Serial.available()) 
  {
    fr_handle_byte((byte)Serial.read());
  }
}

void fr_handle_byte(byte value) 
{
  if(!frame.reading) 
  {
    if(byte == 0xFF) 
    {
      int completed = append_to_chunk(byte);

      if(completed) 
      {
        frame.chunck_index = 0;
        frame.reading = 1;
      }
    }
  }
  else 
  {
    // still receiving header
    if(frame.header_index < HEADER_LENGTH) 
    {
      frame.header[frame.header_index] = value;
      frame.header_index++;
    }
    // parsing body data
    else 
    {
      if(append_to_chunk(value))
      {
        if(is_end_chunk())
        {
          // TODO 
        }
        else 
        {
          for(int i = 0; i < 3; i++)
          {
            frame.data[frame.data_index] = frame.chunk[i];
            frame.data_index++;
          }
          frame.chunck_index = 0;
        }
      }
    }

  }

}

// return whether chunk was completed
int append_to_chunk(byte value) 
{
  if(frame.chunck_index == CHUNK_LENGTH) 
  {
    // reset for now. TODO: think of better handling
    fr_reset();
  }
  else 
  {
    frame.chunk[frame.chunck_index] = value;
    frame.chunck_index++;
  }

  return frame.chunck_index == CHUNK_LENGTH;
}


int is_end_chunk()
{
  return chunk[0] == 0xFF && chunk[1] == 0xFF && chunk[2] == 0xFF;
}
