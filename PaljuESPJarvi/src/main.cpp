#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <time.h>
#include <OneWire.h>
#include <DallasTemperature.h>
                                                  
const char* ssid = "Batman";
const char* password = "Apinat03";
const char* server_url = "http://192.168.1.3:5000/api/data";

#define ONE_WIRE_BUS_JARVI 4

OneWire oneWireJarvi(ONE_WIRE_BUS_JARVI);
DallasTemperature sensorJarvi(&oneWireJarvi);

bool wifiConnected = false;

void setup() {
  Serial.begin(115200);
  sensorJarvi.begin();

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
}

float readJarviSensor() {
  sensorJarvi.requestTemperatures();
  return sensorJarvi.getTempCByIndex(0);
}

void sendDataToServer() {
  if (WiFi.status() != WL_CONNECTED) return;

  HTTPClient http;
  http.begin(server_url);
  http.addHeader("Content-Type", "application/json");

  time_t now;
  time(&now);

  float jarviTemp = readJarviSensor();

  String json = "{";
  json += "\"timestamp\":" + String(now) + ",";
  json += "\"jarvi_temperature\":" + String(jarviTemp, 1);
  json += "}";

  Serial.println("Sending: " + json);

  int code = http.POST(json);
  Serial.printf("Response: %d\n", code);
  http.end();
}

void loop() {
  static unsigned long lastSend = 0;
  if (millis() - lastSend > 5000 && wifiConnected) {
    sendDataToServer();
    lastSend = millis();
  }
}
