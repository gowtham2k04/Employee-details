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


document.addEventListener("DOMContentLoaded", loadEmployees);

document.getElementById("employeeForm").addEventListener("submit", addEmployee);
document.getElementById('downloadBtn').addEventListener('click', downloadPDF);

function loadEmployees() {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  let tableBody = document.querySelector("#employeeTable tbody");
  tableBody.innerHTML = "";

  employees.forEach((employee, index) => {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.name}</td>
      <td>${employee.id}</td>
      <td>${employee.role}</td>
      <td>${employee.phone}</td>
      <td>${employee.email}</td>
      <td>${employee.address}</td>
      <td>${employee.hireDate}</td>
      <td>
        <button onclick="editEmployee(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function addEmployee(e) {
  e.preventDefault();

  const name = document.getElementById("empName").value;
  const id = document.getElementById("empID").value;
  const role = document.getElementById("empRole").value;
  const phone = document.getElementById("empPhone").value;
  const email = document.getElementById("empEmail").value;
  const address = document.getElementById("empAddress").value;
  const hireDate = document.getElementById("empHireDate").value;

  if (name && id && role && phone && email && address && hireDate) {
    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.push({ name, id, role, phone, email, address, hireDate });
    localStorage.setItem("employees", JSON.stringify(employees));

    document.getElementById("employeeForm").reset();
    loadEmployees();
  }
}

function deleteEmployee(index) {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  employees.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employees));
  loadEmployees();
}

function editEmployee(index) {
  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  const employee = employees[index];

  document.getElementById("empName").value = employee.name;
  document.getElementById("empID").value = employee.id;
  document.getElementById("empRole").value = employee.role;
  document.getElementById("empPhone").value = employee.phone;
  document.getElementById("empEmail").value = employee.email;
  document.getElementById("empAddress").value = employee.address;
  document.getElementById("empHireDate").value = employee.hireDate;

  document.getElementById("employeeForm").removeEventListener("submit", addEmployee);
  document.getElementById("employeeForm").addEventListener("submit", function updateEmployee(e) {
    e.preventDefault();
    employees[index] = {
      name: document.getElementById("empName").value,
      id: document.getElementById("empID").value,
      role: document.getElementById("empRole").value,
      phone: document.getElementById("empPhone").value,
      email: document.getElementById("empEmail").value,
      address: document.getElementById("empAddress").value,
      hireDate: document.getElementById("empHireDate").value,
    };
    localStorage.setItem("employees", JSON.stringify(employees));
    document.getElementById("employeeForm").reset();
    loadEmployees();
    document.getElementById("employeeForm").removeEventListener("submit", updateEmployee);
    document.getElementById("employeeForm").addEventListener("submit", addEmployee);
  });
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let employees = JSON.parse(localStorage.getItem("employees")) || [];

  const tableHeader = ['Name', 'ID', 'Role', 'Phone', 'Email', 'Address', 'Hire Date'];

  let tableData = employees.map(emp => [
    emp.name, emp.id, emp.role, emp.phone, emp.email, emp.address, emp.hireDate
  ]);

  doc.autoTable({
    head: [tableHeader],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [52, 152, 219] },
    margin: { top: 20 },
  });

  doc.save('employee_data.pdf');
}
