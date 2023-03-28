#include  "painlessMesh.h"
#include  "Adafruit_SHT31.h"
#include  "EEPROM.h"
#define   EEPROM_SIZE 4
#define   SERIAL_MAX  64

#define   MESH_PREFIX     "smartHiveMesh"
#define   MESH_PASSWORD   "smarthive123"
#define   MESH_PORT       3333

Scheduler taskScheduler; // to control upload task
painlessMesh  mesh;
Adafruit_SHT31 sht31 = Adafruit_SHT31();

String nodeID = "";
//// ----------- Variable -----------
boolean SHT31 = false;
uint8_t control_Temperature = 33;
uint8_t control_Humidity    = 50;
////for millis() func//
unsigned long time_Water  = 0;
unsigned long time_Stalbe = 0;
//// ------------ EEPROM ------------
const uint8_t EEP_Temperature = 1;
const uint8_t EEP_Humidity    = 2;
//// ------------- PIN --------------
const uint8_t SENSOR_TOP    = 32; //INPUT_PULLDOWN
const uint8_t SENSOR_BOTTOM = 33; //INPUT_PULLDOWN
const uint8_t RELAY_HEATER  = 25;
const uint8_t RELAY_FAN     = 26;
const uint8_t RELAY_VALVE   = 27;
//// ----------- Variable -----------


//// ----------- Command  -----------
void command_Service(String command, String value) {
  if (command == "AT+TEMP") {
    control_Temperature = value.toInt();
    EEPROM.write(EEP_Temperature, control_Temperature);
    mesh.sendBroadcast("AT+SET=TEMP;");
  } else if (command == "AT+HUMI") {
    control_Humidity = value.toInt();
    EEPROM.write(EEP_Humidity, control_Humidity);
    mesh.sendBroadcast("AT+SET=HUMI;");
  }
  EEPROM.commit();
}//Command_service() END

//taskSendMessage funtion
void sendMessage() ; // Prototype so PlatformIO doesn't complain
Task sensorLog( TASK_SECOND * 60, TASK_FOREVER, &sensorValue );
void sensorValue() {
  String msg = "AT+SENSOR=" + (String)sht31.readTemperature() + "=" + (String)sht31.readHumidity() + ';' ;
  mesh.sendBroadcast( msg );
}
//taskSendMessage funtion end


// Needed for painless library
void receivedCallback( uint32_t from, String &msg ) {
  char msg_buf[SERIAL_MAX];
  for (int i = 0; i < msg.length(); i++) {
    msg_buf[i] = msg[i];
  }
  String device  = strtok(msg_buf, "=");
  if (device == nodeID) {
    Serial.println(msg);
    String command = strtok(NULL, "=");
    String value   = strtok(NULL, ";");
    command_Service(command, value);
  }
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  //// ------------ PIN OUT ------------
  pinMode(SENSOR_TOP, INPUT_PULLDOWN);
  pinMode(SENSOR_BOTTOM, INPUT_PULLDOWN);
  pinMode(RELAY_HEATER, OUTPUT);
  pinMode(RELAY_FAN, OUTPUT);
  pinMode(RELAY_VALVE, OUTPUT);
  //// ------------ PIN OUT ------------
  if (!EEPROM.begin(EEPROM_SIZE)) Serial.println("failed to initialise EEPROM");
  //// ------------ EEPROM ------------
  control_Temperature = byte(EEPROM.read(EEP_Temperature));
  control_Humidity    = byte(EEPROM.read(EEP_Humidity));
  //// ------------ EEPROM ------------

  mesh.setDebugMsgTypes( ERROR | STARTUP );  // set before init() so that you can see startup messages
  mesh.init( MESH_PREFIX, MESH_PASSWORD, &taskScheduler, MESH_PORT );
  mesh.onReceive(&receivedCallback);

  nodeID = mesh.getNodeId();

  taskScheduler.addTask( sensorLog );
  sensorLog.enable();

  if (!sht31.begin(0x44))delay(1000);
  SHT31 = sht31.begin(0x44);

  if (!SHT31) {
    Serial.println("Sensor error");
    mesh.sendBroadcast("AT+ERR=SHT31");
  } else {
    Serial.print("System online, Set temperature is ");
    Serial.print(control_Temperature);
    Serial.print(", Set humidity is ");
    Serial.println(control_Humidity);
  }
  mesh.sendBroadcast("AT+TYPE=SENSOR");
}

void loop() {
  mesh.update();
  sensor_Water();
  stable();
}

boolean flage_Water = false;
boolean flage_Relay_Water = false;
void water_flage(boolean passfail) {
  flage_Water       = passfail;
  flage_Relay_Water = passfail;
}

uint8_t full_Water  = 0;
uint8_t err_Water   = 0;
void sensor_Water() {
  if ((millis() - time_Water) > 1000 * 1) {
    time_Water = millis();
    if (!flage_Relay_Water && (digitalRead(SENSOR_BOTTOM) == LOW) && (digitalRead(SENSOR_TOP) == LOW)) {
      digitalWrite(RELAY_VALVE, HIGH);
      water_flage(true);
    } else if (flage_Relay_Water && (digitalRead(SENSOR_BOTTOM) == HIGH) && (digitalRead(SENSOR_TOP) == LOW)) {
      if ((full_Water < 250) && flage_Water) full_Water++;
    } else if (flage_Relay_Water && (digitalRead(SENSOR_BOTTOM) == HIGH) && (digitalRead(SENSOR_TOP) == HIGH)) {
      digitalWrite(RELAY_VALVE, LOW);
      water_flage(false);
      full_Water = 0;
    } else if ((full_Water > 200) || ((digitalRead(SENSOR_BOTTOM) == LOW) && (digitalRead(SENSOR_TOP) == HIGH))) {
      ////full_Water는 물 차는 시간, 너무 오래 안차면 문제발생.
      if (err_Water > 60) {
        mesh.sendBroadcast("AT+ERR=WATER");
        digitalWrite(RELAY_VALVE, LOW);
        water_flage(false);
        err_Water = 0;
      }
      else {
        err_Water++;
      }
    }
  }//millis()
}//sensor_Water() END

boolean flage_Stable  = false;
uint8_t err_Stable    = 0;
String  ERR_Message = "AT+ERR=SHT31";
void stable() {
  if ((millis() - time_Stalbe) > 1000 * 1) {
    time_Stalbe = millis();
    if (SHT31) {
      ////센서 계측
      uint8_t Temperature = sht31.readTemperature();
      uint8_t Humidity    = sht31.readHumidity();
      Serial.print("temperature:"); Serial.print(Temperature); Serial.print(" , Humidity:"); Serial.println(Humidity);
      ////온도 유지
      if (Temperature > control_Temperature + 3) {
        //하드웨어 동작 부분
        digitalWrite(RELAY_HEATER, false); //히터 끄기
        digitalWrite(RELAY_FAN, true); //팬 켜기
        //히터 종료 및 팬 가동(비상사태) //서버에 보고
        ERR_Message = "AT+ERR=HIGH_T";
        Serial.println(ERR_Message);
      } else if (Temperature >= control_Temperature) {
        //히터 종료
        //하드웨어 동작 부분
        digitalWrite(RELAY_HEATER, false); //히터 끄기
        digitalWrite(RELAY_FAN, false); //팬 끄기
        Serial.println("Turn down");
      } else if (Temperature < control_Temperature - 3) {
        //하드웨어 동작 부분
        digitalWrite(RELAY_HEATER, true); //히터 켜기
        digitalWrite(RELAY_FAN, false); //팬 끄기
        //히터 켜기
        Serial.println("Turn on");
      }//온도 조절 종료
    } else {
      if (err_Stable > 240) {
        mesh.sendBroadcast(ERR_Message);
        err_Stable = 0;
      }
      else {
        err_Stable++;
      }
    }
  }//millis()
}//stable() END
