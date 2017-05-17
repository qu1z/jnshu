/**
 * Created by 雨月桑 on 2017/5/14.
 */
window.onload = function () {
    var contain = document.getElementById("g-lt");
    contain.innerHTML = '<ul><li class="g-hd-lt">老婆后台管理系统</li><li>信息管理</li><li id="list">Article管理</li><li id="table" style="display:none;">Article列表</li><li>人才管理</li><li>推荐管理</li><li>后台管理</li><li>用户管理</li><li>内容管理</li></ul>';
    var list = document.getElementById("list");
    var table = document.getElementById("table");
    list.addEventListener("click",getObvious);
    function getObvious () {
        if (table.style.display === "none") {
            table.style.display = "block";
        }
        else if (table.style.display === "block") {
            table.style.display="none";
        }
    }
};
