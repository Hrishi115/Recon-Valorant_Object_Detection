# 🎯 Recon: an AI-Based Visual Scene Understanding System

An intelligent system that analyzes images and videos to detect objects and generate meaningful scene descriptions using deep learning and modern web technologies.

---

## 🚀 Overview

This project combines **computer vision** and **AI-driven summarization** to transform raw visual data into structured, human-readable insights.

> Given an image or video → Detect objects → Understand context → Generate meaningful output

---

## 🧠 Features

* 🔍 Object detection using YOLO
* 🖼️ Image analysis with structured outputs
* 🎥 Video processing with frame-based detection
* 🧾 Scene summarization using AI logic
* 🌐 Full-stack web interface (React + FastAPI)
* ⚡ Modular and scalable architecture

---

## 🏗️ Architecture

The system follows a clean, modular pipeline:

```
Input → Processing → Detection → Intelligence → Output → Delivery
```

### Components:

* **Frontend (React)**

  * User interface for uploading images/videos
  * Displays detection results and summaries

* **Backend (FastAPI)**

  * Handles API requests
  * Processes images/videos
  * Integrates detection and summarization modules

* **Detection Module**

  * YOLO-based object detection

* **Intelligence Layer**

  * Converts detected objects into meaningful descriptions

---

## 🧩 Tech Stack

* **Frontend:** React, JavaScript
* **Backend:** FastAPI, Python
* **AI/ML:** YOLO (Object Detection)
* **Other Tools:** OpenCV, NumPy

---

## 📦 Project Structure

```
project-root/
│
├── frontend/        # React app
├── backend/
│   ├── api/         # FastAPI routes
│   ├── models/      # Model loading logic
│   ├── services/    # Detection & processing
│   └── utils/       # Helper functions
│
├── README.md
└── requirements.txt
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

---

### 3. Download Model Weights

⚠️ Model weights are not included due to size constraints.

Download link will soon be providen.

---

### 4. Run Backend

```bash
uvicorn main:app --reload
```

---

### 5. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🔌 API Endpoints

* `POST /detect-image` → Analyze image
* `POST /detect-video` → Analyze video
* `GET /health` → Server status

---

## 📊 Example Output

### 🖼️ Image / 🎥 Video Output

The system returns processed media with detected objects highlighted using bounding boxes.

* Objects are labeled with class names
* Confidence scores are displayed
* Output is returned as an annotated image or processed video

👉 Example:

> An image/video with bounding boxes around detected objects like "teammate", "enemy", etc.

---

## 🔮 Future Improvements

* Text-based scene summarization from detected objects
* Real-time video streaming support
* Advanced scene understanding using LLMs
* User authentication & history tracking
* Deployment on cloud (AWS/GCP)

---

## 🧠 Key Engineering Highlights

* Modular architecture (easy to extend/replace components)
* Clear separation of concerns
* Defined data flow between modules
* Scalable design for future real-time processing
* Clean API design for integration

---

## 📌 Notes

* Model weights are excluded for repository efficiency and reproducibility.
* The system is designed to be easily extendable with different models.

---

## 🙌 Author

**Hrishikesh Shendage**

---

## ⭐ If you found this useful

Give it a star ⭐ and feel free to fork!