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

// Carrousel : points de pagination cliquables, synchronisés avec le défilement
(function(){
  var g = document.querySelector('.gallery'), box = document.getElementById('gallery-dots');
  if(!g || !box) return;
  var figs = g.querySelectorAll('figure'), dots = [];
  figs.forEach(function(f, i){
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', 'Photo ' + (i + 1) + ' / ' + figs.length);
    b.addEventListener('click', function(){ g.scrollTo({left: f.offsetLeft - g.offsetLeft - 16, behavior: 'smooth'}); });
    box.appendChild(b); dots.push(b);
  });
  function update(){
    var atEnd = g.scrollLeft + g.clientWidth >= g.scrollWidth - 4, cur = 0, best = 1e9;
    figs.forEach(function(f, i){
      var d = Math.abs((f.offsetLeft - g.offsetLeft - 16) - g.scrollLeft);
      if(d < best){ best = d; cur = i; }
    });
    if(atEnd) cur = figs.length - 1;
    dots.forEach(function(b, i){ if(i === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
  }
  g.addEventListener('scroll', function(){ window.requestAnimationFrame(update); }, {passive: true});
  window.addEventListener('resize', update);
  update();
})();
