(async function(){
  try{
    if(document.getElementById('nang-cao')) return;

    if(!document.querySelector('link[href="v5/advanced.css"]')){
      const link=document.createElement('link');
      link.rel='stylesheet';
      link.href='v5/advanced.css';
      document.head.appendChild(link);
    }

    const res=await fetch('v5/advanced.html',{cache:'no-store'});
    if(!res.ok) throw new Error('Không tải được phần nâng cao');
    const html=await res.text();
    const target=document.getElementById('cuoi-chuong');
    if(!target) throw new Error('Không tìm thấy phần luyện cuối chương');
    target.insertAdjacentHTML('beforebegin',html);

    document.querySelectorAll('#nang-cao.fade,#phong-thi-nghiem.fade').forEach(el=>el.classList.add('show'));

    const nav=document.querySelector('.navin');
    if(nav && !nav.querySelector('a[href="#nang-cao"]')){
      const a1=document.createElement('a'); a1.href='#nang-cao'; a1.textContent='Nâng cao';
      const a2=document.createElement('a'); a2.href='#phong-thi-nghiem'; a2.textContent='Tương tác';
      const firstButton=nav.querySelector('button');
      nav.insertBefore(a1,firstButton||null); nav.insertBefore(a2,firstButton||null);
    }

    const script=document.createElement('script');
    script.src='v5/advanced.js';
    script.defer=true;
    document.body.appendChild(script);
  }catch(err){
    console.error('V5 loader:',err);
  }
})();
