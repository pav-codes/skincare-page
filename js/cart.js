

const CART_KEY = "lumeaCart";



function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem(CART_KEY)
        ) || [];

    } catch (error) {

        console.error(
            "Could not read cart:",
            error
        );

        return [];

    }

}



function saveCart(cart) {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


let cart = getCart();




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

    const count = cart.reduce(
        (total, item) => {
            return total + Number(item.quantity);
        },
        0
    );

    if (cartCount) {

        cartCount.textContent = count;

    }

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

    return images[name] || images["Daily Sunscreen"];

}




function displayCart() {

    cartItems.innerHTML = "";


    /* EMPTY CART */

    if (cart.length === 0) {

        emptyCart.classList.add("show");

        subtotalElement.textContent = "₹0";

        shippingElement.textContent = "—";

        totalElement.textContent = "₹0";

        checkoutBtn.disabled = true;

        checkoutBtn.style.opacity = "0.5";

        updateCartCount();

        return;

    }


    emptyCart.classList.remove("show");

    checkoutBtn.disabled = false;

    checkoutBtn.style.opacity = "1";


    let subtotal = 0;


    /* DISPLAY EACH ITEM */

    cart.forEach(item => {

        const quantity =
            Number(item.quantity);

        const price =
            Number(item.price);

        subtotal += price * quantity;


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
                    ₹${price}
                </div>


                <div class="quantity-control">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${quantity}
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

        shippingElement.textContent = "₹79";

    } else {

        shippingElement.textContent = "FREE";

    }


    /* TOTAL */

    const total =
        subtotal + shipping;


    subtotalElement.textContent =
        `₹${subtotal}`;

    totalElement.textContent =
        `₹${total}`;


    updateCartCount();

}




function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            product =>
                product.id === productId
        );


    if (!item) {

        return;

    }


    item.quantity =
        Number(item.quantity) + amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product =>
                    product.id !== productId
            );

    }


    saveCart(cart);

    displayCart();

}




function removeItem(productId) {

    cart =
        cart.filter(
            product =>
                product.id !== productId
        );


    saveCart(cart);

    displayCart();

}


if (checkoutBtn) {

    checkoutBtn.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            alert(
                "Checkout demo — no real payment is required for this project."
            );

        }
    );

}




displayCart();
updateCartCount();

