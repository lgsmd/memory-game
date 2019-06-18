const carArray = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const DocFrag = document.createDocumentFragment();
const platformElement = document.querySelector('.deck');
const starsMode = document.querySelectorAll(".fa.fa-star");
let matchArray = [];
let moves = 0;

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
function movesTiming(timing){        //计星，计次
    document.querySelector(".moves").textContent = timing;
    if(timing === 15){
        starsMode[2].className = "fa fa-star-o";
    }else if(timing === 18){
        starsMode[1].className = "fa fa-star-o";
    }else if(timing === 0){
        starsMode[1].className = starsMode[2].className = starsMode[0].className;
    }
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

function checkCards(className1, className2){   //对比卡片
    let openCard = document.querySelectorAll(".card.open.show");
    if(className1 === className2){
        openCard[0].className = "card match";
        openCard[1].className = "card match";
        setTimeout(function () {

            matchArray = [];
        }, 550);
        moves += 1;
    }else {
        openCard[0].className = "card notRight";
        openCard[1].className = "card notRight";
        setTimeout(function () {
            openCard[0].className = "card";
            openCard[1].className = "card";
            matchArray = [];
        }, 550);
        moves += 1;
    }
    movesTiming(moves);
}

document.querySelector('.restart').addEventListener("click", function() { //触发重置
    while (platformElement.firstChild != null){
        platformElement.firstChild.remove();
    }
    moves = 0;
    movesTiming(moves);
    makePlatform(shuffle(carArray));
});

document.querySelector('.deck').addEventListener('click', function (event) { //点击卡片
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