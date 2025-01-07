// script.js

// Selecting elements from the DOM
const inputField = document.querySelector(".input-field");
const mainSection = document.querySelector(".resume-builder");
const outputContainer = document.querySelector(".output-container");

let isHidden = true;

// Helper function to create a section dynamically
function createSection(title, content) {
    return `
        <div class="box">
            <h2>${title}</h2>
            <p>${content || "Not provided"}</p>
        </div>
    `;
}

// Function to toggle between input form and resume preview
function toggleView() {
    if (isHidden) {
        // Hide the input form and show the resume preview
        mainSection.style.display = "none";
        isHidden = false;

        const name = inputField["name"].value.trim();
        const title = inputField["title"].value.trim();
        const objective = inputField["objective"].value.trim();
        const skills = inputField["skills"].value.trim();
        const academicDetails = inputField["academic_details"].value.trim();
        const contact = inputField["contact"].value.trim();
        const workExperience = inputField["work_experience"].value.trim();
        const achievements = inputField["achievements"].value.trim();
        const projects = inputField["projects"].value.trim();

        outputContainer.style.display = "block";
        outputContainer.innerHTML = `
            <div class="output">
                <div class="heading">
                    <h1>${name || "Your Name"}</h1>
                    <h4>${title || "Your Title/Subheading"}</h4>
                </div>
                <div class="info">
                    <div class="left">
                        ${createSection("Objective", objective)}
                        ${createSection("Skills", skills)}
                        ${createSection("Academic Details", academicDetails)}
                        ${createSection("Contact", contact)}
                    </div>
                    <div class="right">
                        ${createSection("Work Experience", workExperience)}
                        ${createSection("Achievements", achievements)}
                        ${createSection("Projects", projects)}
                    </div>
                </div>
            </div>
            <button class="print-btn" onclick="printResume()">Print Resume</button>
            <button class="edit-btn" onclick="toggleView()">Edit Resume</button>
        `;
    } else {
        // Show the input form and hide the resume preview
        mainSection.style.display = "block";
        isHidden = true;

        outputContainer.style.display = "none";
        outputContainer.innerHTML = "";
    }
}

// Function to print the resume
function printResume() {
    const printContent = document.querySelector(".output").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
        <html>
        <head>
            <title>Print Resume</title>
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Add event listener to handle form submission in the future
// (e.g., AJAX calls to save resume data to a server)
inputField.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleView();
});
