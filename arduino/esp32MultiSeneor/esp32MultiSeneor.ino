#include  <WiFi.h>
#include  <HTTPClient.h>
#include  "Wire.h"
#define   TCAADDR 0x70

#include  "Adafruit_SHT31.h"
Adafruit_SHT31 sht31  = Adafruit_SHT31();

const char* ssid      = "Daesung2G";
const char* password  = "smarthive123";

uint16_t  Temperature[8]  = {40400,};
uint16_t  Humidity[8]     = {40400,};

unsigned long timer_SHT31 = 0;
unsigned long timer_SEND = 0;

void tca_select(uint8_t index) {
  if (index > 7) return;
  Wire.beginTransmission(TCAADDR);
  Wire.write(1 << index);
  Wire.endTransmission();
}

// standard Arduino setup()
void setup()
{
  WiFi.begin(ssid, password);
  Serial.begin(115200);
  Wire.begin();

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected");
  } else {
    Serial.print("WiFi connected ");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  }
}

void loop()
{
  get_sensor(millis());
  send_sensor(millis());
}

void send_sensor(unsigned long millisec) {
  if ((millisec - timer_SEND) > 1000) {

    for (uint8_t channel = 0; channel < 8; channel++) {
      Serial.print("TCA Port #"); Serial.print(channel);
      Serial.print(", T: ");
      Serial.print(Temperature[channel]);
      Serial.print("°C ,H: ");
      Serial.print(Humidity[channel]);
      Serial.println("%");
    }
    Serial.println("");
    
    timer_SEND = millisec;
  }
}

void get_sensor(unsigned long millisec) {
  if ((millisec - timer_SHT31) > 300) {

    for (uint8_t channel = 0; channel < 8; channel++) {
      tca_select(channel);
      Wire.beginTransmission(68); //0x44
      if (!Wire.endTransmission() && sht31.begin(0x44)) {
        Temperature[channel]  = sht31.readTemperature() * 100;
        Humidity[channel]     = sht31.readHumidity() * 100;
      } else {
        Temperature[channel]  = 40400;
        Humidity[channel]     = 40400;
      }
    }
    timer_SHT31 = millisec;
  }
}

/*
  ////Send Data//////////////////////////////////////
  void httpPOSTRequest(struct dataSet *ptr, String serverUrl) {
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverUrl);

  http.addHeader("Content-Type", "application/json");
  String httpRequestData =  (String)"{\"eqnum\" : \"safemotion\","  +
                            "\"temp\"   :" + ptr->MESURE_VAL_01 + "," +
                            "\"humi\"   :" + ptr->MESURE_VAL_02 + "," +
                            "\"weigh\"  :" + ptr->MESURE_VAL_03 + "," +
                            "\"sugar\"  :" + ptr->MESURE_VAL_04 + "}";

  int httpResponseCode = http.POST(httpRequestData);
  Serial.print(httpRequestData);
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
  http.end();           // Free resources
  }////httpPOSTRequest_End
*/
