document.addEventListener("DOMContentLoaded", () => {
  const urlProductsEndpoint = "/student023/shop/backend/endpoints/db_products_enabled.php"
  const nextArrow = document.querySelector(".next");
  const prevArrow = document.querySelector(".prev");
  const images = document.querySelectorAll(".carousel img");
  const listProducts = document.getElementById('list-products');
  let shoppingCartProducts = JSON.parse(localStorage.getItem('products')) || {products:[]}


  async function loadProducts() {
    try {
      const response = await fetch('https://remotehost.es/' + urlProductsEndpoint);
      const products = await response.json();
      showProducts(products);
    } catch (error) {
      listProducts.innerHTML = "<h1>¡Ha habido un problema cargando los productos!</h1>";
    }
  }

  async function checkSession() {
    try {
        const response = await fetch("https://remotehost.es/student023/shop/backend/endpoints/check_session.php");
        const result = await response.text();
        if(result === "false") {
          return false;
        }
        return true;
    } catch (error) {
        
    }
  }

  function showProducts(products) {
    if(products != null && products.length != 0){
      listProducts.innerHTML = products
      .map((product) => 
        `
          <article class="card" data-product-id="${product.productId}">
                <img src="https://remotehost.es/${product.imagePath}" alt="">
                <div class="card-stars">
                    <i class="fa-regular fa-star fa-sm"></i>
                    <i class="fa-regular fa-star fa-sm"></i>
                    <i class="fa-regular fa-star fa-sm"></i>
                    <i class="fa-regular fa-star fa-sm"></i>
                    <i class="fa-regular fa-star fa-sm"></i>
                    <p>(0)</p>
                </div>
                <div class="card-product-info">
                    <h3>${product.productName}</h3>
                    <p>${product.pricePerUnit} €</p>
                </div>
                <div class="card-buy">
                    <i class="fa-solid fa-cart-shopping"></i>
                </div>
            </article>
        `
      ).join("");
      addEventProducts();
      addEventAddToCart()
      addEventCardBuy();
    } else{
      listProducts.innerHTML = "<h1>¡No hay productos disponibles!</h1>";
    }
  }

  function addEventProducts() {
    const products = document.querySelectorAll('.card img');

    products.forEach((product) => {
      product.addEventListener('click', (e) => {
          const productId = product.parentElement.dataset.productId;
          location.href = `views/product_detail.html?id=${productId}`;
      })
    })
  }

  function addEventAddToCart(){
    const buttons = document.querySelectorAll('.card-buy');
    
    buttons.forEach((button) => {
      button.addEventListener('click', async (e) => {
        const productId = button.parentElement.dataset.productId;
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
    const endpointnUrl = `https://remotehost.es/student023/shop/backend/endpoints/db_shopping_cart_insert.php?productId=${productId}`
    try {
      const response = fetch(endpointnUrl);
    } catch (error) {
      
    }
  }

  function addProductLocalStorage(productId) {
      let productExists = false;

      shoppingCartProducts.products.forEach((product) => {
        if(product.productId === productId){
          let quantity = +product.qty;
          product.qty = quantity + 1;
          productExists = true;
        }
      });

      if(!productExists){
        shoppingCartProducts.products.push({productId, qty: 1});
      }
      localStorage.setItem("products", JSON.stringify(shoppingCartProducts));
  }

  function addEventCardBuy() {
     document.querySelectorAll('.card-buy').forEach((btn) => {
      btn.addEventListener('click', () => {
          btn.innerHTML = '<i class="fa-solid fa-check"></i>';

          setTimeout(() => {
              btn.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
          }, 1500);
      })
    });
  }
 
  // CAROUSEL FUNCTIONALITY
  function nextImage() {
    let actualIndex;
    images.forEach((image, index) => {
      if (image.classList.contains("active")) {
        actualIndex = +index;
      }
    });

    let nextIndex;
    if (actualIndex !== images.length - 1) {
      nextIndex = actualIndex + 1;
    } else {
      nextIndex = 0;
    }

    images[actualIndex].classList.remove("active");
    images[nextIndex].classList.add("active");
  }

  function prevImage() {
    let actualIndex;
    images.forEach((image, index) => {
      if (image.classList.contains("active")) {
        actualIndex = +index;
      }
    });

    let prevIndex;
    if (actualIndex !== 0) {
      prevIndex = actualIndex - 1;
    } else {
      prevIndex = images.length - 1;
    }

    images[actualIndex].classList.remove("active");
    images[prevIndex].classList.add("active");
  }

  nextArrow.addEventListener("click", () => {
    nextImage();
  });

  prevArrow.addEventListener("click", () => {
    prevImage();
  });
  
  loadProducts();
});
