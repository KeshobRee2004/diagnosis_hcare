# Diagonosis_ChatBot

# Medical Diagnosis ChatBot

This project is a FastAPI-based backend application that uses AI to provide medical-related diagnoses based on patient symptoms. It integrates with the Gemini AI model to generate structured medical reports.

## Features
- Accepts patient information (age, gender, weight, symptoms, and medical history).
- Generates a JSON-based medical report with probable disease, recommendations, and more.
- CORS-enabled for frontend integration.

---

## Prerequisites
Before running the application, ensure you have the following installed:
- Python 3.8 or higher
- `pip` (Python package manager)
- A valid Gemini AI API key

---

## Installation and Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/amaninsights/Diagonosis_ChatBot.git
   cd Diagonosis_ChatBot/Backend
   ```

2. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set Up Environment Variables**
   Create a `.env` file in the `Backend` directory and add your Gemini API key:
   ```plaintext
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

---

## Running the Application

1. **Start the FastAPI Server**
   ```bash
   uvicorn main:app --reload
   ```

2. **Access the API**
   - Open your browser and navigate to:  
     [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)  
     This will open the interactive Swagger UI where you can test the API.

---

## API Endpoint

### POST `/analyze`
- **Description**: Accepts patient information and returns a medical report.
- **Request Body**:
  ```json
  {
    "age": 30,
    "gender": "male",
    "weight": 70.5,
    "symptoms": "fever, headache, fatigue",
    "medical_history": "no prior conditions"
  }
  ```
- **Response**:
  ```json
  {
    "disease": "Influenza",
    "disease_summary": "A viral infection that attacks your respiratory system.",
    "primary_recommendations": "Rest, stay hydrated, and take over-the-counter medications.",
    "doctor_specialty": "General Practitioner",
    "possible_causes": "Viral infection",
    "diagnostic_tests": "Blood test, PCR test",
    "treatment_options": "Antiviral medications, supportive care",
    "risk_factors": "Close contact with infected individuals",
    "prevention_tips": "Get vaccinated, wash hands frequently",
    "emergency_signs": "Difficulty breathing, chest pain",
    "lifestyle_tips": "Maintain a healthy diet, exercise regularly"
  }
  ```

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.