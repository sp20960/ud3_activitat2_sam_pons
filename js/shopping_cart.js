document.addEventListener('DOMContentLoaded', () => {
    const urlProductsEndpoint = "https://remotehost.es/student023/shop/backend/endpoints/db_products_enabled.php";
    const urlLoadShoppingCart = "https://remotehost.es/student023/shop/backend/endpoints/db_product_by_id.php";
    const listFeaturedProducts = document.getElementById('list-featured-products');
    let productsToAdd = JSON.parse(localStorage.getItem('products')) || {}
    let listShoppingCart = document.getElementById('shopping-cart-products')


    function checkLocalStorage(){
      if(productsToAdd){
        listShoppingCart.innerHTML = ""
        for(const product of productsToAdd.products){
            showLocalStorageProducts(product);
        } 
      }
    }

    function showLocalStorageProducts(product){  
      
        let params = "productId=" + encodeURIComponent(product.productId) +
                      "&quantity=" + encodeURIComponent(product.qty);

        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", urlLoadShoppingCart, true);
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhttp.onreadystatechange = function(){
          if(xhttp.readyState == 4 && xhttp.status == 200){
              listShoppingCart.innerHTML += xhttp.responseText;
              addEventTrash();
              updateSubtotal();
          }
        }
        xhttp.send(params)

    }

    function updateSubtotal(){
      const products = document.querySelectorAll('.shopping-cart-product');
      const subtotalPrice = document.getElementById('subtotal');
      let subtotal = 0;
      products.forEach((product) => {
        subtotal += +product.dataset.productPrice;
      })
      subtotalPrice.innerText = subtotal;
    }

    function addEventTrash(){
      document.querySelectorAll('.fa-trash').forEach((trash) => {
        trash.addEventListener('click', () => {
          let productId = trash.parentElement.parentElement.parentElement.dataset.productId
          productsToAdd.products = productsToAdd.products.filter((product) => product.productId != productId);
          localStorage.setItem('products', JSON.stringify(productsToAdd));
          checkLocalStorage();
        })
      })
    }
    async function loadRelatedProducts() {
        try {
            const response = await fetch(urlProductsEndpoint);
            const products = await response.json();
            showFeaturedProducts(products);
        } catch (error) {
            loadRelatedProducts.innerHTML = "<h1>¡Ha habido un problema cargando los productos!</h1>";
        }
    }

    function showFeaturedProducts(products) {
    if(products != null && products.length != 0){
      listFeaturedProducts.innerHTML = products
      .map((product) => 
        `
           <article class="card sm:h-[320px]" data-product-id="${product.productId}">
                <img class="w-[130px]" src="${product.imagePath}" alt="">
                <div class="flex items-center justify-start w-full">
                    <i class="fa-regular fa-star fa-sm"></i>
                    <i class="fa-regular fa-star fa-sm"></i>
                    <i class="fa-regular fa-star fa-sm"></i>
                    <i class="fa-regular fa-star fa-sm"></i>
                    <i class="fa-regular fa-star fa-sm"></i>
                    <p class="text-base font-latobold">(0)</p>
                </div>
                <div class="text-start w-full">
                    <h3 class="font-latobold text-xl">${product.productName}</h3>
                    <p class="font-latobold text-2xl">${product.pricePerUnit} €</p>
                </div>
                <div class="flex justify-center bg-accent p-[5px] rounded-2xl w-full cursor-pointer">
                    <i class="fa-solid icon fa-cart-shopping"></i>
                </div>
            </article>
        `
      ).join("");
      addEventProducts();
      addEventAddToCart()
      addEventCardBuy();
    } else{
      listFeaturedProducts.innerHTML = "<h1>¡No hay productos disponibles!</h1>";
    }
  }

  function addEventProducts() {
    const products = document.querySelectorAll('.card img');

    products.forEach((product) => {
      product.addEventListener('click', (e) => {
          const productId = product.parentElement.dataset.productId;
          location.href = `product_detail.html?id=${productId}`;
      })
    })
  }

  function addEventAddToCart(){
    const buttons = document.querySelectorAll('.card-buy');
    
    buttons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        const productId = e.target.parentElement.dataset.productId;
        const session =  await checkSession();
        if(session){
          addToShoppingCart(productId);
        } else {
          addProductLocalStorage(productId);
        }
        
      })
    })
  }

  async function addToShoppingCart(productId) {
    const endpointnUrl = `https://remothost.es/student023/shop/backend/endpoints/db_shopping_cart_insert.php?productId=${productId}`
    try {
      const response = fetch(endpointnUrl)
      const result = response
    } catch (error) {
      
    }
  }

  function addEventCardBuy() {
     document.querySelectorAll('.card-buy').forEach((btn) => {
      btn.addEventListener('click', () => {
          btn.innerHTML = '<i class="fa-solid fa-check"></i>';

          // Después de 1.5 segundos vuelve al estado original
          setTimeout(() => {
              btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
          }, 1500);
      })
    });
  }

  loadRelatedProducts();
  checkLocalStorage();
  
})