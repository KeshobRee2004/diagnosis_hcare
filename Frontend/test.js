

const data = {
    "diagnosis": {
      "disease": "Hypertensive Emergency/Urgency",
      "summary": "Headache and dizziness in a patient with a history of hypertension may indicate a hypertensive crisis. This requires prompt evaluation to differentiate between hypertensive urgency (no end-organ damage) and hypertensive emergency (end-organ damage).",
      "severity": "Potentially Severe"
    },
    "immediate_actions": {
      "steps": [
        "Check blood pressure immediately.",
        "Monitor for signs of neurological deficits (e.g., vision changes, weakness, speech difficulties)."
      ],
      "emergency_signs": [
        "Severe headache unresponsive to analgesics",
        "Sudden vision changes",
        "Chest pain",
        "Shortness of breath",
        "Seizures",
        "Weakness or numbness of face, arm or leg",
        "Difficulty speaking"
      ]
    },
    "medical_recommendations": {
      "specialist_to_consult": "Cardiologist/Neurologist",
      "recommended_tests": [
        "Complete Blood Count (CBC)",
        "Comprehensive Metabolic Panel (CMP)",
        "Electrocardiogram (ECG)",
        "Urinalysis",
        "CT scan or MRI of the brain (if neurological symptoms are present)"
      ],
      "treatment_options": [
        "Oral antihypertensive medication (if hypertensive urgency)",
        "Intravenous antihypertensive medication (if hypertensive emergency)",
        "Close monitoring of blood pressure and organ function",
        "Further investigation to rule out other causes of headache and dizziness"
      ]
    },
    "risk_factors": {
      "causes": [
        "Poorly controlled hypertension",
        "Non-adherence to antihypertensive medications",
        "Kidney disease",
        "Endocrine disorders",
        "Stress"
      ],
      "high_risk_groups": [
        "Patients with pre-existing hypertension",
        "Patients with kidney disease",
        "African Americans",
        "Pregnant women (eclampsia)"
      ]
    },
    "preventive_measures": {
      "prevention_tips": [
        "Adhere to prescribed antihypertensive medications.",
        "Monitor blood pressure regularly.",
        "Follow up with healthcare provider regularly."
      ],
      "lifestyle_changes": [
        "Maintain a healthy weight.",
        "Reduce sodium intake.",
        "Engage in regular physical activity.",
        "Manage stress."
      ]
    }
  }

// Extract required fields
console.log("Disease:", data.diagnosis.disease);
console.log("Summary:", data.diagnosis.summary);
console.log("Severity:", data.diagnosis.severity);


// Extract required fields
const steps = data.immediate_actions.steps.join(", ");
const emergencySigns = data.immediate_actions.emergency_signs.join(", ");

// Print formatted output
console.log("What can do (Steps):", steps);
console.log("Emergency signs:", emergencySigns);


// Extract required fields
const specialist = data.medical_recommendations.specialist_to_consult;
const recommendedTests = data.medical_recommendations.recommended_tests.join(", ");
const treatmentOptions = data.medical_recommendations.treatment_options.join(", ");

// Print formatted output
console.log("Specialist to Consult:", specialist);
console.log("Recommended Tests:", recommendedTests);
console.log("Treatment Options:", treatmentOptions);

// Extract required fields
const causes = data.risk_factors.causes.join(", ");
const highRiskGroups = data.risk_factors.high_risk_groups.join(", ");

// Print formatted output
console.log("Causes:", causes);
console.log("High-Risk Groups:", highRiskGroups);

// Extract required fields
const preventionTips = data.preventive_measures.prevention_tips.join(", ");
const lifestyleChanges = data.preventive_measures.lifestyle_changes.join(", ");

// Print formatted output
console.log("Prevention Tips:", preventionTips);
console.log("Lifestyle Changes:", lifestyleChanges);