//clients

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

    const client = { name, email, phone };
    clients.push(client);
    saveClients();
    displayClients();

    // Clear form + show success message
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



// INVOICES
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];

function saveInvoices() {
    localStorage.setItem('invoices', JSON.stringify(invoices));
}

function addInvoice() {
    const client = document.getElementById('invoice-client')?.value.trim();
    const amount = parseFloat(document.getElementById('invoice-amount')?.value);
    const date = document.getElementById('invoice-date')?.value;

    if (!client || isNaN(amount) || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const invoice = { client, amount, date };
    invoices.push(invoice);
    saveInvoices();
    displayInvoices();
}

function displayInvoices() {
    const list = document.getElementById('invoice-list');
    if (!list) return;

    list.innerHTML = '';
    invoices.forEach(i => {
        const li = document.createElement('li');
        li.textContent = `${i.client}: €${i.amount} on ${i.date}`;
        list.appendChild(li);
    });
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
