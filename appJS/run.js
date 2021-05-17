'use strict';
let attempts = 0;
let maxAttmpts =10;


let mall = [];
function busMall(busName) {

    this.busName = busName.split('.')[0];
    this.source = 'images/' + busName;
    this.clicks = 0;
    this.views = 0;
    mall.push(this);

}

let mallImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
    'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg',
    'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let i = 0; i <mallImages.length; i++) {

    new busMall(mallImages[i])
}


function gernartImage() {
    return Math.floor(Math.random() * mall.length);
}

let firstImg = document.getElementById('firstImg');
let secondImg = document.getElementById('secondImg');
let lastImg = document.getElementById('lastImg');

let leftImgIndex;
let rightImgIndex;
let lastImgIndex;



function renderImg() {

    leftImgIndex = gernartImage();
    rightImgIndex = gernartImage();
    lastImgIndex = gernartImage();

    while (leftImgIndex === rightImgIndex || lastImgIndex===rightImgIndex ||leftImgIndex===lastImgIndex ) {
        leftImgIndex = gernartImage();
        rightImgIndex = gernartImage();
        
        




    }

    firstImg.setAttribute('src', mall[leftImgIndex].source);
    mall[leftImgIndex].views++;

    secondImg.setAttribute('src', mall[rightImgIndex].source);
    mall[rightImgIndex].views++;

    lastImg.setAttribute('src', mall[lastImgIndex].source);
    mall[lastImgIndex].views++;
}
renderImg();

firstImg.addEventListener('click', userClick);
secondImg.addEventListener('click', userClick);
lastImg.addEventListener('click', userClick);


function userClick(event) {
    attempts++;
   

    
    if ( attempts <= maxAttmpts) {

        if (event.target.id === 'firstImg') {
            mall[leftImgIndex].clicks++;
        } else if (event.target.id === 'secondImg') {

            mall[rightImgIndex].clicks++;
        }
        else if (event.target.id === 'lastImg') {
            mall[lastImgIndex].clicks++;
        }

        renderImg();

    } 
    
    let buttom = document.getElementById('go');
    buttom.addEventListener('click',resulatS)

    
    function resulatS(event) {

        let ulEl = document.getElementById('results');
        let LiEl;

        for (let i = 0; i < mall.length; i++) {
            LiEl = document.createElement('li');
            ulEl.appendChild(LiEl);
            LiEl.textContent = `${mall[i].busName} had ${mall[i].clicks} votes, and was seen ${mall[i].views} times`


        }
        firstImg.removeEventListener('click', userClick);
        secondImg.removeEventListener('click', userClick);
        lastImg.removeEventListener('click', userClick);


        
    }
     

        
    

}

