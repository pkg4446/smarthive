#include  <WiFi.h>
#include  <HTTPClient.h>
#include  "Wire.h"
#define   TCAADDR 0x70

#include  "Adafruit_SHT31.h"
Adafruit_SHT31 sht31  = Adafruit_SHT31();

const char* ssid      = "Daesung2G";
const char* password  = "smarthive123";

uint8_t   LED = 17;

char      deviceID[18];
int16_t  Temperature[8]   = {14040,};
uint16_t Humidity[8]      = {14040,};

unsigned long timer_SHT31 = 0;
unsigned long timer_SEND  = 0;
unsigned long timer_WIFI  = 0;

void tca_select(uint8_t index) {
  if (index > 7) return;
  Wire.beginTransmission(TCAADDR);
  Wire.write(1 << index);
  Wire.endTransmission();
}

// standard Arduino setup()
void setup()
{
  WiFi.disconnect(true);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.begin(115200);
  Wire.begin();
  pinMode(LED, OUTPUT);

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

void wifiCheck(unsigned long millisec) {
  if ((millisec - timer_WIFI) > 1000) {
    timer_WIFI = millisec;
        
    if (WiFi.status() != WL_CONNECTED) {
      digitalWrite(LED, true);
    } else {
      WiFi.begin(ssid, password);
      digitalWrite(LED, false);
    }

  }
}

void send_sensor(unsigned long millisec) {
  if ((millisec - timer_SEND) > 10 * 1000) {
    timer_SEND = millisec;

    for (uint8_t channel = 0; channel < 8; channel++) {
      Serial.print("TCA Port #"); Serial.print(channel);
      Serial.print(", T: ");
      Serial.print(Temperature[channel]);
      Serial.print("°C ,H: ");
      Serial.print(Humidity[channel]);
      Serial.println("%");
    }
    if (WiFi.status() == WL_CONNECTED) {
      for (int i = 0; i < 17; i++) {
        deviceID[i]   = WiFi.macAddress()[i];
      }
      httpPOSTRequest("http://smarthive.kro.kr/api/costom/log");
    } else {
      Serial.println("WiFi not connected");
    }
    Serial.println("");
  }
}

void get_sensor(unsigned long millisec) {
  if ((millisec - timer_SHT31) > 300) {
    timer_SHT31 = millisec;

    for (uint8_t channel = 0; channel < 8; channel++) {
      tca_select(channel);
      Wire.beginTransmission(68); //0x44
      if (!Wire.endTransmission() && sht31.begin(0x44)) {
        Temperature[channel]  = sht31.readTemperature() * 100;
        Humidity[channel]     = sht31.readHumidity() * 100;
      } else {
        Temperature[channel]  = 14040;
        Humidity[channel]     = 14040;
      }
    }//for
  }//if
}


////Send Data//////////////////////////////////////
void httpPOSTRequest(String serverUrl) {
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverUrl);

  http.addHeader("Content-Type", "application/x-www-form-urlencoded");
  String httpRequestData =  (String)"MODULE=" + deviceID +
                            "&TEMP1=" + Temperature[0] +
                            "&TEMP2=" + Temperature[1] +
                            "&TEMP3=" + Temperature[2] +
                            "&TEMP4=" + Temperature[3] +
                            "&TEMP5=" + Temperature[4] +
                            "&TEMP6=" + Temperature[5] +
                            "&TEMP7=" + Temperature[6] +
                            "&TEMP8=" + Temperature[7] +
                            "&HUMI1=" + Humidity[0] +
                            "&HUMI2=" + Humidity[1] +
                            "&HUMI3=" + Humidity[2] +
                            "&HUMI4=" + Humidity[3] +
                            "&HUMI5=" + Humidity[4] +
                            "&HUMI6=" + Humidity[5] +
                            "&HUMI7=" + Humidity[6] +
                            "&HUMI8=" + Humidity[7];

  int httpResponseCode = http.POST(httpRequestData);
  Serial.println(httpRequestData);
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
  http.end();           // Free resources
}////httpPOSTRequest_End
