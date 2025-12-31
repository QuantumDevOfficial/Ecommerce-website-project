export const cart = [
    {
        productId: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
        productQuantity: 1
    },

    {
        productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        productQuantity: 1
    }
];

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
};
   