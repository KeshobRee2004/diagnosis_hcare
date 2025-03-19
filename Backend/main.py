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
        "disease": "The most probable disease in 1-2 lines.",
        "disease_summary": "Brief explanation of the disease.",
        "primary_recommendations": "Immediate steps the patient should take.",
        "doctor_specialty": "Which doctor to consult (e.g., Cardiologist, Neurologist).",
        "possible_causes": "List of possible causes of the disease.",
        "diagnostic_tests": "Recommended medical tests (e.g., Blood test, MRI, X-ray).",
        "treatment_options": "General treatment options available.",
        "risk_factors": "Factors that increase the risk of this disease.",
        "prevention_tips": "Tips to prevent this disease in the future.",
        "emergency_signs": "When to seek emergency medical help.",
        "lifestyle_tips": "General lifestyle changes to manage this condition."
    }}

    **Important:** Do NOT include speculative information or unrelated content.
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
