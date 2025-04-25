const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});



document.getElementById("forgotPasswordForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const emailError = document.getElementById("email-error");

  if (validateEmail(email)) {
    // Simulate sending a reset link (real implementation would use a backend service)
    alert("Password reset link has been sent to " + email);
    window.location.href = "../pages/login.html";  // Redirect to login page
  } else {
    emailError.textContent = "Please enter a valid email address.";
  }
});

// Real-time email validation
document.getElementById("email").addEventListener("input", function() {
  const email = this.value;
  const emailError = document.getElementById("email-error");

  if (validateEmail(email)) {
    emailError.textContent = "";
  } else {
    emailError.textContent = "Please enter a valid email address.";
  }
});

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
