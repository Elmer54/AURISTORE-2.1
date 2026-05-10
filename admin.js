const ADMIN_EMAIL = 'admin@auriastore.com';
const ADMIN_PASSWORD = 'AURIA123';

function protectAdmin(){
const logged = localStorage.getItem('adminLogged');

if(logged !== 'true'){
document.body.innerHTML = `
<div class="login-screen">
<div class="login-box">
<h1>ADMIN LOGIN</h1>
<input id="email" placeholder="Correo">
<input id="password" type="password" placeholder="Contraseña">
<button onclick="login()">Ingresar</button>
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

protectAdmin();

const imageInput = document.getElementById('imageInput');

if(imageInput){
imageInput.addEventListener('change', function(e){
const file = e.target.files[0];

if(file){
const reader = new FileReader();

reader.onload = function(event){
document.getElementById('preview').src = event.target.result;
document.getElementById('preview').style.display = 'block';
}

reader.readAsDataURL(file);
}
});
}

function addProduct(){

const name = document.getElementById('name').value;
const price = document.getElementById('price').value;
const category = document.getElementById('category').value;
const image = document.getElementById('preview').src;

let products = JSON.parse(localStorage.getItem('products')) || [];

products.push({
name,
price,
category,
image
});

localStorage.setItem('products', JSON.stringify(products));

alert('Producto agregado correctamente');
}

function changeTheme(){
const color = document.getElementById('themeColor').value;
localStorage.setItem('themeColor', color);
document.documentElement.style.setProperty('--primary', color);
alert('Color actualizado');
}

function loadSales(){

const sales = JSON.parse(localStorage.getItem('sales')) || [];
const container = document.getElementById('salesContainer');

container.innerHTML='';

sales.forEach(sale=>{
container.innerHTML += `
<div class="admin-card">
<p><b>Fecha:</b> ${sale.date}</p>
<p><b>Pago:</b> ${sale.payment}</p>
<p><b>Productos:</b> ${sale.products.map(p=>p.name).join(', ')}</p>
</div>
`;
});
}

function loadUsers(){

const users = JSON.parse(localStorage.getItem('users')) || [];
const container = document.getElementById('usersContainer');

container.innerHTML='';

users.forEach(user=>{
container.innerHTML += `
<div class="admin-card">
<p>${user.name}</p>
<p>${user.email}</p>
</div>
`;
});
}

loadSales();
loadUsers();
