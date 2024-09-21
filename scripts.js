$(document).ready(function() {
    const teachers = ["Prof. A", "Prof. B", "Prof. C", "Prof. D", "Prof. E", "Prof. F"];
    const courses = ["Math 101", "CS 202", "Physics 303"];
    const studentCounts = ["20", "50", "60", "120"];

    // Generate time rows from 9:00 to 21:00
    const hours = [];
    for (let i = 9; i < 22; i++) {
        hours.push(`${i}:00 - ${i+1}:00`);
    }

    // Initialize each table
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
            <select class="teacher-dropdown">${generateOptions(["Select Teacher"].concat(teachers))}</select>
            <button class="add-teacher-btn">Add Teacher</button>
            <div class="teacher-list"></div>
            <select class="course-dropdown">${generateOptions(["Select Course"].concat(courses))}</select>
            <select class="student-dropdown">${generateOptions(["Select Amount"].concat(studentCounts))}</select>
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
                <button class="remove-teacher-btn">Remove</button>
            </div>
        `);

        // Reset the dropdown to "Select Teacher"
        $teacherDropdown.val("Select Teacher");
    });

    // Handle teacher removal
    $(document).on('click', '.remove-teacher-btn', function() {
        $(this).parent().remove();
    });

    // Handle tab navigation (Pagination)
    $('.tab').click(function() {
        const tabId = $(this).data('tab');
        
        // Remove active class from all tabs and add to the clicked one
        $('.tab').removeClass('active');
        $(this).addClass('active');
        
        // Hide all tab contents and show the selected one
        $('.tab-content').removeClass('active');
        $(`#${tabId}`).addClass('active');
    });

    // Auto-fill schedule
    $('#auto-fill-btn').click(function() {
        const ruleTeacherConflict = $('#rule-teacher-conflict').is(':checked');
        const assignedTeachers = {};

        // Iterate over each schedule cell
        $('.schedule-cell').each(function() {
            const $cell = $(this);
            const $teacherList = $cell.find('.teacher-list');
            const $courseDropdown = $cell.find('.course-dropdown');
            const $studentDropdown = $cell.find('.student-dropdown');

            // Clear existing teachers
            $teacherList.empty();

            // Randomly fill teachers while checking for conflicts
            const randomCourse = courses[Math.floor(Math.random() * courses.length)];
            const randomStudentCount = studentCounts[Math.floor(Math.random() * studentCounts.length)];
            const timeSlot = $cell.closest('tr').find('td:first').text(); // Get time slot

            let teachersToAdd = [];
            let numberOfTeachers = Math.floor(Math.random() * 6) + 1; // Up to 6 teachers

            // Temporary array to hold used teachers for this time slot
            let usedTeachers = [];

            let attemptCount = 0;
            const maxAttempts = 10; // Limit attempts to avoid infinite loop

            // Fill teachers without violating the conflict rule
            while (teachersToAdd.length < numberOfTeachers && attemptCount < maxAttempts) {
                const randomTeacher = teachers[Math.floor(Math.random() * teachers.length)];

                // Check if teacher is already assigned at the same time
                if (!usedTeachers.includes(randomTeacher) &&
                    (!ruleTeacherConflict || !assignedTeachers[randomTeacher]?.includes(timeSlot))) {
                    teachersToAdd.push(randomTeacher);
                    usedTeachers.push(randomTeacher);
                }

                attemptCount++;
            }

            // If attempts exceed max without finding teachers, stop filling this cell
            if (teachersToAdd.length === 0) {
                console.warn(`Could not find valid teachers for time slot: ${timeSlot}`);
                return; // Skip this cell
            }

            // Add teachers to the cell
            teachersToAdd.forEach(teacher => {
                $teacherList.append(`
                    <div class="teacher-item">
                        ${teacher} 
                        <button class="remove-teacher-btn">Remove</button>
                    </div>
                `);
                
                // Track assigned teachers for the time slot
                if (assignedTeachers[teacher]) {
                    assignedTeachers[teacher].push(timeSlot);
                } else {
                    assignedTeachers[teacher] = [timeSlot];
                }
            });

            // Set the course and student amount
            $courseDropdown.val(randomCourse);
            $studentDropdown.val(randomStudentCount);
        });
    });
});
