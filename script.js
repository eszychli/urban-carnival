document.addEventListener("DOMContentLoaded", () => {
    const teacherSelect = document.getElementById("teacherSelect");
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (teacherSelect.value) {
                cell.textContent = teacherSelect.value;
            } else {
                alert("Please select a teacher first.");
            }
        });
    });
});
