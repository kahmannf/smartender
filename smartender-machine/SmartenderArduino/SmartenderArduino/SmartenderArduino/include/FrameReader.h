/*
 * FrameReader.h
 *
 * Created: 12.07.2018 23:11:44
 *  Author: Laptop
 */ 


#ifndef FRAMEREADER_H_
#define FRAMEREADER_H_


void fr_init();
void fr_reset();
void fr_read();
void fr_handle_byte(byte);
int append_to_chunk(byte value) 

#if PROTOCOL_VERSION == 1

// 16 Bit integer
#define MAX_DATA_LENGTH 0xFFFF
#define HEADER_LENGTH 4
#define CHUNK_LENGTH 3


struct Frame {
	byte[] header;
	byte[] data;	
  byte[] chunk;

  char reading;

	unsigned int length;
	unsigned int header_index;
  unsigned int data_index;
  unsigned int chunck_index;
};

#endif

#endif /* FRAMEREADER_H_ */