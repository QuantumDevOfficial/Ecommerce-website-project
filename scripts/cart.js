export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorge() {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export function addToCart(productId) {
    let foundInCart;

    cart.forEach((item)=> {
        if (productId === item.productId){
            foundInCart = item;
        }
    });

    if (foundInCart) {
        foundInCart.productQuantity += 1;
    } 

    else {
        cart.push({
            productId: productId,
            productQuantity: 1,
            deliveryOptionId: '36c64692'
        });
    };

    saveToStorge();
};

export function removeFromCart(productId) {
    const updatedCart = [];

    cart.forEach((cartItem)=> {
        if (cartItem.productId !== productId) {
            updatedCart.push(cartItem);
        };
    });

    cart = updatedCart;

    saveToStorge();
};

export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((qty)=> {
        cartQuantity += qty.productQuantity;
    });

    if (cartQuantity !== 0) {
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        document.querySelector('.js-cart-quantity').classList.remove('toggle');
    };
};

export function updateDeliveryOptionId(deliveryOptionId, productId) {
    let found;
    cart.forEach((item)=> {
        if (productId === item.productId) {
            found = item;
        };
    });

    if (found) {
        found.deliveryOptionId = deliveryOptionId;
        saveToStorge();
    };
};