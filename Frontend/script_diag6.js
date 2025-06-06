
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("diagnosisForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default page reload

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

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      document.getElementById("loading").classList.add("hidden");

      // Save data to localStorage and open report page
      localStorage.setItem("diagnosisData", JSON.stringify(data));
      window.open("report.html", "_blank"); // Open new tab/page

    } catch (error) {
      console.error("Error:", error);
      document.getElementById("loading").classList.add("hidden");
      alert("Failed to get diagnosis. Try again!");
    }
  });
});
