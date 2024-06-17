
var MainImg = document.getElementById("MainImage");
var smallimg = document.getElementsByClassName("small-img");

var cart_value = [];
var wish_value = [];

var arr1 = [];

var latest_value=[];
sale_value=[];

var stock;

smallimg[0].onclick = function () {
    MainImg.src = smallimg[0].src;
}
smallimg[1].onclick = function () {
    MainImg.src = smallimg[1].src;
}
smallimg[2].onclick = function () {
    MainImg.src = smallimg[2].src;
}
smallimg[3].onclick = function () {
    MainImg.src = smallimg[3].src;
}

var id;

document.addEventListener('DOMContentLoaded', async function () {
  document.getElementById('loading-message').style.display = 'grid';
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('key');
    
    setLatest();
    setSale();
});



function changeImageSource(newSource, i) {
    var image = document.getElementById(i);
    image.classList.add('scale-up-hor-center');
    image.src = newSource;

    setTimeout(function () {
        image.classList.remove('scale-up-hor-center');
    }, 1000);
}

async function setLatest(){
  // console.log('heree');
    try{
      const result = latest_Pro;
      // console.log(result);

      for(let i=0; i<4; i++){
        latest_value[i] = result[i]['product_id'];
        let title, star, price, description;
        
        var image = result[i]['product_img'];
        title = result[i]['name'];
        description = result[i]['SubDescription'];
        price = result[i]['price'];
        star = result[i]['rating'];

        
        document.getElementById(`fimg-${i+1}`).src = image;
        document.getElementById(`fdesc-${i+1}`).innerHTML = title;
        document.getElementById(`d-${i+1}`).innerHTML = description;
        document.getElementById(`fprice-${i+1}`).innerHTML = "₹"+price;
        document.getElementById(`fdesc-${i+1}`).setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${result[i]['product_id']}` + `'`);
        document.getElementById(`fimg-${i+1}`).setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${result[i]['product_id']}` + `'`);
        document.getElementById(`fcart-${i+1}`).setAttribute('onclick', `cartFunction1(${result[i]['product_id']}, 'new', ${i})`);
        document.getElementById(`fheart-${i+1}`).setAttribute('onclick', `wishFunction1(${result[i]['product_id']}, 'new', ${i})`);

        if(result[i]["sale"]!=0){
          document.getElementById(`oldPrice-${i+1}`).textContent = "₹"+result[i]['price'];
          document.getElementById(`fsale-${i+1}`).style.display="block";
          document.getElementById(`fprice-${i+1}`).innerHTML = "₹"+result[i]['sale'];
          document.getElementById(`fprice-${i+1}`).style.color = "green";
        }

        if(cart_value.includes(result[i]['product_id'].toString())){
          // console.log("existss");
          document.getElementById(`fcart-${i+1}`).src = "EH-images/icons/tick-cart.png";
          document.getElementById(`fcart-${i+1}`).alt = "Remove from cart";
        }

        if(wish_value.includes(result[i]['product_id'].toString())){
          document.getElementById(`fheart-${i+1}`).classList.remove('fa-regular');
          document.getElementById(`fheart-${i+1}`).classList.add('fa-solid');
          document.getElementById(`fheart-${i+1}`).value = "yes";
        }

        for(let j=0; j<star; j++){
          let s = document.createElement('img');
          s.src = 'EH-images/icons/star.png';
          document.getElementById(`fstar-${i+1}`).appendChild(s);
        }
      }

    } catch (error) {
          console.error('Error fetching data:', error);
    }
  
}



async function setSale() {
  // console.log('Sale-----------------');
  try {
    
    const result = SaleData;
    // console.log("Sale---> ", result);

    for (let i = 0; i < result.length; i++) {
      createProduct(result[i]['product_id']);
      sale_value[i] = result[i]['product_id'];
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
  heart.setAttribute('onclick', `wishFunction1(${id}, 'sale', ${id})`);
  heart.style.textDecoration = 'none';
  heart.style.position = 'absolute';
  heart.style.marginLeft = "-27px";
  heart.style.marginTop = "8px";

  let keywords = document.createElement('h6');
  keywords.style.display = 'none';
  keywords.id = `keyword-${id}`;

  var spanElement = document.createElement("span");
  spanElement.setAttribute("class", "onsale");
  spanElement.textContent = "Sale!";
  spanElement.id = `sale-${id}`;

  productDiv.appendChild(spanElement);

  let img = document.createElement('img');
  img.id = `image-container-${id}`;
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
  title.id = `title-${id}`;
  title.setAttribute('onclick', `window.location.href = '` + `sproduct.html?key=${id}` + `'`);
  divText.appendChild(title);

  let description = document.createElement('h5');
  description.id = `description-${id}`;
  divText.appendChild(description);

  let starDiv = document.createElement('div');
  starDiv.id = `star-${id}`;
  starDiv.classList.add('star');

  divText.appendChild(starDiv);

  // let price = document.createElement('h4');
  // price.id = `price-${id}`;

  var divElement = document.createElement("div");
  divElement.setAttribute("class", "Price");

  var h4Element = document.createElement("h4");
  h4Element.setAttribute("id", `price-${id}`);

  var delElement = document.createElement("del");
  delElement.setAttribute("class", "oldPrice");
  delElement.id = `oldprice-${id}`;

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

  let image, title, description, price, Id, keywords;

  for (let i = 0; i < data.length; i++) {
    Id = data[i]['product_id'];
    image = data[i]['product_img'];
    title = data[i]['name'];
    description = data[i]['SubDescription'];
    price = data[i]['price'];
    keywords = data[i]['keywords'];
    star = data[i]['rating'];

    // console.log('i = ', i, "id = " , Id);

    var starDiv = document.getElementById(`star-${Id}`);

    document.getElementById(`image-container-${Id}`).src = image;
    document.getElementById(`title-${Id}`).textContent = title;
    document.getElementById(`description-${Id}`).textContent = description;
    limitCharacters(document.getElementById(`description-${Id}`), 50);
    document.getElementById(`price-${Id}`).textContent = "₹" + price;
    document.getElementById(`keyword-${Id}`).textContent = '[' + keywords + ']';

    if (data[i]['sale'] != 0) {
      document.getElementById(`oldprice-${Id}`).textContent = "₹" + price;
      document.getElementById(`price-${Id}`).textContent = "₹" + data[i]['sale'];
      document.getElementById(`price-${Id}`).style.color = 'green';
      document.getElementById(`sale-${Id}`).style.display = 'block';
    }

    if(cart_value.includes(Id.toString())){
      // console.log("existss");
      document.getElementById(`SalecartImg-${Id}`).src = "EH-images/icons/tick-cart.png";
      document.getElementById(`SalecartImg-${Id}`).alt = "Remove from cart";
    }

    if(wish_value.includes(Id.toString())){
      document.getElementById(`Saleheart-${Id}`).classList.remove('fa-regular');
      document.getElementById(`Saleheart-${Id}`).classList.add('fa-solid');
      document.getElementById(`Saleheart-${Id}`).value = "yes";
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

