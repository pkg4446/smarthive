#include  "painlessMesh.h"
#define   SERIAL_MAX  64

#define   MESH_PREFIX     "smartHiveMesh"
#define   MESH_PASSWORD   "smarthive123"
#define   MESH_PORT       3333

Scheduler taskScheduler; // to control upload task
painlessMesh  mesh;

String nodeID = "";
enum DOOR_LOACTION {OPEN = 1, HALF, CLOSE}; //1:열림, 2:중간, 3:닫힘
//// ----------- Flage --------------
boolean door_moter[4]     = {false,};
boolean door_direction[4] = {false,}; //true = 열림, false = 닫힘
//// ----------- Variable -----------
uint8_t door_location[4]  = {0,};
////for millis() func//
unsigned long time_door   = 0;
uint16_t time_attack      = 0;
uint16_t door_runtime[4]  = {0,};
//// ------------- PIN --------------
//// ------------- OUTPUT -----------
const uint8_t moter_F[4]  = {4, 17, 18, 23};
const uint8_t moter_B[4]  = {16, 15, 19, 13};
//// ------------- INPUT ------------
const uint8_t location[3][4]  = {{33, 26, 14, 22}, {34, 35, 36, 21}, {32, 25, 27, 12}};


//// ----------- Command  -----------
void command_Service(String command, String value) {
  int8_t control = 0;
  if (value.toInt() > 255) {
    control = 255;
  } else {
    control = value.toInt();
  }
  if (command == "AT+OPEN") {
    moterLotation(control, OPEN);
    mesh.sendBroadcast("DOOR=SET=OPEN;");
  } else if (command == "AT+HALF") {
    moterLotation(control, HALF);
    mesh.sendBroadcast("DOOR=SET=HALF;");
  } else if (command == "AT+CLOSE") {
    moterLotation(control, CLOSE);
    mesh.sendBroadcast("DOOR=SET=CLOSE;");
  } else if (command == "AT+ATTACK") {
    time_attack = control;
    mesh.sendBroadcast("DOOR=SET=ATTACK;");
  }
}//Command_service() END
//// ----------- TEST  -----------
void AT_commandHelp() {
  Serial.println("---------------- AT command help ----------------");
  Serial.println(";AT+OPEN   = int;      [int] Door Full Open");
  Serial.println(";AT+HALF   = int;      [int] Door Half Open");
  Serial.println(";AT+CLOSE  = int;      [int] Door Close");
  Serial.println(";AT+ATTACK = int;      All Door Close during[int] ");
}
char Serial_buf[SERIAL_MAX];
int8_t Serial_num;
void Serial_service() {
  String str1 = strtok(Serial_buf, "=");
  String str2 = strtok(NULL, " ");
  command_Service(str1, str2);
}
void Serial_process() {
  char ch;
  ch = Serial.read();
  switch ( ch ) {
    case ';':
      Serial_buf[Serial_num] = NULL;
      Serial.print("ehco : ");
      Serial.println(Serial_buf);
      Serial_service();
      Serial_num = 0;
      break;
    default :
      Serial_buf[ Serial_num ++ ] = ch;
      Serial_num %= SERIAL_MAX;
      break;
  }
}
//// ----------- TEST  -----------

//taskSendMessage funtion
void sendMessage() ; // Prototype so PlatformIO doesn't complain
Task doorLog( TASK_SECOND * 60, TASK_FOREVER, &doorValue );
void doorValue() {
  String msg = "DOOR=SET=" + String(door_location[0]) + String(door_location[1]) + String(door_location[2]) + String(door_location[3]) + ';' ;
  mesh.sendBroadcast( msg );
}
//taskSendMessage funtion end


// Needed for painless library
void receivedCallback( uint32_t from, String &msg ) {
  char msg_buf[SERIAL_MAX];
  for (int i = 0; i < msg.length(); i++) {
    msg_buf[i] = msg[i];
  }
  String types   = strtok(msg_buf, "=");
  if (types == "D") {
    String device  = strtok(NULL, "=");
    if (device == nodeID) {
      Serial.println(msg);
      String command = strtok(NULL, "=");
      String value   = strtok(NULL, ";");
      command_Service(command, value);
    }
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  //// ------------ PIN OUT ------------
  for (int8_t index = 0; index < 4; index++) {
    pinMode(moter_F[index], OUTPUT);
    pinMode(moter_B[index], OUTPUT);
    pinMode(location[OPEN][index], INPUT_PULLDOWN);
    pinMode(location[HALF][index], INPUT_PULLDOWN);
    pinMode(location[CLOSE][index], INPUT_PULLDOWN);
  }
  //// ------------ Door init location ------------
  for (int8_t index = 0; index < 4; index++) {
    door_location[index] = doorLocation(index);
  }

  mesh.setDebugMsgTypes( ERROR | STARTUP );  // set before init() so that you can see startup messages
  mesh.init( MESH_PREFIX, MESH_PASSWORD, &taskScheduler, MESH_PORT );
  mesh.onReceive(&receivedCallback);

  nodeID = mesh.getNodeId();

  taskScheduler.addTask( doorLog );
  doorLog.enable();

  Serial.print("DoorID : ");
  Serial.print(nodeID);
  if (door_location[0] == 0 || door_location[1] == 0 || door_location[2] == 0 || door_location[3] == 0 ) {
    Serial.println(", Can not found the Door location.");
    for (int8_t index = 0; index < 4; index++) {
      door_location[index] = HALF;
    }
  } else {
    Serial.println(", System all green.");
  }
  for (int8_t index = 0; index < 4; index++) {
    Serial.print(door_location[index]);
    Serial.print(',');
  }
  AT_commandHelp();
}

void loop() {
  mesh.update();
  moterRun();
  if (Serial.available()) {
    Serial_process();
  }
}

int8_t doorLocation(int8_t DOOR) {
  int8_t nowDoorLocation = 0;
  if (digitalRead(location[OPEN][DOOR])) {
    nowDoorLocation = OPEN;
  }
  else if (digitalRead(location[HALF][DOOR])) {
    nowDoorLocation = HALF;
  }
  else if (digitalRead(location[CLOSE][DOOR])) {
    nowDoorLocation = CLOSE;
  }
  return nowDoorLocation;
}//doorLocation() END

void moterLotation(int8_t MOTER, int8_t LOCATION) {
  int8_t nowDoorLocation = doorLocation(MOTER);
  if (nowDoorLocation == 0) nowDoorLocation = HALF;
  door_runtime[MOTER] = 0;
  if (LOCATION == nowDoorLocation) {
    door_moter[MOTER] = false;
  } else {
    door_moter[MOTER] = true;
    if (LOCATION > nowDoorLocation) {
      door_direction[MOTER] = false;
    } else if (LOCATION < nowDoorLocation) {
      door_direction[MOTER] = true;
    }
    door_location[MOTER]  = LOCATION;
  }
  if (door_moter[MOTER]) {
    Serial.println("Moving");
    if (door_direction[MOTER]) {
      digitalWrite(moter_F[MOTER], true);
    } else {
      digitalWrite(moter_B[MOTER], true);
    }
  }
}//moterLotation() END

void moterRun() {
  if ((millis() - time_door) > 10) {
    time_door = millis();
    for (int index = 0; index < 4; index++) {
      if (door_moter[index]) {        
        if (door_runtime[index] < 100 * 5) { //5초
          if (digitalRead(location[door_location[index]][index])) {
            digitalWrite(moter_F[index], false);
            digitalWrite(moter_B[index], false);
            door_moter[index] = false;
            Serial.println("Moved");
          }
          door_runtime[index]++;
        } else {
          digitalWrite(moter_F[index], false);
          digitalWrite(moter_B[index], false);
          door_moter[index] = false;
          Serial.println("Broken");
        }
      }
    }//for
  }//millis()
}//moterRun() END
