document.getElementById("clear_div").onclick=function(){
    Array.from(document.getElementsByTagName("input")).forEach(a => a.value="");
}
    let arr =document.getElementsByClassName("d2");
    for(let i of arr){
        i.onclick = function () {
            i.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        }
    }
function queryButton(){
    let queryConArr = Array.from(document.getElementsByClassName("search")).map(i => i.value);
    Array.from(document.getElementsByClassName("b1")[0].children[0].children).filter((a, b) => b != 0).filter(i =>
        (queryConArr[0] != "" && i.children[0].innerText != queryConArr[0])
        || (queryConArr[1] != "" && i.children[4].innerText != queryConArr[1])
    ).forEach(i => i.parentNode.removeChild(i));
}

if( window.location.search != ""){
    let inserArr = window.location.search.substr(1).split("&").map(i=> i.split("="));
console.log(inserArr);
let insertString=
`
     <tr>
            <td>${inserArr[0][1]}</td>
            <td class="c1">2</td>
            <td></td>
            <td class="c2"></td>
            <td class="c3"></td>
            <td class="c4"></td>
            <td class="c5"></td>
            <button class="c"></button>
            <button class="d1"></button>
            <button class="d2"></button>
            <button class="d3"></button>
            </td>
     </tr>

`
document.getElementsByClassName("insert")[0].innerHTML = insertString + document.getElementsByClassName("insert")[0].innerHTML;
}

