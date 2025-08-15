# TempTrack-IoT 🚀

IoT temperature monitoring system with ESP32 sensor nodes sending data to a Flask backend on a Raspberry Pi 5. A React + Vite + Tailwind dashboard displays real-time and historical readings on any device in the local network.

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
- **React + Vite + TailwindCSS** – Frontend dashboard  
- **Raspberry Pi 5** – Local server and dashboard hosting  

---

## 📸 Screenshots

_Add screenshots of your dashboard here to make it visually appealing._  
Example:  

---

## ⚡ Installation & Setup

### Backend (Raspberry Pi 5)
```bash
git clone https://github.com/PetteriSuonpaa/TempTrack-IoT.git
cd TempTrack-IoT/server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
