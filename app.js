// CLIENTS
let clients = JSON.parse(localStorage.getItem('clients')) || [];

function saveClients() {
    localStorage.setItem('clients', JSON.stringify(clients));
}

function addClient() {
    const name = document.getElementById('client-name')?.value.trim();
    const email = document.getElementById('client-email')?.value.trim();
    const phone = document.getElementById('client-phone')?.value.trim();

    if (!name || !email || !phone) {
        alert("Please fill in all fields.");
        return;
    }

    const client = { name, email, phone };
    clients.push(client);
    saveClients();
    displayClients();

    // Clear form
    if (document.getElementById('client-name')) document.getElementById('client-name').value = '';
    if (document.getElementById('client-email')) document.getElementById('client-email').value = '';
    if (document.getElementById('client-phone')) document.getElementById('client-phone').value = '';
}

function displayClients() {
    const list = document.getElementById('client-list');
    if (!list) return;

    list.innerHTML = '';
    clients.forEach(client => {
        const li = document.createElement('li');
        li.textContent = `${client.name} (${client.email} | ${client.phone})`;
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
