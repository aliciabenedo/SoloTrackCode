// Clients
let clients = JSON.parse(localStorage.getItem('clients')) || [];
function saveClients() {
    localStorage.setItem('clients', JSON.stringify(clients));
}
function addClient() {
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const phone = document.getElementById('client-phone').value;
    const client = { name, email, phone };
    clients.push(client);
    saveClients();
    displayClients();
}
function displayClients() {
    const list = document.getElementById('client-list');
    if (!list) return;
    list.innerHTML = '';
    clients.forEach(c => {
        const li = document.createElement('li');
        li.textContent = `${c.name} (${c.email} | ${c.phone})`;
        list.appendChild(li);
    });
}
displayClients();

// Invoices
let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
function saveInvoices() {
    localStorage.setItem('invoices', JSON.stringify(invoices));
}
function addInvoice() {
    const client = document.getElementById('invoice-client').value;
    const amount = parseFloat(document.getElementById('invoice-amount').value);
    const date = document.getElementById('invoice-date').value;
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

// Summary
function updateSummary() {
    const totalIncome = invoices.reduce((sum, i) => sum + Number(i.amount), 0);
    if (document.getElementById('total-income')) {
        document.getElementById('total-income').innerText = totalIncome.toFixed(2);
        document.getElementById('total-invoices').innerText = invoices.length;
    }
}
updateSummary();
