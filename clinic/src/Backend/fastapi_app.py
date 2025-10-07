# fastapi_app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# -----------------------------
# 1. Initialize app and CORS
# -----------------------------
app = FastAPI()

# Allow requests from React frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# 2. Load trained ML model
# -----------------------------
model = joblib.load("./lead_score_model.pkl")
scaler = joblib.load("./lead_score_scaler.pkl")

# -----------------------------
# 3. Define input data model
# -----------------------------
class LeadData(BaseModel):
    Ad_Campaign_Name: int
    Ad_Set_Name: int
    Gender: int
    Age: int
    Location: int
    Treatment_Interest: int
    Preferred_Slot: int
    Ad_Spend: float
    Impressions: int
    Clicks: int
    CTR: float
    CPC: float
    Response_Time: int
    No_of_Followups: int
    Engagement_Score: int
    Consent_Status: int
    Appointment_Booked: int

# -----------------------------
# 4. Create API endpoint
# -----------------------------
@app.post("/predict_lead_score")
@app.get("/")
def read_root():
    return {"message": "FastAPI server is running!"}
def predict_lead_score(data: LeadData):
    # Convert input into 2D array
    X_input = np.array([[
        data.Ad_Campaign_Name, data.Ad_Set_Name, data.Gender, data.Age,
        data.Location, data.Treatment_Interest, data.Preferred_Slot,
        data.Ad_Spend, data.Impressions, data.Clicks, data.CTR,
        data.CPC, data.Response_Time, data.No_of_Followups,
        data.Engagement_Score, data.Consent_Status, data.Appointment_Booked
    ]])

    # Scale features same as training
    X_scaled = scaler.transform(X_input)

    # Predict lead score
    pred_score = model.predict(X_scaled)[0]

    return {"lead_score": float(pred_score)}