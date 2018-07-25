/*Begining of Auto generated code by Atmel studio */
#include <Arduino.h>

/*End of auto generated code by Atmel studio */


//Beginning of Auto generated function prototypes by Atmel Studio
//End of Auto generated function prototypes by Atmel Studio

int slot = 3;

void setup() {
  Serial.begin(9600, SERIAL_8N1);

	DDRD = 0b00111100;
	//DDRB = 0xFF;

	PORTD = 0b11111100;

	//PORTB = 0b00111111;
	//Serial.write(0x30);
	//Serial.write(0x30);
	//Serial.write(0x30);
	//Serial.write(0x30);
	//Serial.flush();
}

void loop() {
  
  
	if(Serial.available())
	{
		int value = Serial.read();
		
		if(value == 0x30)
		{
			PORTD |= (1<<(slot));
		}
		else
		{
			PORTD &= ~(1<<(slot));
		}
	}
}
