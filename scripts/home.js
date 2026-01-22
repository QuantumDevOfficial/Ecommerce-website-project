import {products} from "./data.js";
import {addToCart, updateCartQuantity} from "./cart.js";
import {toggleFavorite} from "./favorites.js"



// Shuffle carousol
const carousel = document.querySelectorAll(".carousel");
let recent = 0;

setInterval(()=>{
    carousel[recent].classList.remove("active");
    recent = (recent + 1) % carousel.length;
    carousel[recent].classList.add("active");
}, 4000);

// Add to favorite

function activation(e) {
    const clickedButton = e.currentTarget;
    const activated = clickedButton.querySelector('.activated');
    const deactivated = clickedButton.querySelector('.deactivated');
    activated.classList.add('deactivated');
    activated.classList.remove('activated');
    deactivated.classList.add('activated');
    deactivated.classList.remove('deactivated');
    const productId = e.target.closest('button').dataset.productId;
    toggleFavorite(productId);
};

window.activation = activation;

let productHTML = '';

products.forEach((product) => {
    productHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img src="${product.image}" alt="..." class="product-image">
            </div>
            <div class="product-name">
                ${product.name}
            </div>
            <div class="product-rating-container">
                <img src="images/ratings/rating-${product.rating.stars * 10}.png" alt="Stars" class="product-rating-stars">
                <div class="product-rating-counts">
                    ${product.rating.counts}
                </div>
            </div>
            <div class="product-price">Gh¢${(product.priceCedis / 100).toFixed(2)}</div>
            
            <div class="product-quantity-container">
                <select name="quantity" class="quantity">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>

                <button onclick="activation(event)" class="add-to-favarite" data-product-id="${product.id}">
                    <img class="activated" src="images/icons/icons8-favorite-24 (2).png" alt="">
                    <img class="deactivated" src="images/icons/icons8-favorite-24.png" alt="">
                </button>
            </div>

            <div class="add-to-cart-alert">
                <img src="images/icons/checkmark.png" alt="">
                Added
            </div>

            <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">
                <img src="images/icons/icon8-shopping-cart-24.png" alt="">
                Add to Cart
            </button>
        </div>
   `;
});

document.querySelector('.js-container-grid').innerHTML = productHTML;

updateCartQuantity();

const cartButton = document.querySelectorAll('.js-add-to-cart-button');
cartButton.forEach((button)=> {
    button.addEventListener('click', ()=> {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity();
    });
});