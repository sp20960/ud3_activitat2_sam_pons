
document.addEventListener('DOMContentLoaded', () => {
    const btnNoAddress = document.getElementById("button-no-address");
    const urlEndpoint = "/student023/shop/backend/endpoints/db_select_info_customer.php"
    const containerAddAddress = document.getElementById('container-add-address');
    const closeAddAddress = document.getElementById('close-add-address');
    const inputProfileImage = document.getElementById('input-profile-image');
    const profileImage = document.getElementById('profile-image');

    btnNoAddress.addEventListener('click', () => {
        containerAddAddress.classList.add('flex!')
    })

    closeAddAddress.addEventListener('click', () => {
        containerAddAddress.classList.remove('flex!')
    })

        const showAddressInfo = document.querySelectorAll('#show-address-info') || null
        if(showAddressInfo != null){
            showAddressInfo.forEach((element) => {
                element.addEventListener('click', () => {
                    element.nextElementSibling.classList.toggle('block!');
                })
            })
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
});