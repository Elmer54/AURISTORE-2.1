let products = JSON.parse(localStorage.getItem('products')) || [
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

const container = document.getElementById('productsContainer');

function renderProducts(category='all'){

container.innerHTML='';

let filtered = category === 'all'
? products
: products.filter(p=>p.category === category);

filtered.forEach((product,index)=>{

container.innerHTML += `
<div class="card">

<img src="${product.image}">

<div class="card-info">

<h3>${product.name}</h3>

<div class="category">
${product.category.toUpperCase()}
</div>

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

alert('Producto agregado correctamente');

}

function updateCart(){

const cartItems = document.getElementById('cartItems');

const cartTotal = document.getElementById('cartTotal');

const cartCount = document.getElementById('cartCount');

if(!cartItems) return;

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

<button onclick="removeCart(${index})">
X
</button>

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

if(cart.length === 0){

alert('El carrito está vacío');

return;

}

let sales = JSON.parse(localStorage.getItem('sales')) || [];

sales.push({
items:cart,
date:new Date().toLocaleString()
});

localStorage.setItem('sales', JSON.stringify(sales));

alert('Compra realizada correctamente');

cart = [];

localStorage.setItem('cart', JSON.stringify(cart));

updateCart();

document.getElementById('cartPanel')
.classList.remove('active');

}

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

alert('Bienvenido '+found.name);

closeAuth();

}else{

alert('Credenciales incorrectas');

}

}

function googleLogin(){

window.open('https://accounts.google.com/','_blank');

}

function facebookLogin(){

window.open('https://facebook.com/login','_blank');

}

const cartButton = document.getElementById('cartButton');

cartButton.addEventListener('click', ()=>{

document.getElementById('cartPanel')
.classList.toggle('active');

});

document.querySelectorAll('.category-btn').forEach(btn=>{

btn.addEventListener('click', ()=>{

document.querySelectorAll('.category-btn')
.forEach(b=>b.classList.remove('active'));

btn.classList.add('active');

renderProducts(btn.dataset.category);

});

});

renderProducts();

updateCart();
