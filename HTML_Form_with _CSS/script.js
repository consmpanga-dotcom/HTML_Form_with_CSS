// =====================
// index.html functions
// =====================

// Range input live update
const rangeInput = document.getElementById('satisfaction');
const rangeValue = document.getElementById('rangeValue');
if (rangeInput && rangeValue) {
  rangeInput.addEventListener('input', () => {
    rangeValue.textContent = rangeInput.value;
  });
}

// Handle form submission
const form = document.getElementById('userForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {};

    // Collect form data
    formData.forEach((value, key) => {
      if (data[key]) {
        data[key] = [].concat(data[key], value);
      } else {
        data[key] = value;
      }
    });

    // Store in localStorage
    localStorage.setItem('formData', JSON.stringify(data));

    // Redirect to results page
    window.location.href = "results.html";
  });
}

// =====================
// results.html functions
// =====================
const output = document.getElementById('output');
if (output) {
  const data = JSON.parse(localStorage.getItem('formData'));

  if (data) {
    let html = "<ul>";
    for (const key in data) {
      html += `<li><strong>${key}:</strong> ${data[key]}</li>`;
    }
    html += "</ul>";
    output.innerHTML = html;
  } else {
    output.innerHTML = "<p>No data found. Please go back and submit the form.</p>";
  }
}
