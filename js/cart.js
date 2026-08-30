

let cart =
    JSON.parse(
        localStorage.getItem("lumeaCart")
    ) || [];


const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const totalElement =
    document.getElementById("total");

const cartCount =
    document.getElementById("cartCount");

const checkoutBtn =
    document.getElementById("checkoutBtn");



function updateCartCount() {

    const totalItems =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartCount.textContent =
        totalItems;

}




function displayCart() {

    cartItems.innerHTML = "";


    /* Empty cart */

    if (cart.length === 0) {

        emptyCart.classList.add("show");

        subtotalElement.textContent =
            "₹0";

        shippingElement.textContent =
            "—";

        totalElement.textContent =
            "₹0";

        checkoutBtn.disabled = true;

        checkoutBtn.style.opacity =
            "0.5";

        updateCartCount();

        return;

    }


    emptyCart.classList.remove("show");

    checkoutBtn.disabled = false;

    checkoutBtn.style.opacity = "1";


    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price *
            item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${getProductImage(item.name)}"
                    alt="${item.name}"
                >

            </div>


            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    LUMÉA skincare
                </p>


                <div class="cart-price">

                    ₹${item.price}

                </div>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="remove-item"
                onclick="removeItem(${item.id})"
            >
                Remove
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    /* SHIPPING */

    let shipping = 0;

    if (subtotal > 0 && subtotal < 999) {

        shipping = 79;

        shippingElement.textContent =
            "₹79";

    } else {

        shippingElement.textContent =
            "FREE";

    }


    const total =
        subtotal + shipping;


    subtotalElement.textContent =
        `₹${subtotal}`;

    totalElement.textContent =
        `₹${total}`;


    updateCartCount();

}




function getProductImage(name) {

    const images = {

        "Hydrating Cleanser":
            "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=85",

        "Vitamin C Serum":
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85",

        "Barrier Repair Cream":
            "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=85",

        "Daily Sunscreen":
            "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85"

    };


    return (
        images[name] ||
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85"
    );

}




function changeQuantity(
    productId,
    amount
) {

    const product =
        cart.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    product.quantity += amount;


    if (product.quantity <= 0) {

        cart =
            cart.filter(
                item =>
                    item.id !== productId
            );

    }


    saveCart();

}



function removeItem(productId) {

    cart =
        cart.filter(
            item =>
                item.id !== productId
        );


    saveCart();

}




function saveCart() {

    localStorage.setItem(
        "lumeaCart",
        JSON.stringify(cart)
    );


    displayCart();

}



checkoutBtn.addEventListener(
    "click",
    () => {

        alert(
            "Checkout demo — payment integration is not required for this project."
        );

    }
);




displayCart();
```
