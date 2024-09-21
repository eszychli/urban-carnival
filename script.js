document.addEventListener("DOMContentLoaded", () => {
    const teacherSelect = document.getElementById("teacherSelect");
    const cells = document.querySelectorAll(".cell");

    // Sample courses and student count options
    const courses = ["Mathematics", "Physics", "Chemistry", "Biology", "Computer Science"];
    const studentCounts = Array.from({ length: 101 }, (_, i) => i); // 0 to 100

    const teachers = Array.from(teacherSelect.options).slice(1).map(option => option.value);

    cells.forEach(cell => {
        // Create dropdown for teachers
        const teacherDropdown = document.createElement("select");
        const defaultTeacherOption = document.createElement("option");
        defaultTeacherOption.value = "";
        defaultTeacherOption.textContent = "Select Teacher";
        teacherDropdown.appendChild(defaultTeacherOption);
        teachers.forEach(teacher => {
            const option = document.createElement("option");
            option.value = teacher;
            option.textContent = teacher;
            teacherDropdown.appendChild(option);
        });

        // Create dropdown for courses
        const courseDropdown = document.createElement("select");
        const defaultCourseOption = document.createElement("option");
        defaultCourseOption.value = "";
        defaultCourseOption.textContent = "Select Course";
        courseDropdown.appendChild(defaultCourseOption);
        courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseDropdown.appendChild(option);
        });

        // Create dropdown for number of students
        const studentDropdown = document.createElement("select");
        const defaultStudentOption = document.createElement("option");
        defaultStudentOption.value = "";
        defaultStudentOption.textContent = "Select Students";
        studentDropdown.appendChild(defaultStudentOption);
        studentCounts.forEach(count => {
            const option = document.createElement("option");
            option.value = count;
            option.textContent = count;
            studentDropdown.appendChild(option);
        });

        // Append dropdowns to the cell
        cell.appendChild(teacherDropdown);
        cell.appendChild(courseDropdown);
        cell.appendChild(studentDropdown);
    });
});
