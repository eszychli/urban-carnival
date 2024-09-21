$(document).ready(function() {
    const teachers = ["Prof. A", "Prof. B", "Prof. C", "Prof. D", "Prof. E", "Prof. F"];
    const courses = ["Math 101", "CS 202", "Physics 303"];
    const studentCounts = ["20", "50", "60", "120"];
    const hours = [];
    
    // Generate time rows from 9:00 to 21:00
    for (let i = 9; i < 22; i++) {
        hours.push(`${i}:00 - ${i+1}:00`);
    }

    // Initialize each schedule table
    $('.schedule-table').each(function() {
        const $tableBody = $('<tbody>');
        const tableHeader = `
            <thead>
                <tr>
                    <th>Time</th>
                    <th colspan="2">Sunday</th>
                    <th colspan="2">Tuesday</th>
                    <th colspan="2">Thursday</th>
                </tr>
                <tr>
                    <th></th>
                    <th>Semester A</th>
                    <th>Semester B</th>
                    <th>Semester A</th>
                    <th>Semester B</th>
                    <th>Semester A</th>
                    <th>Semester B</th>
                </tr>
            </thead>`;
        $(this).append(tableHeader).append($tableBody);

        hours.forEach(hour => {
            let row = `<tr>
                        <td>${hour}</td>
                        <td class="schedule-cell">${generateDropdowns()}</td>
                        <td class="schedule-cell">${generateDropdowns()}</td>
                        <td class="schedule-cell">${generateDropdowns()}</td>
                        <td class="schedule-cell">${generateDropdowns()}</td>
                        <td class="schedule-cell">${generateDropdowns()}</td>
                        <td class="schedule-cell">${generateDropdowns()}</td>
                      </tr>`;
            $tableBody.append(row);
        });
    });

    // Function to generate dropdowns for teacher, course, and student count
    function generateDropdowns() {
        return `
            <select class="form-select teacher-dropdown mb-2">${generateOptions(["Select Teacher"].concat(teachers))}</select>
            <button class="btn btn-outline-secondary add-teacher-btn mb-2">Add Teacher</button>
            <div class="teacher-list"></div>
            <select class="form-select course-dropdown mb-2">${generateOptions(["Select Course"].concat(courses))}</select>
            <select class="form-select student-dropdown">${generateOptions(["Select Amount"].concat(studentCounts))}</select>
        `;
    }

    // Function to create <option> tags from an array of values
    function generateOptions(items) {
        return items.map(item => `<option value="${item}">${item}</option>`).join('');
    }

    // Handle "Add Teacher" button click
    $(document).on('click', '.add-teacher-btn', function() {
        const $cell = $(this).closest('.schedule-cell');
        const $teacherDropdown = $cell.find('.teacher-dropdown');
        const selectedTeacher = $teacherDropdown.val();

        if (selectedTeacher === "Select Teacher") {
            alert("Please select a valid teacher.");
            return;
        }

        const $teacherList = $cell.find('.teacher-list');
        if ($teacherList.children().length >= 6) {
            alert("You can only add up to 6 teachers.");
            return;
        }

        // Add teacher to the list in the cell
        $teacherList.append(`
            <div class="teacher-item">
                ${selectedTeacher} 
                <button class="btn btn-danger btn-sm remove-teacher-btn">Remove</button>
            </div>
        `);

        // Reset the dropdown to "Select Teacher"
        $teacherDropdown.val("Select Teacher");
    });

    // Handle teacher removal
    $(document).on('click', '.remove-teacher-btn', function() {
        $(this).parent().remove();
    });

    // Auto-fill random data into all tables
    $('#auto-fill-btn').click(function() {
        const ruleTeacherConflict = $('#rule-teacher-conflict').is(':checked');

        $('.schedule-cell').each(function() {
            const $cell = $(this);
            const $teacherList = $cell.find('.teacher-list');
            const $courseDropdown = $cell.find('.course-dropdown');
            const $studentDropdown = $cell.find('.student-dropdown');

            // Clear existing teachers
            $teacherList.empty();

            // Pick a random number of teachers (between 1 and 6) and fill the cell
            const randomTeachers = [];
            for (let i = 0; i < Math.floor(Math.random() * 6) + 1; i++) {
                const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];
                if (ruleTeacherConflict) {
                    const isTeacherAlreadyAssigned = $('.teacher-list').text().includes(randomTeacher);
                    if (!isTeacherAlreadyAssigned) {
                        randomTeachers.push(randomTeacher);
                    }
                } else {
                    randomTeachers.push(randomTeacher);
                }
            }

            // Add teachers to the cell
            randomTeachers.forEach(teacher => {
                $teacherList.append(`
                    <div class="teacher-item">
                        ${teacher} 
                        <button class="btn btn-danger btn-sm remove-teacher-btn">Remove</button>
                    </div>
                `);
            });

            // Set the course and student amount
            const randomCourse = courses[Math.floor(Math.random() * courses.length)];
            const randomStudentCount = studentCounts[Math.floor(Math.random() * studentCounts.length)];
            $courseDropdown.val(randomCourse);
            $studentDropdown.val(randomStudentCount);
        });
    });
});
