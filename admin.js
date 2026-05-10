
const ADMIN_EMAIL = 'admin@auriastore.com';
const ADMIN_PASSWORD = 'AURIA123';

function protectAdmin(){
const logged = localStorage.getItem('adminLogged');

if(logged !== 'true'){
document.body.innerHTML = `
<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#050505;">
<div style="background:#111;padding:40px;border-radius:25px;width:350px;">

<h1 style="color:#ff0077;margin-bottom:20px;">ADMIN LOGIN</h1>

<input id="email" placeholder="Correo"
style="width:100%;padding:15px;margin-bottom:15px;background:#1a1a1a;border:none;border-radius:12px;color:white;">

<input id="password" type="password" placeholder="Contraseña"
style="width:100%;padding:15px;margin-bottom:20px;background:#1a1a1a;border:none;border-radius:12px;color:white;">

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

document.getElementById('imageInput')?.addEventListener('change', function(e){
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

protectAdmin();
