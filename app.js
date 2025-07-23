// Restrict access to app pages unless logged in
if (!localStorage.getItem('loggedIn') &&
    !window.location.href.includes("login.html") &&
    !window.location.href.includes("signup.html")) {
    window.location.href = "login.html";
}

// CLIENTS
let clients = JSON.parse(localStorage.getItem('clients')) || [];

function saveClients() {
    localStorage.setItem('clients', JSON.stringify(clients));
}

function addClient() {
    const name = document.getElementById('client-name')?.value.trim();
    const email = document.getElementById('client-email')?.value.trim();
    const phone = document.getElementById('client-phone')?.value.trim();
    const message = document.getElementById('form-message');

    if (!name || !email || !phone) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        message.textContent = "Invalid email format.";
        message.style.color = "red";
        return;
    }

    clients.push({ name, email, phone });
    saveClients();
    displayClients();

    document.getElementById('client-name').value = '';
    document.getElementById('client-email').value = '';
    document.getElementById('client-phone').value = '';
    message.textContent = "Client added successfully!";
    message.style.color = "green";
}

function deleteClient(index) {
    if (confirm("Delete this client?")) {
        clients.splice(index, 1);
        saveClients();
        displayClients();
    }
}

function editClient(index) {
    const client = clients[index];
    const newName = prompt("Edit name:", client.name);
    const newEmail = prompt("Edit email:", client.email);
    const newPhone = prompt("Edit phone:", client.phone);

    if (newName && newEmail && newPhone) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(newEmail)) {
            alert("Invalid email format.");
            return;
        }

        clients[index] = {
            name: newName.trim(),
            email: newEmail.trim(),
            phone: newPhone.trim()
        };
        saveClients();
        displayClients();
    }
}

function displayClients(filtered = clients) {
    const list = document.getElementById('client-list');
    const message = document.getElementById('form-message');
    if (!list) return;

    list.innerHTML = '';
    if (filtered.length === 0) {
        message.textContent = "No clients match your search.";
        message.style.color = "gray";
    } else {
        message.textContent = "";
    }

    filtered.forEach((client, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${client.name}</strong> (${client.email} | ${client.phone})
            <button onclick="editClient(${index})" class="edit-btn">Edit</button>
            <button onclick="deleteClient(${index})" class="delete-btn">Delete</button>
        `;
        list.appendChild(li);
    });
}

function filterClients() {
    const query = document.getElementById('search-client')?.value.toLowerCase();
    const filtered = clients.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)
    );
    displayClients(filtered);
}

displayClients();


// INVOICES
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

function saveInvoices() {
    localStorage.setItem('invoices', JSON.stringify(invoices));
}

function addInvoice() {
    const client = document.getElementById('invoice-client')?.value.trim();
    const amount = parseFloat(document.getElementById('invoice-amount')?.value.trim());
    const date = document.getElementById('invoice-date')?.value.trim();
    const message = document.getElementById('invoice-message');

    if (!client || isNaN(amount) || !date) {
        message.textContent = "Please fill in all fields correctly.";
        message.style.color = "red";
        return;
    }

    invoices.push({ client, amount, date });
    saveInvoices();
    displayInvoices();
    updateSummary();

    document.getElementById('invoice-client').value = '';
    document.getElementById('invoice-amount').value = '';
    document.getElementById('invoice-date').value = '';
    message.textContent = "Invoice added successfully!";
    message.style.color = "green";
}

function deleteInvoice(index) {
    if (confirm("Delete this invoice?")) {
        invoices.splice(index, 1);
        saveInvoices();
        displayInvoices();
        updateSummary();
    }
}

function editInvoice(index) {
    const invoice = invoices[index];
    const newAmount = prompt("Edit amount (€):", invoice.amount);
    const newDate = prompt("Edit date (YYYY-MM-DD):", invoice.date);

    if (newAmount && newDate && !isNaN(parseFloat(newAmount))) {
        invoices[index].amount = parseFloat(newAmount);
        invoices[index].date = newDate;
        saveInvoices();
        displayInvoices();
        updateSummary();
    } else {
        alert("Invalid input.");
    }
}

function displayInvoices(filtered = invoices) {
    const list = document.getElementById('invoice-list');
    if (!list) return;

    list.innerHTML = '';
    filtered.forEach((inv, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${inv.client}</strong>: €${inv.amount.toFixed(2)} on ${inv.date}
            <button class="edit-btn" onclick="editInvoice(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteInvoice(${index})">Delete</button>
        `;
        list.appendChild(li);
    });
}

function filterInvoices() {
    const query = document.getElementById('search-invoice')?.value.toLowerCase();
    const filtered = invoices.filter(i =>
        i.client.toLowerCase().includes(query) ||
        i.date.includes(query)
    );
    displayInvoices(filtered);
}

function sortInvoices(criterion) {
    if (criterion === 'date') {
        invoices.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (criterion === 'amount') {
        invoices.sort((a, b) => a.amount - b.amount);
    }
    displayInvoices();
}

displayInvoices();


// SUMMARY
function updateSummary() {
    const totalIncome = invoices.reduce((sum, i) => sum + Number(i.amount), 0);
    if (document.getElementById('total-income')) {
        document.getElementById('total-income').innerText = totalIncome.toFixed(2);
        document.getElementById('total-invoices').innerText = invoices.length;
    }
}

updateSummary();


// AUTH: LOGIN / SIGNUP / LOGOUT
function signUp() {
    const username = document.getElementById('new-username')?.value.trim();
    const password = document.getElementById('new-password')?.value.trim();
    const message = document.getElementById('signup-message');

    if (!username || !password) {
        message.textContent = "Please fill in both fields.";
        message.style.color = "red";
        return;
    }

    localStorage.setItem('user', JSON.stringify({ username, password }));
    message.textContent = "Sign up successful! Redirecting...";
    message.style.color = "green";

    setTimeout(() => window.location.href = "login.html", 1500);
}

function login() {
    const username = document.getElementById('username')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    const message = document.getElementById('login-message');

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && username === storedUser.username && password === storedUser.password) {
        message.textContent = "Login successful!";
        message.style.color = "green";
        localStorage.setItem('loggedIn', 'true');
        setTimeout(() => window.location.href = "index.html", 1000);
    } else {
        message.textContent = "Invalid username or password.";
        message.style.color = "red";
    }
}

function logout() {
    localStorage.removeItem('loggedIn');
    window.location.href = "login.html";
}
  // Set theme on page load
  window.onload = function () {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle');

    if (savedTheme === 'dark') {
      body.classList.add('dark-mode');
      if (toggleBtn) toggleBtn.textContent = "Light Mode";
    } else {
      if (toggleBtn) toggleBtn.textContent = "Dark Mode";
    }
  };

  // dark mode
  function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('theme-toggle');
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = "Light Mode";
    } else {
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = "Dark Mode";
    }
  }