async function checkSession() {
    try {
        const response = await fetch("/student023/shop/backend/endpoints/check_session.php");
        const result = await response.text();
        if(result === "false") {
            location.href="../backend/login.php"
        }
    } catch (error) {
        
    }
}

checkSession();

document.addEventListener('DOMContentLoaded', () => {
    const btnNoAddress = document.getElementById("button-no-address");
    const urlEndpoint = "/student023/shop/backend/endpoints/db_select_info_customer.php"
    const containerAddAddress = document.getElementById('container-add-address');
    const closeAddAddress = document.getElementById('close-add-address');
    const inputProfileImage = document.getElementById('input-profile-image');
    const profileImage = document.getElementById('profile-image');
    const logOut = document.getElementById('log-out');

    async function getCustomerInfo() {
        try {
          const response = await fetch(urlEndpoint);
          const result = await response.json();  
          showUserInfo(result.userInfo[0]);
          result.addresses.forEach((address) => {
            showAddresses(address)
          });
          eventsAddresses();
          
        } catch (error) {
            
        }
    }

    function showUserInfo(userInfo) {
        let fullName = userInfo.firstName + " " + userInfo.lastName
        document.getElementById('full-name').textContent = fullName.toUpperCase() || "";
        document.getElementById('first-name').value = userInfo.firstName || "";
        document.getElementById('last-name').value = userInfo.lastName || ""; 
        document.getElementById('nif').value = userInfo.nif || "";
        document.getElementById('phone').value = userInfo.phone || "";
        document.getElementById('email').value = userInfo.email;
        profileImage.src = userInfo.imagePath;
    }

    function showAddresses(address){
        document.getElementById('start-addresses').insertAdjacentHTML("afterend", 
               `<div>
                        <div class="flex items-center" id="show-address-info">
                            <h1 class="text-text text-xl underline cursor-pointer">Address</h1><i class="fa-solid fa-caret-down icon"></i>
                        </div>
                        <div class="pt-5 hidden">
                            <form action="../backend/endpoints/db_address_update.php" method="POST" class="flex flex-col gap-10">
                                <input type="hidden" name="addressId" value="${address.addressId}">
                                <div class="flex gap-5">
                                    <input type="text" id="name" name="name" placeholder="Name*" class="pl-5 border-b-1 h-12 rounded outline-none bg-text font-latoregular w-[50%]" value="${address.name}" required>
                                    <input type="test" id="lastName" name="lastName" placeholder="Last name*" class="pl-5 border-b-1 h-12 rounded outline-none bg-text font-latoregular w-[50%]" value="${address.lastName}" required>
                                </div>
                                <div class="flex flex-col">
                                    <input type="text" id="address" name="address" placeholder="Address and number *" class="pl-5 border-b-1 h-12 rounded outline-none bg-text font-latoregular" value="${address.address}" required>
                                </div>

                                <div class="flex flex-col">
                                    <input type="text" id="additional-data" name="additionalData" placeholder="Additional data" class="pl-5 border-b-1 h-12 rounded outline-none bg-text font-latoregular" value="${address.additionalData}">
                                </div>

                                <div class="flex flex-col gap-5 lg:flex-row">
                                    <select name="province" class="bg-text rounded p-2">
                                        <option value="Andalucia" ${address.province === "Andalucia" ? "selected" : ""}>Andalucia</option>
                                        <option value="Aragon" ${address.province === "Aragon" ? "selected" : ""}>Aragon</option>
                                        <option value="Asturias" ${address.province === "Asturias" ? "selected" : ""}>Asturias</option>
                                        <option value="Baleares" ${address.province === "Baleares" ? "selected" : ""}>Baleares</option>
                                        <option value="Ceuta" ${address.province === "Ceuta" ? "selected" : ""}>Ceuta</option>
                                        <option value="Canarias" ${address.province === "Canarias" ? "selected" : ""}>Canarias</option>
                                        <option value="Cantabria" ${address.province === "Cantabria" ? "selected" : ""}>Cantabria</option>
                                        <option value="Castilla-La Mancha" ${address.province === "Castilla-La Mancha" ? "selected" : ""}>Castilla-La Mancha</option>
                                        <option value="Castilla y Leon" ${address.province === "Castilla y Leon" ? "selected" : ""}>Castilla y Leon</option>
                                        <option value="Cataluna" ${address.province === "Catalunya" ? "selected" : ""}>Cataluna</option>
                                        <option value="Comunidad Valenciana" ${address.province === "Comunidad Valenciana" ? "selected" : ""}>Comunidad Valenciana</option>
                                        <option value="Extremadura" ${address.province === "Extremadura" ? "selected" : ""}>Extremadura</option>
                                        <option value="Galicia" ${address.province === "Galicia" ? "selected" : ""}>Galicia</option>
                                        <option value="La Rioja" ${address.province === "La Rioja" ? "selected" : ""}>La Rioja</option>
                                        <option value="Madrid" ${address.province === "Madrid" ? "selected" : ""}>Madrid</option>
                                        <option value="Melilla" ${address.province === "Melilla" ? "selected" : ""}>Melilla</option>
                                        <option value="Murcia" ${address.province === "Murcia" ? "selected" : ""}>Murcia</option>
                                        <option value="Navarra" ${address.province === "Navarra" ? "selected" : ""}>Navarra</option>
                                        <option value="Pais Vasco" ${address.province === "Pais Vasco" ? "selected" : ""}>Pais Vasco</option>
                                    </select>
                                    <input type="text" id="city" name="city" placeholder="City*" class="pl-5 border-b-1 h-12 rounded outline-none bg-text font-latoregular w-50" value="${address.city}" required>
                                    <input type="number" id="zip-code" name="zipCode" placeholder="ZIP code*" class="pl-5 border-b-1 h-12 rounded outline-none bg-text font-latoregular w-30" minlength="5" maxlength="5" value="${address.zipCode}" required>
                                </div>
                                <div class="flex gap-2">
                                  <input type="checkbox" name="isDefault" id="is-default-address-${address.addressId}>" ${address.isDefault == 1 ? "checked" : ""}>
                                  <label for="is-default-address-${address.addressId}" class="font-latoregular text-text">Añadir esta dirección por defecto</label>
                                </div>
                                <div class="flex justify-center gap-5">
                                    <button name="deleteAddress" class="bg-red-600 text-text font-latobold px-10 py-2 cursor-pointer hover:opacity-60 rounded-sm" type="submit">Eliminar</button>
                                    <button name="updateAddress" class="bg-btn text-text font-latobold px-10 py-2 cursor-pointer hover:opacity-60 rounded-sm" type="submit">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
            `
        ) ;
    }

    btnNoAddress.addEventListener('click', () => {
        containerAddAddress.classList.add('flex!')
    })

    closeAddAddress.addEventListener('click', () => {
        containerAddAddress.classList.remove('flex!')
    })

    function eventsAddresses(){
        const showAddressInfo = document.querySelectorAll('#show-address-info') || null
        if(showAddressInfo != null){
            showAddressInfo.forEach((element) => {
                element.addEventListener('click', () => {
                    element.nextElementSibling.classList.toggle('block!');
                })
            })
        }
    }
    

    inputProfileImage.addEventListener('change', (e) => {
        const file = e.target.files[0];

        if(file){
             let reader = new FileReader();

            reader.onload = function (e) {
                profileImage.src = e.target.result
            };

            reader.readAsDataURL(file);

            document.getElementById('btn-save-profile-image').classList.add('block!')
        }

    });

    logOut.addEventListener('click', () => {
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", "/student023/shop/backend/endpoints/logout.php?logout=true", true);

      xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200 ){
          window.location.href = "../index.html";
        }
      }
      xhttp.send();
    });

    document.getElementById('log-out-mobile').addEventListener('click', () => {
      const xhttp = new XMLHttpRequest();
      xhttp.open("GET", "/student023/shop/backend/endpoints/logout.php?logout=true", true);

      xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200 ){
          window.location.href = "../index.html";
        }
      }
      xhttp.send();
    });
    getCustomerInfo();
});