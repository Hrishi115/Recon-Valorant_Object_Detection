import shutil
import uuid
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from ultralytics import YOLO
import os
import cv2

app = FastAPI()

model = YOLO("best.pt")

UPLOAD_DIR = "uploads"
RESULTS_DIR = "results"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(RESULTS_DIR, exist_ok=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def home():
    return {"message": "Healthy!"}

@app.post("/predict-image")
async def predict_image(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    input_path = f"{UPLOAD_DIR}/{file_id}.jpg"

    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    results = model(input_path, conf=0.5, iou=0.5)

    output_path = f"{RESULTS_DIR}/{file_id}.jpg"
    results[0].save(filename=output_path)

    return FileResponse(output_path)

@app.post("/predict-video")
async def predict_video(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())
    input_path = f"{UPLOAD_DIR}/{file_id}.mp4"
    output_path = f"{RESULTS_DIR}/{file_id}.mp4"

    # Save video
    with open(input_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Open video
    cap = cv2.VideoCapture(input_path)

    # Video properties
    width = int(cap.get(3))
    height = int(cap.get(4))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    # Output writer
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # YOLO inference
        results = model(frame, conf=0.4, iou=0.5)

        annotated = results[0].plot()

        out.write(annotated)

    cap.release()
    out.release()

    return FileResponse(output_path)