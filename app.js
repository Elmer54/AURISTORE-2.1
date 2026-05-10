
let products = JSON.parse(localStorage.getItem('products')) || [
{
name:'PACK PREMIUM',
price:28,
category:'packs',
image:'https://picsum.photos/500/300?1'
},
{
name:'SCRIPT EMS',
price:82,
category:'scripts',
image:'https://picsum.photos/500/300?2'
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
<p>$${product.price}</p>
<button onclick="addToCart(${index})">Agregar al carrito</button>
</div>
</div>
`;
});
}

function addToCart(index){
cart.push(products[index]);
localStorage.setItem('cart', JSON.stringify(cart));
renderCart();
}

function renderCart(){
const items = document.getElementById('cartItems');
const total = document.getElementById('cartTotal');

items.innerHTML='';

let totalPrice = 0;

cart.forEach((item,index)=>{
totalPrice += Number(item.price);

items.innerHTML += `
<div class="cart-item">
<h3>${item.name}</h3>
<p>$${item.price}</p>
<button class="remove-btn" onclick="removeCart(${index})">Eliminar</button>
</div>
`;
});

total.innerText = 'Total: $' + totalPrice;
}

function removeCart(index){
cart.splice(index,1);
localStorage.setItem('cart', JSON.stringify(cart));
renderCart();
}

function toggleCart(){
document.getElementById('cartPanel').classList.toggle('active');
}

function checkout(){

const orders = JSON.parse(localStorage.getItem('orders')) || [];

orders.push({
date:new Date().toLocaleString(),
products:cart,
status:'Pendiente'
});

localStorage.setItem('orders', JSON.stringify(orders));

alert('Compra realizada');

cart=[];
localStorage.setItem('cart', JSON.stringify(cart));
renderCart();
}

document.querySelectorAll('.category-btn').forEach(btn=>{
btn.addEventListener('click',()=>{
renderProducts(btn.dataset.category);
});
});

function openAuth(){
document.getElementById('authModal').style.display='flex';
}

function closeAuth(){
document.getElementById('authModal').style.display='none';
}

function registerUser(){

const users = JSON.parse(localStorage.getItem('users')) || [];

users.push({
username:document.getElementById('username').value,
email:document.getElementById('email').value
});

localStorage.setItem('users', JSON.stringify(users));

alert('Usuario registrado');
}

function loginUser(){
alert('Inicio de sesión correcto');
closeAuth();
}

renderProducts();
renderCart();
