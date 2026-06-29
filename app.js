(() => {
  'use strict';
  const scenes = [...document.querySelectorAll('.scene')];
  let current = 0;
  const progressBar = document.getElementById('progressBar');
  const sceneLabel = document.getElementById('sceneLabel');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const notesPanel = document.getElementById('notesPanel');
  const notesButton = document.getElementById('notesButton');
  const closeNotes = document.getElementById('closeNotes');
  const notesTitle = document.getElementById('notesTitle');
  const notesText = document.getElementById('notesText');
  const sceneTime = document.getElementById('sceneTime');
  const fullscreenButton = document.getElementById('fullscreenButton');

  function setViewportUnit(){
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }
  setViewportUnit();
  window.addEventListener('resize', setViewportUnit, {passive:true});
  window.addEventListener('orientationchange', setViewportUnit, {passive:true});

  function formatTime(sec){
    const s = Math.max(0, Math.floor(sec));
    return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;
  }
  function updateScene(next, direction = 1){
    if(next < 0 || next >= scenes.length || next === current) return;
    const old = scenes[current];
    old.classList.remove('is-active');
    old.classList.toggle('is-leaving', direction > 0);
    current = next;
    scenes[current].classList.add('is-active');
    setTimeout(() => old.classList.remove('is-leaving'), 450);
    updateChrome();
    if(window.innerWidth <= 800){
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, left: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  }
  function updateChrome(){
    const scene = scenes[current];
    progressBar.style.width = `${((current + 1) / scenes.length) * 100}%`;
    sceneLabel.textContent = `${String(current + 1).padStart(2,'0')} / ${String(scenes.length).padStart(2,'0')} • ${scene.dataset.title}`;
    prevButton.disabled = current === 0;
    nextButton.disabled = current === scenes.length - 1;
    notesTitle.textContent = scene.dataset.title;
    notesText.textContent = scene.dataset.notes || 'No presenter notes for this scene.';
    sceneTime.textContent = formatTime(Number(scene.dataset.time || 0));
  }
  prevButton.addEventListener('click', () => updateScene(current - 1, -1));
  nextButton.addEventListener('click', () => updateScene(current + 1, 1));
  document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', () => updateScene(current + 1, 1)));

  function toggleNotes(force){
    const open = typeof force === 'boolean' ? force : !notesPanel.classList.contains('is-open');
    notesPanel.classList.toggle('is-open', open);
    notesPanel.setAttribute('aria-hidden', String(!open));
  }
  notesButton.addEventListener('click', () => toggleNotes());
  closeNotes.addEventListener('click', () => toggleNotes(false));
  if(fullscreenButton && document.fullscreenEnabled !== false){
    fullscreenButton.addEventListener('click', async () => {
      try{
        if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
        else await document.exitFullscreen();
      }catch(err){ console.warn('Fullscreen unavailable', err); }
    });
  } else if(fullscreenButton){
    fullscreenButton.disabled = true;
    fullscreenButton.title = 'Fullscreen unavailable on this device';
  }

  let timerRemaining = 900, timerId = null;
  const timerButton = document.getElementById('timerButton');
  function renderTimer(){
    const negative = timerRemaining < 0;
    const abs = Math.abs(timerRemaining);
    timerButton.textContent = `${negative ? '+' : ''}${formatTime(abs)}`;
    timerButton.classList.toggle('is-over', negative);
  }
  function toggleTimer(){
    if(timerId){ clearInterval(timerId); timerId = null; timerButton.classList.remove('is-running'); return; }
    timerButton.classList.add('is-running');
    timerId = setInterval(() => { timerRemaining--; renderTimer(); }, 1000);
  }
  function resetTimer(){
    clearInterval(timerId); timerId = null; timerRemaining = 900;
    timerButton.classList.remove('is-running','is-over'); renderTimer();
  }
  timerButton.addEventListener('click', toggleTimer);

  document.addEventListener('keydown', e => {
    const tag = e.target.tagName;
    if(['INPUT','SELECT','TEXTAREA'].includes(tag)) return;
    if(e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' '){ e.preventDefault(); updateScene(current + 1, 1); }
    if(e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); updateScene(current - 1, -1); }
    if(e.key.toLowerCase() === 'n') toggleNotes();
    if(e.key.toLowerCase() === 'f' && fullscreenButton && !fullscreenButton.disabled) fullscreenButton.click();
    if(e.key.toLowerCase() === 'r') resetTimer();
    if(e.key === 'Escape') toggleNotes(false);
  });

  // Source figures dialog
  const sourceDialog = document.getElementById('sourceDialog');
  const dialogImage = document.getElementById('dialogImage');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogDescription = document.getElementById('dialogDescription');
  const figureData = {
    paper: {src:'assets/workflow-paper.webp', title:'Fig. 1 — DMSS-FAAS workflow', desc:'Original workflow figure from page 3 of the uploaded paper. The website animation is a reconstructed explanation of these five steps.'},
    characterization: {src:'assets/characterization-paper.webp', title:'Fig. 2 — Chemical, charge and thermal characterization', desc:'FTIR, zeta potential, TGA and DTG evidence used to verify the hybrid M-OPP material.'},
    microscopy: {src:'assets/microscopy-paper.webp', title:'Fig. 3 — TEM and SEM morphology', desc:'Microscopy comparison of OPP, M-OPP and Fe₃O₄ used to support the physical structure and morphology discussion.'}
  };
  document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => {
    const data = figureData[btn.dataset.open];
    if(!data) return;
    dialogImage.src = data.src; dialogTitle.textContent = data.title; dialogDescription.textContent = data.desc;
    sourceDialog.showModal();
  }));
  sourceDialog.querySelector('.dialog-close').addEventListener('click', () => sourceDialog.close());
  sourceDialog.addEventListener('click', e => { if(e.target === sourceDialog) sourceDialog.close(); });

  // Comparison tabs
  document.querySelectorAll('.compare-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.compare-tab').forEach(t => t.classList.toggle('is-selected', t === tab));
    document.querySelectorAll('[data-method-panel]').forEach(panel => panel.classList.toggle('is-visible', panel.dataset.methodPanel === tab.dataset.method));
  }));

  // Experiment animation
  const particles = document.getElementById('particles');
  const sampleTube = document.getElementById('sampleTube');
  const externalMagnet = document.getElementById('externalMagnet');
  const magneticProbe = document.getElementById('magneticProbe');
  const flame = document.getElementById('flame');
  const experimentSignal = document.getElementById('experimentSignal');
  const signalCaption = document.getElementById('signalCaption');
  const experimentInstruction = document.getElementById('experimentInstruction');
  const experimentStepText = document.getElementById('experimentStep');
  const experimentProgress = document.getElementById('experimentProgress');
  const protocolItems = [...document.querySelectorAll('.protocol-list li')];
  const runExperimentButton = document.getElementById('runExperiment');
  const metalButtons = [...document.querySelectorAll('.metal-button')];
  const metalInfo = {
    Cd: { pH: '7.0', signal: 'Cd absorbance at 228.8 nm' },
    Pb: { pH: '4.0', signal: 'Pb absorbance at 283.3 nm' }
  };
  let activeMetal = 'Cd';
  let expStep = 0;

  function experimentInstructions(){
    return [
      `Add 3 mg of M-OPP to the ${activeMetal} sample adjusted to pH ${metalInfo[activeMetal].pH}.`,
      'Disperse the particles for 25 min at 1000 rpm to allow adsorption.',
      'Use an external magnet for 10 s to gather M-OPP at the bottom of the tube.',
      'Lower the magnetic probe and collect the magnetic particles.',
      `Insert the probe into the FAAS flame and record the ~16 s transient peak (${metalInfo[activeMetal].signal}).`
    ];
  }
  function makeParticles(){
    particles.innerHTML = '';
    for(let i=0;i<38;i++){
      const dot = document.createElement('i');
      dot.style.left = `${8 + Math.random()*80}%`;
      dot.style.top = `${15 + Math.random()*72}%`;
      dot.style.animationDelay = `${-Math.random()*2}s`;
      dot.style.setProperty('--left', `${15 + Math.random()*70}%`);
      dot.style.setProperty('--settle', `${Math.random()*12}px`);
      particles.appendChild(dot);
    }
  }
  function clearExperimentVisuals(){
    sampleTube.classList.remove('is-shaking');
    externalMagnet.classList.remove('is-active');
    magneticProbe.className = 'magnetic-probe';
    flame.classList.remove('is-hot');
    particles.classList.remove('is-settled');
    particles.style.opacity = '0';
    experimentSignal.setAttribute('d','M22 105 C80 105 120 105 160 105 C190 105 220 105 280 105');
  }
  function applyExperimentState(step){
    clearExperimentVisuals();
    if(step >= 0){
      particles.style.opacity = '1';
      signalCaption.textContent = `M-OPP dispersed in the ${activeMetal} sample (pH ${metalInfo[activeMetal].pH}).`;
    } else {
      signalCaption.textContent = `Waiting for sorbent introduction into the ${activeMetal} sample.`;
    }
    if(step >= 1){
      sampleTube.classList.add('is-shaking');
      signalCaption.textContent = 'Adsorption in progress during the 25 min contact time.';
      setTimeout(() => {
        if(expStep >= 2 || step >= 1) sampleTube.classList.remove('is-shaking');
      }, 1300);
    }
    if(step >= 2){
      sampleTube.classList.remove('is-shaking');
      externalMagnet.classList.add('is-active');
      particles.classList.add('is-settled');
      signalCaption.textContent = 'Magnetic particles gathered at the bottom of the tube.';
    }
    if(step >= 3){
      magneticProbe.classList.add('is-lowered');
      particles.style.opacity = '.15';
      signalCaption.textContent = 'Particles collected at the magnetic probe tip.';
    }
    if(step >= 4){
      magneticProbe.classList.remove('is-lowered');
      magneticProbe.classList.add('is-flame');
      flame.classList.add('is-hot');
      experimentSignal.setAttribute('d','M22 105 C85 105 130 105 165 105 C190 105 196 102 204 73 C211 43 216 16 222 16 C229 16 234 66 242 91 C251 105 267 105 280 105');
      signalCaption.textContent = `Conceptual transient peak (~16 s): ${metalInfo[activeMetal].signal}.`;
    }
  }
  function renderExperiment(){
    const instructions = experimentInstructions();
    protocolItems.forEach((li,i) => {
      li.classList.toggle('is-current', i === expStep);
      li.classList.toggle('is-done', i < expStep);
    });
    experimentStepText.textContent = `Step ${Math.min(expStep + 1, 5)} of 5`;
    experimentInstruction.textContent = instructions[Math.min(expStep, instructions.length - 1)];
    experimentProgress.style.width = `${Math.min((expStep + 1) * 20, 100)}%`;
    runExperimentButton.innerHTML = expStep > 4 ? 'Experiment complete <span>✓</span>' : 'Run next step <span>→</span>';
  }
  function resetExperiment(){
    expStep = 0;
    makeParticles();
    applyExperimentState(-1);
    renderExperiment();
  }
  function performExperimentStep(step){
    const target = typeof step === 'number' ? step : expStep;
    applyExperimentState(target);
    if(target >= 4){
      expStep = 5;
    } else {
      expStep = target + 1;
    }
    renderExperiment();
  }
  metalButtons.forEach(btn => btn.addEventListener('click', () => {
    activeMetal = btn.dataset.metal;
    metalButtons.forEach(b => b.classList.toggle('is-active', b === btn));
    if(expStep === 0) applyExperimentState(-1);
    else applyExperimentState(Math.min(expStep - 1, 4));
    renderExperiment();
  }));
  runExperimentButton.addEventListener('click', () => {
    if(expStep > 4){
      resetExperiment();
      return;
    }
    performExperimentStep();
  });
  document.getElementById('resetExperiment').addEventListener('click', resetExperiment);
  document.querySelectorAll('[data-exp-step]').forEach(btn => btn.addEventListener('click', () => {
    const target = Number(btn.dataset.expStep);
    resetExperiment();
    for(let step = 0; step <= target; step++){
      applyExperimentState(step);
    }
    expStep = Math.min(target + 1, 5);
    renderExperiment();
  }));
  resetExperiment();

  // Sorbent synthesis
  document.querySelectorAll('.synthesis-step').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.synthesis-step').forEach(b => b.classList.toggle('is-active', b === btn));
    document.getElementById('synthesisVisual').className = `synthesis-visual state-${btn.dataset.synthesis}`;
  }));

  // DOE optimizer using equations reported in the paper
  const volumeRange = document.getElementById('volumeRange');
  const massRange = document.getElementById('massRange');
  const timeRange = document.getElementById('timeRange');
  const matrixSelect = document.getElementById('matrixSelect');
  const optimizerMetal = document.getElementById('optimizerMetal');
  const predictedAbsorbance = document.getElementById('predictedAbsorbance');
  const responseGauge = document.getElementById('responseGauge');
  const optimizationVerdict = document.getElementById('optimizationVerdict');
  function predictAbs(){
    const V=Number(volumeRange.value), M=Number(massRange.value), T=Number(timeRange.value);
    const x1=(V-17.5)/12.5, x2=(M-1.75)/1.25, x3=(T-14)/11;
    let y=0;
    if(matrixSelect.value==='coffee' && optimizerMetal.value==='Cd') y=.412+.090*x1+.253*x2+.058*x3+.050*x1*x3+.038*x2*x3;
    if(matrixSelect.value==='coffee' && optimizerMetal.value==='Pb') y=.064+.014*x1+.043*x2+.012*x3+.004*x1*x2+.013*x1*x3+.010*x2*x3;
    if(matrixSelect.value==='tea' && optimizerMetal.value==='Cd') y=.870+.060*x1+.300*x2+.120*x3-.070*x1*x3;
    if(matrixSelect.value==='tea' && optimizerMetal.value==='Pb') y=.103+.023*x1+.036*x2+.009*x3+.021*x1*x2;
    document.getElementById('volumeValue').textContent = `${V.toFixed(0)} mL`;
    document.getElementById('massValue').textContent = `${M.toFixed(1)} mg`;
    document.getElementById('timeValue').textContent = `${T.toFixed(0)} min`;
    predictedAbsorbance.textContent = Math.max(0,y).toFixed(3);
    const maxMap = {tea:{Cd:1.30,Pb:.20},coffee:{Cd:.95,Pb:.17}};
    const pct=Math.max(4,Math.min(100,(y/maxMap[matrixSelect.value][optimizerMetal.value])*100));
    responseGauge.style.width=`${pct}%`;
    const atOptimum=V===30 && M===3 && T===25;
    optimizationVerdict.textContent=atOptimum?'Optimized region reached':'Inside the studied experimental range';
    optimizationVerdict.style.color=atOptimum?'var(--mint)':'var(--gold)';
  }
  [volumeRange,massRange,timeRange,matrixSelect,optimizerMetal].forEach(el=>el.addEventListener('input',predictAbs));
  document.getElementById('setOptimum').addEventListener('click',()=>{volumeRange.value=30;massRange.value=3;timeRange.value=25;predictAbs();});
  predictAbs();

  // Adsorption toggle
  const adsorbData = {
    Cd:{kinetic:'Avrami fractional-order',qe:'0.18 mg g⁻¹',iso:'Toth',qmax:'0.510',text:'Cd showed lower capacity and behavior consistent with heterogeneous adsorption sites.',curve:'M45 175 C70 80 105 48 160 36 C230 24 310 23 390 23'},
    Pb:{kinetic:'Pseudo-second-order',qe:'5.61 mg g⁻¹',iso:'Sips',qmax:'9.020',text:'Pb showed much higher adsorption capacity; the kinetic fit was consistent with chemisorption behavior.',curve:'M45 175 C58 93 83 48 122 30 C190 18 292 20 390 20'}
  };
  document.querySelectorAll('.adsorb-button').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.adsorb-button').forEach(b=>b.classList.toggle('is-active',b===btn));
    const d=adsorbData[btn.dataset.adsorb];
    document.getElementById('kineticModel').textContent=d.kinetic; document.getElementById('kineticQe').textContent=d.qe;
    document.getElementById('isothermModel').textContent=d.iso; document.getElementById('qmaxValue').textContent=d.qmax; document.getElementById('adsorbInterpretation').textContent=d.text;
    document.getElementById('kineticCurve').setAttribute('d',d.curve);
    const ions=document.getElementById('adsorbIons'); ions.className=`adsorb-ions ${btn.dataset.adsorb==='Pb'?'pb-mode':'cd-mode'}`; ions.querySelectorAll('i').forEach(i=>i.textContent=`${btn.dataset.adsorb}²⁺`);
  }));

  // Sensitivity chart
  const gainData={Cd:[['Water',29.33],['Tea',32.00],['Coffee',17.66]],Pb:[['Water',106.66],['Tea',103.33],['Coffee',70.00]]};
  function renderGain(metal){
    const chart=document.getElementById('gainChart'), data=gainData[metal], max=Math.max(...data.map(d=>d[1])); chart.innerHTML='';
    data.forEach(([name,val])=>{const col=document.createElement('div');col.className='bar-column';col.innerHTML=`<b>${val.toFixed(2)}×</b><i style="height:${(val/max)*82}%"></i><span>${name}</span>`;chart.appendChild(col);});
  }
  document.querySelectorAll('.gain-button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.gain-button').forEach(b=>b.classList.toggle('is-active',b===btn));renderGain(btn.dataset.gain);}));
  renderGain('Cd');

  // Real samples
  const samples=[{name:'Mint tea 1',type:'Mint tea',value:10.67},{name:'Mint tea 2',type:'Mint tea',value:16.03},{name:'Coffee 1',type:'Coffee',value:12.60},{name:'Coffee 2',type:'Coffee',value:15.81},{name:'Coffee 3',type:'Coffee',value:21.12}];
  const realChart=document.getElementById('realSampleChart'), sampleButtons=document.getElementById('sampleButtons');
  function selectSample(index){
    const s=samples[index]; document.getElementById('selectedSampleType').textContent=s.type; document.getElementById('selectedSampleValue').textContent=s.value.toFixed(2); document.getElementById('sampleMrlFill').style.width=`${(s.value/50)*100}%`;
    [...sampleButtons.children].forEach((b,i)=>b.classList.toggle('is-active',i===index));
  }
  samples.forEach((s,i)=>{
    const bar=document.createElement('div');bar.className='sample-result-bar';bar.innerHTML=`<b>${s.value.toFixed(2)}</b><i style="height:${(s.value/50)*82}%"></i><span>${s.name}</span>`;realChart.appendChild(bar);
    const btn=document.createElement('button');btn.type='button';btn.textContent=s.name;btn.addEventListener('click',()=>selectSample(i));sampleButtons.appendChild(btn);
  }); selectSample(0);

  // PWA
  if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(console.warn)); }
  updateChrome(); renderTimer();
})();
