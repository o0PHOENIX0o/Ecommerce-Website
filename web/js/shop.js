
var wish_value = [];
var intersection = [];
var intersection1 = [];

async function onDOMContentLoaded() {


  const urlParams = new URLSearchParams(window.location.search);

  let category = urlParams.get('type');
  let keywords = urlParams.get('search');


  if (category) {
    category = category.replace(/ /g, '%');
    document.getElementById('badge').style.display = 'block';
    document.getElementById('badge').textContent = 1;
  } else {
    category = '';
  }

  if (keywords) {
    keywords = keywords.replace(/ /g, '%');
    document.getElementById('badge').style.display = 'block';
    document.getElementById('badge').textContent = 1;
  } else {
    keywords = '';
  }


  const pagedata = await GetOnLoadData({ category: category, keywords: keywords });

  document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);


}



async function GetOnLoadData(object) {
  document.getElementById('product-container').innerHTML = '';
  document.getElementById('loading-message').style.display = 'flex';
  if (!object.page) {
    object.page = 1;
  }
  var currentPage = object.page;
  try {

    const res = ProductsData;
    console.log(res);

    PagesCount = 5;
    console.log(PagesCount);
    console.log(document.getElementById('product-container').innerHTML);
    if (res.length < 1) {
      document.getElementById('loading-message').style.display = 'none';
      document.getElementById('product-container').innerHTML = '<a style="position: relative; color:red;font-size:50px;" >Not available</a>';
      noMoreData = true;
    } else {
      document.getElementById('product-container').innerHTML = '';
    }

    pagesdiv.innerHTML = '';
    startPage.removeAttribute('onclick');
    EndPage.removeAttribute('onclick');
    startPage.style.backgroundColor = '#fff';
    EndPage.style.backgroundColor = '#fff';
    document.getElementById('loading-message').style.display = 'flex';


    CreateLoadPaging(PagesCount, 'GetOnLoadData', currentPage);

    try {
      document.getElementById(`page${currentPage}`).classList.add("activePage");
    } catch (error) {

    }

    document.getElementById('loading-message').style.display = 'none';
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    for (let i = 0; i < res.length; i++) {
      createProduct(res[i]['product_id']);

    }
    UpdateProducts(res);
    isLoading = false;
    document.getElementById('loading-message').style.display = 'none';


    return { count: PagesCount, currentPage: currentPage };
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }

}

let pagesdiv = document.getElementById('pages');
let startPage = document.getElementById('StartPage');
let EndPage = document.getElementById('EndPage');


function CreateLoadPaging(PagesCount, Func, currentPageIndex = 1) {
  startPage.setAttribute('onclick', `${Func}({page:1});`)
  // console.log("currentpage load index---->", currentPageIndex);
  if (PagesCount <= 1) {
    startPage.removeAttribute('onclick');
    EndPage.removeAttribute('onclick');

    startPage.style.backgroundColor = "#8582827a"
    EndPage.style.backgroundColor = "#8582827a"

  } else {
    EndPage.setAttribute('onclick', `${Func}({page:${PagesCount}}); `);
  }

  let Pagerange = 3
  let startIndex = currentPageIndex - 1;
  let endIndex = currentPageIndex + 1;

  if (startIndex <= 0) {
    startIndex = 1;
    endIndex = startIndex + 2;
  }

  if (endIndex > PagesCount) {
    startIndex = PagesCount - 2;
    endIndex = PagesCount;
  }

  if (PagesCount < Pagerange) {
    startIndex = 1;
    endIndex = PagesCount;
  }

  console.log(startIndex, endIndex);

  // Create page links
  for (let i = startIndex; i <= endIndex; i++) {
    const PageDiv = document.getElementById('pages');

    const page = document.createElement('a');
    page.id = `page${i}`;
    page.innerHTML = i;
    page.setAttribute('onclick', `${Func}({page:${i}});`);

    PageDiv.appendChild(page);
  }

}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);


var filterSection = document.getElementById('filter_container');
var arr = [];
var filterKeys, selectedData, checkboxes;
let currentPage = 1;
let noMoreData = false;



/*==================== SHOW NAVBAR ====================*/
const showMenu = (headerToggle, navbarId) => {
  const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
  var count = 0;

  if (headerToggle && navbarId) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('show-menu');
      document.querySelector('.svg1').classList.toggle('hide');
      document.querySelector('.svg2').classList.toggle('hide');
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('show-menu') && e.target !== toggleBtn && !nav.contains(e.target)) {
        nav.classList.remove('show-menu');
        document.querySelector('.svg1').classList.remove('hide');
        document.querySelector('.svg2').classList.add('hide');
      }
    });
  }
}

showMenu('ToggleFilter', 'navbar1');


async function fetchFilters() {
  try {
    const result = FiltersData;
    console.log(result);
    return result;

  } catch (error) {
    console.error('Error fetching data:', error);
    return {};
  }

}


function createDropdowns(sectionName, availableFilters) {
  let inputType = (sectionName.toLowerCase() === 'rating' || sectionName.toLowerCase() === 'sort') ? 'radio' : 'checkbox';

  let dropdown = document.createElement('div');
  dropdown.className = 'nav__dropdown';
  dropdown.id = sectionName.toLowerCase() + 'Dropdown';

  let link = document.createElement('a');
  link.href = '#';
  link.className = 'nav__link';

  let span = document.createElement('span');
  span.className = 'nav__name';
  span.textContent = sectionName;

  let icon = document.createElement('i');
  icon.className = 'fa-solid fa-chevron-down fa-2xs nav__icon nav__dropdown-icon';

  link.appendChild(span);
  link.appendChild(icon);

  let dropdownCollapse = document.createElement('div');
  dropdownCollapse.className = 'nav__dropdown-collapse';

  let dropdownContent = document.createElement('div');
  dropdownContent.className = 'nav__dropdown-content';

  availableFilters.forEach((filter, index) => {
    if (filter) {
      let contentDiv = document.createElement('div');
      contentDiv.className = "contentDiv";

      let input = document.createElement('input');
      input.type = inputType;
      input.name = sectionName.toLowerCase();
      input.id = sectionName.toLowerCase() + (index + 1);
      input.className = 'nav__checkbox';
      input.dataset.section = sectionName;

      let label = document.createElement('label');
      label.htmlFor = input.id;
      label.className = 'nav__dropdown-item';
      label.textContent = filter;
      contentDiv.appendChild(input);
      contentDiv.appendChild(label);
      dropdownContent.appendChild(contentDiv);
    }
  });

  dropdownCollapse.appendChild(dropdownContent);

  dropdown.appendChild(link);
  dropdown.appendChild(dropdownCollapse);

  return dropdown;
}



async function initializeDropdowns() {
  var availableFilters = await fetchFilters();


  if ('keywords' in availableFilters) {
    delete availableFilters.keywords;
  }

  filterKeys = Object.keys(availableFilters);

  if (filterSection) {
    filterKeys.forEach(function (key) {
      filterSection.appendChild(createDropdowns(key, availableFilters[key]));
    });
    filterSection.appendChild(createDropdowns('sort', ['default', 'price: Low to High', 'price: High to Low']));
    filterSection.appendChild(createDropdowns('rating', ['4 and above', '3 and above', '1 and above']));
  } else {
    console.error('Filter container not found');
  }
}

async function execute() {
  await initializeDropdowns();

  selectedData = filterKeys.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {});
  selectedData['sort'] = [];
  selectedData['rating'] = [];

  checkboxes = document.querySelectorAll('.nav__checkbox');
}

execute();

function CreatePaging(PagesCount, currentPageIndex = 1) {
  document.getElementById('StartPage').setAttribute('onclick', `GetProData(${1})`)
  if (PagesCount <= 1) {
    document.getElementById('StartPage').removeAttribute('onclick');
    document.getElementById('EndPage').removeAttribute('onclick');

    document.getElementById('StartPage').style.backgroundColor = "#8582827a"
    document.getElementById('EndPage').style.backgroundColor = "#8582827a"

  } else {
    document.getElementById('EndPage').setAttribute('onclick', `GetProData(${PagesCount})`);
  }

  let Pagerange = 3
  let startIndex = currentPageIndex - 1;
  let endIndex = currentPageIndex + 1;

  if (startIndex <= 0) {
    startIndex = 1;
    endIndex = startIndex + 2;
  }

  if (endIndex > PagesCount) {
    startIndex = PagesCount - 2;
    endIndex = PagesCount;
  }

  if (PagesCount < Pagerange) {
    startIndex = 1;
    endIndex = PagesCount;
  }


  for (let i = startIndex; i <= endIndex; i++) {

    const PageDiv = document.getElementById('pages');

    const page = document.createElement('a');
    page.id = `page${i}`;
    page.innerHTML = i;
    page.setAttribute('onclick', `GetProData(${i})`);

    PageDiv.appendChild(page);
  }
}

async function resetFilter() {
  document.getElementById('badge').style.display = 'none';
  document.getElementById('badge').textContent = 0;
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });

  Object.keys(selectedData).forEach(key => selectedData[key] = []);
  // console.log("reseted data fields = ", selectedData);
  const urlParams = new URLSearchParams(window.location.search);
  let type = urlParams.get('type');
  let search = urlParams.get('search');
  if (type || search) {
    let url = window.location.href;
    url = url.split('?')[0];
    window.location.href = url;
  } else {
    GetProData()
  }
}

async function GetProData(currentPage = 1) {

  pagesdiv.innerHTML = '';
  startPage.removeAttribute('onclick');
  EndPage.removeAttribute('onclick');
  startPage.style.backgroundColor = '#fff';
  EndPage.style.backgroundColor = '#fff';
  document.getElementById('loading-message').style.display = 'flex';

  noMoreData = false;
  let FilterCount = 0;

  Object.keys(selectedData).forEach(key =>
    selectedData[key] = []
  );
  console.log(selectedData);


  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      FilterCount++;
      const section = checkbox.dataset.section;
      const labelText = document.querySelector(`label[for="${checkbox.id}"]`).textContent.trim();
      selectedData[section].push(labelText);


      if (section === 'sort') {
        if (labelText === 'price: Low to High') {
          selectedData['sort'] = 'asc';
        } else if (labelText === 'price: High to Low') {
          selectedData['sort'] = 'desc';
        } else {
          selectedData['sort'] = 'default';
        }
      } else if (section === 'rating') {
        if (labelText === '4 and above') {
          selectedData['rating'] = '4';
        } else if (labelText === '3 and above') {
          selectedData['rating'] = '3';
        } else if (labelText === '1 and above') {
          selectedData['rating'] = '1';
        }
      }
    }
  });

  if (FilterCount > 0) {
    document.getElementById('badge').style.display = 'block';
    document.getElementById('badge').textContent = FilterCount;

  }

  const res = await getProducts(selectedData, currentPage);
  let Count = 5;

  CreatePaging(Count, currentPage);
  try {
    document.getElementById(`page${currentPage}`).classList.add('activePage');

  } catch (error) {
    console.error('Error', error);
  }

  document.getElementById('loading-message').style.display = 'none';
  if (res.length < 1) {
    document.getElementById('product-container').innerHTML = '<a style="position: relative; color:red;font-size:50px;" >Not available</a>';
  } else {
    document.getElementById('product-container').innerHTML = '';
  }

  for (let i = 0; i < res.length; i++) {
    createProduct(res[i]['product_id']);
  }
  UpdateProducts(res);
  isLoading = false;
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}

async function getProducts(filters, Page) {
  if (noMoreData) {
    document.getElementById('loading-message').style.display = 'none';
    return {};
  }

  filters.page = Page;
  filters.q = document.getElementById('search').value.replace(/ /g, '%');
  isLoading = true;

  try {
    const result = ProductsData;
    if (result.length === 0) {
      document.getElementById('loading-message').style.display = 'none';
      noMoreData = true;
    }
    delete filters.page;
    return result;
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
  let productContainer = document.getElementById('product-container');

  let productDiv = document.createElement('div');
  productDiv.classList.add('pro');

  let heart = document.createElement('a');
  heart.classList.add('fa-regular');
  heart.classList.add('fa-heart');
  heart.style.color = 'red';
  heart.id = `heart-${id}`;
  heart.value = 'no';
  heart.setAttribute('onclick', `wishFunction(${id})`);
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
  img.classList.add('ProImg');
  img.id = `image-container-${id}`;
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
  cartImg.id = `cartImg-${id}`;
  cartImg.src = 'EH-images/icons/cart.png';
  cartImg.alt = 'Add to cart';
  cartImg.setAttribute('onclick', `cartFunction1(${id})`);
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
  let image, title, description, price, Id, keywords;

  for (let i = 0; i < data.length; i++) {
    Id = data[i]['product_id'];
    image = data[i]['product_img'];
    title = data[i]['name'];
    description = data[i]['SubDescription'];
    price = data[i]['price'];
    keywords = data[i]['keywords'];
    star = data[i]['rating'];

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

    for (let j = 1; j <= star; j++) {
      let starImg = document.createElement('img');
      starImg.src = 'EH-images/icons/star.png';
      starImg.alt = '';
      starImg.loading = 'eager';
      starDiv.appendChild(starImg);
    }

  }
}


function enterEvent(event) {
  if (event.keyCode == 13) {
    GetProData();
  }
}

