#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Wi-Fi and server settings
const char* ssid = "your wifi username";
const char* password = "your wifi password";
const char* server_url = "url address";

// Sensor pins
#define ONE_WIRE_BUS_YLA 4
#define ONE_WIRE_BUS_ALA 15

// LED pin
#define LED_PIN 2
// OneWire and DallasTemperature setup
OneWire oneWireYla(ONE_WIRE_BUS_YLA);
DallasTemperature sensorYla(&oneWireYla);

OneWire oneWireAla(ONE_WIRE_BUS_ALA);
DallasTemperature sensorAla(&oneWireAla);

// Wi-Fi status flag
bool wifiConnected = false;

// LED blink control variables
unsigned long ledLastToggle = 0;
bool ledState = false;
unsigned long blinkStartTime = 0;
bool blinkingActive = true;
static unsigned long lastSend = 0;

void setup() {
  Serial.begin(115200);
  sensorYla.begin();
  sensorAla.begin();

  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 20000) {
    Serial.print(".");
    delay(100);
  }

  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println("\nWiFi connected!");
    Serial.println(WiFi.localIP());
  }

  configTime(3 * 3600, 3600, "pool.ntp.org");
  blinkStartTime = millis();  // Start blink timer
  lastSend = millis() - 180000;
  
}

float readYlaSensor() {
  sensorYla.requestTemperatures();
  return sensorYla.getTempCByIndex(0);
}

float readAlaSensor() {
  sensorAla.requestTemperatures();
  return sensorAla.getTempCByIndex(0);
}

void sendDataToServer() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(server_url);
  http.addHeader("Content-Type", "application/json");

  time_t now;
  time(&now);

  float ylaTemp = readYlaSensor();
  float alaTemp = readAlaSensor();

  String json = "{";
  json += "\"timestamp\":" + String(now) + ",";
  json += "\"yla_temperature\":" + String(ylaTemp, 1) + ",";
  json += "\"ala_temperature\":" + String(alaTemp, 1);
  json += "}";

  Serial.println("Sending: " + json);

  int code = http.POST(json);
  Serial.printf("Response: %d\n", code);
  http.end();
}

void loop() {
  unsigned long currentMillis = millis();
  // LED blinking logic
  if (blinkingActive && currentMillis - blinkStartTime < 300000) {  // 5 minutes
    unsigned long blinkInterval = wifiConnected ? 1000 : 250;

    if (currentMillis - ledLastToggle >= blinkInterval) {
      ledLastToggle = currentMillis;
      ledState = !ledState;
      digitalWrite(LED_PIN, ledState);
    }
  } else if (blinkingActive) {
    blinkingActive = false;
    digitalWrite(LED_PIN, LOW);  // Turn off LED after 5 mins
  }

  // Send temperature data every 3 minutes
  if (currentMillis - lastSend > 180000 && wifiConnected) {
    sendDataToServer();
    lastSend = currentMillis;
  }
}


