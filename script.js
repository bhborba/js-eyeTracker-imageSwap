//18:25

window.saveDataAcrossSessions = true;

const LOOK_DELAY = 1000;
const LOOK_DIRECTION = null;
const LEFT_CUTOFF = window.innerWidth / 4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;

let startLookTime = Number.POSITIVE_INFINITY;
let imageElement = getNewImage();
let nextImageElement = getNewImage(true);

webgazer.setGazeListener((data, timestamp) => {
    if (data === null) return;

    if (data.x < LEFT_CUTOFF  && lookDirection !== 'LEFT') {
        startLookTime = timestamp;
        lookDirection = 'LEFT';
    }else if (data.x > RIGHT_CUTOFF){
        startLookTime = timestamp;
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF){
        startLookTime = Number.POSITIVE_INFINITY;
    }

    if (startLookTime + LOOK_DELAY < timestamp)
}).begin()

function getNewImage(next = false){
    const img = document.createElement('img');
    img.src = "https://picsum.photos/1000?" + Math.random();

    if(next) img.classList.add('next');

    document.body.append(img);

    return img;
}