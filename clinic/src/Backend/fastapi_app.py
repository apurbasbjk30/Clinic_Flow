# fastapi_app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import joblib
import numpy as np

# -----------------------------
# App & CORS
# -----------------------------
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Load model, scaler, encoders
# -----------------------------
model = joblib.load("./lead_score_model.pkl")
scaler = joblib.load("./lead_score_scaler.pkl")
le_ad_campaign = joblib.load("./le_Ad_Campaign_Name.pkl")
le_ad_set = joblib.load("./le_Ad_Set_Name.pkl")
le_gender = joblib.load("./le_Gender.pkl")
le_location = joblib.load("./le_Location.pkl")
le_treatment = joblib.load("./le_Treatment_Interest.pkl")
le_slot = joblib.load("./le_Preferred_Slot.pkl")

# -----------------------------
# Input schema
# -----------------------------
class LeadData(BaseModel):
    Ad_Campaign_Name: str
    Ad_Set_Name: str
    Gender: str
    Age: int
    Location: str
    Treatment_Interest: str
    Preferred_Slot: str
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
# Helper: transform categorical
# -----------------------------
def transform_categorical(val, le):
    try:
        return le.transform([val])[0]
    except:
        return -1  # unknown category

# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def read_root():
    return {"message": "FastAPI server is running!"}

@app.post("/predict_batch")
def predict_batch(leads: List[LeadData]):
    X_input = np.array([
        [
            transform_categorical(l.Ad_Campaign_Name, le_ad_campaign),
            transform_categorical(l.Ad_Set_Name, le_ad_set),
            transform_categorical(l.Gender, le_gender),
            l.Age,
            transform_categorical(l.Location, le_location),
            transform_categorical(l.Treatment_Interest, le_treatment),
            transform_categorical(l.Preferred_Slot, le_slot),
            l.Ad_Spend, l.Impressions, l.Clicks, l.CTR,
            l.CPC, l.Response_Time, l.No_of_Followups,
            l.Engagement_Score, l.Consent_Status, l.Appointment_Booked
        ]
        for l in leads
    ])

    # Scale & predict
    X_scaled = scaler.transform(X_input)
    predictions = model.predict(X_scaled)
    return [{"lead_score": float(p)} for p in predictions]