const toggle=document.querySelector('.nav-toggle');
const nav=document.querySelector('.nav');
function setNavOpen(open){
  if(!toggle || !nav)return;
  nav.classList.toggle('open',open);
  toggle.setAttribute('aria-expanded',String(open));
  toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
  toggle.textContent=open?'✕':'☰';
}
if(toggle&&nav){
  toggle.addEventListener('click',()=>setNavOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setNavOpen(false)));
  document.addEventListener('keydown',e=>{if(e.key==='Escape' && nav.classList.contains('open')){setNavOpen(false);toggle.focus()}});
  document.addEventListener('pointerdown',e=>{if(nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target))setNavOpen(false)});
  window.addEventListener('resize',()=>{if(window.innerWidth>1180)setNavOpen(false)});
}
document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');const cat=btn.dataset.category;document.querySelectorAll('.menu-card').forEach(c=>{c.hidden=cat!=='all'&&c.dataset.category!==cat})}));
const dialog=document.getElementById('menuDialog');document.getElementById('openMenu').addEventListener('click',()=>dialog.showModal());document.getElementById('closeMenu').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}},{threshold:.13});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));


// Pause the cylindrical photo ribbon when it is outside the viewport.
const galleryFrame = document.querySelector('.menu-3d-frame');
if (galleryFrame && 'IntersectionObserver' in window) {
  const galleryVisibility = new IntersectionObserver(entries => {
    entries.forEach(entry => galleryFrame.classList.toggle('gallery-offscreen', !entry.isIntersecting));
  }, {threshold: 0.05});
  galleryVisibility.observe(galleryFrame);
}
// Original THEO photographs in a keyboard-accessible full-size lightbox.
const photoDialog = document.getElementById('photoDialog');
const dialogPhoto = document.getElementById('photoDialogImage');
const dialogCaption = document.getElementById('photoDialogCaption');
if (photoDialog && dialogPhoto && dialogCaption) {
  document.querySelectorAll('.gallery-grid figure').forEach(figure => {
    const img = figure.querySelector('img');
    const caption = figure.querySelector('figcaption');
    if (!img) return;
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Enlarge photo: ' + img.alt);
    trigger.addEventListener('click', () => {
      dialogPhoto.src = img.currentSrc || img.src;
      dialogPhoto.alt = img.alt;
      dialogCaption.textContent = caption ? caption.textContent : 'THEO Kitchen & Bar';
      photoDialog.showModal();
    });
    figure.appendChild(trigger);
  });
  document.getElementById('closePhoto').addEventListener('click', () => photoDialog.close());
  photoDialog.addEventListener('click', event => { if (event.target === photoDialog) photoDialog.close(); });
}
