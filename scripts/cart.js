const cart = [];

function addToCart(productId) {
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
}

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((qty)=> {
        cartQuantity += qty.productQuantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

const cartButton = document.querySelectorAll('.js-add-to-cart-button');
cartButton.forEach((button)=> {
    button.addEventListener('click', ()=> {
        const productId = button.dataset.productId;
        addToCart(productId);
        updateCartQuantity()
    });
});
   