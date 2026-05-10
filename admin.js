
function showTab(tabId){

document.querySelectorAll('.tab').forEach(tab=>{
tab.classList.remove('active');
});

document.getElementById(tabId)
.classList.add('active');

}

function addProduct(){

alert('Producto agregado correctamente');

}

function loadUsers(){

const users = JSON.parse(localStorage.getItem('users')) || [];

const table = document.getElementById('usersTable');

table.innerHTML='';

users.forEach(user=>{

table.innerHTML += `
<tr>
<td>${user.name || '-'}</td>
<td>${user.email || '-'}</td>
<td>${user.password || '-'}</td>
<td>${user.date || '-'}</td>
<td>${user.time || '-'}</td>
</tr>
`;

});

}

function giveAdmin(){

const email = document.getElementById('adminEmail').value;

let admins = JSON.parse(localStorage.getItem('admins')) || [];

if(!admins.includes(email)){

admins.push(email);

localStorage.setItem('admins', JSON.stringify(admins));

alert('Administrador agregado');

}

renderAdmins();

}

function renderAdmins(){

const admins = JSON.parse(localStorage.getItem('admins')) || [];

const container = document.getElementById('adminList');

container.innerHTML='';

admins.forEach(admin=>{

container.innerHTML += `
<div class="admin-card">

<span>${admin}</span>

<button onclick="removeAdmin('${admin}')">
Eliminar
</button>

</div>
`;

});

}

function removeAdmin(email){

let admins = JSON.parse(localStorage.getItem('admins')) || [];

admins = admins.filter(a=>a !== email);

localStorage.setItem('admins', JSON.stringify(admins));

renderAdmins();

}

loadUsers();
renderAdmins();
