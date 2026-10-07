// Compte à rebours et bouton « Ajouter à mon agenda » (page d'accueil)
var target = new Date(2027, 7, 7, 15, 0, 0).getTime();
function pad(n){ return (n<10?'0':'')+n; }
var cdTimer;
function tick(){
  var diff = target - Date.now(); if(diff<0) diff=0;
  var s = Math.floor(diff/1000);
  var set = function(k,v){ var el=document.querySelector('[data-cd="'+k+'"]'); if(el) el.textContent=v; };
  set('days', Math.floor(s/86400)); set('hours', pad(Math.floor(s%86400/3600)));
  set('mins', pad(Math.floor(s%3600/60))); set('secs', pad(s%60));
  if(diff === 0 && cdTimer){ clearInterval(cdTimer); }
}
tick(); cdTimer = setInterval(tick, 1000);

var icsBtn = document.getElementById('ics');
if(icsBtn) icsBtn.addEventListener('click', function(){
  var ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Alexia & Julien//Mariage 2027//FR','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:mariage-alexia-julien-2027@vauluisant','DTSTAMP:20260101T000000Z','DTSTART;VALUE=DATE:20270807','DTEND;VALUE=DATE:20270809','SUMMARY:Mariage d\'Alexia & Julien','LOCATION:Domaine de l\'Abbaye de Vauluisant\\, Courgenay','DESCRIPTION:Nous nous marions !','END:VEVENT','END:VCALENDAR'].join('\r\n');
  var blob = new Blob([ics], {type:'text/calendar;charset=utf-8'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a'); a.href = url; a.download = 'mariage-alexia-julien-2027.ics';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
});
