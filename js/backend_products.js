document.addEventListener("DOMContentLoaded", () => {
  const addProductBtn = document.getElementById("add-product-btn");
  const searchInput = document.getElementById("search-input");
  const filteredPorducts = document.getElementById("filtered-products");
  const allProducts = document.getElementById("all-products");

  async function filterRequest(userFilter) {
    if (userFilter.length === 0) {
      showFilteredProducts();
      return;
    }

    try {
      const response = await fetch("/student023/shop/backend/endpoints/db_product_search.php?productName=" + userFilter);
      const products = await response.json();
      showFilteredProducts(products);
    } catch (error) {
      
    }
  }

  function showFilteredProducts(products = "") {
    if (products.length === 0) {
      allProducts.classList.remove("hidden");
      filteredPorducts.classList.add("hidden");
    } else {
      allProducts.classList.add("hidden");
      filteredPorducts.classList.remove("hidden");
      let formatProducts = "";
      products.forEach((product) => {
        formatProducts +=
          '<div class="flex border-2 justify-between items-center border-accent rounded-md bg-primary p-4">' +
          '<div class="flex items-center gap-2">' +
          '<p class="text-text">' +
          product["productId"] +
          "</p>" +
          '<img class="w-[80px]" src="' +
          product["imagePath"] +
          '" ' +
          'alt="">' +
          '<div class="flex flex-col">' +
          '<h3 class="text-text">' +
          product["productName"] +
          "</h3>" +
          '<p class="text-text">' +
          product["pricePerUnit"] +
          "€" +
          "</p>" +
          "</div>" +
          "</div>" +
          '<div class="flex gap-3">' +
          '<form action="/student023/shop/backend/admin/products.php" method="POST">' +
          '<input type="hidden" name="productId" value="' +
          product["productId"] +
          '">' +
          '<button type="submit" name="submit"><i class="fa fa-cart-shopping text-text cursor-pointer"></i></button>' +
          "</form>" +
          '<form action="/student023/shop/backend/forms/products/form_product_update.php" method="POST">' +
          '<input type="hidden" name="productId" value="' +
          product["productId"] +
          '">' +
          '<button type="submit" name="submit"><i class="fa fa-edit text-text cursor-pointer"></i></button>' +
          "</form>" +
          '<form action="/student023/shop/backend/forms/products/form_product_delete.php" method="POST">' +
          '<input type="hidden" name="productId" value="' +
          product["productId"] +
          '">' +
          '<button type="submit" name="submit"><i class="fa fa-trash text-text cursor-pointer"></i></button>' +
          "</form>" +
          "</div>" +
          "</div>";
      });
      filteredPorducts.innerHTML = formatProducts;
    }
  }

  addProductBtn.addEventListener("click", () => {
    window.location.href =
      "/student023/shop/backend/forms/products/form_product_insert.php";
  });

  searchInput.addEventListener("keyup", (e) => {
    filterRequest(searchInput.value);
  });
});
