/**
 * Created by 雨月桑 on 2017/4/15.
 */
var t;
var box = document.getElementsByClassName("box");
var start = document.getElementById("start").addEventListener('click',getStart);
var reset = document.getElementById("reset");
reset.onclick = getReset;
function changeOrange () {
    for (var k = 0; k <= 8; k++) {
        box[k].style.backgroundColor = "#ff8c00";
    }
}
function getStart() {
    // 清空
    changeOrange ();
    // 取三个盒子
    console.log(box);
    for (var i = 0; i <= 2; i++) {
        var a = Math.floor(Math.random() * 9);
        var b = Math.floor(Math.random() * 9);
        var c = Math.floor(Math.random() * 9);
        if (a !== b && b !== c && c !== a) {
            console.log(a, b, c);
            break;
        }
        else {
            i = -1;
        }
    }
    // 随机颜色
    function getColor() {
        var clr = "";
        var ac = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
        for (var j = 0; j <= 5; j++) {
            var num = Math.floor(Math.random() * 16);
            // var b = String(ac[num]);
            clr += ac[num];
        }
        // "#" + clr;
        return "#" + clr;
    }
    // 给盒子赋值
    box[a].style.backgroundColor = getColor();
    box[b].style.backgroundColor = getColor();
    box[c].style.backgroundColor = getColor();
    // 计时
    clearTimeout(t);
    t=setTimeout("getStart()",1000);
}
function getReset() {
    clearTimeout(t);
}
