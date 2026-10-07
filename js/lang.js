// Bascule FR / PT, mémorisée dans le navigateur
var langBtns = document.querySelectorAll('[data-set-lang]');
function setLang(l){
  document.documentElement.setAttribute('data-lang', l);
  document.documentElement.setAttribute('lang', l);
  langBtns.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-set-lang') === l); });
  try{ localStorage.setItem('lang', l); }catch(e){}
}
langBtns.forEach(function(b){ b.addEventListener('click', function(){ setLang(b.getAttribute('data-set-lang')); }); });
try{ var sl = localStorage.getItem('lang'); if(sl === 'fr' || sl === 'pt') setLang(sl); }catch(e){}
