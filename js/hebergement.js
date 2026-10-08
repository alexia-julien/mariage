// Logements déjà consultés : dès qu'un invité clique sur un lien d'un logement
// (téléphone, site, carte…), on le marque « Déjà consulté ». Mémorisé uniquement
// dans le navigateur de l'invité (localStorage), rien n'est envoyé ailleurs.
(function(){
  var KEY = 'hebergements-vus';
  var list = document.querySelector('.stay-list');
  if(!list) return;
  var stays = list.querySelectorAll('.stay[id]');
  var reset = document.getElementById('seen-reset');

  function load(){
    try{ var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; }
    catch(e){ return []; }
  }
  function save(ids){ try{ localStorage.setItem(KEY, JSON.stringify(ids)); }catch(e){} }

  function render(){
    var seen = load();
    stays.forEach(function(s){
      var on = seen.indexOf(s.id) !== -1;
      s.classList.toggle('is-seen', on);
      var badge = s.querySelector('.seen-badge');
      if(on && !badge){
        badge = document.createElement('span');
        badge.className = 'seen-badge';
        badge.innerHTML = '<span class="fr">Déjà consulté</span><span class="pt">Já visto</span>';
        s.querySelector('.stay-name').appendChild(badge);
      } else if(!on && badge){ badge.remove(); }
    });
    if(reset) reset.hidden = seen.length === 0;
  }

  function mark(e){
    var a = e.target.closest('a');
    var s = a && a.closest('.stay[id]');
    if(!s) return;
    var seen = load();
    if(seen.indexOf(s.id) === -1){ seen.push(s.id); save(seen); }
    render();
  }
  list.addEventListener('click', mark);
  list.addEventListener('auxclick', mark); // clic molette (nouvel onglet)

  if(reset) reset.addEventListener('click', function(){ save([]); render(); });
  window.addEventListener('storage', function(e){ if(e.key === KEY) render(); });
  render();
})();
