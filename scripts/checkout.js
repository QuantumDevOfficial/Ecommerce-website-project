import {products} from "./product.js";
import {cart, removeFromCart,} from "./cart.js";


function renderCheckoutPage() {
    if (cart.length === 0) {
        const emptyCart = `
            <div class="empty-cart-container">
                <img class="emogi" src="images/icons/emoji.png" alt="Empty cart Emogi">
                <h2 class="empty-text-title">Your Cart is Empty</h2>
                <p class="empty-text">Looks like you haven't added anything yet. Check our products and discover great deals.</p>
                <a class="empty-cart-button" href="home.html">Shop Now</a>
            </div>
        `;

        document.querySelector('.checkout-product-grid').innerHTML = emptyCart;

        return
    }

    else {
        let cartHTML = '';

        cart.forEach((cartItem)=> {
            const productId = cartItem.productId;

            let cartObject;
            products.forEach((product)=> {
                if (product.id === productId) {
                    cartObject = product;
                };
            });

            cartHTML += `
                <div class="product-review">
                    <div class="checkout-product-delivery-date">
                        Delivery Date: <span>Monday, December 25</span>
                    </div>

                    <div class="product-description">
                        <div class="image-description-box">
                            <div class="product-image">
                                <img src="${cartObject.image}" alt="...">
                            </div>

                            <div class="product-details">
                                <div class="product-name">${cartObject.name}</div>
                                <div class="product-price">Gh¢${(cartObject.priceCedis / 100).toFixed(2)}</div>
                                <div class="product-quantity">
                                    Quantity:<span>${cartItem.productQuantity}</span>
                                    <span class="product-quantity-link">Update</span>
                                    <span class="product-quantity-link js-delete-link" data-product-id="${cartItem.productId}">Delete</span>
                                </div>
                            </div>
                        </div>

                        <div class="products-delivery-option">
                            <div class="delivery-option-label">Choose method of delivery</div>

                            <div class="option">
                                <div>
                                    <input type="radio" name="deliveryoptionId-${cartObject.id}" checked>
                                </div>

                                <div class="label">
                                    <div class="label-date">
                                        Friday, January 16
                                    </div>

                                    <div class="label-price">
                                        FREE Shipping
                                    </div>
                                </div>
                            </div>

                            <div class="option">
                                <div>
                                    <input type="radio" name="deliveryoptionId-${cartObject.id}">
                                </div>

                                <div class="label">
                                    <div class="label-date">
                                        Thursday, January 8
                                    </div>

                                    <div class="label-price">
                                        Gh¢20.00 - Shipping
                                    </div>
                                </div>
                            </div>

                            <div class="option">
                                <div>
                                    <input type="radio" name="deliveryoptionId-${cartObject.id}">
                                </div>

                                <div class="label">
                                    <div class="label-date">
                                        Monday, December 25
                                    </div>

                                    <div class="label-price">
                                        Gh¢40.00 - Shipping
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        document.querySelector('.js-orders-container-grid').innerHTML = cartHTML;

        const deleteButton = document.querySelectorAll('.js-delete-link');
        deleteButton.forEach((deleteLink)=> {
            deleteLink.addEventListener('click', ()=> {
                const deleteItem = deleteLink.dataset.productId;
                removeFromCart(deleteItem);
                renderCheckoutPage();
            });
        });
    }
};

renderCheckoutPage();
