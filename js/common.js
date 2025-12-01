document.addEventListener('DOMContentLoaded', () => {
    const barsMenu = document.querySelector('.fa-bars');
    const closeBtn = document.querySelector('.fa-x');
    const nav = document.querySelector('header nav');
    const dropwDownMenuCaret = document.getElementById('dropdown-menu-caret');
    const dropDownMenu = document.getElementById('dropdown-content');
    const logo = document.querySelector('img[alt="logo"]');
    
    barsMenu.addEventListener('click', () => {  
        nav.style.display = 'flex'
    });

    closeBtn.addEventListener('click', () => {
        nav.style.display = 'none'
    });

    dropwDownMenuCaret.addEventListener('click', () => { 
        if(dropDownMenu.style.display === 'none' || dropDownMenu.style.display === 'none'){
            dropDownMenu.style.display = 'flex'
        } else {
            dropDownMenu.style.display = 'none '
        }
    });

    dropwDownMenuCaret.addEventListener('mouseover', () => { 
            dropDownMenu.style.display = 'flex'
          
    });

    dropwDownMenuCaret.addEventListener('mouseleave', () => { 
            dropDownMenu.style.display = 'none '
        
    });

    dropDownMenu.addEventListener('mouseover', () => { 
            dropDownMenu.style.display = 'flex'
          
    });

    dropDownMenu.addEventListener('mouseleave', () => { 
            dropDownMenu.style.display = 'none '
        
    });

    logo.addEventListener('click', () => {
        location.href = "/index.html"
    })
});