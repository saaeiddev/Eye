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
  c.dataset.brainAssetCredit='Brain atlas: Z-Anatomy / BodyParts3D / DBCLS via Brain Project, CC BY-SA 4.0';
  const v=setup(c,[7.6,4.8,12.9],[0,0,-2.25]);const {scene,loopFns}=v;v.controls.minDistance=6;v.controls.maxDistance=19;
  const labels=lang()==='fa'
    ?{optic:'عصب بینایی',chiasm:'کیاسمای بینایی',tract:'راه بینایی',lgn:'هسته زانویی جانبی (LGN)',radiation:'تشعشعات بینایی',v1:'قشر بینایی'}
    :{optic:'Optic nerve',chiasm:'Optic chiasm',tract:'Optic tract',lgn:'LGN',radiation:'Optic radiations',v1:'Visual cortex'};
  let disposed=false;disposers.push(()=>{disposed=true});

  const leftEye=makeEye(.72),rightEye=makeEye(.72);
  leftEye.position.set(-1.45,.08,3.1);rightEye.position.set(1.45,.08,3.1);leftEye.rotation.y=.055;rightEye.rotation.y=-.055;scene.add(leftEye,rightEye);
  const retinaMat=basic(0xe78364,{emissive:0x7e241a,emissiveIntensity:.9,roughness:.5,side:THREE.DoubleSide});
  const retinaL=new THREE.Mesh(new THREE.CircleGeometry(.26,36),retinaMat),retinaR=new THREE.Mesh(new THREE.CircleGeometry(.26,36),retinaMat.clone());
  retinaL.position.set(-1.45,.08,2.08);retinaR.position.set(1.45,.08,2.08);scene.add(retinaL,retinaR);

  const nerveOuter=basic(0xd7bea0,{roughness:.78});
  const leftN=tube([[-1.45,.08,2.08],[-1.28,.06,1.48],[-.77,.03,.78],[-.34,.02,.36]],.16,nerveOuter,72);
  const rightN=tube([[1.45,.08,2.08],[1.28,.06,1.48],[.77,.03,.78],[.34,.02,.36]],.16,nerveOuter.clone(),72);scene.add(leftN.mesh,rightN.mesh);

  const chiasmMat=mat(0xd8c1a5,{roughness:.62,emissive:0x26180d,emissiveIntensity:.15});
  const chiasm=new THREE.Mesh(new THREE.SphereGeometry(.38,42,30),chiasmMat);chiasm.scale.set(1.8,.5,.72);chiasm.position.set(0,.02,.32);scene.add(chiasm);

  const tractMat=basic(0xcab4a0,{roughness:.72});
  const tractL=tube([[0,.02,.3],[-.48,.02,-.34],[-.92,.02,-1.28],[-1.18,.02,-2.16]],.125,tractMat,68);
  const tractR=tube([[0,.02,.3],[.48,.02,-.34],[.92,.02,-1.28],[1.18,.02,-2.16]],.125,tractMat.clone(),68);scene.add(tractL.mesh,tractR.mesh);

  const temporalMat=basic(0x65cfe8,{emissive:0x17485d,emissiveIntensity:.72,roughness:.38,transparent:true,opacity:.88});
  const nasalMat=basic(0xe9b26a,{emissive:0x5f3a17,emissiveIntensity:.7,roughness:.38,transparent:true,opacity:.88});
  const lTemporal=tube([[-1.45,.13,2.08],[-1.25,.12,1.45],[-.48,.1,.36],[-.58,.09,-.35],[-.96,.08,-1.28],[-1.18,.08,-2.16]],.034,temporalMat,82);
  const rTemporal=tube([[1.45,.03,2.08],[1.25,.02,1.45],[.48,0,.36],[.58,-.01,-.35],[.96,-.02,-1.28],[1.18,-.02,-2.16]],.034,temporalMat.clone(),82);
  const lNasal=tube([[-1.45,.03,2.08],[-1.25,.02,1.45],[-.36,0,.36],[.08,-.01,.24],[.55,-.02,-.35],[.98,-.03,-1.28],[1.18,-.03,-2.16]],.034,nasalMat,88);
  const rNasal=tube([[1.45,.13,2.08],[1.25,.12,1.45],[.36,.1,.36],[-.08,.09,.24],[-.55,.08,-.35],[-.98,.07,-1.28],[-1.18,.07,-2.16]],.034,nasalMat.clone(),88);scene.add(lTemporal.mesh,rTemporal.mesh,lNasal.mesh,rNasal.mesh);

  const lgnMat=mat(0x9b7fd0,{roughness:.46,clearcoat:.18,emissive:0x261948,emissiveIntensity:.32});
  const lgnL=new THREE.Mesh(new THREE.SphereGeometry(.32,36,26),lgnMat);lgnL.scale.set(1,.72,1.45);lgnL.position.set(-1.18,.02,-2.16);
  const lgnR=lgnL.clone();lgnR.material=lgnMat.clone();lgnR.position.x=1.18;scene.add(lgnL,lgnR);

  function makeFallbackBrain(){
    const g=new THREE.Group();
    const baseMat=mat(0x9a7d82,{roughness:.82,clearcoat:.05,clearcoatRoughness:.8});
    function hemi(side){
      const geo=new THREE.SphereGeometry(1,88,64),p=geo.attributes.position,tmp=new THREE.Vector3();
      for(let i=0;i<p.count;i++){
        tmp.fromBufferAttribute(p,i);const n=tmp.clone().normalize();
        const fold=1+.055*Math.sin(n.x*18+n.z*14)+.04*Math.sin(n.y*24-n.z*11)+.025*Math.sin((n.x+n.y)*31);
        tmp.multiplyScalar(fold);p.setXYZ(i,tmp.x,tmp.y,tmp.z);
      }
      p.needsUpdate=true;geo.computeVertexNormals();
      const mesh=new THREE.Mesh(geo,baseMat.clone());mesh.scale.set(1.22,1.02,1.6);mesh.position.set(side*1.06,.05,-4.55);mesh.rotation.z=side*.035;mesh.castShadow=true;mesh.receiveShadow=true;g.add(mesh);
    }
    hemi(-1);hemi(1);
    const stem=new THREE.Mesh(new THREE.CapsuleGeometry(.34,1.2,10,22),mat(0x8f7378,{roughness:.84}));stem.position.set(0,-.85,-3.95);stem.rotation.x=.12;g.add(stem);
    const cereMat=mat(0x8e7177,{roughness:.86});
    [-.65,.65].forEach(x=>{const ce=new THREE.Mesh(new THREE.SphereGeometry(.72,48,34),cereMat.clone());ce.scale.set(1.05,.72,.72);ce.position.set(x,-.92,-5.25);g.add(ce)});
    return g;
  }
  const fallbackBrain=makeFallbackBrain();scene.add(fallbackBrain);

  const occBase=mat(0x8d70d4,{roughness:.5,transparent:true,opacity:.2,depthWrite:false,emissive:0x2d1b66,emissiveIntensity:.75});
  const occL=new THREE.Mesh(new THREE.SphereGeometry(.78,42,30),occBase);occL.scale.set(.78,1,.38);occL.position.set(-1.08,.05,-5.95);
  const occR=occL.clone();occR.material=occBase.clone();occR.position.x=1.08;scene.add(occL,occR);
  const visualMaterials=[occL.material,occR.material];

  const radiationCurves={left:[],right:[]};
  const radBase=basic(0x9a81d3,{transparent:true,opacity:.56,emissive:0x2a1d58,emissiveIntensity:.55,roughness:.5});
  for(let i=-4;i<=4;i++){
    const yy=i*.19,low=i<0;
    const lp=low
      ?[[-1.18,.02,-2.16],[-1.65,-.28,-1.82],[-2.03,yy,-3.16],[-1.68,yy*.9,-4.6],[-1.16,yy*.9,-5.86]]
      :[[-1.18,.02,-2.16],[-1.48,yy*.35,-2.65],[-1.82,yy,-3.72],[-1.58,yy*.9,-4.85],[-1.16,yy*.88,-5.86]];
    const rp=lp.map(([x,y,z])=>[-x,y,z]);
    const L=tube(lp,.04+(4-Math.abs(i))*.003,radBase.clone(),76);const R=tube(rp,.04+(4-Math.abs(i))*.003,radBase.clone(),76);scene.add(L.mesh,R.mesh);radiationCurves.left.push(L.curve);radiationCurves.right.push(R.curve);
  }

  function spriteLabel(text,pos,scale=1){
    const cv=document.createElement('canvas');cv.width=640;cv.height=144;const ctx=cv.getContext('2d');
    ctx.fillStyle='rgba(4,14,22,.82)';ctx.beginPath();ctx.roundRect(12,18,616,108,30);ctx.fill();ctx.strokeStyle='rgba(180,235,255,.42)';ctx.lineWidth=3;ctx.stroke();
    ctx.fillStyle='#e8f9ff';ctx.font='600 34px Manrope, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,320,72);
    const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}));sp.position.set(...pos);sp.scale.set(2.35*scale,.53*scale,1);scene.add(sp);
  }
  spriteLabel(labels.optic,[-2.05,.82,1.33],.86);spriteLabel(labels.chiasm,[0,.82,.35],.92);spriteLabel(labels.tract,[1.03,.76,-.82],.86);
  spriteLabel(labels.lgn,[-1.18,.78,-2.16],.76);spriteLabel(labels.lgn,[1.18,.78,-2.16],.76);spriteLabel(labels.radiation,[1.95,1.02,-4.15],.9);spriteLabel(labels.v1,[0,1.52,-5.92],.94);

  const leftPre=new THREE.CatmullRomCurve3([new THREE.Vector3(-1.45,.08,2.08),new THREE.Vector3(-1.22,.06,1.38),new THREE.Vector3(-.48,.03,.48),new THREE.Vector3(0,.02,.3)]);
  const rightPre=new THREE.CatmullRomCurve3([new THREE.Vector3(1.45,.08,2.08),new THREE.Vector3(1.22,.06,1.38),new THREE.Vector3(.48,.03,.48),new THREE.Vector3(0,.02,.3)]);
  const centralL=radiationCurves.left[4],centralR=radiationCurves.right[4];
  const routes=[[leftPre,tractL.curve,centralL],[leftPre,tractR.curve,centralR],[rightPre,tractR.curve,centralR],[rightPre,tractL.curve,centralL]];
  function metric(route){const lengths=route.map(x=>x.getLength());return{route,lengths,total:lengths.reduce((a,b)=>a+b,0)}}
  const routeMetrics=routes.map(metric);
  function routePoint(m,u){let d=THREE.MathUtils.clamp(u,0,.999999)*m.total;for(let i=0;i<m.route.length;i++){if(d<=m.lengths[i])return m.route[i].getPointAt(d/m.lengths[i]);d-=m.lengths[i]}return m.route[m.route.length-1].getPoint(1)}
  const signalMat=new THREE.MeshBasicMaterial({color:0x7ef6ff,transparent:true,opacity:.96,blending:THREE.AdditiveBlending,depthWrite:false});
  const particles=[];for(let i=0;i<32;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.055,14,10),signalMat);p.visible=false;scene.add(p);particles.push({p,route:routeMetrics[i%4],delay:(i%8)*.034})}
  let runStart=null;const runButton=section.querySelector('#cortexRun');
  runButton?.addEventListener('click',e=>{runStart=performance.now();particles.forEach(x=>x.p.visible=false);e.currentTarget.classList.add('active')});

  loopFns.push(t=>{
    if(runStart==null)return;
    const elapsed=t-runStart,head=elapsed/5200;
    particles.forEach((x,i)=>{const q=head-x.delay;if(q>=0&&q<=1){x.p.visible=true;x.p.position.copy(routePoint(x.route,q));const s=.82+.3*Math.sin(elapsed*.012+i);x.p.scale.setScalar(s)}else{x.p.visible=false}});
    const chPulse=Math.exp(-Math.pow((head-.24)/.085,2)),lgnPulse=Math.exp(-Math.pow((head-.49)/.095,2));
    chiasm.material.emissiveIntensity=.15+1.9*chPulse;lgnL.material.emissiveIntensity=.32+2.2*lgnPulse;lgnR.material.emissiveIntensity=.32+2.2*lgnPulse;
    const arrival=THREE.MathUtils.smoothstep(head,.72,1),pulse=arrival*(.55+.45*Math.pow(Math.sin(elapsed*.01),2));
    visualMaterials.forEach(m=>{m.opacity=.18+.28*pulse;m.emissiveIntensity=.65+1.65*pulse});
    if(elapsed>5900){runStart=null;particles.forEach(x=>x.p.visible=false);chiasm.material.emissiveIntensity=.15;lgnL.material.emissiveIntensity=lgnR.material.emissiveIntensity=.32;visualMaterials.forEach(m=>{m.opacity=.2;m.emissiveIntensity=.75});runButton?.classList.remove('active')}
  });

  // Runtime-loaded, real anatomical atlas. The fallback above remains visible if the CDN/model cannot load.
  // 3D anatomy asset: Brain Project (Z-Anatomy / BodyParts3D / DBCLS), CC BY-SA 4.0.
  (async()=>{
    try{
      const [{GLTFLoader},{DRACOLoader}]=await Promise.all([
        import('https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js'),
        import('https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/DRACOLoader.js')
      ]);
      if(disposed)return;
      const draco=new DRACOLoader();draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
      const loader=new GLTFLoader();loader.setDRACOLoader(draco);
      loader.load('https://cdn.jsdelivr.net/gh/itayinbarr/brainproject@2929e94f521a8ddceab26bc100a98dc06b0da060/brain-atlas/models/brain.glb',gltf=>{
        if(disposed){draco.dispose();return}
        const model=gltf.scene,visibleMeshes=[],occMeshes=[];
        const brainTissue=mat(0xa4878c,{roughness:.76,clearcoat:.07,clearcoatRoughness:.72});
        const occTissue=mat(0x8b70d2,{roughness:.64,clearcoat:.08,emissive:0x27164f,emissiveIntensity:.6});visualMaterials.push(occTissue);
        model.traverse(o=>{
          if(!o.isMesh)return;
          const d=`${o.name||''} ${o.userData?.bx_label||''} ${o.userData?.bx_region||''} ${o.userData?.bx_cat||''}`.toLowerCase();
          if(/arter|vein|sinus|mening|dura|ventric|cranial|optic|radiation|tract/.test(d)){o.visible=false;return}
          const occ=/occipital|cuneus|lingual|calcarine/.test(d);o.material=occ?occTissue:brainTissue;o.castShadow=false;o.receiveShadow=true;visibleMeshes.push(o);if(occ)occMeshes.push(o);
        });
        model.updateMatrixWorld(true);
        const box=new THREE.Box3().makeEmpty(),tmpBox=new THREE.Box3();
        visibleMeshes.forEach(o=>{o.geometry.computeBoundingBox();tmpBox.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);box.union(tmpBox)});
        if(box.isEmpty()){draco.dispose();return}
        const center=box.getCenter(new THREE.Vector3()),size=box.getSize(new THREE.Vector3());
        let occCenter=center.clone().add(new THREE.Vector3(0,0,-1));
        if(occMeshes.length){const ob=new THREE.Box3().makeEmpty();occMeshes.forEach(o=>{tmpBox.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);ob.union(tmpBox)});if(!ob.isEmpty())occCenter=ob.getCenter(new THREE.Vector3())}
        const occVec=occCenter.clone().sub(center),pivot=new THREE.Group();model.position.sub(center);pivot.add(model);
        const targetSize=4.85/Math.max(size.x,size.y,size.z);pivot.scale.setScalar(targetSize);
        const horizontal=Math.hypot(occVec.x,occVec.z);if(horizontal>.001)pivot.rotation.y=Math.atan2(-occVec.x,occVec.z)+Math.PI;
        pivot.position.set(0,.03,-4.5);scene.add(pivot);fallbackBrain.visible=false;draco.dispose();
      },undefined,()=>draco.dispose());
    }catch(err){console.warn('Real anatomical brain model could not load; using local fallback.',err)}
  })();
}

function initAll(){initVision();initRetina();initDisorder();initMuscles();initCortex();}
renderMarkup();
new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang'))renderMarkup()}).observe(document.documentElement,{attributes:true});