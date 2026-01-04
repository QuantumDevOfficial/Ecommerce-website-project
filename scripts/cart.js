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
            productQuantity: 1
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