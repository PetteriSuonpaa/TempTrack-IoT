from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import time

app = Flask(__name__)
CORS(app)

# Store latest temperature reading
latest_data = {
    "timestamp": None,
    "yla_temperature": None,
    "ala_temperature": None,
    "jarvi_temperature": None
}

# Store full history of readings in memory
data_history = []

@app.route("/api/data", methods=["POST"])
def receive_data():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    timestamp = data.get("timestamp", int(time.time()))
    yla = data.get("yla_temperature")
    ala = data.get("ala_temperature")
    jarvi = data.get("jarvi_temperature")

    latest_data.update({
        "timestamp": timestamp,
        "yla_temperature": yla,
        "ala_temperature": ala,
        "jarvi_temperature": jarvi,
    })

    # Append new reading to history
    data_history.append({
        "timestamp": timestamp,
        "yla_temperature": yla,
        "ala_temperature": ala,
        "jarvi_temperature": jarvi,
    })

    print(f"Received & stored: {latest_data}")
    return jsonify({"message": "Data received"}), 200

@app.route("/api/current", methods=["GET"])
def get_current_data():
    if latest_data["timestamp"] is None:
        return jsonify({"error": "No data yet"}), 404
    return jsonify(latest_data)

@app.route("/api/history", methods=["GET"])
def get_history():
    try:
        range_minutes = int(request.args.get("range", 60))
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid range parameter"}), 400

    now = datetime.utcnow()
    cutoff = now - timedelta(minutes=range_minutes)

    filtered_data = [
        entry for entry in data_history
        if datetime.utcfromtimestamp(entry["timestamp"]) > cutoff
    ]

    return jsonify(filtered_data), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
