(() => {
  'use strict';

  const copy = {
    en: {
      kicker:'Advanced Eye Lab', heading:'Explore vision beyond anatomy', intro:'Follow light through the eye, zoom into the retina, compare common visual disorders, explore the extraocular muscles and trace the signal into the visual cortex.',
      pathway:'Vision Pathway', pathwayText:'Watch light refract at the cornea and lens, converge on the retina, then continue as an electrical signal through the optic nerve toward the brain.', play:'Play pathway', pause:'Pause', cornea:'Cornea', iris:'Iris', lens:'Lens', retina:'Retina', optic:'Optic nerve', brain:'Visual cortex', light:'Incoming light', neural:'Neural signal',
      retinaTitle:'Retina Explorer', retinaText:'Explore a layered retinal micro-view showing photoreceptors, bipolar cells and ganglion cells as a connected neural circuit.', rods:'Rods', cones:'Cones', bipolar:'Bipolar cells', ganglion:'Ganglion cells', photoreceptorInfo:'Rods are numerous and highly sensitive in dim light. Cones are concentrated toward the macula and support color and fine detail.', bipolarInfo:'Bipolar cells form an intermediate relay between photoreceptors and ganglion cells while horizontal and amacrine networks refine the signal.', ganglionInfo:'Ganglion cells generate action potentials. Their axons run across the retinal surface and gather at the optic disc to form the optic nerve.',
      disorders:'Eye Disorders', disordersText:'Compare normal vision with a more natural scene simulation of common optical and ocular conditions.', normal:'Normal vision', simulated:'Simulated view', myopia:'Myopia', hyperopia:'Hyperopia', astigmatism:'Astigmatism', cataract:'Cataract', glaucoma:'Glaucoma',
      muscles:'Eye Muscles', musclesText:'Select an extraocular muscle to highlight its anatomical path and see the primary direction of eye movement it contributes to.', superiorRectus:'Superior rectus', inferiorRectus:'Inferior rectus', medialRectus:'Medial rectus', lateralRectus:'Lateral rectus', superiorOblique:'Superior oblique', inferiorOblique:'Inferior oblique',
      cortex:'Eye → Visual Cortex', cortexText:'Trace signals from both retinas through the optic nerves, partial crossing at the optic chiasm, the lateral geniculate nucleus and optic radiations into the occipital visual cortex.', activate:'Run neural signal', cortexStatus:'The signal reaches the primary visual cortex in the occipital lobe.', neurovista:'Continue to NeuroVista Atlas ↗', chiasm:'Optic chiasm', lgn:'LGN', radiations:'Optic radiations'
    },
    fa: {
      kicker:'آزمایشگاه پیشرفته چشم', heading:'فراتر از آناتومی، بینایی را بررسی کن', intro:'مسیر نور در چشم را دنبال کن، وارد ساختار لایه‌ای شبکیه شو، اختلالات رایج بینایی را مقایسه کن، عضلات خارج‌چشمی را ببین و مسیر پیام را تا قشر بینایی مغز دنبال کن.',
      pathway:'مسیر بینایی', pathwayText:'شکست نور در قرنیه و عدسی، تمرکز آن روی شبکیه و سپس تبدیل آن به پیام الکتریکی و عبور از عصب بینایی به سمت مغز را ببین.', play:'اجرای مسیر', pause:'توقف', cornea:'قرنیه', iris:'عنبیه', lens:'عدسی', retina:'شبکیه', optic:'عصب بینایی', brain:'قشر بینایی', light:'نور ورودی', neural:'پیام عصبی',
      retinaTitle:'کاوشگر شبکیه', retinaText:'یک نمای میکروسکوپی چندلایه از شبکیه را ببین و ارتباط گیرنده‌های نوری، سلول‌های دوقطبی و گانگلیونی را دنبال کن.', rods:'سلول‌های استوانه‌ای', cones:'سلول‌های مخروطی', bipolar:'سلول‌های دوقطبی', ganglion:'سلول‌های گانگلیونی', photoreceptorInfo:'سلول‌های استوانه‌ای بسیار زیاد و در نور کم حساس‌اند. مخروط‌ها به‌خصوص در ناحیه ماکولا متراکم‌ترند و در تشخیص رنگ و جزئیات نقش دارند.', bipolarInfo:'سلول‌های دوقطبی میان گیرنده‌های نوری و سلول‌های گانگلیونی ارتباط برقرار می‌کنند و شبکه سلول‌های افقی و آماکرین پیام را تنظیم می‌کند.', ganglionInfo:'سلول‌های گانگلیونی پتانسیل عمل ایجاد می‌کنند. آکسون‌های آن‌ها روی سطح شبکیه حرکت کرده و در دیسک بینایی، عصب بینایی را تشکیل می‌دهند.',
      disorders:'اختلالات چشم', disordersText:'دید طبیعی را با شبیه‌سازی طبیعی‌تر چند اختلال شایع اپتیکی و چشمی مقایسه کن.', normal:'دید طبیعی', simulated:'دید شبیه‌سازی‌شده', myopia:'نزدیک‌بینی', hyperopia:'دوربینی', astigmatism:'آستیگماتیسم', cataract:'آب مروارید', glaucoma:'گلوکوم',
      muscles:'عضلات چشم', musclesText:'یکی از عضلات خارج‌چشمی را انتخاب کن تا مسیر آناتومیک آن و جهت اصلی حرکتی که در آن نقش دارد نمایش داده شود.', superiorRectus:'راست فوقانی', inferiorRectus:'راست تحتانی', medialRectus:'راست داخلی', lateralRectus:'راست خارجی', superiorOblique:'مایل فوقانی', inferiorOblique:'مایل تحتانی',
      cortex:'چشم ← قشر بینایی', cortexText:'مسیر پیام از هر دو شبکیه را از طریق عصب‌های بینایی، تقاطع نسبی در کیاسمای بینایی، هسته زانویی جانبی و تشعشعات بینایی تا قشر بینایی پس‌سری دنبال کن.', activate:'اجرای پیام عصبی', cortexStatus:'پیام به قشر بینایی اولیه در لوب پس‌سری می‌رسد.', neurovista:'ادامه در NeuroVista Atlas ↗', chiasm:'کیاسمای بینایی', lgn:'هسته زانویی جانبی', radiations:'تشعشعات بینایی'
    }
  };

  const css=document.createElement('link');
  css.rel='stylesheet'; css.href='./advanced-eye.css?v=20260917-realistic2'; document.head.appendChild(css);

  function lang(){return document.documentElement.lang==='fa'?'fa':'en'}
  const t=()=>copy[lang()];
  const host=document.querySelector('#anatomy');
  if(!host||document.querySelector('#advancedEye'))return;

  const section=document.createElement('section');
  section.id='advancedEye'; section.className='section glass advanced-eye';
  host.insertAdjacentElement('afterend',section);

  function retinaRods(){return Array.from({length:18},(_,i)=>{
    const x=56+i*24, h=34+(i%3)*5;
    return `<g class="photo-cell rod"><rect x="${x}" y="35" width="7" height="${h}" rx="3.5"/><line x1="${x+3.5}" y1="${35+h}" x2="${x+3.5}" y2="92"/><circle cx="${x+3.5}" cy="98" r="7"/></g>`;
  }).join('')}
  function retinaCones(){return Array.from({length:9},(_,i)=>{
    const x=68+i*48;
    return `<g class="photo-cell cone"><path d="M${x} 35 l9 36 h-18z"/><line x1="${x}" y1="71" x2="${x}" y2="93"/><circle cx="${x}" cy="100" r="7"/></g>`;
  }).join('')}
  function bipolarCells(){return Array.from({length:10},(_,i)=>{
    const x=62+i*45;
    return `<g class="bipolar-cell"><circle cx="${x}" cy="151" r="7"/><path d="M${x} 144 C${x-8} 132 ${x-5} 119 ${x} 107 M${x} 158 C${x+8} 171 ${x+5} 184 ${x} 196"/><path d="M${x} 135 l-12-9 M${x} 135 l12-9 M${x} 169 l-12 10 M${x} 169 l12 10"/></g>`;
  }).join('')}
  function ganglionCells(){return Array.from({length:7},(_,i)=>{
    const x=76+i*63;
    return `<g class="ganglion-cell"><circle cx="${x}" cy="221" r="11"/><path d="M${x} 210 C${x-14} 196 ${x-12} 183 ${x-4} 174 M${x} 210 C${x+14} 196 ${x+12} 184 ${x+5} 175"/><path class="axon" d="M${x+10} 223 C${x+45} 224 ${x+75} 234 490 236"/></g>`;
  }).join('')}

  function render(){
    const x=t();
    section.innerHTML=`
      <div class="section-head"><div><div class="adv-kicker">${x.kicker}</div><h2 class="adv-heading">${x.heading}</h2><p>${x.intro}</p></div></div>
      <div class="adv-grid">
        <article class="adv-card wide" id="visionPathway">
          <h3>${x.pathway}</h3><p>${x.pathwayText}</p>
          <div class="adv-stage pathway-stage">
            <svg viewBox="0 0 1000 330" role="img" aria-label="${x.pathway}">
              <defs>
                <radialGradient id="eyeWhite" cx="38%" cy="32%"><stop offset="0" stop-color="#fffdf7"/><stop offset=".62" stop-color="#dedad0"/><stop offset="1" stop-color="#94949a"/></radialGradient>
                <radialGradient id="vitGel"><stop offset="0" stop-color="#86d6e8" stop-opacity=".18"/><stop offset="1" stop-color="#2a738d" stop-opacity=".04"/></radialGradient>
                <linearGradient id="lensGlass" x1="0" x2="1"><stop stop-color="#d8fbff" stop-opacity=".2"/><stop offset=".5" stop-color="#e9ffff" stop-opacity=".72"/><stop offset="1" stop-color="#89cdda" stop-opacity=".2"/></linearGradient>
                <linearGradient id="nerveGrad"><stop stop-color="#f0d9b4"/><stop offset="1" stop-color="#b98c65"/></linearGradient>
                <filter id="softGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <g class="eye-cutaway" transform="translate(50 38)">
                <circle cx="170" cy="125" r="105" fill="url(#eyeWhite)" stroke="#e9eef2" stroke-width="4"/>
                <circle cx="170" cy="125" r="92" fill="#5b1825" opacity=".82"/>
                <circle cx="170" cy="125" r="84" fill="#e97860" opacity=".9"/>
                <circle cx="170" cy="125" r="76" fill="url(#vitGel)"/>
                <path d="M91 57 C48 76 44 171 91 193 C73 159 73 91 91 57z" fill="#d9f9ff" fill-opacity=".28" stroke="#bcefff" stroke-width="3"/>
                <path d="M108 74 C94 96 94 154 108 176" fill="none" stroke="#5b8f74" stroke-width="13" stroke-linecap="round"/>
                <ellipse cx="126" cy="125" rx="25" ry="48" fill="url(#lensGlass)" stroke="#d8fbff" stroke-width="2"/>
                <path d="M251 67 A84 84 0 0 1 251 183" fill="none" stroke="#ffb5a0" stroke-width="5"/>
                <path d="M270 118 C302 118 322 126 348 138" fill="none" stroke="url(#nerveGrad)" stroke-width="20" stroke-linecap="round"/>
                <path d="M270 118 C302 118 322 126 348 138" fill="none" stroke="#fff2d6" stroke-opacity=".38" stroke-width="6"/>
                <text class="micro-label" x="61" y="39">${x.cornea}</text>
                <text class="micro-label" x="109" y="65">${x.iris}</text>
                <text class="micro-label" x="112" y="190">${x.lens}</text>
                <text class="micro-label" x="224" y="38">${x.retina}</text>
              </g>
              <g class="light-rays" filter="url(#softGlow)">
                <path d="M8 100 L91 116 L126 125 L249 122"/>
                <path d="M8 125 L91 125 L126 125 L249 122"/>
                <path d="M8 150 L91 134 L126 125 L249 122"/>
              </g>
              <g class="neural-route">
                <path class="neural-base" d="M398 176 C470 182 500 186 548 177 C600 168 629 147 675 149 C737 151 770 184 820 179 C863 175 886 154 916 146"/>
                <path id="signalPath" class="signal-line neural-signal" d="M398 176 C470 182 500 186 548 177 C600 168 629 147 675 149 C737 151 770 184 820 179 C863 175 886 154 916 146"/>
                <text class="node-label" x="478" y="217">${x.optic}</text>
                <text class="micro-label" x="16" y="78">${x.light}</text>
                <text class="micro-label" x="635" y="118">${x.neural}</text>
              </g>
              <g class="brain-profile" transform="translate(866 65)">
                <path d="M35 31c25-34 78-29 92 10 29-8 50 24 34 48 23 23-3 62-31 54-14 28-63 28-75 0-30 10-58-26-39-51-21-20-8-55 19-61z"/>
                <path class="occipital-zone" d="M119 57c26 15 28 49 7 69-9 9-19 13-31 13 8-14 12-31 8-48 4-15 9-26 16-34z"/>
                <text class="node-label" x="85" y="174" text-anchor="middle">${x.brain}</text>
              </g>
            </svg>
          </div>
          <div class="adv-controls"><button class="adv-btn active" id="pathToggle">${x.pause}</button></div>
        </article>

        <article class="adv-card" id="retinaExplorer">
          <h3>${x.retinaTitle}</h3><p>${x.retinaText}</p>
          <div class="adv-stage retina-stage">
            <svg viewBox="0 0 520 285" role="img" aria-label="${x.retinaTitle}">
              <defs><linearGradient id="retinaBg" x1="0" x2="0" y1="0" y2="1"><stop stop-color="#1d3542"/><stop offset=".34" stop-color="#392d48"/><stop offset=".72" stop-color="#442b34"/><stop offset="1" stop-color="#1c2832"/></linearGradient></defs>
              <rect x="16" y="16" width="488" height="248" rx="22" fill="url(#retinaBg)"/>
              <g data-retina="rods" class="retina-network active">${retinaRods()}${retinaCones()}</g>
              <g data-retina="bipolar" class="retina-network">${bipolarCells()}</g>
              <g data-retina="ganglion" class="retina-network">${ganglionCells()}</g>
              <path class="retina-signal" d="M30 238 C150 238 300 238 493 238"/>
              <text class="retina-depth-label" x="26" y="30">RPE</text>
              <text class="retina-depth-label" x="26" y="277">${x.optic} →</text>
            </svg>
            <div class="retina-info" id="retinaInfo">${x.photoreceptorInfo}</div>
          </div>
          <div class="adv-controls"><button class="adv-btn active" data-retina-btn="rods">${x.rods} / ${x.cones}</button><button class="adv-btn" data-retina-btn="bipolar">${x.bipolar}</button><button class="adv-btn" data-retina-btn="ganglion">${x.ganglion}</button></div>
        </article>

        <article class="adv-card" id="disorders">
          <h3>${x.disorders}</h3><p>${x.disordersText}</p>
          <div class="disorder-layout">
            <div class="vision-wrap"><div class="sim-label">${x.normal}</div><div class="vision-sim"><div class="scene-sky"></div><div class="scene-mountains"></div><div class="scene-city"></div><div class="scene-road"></div><div class="scene-sign">EYE LAB</div><div class="scene-leaves"></div></div></div>
            <div class="vision-wrap"><div class="sim-label">${x.simulated}</div><div class="vision-sim effect-myopia" id="conditionView"><div class="scene-sky"></div><div class="scene-mountains"></div><div class="scene-city"></div><div class="scene-road"></div><div class="scene-sign">EYE LAB</div><div class="scene-leaves"></div><div class="condition-overlay"></div></div></div>
          </div>
          <div class="adv-controls">${['myopia','hyperopia','astigmatism','cataract','glaucoma'].map((k,i)=>`<button class="adv-btn ${i===0?'active':''}" data-condition="${k}">${x[k]}</button>`).join('')}</div>
        </article>

        <article class="adv-card" id="muscles">
          <h3>${x.muscles}</h3><p>${x.musclesText}</p>
          <div class="adv-stage muscle-stage">
            <svg viewBox="0 0 560 360" role="img" aria-label="${x.muscles}">
              <defs>
                <radialGradient id="globeGrad" cx="38%" cy="32%"><stop stop-color="#fffdf8"/><stop offset=".68" stop-color="#dedbd1"/><stop offset="1" stop-color="#9f9da0"/></radialGradient>
                <radialGradient id="irisGrad"><stop stop-color="#101214" offset=".2"/><stop stop-color="#47766d" offset=".22"/><stop stop-color="#83a98d" offset=".65"/><stop stop-color="#244844" offset="1"/></radialGradient>
              </defs>
              <path class="orbit-wall" d="M82 61 C180 3 388 4 481 72 C538 114 537 249 474 298 C385 367 185 360 86 296 C20 253 18 105 82 61z"/>
              <g class="muscle-ribbons">
                <path id="m-superiorRectus" class="muscle-ribbon" d="M96 83 C182 72 231 83 276 103 C321 83 378 72 467 85"/>
                <path id="m-inferiorRectus" class="muscle-ribbon" d="M97 279 C180 290 232 277 276 257 C324 280 379 290 466 278"/>
                <path id="m-medialRectus" class="muscle-ribbon" d="M92 174 C164 144 212 146 241 164"/>
                <path id="m-lateralRectus" class="muscle-ribbon" d="M468 174 C394 145 348 147 319 164"/>
                <path id="m-superiorOblique" class="muscle-ribbon oblique" d="M109 62 C178 35 237 54 255 98 C267 116 251 137 229 134"/>
                <path id="m-inferiorOblique" class="muscle-ribbon oblique" d="M119 298 C183 325 232 298 252 260 C268 229 249 210 226 219"/>
              </g>
              <g id="globeGroup" class="globe-group">
                <circle cx="280" cy="180" r="92" fill="url(#globeGrad)" stroke="#f5f3eb" stroke-width="3"/>
                <circle class="iris-disc" cx="280" cy="180" r="32" fill="url(#irisGrad)"/>
                <circle cx="280" cy="180" r="12" fill="#020304"/>
                <ellipse cx="248" cy="145" rx="18" ry="10" fill="#fff" opacity=".45"/>
                <path d="M206 181 C218 171 230 169 244 173 M316 173 C331 168 345 171 355 181" stroke="#d69391" stroke-opacity=".45" fill="none"/>
              </g>
              <text class="muscle-anatomy-label" x="280" y="31" text-anchor="middle">${x.superiorRectus}</text>
              <text class="muscle-anatomy-label" x="280" y="348" text-anchor="middle">${x.inferiorRectus}</text>
            </svg>
          </div>
          <div class="adv-controls muscle-controls">
            <button class="adv-btn" data-muscle="superiorRectus" data-move="0,-12">${x.superiorRectus}</button>
            <button class="adv-btn" data-muscle="inferiorRectus" data-move="0,12">${x.inferiorRectus}</button>
            <button class="adv-btn" data-muscle="medialRectus" data-move="-14,0">${x.medialRectus}</button>
            <button class="adv-btn" data-muscle="lateralRectus" data-move="14,0">${x.lateralRectus}</button>
            <button class="adv-btn" data-muscle="superiorOblique" data-move="-9,-7">${x.superiorOblique}</button>
            <button class="adv-btn" data-muscle="inferiorOblique" data-move="9,7">${x.inferiorOblique}</button>
          </div>
        </article>

        <article class="adv-card wide" id="cortexConnection">
          <h3>${x.cortex}</h3><p>${x.cortexText}</p>
          <div class="adv-stage cortex-stage">
            <svg viewBox="0 0 1000 350" role="img" aria-label="${x.cortex}">
              <defs><linearGradient id="brainTissue" x1="0" x2="1"><stop stop-color="#787c8e"/><stop offset="1" stop-color="#4e5365"/></linearGradient></defs>
              <g class="paired-eyes">
                <g transform="translate(80 92)"><circle class="eye-mini" cx="0" cy="0" r="38"/><circle class="mini-iris" cx="0" cy="0" r="13"/><circle cx="0" cy="0" r="5" fill="#020304"/></g>
                <g transform="translate(80 238)"><circle class="eye-mini" cx="0" cy="0" r="38"/><circle class="mini-iris" cx="0" cy="0" r="13"/><circle cx="0" cy="0" r="5" fill="#020304"/></g>
              </g>
              <path class="tract-base" d="M118 92 C205 100 248 120 326 168 M118 238 C205 230 248 210 326 174 M326 168 C363 148 397 148 432 164 M326 174 C364 194 397 194 432 178 M432 164 C492 145 540 146 590 164 M432 178 C492 197 540 196 590 178"/>
              <path id="cortexSignal" class="signal-line cortex-signal paused" d="M118 92 C205 100 248 120 326 168 M118 238 C205 230 248 210 326 174 M326 168 C363 148 397 148 432 164 M326 174 C364 194 397 194 432 178 M432 164 C492 145 540 146 590 164 M432 178 C492 197 540 196 590 178"/>
              <circle class="chiasm-node" cx="326" cy="171" r="20"/><text class="node-label" x="326" y="217" text-anchor="middle">${x.chiasm}</text>
              <g class="lgn-pair"><ellipse cx="590" cy="164" rx="26" ry="16"/><ellipse cx="590" cy="178" rx="26" ry="16"/><text class="node-label" x="590" y="221" text-anchor="middle">${x.lgn}</text></g>
              <path class="radiation-bundle" d="M615 162 C700 120 738 104 812 125 M615 181 C700 221 738 238 812 219 M616 170 C708 168 758 170 819 172"/>
              <path class="radiation-glow" d="M615 162 C700 120 738 104 812 125 M615 181 C700 221 738 238 812 219 M616 170 C708 168 758 170 819 172"/>
              <text class="node-label" x="704" y="280" text-anchor="middle">${x.radiations}</text>
              <g class="brain-real" transform="translate(790 54)">
                <path class="brain-mass" d="M49 52c28-45 88-46 119-15 42-18 89 16 82 58 38 25 25 82-15 94 5 47-52 79-91 54-31 31-88 16-97-28-44 3-70-50-42-83-25-29-3-75 44-80z"/>
                <path class="brain-gyrus" d="M62 77c28-22 54-15 66 4 M129 46c-9 20 3 38 24 44 M185 52c-25 17-28 39-10 58 M216 94c-29 5-42 24-35 47 M207 167c-31-17-55-8-67 16 M139 222c12-25 2-48-24-57 M75 203c24-14 30-35 18-57 M36 132c24 5 44-9 47-31"/>
                <path id="visualCortex" class="visual-cortex" d="M211 104c36 21 37 72 8 97-14 12-31 17-50 15 20-23 26-51 18-78 5-14 13-25 24-34z"/>
              </g>
            </svg>
          </div>
          <div class="adv-controls"><button class="adv-btn" id="cortexBtn">${x.activate}</button></div>
          <div class="status-strip" id="cortexStatus" hidden>${x.cortexStatus}</div>
          <a class="brain-link" href="https://saaeiddev.github.io/Neuro-Vista/neurovista-atlas/#/" target="_blank" rel="noopener">${x.neurovista}</a>
        </article>
      </div>`;
    bind();
  }

  function bind(){
    const x=t();
    const toggle=section.querySelector('#pathToggle');
    const signal=section.querySelector('#signalPath');
    toggle?.addEventListener('click',()=>{
      const paused=signal.classList.toggle('paused');
      section.querySelector('.light-rays')?.classList.toggle('paused',paused);
      toggle.textContent=paused?x.play:x.pause; toggle.classList.toggle('active',!paused);
    });

    section.querySelectorAll('[data-retina-btn]').forEach(btn=>btn.addEventListener('click',()=>{
      section.querySelectorAll('[data-retina-btn]').forEach(b=>b.classList.remove('active'));
      section.querySelectorAll('[data-retina]').forEach(g=>g.classList.remove('active'));
      btn.classList.add('active');
      const key=btn.dataset.retinaBtn;
      section.querySelector(`[data-retina="${key}"]`)?.classList.add('active');
      const info=section.querySelector('#retinaInfo');
      if(info)info.textContent=key==='bipolar'?x.bipolarInfo:key==='ganglion'?x.ganglionInfo:x.photoreceptorInfo;
    }));

    section.querySelectorAll('[data-condition]').forEach(btn=>btn.addEventListener('click',()=>{
      section.querySelectorAll('[data-condition]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      const view=section.querySelector('#conditionView');
      if(view)view.className=`vision-sim effect-${btn.dataset.condition}`;
    }));

    section.querySelectorAll('[data-muscle]').forEach(btn=>btn.addEventListener('click',()=>{
      section.querySelectorAll('[data-muscle]').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
      section.querySelectorAll('.muscle-ribbon').forEach(m=>m.classList.remove('active'));
      section.querySelector(`#m-${btn.dataset.muscle}`)?.classList.add('active');
      const [xv,yv]=btn.dataset.move.split(',').map(Number);
      const globe=section.querySelector('#globeGroup');
      if(globe)globe.style.transform=`translate(${xv}px,${yv}px) rotate(${xv*.12}deg)`;
    }));

    section.querySelector('#cortexBtn')?.addEventListener('click',()=>{
      const line=section.querySelector('#cortexSignal');
      const rad=section.querySelector('.radiation-glow');
      const visual=section.querySelector('#visualCortex');
      const status=section.querySelector('#cortexStatus');
      line?.classList.remove('paused'); rad?.classList.add('active'); visual?.classList.add('active');
      if(status)status.hidden=false;
      setTimeout(()=>line?.classList.add('paused'),4200);
      setTimeout(()=>rad?.classList.remove('active'),4400);
    });
  }

  render();
  new MutationObserver(muts=>{if(muts.some(m=>m.attributeName==='lang'))render()}).observe(document.documentElement,{attributes:true});
})();