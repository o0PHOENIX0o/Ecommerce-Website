let count, wish = null;
let IdArray = [];

getWishlist();


async function get_wish() {
  let email = "test@gmail.com";
  
  try {
  

    const result = ProductsData;

    if (result['wish']) {
      arr = result['wish'].split(",");
      wish = result['wish'];
      return arr;
    } else {
      createWarn();
      return 0;
    }

  } catch (error) {
    console.error('An error occurred:', error);
    createWarn();
  }
}

function createWarn(){
  let productContainer = document.getElementById('product-container');
  let noWishDiv = document.createElement('div');
  noWishDiv.style.width = '90%';
  noWishDiv.style.height = '50px';

  let noWishPara = document.createElement('p');
  noWishPara.style.color = 'red';
  noWishPara.style.marginTop = '-25px'
  noWishPara.style.fontSize = '25px';
  noWishPara.innerHTML = "Your Wishlist is Empty!";

  noWishDiv.appendChild(noWishPara);
  productContainer.appendChild(noWishDiv);
}

function createProduct1(id) {
  let productContainer = document.getElementById('product-container');

  let productDiv = document.createElement('div');
  productDiv.classList.add('pro');
  productDiv.id = `pro-div-${id}`;

  let cross = document.createElement('a');
  cross.classList.add('fas');
  cross.classList.add('fa-times-circle');
  cross.id = `${id}`;
  cross.setAttribute('value', `${id}`);
  cross.style.textDecoration = 'none';
  cross.style.position = 'absolute';
  cross.style.marginLeft = "-17px";
  cross.style.marginTop = "-2px";

  var spanElement = document.createElement("span");
  spanElement.setAttribute("class", "onsale");
  spanElement.textContent = "Sale!";
  spanElement.id = `sale-${id}`;
  productDiv.appendChild(spanElement);

  let img = document.createElement('img');
  img.id = `image-container-${id}`;
  img.classList.add('ProImg');
  //img.src = "img/products/n7.jpg";
  img.setAttribute('onclick', `window.location.href = '` +`sproduct.html?key=${id}`+`'`);
  img.alt = `${id}`;

  let imgDiv = document.createElement('div');
  imgDiv.style.position = "relative;";
  imgDiv.appendChild(img);
  imgDiv.appendChild(cross);
  productDiv.appendChild(imgDiv);

  productDiv.appendChild(document.createElement('br')); // Add a line break

  let title = document.createElement('span');
  title.id = `title-${id}`;
  title.setAttribute('onclick', `window.location.href = '` +`sproduct.html?key=${id}`+`'`);
  title.innerHTML = "Adidas";
  productDiv.appendChild(title);

  let description = document.createElement('h5');
  description.id = `description-${id}`;
  description.innerHTML = "Cartoon Astronout T-Shirts";
  productDiv.appendChild(description);

  let starDiv = document.createElement('div');
  starDiv.classList.add('star');
  starDiv.id = `star-${id}`;
  productDiv.appendChild(starDiv);

  let breakk = document.createElement('p');
  breakk.innerHTML = "";
  productDiv.appendChild(breakk);

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

  productDiv.appendChild(divElement);

  let cartDiv = document.createElement('div');
  cartDiv.id = `cartDiv-${id}`
  cartDiv.classList.add('cart');
  let cartLink = document.createElement('a');
  let cartImg = document.createElement('img');
  cartImg.id = `cartImg-${id}`;
  cartImg.src = 'EH-images/icons/cart.png';
  cartImg.alt = 'Add to cart';
  cartLink.appendChild(cartImg);
  cartDiv.appendChild(cartLink);
  productDiv.appendChild(cartDiv);

  productContainer.appendChild(productDiv);
}

function changeImageSource(newSource, i) {
    var image = document.getElementById(`image-container-${i}`);
    image.classList.add('scale-up-hor-center');
    image.src = newSource;

    setTimeout(function () {
        image.classList.remove('scale-up-hor-center');
    }, 1000);
}





async function getWishlist(){
  const data = await get_wish()
  WishTables(data);
}

async function get_wish() {
  let email = localStorage.getItem('EH-Email');
  const data = { email: email };

  try {
    
    
   
      const result = ProductsData;
    return result;
    createWarn();
    return null;

  } catch (error) {
    console.error('Error fetching or parsing data:', error);
  }
}

function WishTables(result) {
  if(result!=null){
    for (let i = 0; i < result.length; i++) {
      IdArray[i] = result[i]['product_id'];
    }
    IdArray = IdArray.join(', ');

    for (let i = 0; i < result.length; i++) {
      createProduct1(result[i]['product_id'])
      let Id, title, description, price;
      Id = result[i]['product_id'];  //incomplete
      
      title = result[i]['name'];
      description = result[i]['SubDescription'];
      price = result[i]['price'];
      star = result[i]['rating'];

      var starDiv = document.getElementById(`star-${Id}`);

      var image = result[i]['product_img'];
      changeImageSource(image, Id);
      document.getElementById(`title-${Id}`).textContent = title;
      document.getElementById(`description-${Id}`).textContent = description;
      document.getElementById(`price-${Id}`).textContent = "₹" + price;

      if(result[i]['sale']!=0){
        // console.log("yesss");
        document.getElementById(`oldprice-${Id}`).textContent = "₹" + price;
        document.getElementById(`price-${Id}`).textContent = "₹" + result[i]['sale'];
        document.getElementById(`price-${Id}`).style.color = 'green';
        document.getElementById(`sale-${Id}`).style.display = 'block';
    }

      for (let j = 1; j <= star; j++) {
          let starImg = document.createElement('img');
          starImg.src = 'EH-images/icons/star.png';
          starImg.alt = '';
          starDiv.appendChild(starImg);
      }
    }
  }
}