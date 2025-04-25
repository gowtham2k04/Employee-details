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


const employeeData = JSON.parse(localStorage.getItem("employees")) || [];

const tableBody = document.getElementById("employeeTableBody");

// Function to load employees from local storage
function loadEmployees() {
  tableBody.innerHTML = "";
  employeeData.forEach((emp, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="${emp.photo}" alt="Photo" /></td>
      <td>${emp.name}</td>
      <td>${emp.id}</td>
      <td>${emp.age}</td>
      <td>${emp.phone}</td>
      <td>${emp.role}</td>
      <td>${emp.address}</td>
      <td>
        <button onclick="editEmployee(${index})">Edit</button>
        <button onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

// Add new employee
function addEmployee() {
  const photo = document.getElementById("photo").files[0];
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const age = document.getElementById("age").value;
  const phone = document.getElementById("phone").value;
  const role = document.getElementById("role").value;
  const address = document.getElementById("address").value;

  if (photo && name && id && age && phone && role && address) {
    const photoUrl = URL.createObjectURL(photo);

    const newEmployee = { photo: photoUrl, name, id, age, phone, role, address };
    employeeData.push(newEmployee);

    localStorage.setItem("employees", JSON.stringify(employeeData));
    loadEmployees();

    // Clear input fields
    document.getElementById("photo").value = "";
    document.getElementById("name").value = "";
    document.getElementById("id").value = "";
    document.getElementById("age").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("role").value = "";
    document.getElementById("address").value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Edit employee
function editEmployee(index) {
  const emp = employeeData[index];

  document.getElementById("photo").value = emp.photo;
  document.getElementById("name").value = emp.name;
  document.getElementById("id").value = emp.id;
  document.getElementById("age").value = emp.age;
  document.getElementById("phone").value = emp.phone;
  document.getElementById("role").value = emp.role;
  document.getElementById("address").value = emp.address;

  deleteEmployee(index); // Remove current record before editing
}

// Delete employee
function deleteEmployee(index) {
  employeeData.splice(index, 1);
  localStorage.setItem("employees", JSON.stringify(employeeData));
  loadEmployees();
}

// Load data on page load
loadEmployees();
