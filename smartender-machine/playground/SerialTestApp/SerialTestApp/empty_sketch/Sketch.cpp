/*Begining of Auto generated code by Atmel studio */
#include <Arduino.h>

/*End of auto generated code by Atmel studio */


//Beginning of Auto generated function prototypes by Atmel Studio
//End of Auto generated function prototypes by Atmel Studio

int slot = 3;

void setup() {
  Serial.begin(9600, SERIAL_8N1);

	//DDRD = 0b11111100;
	//DDRB = 0xFF;

	//PORTD = 0b11111100;

  // set pins 2 - 7 to output, pin 0 (RX) and 1 (TX) keep their value
  DDRD |= 0b11111100;
  // set pins 8 - 13 to output, the two high bits are mapped to crystal pins and not usable
  DDRB |= 0b00111111;

  // bits associated with the pins that are set to output above are set to 1
  // which result in a low value in the relay
  PORTD |=  0b11111100;
  PORTB |=  0b00111111;

	//PORTB = 0b00111111;
	//Serial.write(0x30);
	//Serial.write(0x30);
	//Serial.write(0x30);
	//Serial.write(0x30);
	//Serial.flush();
}
int incomingByte = 0;
void loop() {
  
  
  /* Replace with your application code */
  
    // reply only when you receive data:
    if (Serial.available() > 0) {
      // read the incoming byte:
      incomingByte = Serial.read();

      // say what you got:
      // Serial.print("I received: ");
      Serial.write(incomingByte);
    }    
  
	//if(Serial.available())
	//{
		//int value = Serial.read();
		//
		//if(value == 0x30)
		//{
			//PORTD |= (1<<(slot));
		//}
		//else
		//{
			//PORTD &= ~(1<<(slot));
		//}
	//}
}
