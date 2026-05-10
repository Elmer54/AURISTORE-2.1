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

<button onclick="login()">
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

protectAdmin();

document.getElementById('imageInput')?.addEventListener('change', function(e){

const file = e.target.files[0];

if(file){

const reader = new FileReader();

reader.onload = function(event){

document.getElementById('preview').src = event.target.result;

}

reader.readAsDataURL(file);

}

});

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
