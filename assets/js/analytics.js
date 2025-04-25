// Sample data: Replace this with actual data from your system
const attendanceData = [
    { date: '2023-01-01', status: 'On-time', hoursWorked: 8 },
    { date: '2023-01-02', status: 'Late', hoursWorked: 7 },
    { date: '2023-01-03', status: 'On-time', hoursWorked: 8 },
    { date: '2023-01-04', status: 'On-time', hoursWorked: 8 },
    { date: '2023-01-05', status: 'Late', hoursWorked: 6 },
    // Add more data as needed
  ];
  
  // Reference to canvas elements
  const ctxAttendanceTrend = document.getElementById('attendanceTrendChart').getContext('2d');
  const ctxOnTimeVsLate = document.getElementById('onTimeVsLateChart').getContext('2d');
  const ctxTotalHours = document.getElementById('totalHoursWorkedChart').getContext('2d');
  
  let attendanceTrendChart;
  let onTimeVsLateChart;
  let totalHoursWorkedChart;
  
  // Function to update charts
  function updateCharts() {
    const selectedMonth = document.getElementById('month').value;
  
    // Filter data for the selected month (Modify this logic based on your actual data format)
    const filteredData = attendanceData.filter(entry => entry.date.startsWith('2023-' + selectedMonth.substring(0, 3)));
  
    const dates = filteredData.map(entry => entry.date);
    const attendanceStatus = filteredData.map(entry => entry.status);
    const hoursWorked = filteredData.map(entry => entry.hoursWorked);
  
    // On-time and Late Count
    const onTimeCount = attendanceStatus.filter(status => status === 'On-time').length;
    const lateCount = attendanceStatus.filter(status => status === 'Late').length;
  
    // Total hours worked in the selected month
    const totalHoursWorked = hoursWorked.reduce((total, hours) => total + hours, 0);
  
    // Update Total Hours
    document.getElementById('totalHoursValue').innerText = totalHoursWorked;
  
    // Attendance Trend Chart
    if (attendanceTrendChart) attendanceTrendChart.destroy();
    attendanceTrendChart = new Chart(ctxAttendanceTrend, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Attendance Trend',
          data: attendanceStatus.map(status => (status === 'On-time' ? 1 : 0)),
          borderColor: '#00d4ff',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Attendance Trend in ' + selectedMonth
          }
        }
      }
    });
  
    // On-time vs Late Chart
    if (onTimeVsLateChart) onTimeVsLateChart.destroy();
    onTimeVsLateChart = new Chart(ctxOnTimeVsLate, {
      type: 'pie',
      data: {
        labels: ['On-time', 'Late'],
        datasets: [{
          data: [onTimeCount, lateCount],
          backgroundColor: ['#00d4ff', '#ff4d4d'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'On-time vs Late Check-ins in ' + selectedMonth
          }
        }
      }
    });
  
    // Total Hours Worked Chart
    if (totalHoursWorkedChart) totalHoursWorkedChart.destroy();
    totalHoursWorkedChart = new Chart(ctxTotalHours, {
      type: 'bar',
      data: {
        labels: [selectedMonth],
        datasets: [{
          label: 'Total Hours Worked',
          data: [totalHoursWorked],
          backgroundColor: '#00d4ff',
          borderColor: '#00a0cc',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Total Hours Worked in ' + selectedMonth
          }
        }
      }
    });
  }
  
  // Initialize charts with default data for the first month
  updateCharts();
  