/* ===== PHÒNG THÍ NGHIỆM TƯƠNG TÁC ===== */
function uniq(arr){ return [...new Set(arr.filter(x=>x!==""))]; }
function parseSet(s){
  return uniq(s.split(/[,;]+/).map(x=>x.trim())).sort((a,b)=>{
    const na=Number(a), nb=Number(b);
    if(!Number.isNaN(na)&&!Number.isNaN(nb)) return na-nb;
    return a.localeCompare(b,'vi');
  });
}
function setStr(a){ return "{"+a.join("; ")+"}"; }

function updateSetLab(){
  const A=parseSet(document.getElementById('setA').value);
  const B=parseSet(document.getElementById('setB').value);
  const AB=A.filter(x=>B.includes(x));
  const AU=uniq([...A,...B]).sort((a,b)=>{
    const na=Number(a),nb=Number(b);
    return (!Number.isNaN(na)&&!Number.isNaN(nb))?na-nb:a.localeCompare(b,'vi');
  });
  const AmB=A.filter(x=>!B.includes(x)), BmA=B.filter(x=>!A.includes(x));
  const Asub=A.every(x=>B.includes(x)), Bsub=B.every(x=>A.includes(x));
  document.getElementById('setResult').innerHTML =
    `<b>A∩B</b> = ${setStr(AB)}<br><b>A∪B</b> = ${setStr(AU)}<br>`+
    `<b>A\\B</b> = ${setStr(AmB)} &nbsp; • &nbsp; <b>B\\A</b> = ${setStr(BmA)}<br>`+
    `<b>A⊂B?</b> ${Asub?'Có':'Không'} &nbsp; • &nbsp; <b>B⊂A?</b> ${Bsub?'Có':'Không'}`;
  document.getElementById('setVennSvg').innerHTML=`
    <circle cx="245" cy="125" r="92" fill="#eaf3faaa" stroke="#3677a8" stroke-width="3"/>
    <circle cx="355" cy="125" r="92" fill="#f1edf7aa" stroke="#735a9d" stroke-width="3"/>
    <text x="180" y="72" fill="#3677a8" font-size="20" font-weight="700">A</text>
    <text x="410" y="72" fill="#735a9d" font-size="20" font-weight="700">B</text>
    <text x="205" y="135" text-anchor="middle" fill="#3677a8" font-size="27" font-weight="800">${AmB.length}</text>
    <text x="300" y="135" text-anchor="middle" fill="#945d12" font-size="27" font-weight="800">${AB.length}</text>
    <text x="395" y="135" text-anchor="middle" fill="#735a9d" font-size="27" font-weight="800">${BmA.length}</text>
    <text x="300" y="235" text-anchor="middle" fill="#657382" font-size="15">Số phần tử ở từng miền</text>`;
}

function updateVennCalc(){
  const a=Number(document.getElementById('nA').value),
        b=Number(document.getElementById('nB').value),
        ab=Number(document.getElementById('nAB').value),
        total=Number(document.getElementById('nTotal').value);
  const onlyA=a-ab, onlyB=b-ab, union=a+b-ab, neither=total-union;
  const valid=[a,b,ab,total].every(Number.isFinite) && a>=0&&b>=0&&ab>=0&&total>=0 &&
    ab<=Math.min(a,b) && union<=total;
  const out=document.getElementById('vennCalcResult');
  if(!valid){
    out.innerHTML='<span class="status-no">Dữ kiện chưa hợp lệ.</span> Cần n(A∩B)≤min(n(A),n(B)) và n(A∪B)≤N.';
  }else{
    out.innerHTML=`<b>n(A∪B)</b> = ${union}<br><b>Chỉ A</b> = ${onlyA} &nbsp; • &nbsp; <b>Chỉ B</b> = ${onlyB}<br><b>Không thuộc A hoặc B</b> = ${neither}`;
  }
  document.getElementById('vennCalcSvg').innerHTML=`
    <rect x="22" y="20" width="556" height="250" rx="16" fill="#fbfcfc" stroke="#dce3e7"/>
    <circle cx="250" cy="140" r="90" fill="#eaf3faaa" stroke="#3677a8" stroke-width="3"/>
    <circle cx="350" cy="140" r="90" fill="#f1edf7aa" stroke="#735a9d" stroke-width="3"/>
    <text x="200" y="146" text-anchor="middle" fill="#3677a8" font-size="25" font-weight="800">${valid?onlyA:'?'}</text>
    <text x="300" y="146" text-anchor="middle" fill="#945d12" font-size="25" font-weight="800">${valid?ab:'?'}</text>
    <text x="400" y="146" text-anchor="middle" fill="#735a9d" font-size="25" font-weight="800">${valid?onlyB:'?'}</text>
    <text x="515" y="55" text-anchor="end" fill="#657382" font-size="17">Ngoài: ${valid?neither:'?'}</text>
    <text x="170" y="75" fill="#3677a8" font-size="18">A</text><text x="420" y="75" fill="#735a9d" font-size="18">B</text>`;
}

function pScale(x){ return 70+(x+3)/10*560; }
function updateParameter(){
  const slider=document.getElementById('mSlider'), number=document.getElementById('mNumber');
  const src=document.activeElement===number?number:slider;
  let m=Number(src.value);
  if(document.activeElement===number) slider.value=m; else number.value=m;
  const left=m-1,right=m+2;
  const subset=(m>=1 && m<3);
  document.getElementById('parameterResult').innerHTML=
    `m = <b>${m.toFixed(1).replace('.0','')}</b> ⇒ A=(${left.toFixed(1).replace('.0','')}; ${right.toFixed(1).replace('.0','')}]<br>`+
    (subset?'<span class="status-ok">A⊂B: ĐÚNG</span>':'<span class="status-no">A⊂B: SAI</span>')+
    ' &nbsp; • &nbsp; Điều kiện tổng quát: <b>1≤m&lt;3</b>';
  const x0=pScale(0),x5=pScale(5),xL=pScale(left),xR=pScale(right);
  document.getElementById('parameterSvg').innerHTML=`
    <text x="30" y="52" fill="#076a6d" font-size="18" font-weight="700">B=[0;5)</text>
    <line x1="65" y1="80" x2="640" y2="80" stroke="#788792" stroke-width="3"/>
    <line x1="${x0}" y1="80" x2="${x5}" y2="80" stroke="#0b8b8f" stroke-width="10"/>
    <circle cx="${x0}" cy="80" r="8" fill="#0b8b8f"/><circle cx="${x5}" cy="80" r="8" fill="#fff" stroke="#0b8b8f" stroke-width="4"/>
    <text x="30" y="160" fill="#604880" font-size="18" font-weight="700">A=(m−1;m+2]</text>
    <line x1="65" y1="190" x2="640" y2="190" stroke="#788792" stroke-width="3"/>
    <line x1="${xL}" y1="190" x2="${xR}" y2="190" stroke="${subset?'#3b805c':'#b34f4f'}" stroke-width="10"/>
    <circle cx="${xL}" cy="190" r="8" fill="#fff" stroke="${subset?'#3b805c':'#b34f4f'}" stroke-width="4"/>
    <circle cx="${xR}" cy="190" r="8" fill="${subset?'#3b805c':'#b34f4f'}"/>
    <text x="${x0}" y="110" text-anchor="middle" font-size="14">0</text>
    <text x="${x5}" y="110" text-anchor="middle" font-size="14">5</text>
    <text x="${xL}" y="224" text-anchor="middle" font-size="14">${left.toFixed(1).replace('.0','')}</text>
    <text x="${xR}" y="224" text-anchor="middle" font-size="14">${right.toFixed(1).replace('.0','')}</text>`;
}

function intervalObj(prefix){
  return {
    l:Number(document.getElementById(prefix+'L').value),
    r:Number(document.getElementById(prefix+'R').value),
    lc:document.getElementById(prefix+'LC').value==='1',
    rc:document.getElementById(prefix+'RC').value==='1'
  };
}
function fmtNum(x){ return Number.isInteger(x)?String(x):String(Number(x.toFixed(2))); }
function isEmptyI(I){ return I.l>I.r || (I.l===I.r && !(I.lc&&I.rc)); }
function fmtInterval(I){
  if(!I || isEmptyI(I)) return '∅';
  if(I.singleton || (I.l===I.r && I.lc&&I.rc)) return `{${fmtNum(I.l)}}`;
  return `${I.lc?'[':'('}${fmtNum(I.l)};${fmtNum(I.r)}${I.rc?']':')'}`;
}
function intersectI(A,B){
  if(isEmptyI(A)||isEmptyI(B)) return null;
  const l=Math.max(A.l,B.l), r=Math.min(A.r,B.r);
  let lc,rc;
  if(A.l>B.l) lc=A.lc; else if(B.l>A.l) lc=B.lc; else lc=A.lc&&B.lc;
  if(A.r<B.r) rc=A.rc; else if(B.r<A.r) rc=B.rc; else rc=A.rc&&B.rc;
  if(l<r) return {l,r,lc,rc};
  if(l===r && lc && rc) return {l,r,lc:true,rc:true,singleton:true};
  return null;
}
function unionI(A,B){
  const aEmpty=isEmptyI(A), bEmpty=isEmptyI(B);
  if(aEmpty&&bEmpty) return [];
  if(aEmpty) return [B];
  if(bEmpty) return [A];
  const first=(A.l<B.l || (A.l===B.l&&A.lc))?A:B;
  const second=first===A?B:A;
  const inter=intersectI(A,B);
  const touch=first.r===second.l && (first.rc||second.lc);
  if(inter||touch){
    const l=Math.min(A.l,B.l), r=Math.max(A.r,B.r);
    const lc=A.l<B.l?A.lc:B.l<A.l?B.lc:(A.lc||B.lc);
    const rc=A.r>B.r?A.rc:B.r>A.r?B.rc:(A.rc||B.rc);
    return [{l,r,lc,rc}];
  }
  return [first,second];
}
function scaleForIntervals(x,min,max){ return 70+(x-min)/(max-min)*560; }
function updateIntervals(){
  const A=intervalObj('a'),B=intervalObj('b');
  const out=document.getElementById('intervalResult');
  if(!(A.l<=A.r && B.l<=B.r)){
    out.innerHTML='<span class="status-no">Đầu trái phải nhỏ hơn hoặc bằng đầu phải.</span>';return;
  }
  const I=intersectI(A,B), U=unionI(A,B);
  out.innerHTML=`<b>A</b> = ${fmtInterval(A)} &nbsp; • &nbsp; <b>B</b> = ${fmtInterval(B)}<br>`+
    `<b>A∩B</b> = ${I?fmtInterval(I):'∅'}<br>`+
    `<b>A∪B</b> = ${U.length?U.map(fmtInterval).join(' ∪ '):'∅'}`;
  let min=Math.min(A.l,B.l)-1,max=Math.max(A.r,B.r)+1;if(min===max){min--;max++}
  const draw=(J,y,color)=>{
    if(!J || isEmptyI(J)) return '';
    const x1=scaleForIntervals(J.l,min,max),x2=scaleForIntervals(J.r,min,max);
    if(J.l===J.r) return `<circle cx="${x1}" cy="${y}" r="8" fill="${color}" stroke="${color}" stroke-width="4"/>`;
    return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="10"/>
      <circle cx="${x1}" cy="${y}" r="8" fill="${J.lc?color:'#fff'}" stroke="${color}" stroke-width="4"/>
      <circle cx="${x2}" cy="${y}" r="8" fill="${J.rc?color:'#fff'}" stroke="${color}" stroke-width="4"/>`;
  };
  let ticks='';
  for(let i=Math.ceil(min);i<=Math.floor(max);i++) ticks+=`<text x="${scaleForIntervals(i,min,max)}" y="292" text-anchor="middle" font-size="12" fill="#657382">${i}</text>`;
  document.getElementById('intervalSvg').innerHTML=`
    <text x="25" y="52" fill="#3677a8" font-size="18" font-weight="700">A</text><line x1="60" y1="75" x2="640" y2="75" stroke="#c0cbd1" stroke-width="2"/>${draw(A,75,'#3677a8')}
    <text x="25" y="142" fill="#735a9d" font-size="18" font-weight="700">B</text><line x1="60" y1="165" x2="640" y2="165" stroke="#c0cbd1" stroke-width="2"/>${draw(B,165,'#735a9d')}
    <text x="25" y="232" fill="#945d12" font-size="18" font-weight="700">A∩B</text><line x1="60" y1="255" x2="640" y2="255" stroke="#c0cbd1" stroke-width="2"/>${I?draw(I,255,'#f09a27'):''}
    ${ticks}`;
}
function updateNegation(){
  const q=document.getElementById('qQuant').value,
        d=document.getElementById('qDomain').value,
        rel=document.getElementById('qRel').value,
        val=document.getElementById('qValue').value;
  const map={'>':'≤','>=':'<','<':'≥','<=':'>','=':'≠','!=':'='};
  const show={'>':'>','>=':'≥','<':'<','<=':'≤','=':'=','!=':'≠'};
  const qText=q==='all'?'∀':q==='exists'?'∃':'';
  const nqText=q==='all'?'∃':q==='exists'?'∀':'';
  const original=q==='none'?`x ${show[rel]} ${val}`:`${qText}x∈${d}, x ${show[rel]} ${val}`;
  const neg=q==='none'?`x ${map[rel]} ${val}`:`${nqText}x∈${d}, x ${map[rel]} ${val}`;
  document.getElementById('negationResult').innerHTML=`Mệnh đề: <b>${original}</b><br>Phủ định: <b>${neg}</b>`;
}

let randomState=null;
function randInt(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function newRandomQuestion(){
  const type=Math.random()<0.55?'interval':'venn';
  if(type==='interval'){
    let a=randInt(-5,2), b=randInt(a+1,a+6), c=randInt(-4,4), d=randInt(c+1,c+6);
    const A={l:a,r:b,lc:Math.random()<.5,rc:Math.random()<.5};
    const B={l:c,r:d,lc:Math.random()<.5,rc:Math.random()<.5};
    const I=intersectI(A,B);
    randomState={type,answer:I?fmtInterval(I):'∅',A,B};
    document.getElementById('randomQuestion').textContent=`Tính A∩B với A=${fmtInterval(A)}, B=${fmtInterval(B)}.`;
  }else{
    let ab=randInt(3,12), onlyA=randInt(4,15), onlyB=randInt(4,15), neither=randInt(0,8);
    let a=onlyA+ab,b=onlyB+ab,total=onlyA+onlyB+ab+neither;
    randomState={type,answer:String(neither),a,b,ab,total};
    document.getElementById('randomQuestion').textContent=`Một lớp có ${total} học sinh; ${a} em thuộc A, ${b} em thuộc B, ${ab} em thuộc cả hai. Có bao nhiêu em không thuộc A hoặc B?`;
  }
  document.getElementById('randomAnswer').value='';
  const f=document.getElementById('randomFeedback');f.style.display='none';f.textContent='';
}
function normalizeAns(s){return s.replace(/\s+/g,'').replace(/,/g,';').toLowerCase()}
function checkRandomAnswer(){
  if(!randomState){newRandomQuestion();return}
  const user=normalizeAns(document.getElementById('randomAnswer').value);
  const ans=normalizeAns(randomState.answer);
  const f=document.getElementById('randomFeedback');f.style.display='block';
  if(user===ans){f.innerHTML='<span class="status-ok">Chính xác.</span>'}
  else{f.innerHTML='<span class="status-no">Chưa đúng.</span> Hãy kiểm tra lại đầu mút hoặc công thức đếm.'}
}
function showRandomSolution(){
  if(!randomState){newRandomQuestion();return}
  const f=document.getElementById('randomFeedback');f.style.display='block';
  if(randomState.type==='interval'){
    f.innerHTML=`Đáp án: <b>${randomState.answer}</b>. Lấy đầu trái lớn hơn, đầu phải nhỏ hơn; đầu mút chỉ được lấy khi thuộc cả hai khoảng.`;
  }else{
    const union=randomState.a+randomState.b-randomState.ab;
    f.innerHTML=`n(A∪B)=${randomState.a}+${randomState.b}−${randomState.ab}=${union}. Không thuộc nhóm nào: ${randomState.total}−${union}=<b>${randomState.answer}</b>.`;
  }
}

['setA','setB'].forEach(id=>document.getElementById(id)?.addEventListener('input',updateSetLab));
['nA','nB','nAB','nTotal'].forEach(id=>document.getElementById(id)?.addEventListener('input',updateVennCalc));
document.getElementById('mSlider')?.addEventListener('input',updateParameter);
document.getElementById('mNumber')?.addEventListener('input',updateParameter);
['aL','aR','aLC','aRC','bL','bR','bLC','bRC'].forEach(id=>document.getElementById(id)?.addEventListener('input',updateIntervals));
['qQuant','qDomain','qRel','qValue'].forEach(id=>document.getElementById(id)?.addEventListener('input',updateNegation));

if(document.getElementById('setA')){
  updateSetLab(); updateVennCalc(); updateParameter(); updateIntervals(); updateNegation();
}
