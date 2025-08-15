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

