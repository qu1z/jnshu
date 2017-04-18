/**
 * Created by 雨月桑 on 2017/4/17.
 */
var amounts;
var killer;
var citizen;
// amounts = document.getElementById("amounts").value;

// 杀手人数
function getKiller () {
    amounts = document.getElementById("amounts").value;
    if (amounts<=3) {
        killer="(┙>∧<)┙へ┻┻";
    }
    else if (amounts<=5){
        killer=1;
    }
    else if (amounts<=8){
        killer=2;
    }
    else if (amounts<=11){
        killer=3;
    }
    else if (amounts<=15){
        killer=4;
    }
    else if (amounts<=18){
        killer=5;
    }
    else {
        killer="(┙>∧<)┙へ┻┻";
    }
    arrAmounts();
    arrKiller ();
    return killer;
}
// 村民人数
function getCitizen () {
    if (amounts>=4 && amounts<=18) {
        citizen=amounts-killer;
    }
    else {
        citizen="(┙>∧<)┙へ┻┻";
    }
    return citizen;
}
window.onchange = function(){
    amounts = document.getElementById("amounts").value;
    if (isNaN(amounts)==true) {
        document.getElementById("killer").value = "_(:3 」∠)_ ";
        document.getElementById("citizen").value = "_(:3 」∠)_ ";
        alert("骗子");
    }
    else if (amounts%1!==0) {
        document.getElementById("killer").value = "_(:3 」∠)_ ";
        document.getElementById("citizen").value = "_(:3 」∠)_ ";
        alert("闹鬼啦！");
    }
    else if (amounts<4 || amounts>18) {
        document.getElementById("killer").value = getKiller();
        document.getElementById("citizen").value = getCitizen();
        alert("出轨了");
    }
    else {
        document.getElementById("killer").value = getKiller();
        document.getElementById("citizen").value = getCitizen();
    }
}
// 抓取玩家人数的数组
arrAmount = [];
function arrAmounts () {
    amounts = parseInt(amounts);
    for (var i=amounts-1;i>=0;i--) {
        arrAmount[i] = 'citizen';
    }
}
function arrKiller () {
    for (var i=killer;i>=0;i--) {
        arrAmount[i]="killer";
    }
}
// 洗牌
Array.prototype.shuffle = function () {
    var input = this;
    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
arrAmount.shuffle();
