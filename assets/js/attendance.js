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



const attendanceData = [
    { name: "Gowtham", department: "IT", role: "Developer", status: "Present", date: "2025-04-25" },
    { name: "Priya", department: "HR", role: "Manager", status: "Late", date: "2025-04-25" },
    { name: "Raj", department: "Sales", role: "Executive", status: "Absent", date: "2025-04-25" },
    { name: "Kumar", department: "IT", role: "Developer", status: "Present", date: "2025-04-25" },
    { name: "Sneha", department: "Sales", role: "Executive", status: "Present", date: "2025-04-25" },
  ];
  
  const tableBody = document.getElementById("tableBody");
  
  function loadTable(data) {
    tableBody.innerHTML = "";
    data.forEach((row) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.department}</td>
        <td>${row.role}</td>
        <td>${row.status}</td>
        <td>${row.date}</td>
      `;
      tableBody.appendChild(tr);
    });
  }
  
  // Filter functionality
  document.getElementById("searchName").addEventListener("input", filterData);
  document.getElementById("filterDepartment").addEventListener("change", filterData);
  document.getElementById("filterRole").addEventListener("change", filterData);
  
  function filterData() {
    const nameFilter = document.getElementById("searchName").value.toLowerCase();
    const deptFilter = document.getElementById("filterDepartment").value;
    const roleFilter = document.getElementById("filterRole").value;
  
    const filtered = attendanceData.filter((item) => {
      return (
        item.name.toLowerCase().includes(nameFilter) &&
        (deptFilter === "" || item.department === deptFilter) &&
        (roleFilter === "" || item.role === roleFilter)
      );
    });
  
    loadTable(filtered);
  }
  
  // Export to Excel
  function exportToExcel() {
    let table = document.getElementById("attendanceTable");
    let html = table.outerHTML;
    let url = 'data:application/vnd.ms-excel,' + escape(html); 
    let link = document.createElement('a');
    link.href = url;
    link.download = 'Attendance_Report.xls';
    link.click();
  }
  
  // Initial load
  loadTable(attendanceData);
  