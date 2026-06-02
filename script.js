 let cart = JSON.parse(localStorage.getItem("cart")) || []; = [];
let total = 0;
function addToCart(name, price){
showToast("تمت إضافة المنتج للسلة 🛒");
let item = cart.find(product => product.name === name);

if(item){
    item.quantity += 1;
}else{
    cart.push({
        name:name,
        price:price,
        quantity:1
    });
}

saveCart();
renderCart();
}




let cartItems =
document.getElementById("cartItems");

cartItems.innerHTML = "";

total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML += `
<p>
${item.name} - ${item.price} EGP
<button onclick=" function removeItem(index){
function increaseQuantity(index){

cart[index].quantity++;

saveCart();
renderCart();

}

function decreaseQuantity(index){

if(cart[index].quantity > 1){
    cart[index].quantity--;
}else{
    cart.splice(index,1);
}

saveCart();
renderCart();

}


cart.splice(index,1);

saveCart();
renderCart();

}(${index})">
حذف
</button>
</p>
`;

});

if(cart.length === 0){
cartItems.innerHTML = "لا توجد منتجات";
}

document.getElementById("total").innerText =
"الإجمالي: " + total + " EGP";
}

function removeItem(index){
cart.splice(index,1);
renderCart();
}

function checkout(){
document
.getElementById("checkoutBox")
.classList.remove("hidden");
}

function submitOrder(){

let name =
document.getElementById("name").value;

let phone =
document.getElementById("phone").value;

if(name === "" || phone === ""){
alert("أدخل البيانات");
return;
}

// رسالة النجاح
document.getElementById("successMsg").style.display = "block";

// تفريغ السلة
cart = [];
saveCart();
renderCart();

// تفريغ الحقول
document.getElementById("name").value = "";
document.getElementById("phone").value = "";

// إخفاء النموذج بعد ثانيتين
setTimeout(()=>{
document.getElementById("checkoutBox").classList.add("hidden");
}, 2000);

}

document.getElementById("successMsg").style.display = "block";

cart = [];
renderCart();
}

function searchProducts(){

let value =
document
.getElementById("search")
.value
.toLowerCase();

let products =
document
.querySelectorAll(".product");

products.forEach(product=>{

let text =
product.innerText.toLowerCase();

product.style.display =
text.includes(value)
? "block"
: "none";

});

}

function filterProducts(type){

let products =
document.querySelectorAll(".product");

products.forEach(product=>{

if(type === "all"){

product.style.display =
"block";

}else{

product.style.display =
product.getAttribute("data-type")
=== type
? "block"
: "none";

}

});

}renderCart();
setTimeout(()=>{
document.getElementById("successMsg").style.display = "none";
}, 4000);
function showToast(message){
    let toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.display = "block";

    setTimeout(()=>{
        toast.style.display = "none";
    }, 3000);
}
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function saveFav(){
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleFav(name){

    if(favorites.includes(name)){
        favorites = favorites.filter(item => item !== name);
        showToast("تم الحذف من المفضلة ❌");
    }else{
        favorites.push(name);
        showToast("تمت الإضافة للمفضلة ❤️");
    }

    saveFav();
}