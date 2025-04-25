// Initialize the theme based on the user's previous choice stored in localStorage
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
  
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.checked = true;
      themeLabel.textContent = 'Dark Mode';
    } else {
      document.body.classList.remove('dark-mode');
      themeToggle.checked = false;
      themeLabel.textContent = 'Light Mode';
    }
  
    // Toggle theme on checkbox change
    themeToggle.addEventListener('change', function() {
      if (themeToggle.checked) {
        document.body.classList.add('dark-mode');
        themeLabel.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        themeLabel.textContent = 'Light Mode';
        localStorage.setItem('theme', 'light');
      }
    });
  });
  
  // Profile update form submission (mock)
  document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    alert(`Profile updated:\nName: ${name}\nEmail: ${email}`);
  });
  
  // Password change form submission (mock)
  document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    alert(`Password changed successfully:\nCurrent Password: ${currentPassword}\nNew Password: ${newPassword}`);
  });
  

  // profile section

  const profileIcon = document.getElementById('profileIcon');
const profileDropdown = document.getElementById('profileDropdown');

profileIcon.addEventListener('click', () => {
  profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
});

// Optional: Close dropdown if clicking outside
window.addEventListener('click', function (e) {
  if (!profileIcon.contains(e.target) && !profileDropdown.contains(e.target)) {
    profileDropdown.style.display = 'none';
  }
});
