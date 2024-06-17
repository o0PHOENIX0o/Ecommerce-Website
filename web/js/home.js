

console.log("home page");

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
    setHome();
});

async function setHome() {
    document.getElementById('loading-message').style.display = 'flex';

    try {
        
        const result = HomeData;

        var image = result[0]['mainBanner'];
        document.getElementById('mainBanner').src = image;
        document.getElementById(`mainBanner`).setAttribute('onclick', `window.location.href = '` + `shop.html?search=${result[0]['btext']}` + `'`);


        setCatalogue(result[0]);
        setLatest();
        setSale();
        setFeature(result[0]['featured']);

    } catch (error) {
        console.error('An error occurred:', error);

    }
}


async function setCatalogue(data) {
    for (let i = 1; i < 10; i++) {
        var image = data['features' + i.toString()];
        document.getElementById('f' + i.toString()).src = image;
        document.getElementById(`f` + i.toString()).setAttribute('onclick', `window.location.href = '` + `shop.html?type=${data['text' + i.toString()]}` + `'`);
    }

}

async function setFeature() {
    try {
        let result1 = pro_featured;

        setFeatureImages(result1);
    } catch {
        console.error('Error');
    }
}

function setFeatureImages(result1) {
    for (let i = 0; i < 4; i++) {
        let title, star, price, description;
        
        var image = result1[i]['product_img'];
        title = result1[i]['name'];
        price = result1[i]['price'];
        star = result1[i]['rating'];
        description = result1[i]['SubDescription'];

        document.getElementById(`image-container-${i + 1}`).src = image;
        document.getElementById(`description-${i + 1}`).innerHTML = title;
        document.getElementById(`fd-${i + 1}`).innerHTML = description;
        document.getElementById(`price-${i + 1}`).innerHTML = "₹" + price;
        document.getElementById(`description-${i + 1}`).setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${result1[i]['product_id']}` + `'`);
        document.getElementById(`image-container-${i + 1}`).setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${result1[i]['product_id']}` + `'`);
        document.getElementById(`cartImg-${i + 1}`).setAttribute('onclick', `cartFunction1(${result1[i]['product_id']}, 'featured', ${i})`);
        document.getElementById(`heart-${i + 1}`).setAttribute('onclick', `wishFunction1(${result1[i]['product_id']}, 'featured', ${i})`);

        if (result1[i]["sale"] != 0) {
            document.getElementById(`oldPriceFeatured-${i + 1}`).textContent = "₹" + result1[i]['price'];
            document.getElementById(`sale-${i + 1}`).style.display = "block";
            document.getElementById(`price-${i + 1}`).innerHTML = "₹" + result1[i]['sale'];
            document.getElementById(`price-${i + 1}`).style.color = "green";
        }

        for (let j = 0; j < star; j++) {
            let s = document.createElement('img');
            s.src = 'EH-images/icons/star.png';
            document.getElementById(`star-${i + 1}`).appendChild(s);
        }

    }

    document.getElementById('loading-message').style.display = 'none';
}


async function setLatest() {
    // console.log('heree');
    try {
        
        const result = latest_Pro;
        setLatestImages(result);

    } catch (error) {
        console.error('Error fetching data:', error);
    }

}


function setLatestImages(result) {
    for (let i = 0; i < 4; i++) {


        let title, star, price, description;
        
        var image = result[i]['product_img'];
        title = result[i]['name'];
        description = result[i]['SubDescription'];
        price = result[i]['price'];
        star = result[i]['rating'];


        document.getElementById(`fimg-${i + 1}`).src = image;
        document.getElementById(`fdesc-${i + 1}`).innerHTML = title;
        document.getElementById(`d-${i + 1}`).innerHTML = description;
        document.getElementById(`fprice-${i + 1}`).innerHTML = "₹" + price;
        document.getElementById(`fdesc-${i + 1}`).setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${result[i]['product_id']}` + `'`);
        document.getElementById(`fimg-${i + 1}`).setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${result[i]['product_id']}` + `'`);
        document.getElementById(`fcart-${i + 1}`).setAttribute('onclick', `cartFunction1(${result[i]['product_id']}, 'new', ${i})`);
        document.getElementById(`fheart-${i + 1}`).setAttribute('onclick', `wishFunction1(${result[i]['product_id']}, 'new', ${i})`);

        if (result[i]["sale"] != 0) {
            document.getElementById(`oldPrice-${i + 1}`).textContent = "₹" + result[i]['price'];
            document.getElementById(`fsale-${i + 1}`).style.display = "block";
            document.getElementById(`fprice-${i + 1}`).innerHTML = "₹" + result[i]['sale'];
            document.getElementById(`fprice-${i + 1}`).style.color = "green";
        }

        

        for (let j = 0; j < star; j++) {
            let s = document.createElement('img');
            s.src = 'EH-images/icons/star.png';
            document.getElementById(`fstar-${i + 1}`).appendChild(s);
        }
    }
}

async function setSale() {
    // console.log('Sale-----------------');
    try {
        
        const result = SaleData;
        // console.log("Sale---> ", result);

        if (result == '') {
            document.getElementsByClassName('saleSection')[0].style.display = 'none';
            return;
        } else {
            document.getElementsByClassName('saleSection')[0].style.display = 'block';

        }

        for (let i = 0; i < result.length; i++) {
            createProduct(result[i]['product_id']);
        }
        UpdateProducts(result);


    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function limitCharacters(element, limit) {
    var text = element.textContent || element.innerText;
    if (text.length > limit) {
        element.textContent = text.slice(0, limit) + ' ...';
    }
}



function createProduct(id) {
    let productContainer = document.getElementById('pro-container');

    let productDiv = document.createElement('div');
    productDiv.classList.add('pro');

    let heart = document.createElement('a');
    heart.classList.add('fa-regular');
    heart.classList.add('fa-heart');
    heart.style.color = 'red';
    heart.id = `Saleheart-${id}`;
    heart.value = 'no';
    // heart.setAttribute('onclick', `wishFunction(${id})`);
    //document.getElementById(`cartImg-${i+1}`).setAttribute('onclick', `cartFunction1(${result1[i]['product_id']}, 'featured', ${i})`);
    heart.setAttribute('onclick', `wishFunction1(${id}, 'sale', ${id})`);
    heart.style.textDecoration = 'none';
    heart.style.position = 'absolute';
    heart.style.marginLeft = "-27px";
    heart.style.marginTop = "8px";

    let keywords = document.createElement('h6');
    keywords.style.display = 'none';
    keywords.id = `Skeyword-${id}`;

    var spanElement = document.createElement("span");
    spanElement.setAttribute("class", "onsale");
    spanElement.textContent = "Sale!";
    spanElement.id = `Ssale-${id}`;

    productDiv.appendChild(spanElement);

    let img = document.createElement('img');
    img.id = `Simage-container-${id}`;
    img.classList.add('ProImg');
    img.setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${id}` + `'`);
    img.alt = `${id}`;
    img.loading = 'lazy';

    let imgDiv = document.createElement('div');
    imgDiv.style.position = "relative;";
    imgDiv.appendChild(img);
    imgDiv.appendChild(heart);

    productDiv.appendChild(imgDiv);

    productDiv.appendChild(document.createElement('br')); // Add a line break

    let divText = document.createElement('div');
    let title = document.createElement('span');
    title.id = `Stitle-${id}`;
    title.setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${id}` + `'`);
    divText.appendChild(title);

    let description = document.createElement('h5');
    description.id = `Sdescription-${id}`;
    divText.appendChild(description);

    let starDiv = document.createElement('div');
    starDiv.id = `Sstar-${id}`;
    starDiv.classList.add('star');

    divText.appendChild(starDiv);

    // let price = document.createElement('h4');
    // price.id = `price-${id}`;

    var divElement = document.createElement("div");
    divElement.setAttribute("class", "Price");

    var h4Element = document.createElement("h4");
    h4Element.setAttribute("id", `Sprice-${id}`);

    var delElement = document.createElement("del");
    delElement.setAttribute("class", "oldPrice");
    delElement.id = `Soldprice-${id}`;

    divElement.appendChild(delElement);
    divElement.appendChild(h4Element);

    divText.appendChild(divElement);

    let cartDiv = document.createElement('div');
    cartDiv.classList.add('cart');
    let cartLink = document.createElement('a');
    let cartImg = document.createElement('img');
    cartImg.id = `SalecartImg-${id}`;
    cartImg.src = 'EH-images/icons/cart.png';
    cartImg.alt = 'Add to cart';
    // cartImg.setAttribute('onclick', `cartFunction1(${id})`);
    cartImg.setAttribute('onclick', `cartFunction1(${id}, 'sale', ${id})`);
    cartImg.loading = 'lazy';
    cartLink.appendChild(cartImg);
    cartDiv.appendChild(cartLink);
    divText.appendChild(cartDiv);

    productDiv.appendChild(divText);
    productDiv.appendChild(keywords);
    // productDiv.style.display = 'none';
    productContainer.appendChild(productDiv);
}

function UpdateProducts(data) {
    // const proDivs = document.querySelectorAll('.pro');

    // console.log("update products");

    let Image, title, description, price, Id, keywords;

    for (let i = 0; i < data.length; i++) {
        Id = data[i]['product_id'];
        Image = data[i]['product_img'];
        title = data[i]['name'];
        description = data[i]['SubDescription'];
        price = data[i]['price'];
        keywords = data[i]['keywords'];
        star = data[i]['rating'];

        // console.log('i = ', i, "id = " , Id);

        var starDiv = document.getElementById(`Sstar-${Id}`);

        var image =  Image;
        document.getElementById(`Simage-container-${Id}`).src = image;
        document.getElementById(`Stitle-${Id}`).textContent = title;
        document.getElementById(`Sdescription-${Id}`).textContent = description;
        limitCharacters(document.getElementById(`Sdescription-${Id}`), 50);
        document.getElementById(`Sprice-${Id}`).textContent = "₹" + price;
        document.getElementById(`Skeyword-${Id}`).textContent = '[' + keywords + ']';

        if (data[i]['sale'] != 0) {
            document.getElementById(`Soldprice-${Id}`).textContent = "₹" + price;
            document.getElementById(`Sprice-${Id}`).textContent = "₹" + data[i]['sale'];
            document.getElementById(`Sprice-${Id}`).style.color = 'green';
            document.getElementById(`Ssale-${Id}`).style.display = 'block';
        }

        for (let j = 1; j <= star; j++) {
            let starImg = document.createElement('img');
            starImg.src = 'EH-images/icons/star.png';
            starImg.alt = '';
            starImg.loading = 'eager';
            starDiv.appendChild(starImg);
        }

    }
}