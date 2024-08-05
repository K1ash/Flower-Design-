document.addEventListener('DOMContentLoaded', function() {
    var cartItems = sessionStorage.getItem('cartItems');
    document.getElementById("cart-container").innerHTML = cartItems;
});