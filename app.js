
let products = JSON.parse(localStorage.getItem('products')) || [
{
name:'PACK PREMIUM',
price:'€28 EUR',
category:'packs',
image:'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop'
},
{
name:'POLICE + EMS',
price:'€82 EUR',
category:'scripts',
image:'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop'
},
{
name:'UNIQUE SCRIPTS',
price:'€49 EUR',
category:'maps',
image:'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1200&auto=format&fit=crop'
}
];

const container = document.getElementById('productsContainer');

function renderProducts(category='all'){
container.innerHTML='';

let filtered = category === 'all'
? products
: products.filter(p=>p.category === category);

filtered.forEach(product=>{
container.innerHTML += `
<div class="card">
<img src="${product.image}">
<div class="card-info">
<h3>${product.name}</h3>
<div class="category">${product.category.toUpperCase()}</div>
<p>${product.price}</p>
<button>Comprar</button>
</div>
</div>
`;
});
}

document.querySelectorAll('.category-btn').forEach(btn=>{
btn.addEventListener('click', ()=>{

document.querySelectorAll('.category-btn').forEach(b=>b.classList.remove('active'));
btn.classList.add('active');

renderProducts(btn.dataset.category);
});
});

renderProducts();
