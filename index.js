// Function to validate Date of Birth
function validateDateOfBirth() {
    const dobInput = document.getElementById("dob");
    const dateComponents = dobInput.value.split("-");
    const year = parseInt(dateComponents[0], 10);
    const month = parseInt(dateComponents[1], 10);
    const date = parseInt(dateComponents[2], 10);

    const birthdate = new Date(year, month - 1, date);
    const today = new Date();
    let aging = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    // Adjust age based on the day of birth
    if (today.getDate() < birthdate.getDate() || monthDiff < 0) {
        aging--;
    }

    // Validate age
    if (aging < 18 || aging > 55) {
        dobInput.setCustomValidity("Your age must be between 18 and 55");
        dobInput.reportValidity();
    } else {
        dobInput.setCustomValidity("");
    }
}

// Function to validate Email
function validateEmail() {
    const emailInput = document.getElementById("email");

    if (emailInput.validity.typeMismatch) {
        emailInput.setCustomValidity("Invalid email address");
        emailInput.reportValidity();
    } else {
        emailInput.setCustomValidity("");
    }
}

// Event listeners for Date of Birth and Email validation
const dobInput = document.getElementById("dob");
dobInput.addEventListener("change", validateDateOfBirth);

const emailInput = document.getElementById("email");
emailInput.addEventListener('input', validateEmail);

// Function to retrieve stored entries from localStorage
function retrieveEntries() {
    const storedEntries = localStorage.getItem("entries");
    return storedEntries ? JSON.parse(storedEntries) : [];
}

// Initial retrieval of entries
let userEntries = retrieveEntries();

// Function to display entries in an HTML table
function displayEntries() {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const name = `<td>${entry.name}</td>`;
        const email = `<td>${entry.email}</td>`;
        const password = `<td>${entry.password}</td>`;
        const dob = `<td>${entry.dob}</td>`;
        const accept = `<td>${entry.acceptedTermsAndCondition}</td>`;
        return `<tr>${name} ${email} ${password} ${dob} ${accept}</tr>`;
    }).join("\n");

    const table = `<table border="2">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Date of Birth</th>
                        <th>Accepted Terms?</th>
                    </tr>
                    ${tableEntries}
                </table>`;

    const details = document.getElementById("entries");
    details.innerHTML = table;
}

// Function to save user form data to localStorage
function saveUserForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTermsAndCondition = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptedTermsAndCondition
    };

    userEntries.push(entry);
    localStorage.setItem("entries", JSON.stringify(userEntries));

    displayEntries();
}

// Event listener for form submission
const userForm = document.getElementById('doo');
userForm.addEventListener("submit", saveUserForm);

// Initial display of entries
displayEntries();
