// =====================
// CART
// =====================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price){

    let item = cart.find(p => p.name === name);

    if(item){
        item.quantity++;
    }else{
        cart.push({
            name:name,
            price:price,
            quantity:1
        });
    }

    saveCart();
    renderCart();
    updateCartCount();

    showToast("تمت إضافة المنتج للسلة 🛒");
}

function removeItem(index){

    cart.splice(index,1);

    saveCart();
    renderCart();
    updateCartCount();
}

function increase(index){

    cart[index].quantity++;

    saveCart();
    renderCart();
    updateCartCount();
}

function decrease(index){

    if(cart[index].quantity > 1){
        cart[index].quantity--;
    }else{
        cart.splice(index,1);
    }

    saveCart();
    renderCart();
    updateCartCount();
}

function renderCart(){

    let cartItems = document.getElementById("cartItems");

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item,index)=>{

        let itemTotal = item.price * item.quantity;

        total += itemTotal;

        cartItems.innerHTML += `
        <div class="cart-item">

            <h3>${item.name}</h3>

            <p>
                السعر: ${item.price} EGP
            </p>

            <p>
                الكمية: ${item.quantity}
            </p>

            <div>

                <button onclick="increase(${index})">
                    +
                </button>

                <button onclick="decrease(${index})">
                    -
                </button>

                <button onclick="removeItem(${index})">
                    حذف
                </button>

            </div>

        </div>
        `;
    });

    let totalBox = document.getElementById("total");

    if(totalBox){
        totalBox.innerText =
        "الإجمالي: " + total + " EGP";
    }

    if(cart.length === 0){
        cartItems.innerHTML =
        "<p>لا توجد منتجات في السلة</p>";
    }
}

// =====================
// CART COUNT
// =====================

function updateCartCount(){

    let count = 0;

    cart.forEach(item=>{
        count += item.quantity;
    });

    let cartCount =
    document.getElementById("cartCount");

    if(cartCount){
        cartCount.innerText = count;
    }
}

// =====================
// SEARCH
// =====================

function searchProducts(){

    let search =
    document.getElementById("search");

    if(!search) return;

    let value =
    search.value.toLowerCase();

    let products =
    document.querySelectorAll(".product");

    products.forEach(product=>{

        let text =
        product.innerText.toLowerCase();

        product.style.display =
        text.includes(value)
        ? "block"
        : "none";

    });
}

// =====================
// TOAST
// =====================

function showToast(message){

    let toast =
    document.getElementById("toast");

    if(!toast) return;

    toast.innerText = message;

    toast.style.display = "block";

    setTimeout(()=>{
        toast.style.display = "none";
    },3000);
}

// =====================
// START
// =====================

renderCart();
updateCartCount();