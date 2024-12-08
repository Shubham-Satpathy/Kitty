const month=["","January","February","March","April","May","June","July","August","September","October","November","December"];
const date=document.getElementById("date");
const d=date.textContent.split("/");
date.textContent=`${d[1]}-${month[d[2]]}-${d[0]}`
const p=document.querySelector('#entry');
p.innerHTML=p.textContent;
console.log(p);
