document.addEventListener("DOMContentLoaded", function () {
    const flowerCardsContainer = document.getElementById("flowerCards");
    const paginationContainer = document.getElementById("pagination-indicators");
    const prevPageBtn = document.getElementById("prev-page-btn");
    const nextPageBtn = document.getElementById("next-page-btn");
    const totalContainer = document.getElementById('total-container');
    const cartImage = document.getElementById('cart-image');
    const cartCount = document.getElementById('cart-count'); 
    const cartMenu = document.getElementById('cart-menu');
    const overlay = document.createElement('div');
    const closeButton = document.querySelector('.buttog');
    closeButton.addEventListener('click', closeCartMenu);
    
 overlay.style.position = 'fixed';
 overlay.style.top = '0';
 overlay.style.left = '0';
 overlay.style.width = '100%';
 overlay.style.height = '100%';
 overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 
 overlay.style.zIndex = '9998'; 
 overlay.style.display = 'none'; 
 overlay.style.pointerEvents = 'none';


 function openCartMenu() {
 
     cartMenu.style.display = 'block';
     overlay.style.display = 'block';
     cartMenu.style.position = 'fixed';
     cartMenu.style.left = '50%';
     cartMenu.style.top = '50%';
     cartMenu.style.transform = 'translate(-50%, -50%)';
     cartMenu.style.zIndex = '9999'; 
 }


 cartImage.addEventListener('click', openCartMenu);


 document.body.appendChild(overlay);




    
    let currentPage = 1; 
    let cartItems = [];

 

 
function loadData(page) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `load_data.php?page=${page}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                flowerCardsContainer.innerHTML = response.cardsHtml;
                paginationContainer.innerHTML = response.paginationHtml;

              
                updatePagination();
            } else {
                console.error("Помилка при загрузке данных");
            }
        }
    };
    xhr.send();
}


function updatePagination() {
    const paginationBtns = paginationContainer.querySelectorAll('.pagination-btn');
    paginationBtns.forEach((btn, index) => {
        if (index + 1 === currentPage) {
            btn.classList.add('current-page');
        } else {
            btn.classList.remove('current-page');
        }
    });
}


    
  
    prevPageBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            loadData(currentPage);
        }
    });

    nextPageBtn.addEventListener("click", function () {
        const totalPages = paginationContainer.children.length;
        if (currentPage < totalPages) {
            currentPage++;
            loadData(currentPage);
        }
    });

   
    paginationContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("pagination-btn")) {
            const page = parseInt(event.target.getAttribute("data-page"));
            loadData(page);
        }
    });

    
    loadData(currentPage);

   




    



    
    flowerCardsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const flowerId = parseInt(event.target.dataset.flowerId, 10);
            const flowerName = event.target.dataset.flowerName;
            const flowerPrice = parseFloat(event.target.dataset.flowerPrice);
            const flowerImage = event.target.dataset.flowerImage; 
            addToCart({ id: flowerId, name: flowerName, price: flowerPrice, img: flowerImage }, 1);
            showNotification(flowerName); 
        }
    });
    
    function showNotification(itemName) {
        const toast = document.getElementById('toast');
        const addedItemName = document.getElementById('added-item-name');
        addedItemName.textContent = itemName;
        toast.classList.remove('hide');
        setTimeout(() => {
            toast.classList.add('hide');
        }, 6000); 
    }
    
    
    
    


    function addToCart(item, quantity) {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push({ id: item.id, name: item.name, price: item.price, quantity: quantity, image: item.img });
        }
        updateCartCount();
        renderCart();
    }
    
    


    function renderCart() {
        const cartContainer = document.getElementById('cart-container');
        cartContainer.innerHTML = ''; 

        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemImage.alt = item.name;
            cartItemElement.appendChild(itemImage);

            const itemName = document.createElement('div');
            itemName.textContent = item.name;

            const itemPrice = document.createElement('div');
            itemPrice.textContent = `₴${item.price.toFixed(2)}`;

            const itemQuantity = document.createElement('div');
            itemQuantity.classList.add('cart-button'); 

            const decreaseBtn = document.createElement('button');
            decreaseBtn.textContent = '-';
            decreaseBtn.classList.add('decrease-btn'); 
            decreaseBtn.addEventListener('click', () => {
                decreaseQuantity(item);
            });

            const quantityDisplay = document.createElement('span');
            quantityDisplay.textContent = item.quantity;

            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+';
            increaseBtn.classList.add('increase-btn');
            increaseBtn.addEventListener('click', () => {
                increaseQuantity(item);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Видалити';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                removeCartItem(item);
            });

            cartItemElement.appendChild(itemName);
            cartItemElement.appendChild(itemPrice);
            cartItemElement.appendChild(itemQuantity);
            itemQuantity.appendChild(decreaseBtn);
            itemQuantity.appendChild(quantityDisplay);
            itemQuantity.appendChild(increaseBtn);
            cartItemElement.appendChild(deleteBtn);

            cartContainer.appendChild(cartItemElement);
        });

        updateTotal();
        updateCartCount();
    }
    
    function decreaseQuantity(item) {
        if (item.quantity > 1) {
            item.quantity--;
            renderCart();
            updateTotal();
            updateCartCount();
        }
    }
    
    function increaseQuantity(item) {
        item.quantity++;
        renderCart();
        updateTotal();
        updateCartCount();
    }
    
    
   
function removeCartItem(item) {
    
    const index = cartItems.findIndex(cartItem => cartItem.id === item.id);

 
    if (index !== -1) {
        cartItems.splice(index, 1);
        renderCart(); 
    }
}
    



function updateTotal() {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    totalContainer.textContent = `Всього: ₴${total.toFixed(2)}`;
}

function updateCartCount() {
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalCount.toString();
}


 
   const orderButton = document.getElementById('order-button');
   orderButton.addEventListener('click', () => {
       if (cartItems.length > 0) {
         
           const orderUrl = `order_page.php?items=${encodeURIComponent(JSON.stringify(cartItems))}`;
   
          
           window.location.href = orderUrl;
       } else {
           alert('Ваш кошик порожній. Додайте товари перед оформленням замовлення.');
       }
   });



menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); 

       
        const targetId = this.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            
            const offsetTop = targetElement.offsetTop;

         
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    });  
});



function closeCartMenu() {
    cartMenu.style.display = 'none';
    overlay.style.display = 'none'; 
    document.body.classList.remove('no-scroll'); 
}












// ФУНКЦИЯ НОУ СКРОЛИНГ
function toggleCartMenu() {
    document.body.classList.add('no-scroll');
    renderCart(); 
    cartMenu.classList.toggle('show');
}

  });
  
  function toggleCartMenu() {
    var cartMenu = document.getElementById("cart-menu");
    var body = document.body;

    
    var overlay = document.querySelector('.overlay');

    if (cartMenu.style.display === "none" || cartMenu.style.display === "") {
        cartMenu.style.display = "block";
        overlay.style.display = "block"; 
        body.classList.add("no-scroll"); 
    } else {
        cartMenu.style.display = "none";
        overlay.style.display = "none"; 
        body.classList.remove("no-scroll");
    }
}

  // ФУНКЦИЯ НОУ СКРОЛИНГ
  
  
  