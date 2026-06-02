let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function saveFav(){
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function addToCart(name, price){

    let item = cart.find(p => p.name === name);

    if(item){
        item.quantity++;
    } else {
        cart.push({name, price, quantity:1});
    }

    saveCart();
    renderCart();
    showToast("تمت الإضافة 🛒");
}

function renderCart(){

    let box = document.getElementById("cartItems");
    if(!box) return;

    box.innerHTML = "";

    let total = 0;

    cart.forEach((item,i)=>{
        total += item.price * item.quantity;

        box.innerHTML += `
        <p>
            ${item.name} × ${item.quantity}
            (${item.price * item.quantity} EGP)

            <button onclick="increase(${i})">+</button>
            <button onclick="decrease(${i})">-</button>
            <button onclick="removeItem(${i})">حذف</button>
        </p>
        `;
    });

    let t = document.getElementById("total");
    if(t) t.innerText = "الإجمالي: " + total + " EGP";
}

function removeItem(i){
    cart.splice(i,1);
    saveCart();
    renderCart();
}

function increase(i){
    cart[i].quantity++;
    saveCart();
    renderCart();
}

function decrease(i){
    if(cart[i].quantity > 1){
        cart[i].quantity--;
    } else {
        cart.splice(i,1);
    }
    saveCart();
    renderCart();
}

function checkout(){
    document.getElementById("checkoutBox").classList.remove("hidden");
}

function submitOrder(){
    cart = [];
    saveCart();
    renderCart();
    document.getElementById("successMsg").classList.remove("hidden");
}

function toggleFav(name){

    if(favorites.includes(name)){
        favorites = favorites.filter(x=>x!==name);
        showToast("تم الحذف ❌");
    } else {
        favorites.push(name);
        showToast("تمت الإضافة ❤️");
    }

    saveFav();
}

function showToast(msg){

    let t = document.getElementById("toast");
    if(!t) return;

    t.innerText = msg;
    t.style.display = "block";

    setTimeout(()=>{
        t.style.display = "none";
    },2000);
}

renderCart();