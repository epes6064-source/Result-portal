const subjectNames=["Fiqh","Aqeeda","Tazkiya","Nahw","Hifz"];

window.onload=function(){

const params=new URLSearchParams(window.location.search);
const reg=params.get("regNo");
const cls=params.get("class");

const url="https://script.google.com/macros/s/AKfycbyyIZQzWcRyCe6IQsf2O7mFFvT1s8XGkvywun_CajY9NOjayWID6fKUecm9REMALn5Unw/exec?regNo="+reg+"&class="+cls;

fetch(url)
.then(res=>res.json())
.then(data=>{

document.getElementById("loading").style.display="none";
document.getElementById("resultContent").style.display="block";

if(data.error){
document.getElementById("resultContent").innerHTML="Result Not Found";
return;
}

document.getElementById("name").innerText=data.name;
document.getElementById("reg").innerText=data.regNo;
document.getElementById("cls").innerText=data.class;

let total=0;
let rows="";

data.marks.forEach((mark,i)=>{
total+=Number(mark);
rows+=`<tr><td>${subjectNames[i]}</td><td>${mark}</td></tr>`;
});

document.getElementById("subjects").innerHTML=rows;

let avg=total/data.marks.length;
let grade=calculateGrade(avg);

document.getElementById("total").innerText=total;
document.getElementById("average").innerText=avg.toFixed(2)+"%";
document.getElementById("grade").innerText=grade;

let status=document.getElementById("status");

if(avg>=40){
status.innerText="Status : PASSED";
status.className="status pass";
}else{
status.innerText="Status : FAILED";
status.className="status fail";
}

})
.catch(()=>{
document.getElementById("loading").innerText="Server Error";
});

}

function calculateGrade(avg){
if(avg>=90)return"A+";
if(avg>=80)return"A";
if(avg>=70)return"B+";
if(avg>=60)return"B";
if(avg>=50)return"C";
if(avg>=40)return"D";
return"F";
}