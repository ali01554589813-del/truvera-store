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
    updateCartCount(); // 👈 مهم
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
function renderCart(){

    let box = document.getElementById("cartItems");
    if(!box) return;

    box.innerHTML = "";

    let total = 0;

    cart.forEach((item,i)=>{

        total += item.price * item.quantity;

        box.innerHTML += `
        <div class="cart-item">
            <h4>${item.name}</h4>
            <p>${item.price} × ${item.quantity}</p>
            
            <button onclick="increase(${i})">+</button>
            <button onclick="decrease(${i})">-</button>
            <button onclick="removeItem(${i})">حذف</button>
        </div>
        `;
    });

    let t = document.getElementById("total");
    if(t) t.innerText = "الإجمالي: " + total + " EGP";
}
function increase(i){
    cart[i].quantity++;
    saveCart();
    renderCart();
    updateCartCount();
}

function decrease(i){
    if(cart[i].quantity > 1){
        cart[i].quantity--;
    } else {
        cart.splice(i,1);
    }
    saveCart();
    renderCart();
    updateCartCount();
}
function placeOrder(){

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if(name === "" || phone === "" || address === ""){
        alert("من فضلك املأ جميع البيانات");
        return;
    }

    let total = 0;
    let message = "🛒 طلب جديد من المتجر:%0A%0A";

    cart.forEach(item=>{
        total += item.price * item.quantity;
        message += `- ${item.name} × ${item.quantity} = ${item.price * item.quantity} EGP%0A`;
    });

    message += `%0A👤 الاسم: ${name}`;
    message += `%0A📞 الهاتف: ${phone}`;
    message += `%0A📍 العنوان: ${address}`;
    message += `%0A💰 الإجمالي: ${total} EGP`;

    // رقم واتساب (غيره برقمك)
    let whatsappNumber = "2001273735156/2001001342050";

    let url = "https://wa.me/" + whatsappNumber + "?text=" + message;

    // فتح واتساب
    window.open(url, "_blank");

    // تفريغ السلة بعد الإرسال
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();

    setTimeout(()=>{
        window.location.href = "index.html";
    }, 2000);
}


}updateCartCount();