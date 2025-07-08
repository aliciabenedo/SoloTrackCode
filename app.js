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

    // Validate: empty fields
    if (!name || !email || !phone) {
        message.textContent = "Please fill in all fields.";
        message.style.color = "red";
        return;
    }

    // Validate: email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        message.textContent = "Please enter a valid email address.";
        message.style.color = "red";
        return;
    }

    const client = { name, email, phone };
    clients.push(client);
    saveClients();
    displayClients();

    // Clear form + success message
    document.getElementById('client-name').value = '';
    document.getElementById('client-email').value = '';
    document.getElementById('client-phone').value = '';
    message.textContent = "Client added successfully!";
    message.style.color = "green";
}

function deleteClient(index) {
    if (confirm("Are you sure you want to delete this client?")) {
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
        message.textContent = "No clients saved yet.";
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
