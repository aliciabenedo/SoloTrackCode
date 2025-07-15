// CLIENTS
let clients = JSON.parse(localStorage.getItem('clients')) || [];

function saveClients() {
  localStorage.setItem('clients', JSON.stringify(clients));
}

function addClient() {
  const name = document.getElementById('client-name').value.trim();
  const email = document.getElementById('client-email').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
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

function displayClients() {
  const list = document.getElementById('client-list');
  const message = document.getElementById('form-message');
  if (!list) return;

  list.innerHTML = '';
  if (clients.length === 0) {
    message.textContent = "No clients added yet.";
    message.style.color = "gray";
  } else {
    message.textContent = "";
  }

  clients.forEach((client, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${client.name}</strong> (${client.email} | ${client.phone})
      <button onclick="deleteClient(${index})" class="delete-btn">Delete</button>
    `;
    list.appendChild(li);
  });
}

displayClients();

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
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
