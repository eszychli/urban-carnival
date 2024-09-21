document.addEventListener("DOMContentLoaded", () => {
    const teacherSelect = document.getElementById("teacherSelect");
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        // Create input fields
        const teacherInput = document.createElement("input");
        teacherInput.type = "text";
        teacherInput.placeholder = "Teacher";
        teacherInput.style.width = "100%";

        const courseInput = document.createElement("input");
        courseInput.type = "text";
        courseInput.placeholder = "Course";
        courseInput.style.width = "100%";

        const studentInput = document.createElement("input");
        studentInput.type = "number";
        studentInput.placeholder = "Students";
        studentInput.style.width = "100%";

        // Append inputs to the cell
        cell.appendChild(teacherInput);
        cell.appendChild(courseInput);
        cell.appendChild(studentInput);

        // Set default teacher input from the select dropdown
        teacherInput.addEventListener("focus", () => {
            teacherInput.value = teacherSelect.value;
        });
    });
});
