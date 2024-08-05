
 function loadFlowers() {
    var flowersContainer = document.getElementById('flowersContainer');

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'get_flowers.php', true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
           
            flowersContainer.innerHTML = xhr.responseText;
        } else {
            console.error('Request failed');
        }
    };
    xhr.send();
}


window.onload = loadFlowers;


var cartItems = {};







function addToCart(productId, quantityId) {

    var product = document.getElementById(productId);
    var quantityInput = document.getElementById(quantityId);
    var quantity = parseInt(quantityInput.value, 10);
    var pricePerUnit = parseFloat(product.querySelector('.price').textContent.replace('Ціна: ₴', ''));
    var totalPrice = pricePerUnit * quantity;
    var existingItem = Object.values(cartItems).find(item => item.name === product.querySelector('h3').textContent);
    if (existingItem) {

        existingItem.quantity += quantity;
        existingItem.price = (parseFloat(existingItem.price) + totalPrice).toFixed(2);
        var cartItem = document.getElementById(existingItem.id);
        cartItem.querySelector('p:nth-of-type(3)').innerHTML = '<strong>Кількість:</strong> ' + existingItem.quantity;
        cartItem.querySelector('p:nth-of-type(2)').innerHTML = '<strong>Ціна за ' + existingItem.quantity + ' шт.:</strong> ₴' + existingItem.price;
    } else {
        var itemId = 'cartItem' + Object.keys(cartItems).length; 
        var cartItem = document.createElement('div');
        cartItem.id = itemId;
        cartItem.innerHTML = '<img src="' + product.querySelector('img').src + '" width="50px">' +
                             '<p><strong>Назва:</strong> ' + product.querySelector('h3').textContent + '</p>' +
                             '<p><strong>Ціна за ' + quantity + ' шт.:</strong> ₴' + totalPrice.toFixed(2) + '</p>' +
                             '<p><strong>Кількість:</strong> ' + quantity + '</p>' +
                             '<button onclick="removeFromCart(\'' + itemId + '\')" id="butf">Видалити</button>';
        var cartItemsContainer = document.getElementById('cartItemsContainer');
        cartItemsContainer.appendChild(cartItem);
        cartItems[itemId] = {
            id: itemId,
            name: product.querySelector('h3').textContent,
            price: totalPrice.toFixed(2), 
            quantity: quantity
        };
    }
    quantityInput.value = 1;
    updateCartEmptyMessage();
}











function removeFromCart(itemId) {
  
    var cartItem = document.getElementById(itemId);


    var cartItemsContainer = document.getElementById('cartItemsContainer');
    cartItemsContainer.removeChild(cartItem);

   
    delete cartItems[itemId];

   
    updateCartEmptyMessage();
}

function increaseQuantity(quantityId) {
    var quantityInput = document.getElementById(quantityId);
    quantityInput.value = parseInt(quantityInput.value, 10) + 1;
}

function decreaseQuantity(quantityId) {
    var quantityInput = document.getElementById(quantityId);
    if (parseInt(quantityInput.value, 10) > 1) {
        quantityInput.value = parseInt(quantityInput.value, 10) - 1;
    }
}





function placeOrder() {
    if (Object.keys(cartItems).length === 0) {
        alert("Корзина порожня");
        return;
    }

    var order = {
        items: cartItems
    };

    var queryString = Object.keys(order).map(function(key) {
        return key + '=' + encodeURIComponent(JSON.stringify(order[key]));
    }).join('&');

    window.location.href = 'order_byket.php?' + queryString;
}







function updateCartEmptyMessage() {
    
    var cartItemsContainer = document.getElementById('cartItemsContainer');
    var cartEmptyMessage = cartItemsContainer.querySelector('p');

   
    if (Object.keys(cartItems).length === 0) {
        cartEmptyMessage.textContent = 'Корзина порожня';
    } else {
        cartEmptyMessage.textContent = '';
    }
}
