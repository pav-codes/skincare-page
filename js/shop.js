

const products = [

    {
        id: 1,
        name: "Hydrating Cleanser",
        category: "cleanser",
        categoryName: "CLEANSER",
        description: "Gentle • 150ml",
        price: 799,
        rating: 4.8,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 2,
        name: "Vitamin C Serum",
        category: "serum",
        categoryName: "SERUM",
        description: "Brightening • 30ml",
        price: 999,
        rating: 4.9,
        badge: "NEW",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 3,
        name: "Barrier Repair Cream",
        category: "moisturizer",
        categoryName: "MOISTURIZER",
        description: "Nourishing • 50ml",
        price: 899,
        rating: 4.7,
        badge: "",
        image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 4,
        name: "Daily Sunscreen",
        category: "sunscreen",
        categoryName: "SUNSCREEN",
        description: "SPF 50 • 50ml",
        price: 849,
        rating: 4.8,
        badge: "",
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 5,
        name: "Gentle Foam Cleanser",
        category: "cleanser",
        categoryName: "CLEANSER",
        description: "Refreshing • 150ml",
        price: 749,
        rating: 4.6,
        badge: "",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 6,
        name: "Hyaluronic Serum",
        category: "serum",
        categoryName: "SERUM",
        description: "Hydrating • 30ml",
        price: 949,
        rating: 4.8,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 7,
        name: "Daily Moisture Cream",
        category: "moisturizer",
        categoryName: "MOISTURIZER",
        description: "Lightweight • 50ml",
        price: 849,
        rating: 4.7,
        badge: "",
        image: "https://images.unsplash.com/photo-1601612628452-9e99ced43524?auto=format&fit=crop&w=800&q=85"
    },


    {
        id: 8,
        name: "Mineral Sun Fluid",
        category: "sunscreen",
        categoryName: "SUNSCREEN",
        description: "SPF 50 • 50ml",
        price: 899,
        rating: 4.9,
        badge: "BESTSELLER",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=85"
    }

];




const productGrid =
    document.getElementById("productGrid");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const searchInput =
    document.getElementById("searchInput");

const noResults =
    document.getElementById("noResults");

const cartCount =
    document.getElementById("cartCount");

const cartButton =
    document.getElementById("cartButton");

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");




let currentCategory = "all";



let cart =
    JSON.parse(
        localStorage.getItem("lumeaCart")
    ) || [];


function updateCartCount() {

    const total = cart.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );


    if (cartCount) {

        cartCount.textContent = total;

    }

}


updateCartCount();



function displayProducts() {

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();


    const filteredProducts =
        products.filter(product => {


            const matchesCategory =
                currentCategory === "all" ||
                product.category === currentCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    productGrid.innerHTML = "";


    if (filteredProducts.length === 0) {

        noResults.classList.add("show");

        return;

    }


    noResults.classList.remove("show");


    filteredProducts.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                ${
                    product.badge
                    ?
                    `<span class="product-badge">
                        ${product.badge}
                    </span>`
                    :
                    ""
                }


                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >


                <button
                    class="quick-add"
                    data-id="${product.id}"
                >
                    Add to cart
                </button>

            </div>


            <div class="product-info">

                <div class="product-category">
                    ${product.categoryName}
                </div>


                <h3>
                    ${product.name}
                </h3>


                <p>
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <span class="price">
                        ₹${product.price}
                    </span>


                    <span class="rating">
                        ★ ${product.rating}
                    </span>

                </div>

            </div>

        `;


        productGrid.appendChild(card);

    });


    /* Add button listeners */

    document
        .querySelectorAll(".quick-add")
        .forEach(button => {

            button.addEventListener(
                "click",
                addToCart
            );

        });

}


function addToCart(event) {

    const productId =
        Number(
            event.currentTarget.dataset.id
        );


    const product =
        products.find(
            item => item.id === productId
        );


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity += 1;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    localStorage.setItem(
        "lumeaCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    /* Button feedback */

    const button =
        event.currentTarget;


    button.textContent =
        "✓ Added";


    button.style.background =
        "var(--sage)";


    setTimeout(() => {

        button.textContent =
            "Add to cart";

        button.style.background =
            "";

    }, 1200);

}




categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {


            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            displayProducts();

        }
    );

});




if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayProducts
    );

}



if (cartButton) {

    cartButton.addEventListener(
        "click",
        () => {

            window.location.href =
                "cart.html";

        }
    );

}



if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle(
                    "open"
                );


            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}



displayProducts();

