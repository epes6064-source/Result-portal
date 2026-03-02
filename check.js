function goToResult(){

let reg=document.getElementById("regNo").value.trim();
let cls=document.getElementById("class").value;

if(reg===""||cls===""){
alert("Enter RegNo and Class");
return;
}

document.getElementById("loading").style.display="block";

setTimeout(()=>{
window.location.href=`result.html?regNo=${reg}&class=${cls}`;
},600);

}