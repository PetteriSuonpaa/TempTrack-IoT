# TempTrack-IoT 🚀

IoT temperature monitoring system with ESP32 sensor nodes sending data to a Flask backend on a Raspberry Pi 5. A React + Vite + Tailwind + ShadCN dashboard displays real-time and historical readings on any device in the local network.

---

## 🌟 Features

- Real-time and historical temperature visualization  
- Multi-sensor support (ESP32 + Dallas Temperature sensors)  
- Local web dashboard hosted on Raspberry Pi 5  
- Easy to expand with new sensors  
- JSON API for data collection  

---

## 🛠️ Tech Stack

- **ESP32 / PlatformIO** – Sensor nodes and firmware  
- **Flask (Python)** – Backend API server  
- **React + Vite + TailwindCSS + ShadCN** – Frontend dashboard  
- **Raspberry Pi 5** – Local server and dashboard hosting  

---
## 🛠️ Project Process

### Motivation
TempTrack-IoT was created to monitor temperature in real-time across multiple locations in a local network, providing both live and historical data via an easy-to-access web dashboard for my family’s house.  
The main goal was to track the upper and lower water temperatures of our hot tub, and also gather data from a nearby lake.

### Hardware Selection
**Outside Unit**
- ESP32-S3-DevkitM-1U
- DS18B20 digital temperature sensors (two for hot tub, one for lake)
- 20,000 mAh power bank
- DS18B20 resistor module
- F3 green indicator LED
- 12 V round rocker switch (SPST, ON/OFF)
- WiFi/GSM antenna (2.4 G, 3 dBi)
- USB-C cable (for charging power bank)
- Micro-USB cable (power from bank to ESP)
- Waterproof sealing tape and epoxy

**Inside Unit**
- Raspberry Pi 5  
- Raspberry Pi active cooler  
- Raspberry Pi 27 W USB-C power supply

### Architecture Design
The system is split into three main components:
1. **ESP32 Sensor Nodes** – Read temperature and send JSON data over WiFi  
2. **Flask Backend (Raspberry Pi 5)** – Receives data from sensors and stores it  
3. **React + Vite + Tailwind + ShadCN Dashboard** – Displays real-time and historical data

### Development Steps
1. Prototyped ESP32 sensors with PlatformIO and Dallas Temperature library  
2. Built Flask backend with API endpoints to receive and serve sensor data  
3. Designed the dashboard layout in [Figma](https://www.figma.com/design/TWQNi1zcBEpw2G51kZiim7/Paljuproject?node-id=0-1&m=dev)  
4. Developed responsive React dashboard with live charts and historical views  
5. Integrated backend and frontend, tested on local network  
6. Automated startup with systemd services on Raspberry Pi  
7. Assembled outdoor hardware with waterproofing for durability  

### Future Improvements 
- Enable secure remote access via VPN or tunneling  
- Design a custom PCB to reduce wiring clutter and save space in the enclosure  
- Improve power bank accessibility and charging convenience  
- Enhance the web dashboard design for an even more appealing and intuitive user experience

---
## 📸 Screenshots

_Add screenshots of your dashboard here to make it visually appealing._

---

## ⚡ Data Flow

ESP32 Sensor -> WiFi -> Flask API (Raspberry Pi 5) -> Local Web Dashboard (React)

---

## 💡 Setup Instructions

### 1️⃣ ESP32 Sensor Nodes (PlatformIO / Arduino)

1. Open the PlatformIO project in VSCode  
2. Connect your ESP32 device  
3. Configure `src/main.cpp` with your WiFi credentials and backend URL  
4. Flash the firmware to the ESP32  

---
### 2️⃣ Backend (Flask / Raspberry Pi 5)
⚠️ Important: Assign a static IP to your Raspberry Pi 5 that doesn’t conflict with other devices on your network. You can check your router’s DHCP range (usually accessible via your router’s gateway login) and pick an IP outside that range.
1. Install Python 3.x on your Raspberry Pi 5  
2. Clone the repository:  
   ```bash
   git clone https://github.com/PetteriSuonpaa/TempTrack-IoT.git
   cd TempTrack-IoT/server
3. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
5. Run the server:
   ```bash
    python run.py

---

### 3️⃣ Frontend (React + Vite + Tailwind + ShadCN)

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
2. Install dependencies:  
   ```bash
   npm install
3. Run the development server:
   ```bash
   npm run dev
4. Open your browser at:
   ```text
   http://<RaspberryPi_IP>:5173
---

### 4️⃣ Automate Backend & Frontend on Boot

To start both backend and frontend automatically on Raspberry Pi boot, use **systemd services**.

#### a) Backend Service

Create the service file:
  ```bash
    sudo nano /etc/systemd/system/temptrack-backend.service
```
Add:
  ```ini
    [Unit]
    Description=TempTrack IoT Frontend (React)
    After=network.target temptrack-backend.service
    
    [Service]
    User=pi
    WorkingDirectory=/home/pi/TempTrack-IoT/frontend
    ExecStart=/usr/bin/npm run dev
    Restart=on-failure
    
    [Install]
    WantedBy=multi-user.target
```
Enable and start:
  ```bash
  sudo systemctl enable temptrack-backend
  sudo systemctl start temptrack-backend
  sudo systemctl status temptrack-backend
```
#### b) Frontend Service

Create the service file:
  ```bash
    sudo nano /etc/systemd/system/temptrack-frontend.service
```
Add:
  ```ini
    [Unit]
    Description=TempTrack IoT Frontend (React)
    After=network.target temptrack-backend.service
    
    [Service]
    User=pi
    WorkingDirectory=/home/pi/TempTrack-IoT/frontend
    ExecStart=/usr/bin/npm run dev
    Restart=on-failure
    
    [Install]
    WantedBy=multi-user.target
```
Enable and start:
  ```bash
  sudo systemctl enable temptrack-frontend
  sudo systemctl start temptrack-frontend
  sudo systemctl status temptrack-frontend
```
✅ Now both backend and frontend will automatically start on Raspberry Pi boot.

