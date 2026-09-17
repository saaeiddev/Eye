(() => {
  'use strict';

  const copy = {
    en: {
      kicker:'Advanced Eye Lab', heading:'Explore vision beyond anatomy', intro:'Follow light through the eye, zoom into the retina, compare common visual disorders, explore eye muscles and trace the signal into the visual cortex.',
      pathway:'Vision Pathway', pathwayText:'Watch light travel from the cornea to the retina, then continue as a neural signal through the optic nerve toward the brain.', play:'Play pathway', pause:'Pause', cornea:'Cornea', pupil:'Pupil', lens:'Lens', retina:'Retina', optic:'Optic nerve', brain:'Visual cortex',
      retinaTitle:'Retina Explorer', retinaText:'Select a retinal layer to see how light-sensitive and neural cells work together.', rods:'Rods', cones:'Cones', bipolar:'Bipolar cells', ganglion:'Ganglion cells', photoreceptorInfo:'Rods support dim-light vision; cones support color and fine detail.', bipolarInfo:'Bipolar cells relay processed signals from photoreceptors toward ganglion cells.', ganglionInfo:'Ganglion-cell axons leave the eye together and form the optic nerve.',
      disorders:'Eye Disorders', disordersText:'Compare a normal view with simplified simulations of common optical and ocular conditions.', normal:'Normal vision', simulated:'Simulated view', myopia:'Myopia', hyperopia:'Hyperopia', astigmatism:'Astigmatism', cataract:'Cataract', glaucoma:'Glaucoma',
      muscles:'Eye Muscles', musclesText:'Choose one of the six extraocular muscles and see the direction it helps move the eye.', superiorRectus:'Superior rectus', inferiorRectus:'Inferior rectus', medialRectus:'Medial rectus', lateralRectus:'Lateral rectus', superiorOblique:'Superior oblique', inferiorOblique:'Inferior oblique',
      cortex:'Eye → Visual Cortex', cortexText:'Trace the visual signal from both eyes through the optic nerves, optic chiasm and finally into the occipital visual cortex.', activate:'Run neural signal', cortexStatus:'Signal reaches the visual cortex in the occipital lobe.', neurovista:'Continue to NeuroVista Atlas ↗'
    },
    fa: {
      kicker:'آزمایشگاه پیشرفته چشم', heading:'فراتر از آناتومی، بینایی را بررسی کن', intro:'مسیر نور در چشم را دنبال کن، وارد شبکیه شو، اختلالات رایج بینایی را مقایسه کن، عضلات چشم را ببین و مسیر سیگنال را تا قشر بینایی مغز دنبال کن.',
      pathway:'مسیر بینایی', pathwayText:'حرکت نور از قرنیه تا شبکیه و سپس تبدیل آن به پیام عصبی و عبور از عصب بینایی به سمت مغز را ببین.', play:'اجرای مسیر', pause:'توقف', cornea:'قرنیه', pupil:'مردمک', lens:'عدسی', retina:'شبکیه', optic:'عصب بینایی', brain:'قشر بینایی',
      retinaTitle:'کاوشگر شبکیه', retinaText:'هر لایه از شبکیه را انتخاب کن تا نقش سلول‌های حساس به نور و سلول‌های عصبی را ببینی.', rods:'سلول‌های استوانه‌ای', cones:'سلول‌های مخروطی', bipolar:'سلول‌های دوقطبی', ganglion:'سلول‌های گانگلیونی', photoreceptorInfo:'سلول‌های استوانه‌ای در نور کم فعال‌ترند و مخروط‌ها مسئول رنگ و جزئیات دقیق هستند.', bipolarInfo:'سلول‌های دوقطبی پیام پردازش‌شده گیرنده‌های نوری را به سلول‌های گانگلیونی منتقل می‌کنند.', ganglionInfo:'آکسون‌های سلول‌های گانگلیونی کنار هم عصب بینایی را تشکیل می‌دهند.',
      disorders:'اختلالات چشم', disordersText:'دید طبیعی را با شبیه‌سازی ساده‌شده چند اختلال شایع بینایی مقایسه کن.', normal:'دید طبیعی', simulated:'دید شبیه‌سازی‌شده', myopia:'نزدیک‌بینی', hyperopia:'دوربینی', astigmatism:'آستیگماتیسم', cataract:'آب مروارید', glaucoma:'گلوکوم',
      muscles:'عضلات چشم', musclesText:'یکی از شش عضله خارج‌چشمی را انتخاب کن و جهت حرکتی که ایجاد می‌کند ببین.', superiorRectus:'راست فوقانی', inferiorRectus:'راست تحتانی', medialRectus:'راست داخلی', lateralRectus:'راست خارجی', superiorOblique:'مایل فوقانی', inferiorOblique:'مایل تحتانی',
      cortex:'چشم ← قشر بینایی', cortexText:'مسیر پیام بینایی از هر دو چشم، عصب‌های بینایی، کیاسمای بینایی و در نهایت قشر بینایی پس‌سری را دنبال کن.', activate:'اجرای پیام عصبی', cortexStatus:'پیام عصبی به قشر بینایی در لوب پس‌سری می‌رسد.', neurovista:'ادامه در NeuroVista Atlas ↗'
    }
  };

  const css = document.createElement('link');
  css.rel='stylesheet'; css.href='./advanced-eye.css?v=20260917-1'; document.head.appendChild(css);

  function lang(){ return document.documentElement.lang === 'fa' ? 'fa' : 'en'; }
  const t=()=>copy[lang()];
  const host=document.querySelector('#anatomy');
  if(!host || document.querySelector('#advancedEye')) return;

  const section=document.createElement('section');
  section.id='advancedEye';
  section.className='section glass advanced-eye';
  host.insertAdjacentElement('afterend',section);

  function render(){
    const x=t();
    section.innerHTML=`
      <div class="section-head"><div><div class="adv-kicker">${x.kicker}</div><h2 style="margin-top:14px">${x.heading}</h2><p>${x.intro}</p></div></div>
      <div class="adv-grid">
        <article class="adv-card wide" id="visionPathway"><h3>${x.pathway}</h3><p>${x.pathwayText}</p><div class="adv-stage"><svg viewBox="0 0 980 260" role="img" aria-label="${x.pathway}"><path class="path-line" d="M80 130 C165 130 190 130 250 130 S360 130 420 130 S540 130 605 130 S720 130 790 130 S870 130 920 130"/><path id="signalPath" class="signal-line" d="M80 130 C165 130 190 130 250 130 S360 130 420 130 S540 130 605 130 S720 130 790 130 S870 130 920 130"/><g><circle class="node hot" cx="80" cy="130" r="28"/><text class="node-label" x="80" y="182" text-anchor="middle">${x.cornea}</text></g><g><circle class="node" cx="250" cy="130" r="24"/><text class="node-label" x="250" y="182" text-anchor="middle">${x.pupil}</text></g><g><ellipse class="node" cx="420" cy="130" rx="25" ry="38"/><text class="node-label" x="420" y="192" text-anchor="middle">${x.lens}</text></g><g><circle class="node" cx="605" cy="130" r="34"/><text class="node-label" x="605" y="192" text-anchor="middle">${x.retina}</text></g><g><rect class="node" x="754" y="111" width="72" height="38" rx="19"/><text class="node-label" x="790" y="182" text-anchor="middle">${x.optic}</text></g><g><path class="node" d="M900 100c38-30 70 5 55 35 28 15 17 58-20 52-14 28-65 20-65-15-30-11-20-59 15-56 1-8 6-13 15-16z"/><text class="node-label" x="914" y="210" text-anchor="middle">${x.brain}</text></g></svg></div><div class="adv-controls"><button class="adv-btn active" id="pathToggle">${x.pause}</button></div></article>
        <article class="adv-card" id="retinaExplorer"><h3>${x.retinaTitle}</h3><p>${x.retinaText}</p><div class="adv-stage"><svg viewBox="0 0 520 280"><rect data-retina="rods" class="retina-layer active" x="40" y="35" width="440" height="52" rx="15" fill="#24566b"/><rect data-retina="bipolar" class="retina-layer" x="40" y="105" width="440" height="52" rx="15" fill="#6c506f"/><rect data-retina="ganglion" class="retina-layer" x="40" y="175" width="440" height="52" rx="15" fill="#69423d"/><g fill="#aef1ff">${Array.from({length:20},(_,i)=>`<circle cx="${55+i*22}" cy="61" r="5"/>`).join('')}</g><g fill="#ffd98c">${Array.from({length:10},(_,i)=>`<path d="M${72+i*42} 48 l7 13 -7 13 -7-13z"/>`).join('')}</g><text class="node-label" x="260" y="266" text-anchor="middle">${x.rods} + ${x.cones}</text></svg><div class="retina-info" id="retinaInfo">${x.photoreceptorInfo}</div></div><div class="adv-controls"><button class="adv-btn active" data-retina-btn="rods">${x.rods} / ${x.cones}</button><button class="adv-btn" data-retina-btn="bipolar">${x.bipolar}</button><button class="adv-btn" data-retina-btn="ganglion">${x.ganglion}</button></div></article>
        <article class="adv-card" id="disorders"><h3>${x.disorders}</h3><p>${x.disordersText}</p><div class="disorder-layout"><div><div class="sim-label">${x.normal}</div><div class="vision-sim"></div></div><div><div class="sim-label">${x.simulated}</div><div class="vision-sim effect-myopia" id="conditionView"></div></div></div><div class="adv-controls">${['myopia','hyperopia','astigmatism','cataract','glaucoma'].map((k,i)=>`<button class="adv-btn ${i===0?'active':''}" data-condition="${k}">${x[k]}</button>`).join('')}</div></article>
        <article class="adv-card" id="muscles"><h3>${x.muscles}</h3><p>${x.musclesText}</p><div class="adv-stage muscle-stage"><div class="muscle-lines"><button class="adv-btn muscle-chip" data-move="0,-16">${x.superiorRectus}</button><button class="adv-btn muscle-chip" data-move="0,16">${x.inferiorRectus}</button><button class="adv-btn muscle-chip" data-move="-18,0">${x.medialRectus}</button><button class="adv-btn muscle-chip" data-move="18,0">${x.lateralRectus}</button><button class="adv-btn muscle-chip" data-move="-12,-10">${x.superiorOblique}</button><button class="adv-btn muscle-chip" data-move="12,10">${x.inferiorOblique}</button></div><div class="muscle-eye" id="muscleEye"></div></div></article>
        <article class="adv-card wide" id="cortexConnection"><h3>${x.cortex}</h3><p>${x.cortexText}</p><div class="adv-stage"><svg viewBox="0 0 980 320"><circle class="node" cx="120" cy="110" r="48"/><circle class="node" cx="120" cy="210" r="48"/><circle fill="#0c1d27" stroke="#b9b8ff" stroke-width="3" cx="390" cy="160" r="22"/><path class="path-line" d="M168 110 C260 110 300 150 390 160 C300 170 260 210 168 210 M412 160 C520 160 585 160 650 160"/><path id="cortexSignal" class="signal-line paused" d="M168 110 C260 110 300 150 390 160 C300 170 260 210 168 210 M412 160 C520 160 585 160 650 160"/><path class="cortex-brain" d="M650 90c50-75 165-54 178 25 63-15 96 74 34 109-15 78-133 85-165 27-77 9-101-95-47-122z"/><path id="visualCortex" class="visual-cortex" d="M825 125c40 12 50 54 28 87-16 25-46 36-73 29 25-24 36-61 22-91 7-11 14-19 23-25z"/><text class="node-label" x="120" y="54" text-anchor="middle">${x.retina}</text><text class="node-label" x="390" y="205" text-anchor="middle">Optic chiasm</text><text class="node-label" x="812" y="272" text-anchor="middle">${x.brain}</text></svg></div><div class="adv-controls"><button class="adv-btn" id="cortexBtn">${x.activate}</button></div><div class="status-strip" id="cortexStatus" hidden>${x.cortexStatus}</div><a class="brain-link" href="https://saaeiddev.github.io/Neuro-Vista/neurovista-atlas/#/" target="_blank" rel="noopener">${x.neurovista}</a></article>
      </div>`;
    bind();
  }

  function bind(){
    const x=t();
    const toggle=section.querySelector('#pathToggle');
    const signal=section.querySelector('#signalPath');
    toggle?.addEventListener('click',()=>{const paused=signal.classList.toggle('paused');toggle.textContent=paused?x.play:x.pause;toggle.classList.toggle('active',!paused)});

    section.querySelectorAll('[data-retina-btn]').forEach(btn=>btn.addEventListener('click',()=>{
      section.querySelectorAll('[data-retina-btn]').forEach(b=>b.classList.remove('active'));
      section.querySelectorAll('[data-retina]').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active'); const key=btn.dataset.retinaBtn; section.querySelector(`[data-retina="${key}"]`)?.classList.add('active');
      const info=section.querySelector('#retinaInfo'); if(info) info.textContent=key==='bipolar'?x.bipolarInfo:key==='ganglion'?x.ganglionInfo:x.photoreceptorInfo;
    }));

    section.querySelectorAll('[data-condition]').forEach(btn=>btn.addEventListener('click',()=>{
      section.querySelectorAll('[data-condition]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      const view=section.querySelector('#conditionView'); view.className=`vision-sim effect-${btn.dataset.condition}`;
    }));

    section.querySelectorAll('[data-move]').forEach(btn=>btn.addEventListener('click',()=>{
      section.querySelectorAll('[data-move]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
      const [xv,yv]=btn.dataset.move.split(',').map(Number);const eye=section.querySelector('#muscleEye'); eye.style.transform=`translate(${xv}px,${yv}px) rotate(${xv*.18}deg)`;
    }));

    section.querySelector('#cortexBtn')?.addEventListener('click',()=>{
      const line=section.querySelector('#cortexSignal'); const visual=section.querySelector('#visualCortex'); const status=section.querySelector('#cortexStatus');
      line.classList.remove('paused'); visual.classList.add('active'); status.hidden=false;
      setTimeout(()=>line.classList.add('paused'),3600);
    });
  }

  render();
  new MutationObserver(muts=>{if(muts.some(m=>m.attributeName==='lang')) render();}).observe(document.documentElement,{attributes:true});
})();