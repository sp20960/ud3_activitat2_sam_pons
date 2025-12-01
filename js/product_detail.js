document.addEventListener('DOMContentLoaded', () => {
  const urlProductsEndpoint = "https://remotehost.es/student023/shop/backend/endpoints/db_products_enabled.php"
  const actualImage = document.getElementById('actual-image');
  const allImages = document.querySelectorAll('#all-images img');
  const listRelatedProducts = document.getElementById('list-related-products');


  async function loadRelatedProducts() {
    try {
      const response = await fetch(urlProductsEndpoint);
      const products = await response.json();
      console.log(products);
      showRelatedProducts(products);
    } catch (error) {
      listProducts.innerHTML = "<h1>¡Ha habido un problema cargando los productos!</h1>";
    }
  }

  function showRelatedProducts(products) {
    if (products != null && products.length != 0) {
      listRelatedProducts.innerHTML = products
        .map((product) =>
          `
           <article class="card" data-product-id="${product.productId}">
                <img class="w-[130px]" src="https://remotehost.es${product.imagePath}" alt="">
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
    } else {
      listRelatedProducts.innerHTML = "<h1>¡No hay productos disponibles!</h1>";
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

  function addEventAddToCart() {
    const buttons = document.querySelectorAll('.card-buy');

    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        const productId = e.target.parentElement.dataset.productId;
        addToShoppingCart(productId);
      })
    })
  }

  async function addToShoppingCart(productId) {
    const endpointnUrl = `https://remotehost.es/student023/shop/backend/endpoints/db_shopping_cart_insert.php?productId=${productId}`
    try {
      const response = fetch(endpointnUrl)
      const result = response.
        console.log(result);
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


  allImages.forEach((image) => {
    image.addEventListener('click', () => {
      allImages.forEach((image) => {
        image.classList.remove('active-image')
      })
      let srcImage = image.src
      srcImage = srcImage.replace(".png", ".jpg")
      actualImage.src = srcImage
      image.classList.add('active-image')
    });
  });
  console.log("object");
  loadRelatedProducts();
})