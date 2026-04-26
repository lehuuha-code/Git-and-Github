int in1=7;
int in2=8;
int e=9;
void setup(){
  pinMode(in1,OUTPUT);
   pinMode(in2,OUTPUT);
    pinMode(e,OUTPUT);

}
void loop(){
  digitalWrite(in1,HIGH);
   digitalWrite(in2,LOW);
   analogWrite(e,225);
   delay(5000);

}