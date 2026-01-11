import {products, deliveryOptions} from "./data.js";
import {cart, removeFromCart, updateDeliveryOptionId} from "./cart.js";

function updateCheckOutQuantity() {
    let checkOutQuantity = 0;
    cart.forEach((qtys)=> {
        checkOutQuantity += qtys.productQuantity;
    });
    
    document.querySelector('.js-checkout-quantity').innerHTML = `${checkOutQuantity} Items`;
};

function deliveryOptionHTML(cartObject, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption)=> {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliverydays, 'days');
        const dateFormat = deliveryDate.format('dddd, MMMM D');
        const priceFormat = deliveryOption.deliveryPrice === 0 ? 'FREE' : `Gh¢${(deliveryOption.deliveryPrice / 100).toFixed(2)}`;
        const beChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';

        html += `
            <div class="option js-option" data-product-id="${cartObject.id}" data-delivery-option-id="${deliveryOption.id}">
                <div>
                    <input type="radio" name="deliveryoptionId-${cartObject.id}" ${beChecked}>
                </div>

                <div class="label">
                    <div class="label-date">
                        ${dateFormat}
                    </div>

                    <div class="label-price">
                        ${priceFormat} - ${deliveryOption.deliverytype}
                    </div>
                </div>
            </div>
        `;
    });

    return html;
};

function renderCheckoutPage() {
    updateCheckOutQuantity();

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

            const deliveryOptionId = cartItem.deliveryOptionId;
            let deliveryOption;
            deliveryOptions.forEach((option)=> {
                if (option.id === deliveryOptionId) {
                    deliveryOption = option;
                };
            });

            const today = dayjs();
            const deliveryDay = today.add(deliveryOption.deliverydays, 'days');
            const deliveryDayFormat = deliveryDay.format('dddd, MMMM D');

            cartHTML += `
                <div class="product-review">
                    <div class="checkout-product-delivery-date">
                        Delivery Date: <span>${deliveryDayFormat}</span>
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

                            ${deliveryOptionHTML(cartObject, cartItem)}
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

        document.querySelectorAll('.js-option').forEach((element)=> {
            element.addEventListener('click', ()=> {
                const productId = element.dataset.productId;
                const deliveryOptionId = element.dataset.deliveryOptionId;
                updateDeliveryOptionId(deliveryOptionId, productId);
                
                if (!document.startViewTransition) {
                    renderCheckoutPage();
                }   
                
                else {
                    document.startViewTransition(() => {
                        renderCheckoutPage();
                    });
                };
            });
        });
    };
};

renderCheckoutPage();