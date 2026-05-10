const ADMIN_EMAIL = "admin@auriastore.com";
const ADMIN_PASSWORD = "AURIA123";

function verifyAdmin(){
const isLogged = localStorage.getItem('adminLogged');

if(isLogged !== 'true'){
document.body.innerHTML = `
<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:#060606;color:white;">
<div style="background:#111;padding:40px;border-radius:25px;width:350px;">
<h1 style="color:#ff0077;margin-bottom:20px;">ADMIN LOGIN</h1>

<input type="email" id="adminEmail" placeholder="Correo administrador"
style="width:100%;padding:15px;margin-bottom:15px;background:#1b1b1b;border:none;color:white;border-radius:10px;">

<input type="password" id="adminPassword" placeholder="Contraseña"
style="width:100%;padding:15px;margin-bottom:20px;background:#1b1b1b;border:none;color:white;border-radius:10px;">

<button onclick="loginAdmin()"
style="width:100%;padding:15px;background:#ff0077;border:none;color:white;border-radius:12px;">
Ingresar
</button>

</div>
</div>
`;
}
}

function loginAdmin(){
const email = document.getElementById('adminEmail').value;
const password = document.getElementById('adminPassword').value;

if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD){
localStorage.setItem('adminLogged','true');
location.reload();
}else{
alert('Acceso denegado');
}
}

function logoutAdmin(){
localStorage.removeItem('adminLogged');
location.reload();
}

function addProduct(){
const name = document.getElementById('productName').value;
const price = document.getElementById('productPrice').value;

document.getElementById('adminProducts').innerHTML += `
<div style="margin-top:20px;background:#111;padding:20px;border-radius:20px;">
<h3>${name}</h3>
<p>${price}</p>
</div>
`;
}

verifyAdmin();
