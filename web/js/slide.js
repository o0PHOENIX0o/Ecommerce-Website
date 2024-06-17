

let sliderData = [
    { imageSrc: 'EH-images/homeSlider/slider1.png'},
    { imageSrc: 'EH-images/homeSlider/slider2.png'},
    { imageSrc: 'EH-images/homeSlider/slider3.png'},
    { imageSrc: 'EH-images/homeSlider/slider4.png'},
];

let sliderDataBanner = [
    { imageSrc: 'EH-images/banners/bg.png'},
    { imageSrc: 'EH-images/banners/bg2.png'},
    { imageSrc: 'EH-images/banners/bg3.png'},

];

async function getData() {
  try {
    
      const result = [
          {
              "slider1": "EH-images/homeSlider/slider1.png",
              "slider2": "EH-images/homeSlider/slider2.png",
              "slider3": "EH-images/homeSlider/slider3.png",
              "slider4": "EH-images/homeSlider/slider4.png",
              "stext1": "development board",
              "stext2": "development board",
              "stext3": "development board",
              "stext4": "development board",
              "bannerImg1": "EH-images/banners/bg.png",
              "bannerImg2": "EH-images/banners/bg2.png",
              "bannerImg3": "EH-images/banners/bg3.png",
              "btext": "raspberry pi",
              "btext1": "test5",
              "btext2": "test6",
              "btext3": "text7"
          }
      ];
    // console.log(result);
    if (result[0]) {
        for(let i = 0; i<4; i++){
            let image = result[0]['slider'+(i+1)];
            document.getElementById(`img-${i}`).src = image;
            document.getElementById(`img-${i}`).setAttribute('onclick', `window.location.href = '` + `shop.html?search=${result[0]['stext'+(i+1)]}` + `'`);
        
            if(i<3){
                let image = result[0]['bannerImg'+(i+1)];
                document.getElementById(`Banimg-${i}`).src = image;
                document.getElementById(`Banimg-${i}`).setAttribute('onclick', `window.location.href = '` + `shop.html?search=${result[0]['btext'+(i+1)]}` + `'`);
            }
        }
        
      return 1;
    } else {
      return 0;
    }

  } catch (error) {
    console.error('An error occurred:', error);
    //createWarn();
  }
}



for (let i = 0; i < sliderData.length; i++) {
    createSliderContent(sliderData[i].imageSrc, sliderData[i].titleText, sliderData[i].paragraphText, i);
}



function createSliderContent(imageSrc, titleText, paragraphText, id) {
    // Get the existing "slider" div
    var slider = document.getElementById('slider');

    // Create the slider content using JavaScript
    var sliderContent = document.createElement('div');
    sliderContent.className = 'myslide';



    var image = document.createElement('img');
    image.src = imageSrc;
    image.className = "imgg";
    image.id = `img-${id}`;

    sliderContent.appendChild(image);

    slider.appendChild(sliderContent);
}





const myslide = document.querySelectorAll('.myslide'),
    dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 4000);

function autoSlide() {
    counter += 1;
    slidefun(counter);
}
function plusSlides(n) {
    counter += n;
    slidefun(counter);
    resetTimer();
}
function currentSlide(n) {
    counter = n;
    slidefun(counter);
    resetTimer();
}
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoSlide, 4000);
}

function slidefun(n) {

    let i;
    for (i = 0; i < myslide.length; i++) {
        document.getElementById(`img-${i}`).classList.remove('Fade_animation');
        myslide[i].style.display = "none";
    }
    for (i = 0; i < dot.length; i++) {
        dot[i].className = dot[i].className.replace(' active', '');
    }
    if (n > myslide.length) {
        counter = 1;
    }
    if (n < 1) {
        counter = myslide.length;
    }
    myslide[counter - 1].style.display = "block";
    document.getElementById(`img-${counter - 1}`).classList.add('Fade_animation');
    dot[counter - 1].className += " active";
}





for (let i = 0; i < sliderDataBanner.length; i++) {
    createsliderBanner(sliderDataBanner[i].imageSrc, i);
}

getData();

function createsliderBanner(imageSrc, id) {
    var slider = document.getElementById('sliderBanner');

    var sliderContent = document.createElement('div');
    sliderContent.className = 'BannerSlide';



    var image = document.createElement('img');
    image.src = imageSrc;
    image.className = "BannerImg imgg";
    image.id = `Banimg-${id}`;
    // image.style.width = '100%';
    // image.style.height = '100%';

    sliderContent.appendChild(image);

    // Append the slider content to the existing "slider" div
    slider.appendChild(sliderContent);
}


const Banners = document.querySelectorAll('.BannerSlide');
let counter2 = 1;
BannerSlideFun(counter2);

let timer2 = setInterval(autoSlideBanner, 4000);

function autoSlideBanner() {
    counter2 += 1;
    BannerSlideFun(counter2);
}

function BannerSlideFun(n) {
    let i;
    for (i = 0; i < Banners.length; i++) {
        document.getElementById(`Banimg-${i}`).classList.remove('Fade_animation');
        Banners[i].style.display = "none";
    }
    if (n > Banners.length) {
        counter2 = 1;
    }
    if (n < 1) {
        counter2 = Banners.length;
    }
    Banners[counter2 - 1].style.display = "block";
    document.getElementById(`Banimg-${counter2 - 1}`).classList.add('Fade_animation');
}


