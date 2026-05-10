let products = JSON.parse(localStorage.getItem('products')) || [
{
name:'PACK PREMIUM',
price:28,
category:'packs',
image:'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
},
{
name:'POLICE + EMS',
price:82,
category:'scripts',
image:'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
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
<div class="category">${product.category.toUpperCase()}</div>
<p>$${product.price}</p>
<button onclick="addToCart(${index})">Comprar</button>
</div>
</div>
`;
});
}

function addToCart(index){
cart.push(products[index]);
localStorage.setItem('cart', JSON.stringify(cart));
updateCart();
alert('Producto agregado al carrito');
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
<p>${item.name} - $${item.price}</p>
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

function toggleCart(){
document.getElementById('cartPanel').classList.toggle('active');
}

function checkout(){

if(cart.length === 0){
alert('Carrito vacío');
return;
}

const method = document.getElementById('paymentMethod').value;

let sales = JSON.parse(localStorage.getItem('sales')) || [];

sales.push({
products: cart,
payment: method,
date: new Date().toLocaleString()
});

localStorage.setItem('sales', JSON.stringify(sales));

alert('Compra realizada correctamente mediante '+method);

cart = [];
localStorage.setItem('cart', JSON.stringify(cart));
updateCart();
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

alert('Usuario registrado');
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

document.querySelectorAll('.category-btn').forEach(btn=>{
btn.addEventListener('click', ()=>{

document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');

renderProducts(btn.dataset.category);
});
});

renderProducts();
updateCart();
