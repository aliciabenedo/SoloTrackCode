let clients = [];

function showAddClientForm() {
    document.getElementById('add-client-form').style.display = 'block';
}

function addClient() {
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const phone = document.getElementById('client-phone').value;

    const client = { name, email, phone };
    clients.push(client);

    updateClientList();
    document.getElementById('add-client-form').style.display = 'none';
}

function updateClientList() {
    const clientList = document.getElementById('client-list');
    clientList.innerHTML = '';
    clients.forEach((client, index) => {
        const li = document.createElement('li');
        li.textContent = `${client.name} (${client.email}, ${client.phone})`;
        clientList.appendChild(li);
    });
}
