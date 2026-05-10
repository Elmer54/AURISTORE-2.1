
let products = [
{
name:'productos auria',
price:5,
category:'maps',
image:'https://picsum.photos/600/400?1'
},
{
name:'joe',
price:10,
category:'scripts',
image:'https://picsum.photos/600/400?2'
}
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

let currentUser = JSON.parse(localStorage.getItem('currentUser'));

const container = document.getElementById('productsContainer');

function renderProducts(){

container.innerHTML='';

products.forEach((product,index)=>{

container.innerHTML += `
<div class="card">

<img src="${product.image}">

<div class="card-info">

<h3>${product.name}</h3>

<div>${product.category.toUpperCase()}</div>

<p>$${product.price}</p>

<button onclick="addToCart(${index})">
Comprar
</button>

</div>
</div>
`;

});

}

function addToCart(index){

cart.push(products[index]);

localStorage.setItem('cart', JSON.stringify(cart));

updateCart();

document.getElementById('cartPanel')
.classList.add('active');

}

function updateCart(){

const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');

cartItems.innerHTML='';

let total = 0;

cart.forEach((item,index)=>{

total += Number(item.price);

cartItems.innerHTML += `
<div class="cart-item">

<div>
<h4>${item.name}</h4>
<p>$${item.price}</p>
</div>

<button onclick="removeCart(${index})">X</button>

</div>
`;

});

cartTotal.innerText = '$'+total;
cartCount.innerText = cart.length;

}

function removeCart(index){

cart.splice(index,1);

localStorage.setItem('cart', JSON.stringify(cart));

updateCart();

}

function checkout(){

alert('Compra realizada');

cart=[];

localStorage.setItem('cart', JSON.stringify(cart));

updateCart();

closeCart();

}

function closeCart(){

document.getElementById('cartPanel')
.classList.remove('active');

}

document.getElementById('cartButton')
.addEventListener('click',()=>{

document.getElementById('cartPanel')
.classList.add('active');

});

function openAuth(){
document.getElementById('authModal').style.display='flex';
}

function closeAuth(){
document.getElementById('authModal').style.display='none';
}

function registerUser(){

const name = document.getElementById('userName').value;
const email = document.getElementById('userEmail').value;
const password = document.getElementById('userPassword').value;

let users = JSON.parse(localStorage.getItem('users')) || [];

users.push({name,email,password});

localStorage.setItem('users', JSON.stringify(users));

alert('Usuario registrado correctamente');

}

function loginUser(){

const email = document.getElementById('userEmail').value;
const password = document.getElementById('userPassword').value;

let users = JSON.parse(localStorage.getItem('users')) || [];

const found = users.find(u=>u.email === email && u.password === password);

if(found){

localStorage.setItem('currentUser', JSON.stringify(found));

currentUser = found;

showUserMenu();

closeAuth();

alert('Bienvenido '+found.name);

}else{

alert('Credenciales incorrectas');

}

}

function showUserMenu(){

document.getElementById('loginBtn').style.display='none';

document.getElementById('userMenu')
.classList.remove('hidden');

document.getElementById('profileName')
.innerText = currentUser.name;

document.getElementById('updateName')
.value = currentUser.name;

document.getElementById('updateEmail')
.value = currentUser.email;

}

function toggleUserPanel(){

document.getElementById('userDropdown')
.classList.toggle('active');

}

function updateProfile(){

let users = JSON.parse(localStorage.getItem('users')) || [];

const newName = document.getElementById('updateName').value;

const newEmail = document.getElementById('updateEmail').value;

const newPassword = document.getElementById('updatePassword').value;

users = users.map(user=>{

if(user.email === currentUser.email){

return{
name:newName,
email:newEmail,
password:newPassword || user.password
};

}

return user;

});

currentUser = {
name:newName,
email:newEmail,
password:newPassword || currentUser.password
};

localStorage.setItem('users', JSON.stringify(users));

localStorage.setItem('currentUser', JSON.stringify(currentUser));

alert('Datos actualizados');

showUserMenu();

}

function logoutUser(){

localStorage.removeItem('currentUser');

location.reload();

}

function googleLogin(){
window.open('https://accounts.google.com','_blank');
}

function facebookLogin(){
window.open('https://facebook.com','_blank');
}

if(currentUser){
showUserMenu();
}

renderProducts();
updateCart();
