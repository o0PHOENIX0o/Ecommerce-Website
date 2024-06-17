const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

const url = 'http://127.0.0.1:5000';


if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

function clicked() {
    window.location.href = 'shop.html';
}

const profile_menu = document.querySelector('.menu');


function unhide_menu() {
    profile_menu.style.display = 'block';
}

function toggleProfile() {
    if (!localStorage.getItem('EH-Login')) {
        window.location.href = 'signup.html';
        return;
    }
    unhide_menu();
    // console.log("______toggle______");
    profile_menu.classList.toggle('active');

}

document.addEventListener("click", function (event) {
    // console.log(event.target);
    if (profile_menu.classList.contains("active") && !event.target.matches('.Proicon') && !profile_menu.contains(event.target)) {
        // console.log("Hide profile");
        profile_menu.classList.remove("active");
    }
});

function toggleSearch() {
    document.getElementById('search_bar').classList.toggle('show');
}


async function checkAPI() {
    try {
        
        let status = "OK";
        
        return status;
    }
    catch (error) {
            
    }
}
window.onload = async function () {
    
    var status = await checkAPI();
    if (status != 'OK') {
        return
    } 
    document.getElementById('loading-message').style.display = 'none';

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    if (localStorage.getItem('EH-Login') != null) {
        document.getElementById('signup').style.display = 'none';
        document.getElementById('ProfileUsername').innerHTML = localStorage.getItem('EH-User');
        
        try {
            document.getElementById('email').setAttribute('placeholder', localStorage.getItem('EH-Email'));
        } catch (error) {

        }
    } else {
        document.getElementById('signup').style.display = 'block';
        document.getElementById('NormalP').style.display = 'none';
    }
};


async function DisaplayError() {
    document.getElementById('loading-message').style.display = 'flex';
    document.getElementById('AlertMessage').style.display = 'block';
    document.getElementById('AlertMessage').style.backdropFilter = 'blur(15px)';
    document.getElementById('AlertContent').innerHTML = 'Server is down! <br> Please try again later';
    document.getElementById('AlertContent').style.textAlign = 'center';
    document.getElementById('AlertBtn').removeAttribute('onclick');
}

async function set_discount() {
    // console.log("discount!!!");
    try {

        const result = [
            {
                "title": "999"
            }
        ];
        if (result != null) {
            document.getElementById('discount-price').innerHTML = result[0]['title'];
        }

    } catch (error) {
        console.error('An error occurred:\n', error);
    }
}

set_discount();