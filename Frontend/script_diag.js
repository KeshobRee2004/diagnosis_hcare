

document.getElementById("diagnosisForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    // Get form values
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const weight = document.getElementById("weight").value;
    const symptoms = document.getElementById("symptoms").value;
    const medicalHistory = document.getElementById("medicalHistory").value;

    // Show loading
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    const patientData = { age, gender, weight, symptoms, medical_history: medicalHistory };

    try {
        const response = await fetch("http://localhost:8000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patientData)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch diagnosis");
        }

        const result = await response.json();
        document.getElementById("reportOutput").textContent = JSON.stringify(result, null, 2);

        // Hide loading, show result
        document.getElementById("loading").classList.add("hidden");
        document.getElementById("result").classList.remove("hidden");

    } catch (error) {
        console.error("Error:", error);
        alert("Failed to get a diagnosis. Try again later.");
        document.getElementById("loading").classList.add("hidden");
    }
});

// Function to Download Report
function downloadReport() {
    const reportText = document.getElementById("reportOutput").textContent;
    const blob = new Blob([reportText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Medical_Report.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
