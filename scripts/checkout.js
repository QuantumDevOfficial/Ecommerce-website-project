import {products, deliveryOptions, getProduct, addToOrder} from "./data.js";
import {cart, removeFromCart, updateDeliveryOptionId, resetCart} from "./cart.js";
import {formatCurrency} from "./utils.js";

function updateCheckOutQuantity() {
    let checkOutQuantity = 0;
    cart.forEach((qtys)=> {
        checkOutQuantity += qtys.productQuantity;
    });
    
    document.querySelector('.js-checkout-quantity').innerHTML = `${checkOutQuantity} Items`;
    document.querySelector('.js-items').innerHTML = `Items(${checkOutQuantity})`;
};

function deliveryOptionHTML(cartObject, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption)=> {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliverydays, 'days');
        const dateFormat = deliveryDate.format('dddd, MMMM D');
        const priceFormat = deliveryOption.deliveryPrice === 0 ? 'FREE' : `Gh¢${formatCurrency(deliveryOption.deliveryPrice)}`;
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

export function renderPaymentSummery() {
    let productsPrice = 0;
    let deliveryAmount = 0;

    cart.forEach((item)=> {
        const product = getProduct(item.productId);
        productsPrice += product.priceCedis * item.productQuantity;
    });

    // the code below could also work but not healthy for bigger project

    /* cart.forEach((item)=> {
        const productId = item.productId;
        const quantity = item.productQuantity;
        products.forEach((product)=> {
            if (product.id === productId) {
                const productAmount = product.priceCedis * quantity;
                productsPrice += productAmount;
            };
        });
    }); */

    cart.forEach((cartItem)=> {
        const deliveryOptionId = cartItem.deliveryOptionId;
        deliveryOptions.forEach((option)=> {
            if (deliveryOptionId === option.id) {
                deliveryAmount += option.deliveryPrice;
            };
        });
    });

    const actualProductPrice = deliveryAmount + productsPrice;
    const taxRate = 0.06;
    const taxAmount = actualProductPrice * taxRate;
    const amountPayable = actualProductPrice + taxAmount;
    document.querySelector('.js-tax-rate').innerHTML = `Tax(${taxRate * 100}%):`
    document.querySelector('.js-product-price').innerHTML = formatCurrency(productsPrice);
    document.querySelector('.js-delivery-fee').innerHTML = formatCurrency(deliveryAmount);
    document.querySelector('.js-actual-product-price').innerHTML = formatCurrency(actualProductPrice);
    document.querySelector('.js-tax-amount').innerHTML = formatCurrency(taxAmount);
    document.querySelector('.js-total').innerHTML = formatCurrency(amountPayable);
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
                renderPaymentSummery();
                renderCheckoutPage();
            });
        });

        document.querySelectorAll('.js-option').forEach((element)=> {
            element.addEventListener('click', ()=> {
                const productId = element.dataset.productId;
                const deliveryOptionId = element.dataset.deliveryOptionId;
                updateDeliveryOptionId(deliveryOptionId, productId);
                renderPaymentSummery();
                
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

export function addOrders() {

    let productsPrice = 0;
    let deliveryAmount = 0;

    cart.forEach((item)=> {
        const product = getProduct(item.productId);
        productsPrice += product.priceCedis * item.productQuantity;
    });

    let deliveryOption;
    
    cart.forEach((cartItem)=> {
        const deliveryOptionId = cartItem.deliveryOptionId;
        deliveryOptions.forEach((option)=> {
            if (deliveryOptionId === option.id) {
                deliveryAmount += option.deliveryPrice;
                deliveryOption = option;
            };
        });
    });

    const actualProductPrice = deliveryAmount + productsPrice;
    const taxRate = 0.06;
    const taxAmount = actualProductPrice * taxRate;
    const amountPayable = formatCurrency(actualProductPrice + taxAmount);

    const today = dayjs();
    const orderDate = today.format('MMMM D');
    const deliveryDay = today.add(deliveryOption.deliverydays, 'days');
    const deliveryDayFormat = deliveryDay.format('MMMM D');
    const orderId = crypto.randomUUID();

    const orderProducts = cart.map((cartItem)=> {
        return {
            productId: cartItem.productId,
            arrivaldate: deliveryDayFormat,
            productQuantity: cartItem.productQuantity
        };
    });

    const orderObject = {
        id: orderId,
        orderDate: orderDate,
        orderPrice: amountPayable,
        products: orderProducts
    };

    addToOrder(orderObject);
    resetCart();
    window.location.href = 'orders.html';
};

renderPaymentSummery()

const placeOrderBtn = document.querySelector('.js-place-order-button');
placeOrderBtn.addEventListener('click', addOrders);

renderCheckoutPage();