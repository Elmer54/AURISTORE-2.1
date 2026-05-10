const products = [
{
name:'FiveM Clothing Pack',
price:23.50,
image:'https://picsum.photos/500/300?1'
},
{
name:'Police EMS Script',
price:15.00,
image:'https://picsum.photos/500/300?2'
}
];

let cart = [];

const productsContainer = document.getElementById('products');
const cartItems = document.getElementById('cartItems');

function renderProducts(){

products.forEach((product,index)=>{

productsContainer.innerHTML += `
<div class="product">

<img src="${product.image}">

<div class="info">
<h3>${product.name}</h3>
<p>USD ${product.price}</p>

<button onclick="addToCart(${index})">
Agregar al carrito
</button>

</div>
</div>
`;

});

}

function addToCart(index){

cart.push(products[index]);

renderCart();

}

function renderCart(){

cartItems.innerHTML='';

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `
<div class="cart-item">

<img src="${item.image}">

<div>
<h2>${item.name}</h2>
<p>USD ${item.price}</p>

<button class="remove-btn" onclick="removeItem(${index})">
Eliminar
</button>
</div>

</div>
`;

});

document.getElementById('totalPrice').innerText =
'Total: USD ' + total.toFixed(2);

}

function removeItem(index){

cart.splice(index,1);

renderCart();

}

function checkout(){

alert('Redirigiendo al pago seguro...');

window.location.href = 'payment.html';

}

renderProducts();
