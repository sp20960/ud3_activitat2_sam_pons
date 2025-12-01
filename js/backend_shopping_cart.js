document.addEventListener('DOMContentLoaded', () => {
    const urlShoppingCartUpdateEndpoint = "/student023/shop/backend/endpoints/db_shopping_cart_update.php"
    const minusIcons = document.querySelectorAll('#minus-icon');
    const plusIcon = document.querySelectorAll('#plus-icon');

    async function updateShoppingCart(quantity, productId) {

        // SAVE PARAMS WE WILL SEND VIA POST
        let params = 
            "quantity=" + encodeURIComponent(quantity)
            + "&productId=" + encodeURIComponent(productId); //IMPORTANT!!!! PUT THE & CHARACTER

        // CREATE NEW HTTPREQUEST OBJECT
        let xhttp = new XMLHttpRequest();
        // WE OPEN DE STREAM SPECIFING THE METHOD, URL and ASYNC
        xhttp.open("POST", urlShoppingCartUpdateEndpoint, true);

        // PUT IN THE HTTP HEADER THAT THE CONTENT WE WILL SEND IS FORM URLENCODED DATA
        xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        // IF ALL WORKS THERE IS A RESPONSE
        xhttp.onreadystatechange = function () {
            if(xhttp.readyState === 4 && xhttp.status === 200) {
                updateTotal(JSON.parse(xhttp.responseText));
            }
        }

        //SEND PARAMS
        xhttp.send(params);

        // FETCH    
        // try {
        //     const response = await fetch(urlShoppingCartUpdateEndpoint + `?quantity=${quantity}&productId=${productId}`);
        //     const subtotals = await response.json();
        //     updateTotal(subtotals);
        // } catch (error) {
        //     console.log(error);
        // }
        
    }

    function updateTotal(subtotals){
        let totalPrice = 0;
        subtotals.forEach((product) => {
            totalPrice += +product.subtotal;
        });
        document.getElementById('total-price').innerText = +totalPrice;
    }

    minusIcons.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            let quantity = e.target.nextSibling;
            if(+quantity.innerText === 1) {
                return;
            }   
        
            quantity.innerText = +quantity.innerText - 1
            let productId = e.target.parentElement.attributes['data-product'].value;
            
            updateShoppingCart(quantity.innerText, productId);
        });
    });

    plusIcon.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            let quantity = e.target.previousSibling;
            if(+quantity.innerText === 12) {
                return;
            }   
        
            quantity.innerText = +quantity.innerText + 1
            let productId = e.target.parentElement.attributes['data-product'].value;
            
            updateShoppingCart(quantity.innerText, productId);
        });
    });

    // minusIcon.addEventListener('click', () => {
    //     if (+minusIcon.innerText === 1) {
    //         return;
    //     }         
    // })
});