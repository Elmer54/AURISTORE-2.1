function addProduct(){
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    document.getElementById('result').innerHTML += `
        <div style="margin-top:20px;background:#111;padding:20px;border-radius:20px;">
            <h3>${name}</h3>
            <p>${price}</p>
        </div>
    `;
}
