// Menu mobile
const menu=document.getElementById('menu');
document.getElementById('burger').addEventListener('click',()=>menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.remove('open')));

// Tab pencarian (Project / Fasilitas)
let target='project';
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');target=t.dataset.target;
  const sel=document.getElementById('fCat');
  sel.innerHTML=target==='project'
    ?'<option value="">Semua Kategori</option><option value="web">Website</option><option value="ebook">E-Book</option>'
    :'<option value="">Semua Kategori</option><option value="ruang">Ruang</option>';
}));

// Pencarian: filter kartu
document.getElementById('searchForm').addEventListener('submit',e=>{
  e.preventDefault();
  const k=document.getElementById('keyword').value.toLowerCase().trim();
  const cat=document.getElementById('fCat').value;
  const items=document.querySelectorAll(target==='project'?'#carousel .card':'#fasilitasGrid .tile');
  let n=0;
  items.forEach(c=>{
    const ok=(!k||c.dataset.title.includes(k))&&(!cat||c.dataset.cat===cat);
    c.classList.toggle('hide',!ok);if(ok)n++;
  });
  document.getElementById('searchMsg').textContent=n?`${n} hasil ditemukan.`:'Tidak ada hasil yang cocok.';
  document.getElementById(target).scrollIntoView({behavior:'smooth'});
});

// Carousel
const car=document.getElementById('carousel');
const step=()=>{const c=car.querySelector('.card:not(.hide)');return c?c.offsetWidth+20:300};
document.getElementById('next').onclick=()=>car.scrollBy({left:step(),behavior:'smooth'});
document.getElementById('prev').onclick=()=>car.scrollBy({left:-step(),behavior:'smooth'});

// Peran & ruang lingkup
const peran=[
  ['Kolaborasi Industri dan Akademik','Membangun serta mengembangkan kemitraan dengan perguruan tinggi.'],
  ['Pengembangan Kompetensi','Memberikan kesempatan kepada mahasiswa untuk memperoleh pengalaman dan keterampilan melalui kegiatan berbasis industri.'],
  ['Pengembangan Layanan Digital','Mengelola dan mengembangkan layanan berbasis website untuk mendukung kebutuhan operasional dan fasilitas perusahaan.'],
  ['Inovasi dan Pengembangan','Mendorong pengembangan ide, produk, dan solusi yang dapat memberikan manfaat bagi perusahaan.']
];
const dEl=document.getElementById('peranDetail');
function showPeran(i){
  dEl.querySelector('h3').textContent=peran[i][0];
  dEl.querySelector('p').textContent=peran[i][1];
  document.querySelectorAll('.cat').forEach((c,j)=>c.classList.toggle('active',i===j));
}
document.querySelectorAll('.cat').forEach(c=>c.addEventListener('click',()=>showPeran(+c.dataset.i)));
showPeran(0);

// Menu aktif saat scroll
const links=document.querySelectorAll('.menu a');
const secs=['home','tentang','peran','fasilitas','program','project','mitra'];
window.addEventListener('scroll',()=>{
  let cur='home';
  secs.forEach(id=>{const s=document.getElementById(id);if(s&&scrollY>=s.offsetTop-140)cur=id});
  links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// Hitung angka statistik
document.addEventListener('DOMContentLoaded', () => {
  const stats = document.querySelector('.stats');

  if (!stats) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counters = entry.target.querySelectorAll('[data-count]');

      counters.forEach(el => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const value = Math.floor(progress * target);

          el.textContent = value + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
      });

      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.2
  });

  observer.observe(stats);
});