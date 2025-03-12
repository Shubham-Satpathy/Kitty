const date=document.getElementById('date');
d=date.textContent;
date.textContent=d.substring(0,15);
const p=document.querySelector('#entry');
p.innerHTML=p.textContent;
console.log(p);