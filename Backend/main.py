import os
import google.generativeai as genai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize Gemini AI
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-pro")  # Use Gemini model

app = FastAPI()

# Enable CORS to fix the 405 OPTIONS error
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all frontend domains (change to specific URL if needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (POST, GET, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Define request model
class PatientInfo(BaseModel):
    age: int
    gender: str
    weight: float
    symptoms: str
    medical_history: str

# Function to generate medical report
def generate_medical_report(data: PatientInfo):
    prompt = f"""
    You are an AI medical assistant. Your task is to provide a **strictly medical-related diagnosis** 
    based on patient symptoms. Avoid personal opinions, non-medical topics, and unnecessary content. 

    ### Patient Information:
    - Age: {data.age}
    - Gender: {data.gender}
    - Weight: {data.weight} kg
    - Symptoms: {data.symptoms}
    - Medical History: {data.medical_history}

    ### Required Output (in JSON format):
    {{
        "diagnosis": {{
            "disease": "The most probable disease in 1-2 lines.",
            "summary": "Brief explanation of the disease.",
            "severity": "Mild/Moderate/Severe"
        }},
        "immediate_actions": {{
            "steps": ["Step 1", "Step 2"],
            "emergency_signs": ["Sign 1", "Sign 2"]
        }},
        "medical_recommendations": {{
            "specialist_to_consult": "Cardiologist, Neurologist, etc.",
            "recommended_tests": ["Blood test", "MRI", "X-ray"],
            "treatment_options": ["Medication", "Therapy", "Surgery"]
        }},
        "risk_factors": {{
            "causes": ["Cause 1", "Cause 2"],
            "high_risk_groups": ["Elderly", "Diabetics"]
        }},
        "preventive_measures": {{
            "prevention_tips": ["Tip 1", "Tip 2"],
            "lifestyle_changes": ["Exercise", "Balanced diet", "Quit smoking"]
        }}
    }}
    """

    try:
        response = model.generate_content(prompt)
        return response.text  # Extract structured JSON response
    except Exception as e:
        return {"error": "Failed to generate report", "details": str(e)}

# API endpoint
@app.post("/analyze")
async def analyze_patient(data: PatientInfo):
    try:
        report = generate_medical_report(data)
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
