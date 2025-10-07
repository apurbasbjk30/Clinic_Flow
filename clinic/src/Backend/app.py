import pandas as pd
from fastapi import FastAPI
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from fastapi.middleware.cors import CORSMiddleware
import numpy as np

# -------------------------------
# Initialize FastAPI
# -------------------------------
app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to your dataset
DEFAULT_CSV = "../../../public/clinic_facebook_leads (1).csv"

# -------------------------------
# Function: Train model and get feature importance
# -------------------------------
def train_model_and_get_importance(df):
    target = "Appointment_Booked"
    features = ['Engagement_Score', 'Response_Time (mins)', 'No_of_Followups']

    # Convert data to numeric
    X = df[features].apply(pd.to_numeric, errors='coerce').fillna(0)
    y = pd.to_numeric(df[target], errors='coerce').fillna(0)

    # Standardize features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Logistic Regression model
    model = LogisticRegression(max_iter=500, class_weight='balanced')
    model.fit(X_scaled, y)

    # Get probabilities for booking
    booking_probs = model.predict_proba(X_scaled)[:, 1]
    lead_probs = df[['Lead_ID', 'Name']].copy()
    lead_probs['Booking_Prob'] = booking_probs.round(2)

    # Get feature importances
    coef = model.coef_[0]
    feature_importance = []
    for f, c in zip(features, coef):
        feature_importance.append({
            "Feature": f,
            "Coefficient": float(c),
            "Importance": float(abs(c))
        })

    return lead_probs.to_dict(orient='records'), feature_importance


# -------------------------------
# API Route: Weekly Reports
# -------------------------------
@app.get("/weekly-reports")
def weekly_reports():
    # Load dataset
    df = pd.read_csv(DEFAULT_CSV)

    # Validate required columns
    required_cols = [
        'Lead_ID', 'Name', 'Engagement_Score',
        'Response_Time (mins)', 'No_of_Followups', 'Appointment_Booked'
    ]
    missing_cols = [c for c in required_cols if c not in df.columns]
    if missing_cols:
        return {"error": f"Missing columns: {missing_cols}"}

    # Train model and get importance
    lead_probs, feature_importance = train_model_and_get_importance(df)

    # Create weekly-style report structure
    return {
        "reports": [
            {
                "week": "Week 1",
                "feature_importance": feature_importance,
                "lead_probabilities": lead_probs
            }
        ]
    }
