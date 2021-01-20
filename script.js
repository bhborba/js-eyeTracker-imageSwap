//18:25

window.saveDataAcrossSessions = true;

const LOOK_DELAY = 1000;
let LOOK_DIRECTION = null;
const LEFT_CUTOFF = window.innerWidth / 4;
const RIGHT_CUTOFF = window.innerWidth - window.innerWidth / 4;

let startLookTime = Number.POSITIVE_INFINITY;
let imageElement = getNewImage();
let nextImageElement = getNewImage(true);

webgazer.setGazeListener((data, timestamp) => {
    if (data === null || LOOK_DIRECTION === 'STOP') return;

    if (data.x < LEFT_CUTOFF  && LOOK_DIRECTION !== 'LEFT' && LOOK_DIRECTION !== 'RESET') {
        startLookTime = timestamp;
        LOOK_DIRECTION = 'LEFT';
    }else if (data.x > RIGHT_CUTOFF && LOOK_DIRECTION !== 'RIGHT' && LOOK_DIRECTION !== 'RESET'){
        startLookTime = timestamp;
        LOOK_DIRECTION = 'RIGHT';
    } else if (data.x >= LEFT_CUTOFF && data.x <= RIGHT_CUTOFF){
        startLookTime = Number.POSITIVE_INFINITY;
        LOOK_DIRECTION = null;
    }

    if (startLookTime + LOOK_DELAY < timestamp){
        if (LOOK_DIRECTION === 'LEFT'){
            imageElement.classList.add('left');        
        } else {
            imageElement.classList.add('right');   
        }

        startLookTime = Number.POSITIVE_INFINITY;
        LOOK_DIRECTION = 'STOP';
        setTimeout(() => {
            imageElement.remove();
            nextImageElement.classList.remove('next');
            imageElement = nextImageElement;
            nextImageElement = getNewImage(true);
            LOOK_DIRECTION = "RESET";
        }, 200)
    }
}).begin()


function getNewImage(next = false){
    const img = document.createElement('img');
    img.src = "https://picsum.photos/1000?" + Math.random();

    if(next) img.classList.add('next');

    document.body.append(img);

    return img;
}