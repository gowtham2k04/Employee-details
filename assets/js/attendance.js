//nav bar section
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
function logout() {
  // You can clear local/session storage here if needed
  // sessionStorage.clear();
  // localStorage.clear();
  
  // Redirect to login page
  window.location.href = "../pages/login.html";
}




document.addEventListener("DOMContentLoaded", loadAttendanceTable);

function loadAttendanceTable() {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const attendanceRecords = JSON.parse(localStorage.getItem('attendance')) || [];
  const tableBody = document.querySelector("#attendanceTable tbody");
  tableBody.innerHTML = "";

  employees.forEach(employee => {
    const todayRecord = attendanceRecords.find(record => 
      record.empID === employee.id && record.date === getTodayDate()
    );

    const status = todayRecord ? todayRecord.status : "Not Marked";
    const time = todayRecord ? todayRecord.time : "-";

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.id}</td>
      <td>${employee.role}</td>
      <td>${status}</td>
      <td>${getTodayDate()}</td>
      <td>${time}</td>
      <td>
        <button onclick="markAttendance('${employee.id}', 'Present')">Present</button>
        <button onclick="markAttendance('${employee.id}', 'Absent')">Absent</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function markAttendance(empID, status) {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  const attendanceRecords = JSON.parse(localStorage.getItem('attendance')) || [];

  const employee = employees.find(emp => emp.id == empID);
  const now = new Date();
  
  const record = {
    empName: employee.name,
    empID: employee.id,
    role: employee.role,
    status: status,
    date: getTodayDate(),
    time: now.toLocaleTimeString()
  };

  // Remove old record for today if exists
  const index = attendanceRecords.findIndex(r => r.empID === empID && r.date === getTodayDate());
  if (index !== -1) {
    attendanceRecords.splice(index, 1);
  }
  
  attendanceRecords.push(record);
  localStorage.setItem('attendance', JSON.stringify(attendanceRecords));
  loadAttendanceTable();
}

function getTodayDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}


document.getElementById('downloadAttendance').addEventListener('click', downloadAttendanceCSV);

function downloadAttendanceCSV() {
  const attendanceRecords = JSON.parse(localStorage.getItem('attendance')) || [];

  if (attendanceRecords.length === 0) {
    alert("No attendance records available!");
    return;
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Employee Name,Employee ID,Role,Status,Date,Time\n"; // CSV Header

  attendanceRecords.forEach(record => {
    const row = [
      record.empName,
      record.empID,
      record.role,
      record.status,
      record.date,
      record.time
    ];
    csvContent += row.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "employee_attendance.csv");
  document.body.appendChild(link); // Required for Firefox
  link.click();
  document.body.removeChild(link);
}
