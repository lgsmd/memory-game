const carArray = ["fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-bolt", "fa fa-cube", "fa fa-leaf", "fa fa-bicycle", "fa fa-bomb"];
const DocFrag = document.createDocumentFragment();
const gamePlatfrom = document.querySelector('.deck');
const starsMode = document.querySelectorAll('.fa.fa-star');
const resetButton = document.querySelector('.restart');
const eventCard = document.querySelector('.deck');
const divContainer = document.querySelector('.container');
const scoreString = document.getElementById('scoreString');
const passPlatfrom = document.querySelector('.passPlatfrom');
const playAgain = document.getElementById('playAgain');

let matchCars = [];
let moves = 0;
let passTiming = 0;
let startTime = 0;
let endTime;
let totalTime;

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
function movesTiming(timing){        //计星
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
    gamePlatfrom.appendChild(DocFrag);
}

function checkCards(className1, className2){   //对比卡片
    let openCard = document.querySelectorAll('.card.open.show');
    if(className1 === className2){
        openCard[0].className = "card match";
        openCard[1].className = "card match";
        passTiming++;
        if(passTiming === 8){     //正确匹配8次，通关游戏，进入'恭喜'界面，结束计时
            endTime = new Date().valueOf();     // 结束计时
            totalTime = (endTime - startTime) / 1000;
            setTimeout(function () {
                passGame(passTiming);
            }, 350);
        }
        matchCars = [];

    }else {
        openCard[0].className = "card notRight";
        openCard[1].className = "card notRight";
        setTimeout(function () {
            openCard[0].className = "card";
            openCard[1].className = "card";
            matchCars = [];
        }, 550);
    }
    movesTiming(moves);
}

function resetClick(){       // 重置游戏
    while (gamePlatfrom.firstChild != null){
        gamePlatfrom.firstChild.remove();
    }
    moves = 0;
    startTime = 0;
    movesTiming(moves);
    makePlatform(shuffle(carArray));
}

function againPlay() {   // 点击 pley again ，回到初始状态
    resetClick();
    passTiming = 0;
    passPlatfrom.style.cssText = "visibility: hidden; height: 0px";
    divContainer.style.cssText = "visibility: visible";
}

function passGame(){    //通关游戏
    divContainer.style.cssText = "visibility: hidden; height: 0px";  // 隐藏游戏界面
    scoreString.textContent = `With ${moves} Moves and ${document.querySelectorAll('.fa.fa-star').length} Stars. Times: ${totalTime}s!`;  // '恭喜'界面成绩文本
    passPlatfrom.style.cssText = "visibility: visible;"; // 显示通过恭喜界面
    addGood();
    playAgain.addEventListener('click', againPlay);
}

function addGood(){        //添加通关游戏后的 "打钩" 动画
    const goodHtml =
        `<div class="swal2-icon swal2-success swal2-animate-success-icon" style="display: block;">
            <div class="swal2-success-circular-line-left" style="background: rgb(255, 255, 255);">
            </div>
            <span class="swal2-success-line-tip swal2-animate-success-line-tip"></span><span class="swal2-success-line-long swal2-animate-success-line-long"></span>
            <div class="swal2-success-ring">
            </div>
            <div class="swal2-success-fix" style="background: rgb(255, 255, 255);">
            </div>
            <div class="swal2-success-circular-line-right" style="background: rgb(255, 255, 255);">
            </div> 
         </div>`

    document.getElementById('correct').innerHTML = goodHtml;
}

resetButton.addEventListener('click', resetClick);   //  点击触发重置

eventCard.addEventListener('click', function (event) { //点击卡片
    if(startTime === 0) {
        startTime = new Date().valueOf();           //  开始计时
    }
    if(event.target.className === "card") {            //点击到卡片
        if(matchCars.length === 0) {
            event.target.className = "card open show";
            matchCars[0] = event.target.firstElementChild.className;
        }else if(matchCars.length === 1){
            moves += 1;
            event.target.className = "card open show";
            matchCars[1] = event.target.firstElementChild.className;
            checkCards(matchCars[0],matchCars[1]);
        }
    }
    if(event.target.parentElement.className === "card") {   //点击到卡片内容
        if(matchCars.length === 0) {
            event.target.parentElement.className = "card open show";
            matchCars[0] = event.target.className;
        }else if(matchCars.length === 1){
            moves += 1;
            event.target.parentElement.className = "card open show";
            matchCars[1] = event.target.className;
            checkCards(matchCars[0],matchCars[1]);
        }
    }
});