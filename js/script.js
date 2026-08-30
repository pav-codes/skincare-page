

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        menuBtn.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

}



document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        if (menuBtn) {
            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

});



let cart = JSON.parse(
    localStorage.getItem("lumeaCart")
) || [];


const cartCount = document.querySelector(".cart-count");


function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

}


updateCartCount();




const addButtons = document.querySelectorAll(".quick-add");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const productName =
            button.dataset.product;

        const productPrice =
            Number(button.dataset.price);


        const existingProduct =
            cart.find(
                item => item.name === productName
            );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                name: productName,
                price: productPrice,
                quantity: 1

            });

        }


        localStorage.setItem(
            "lumeaCart",
            JSON.stringify(cart)
        );


        updateCartCount();


        /* Button feedback */

        const originalText =
            button.textContent;

        button.textContent = "✓ Added";


        button.style.background =
            "var(--sage)";


        setTimeout(() => {

            button.textContent =
                originalText;

            button.style.background =
                "";

        }, 1200);

    });

});



const newsletterForm =
    document.getElementById("newsletterForm");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const email =
                document.getElementById("email").value;


            if (!email) {
                return;
            }


            alert(
                "Thank you for joining the LUMÉA community ✦"
            );


            newsletterForm.reset();

        }
    );

}




const revealElements =
    document.querySelectorAll(
        ".benefit, .product-card, .mini-product, .story-content"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    observer.observe(element);

});



const cartButton =
    document.querySelector(".cart-btn");


if (cartButton) {

    cartButton.addEventListener("click", () => {

        window.location.href =
            "cart.html";

    });

}
``
