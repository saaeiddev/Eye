import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const copy = {
  en: {
    kicker:'Advanced Eye Lab', heading:'Vision, from optics to the brain',
    intro:'Explore the eye as a living optical and neural system with interactive 3D simulations.',
    pathway:'Vision Pathway', pathwayText:'Follow incoming light through the cornea and lens to the retina, then watch the signal leave through the optic nerve.', play:'Play pathway', pause:'Pause',
    retina:'Retina Explorer', retinaText:'Move through photoreceptors, bipolar cells and ganglion cells in a layered retinal microcircuit.', rods:'Photoreceptors', bipolar:'Bipolar cells', ganglion:'Ganglion cells',
    disorders:'Eye Disorders', disordersText:'Compare how focus changes in common optical conditions.', myopia:'Myopia', hyperopia:'Hyperopia', astigmatism:'Astigmatism', cataract:'Cataract', glaucoma:'Glaucoma', normal:'Normal',
    muscles:'Extraocular Muscles', musclesText:'Explore all six extraocular muscles around the globe. Select one to highlight its real anatomical path and primary movement.', sr:'Superior rectus', ir:'Inferior rectus', mr:'Medial rectus', lr:'Lateral rectus', so:'Superior oblique', io:'Inferior oblique',
    cortex:'Eye → Visual Cortex', cortexText:'Trace retinal output through the optic nerves, optic chiasm, LGN and optic radiations to the occipital visual cortex.', run:'Run neural signal', neuro:'Continue to NeuroVista Atlas ↗',
    drag:'Drag to rotate · Scroll to zoom'
  },
  fa: {
    kicker:'آزمایشگاه پیشرفته چشم', heading:'بینایی؛ از اپتیک تا مغز',
    intro:'چشم را به‌عنوان یک سیستم زنده اپتیکی و عصبی با شبیه‌سازی‌های سه‌بعدی تعاملی بررسی کن.',
    pathway:'مسیر بینایی', pathwayText:'حرکت نور را از قرنیه و عدسی تا شبکیه دنبال کن و سپس خروج پیام عصبی از عصب بینایی را ببین.', play:'اجرای مسیر', pause:'توقف',
    retina:'کاوشگر شبکیه', retinaText:'در یک مدار سه‌بعدی شبکیه، گیرنده‌های نوری، سلول‌های دوقطبی و گانگلیونی را بررسی کن.', rods:'گیرنده‌های نوری', bipolar:'سلول‌های دوقطبی', ganglion:'سلول‌های گانگلیونی',
    disorders:'اختلالات چشم', disordersText:'تغییر محل فوکوس را در اختلالات اپتیکی رایج مقایسه کن.', myopia:'نزدیک‌بینی', hyperopia:'دوربینی', astigmatism:'آستیگماتیسم', cataract:'آب مروارید', glaucoma:'گلوکوم', normal:'طبیعی',
    muscles:'عضلات خارج‌چشمی', musclesText:'شش عضله خارج‌چشمی را در اطراف کره چشم ببین. با انتخاب هر عضله، مسیر آناتومیک و حرکت اصلی آن مشخص می‌شود.', sr:'راست فوقانی', ir:'راست تحتانی', mr:'راست داخلی', lr:'راست خارجی', so:'مایل فوقانی', io:'مایل تحتانی',
    cortex:'چشم ← قشر بینایی', cortexText:'مسیر پیام شبکیه را از عصب‌های بینایی، کیاسمای بینایی، LGN و تشعشعات بینایی تا قشر پس‌سری دنبال کن.', run:'اجرای پیام عصبی', neuro:'ادامه در NeuroVista Atlas ↗',
    drag:'برای چرخش بکش · برای زوم اسکرول کن'
  }
};

const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = './advanced-eye-webgl.css?v=20260917-webgl3';
document.head.appendChild(css);

const lang = () => document.documentElement.lang === 'fa' ? 'fa' : 'en';
const host = document.querySelector('#anatomy');
if (!host) throw new Error('Advanced Eye Lab host not found');
document.querySelector('#advancedEye')?.remove();

const section = document.createElement('section');
section.id = 'advancedEye';
section.className = 'section glass advanced-eye-webgl';
host.insertAdjacentElement('afterend', section);

let disposers = [];

function renderMarkup(){
  disposers.forEach(fn=>fn()); disposers=[];
  const t = copy[lang()];
  section.innerHTML = `
    <div class="section-head adv-head"><div><div class="adv-kicker">${t.kicker}</div><h2>${t.heading}</h2><p>${t.intro}</p></div></div>
    <div class="adv-grid3d">
      <article class="adv-card3d wide"><div class="adv-copy"><h3>${t.pathway}</h3><p>${t.pathwayText}</p></div><div class="canvas-wrap"><canvas id="vision3d"></canvas><div class="canvas-hint">${t.drag}</div></div><div class="adv-actions"><button class="adv-pill active" id="visionPlay">${t.pause}</button></div></article>
      <article class="adv-card3d"><div class="adv-copy"><h3>${t.retina}</h3><p>${t.retinaText}</p></div><div class="canvas-wrap compact"><canvas id="retina3d"></canvas><div class="canvas-hint">${t.drag}</div></div><div class="adv-actions"><button class="adv-pill active" data-retina="photo">${t.rods}</button><button class="adv-pill" data-retina="bipolar">${t.bipolar}</button><button class="adv-pill" data-retina="ganglion">${t.ganglion}</button></div></article>
      <article class="adv-card3d"><div class="adv-copy"><h3>${t.disorders}</h3><p>${t.disordersText}</p></div><div class="canvas-wrap compact"><canvas id="disorder3d"></canvas><div class="canvas-hint">${t.drag}</div></div><div class="adv-actions"><button class="adv-pill active" data-disorder="normal">${t.normal}</button><button class="adv-pill" data-disorder="myopia">${t.myopia}</button><button class="adv-pill" data-disorder="hyperopia">${t.hyperopia}</button><button class="adv-pill" data-disorder="astigmatism">${t.astigmatism}</button><button class="adv-pill" data-disorder="cataract">${t.cataract}</button><button class="adv-pill" data-disorder="glaucoma">${t.glaucoma}</button></div></article>
      <article class="adv-card3d wide"><div class="adv-copy"><h3>${t.muscles}</h3><p>${t.musclesText}</p></div><div class="canvas-wrap tall"><canvas id="muscles3d"></canvas><div class="canvas-hint">${t.drag}</div></div><div class="adv-actions"><button class="adv-pill" data-muscle="sr">${t.sr}</button><button class="adv-pill" data-muscle="ir">${t.ir}</button><button class="adv-pill" data-muscle="mr">${t.mr}</button><button class="adv-pill" data-muscle="lr">${t.lr}</button><button class="adv-pill" data-muscle="so">${t.so}</button><button class="adv-pill" data-muscle="io">${t.io}</button></div></article>
      <article class="adv-card3d wide"><div class="adv-copy"><h3>${t.cortex}</h3><p>${t.cortexText}</p></div><div class="canvas-wrap tall"><canvas id="cortex3d"></canvas><div class="canvas-hint">${t.drag}</div></div><div class="adv-actions"><button class="adv-pill" id="cortexRun">${t.run}</button><a class="adv-link" href="https://saaeiddev.github.io/Neuro-Vista/neurovista-atlas/#/" target="_blank" rel="noopener">${t.neuro}</a></div></article>
    </div>`;
  requestAnimationFrame(initAll);
}

function setup(canvas, cameraPos=[0,0,8], target=[0,0,0]){
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true, powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34,1,.1,100);
  camera.position.set(...cameraPos);
  const controls = new OrbitControls(camera,canvas);
  controls.enableDamping=true; controls.dampingFactor=.065; controls.enablePan=false; controls.minDistance=4; controls.maxDistance=15; controls.target.set(...target);
  scene.add(new THREE.HemisphereLight(0xeaf8ff,0x2a1114,1.75));
  const key = new THREE.DirectionalLight(0xffffff,3.1); key.position.set(5,6,7); key.castShadow=true; scene.add(key);
  const rim = new THREE.PointLight(0x7edcff,16,20,2); rim.position.set(-5,2,4); scene.add(rim);
  const warm = new THREE.PointLight(0xffa887,11,18,2); warm.position.set(4,-3,-2); scene.add(warm);
  let visible=true, dead=false;
  const ro = new ResizeObserver(()=>resize()); ro.observe(canvas.parentElement);
  const io = new IntersectionObserver(([e])=>{visible=e.isIntersecting},{rootMargin:'120px'}); io.observe(canvas);
  function resize(){const r=canvas.getBoundingClientRect(); const w=Math.max(1,r.width),h=Math.max(1,r.height); renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix();}
  resize();
  const loopFns=[];
  function frame(t){if(dead)return; requestAnimationFrame(frame); if(!visible)return; controls.update(); loopFns.forEach(fn=>fn(t)); renderer.render(scene,camera);}
  requestAnimationFrame(frame);
  disposers.push(()=>{dead=true; ro.disconnect();io.disconnect();controls.dispose();renderer.dispose();scene.traverse(o=>{o.geometry?.dispose?.(); if(o.material){(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>m.dispose?.())}})});
  return {renderer,scene,camera,controls,loopFns};
}

const mat = (color, opts={}) => new THREE.MeshPhysicalMaterial({color, roughness:.48, metalness:0, clearcoat:.15, clearcoatRoughness:.25, ...opts});
const basic = (color, opts={}) => new THREE.MeshStandardMaterial({color, roughness:.6, ...opts});

function tube(points,radius,material,segments=72){
  const curve = new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve,segments,radius,16,false),material);
  mesh.castShadow=true; mesh.receiveShadow=true; return {mesh,curve};
}

function makeEye(scale=1){
  const g=new THREE.Group();
  const sclera=new THREE.Mesh(new THREE.SphereGeometry(1.45*scale,72,54),mat(0xf2eee5,{roughness:.34,clearcoat:.28})); sclera.castShadow=true; g.add(sclera);
  const iris=new THREE.Mesh(new THREE.CylinderGeometry(.48*scale,.48*scale,.055*scale,64),mat(0x5fa391,{roughness:.42})); iris.rotation.x=Math.PI/2; iris.position.z=1.405*scale; g.add(iris);
  const pupil=new THREE.Mesh(new THREE.CylinderGeometry(.19*scale,.19*scale,.065*scale,48),basic(0x030608,{roughness:.15})); pupil.rotation.x=Math.PI/2; pupil.position.z=1.445*scale; g.add(pupil);
  const cornea=new THREE.Mesh(new THREE.SphereGeometry(.62*scale,48,32,0,Math.PI*2,0,Math.PI/2),mat(0xcff7ff,{transparent:true,opacity:.18,roughness:.05,transmission:.18,depthWrite:false,side:THREE.DoubleSide})); cornea.rotation.x=-Math.PI/2; cornea.position.z=1.02*scale; g.add(cornea);
  return g;
}

function initVision(){
  const c=section.querySelector('#vision3d'); if(!c)return;
  const v=setup(c,[6.7,3.1,8.4],[0,0,0]); const {scene,loopFns}=v;
  const eye=makeEye(1.25); eye.rotation.y=-.55; eye.position.x=-1.1; scene.add(eye);
  const scleraCut=new THREE.Mesh(new THREE.SphereGeometry(1.62,64,48,0,Math.PI*1.45,0,Math.PI),mat(0xf4efe7,{transparent:true,opacity:.28,side:THREE.DoubleSide})); scleraCut.rotation.y=.35; scleraCut.position.copy(eye.position); scene.add(scleraCut);
  const lens=new THREE.Mesh(new THREE.SphereGeometry(.53,48,32),mat(0xdffcff,{transparent:true,opacity:.38,transmission:.5,roughness:.05,depthWrite:false})); lens.scale.z=.45; lens.position.set(-.45,0,.55); scene.add(lens);
  const retina=new THREE.Mesh(new THREE.SphereGeometry(1.34,64,48,0,Math.PI*2,.25,Math.PI-.5),basic(0xd66655,{side:THREE.BackSide,transparent:true,opacity:.8})); retina.position.copy(eye.position); scene.add(retina);
  const nerve=tube([[.25,0,-1.1],[1.35,.04,-1.7],[2.35,.05,-2.2]],.18,basic(0xd8b58a)); scene.add(nerve.mesh);
  const rayMat=new THREE.LineBasicMaterial({color:0xffe27a,transparent:true,opacity:.75});
  const rayCurves=[];
  [-.55,0,.55].forEach(y=>{const pts=[new THREE.Vector3(-5,y,1.2),new THREE.Vector3(-2.8,y*.65,1.15),new THREE.Vector3(-.45,y*.18,.55),new THREE.Vector3(.05,0,-.35)]; const curve=new THREE.CatmullRomCurve3(pts); rayCurves.push(curve); const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(80)),rayMat);scene.add(line)});
  const photons=[]; rayCurves.forEach((curve,i)=>{for(let j=0;j<5;j++){const p=new THREE.Mesh(new THREE.SphereGeometry(.045,14,10),basic(0xfff3a8,{emissive:0xffc93d,emissiveIntensity:2}));scene.add(p);photons.push({p,curve,o:(j/5+i*.09)%1})}});
  const signalMat=basic(0x6ce9ff,{emissive:0x2ccfff,emissiveIntensity:2}); const signals=[]; for(let i=0;i<9;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.055,12,8),signalMat);scene.add(p);signals.push({p,o:i/9})}
  let running=true; section.querySelector('#visionPlay')?.addEventListener('click',e=>{running=!running;e.currentTarget.textContent=running?copy[lang()].pause:copy[lang()].play;e.currentTarget.classList.toggle('active',running)});
  loopFns.push(t=>{if(!running)return;const s=t*.00018;photons.forEach(x=>x.p.position.copy(x.curve.getPoint((s+x.o)%1)));signals.forEach(x=>x.p.position.copy(nerve.curve.getPoint((s*.7+x.o)%1)));});
}

function initRetina(){
  const c=section.querySelector('#retina3d'); if(!c)return; const v=setup(c,[6,4.6,7],[0,0,0]); const {scene}=v;
  const groups={photo:new THREE.Group(),bipolar:new THREE.Group(),ganglion:new THREE.Group()}; Object.values(groups).forEach(g=>scene.add(g));
  const base=new THREE.Mesh(new THREE.BoxGeometry(7.4,.22,4.6),basic(0x321a1c,{roughness:.8}));base.position.y=-2.05;scene.add(base);
  for(let x=-3;x<=3;x+=.5){for(let z=-1.65;z<=1.65;z+=.55){const isCone=Math.round((x+z)*10)%4===0;const geom=isCone?new THREE.ConeGeometry(.12,.72,14):new THREE.CylinderGeometry(.09,.11,.78,14);const m=new THREE.Mesh(geom,basic(isCone?0xd5ae67:0x9bcbd2));m.position.set(x,1.35,z);m.castShadow=true;groups.photo.add(m)}}
  for(let x=-2.8;x<=2.8;x+=.7){for(let z=-1.4;z<=1.4;z+=.7){const cell=new THREE.Mesh(new THREE.SphereGeometry(.17,18,12),basic(0x9e6b9e));cell.position.set(x,.05,z);groups.bipolar.add(cell);const stem=tube([[x,.68,z],[x,.2,z],[x,-.45,z]],.035,basic(0xbd91ba),20).mesh;groups.bipolar.add(stem)}}
  for(let x=-2.7;x<=2.7;x+=.9){for(let z=-1.25;z<=1.25;z+=.8){const soma=new THREE.Mesh(new THREE.SphereGeometry(.24,20,14),basic(0xbf6b5d));soma.position.set(x,-1.1,z);groups.ganglion.add(soma);const ax=tube([[x,-1.1,z],[x+.45,-1.38,z*.7],[3.5,-1.55,z*.35]],.035,basic(0xe1aa82),28).mesh;groups.ganglion.add(ax)}}
  function select(k){Object.entries(groups).forEach(([key,g])=>g.traverse(o=>{if(o.material){o.material.emissive?.setHex(key===k?0x2a1915:0);o.material.emissiveIntensity=key===k?.8:0;o.material.opacity=key===k?1:.45;o.material.transparent=key!==k}}));section.querySelectorAll('[data-retina]').forEach(b=>b.classList.toggle('active',b.dataset.retina===k))}
  section.querySelectorAll('[data-retina]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.retina)));select('photo');
}

function initDisorder(){
  const c=section.querySelector('#disorder3d'); if(!c)return; const v=setup(c,[5.8,2.8,7.5],[0,0,0]); const {scene}=v;
  const eye=makeEye(1.1); eye.rotation.y=-.45;scene.add(eye);
  const retina=new THREE.Mesh(new THREE.SphereGeometry(1.05,48,36,0,Math.PI*2,.28,Math.PI-.56),basic(0xca5a4e,{side:THREE.BackSide}));scene.add(retina);
  const lens=new THREE.Mesh(new THREE.SphereGeometry(.48,36,28),mat(0xdaf8ff,{transparent:true,opacity:.46,transmission:.45,roughness:.04,depthWrite:false}));lens.scale.z=.5;lens.position.z=.5;scene.add(lens);
  const focus=new THREE.Mesh(new THREE.SphereGeometry(.08,18,12),basic(0xffe77c,{emissive:0xffce32,emissiveIntensity:3}));scene.add(focus);
  const lines=new THREE.Group();scene.add(lines);const lm=new THREE.LineBasicMaterial({color:0xffe27a,transparent:true,opacity:.72});
  function update(k){while(lines.children.length)lines.remove(lines.children[0]);let z=-1.02, blur=0;if(k==='myopia')z=-.45;if(k==='hyperopia')z=-1.55;if(k==='astigmatism'){z=-.9;blur=.45}if(k==='cataract'){z=-.95;lens.material.opacity=.72;lens.material.color.setHex(0xe9d8a7)}else{lens.material.opacity=.46;lens.material.color.setHex(0xdaf8ff)}if(k==='glaucoma'){retina.material.emissive=new THREE.Color(0x43130f);retina.material.emissiveIntensity=.7}else{retina.material.emissive=new THREE.Color(0);retina.material.emissiveIntensity=0}focus.position.set(blur,z*.15,z);focus.scale.set(1,1,k==='astigmatism'?4:1);[-.55,0,.55].forEach(y=>{const pts=[new THREE.Vector3(-4.2,y,1.05),new THREE.Vector3(-1.05,y*.4,.95),new THREE.Vector3(0,0,.5),new THREE.Vector3(blur,z*.15,z)];lines.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.CatmullRomCurve3(pts).getPoints(60)),lm))});section.querySelectorAll('[data-disorder]').forEach(b=>b.classList.toggle('active',b.dataset.disorder===k))}
  section.querySelectorAll('[data-disorder]').forEach(b=>b.addEventListener('click',()=>update(b.dataset.disorder)));update('normal');
}

function initMuscles(){
  const c=section.querySelector('#muscles3d'); if(!c)return; const v=setup(c,[6.5,4.5,8.5],[0,0,-.5]); const {scene,loopFns}=v;
  const orbit=new THREE.Mesh(new THREE.SphereGeometry(2.55,64,48,0,Math.PI*2,0,Math.PI),basic(0x4a2325,{transparent:true,opacity:.2,side:THREE.BackSide}));orbit.scale.z=1.35;scene.add(orbit);
  const eye=makeEye(1.25);scene.add(eye);
  const nerve=tube([[0,0,-1.4],[.05,0,-2.4],[.22,.05,-3.35]],.18,basic(0xd5b184),64);scene.add(nerve.mesh);
  const tendon=basic(0xd7c8b5,{roughness:.72}); const muscleMat=()=>basic(0x944a47,{roughness:.85});
  const defs={
    sr:{pts:[[0,.25,-3.0],[0,.92,-1.75],[0,1.15,-.25],[0,.95,.78]],move:[-.05,.42,0]},
    ir:{pts:[[0,-.25,-3.0],[0,-.95,-1.65],[0,-1.1,-.1],[0,-.92,.72]],move:[.04,-.42,0]},
    mr:{pts:[[-.25,0,-3.0],[-.95,0,-1.65],[-1.14,0,-.15],[-.96,0,.72]],move:[-.45,0,0]},
    lr:{pts:[[.25,0,-3.0],[.95,0,-1.65],[1.14,0,-.15],[.96,0,.72]],move:[.45,0,0]},
    so:{pts:[[-.12,.35,-3.0],[-.62,1.15,-1.6],[-1.05,1.35,-.35],[-.62,.82,.42]],move:[-.22,.2,0]},
    io:{pts:[[-.5,-1.2,.65],[-.2,-1.38,.05],[.62,-.9,-.6],[.76,-.48,.2]],move:[.2,-.18,0]}
  };
  const muscles={};Object.entries(defs).forEach(([k,d])=>{const outer=tube(d.pts,.16,muscleMat(),64);scene.add(outer.mesh);const t1=tube([d.pts[d.pts.length-2],d.pts[d.pts.length-1]],.09,tendon,20);scene.add(t1.mesh);muscles[k]=[outer.mesh,t1.mesh]});
  let targetRot=new THREE.Vector3();
  function select(k){Object.entries(muscles).forEach(([key,arr])=>arr.forEach((m,idx)=>{m.material.color.setHex(key===k?0xd97865:(idx===1?0xd7c8b5:0x944a47));m.material.emissive?.setHex(key===k?0x51201b:0);m.material.emissiveIntensity=key===k?.8:0}));section.querySelectorAll('[data-muscle]').forEach(b=>b.classList.toggle('active',b.dataset.muscle===k));const mv=defs[k]?.move||[0,0,0];targetRot.set(-mv[1]*.35,mv[0]*.35,0)}
  section.querySelectorAll('[data-muscle]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.muscle)));
  loopFns.push(()=>{eye.rotation.x+=(targetRot.x-eye.rotation.x)*.06;eye.rotation.y+=(targetRot.y-eye.rotation.y)*.06});
}

function initCortex(){
  const c=section.querySelector('#cortex3d');if(!c)return;const v=setup(c,[8.6,5.8,12],[0,0,-1]);const {scene,loopFns}=v;
  const left=makeEye(.63),right=makeEye(.63);left.position.set(-2.5,.65,1.3);right.position.set(-2.5,-.65,1.3);left.rotation.y=-.65;right.rotation.y=-.65;scene.add(left,right);
  const nerveMat=basic(0xd6b48d,{roughness:.72});
  const curves=[];
  const addRoute=(pts,r=.11,matl=nerveMat)=>{const x=tube(pts,r,matl,72);scene.add(x.mesh);curves.push(x.curve);return x};
  addRoute([[-1.95,.65,.65],[-1.0,.45,.2],[-.25,.2,-.35],[0,0,-.7]]);
  addRoute([[-1.95,-.65,.65],[-1.0,-.45,.2],[-.25,-.2,-.35],[0,0,-.7]]);
  const chiasm=new THREE.Mesh(new THREE.SphereGeometry(.28,28,18),basic(0xd9b47b));chiasm.scale.set(1.5,.7,.7);chiasm.position.set(0,0,-.7);scene.add(chiasm);
  const lgnL=new THREE.Mesh(new THREE.SphereGeometry(.28,24,16),basic(0xa68ad4));lgnL.position.set(2,.55,-1.45);const lgnR=lgnL.clone();lgnR.position.y=-.55;scene.add(lgnL,lgnR);
  addRoute([[.2,.08,-.78],[.9,.35,-1.1],[2,.55,-1.45]],.09,basic(0xcdb3e4));addRoute([[.2,-.08,-.78],[.9,-.35,-1.1],[2,-.55,-1.45]],.09,basic(0xcdb3e4));
  const radMat=basic(0x8d75c8,{transparent:true,opacity:.78});
  addRoute([[2.2,.55,-1.5],[3.3,1.1,-1.9],[4.7,1.2,-2.0],[5.5,.85,-2.2]],.12,radMat);addRoute([[2.2,-.55,-1.5],[3.3,-1.1,-1.9],[4.7,-1.2,-2.0],[5.5,-.85,-2.2]],.12,radMat);
  const brain=new THREE.Group();for(const s of [[0,0,0,1.8,1.35,1.15],[1.1,.1,-.1,1.4,1.18,1.0],[-.9,.15,.05,1.45,1.2,1.05],[.2,.75,.05,1.55,.8,.95],[.2,-.75,.05,1.55,.8,.95]]){const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1,3),basic(0x6f6678,{roughness:.9}));m.position.set(s[0],s[1],s[2]);m.scale.set(s[3],s[4],s[5]);brain.add(m)}brain.position.set(6.4,0,-2.15);brain.rotation.y=-.15;scene.add(brain);
  const occ=new THREE.Mesh(new THREE.SphereGeometry(.92,32,20),basic(0x8b70d2,{transparent:true,opacity:.4,emissive:0x2d1b61,emissiveIntensity:.4}));occ.scale.set(.55,1.15,.9);occ.position.set(5.55,0,-2.2);scene.add(occ);
  const particles=[];const sigMat=basic(0x68e8ff,{emissive:0x2ed7ff,emissiveIntensity:2});for(let i=0;i<18;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.055,12,8),sigMat);p.visible=false;scene.add(p);particles.push({p,o:i/18})}
  let runStart=null;section.querySelector('#cortexRun')?.addEventListener('click',e=>{runStart=performance.now();particles.forEach(x=>x.p.visible=true);e.currentTarget.classList.add('active');setTimeout(()=>e.currentTarget.classList.remove('active'),4200)});
  const path=[...curves];loopFns.push(t=>{if(runStart==null)return;const elapsed=(t-runStart)*.00032;particles.forEach(x=>{const q=(elapsed+x.o)%1;const idx=Math.min(path.length-1,Math.floor(q*path.length));const local=q*path.length-idx;x.p.position.copy(path[idx].getPoint(local))});occ.material.opacity=.35+.35*Math.max(0,Math.sin((t-runStart)*.004));if(t-runStart>4300){runStart=null;particles.forEach(x=>x.p.visible=false);occ.material.opacity=.4}});
}

function initAll(){initVision();initRetina();initDisorder();initMuscles();initCortex();}
renderMarkup();
new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang'))renderMarkup()}).observe(document.documentElement,{attributes:true});