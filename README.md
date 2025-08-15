TempTrack-IoT 🚀

IoT temperature monitoring system with ESP32 sensor nodes sending data to a Flask backend on a Raspberry Pi 5. A React + Vite + Tailwind dashboard displays real-time and historical readings on any device in the local network.

🌟 Features

Real-time and historical temperature visualization

Multi-sensor support (ESP32 + Dallas Temperature sensors)

Local web dashboard hosted on Raspberry Pi 5

Easy to expand with new sensors

JSON API for data collection

🛠️ Tech Stack

ESP32 / PlatformIO – Sensor nodes and firmware

Flask (Python) – Backend API server

React + Vite + TailwindCSS – Frontend dashboard

Raspberry Pi 5 – Local server and dashboard hosting

📸 Screenshots

Add screenshots of your dashboard here to make it visually appealing.
Example:

⚡ Installation & Setup
Backend (Raspberry Pi 5)
git clone https://github.com/PetteriSuonpaa/TempTrack-IoT.git
cd TempTrack-IoT/server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py

Frontend (Dashboard)
cd ../frontend
npm install
npm run dev


Open your browser at http://<RaspberryPi_IP>:5173 to see the dashboard.

ESP32 Sensor Nodes

Open PlatformIO project in VSCode

Flash src/main.cpp to your ESP32 device

Configure your WiFi credentials and server URL

📈 Data Flow
ESP32 Sensor -> WiFi -> Flask API (Raspberry Pi 5) -> Local Web Dashboard (React)

💡 Usage

Monitor temperatures in real-time

Analyze historical trends

Add new ESP32 sensors easily
