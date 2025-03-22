from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import json
import logging
from dotenv import load_dotenv
import os
import re

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Allow frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY is not set. Please ensure it is defined in the .env file.")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# Define request model
class MedicalRequest(BaseModel):
    age: int
    gender: str
    weight: float
    symptoms: str
    medical_history: str

# Define response schema
class Diagnosis(BaseModel):
    disease: str
    summary: str
    severity: str

class ImmediateActions(BaseModel):
    steps: list[str]
    emergency_signs: list[str]

class MedicalRecommendations(BaseModel):
    specialist_to_consult: str
    recommended_tests: list[str]
    treatment_options: list[str]

class RiskFactors(BaseModel):
    causes: list[str]
    high_risk_groups: list[str]

class PreventiveMeasures(BaseModel):
    prevention_tips: list[str]
    lifestyle_changes: list[str]

class MedicalReport(BaseModel):
    diagnosis: Diagnosis
    immediate_actions: ImmediateActions
    medical_recommendations: MedicalRecommendations
    risk_factors: RiskFactors
    preventive_measures: PreventiveMeasures

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# API endpoint for analysis
@app.post("/analyze", response_model=MedicalReport)
async def generate_medical_report(request: MedicalRequest):
    # Define the prompt for the AI model
    prompt = f"""
    You are a medical AI assistant. Generate a structured medical report in **strictly valid JSON format** based on the patient's details.

    Patient Details:
    - Age: {request.age}
    - Gender: {request.gender}
    - Weight: {request.weight} kg
    - Symptoms: {request.symptoms}
    - Medical History: {request.medical_history}

    Format the response as follows:
    {{
        "diagnosis": {{
            "disease": "Possible disease name",
            "summary": "Brief description of the disease",
            "severity": "Severity level"
        }},
        "immediate_actions": {{
            "steps": ["Action 1", "Action 2"],
            "emergency_signs": ["Sign 1", "Sign 2"]
        }},
        "medical_recommendations": {{
            "specialist_to_consult": "Specialist type",
            "recommended_tests": ["Test 1", "Test 2"],
            "treatment_options": ["Treatment 1", "Treatment 2"]
        }},
        "risk_factors": {{
            "causes": ["Cause 1", "Cause 2"],
            "high_risk_groups": ["Group 1", "Group 2"]
        }},
        "preventive_measures": {{
            "prevention_tips": ["Tip 1", "Tip 2"],
            "lifestyle_changes": ["Change 1", "Change 2"]
        }}
    }}
    **Important:** Return **only JSON** without any additional text or explanations.
    """

    try:
        # Generate content from AI
        response = model.generate_content(prompt)
        
        # Log the AI response
        logger.info("AI Response: %s", response.text)
        
        # Print the AI response to the terminal
        print("AI Response:", response.text)

        # Extract JSON from the response (remove any non-JSON text)
        json_match = re.search(r"\{.*\}", response.text, re.DOTALL)
        if not json_match:
            raise ValueError("No JSON found in the AI response")

        ai_response_json = json.loads(json_match.group(0))

        # Return parsed JSON response
        return ai_response_json

    except json.JSONDecodeError:
        logger.error("Failed to parse AI response as JSON")
        raise HTTPException(status_code=500, detail="AI response is not in JSON format")

    except Exception as e:
        logger.error("AI processing error: %s", str(e))
        raise HTTPException(status_code=500, detail=f"AI processing error: {str(e)}")