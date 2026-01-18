import {updateCartQuantity} from "./cart.js";
import {getProduct, orders} from "./data.js";

function renderOrdersPage() {
    let orderHTML = '';
    orders.forEach((order)=> {

        let productHTML = '';

        order.products.forEach((product)=> {

            const productObject = getProduct(product.productId);

            productHTML += `
                <div class="orders-product-container-body">
                    <div class="orders-product-container-body-left">
                        <div class="orders-product-image-container">
                            <img src="${productObject.image}" alt="...">
                        </div>
                    </div>

                    <div class="orders-product-container-body-right">
                        <div class="orders-product-details-container">
                            <div class="orders-product-details-name">
                                ${productObject.name}
                            </div>

                            <div class="orders-product-details-arrival-date">
                                Arriving on: ${product.arrivaldate}
                            </div>

                            <div class="orders-product-details-quantity">
                                Quantity: <span>${product.productQuantity}</span>
                            </div>

                            <div>
                                <button class="explore-button">
                                    Explore More
                                </button>
                            </div>
                        </div>

                        <div class="orders-product-track-container">
                            <button class="follow-button">Follow Up</button>
                        </div>
                    </div>
                </div>
            `;
        });

        orderHTML += `
            <div class="order-product-container">
                <div class="order-product-container-head">
                    <div class="order-product-date-container">
                        <span class="bold">Order Placed On:</span>
                        <span class="space">${order.orderDate}</span>
                    </div>

                    <div class="order-product-total-container">
                        <span class="bold">Total:</span>
                        <span class="space">Gh¢${order.orderPrice}</span>
                    </div>
                    <div class="order-product-id-container">
                        <span class="bold">Order ID:</span>
                        <span class="space">${order.id}</span>
                    </div>
                </div>

                <div class="orders-product">
                    ${productHTML}
                </div>
            </div>
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;
};

updateCartQuantity();
renderOrdersPage();