import {updateCartQuantity} from "./cart.js";
import {getProduct, orders, products} from "./data.js";
import {favorites} from "./favorites.js";
import {formatCurrency} from "./utils.js";

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


function renderFavoritePage() {
    const groups = {};

    favorites.forEach((favoriteItem)=> {
        const productId = favoriteItem.productId;
        const dateKey = favoriteItem.dateAdded;

        const dateProduct = products.find(product => product.id === productId);
        if (dateProduct) {
            if (!groups[dateKey]) {
                groups[dateKey] = [];
            };

            groups[dateKey].push(dateProduct);
        };
    });
    
    let pageHTML = '';

    Object.keys(groups).forEach((date)=> {
        pageHTML += `
            <div class="favorites-product-container">
                <div class="favorites-product-container-head">
                    <span>Added On:</span> ${date}
                </div>

                <div class="favorites-product-container-body">
        `;

        const productOnToday = groups[date];
        productOnToday.forEach((product)=> {
            pageHTML += `
                <div class="favorites-product-container-body-card">
                    <div class="favorites-product-image-container">
                        <img src="${product.image}" alt="...">
                    </div>

                    <div class="favorites-product-container-body-card-detail">
                        <div class="favorites-product-name-container">${product.name}</div>
                    <div class="favorites-product-price-container">Gh¢${formatCurrency(product.priceCedis)}</div>
                    <div class="favorites-product-checkout-container">
                        <button class="checkout-now">Checkout Now</button>
                    </div>
                    </div>
                </div>
            `;
        });

        pageHTML += `
                    </div>
                </div>
            </div>
        `;
    });

    document.querySelector('.favorites-product-container-grid').innerHTML = pageHTML;
};

updateCartQuantity();
renderOrdersPage();
renderFavoritePage()