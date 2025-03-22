// document.getElementById("diagnosisForm").addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent page reload

//     console.log("Submitting form data...");

//     // Get form values
//     const formData = {
//         age: parseInt(document.getElementById("age").value, 10),
//         gender: document.getElementById("gender").value,
//         weight: parseFloat(document.getElementById("weight").value),
//         symptoms: document.getElementById("symptoms").value.trim(),
//         medical_history: document.getElementById("medicalHistory").value.trim()  // FIXED: "medical_history" (not "medicalHistory")
//     };

//     try {
//         // Show loading message
//         document.getElementById("loading").classList.remove("hidden");

//         // Send data to API
//         const response = await fetch("http://localhost:8000/analyze", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Accept": "application/json"
//             },
//             body: JSON.stringify(formData)
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("API Error:", errorData);
//             throw new Error("Network response was not ok");
//         }

//         // Get response data
//         const data = await response.json();
//         console.log("API Response:", data);

//         // Extract required fields
//         console.log("Disease:", data.diagnosis.disease);
//         console.log("Summary:", data.diagnosis.summary);
//         console.log("Severity:", data.diagnosis.severity);

//         // Immediate actions
//         const steps = data.immediate_actions.steps.join(", ");
//         const emergencySigns = data.immediate_actions.emergency_signs.join(", ");
//         console.log("What can do (Steps):", steps);
//         console.log("Emergency signs:", emergencySigns);

//         // Medical recommendations
//         const specialist = data.medical_recommendations.specialist_to_consult;
//         const recommendedTests = data.medical_recommendations.recommended_tests.join(", ");
//         const treatmentOptions = data.medical_recommendations.treatment_options.join(", ");
//         console.log("Specialist to Consult:", specialist);
//         console.log("Recommended Tests:", recommendedTests);
//         console.log("Treatment Options:", treatmentOptions);

//         // Risk factors
//         const causes = data.risk_factors.causes.join(", ");
//         const highRiskGroups = data.risk_factors.high_risk_groups.join(", ");
//         console.log("Causes:", causes);
//         console.log("High-Risk Groups:", highRiskGroups);

//         // Preventive measures
//         const preventionTips = data.preventive_measures.prevention_tips.join(", ");
//         const lifestyleChanges = data.preventive_measures.lifestyle_changes.join(", ");
//         console.log("Prevention Tips:", preventionTips);
//         console.log("Lifestyle Changes:", lifestyleChanges);

//         // Hide loading and show result
//         document.getElementById("loading").classList.add("hidden");
//         document.getElementById("result").classList.remove("hidden");
//         document.getElementById("result").innerHTML = `
//             <h3>Diagnosis Result</h3>
//             <p><strong>Disease:</strong> ${data.diagnosis.disease}</p>
//             <p><strong>Summary:</strong> ${data.diagnosis.summary}</p>
//             <p><strong>Severity:</strong> ${data.diagnosis.severity}</p>
//         `;
//     } catch (error) {
//         console.error("Error:", error);
//         document.getElementById("loading").classList.add("hidden");
//         document.getElementById("result").classList.remove("hidden");
//         document.getElementById("result").innerHTML = `<p style="color:red;">Error fetching diagnosis. Please try again.</p>`;
//     }
// });



// // document.getElementById("diagnosisForm").addEventListener("submit", async function (event) {
// //     event.preventDefault();

// //     console.log("Submitting form data...");

// //     const formData = {
// //         age: parseInt(document.getElementById("age").value, 10),
// //         gender: document.getElementById("gender").value,
// //         weight: parseFloat(document.getElementById("weight").value),
// //         symptoms: document.getElementById("symptoms").value.trim(),
// //         medical_history: document.getElementById("medicalHistory").value.trim()
// //     };

// //     console.log("Form Data Sent:", formData);

// //     try {
// //         const response = await fetch("http://localhost:8000/analyze", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json"
// //             },
// //             body: JSON.stringify(formData)
// //         });

// //         const responseData = await response.json();

// //         if (!response.ok) {
// //             console.error("API Error:", responseData);
// //             throw new Error(responseData.detail ? responseData.detail[0].msg : "Invalid request format");
// //         }

// //         console.log("API Response:", responseData);

// //         // ✅ Format the response properly for display
// //         document.getElementById("result").innerHTML = `
// //             <h2>Diagnosis Report</h2>
            
// //             <h3>Diagnosis</h3>
// //             <p><strong>Disease:</strong> ${responseData.diagnosis.disease}</p>
// //             <p><strong>Summary:</strong> ${responseData.diagnosis.summary}</p>
// //             <p><strong>Severity:</strong> ${responseData.diagnosis.severity}</p>

// //             <h3>Immediate Actions</h3>
// //             <p><strong>What to Do (Steps):</strong> ${responseData.immediate_actions.steps.join(", ")}</p>
// //             <p><strong>Emergency Signs:</strong> ${responseData.immediate_actions.emergency_signs.join(", ")}</p>

// //             <h3>Medical Recommendations</h3>
// //             <p><strong>Specialist to Consult:</strong> ${responseData.medical_recommendations.specialist_to_consult}</p>
// //             <p><strong>Recommended Tests:</strong> ${responseData.medical_recommendations.recommended_tests.join(", ")}</p>
// //             <p><strong>Treatment Options:</strong> ${responseData.medical_recommendations.treatment_options.join(", ")}</p>

// //             <h3>Risk Factors</h3>
// //             <p><strong>Causes:</strong> ${responseData.risk_factors.causes.join(", ")}</p>
// //             <p><strong>High-Risk Groups:</strong> ${responseData.risk_factors.high_risk_groups.join(", ")}</p>

// //             <h3>Preventive Measures</h3>
// //             <p><strong>Prevention Tips:</strong> ${responseData.preventive_measures.prevention_tips.join(", ")}</p>
// //             <p><strong>Lifestyle Changes:</strong> ${responseData.preventive_measures.lifestyle_changes.join(", ")}</p>
// //         `;

// //     } catch (error) {
// //         console.error("Error:", error);
// //         alert("Submission failed. Check console for details.");
// //     }
// // });





document.getElementById("diagnosisForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    console.log("Submitting form data...");

    // Get form values
    const formData = {
        age: parseInt(document.getElementById("age").value, 10),
        gender: document.getElementById("gender").value,
        weight: parseFloat(document.getElementById("weight").value),
        symptoms: document.getElementById("symptoms").value.trim(),
        medical_history: document.getElementById("medicalHistory").value.trim()
    };

    try {
        // Show loading message
        document.getElementById("loading").classList.remove("hidden");

        // Send data to API
        const response = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error:", errorData);
            throw new Error("Network response was not ok");
        }

        // Get response data
        const data = await response.json();
        console.log("API Response:", data);

        // Generate HTML content for display
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").classList.remove("hidden");
        document.getElementById("result").innerHTML = `
            <h3>Diagnosis Result</h3>
            <p><strong>Disease:</strong> ${data.diagnosis.disease}</p>
            <p><strong>Summary:</strong> ${data.diagnosis.summary}</p>
            <p><strong>Severity:</strong> ${data.diagnosis.severity}</p>

            <h3>Immediate Actions</h3>
            <p><strong>Steps:</strong> ${data.immediate_actions.steps.join(", ")}</p>
            <p><strong>Emergency Signs:</strong> ${data.immediate_actions.emergency_signs.join(", ")}</p>

            <h3>Medical Recommendations</h3>
            <p><strong>Specialist to Consult:</strong> ${data.medical_recommendations.specialist_to_consult}</p>
            <p><strong>Recommended Tests:</strong> ${data.medical_recommendations.recommended_tests.join(", ")}</p>
            <p><strong>Treatment Options:</strong> ${data.medical_recommendations.treatment_options.join(", ")}</p>

            <h3>Risk Factors</h3>
            <p><strong>Causes:</strong> ${data.risk_factors.causes.join(", ")}</p>
            <p><strong>High-Risk Groups:</strong> ${data.risk_factors.high_risk_groups.join(", ")}</p>

            <h3>Preventive Measures</h3>
            <p><strong>Prevention Tips:</strong> ${data.preventive_measures.prevention_tips.join(", ")}</p>
            <p><strong>Lifestyle Changes:</strong> ${data.preventive_measures.lifestyle_changes.join(", ")}</p>
        `;

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").classList.remove("hidden");
        document.getElementById("result").innerHTML = `<p style="color:red;">Error fetching diagnosis. Please try again.</p>`;
    }
});
