const carArray = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const DocFrag = document.createDocumentFragment();
let platformElement = document.querySelector('.deck');
const resetCar = document.querySelector('.restart');
let matchArray = [];
makePlatform(shuffle(carArray));

function shuffle(array) {    //洗牌函数
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function makePlatform(carArray) {  //生成游戏表格
    for(let car of carArray){
        let newLi = document.createElement('li');
        newLi.className = "card";
        let newI = document.createElement('i');
        newI.className = car;
        newLi.appendChild(newI);
        DocFrag.appendChild(newLi);
    }
    platformElement.appendChild(DocFrag);
}

resetCar.addEventListener("click", function() { //触发重置
    while (platformElement.firstChild != null){
        platformElement.firstChild.remove();
    }
    makePlatform(shuffle(carArray));
});

function checkCards(className1, className2){
    let openCard = document.querySelectorAll(".card.open.show");
    if(className1 === className2){
        setTimeout(function () {
            openCard[0].className = "card match";
            openCard[1].className = "card match";
            matchArray = [];
        }, 400);
    }else {
        openCard[0].className = "card notRight";
        openCard[1].className = "card notRight";
        setTimeout(function () {
            openCard[0].className = "card";
            openCard[1].className = "card";
            matchArray = [];
        }, 400);
    }
}

document.querySelector('.deck').addEventListener('click', function (event) {
    if(event.target.className === "card") {
        if(matchArray.length === 0) {
            event.target.className = "card open show";
            matchArray[0] = event.target.firstElementChild.className;
        }else if(matchArray.length === 1){
            event.target.className = "card open show";
            matchArray[1] = event.target.firstElementChild.className;
            checkCards(matchArray[0],matchArray[1]);
        }
    }
});