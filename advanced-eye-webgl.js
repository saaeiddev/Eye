import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const copy = {
  en: {
    kicker:'Advanced Eye Lab', heading:'Vision, from optics to the brain',
    intro:'Explore the eye as a living optical and neural system with interactive 3D simulations.',
    pathway:'Vision Pathway', pathwayText:'Follow incoming light through the cornea and lens to the retina, then watch the signal leave through the optic nerve.', play:'Play pathway', pause:'Pause',
    retina:'Retina Explorer', retinaText:'Move through photoreceptors, bipolar cells and ganglion cells in a layered retinal microcircuit.', rods:'Photoreceptors', bipolar:'Bipolar cells', ganglion:'Ganglion cells',
    disorders:'Eye Disorders', disordersText:'Compare optical focusing and structural changes in myopia, hyperopia, astigmatism, cataract and glaucoma.', myopia:'Myopia', hyperopia:'Hyperopia', astigmatism:'Astigmatism', cataract:'Cataract', glaucoma:'Glaucoma', normal:'Normal',
    muscles:'Extraocular Muscles', musclesText:'Explore all six extraocular muscles around the globe. Select one to highlight its real anatomical path and primary movement.', sr:'Superior rectus', ir:'Inferior rectus', mr:'Medial rectus', lr:'Lateral rectus', so:'Superior oblique', io:'Inferior oblique',
    cortex:'Eye → Visual Cortex', cortexText:'Trace retinal output through the optic nerves, optic chiasm, LGN and optic radiations to the occipital visual cortex.', run:'Run neural signal', neuro:'Continue to NeuroVista Atlas ↗',
    drag:'Drag to rotate · Scroll to zoom'
  },
  fa: {
    kicker:'آزمایشگاه پیشرفته چشم', heading:'بینایی؛ از اپتیک تا مغز',
    intro:'چشم را به‌عنوان یک سیستم زنده اپتیکی و عصبی با شبیه‌سازی‌های سه‌بعدی تعاملی بررسی کن.',
    pathway:'مسیر بینایی', pathwayText:'حرکت نور را از قرنیه و عدسی تا شبکیه دنبال کن و سپس خروج پیام عصبی از عصب بینایی را ببین.', play:'اجرای مسیر', pause:'توقف',
    retina:'کاوشگر شبکیه', retinaText:'در یک مدار سه‌بعدی شبکیه، گیرنده‌های نوری، سلول‌های دوقطبی و گانگلیونی را بررسی کن.', rods:'گیرنده‌های نوری', bipolar:'سلول‌های دوقطبی', ganglion:'سلول‌های گانگلیونی',
    disorders:'اختلالات چشم', disordersText:'تغییرات اپتیکی و ساختاری در نزدیک‌بینی، دوربینی، آستیگماتیسم، آب مروارید و گلوکوم را مقایسه کن.', myopia:'نزدیک‌بینی', hyperopia:'دوربینی', astigmatism:'آستیگماتیسم', cataract:'آب مروارید', glaucoma:'گلوکوم', normal:'طبیعی',
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
  const c=section.querySelector('#disorder3d'); if(!c)return;
  const v=setup(c,[5.7,2.8,7.7],[0,0,-.15]); const {scene,loopFns}=v;
  const anatomy=new THREE.Group(); anatomy.rotation.y=-.38; scene.add(anatomy);
  const shell=new THREE.Mesh(new THREE.SphereGeometry(1.5,72,54),mat(0xf1ede4,{transparent:true,opacity:.22,roughness:.26,clearcoat:.3,side:THREE.DoubleSide,depthWrite:false})); anatomy.add(shell);
  const choroid=new THREE.Mesh(new THREE.SphereGeometry(1.43,64,48),basic(0x742d35,{transparent:true,opacity:.22,side:THREE.DoubleSide,depthWrite:false})); anatomy.add(choroid);
  const retina=new THREE.Mesh(new THREE.SphereGeometry(1.37,64,48),basic(0xd46a59,{transparent:true,opacity:.72,side:THREE.BackSide})); anatomy.add(retina);
  const cornea=new THREE.Mesh(new THREE.SphereGeometry(.68,48,36,0,Math.PI*2,0,Math.PI/2),mat(0xcff7ff,{transparent:true,opacity:.2,roughness:.04,transmission:.18,depthWrite:false,side:THREE.DoubleSide})); cornea.rotation.x=-Math.PI/2; cornea.position.z=1.06; anatomy.add(cornea);
  const iris=new THREE.Mesh(new THREE.TorusGeometry(.43,.15,20,64),mat(0x4f8b79,{roughness:.5})); iris.position.z=1.28; anatomy.add(iris);
  const pupil=new THREE.Mesh(new THREE.CircleGeometry(.23,48),new THREE.MeshBasicMaterial({color:0x020304,side:THREE.DoubleSide})); pupil.position.z=1.31; anatomy.add(pupil);
  const lens=new THREE.Mesh(new THREE.SphereGeometry(.52,48,36),mat(0xdffaff,{transparent:true,opacity:.42,transmission:.48,roughness:.04,depthWrite:false})); lens.scale.z=.44; lens.position.z=.53; anatomy.add(lens);
  const opticNerve=tube([[0,0,-1.35],[.05,0,-2.05],[.18,.03,-2.75]],.18,basic(0xd6b38a,{roughness:.72}),64); anatomy.add(opticNerve.mesh);
  const disc=new THREE.Mesh(new THREE.TorusGeometry(.22,.065,18,48),basic(0xd7a276,{emissive:0x28130a,emissiveIntensity:.15})); disc.position.set(0,0,-1.375); anatomy.add(disc);
  const cup=new THREE.Mesh(new THREE.SphereGeometry(.105,24,16),basic(0xe7c09b,{emissive:0x241008,emissiveIntensity:.1})); cup.scale.z=.22; cup.position.set(0,0,-1.405); anatomy.add(cup);
  const cloud=new THREE.Group(); anatomy.add(cloud);
  const cloudMat=mat(0xe3d6ae,{transparent:true,opacity:.2,roughness:.8,depthWrite:false});
  for(let i=0;i<26;i++){const a=i*2.399,r=.08+(i%5)*.055;const m=new THREE.Mesh(new THREE.SphereGeometry(.07+(i%3)*.018,14,10),cloudMat.clone());m.position.set(Math.cos(a)*r,Math.sin(a)*r,(i%4-.5)*.035+.52);cloud.add(m)}
  cloud.visible=false;
  const focusA=new THREE.Mesh(new THREE.SphereGeometry(.085,18,12),basic(0xffe47b,{emissive:0xffc92e,emissiveIntensity:3})); anatomy.add(focusA);
  const focusB=focusA.clone(); anatomy.add(focusB); focusB.visible=false;
  const rayGroup=new THREE.Group(); anatomy.add(rayGroup);
  const photonMat=basic(0xfff0a0,{emissive:0xffc936,emissiveIntensity:2.5});
  const photons=[]; for(let i=0;i<18;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(.035,10,8),photonMat);anatomy.add(m);photons.push({m,o:i/18})}
  let rayCurves=[];
  function clearRays(){rayGroup.children.slice().forEach(o=>{rayGroup.remove(o);o.geometry?.dispose?.();o.material?.dispose?.()});rayCurves=[]}
  function addRay(points,color=0xffdf6d,opacity=.78){const material=basic(color,{transparent:true,opacity,emissive:color,emissiveIntensity:.65,roughness:.35});const r=tube(points,.018,material,44);rayGroup.add(r.mesh);rayCurves.push(r.curve)}
  function bundle(focus,spread=.62,color=0xffdf6d){for(let i=0;i<7;i++){const a=i/7*Math.PI*2,x=Math.cos(a)*spread,y=Math.sin(a)*spread;addRay([[x,y,4.2],[x*.48,y*.48,1.48],[x*.12,y*.12,.54],focus],color)}}
  function setAxialScale(zScale){const shift=1.5*(1-zScale);[shell,choroid,retina].forEach(o=>{o.scale.z=zScale;o.position.z=shift});const back=shift-1.37*zScale;disc.position.z=back-.015;cup.position.z=back-.04;return back}
  function resetAppearance(){cornea.scale.set(1,1,1);lens.material.color.setHex(0xdffaff);lens.material.opacity=.42;lens.material.roughness=.04;cloud.visible=false;disc.material.color.setHex(0xd7a276);disc.material.emissive.setHex(0x28130a);disc.material.emissiveIntensity=.15;cup.material.color.setHex(0xe7c09b);cup.material.emissive.setHex(0x241008);cup.material.emissiveIntensity=.1;cup.scale.set(1,1,.22);focusA.visible=true;focusB.visible=false;focusA.scale.set(1,1,1);focusB.scale.set(1,1,1)}
  function update(k){
    clearRays();resetAppearance();let back=setAxialScale(1),focusZ=back+.035;
    if(k==='myopia'){back=setAxialScale(1.08);focusZ=-1.02;bundle([0,0,focusZ])}
    else if(k==='hyperopia'){back=setAxialScale(.93);focusZ=-1.63;bundle([0,0,focusZ])}
    else if(k==='astigmatism'){setAxialScale(1);cornea.scale.set(1.24,.82,1);focusA.position.set(0,0,-.88);focusA.scale.set(2.6,.45,.45);focusB.visible=true;focusB.position.set(0,0,-1.58);focusB.scale.set(.45,2.6,.45);for(let i=-3;i<=3;i++){const q=i*.22;addRay([[q,0,4.2],[q*.5,0,1.48],[q*.12,0,.54],[0,0,-.88]],0xffd861);addRay([[0,q,4.2],[0,q*.5,1.48],[0,q*.12,.54],[0,0,-1.58]],0xffb56b)}focusZ=-.88}
    else if(k==='cataract'){setAxialScale(1);cloud.visible=true;lens.material.color.setHex(0xd8c795);lens.material.opacity=.7;lens.material.roughness=.55;focusA.visible=false;for(let i=0;i<13;i++){const a=i/13*Math.PI*2,x=Math.cos(a)*.62,y=Math.sin(a)*.62;const end=[Math.sin(i*2.1)*.42,Math.cos(i*1.7)*.38,-1.28+(i%3-.9)*.12];addRay([[x,y,4.2],[x*.48,y*.48,1.48],[x*.12,y*.12,.54],end],0xffdf88,.52)}}
    else if(k==='glaucoma'){back=setAxialScale(1);focusZ=back+.035;bundle([0,0,focusZ],.62,0xffdf6d);disc.material.color.setHex(0xc95b4f);disc.material.emissive.setHex(0x65170f);disc.material.emissiveIntensity=1;cup.material.color.setHex(0x7e2d2a);cup.material.emissive.setHex(0x53100d);cup.material.emissiveIntensity=.8;cup.scale.set(1.9,1.9,.3)}
    else{back=setAxialScale(1);focusZ=back+.035;bundle([0,0,focusZ])}
    if(k!=='astigmatism'&&k!=='cataract')focusA.position.set(0,0,focusZ);
    section.querySelectorAll('[data-disorder]').forEach(b=>b.classList.toggle('active',b.dataset.disorder===k))
  }
  section.querySelectorAll('[data-disorder]').forEach(b=>b.addEventListener('click',()=>update(b.dataset.disorder)));
  loopFns.push(t=>{photons.forEach((x,i)=>{if(!rayCurves.length){x.m.visible=false;return}x.m.visible=true;const curve=rayCurves[i%rayCurves.length];x.m.position.copy(curve.getPoint((t*.00016+x.o)%1))});cloud.rotation.z=t*.00008});
  update('normal');
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
  const c=section.querySelector('#cortex3d');if(!c)return;
  const v=setup(c,[7.2,4.7,11.8],[0,0,-1.25]);const {scene,loopFns}=v;v.controls.minDistance=6;v.controls.maxDistance=18;
  const labels=lang()==='fa'?{chiasm:'کیاسمای بینایی',lgn:'LGN',v1:'قشر بینایی'}:{chiasm:'Optic chiasm',lgn:'LGN',v1:'Visual cortex'};
  const leftEye=makeEye(.66),rightEye=makeEye(.66);leftEye.position.set(-1.35,0,3.25);rightEye.position.set(1.35,0,3.25);leftEye.rotation.y=.04;rightEye.rotation.y=-.04;scene.add(leftEye,rightEye);
  const nerveMat=basic(0xd9bc98,{roughness:.78});const leftN=tube([[-1.35,0,2.35],[-1.2,0,1.55],[-.55,0,.62]],.14,nerveMat,64);const rightN=tube([[1.35,0,2.35],[1.2,0,1.55],[.55,0,.62]],.14,nerveMat.clone(),64);scene.add(leftN.mesh,rightN.mesh);
  const chiasm=new THREE.Mesh(new THREE.SphereGeometry(.4,36,24),mat(0xd2b68f,{roughness:.62}));chiasm.scale.set(1.7,.48,.68);chiasm.position.set(0,0,.4);scene.add(chiasm);
  const lgnMat=mat(0x9a7cc4,{roughness:.5,clearcoat:.12});const lgnL=new THREE.Mesh(new THREE.SphereGeometry(.3,28,20),lgnMat);lgnL.scale.set(1,.72,1.35);lgnL.position.set(-1.12,0,-1.52);const lgnR=lgnL.clone();lgnR.material=lgnMat.clone();lgnR.position.x=1.12;scene.add(lgnL,lgnR);
  const tractBase=basic(0xbca2ce,{roughness:.68});scene.add(tube([[-.45,0,.23],[-.72,0,-.58],[-1.12,0,-1.52]],.12,tractBase,54).mesh);scene.add(tube([[.45,0,.23],[.72,0,-.58],[1.12,0,-1.52]],.12,tractBase.clone(),54).mesh);
  const temporalMat=basic(0x65c7e8,{emissive:0x143f52,emissiveIntensity:.5,roughness:.4});const nasalMat=basic(0xe3ad67,{emissive:0x573617,emissiveIntensity:.5,roughness:.4});
  const lTemporal=tube([[-1.35,.055,2.35],[-1.18,.06,1.5],[-.5,.08,.52],[-.75,.08,-.55],[-1.12,.08,-1.52]],.038,temporalMat,66);const rTemporal=tube([[1.35,-.055,2.35],[1.18,-.06,1.5],[.5,-.08,.52],[.75,-.08,-.55],[1.12,-.08,-1.52]],.038,temporalMat.clone(),66);const lNasal=tube([[-1.35,-.055,2.35],[-1.18,-.05,1.5],[-.34,-.04,.48],[.32,.04,.12],[.82,.05,-.65],[1.12,.05,-1.52]],.038,nasalMat,72);const rNasal=tube([[1.35,.055,2.35],[1.18,.05,1.5],[.34,.04,.48],[-.32,-.04,.12],[-.82,-.05,-.65],[-1.12,-.05,-1.52]],.038,nasalMat.clone(),72);scene.add(lTemporal.mesh,rTemporal.mesh,lNasal.mesh,rNasal.mesh);
  const brainMat=mat(0x8a7b82,{roughness:.9,clearcoat:.03,transparent:true,opacity:.9});const hemiL=new THREE.Mesh(new THREE.SphereGeometry(1,64,48),brainMat);hemiL.scale.set(1.18,1.02,1.7);hemiL.position.set(-1.05,0,-4.45);const hemiR=hemiL.clone();hemiR.material=brainMat.clone();hemiR.position.x=1.05;scene.add(hemiL,hemiR);const fissure=new THREE.Mesh(new THREE.BoxGeometry(.12,1.7,2.7),basic(0x332b31,{roughness:1,transparent:true,opacity:.55}));fissure.position.set(0,0,-4.45);scene.add(fissure);
  const sulcusMat=basic(0x544951,{roughness:1,transparent:true,opacity:.7});[-1.05,1.05].forEach(x=>{for(let i=-2;i<=2;i++){const y=i*.26;scene.add(tube([[x-.68,y,-3.82],[x-.25,y+.08*Math.sin(i),-3.68],[x+.2,y-.07*Math.cos(i),-3.8],[x+.65,y,-4.04]],.025,sulcusMat.clone(),34).mesh)}});
  const occMat=mat(0x8567cf,{roughness:.52,transparent:true,opacity:.58,emissive:0x2a185e,emissiveIntensity:.55});const occL=new THREE.Mesh(new THREE.SphereGeometry(.72,36,26),occMat);occL.scale.set(.72,1,.42);occL.position.set(-1.05,0,-5.72);const occR=occL.clone();occR.material=occMat.clone();occR.position.x=1.05;scene.add(occL,occR);
  const radiationCurves={left:[],right:[]};const radMat=basic(0x9176c7,{transparent:true,opacity:.55,emissive:0x24194d,emissiveIntensity:.45,roughness:.5});for(let i=-2;i<=2;i++){const yy=i*.25;const L=tube([[-1.12,0,-1.52],[-1.55,yy*.45,-2.35],[-1.65,yy,-3.35],[-1.18,yy*.78,-5.45]],.052,radMat.clone(),68);scene.add(L.mesh);radiationCurves.left.push(L.curve);const R=tube([[1.12,0,-1.52],[1.55,yy*.45,-2.35],[1.65,yy,-3.35],[1.18,yy*.78,-5.45]],.052,radMat.clone(),68);scene.add(R.mesh);radiationCurves.right.push(R.curve)}
  function spriteLabel(text,pos){const cv=document.createElement('canvas');cv.width=512;cv.height=128;const ctx=cv.getContext('2d');ctx.fillStyle='rgba(4,14,22,.78)';ctx.beginPath();ctx.roundRect(12,18,488,92,28);ctx.fill();ctx.strokeStyle='rgba(180,235,255,.42)';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#e8f9ff';ctx.font='600 34px Manrope, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,64);const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));sp.position.set(...pos);sp.scale.set(2.15,.54,1);scene.add(sp)}
  spriteLabel(labels.chiasm,[0,.72,.45]);spriteLabel(labels.lgn,[-1.12,.65,-1.52]);spriteLabel(labels.lgn,[1.12,.65,-1.52]);spriteLabel(labels.v1,[0,1.35,-5.58]);
  const centralRadL=radiationCurves.left[2],centralRadR=radiationCurves.right[2];const routes=[[leftN.curve,lTemporal.curve,centralRadL],[leftN.curve,lNasal.curve,centralRadR],[rightN.curve,rTemporal.curve,centralRadR],[rightN.curve,rNasal.curve,centralRadL]];
  function routePoint(route,u){const n=route.length,scaled=Math.min(.999999,u)*n,idx=Math.min(n-1,Math.floor(scaled));return route[idx].getPoint(scaled-idx)}
  const signalMat=basic(0x72edff,{emissive:0x35dfff,emissiveIntensity:2.8,roughness:.22});const particles=[];for(let i=0;i<28;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.048,12,8),signalMat);p.visible=false;scene.add(p);particles.push({p,route:routes[i%4],o:(i%7)/7})}
  let runStart=null;section.querySelector('#cortexRun')?.addEventListener('click',e=>{runStart=performance.now();particles.forEach(x=>x.p.visible=true);e.currentTarget.classList.add('active');setTimeout(()=>e.currentTarget.classList.remove('active'),5200)});
  loopFns.push(t=>{if(runStart==null)return;const elapsed=t-runStart,base=elapsed/4700;particles.forEach(x=>{const q=(base+x.o*.52)%1;x.p.position.copy(routePoint(x.route,q))});const pulse=Math.max(0,Math.sin(elapsed*.006));occL.material.opacity=.52+.32*pulse;occR.material.opacity=.52+.32*pulse;occL.material.emissiveIntensity=.45+1.25*pulse;occR.material.emissiveIntensity=.45+1.25*pulse;if(elapsed>5200){runStart=null;particles.forEach(x=>x.p.visible=false);occL.material.opacity=occR.material.opacity=.58;occL.material.emissiveIntensity=occR.material.emissiveIntensity=.55}});
}

function initAll(){initVision();initRetina();initDisorder();initMuscles();initCortex();}
renderMarkup();
new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang'))renderMarkup()}).observe(document.documentElement,{attributes:true});