document.addEventListener("DOMContentLoaded", function () {
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
            document.getElementById("loading").classList.remove("hidden");

            const response = await fetch("http://localhost:8000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            console.log("API Response:", data);

            // Generate formatted A4 report content
            const reportHTML = `
                <div class="section">
                    <p><span class="label">Disease:</span> ${data.diagnosis.disease}</p>
                    <p><span class="label">Summary:</span> ${data.diagnosis.summary}</p>
                </div>

                <div class="section">
                    <h3>Immediate Actions</h3>
                    <p><span class="label">Steps:</span> ${data.immediate_actions.steps.join(", ")}</p>
                </div>

                <div class="section">
                    <h3>Medical Recommendations</h3>
                    <p><span class="label">Specialist to Consult:</span> ${data.medical_recommendations.specialist_to_consult}</p>
                    <p><span class="label">Recommended Tests:</span> ${data.medical_recommendations.recommended_tests.join(", ")}</p>
                </div>

                <div class="section">
                    <h3>Risk Factors</h3>
                    <p><span class="label">Causes:</span> ${data.risk_factors.causes.join(", ")}</p>
                </div>

                <div class="section">
                    <h3>Preventive Measures</h3>
                    <p><span class="label">Tips:</span> ${data.preventive_measures.prevention_tips.join(", ")}</p>
                    <p><span class="label">Lifestyle Changes:</span> ${data.preventive_measures.lifestyle_changes.join(", ")}</p>
                </div>
            `;

            // Display the report inside the A4 container on the same page
            document.getElementById("loading").classList.add("hidden");
            document.getElementById("reportContainer").classList.remove("hidden");
            document.getElementById("reportContent").innerHTML = reportHTML;

        } catch (error) {
            console.error("Error:", error);
            document.getElementById("loading").classList.add("hidden");
            alert("Error fetching diagnosis. Please try again.");
        }
    });
});
