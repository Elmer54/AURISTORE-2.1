
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

function loginUser(){
alert('Inicio de sesión correcto');
closeAuth();
}

function googleLogin(){
window.open('https://accounts.google.com','_blank');
}

function facebookLogin(){
window.open('https://facebook.com','_blank');
}

renderProducts();
updateCart();
