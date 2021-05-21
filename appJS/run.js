'use strict';
let attempts = 0;
let maxAttmpts = 0;
let userEnter = prompt('maxAttmpts')
if (userEnter > 25) {
    maxAttmpts = 25;
}
else if (userEnter < 25) {
    maxAttmpts = userEnter;
}

let mall = [];
let nameOfImge = [];
let busClicks = [];
let busviews = [];
function busMall(busName) {

    this.busName = busName.split('.')[0];
    this.source = 'images/' + busName;
    this.clicks = 0;
    this.views = 0;
    mall.push(this);
    nameOfImge.push(this.busName);

}

let mallImages = [
    'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
    'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg'
    , 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let i = 0; i < mallImages.length; i++) {

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


    let busArray = mall[0];
    let busChekedImag = mall[1];
    while (busArray === busChekedImag) {
        generateImage();
    }
    while (leftImgIndex === rightImgIndex || lastImgIndex === rightImgIndex || leftImgIndex === lastImgIndex) {
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

    if (attempts <= maxAttmpts) {

        if (event.target.id === 'firstImg') {
            mall[leftImgIndex].clicks++;
        }
        else if (event.target.id === 'secondImg') {

            mall[rightImgIndex].clicks++;
        }

        else if (event.target.id === 'lastImg') {
            mall[lastImgIndex].clicks++;
        }

        renderImg();

    }
}


let buttom = document.getElementById('go');
buttom.addEventListener('click', resulatS)

function resulatS(event) {

    let ulEl = document.getElementById('results');
    let LiEl;
    for (let j = 0; j < mall.length; j++) {
        LiEl = document.createElement('li');
        ulEl.appendChild(LiEl);
        LiEl.textContent = `${mall[j].busName} had ${mall[j].clicks} votes, and was seen ${mall[j].views} times`
        busClicks.push(mall[j].clicks);
        busviews.push(mall[j].views)
    }

    firstImg.removeEventListener('click', userClick);
    secondImg.removeEventListener('click', userClick);
    lastImg.removeEventListener('click', userClick);
    chartrender();

}


    

    function chartrender() {
        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: nameOfImge,
                datasets: [{
                    label: '# of views',
                    data: busviews,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 3)',

                    ],
                    borderWidth: 1
                }, {
                    label: '# of clicks',
                    data: busClicks,
                    backgroundColor: [

                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [

                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]

            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }


