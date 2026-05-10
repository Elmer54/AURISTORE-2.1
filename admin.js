
const ADMIN_EMAIL = 'admin@auriastore.com';
const ADMIN_PASSWORD = 'AURIA123';

function loginProtect(){

const logged = localStorage.getItem('adminLogged');

if(logged !== 'true'){

document.body.innerHTML = `
<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#050505;">

<div style="background:#111;padding:40px;border-radius:20px;width:350px;">

<h1 style="color:#ff0077;">ADMIN LOGIN</h1>

<input id="email" placeholder="Correo"
style="width:100%;padding:15px;margin:15px 0;background:#1b1b1b;border:none;border-radius:12px;color:white;">

<input id="password" type="password" placeholder="Contraseña"
style="width:100%;padding:15px;margin-bottom:15px;background:#1b1b1b;border:none;border-radius:12px;color:white;">

<button onclick="login()"
style="width:100%;padding:15px;background:#ff0077;border:none;border-radius:12px;color:white;">
Ingresar
</button>

</div>
</div>
`;
}
}

function login(){

const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){

localStorage.setItem('adminLogged','true');
location.reload();

}else{
alert('Acceso denegado');
}
}

function renderUsers(){

const users = JSON.parse(localStorage.getItem('users')) || [];

const container = document.getElementById('users');

users.forEach(user=>{
container.innerHTML += `
<div class="order-card">
<h3>${user.username}</h3>
<p>${user.email}</p>
</div>
`;
});
}

function renderOrders(){

const orders = JSON.parse(localStorage.getItem('orders')) || [];

const container = document.getElementById('orders');

orders.forEach((order,index)=>{

container.innerHTML += `
<div class="order-card">

<h3>Pedido #${index+1}</h3>
<p>${order.date}</p>
<p>Estado: ${order.status}</p>

<button onclick="markPaid(${index})"
style="padding:10px;background:green;border:none;border-radius:10px;color:white;">
Pagado
</button>

<button onclick="cancelOrder(${index})"
style="padding:10px;background:red;border:none;border-radius:10px;color:white;">
Cancelar
</button>

</div>
`;
});
}

function markPaid(index){

const orders = JSON.parse(localStorage.getItem('orders')) || [];

orders[index].status = 'Pagado';

localStorage.setItem('orders', JSON.stringify(orders));

location.reload();
}

function cancelOrder(index){

const orders = JSON.parse(localStorage.getItem('orders')) || [];

orders[index].status = 'Cancelado';

localStorage.setItem('orders', JSON.stringify(orders));

location.reload();
}

loginProtect();
renderUsers();
renderOrders();
