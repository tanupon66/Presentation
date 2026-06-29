(() => {
  'use strict';

  const lang = document.documentElement.lang && document.documentElement.lang.toLowerCase().startsWith('th') ? 'th' : 'en';
  const dict = {
    en: {
      sceneWord: 'Scene', ofWord: 'of', noNotes: 'No presenter notes for this scene.',
      timerLabel: 'REHEARSAL', quickNotesLabel: 'QUICK NOTES', quickNotesButton: 'Notes',
      presenterButton: 'Presenter', dualButton: 'Dual', demoStart: '▶ Demo', demoStop: '❚❚ Stop demo',
      demoOff: 'Demo mode off', demoOn: 'Demo mode on', demoEnds: 'Demo complete',
      presenterEyebrow: 'PRESENTER MODE', presenterCurrentLabel: 'Current scene', presenterSuggestedLabel: 'Suggested time',
      presenterCountdownLabel: 'Auto next in', presenterTimerLabel: 'Rehearsal timer', presenterNextLabel: 'Up next',
      presenterNextHint: 'Prepare the transition to the next scene.', presenterSceneListLabel: 'Scene list',
      presenterSceneListHint: 'Jump directly to any scene', presenterPrev: '← Prev', presenterNext: 'Next →', presenterRestart: 'Restart demo',
      suggestedSceneTime: 'Suggested scene time', keyboardHelp: 'Keyboard', kbNav: '← → / Space: navigate', kbNotes: 'N: notes',
      kbFull: 'F: fullscreen', kbReset: 'R: reset timer', kbDemo: 'D: demo mode', kbPresenter: 'P: presenter mode',
      sourceFigure: 'SOURCE FIGURE', dualWindowTitle: 'DMSS-FAAS Presenter View',
      mobileMenuTitle: 'Quick controls', mobilePrev: 'Previous', mobileNext: 'Next', mobileNotes: 'Notes', mobilePresenter: 'Presenter',
      mobileDual: 'Dual view', mobileDemo: 'Demo', mobileTimer: 'Start / pause timer', mobileReset: 'Reset timer', mobileFullscreen: 'Fullscreen',
      waitingSorbent: metal => `Waiting for sorbent introduction into the ${metal} sample.`,
      signalDispersed: (metal, pH) => `M-OPP dispersed in the ${metal} sample (pH ${pH}).`,
      signalAdsorption: 'Adsorption in progress during the 25 min contact time.', signalGathered: 'Magnetic particles gathered at the bottom of the tube.',
      signalCollected: 'Particles collected at the magnetic probe tip.', signalPeak: signal => `Conceptual transient peak (~16 s): ${signal}.`,
      expSteps: metalInfo => [
        `Add 3 mg of M-OPP to the ${metalInfo.name} sample adjusted to pH ${metalInfo.pH}.`,
        'Disperse the particles for 25 min at 1000 rpm to allow adsorption.',
        'Use an external magnet for 10 s to gather M-OPP at the bottom of the tube.',
        'Lower the magnetic probe and collect the magnetic particles.',
        `Insert the probe into the FAAS flame and record the ~16 s transient peak (${metalInfo.signal}).`
      ],
      expComplete: 'Experiment complete <span>✓</span>', expRun: 'Run next step <span>→</span>', stepOf: step => `Step ${step} of 5`,
      optimized: 'Optimized region reached', insideRange: 'Inside the studied experimental range',
      adsorbData: {
        Cd: { kinetic: 'Avrami fractional-order', qe: '0.18 mg g⁻¹', iso: 'Toth', qmax: '0.510', text: 'Cd showed lower capacity and behavior consistent with heterogeneous adsorption sites.', curve: 'M45 175 C70 80 105 48 160 36 C230 24 310 23 390 23', ion: 'Cd²⁺' },
        Pb: { kinetic: 'Pseudo-second-order', qe: '5.61 mg g⁻¹', iso: 'Sips', qmax: '9.020', text: 'Pb showed much higher adsorption capacity; the kinetic fit was consistent with chemisorption behavior.', curve: 'M45 175 C58 93 83 48 122 30 C190 18 292 20 390 20', ion: 'Pb²⁺' }
      },
      gainData: { Cd: [['Water',29.33],['Tea',32.00],['Coffee',17.66]], Pb: [['Water',106.66],['Tea',103.33],['Coffee',70.00]] },
      samples: [
        { name:'Mint tea 1', type:'Mint tea', value:10.67 }, { name:'Mint tea 2', type:'Mint tea', value:16.03 },
        { name:'Coffee 1', type:'Coffee', value:12.60 }, { name:'Coffee 2', type:'Coffee', value:15.81 }, { name:'Coffee 3', type:'Coffee', value:21.12 }
      ],
      figureData: {
        paper: {src:'assets/workflow-paper.webp', title:'Fig. 1 — DMSS-FAAS workflow', desc:'Original workflow figure from page 3 of the uploaded paper. The website animation is a reconstructed explanation of these five steps.'},
        characterization: {src:'assets/characterization-paper.webp', title:'Fig. 2 — Chemical, charge and thermal characterization', desc:'FTIR, zeta potential, TGA and DTG evidence used to verify the hybrid M-OPP material.'},
        microscopy: {src:'assets/microscopy-paper.webp', title:'Fig. 3 — TEM and SEM morphology', desc:'Microscopy comparison of OPP, M-OPP and Fe₃O₄ used to support the physical structure and morphology discussion.'}
      },
      installMessage: 'This presentation can be installed and used offline.', installButton: 'Install'
    },
    th: {
      sceneWord: 'ฉาก', ofWord: 'จาก', noNotes: 'ไม่มีบันทึกสำหรับฉากนี้',
      timerLabel: 'ซ้อมนำเสนอ', quickNotesLabel: 'โน้ตย่อ', quickNotesButton: 'โน้ต', presenterButton: 'ผู้นำเสนอ', dualButton: 'สองจอ',
      demoStart: '▶ เดโมอัตโนมัติ', demoStop: '❚❚ หยุดเดโม', demoOff: 'ปิดโหมดเดโม', demoOn: 'กำลังเล่นเดโมอัตโนมัติ', demoEnds: 'เดโมเล่นจบแล้ว',
      presenterEyebrow: 'โหมดผู้นำเสนอ', presenterCurrentLabel: 'ฉากปัจจุบัน', presenterSuggestedLabel: 'เวลาที่แนะนำ', presenterCountdownLabel: 'เปลี่ยนฉากใน',
      presenterTimerLabel: 'ตัวจับเวลาซ้อม', presenterNextLabel: 'ฉากถัดไป', presenterNextHint: 'เตรียมประโยคเชื่อมไปยังฉากถัดไป', presenterSceneListLabel: 'รายการฉาก',
      presenterSceneListHint: 'กดเพื่อข้ามไปฉากที่ต้องการ', presenterPrev: '← ก่อนหน้า', presenterNext: 'ถัดไป →', presenterRestart: 'เริ่มเดโมใหม่',
      suggestedSceneTime: 'เวลาที่แนะนำต่อฉาก', keyboardHelp: 'แป้นพิมพ์ลัด', kbNav: '← → / Space: เปลี่ยนฉาก', kbNotes: 'N: โน้ต', kbFull: 'F: เต็มจอ',
      kbReset: 'R: รีเซ็ตเวลา', kbDemo: 'D: โหมดเดโม', kbPresenter: 'P: โหมดผู้นำเสนอ', sourceFigure: 'ภาพอ้างอิงจากบทความ', dualWindowTitle: 'หน้าผู้นำเสนอ DMSS-FAAS',
      mobileMenuTitle: 'คำสั่งด่วน', mobilePrev: 'ก่อนหน้า', mobileNext: 'ถัดไป', mobileNotes: 'โน้ต', mobilePresenter: 'ผู้นำเสนอ', mobileDual: 'มุมมองสองจอ',
      mobileDemo: 'เดโม', mobileTimer: 'เริ่ม / หยุดเวลา', mobileReset: 'รีเซ็ตเวลา', mobileFullscreen: 'เต็มจอ',
      waitingSorbent: metal => `รอการเติมตัวดูดซับลงในตัวอย่าง ${metal}`,
      signalDispersed: (metal, pH) => `M-OPP กระจายตัวในตัวอย่าง ${metal} (pH ${pH})`, signalAdsorption: 'กำลังเกิดการดูดซับระหว่างเวลาสัมผัส 25 นาที',
      signalGathered: 'อนุภาคแม่เหล็กรวมตัวอยู่ที่ก้นหลอดตัวอย่าง', signalCollected: 'อนุภาคถูกรวบรวมที่ปลาย magnetic probe', signalPeak: signal => `สัญญาณชั่วคราวเชิงแนวคิด (~16 วินาที): ${signal}`,
      expSteps: metalInfo => [
        `เติม M-OPP 3 mg ลงในตัวอย่าง ${metalInfo.name} ที่ปรับเป็น pH ${metalInfo.pH}`,
        'กระจายอนุภาคที่ 1000 rpm เป็นเวลา 25 นาที เพื่อให้เกิดการดูดซับ',
        'ใช้แม่เหล็กภายนอก 10 วินาที เพื่อรวบรวม M-OPP ที่ก้นหลอด',
        'ลด magnetic probe ลงไปเพื่อเก็บอนุภาคแม่เหล็ก',
        `นำ probe เข้าสู่เปลวไฟ FAAS และอ่านสัญญาณชั่วคราว ~16 วินาที (${metalInfo.signal})`
      ],
      expComplete: 'การทดลองเสร็จสิ้น <span>✓</span>', expRun: 'ทำขั้นตอนถัดไป <span>→</span>', stepOf: step => `ขั้นตอน ${step} จาก 5`,
      optimized: 'ถึงบริเวณสภาวะเหมาะสมแล้ว', insideRange: 'ยังอยู่ในช่วงตัวแปรที่ศึกษา',
      adsorbData: {
        Cd: { kinetic: 'Avrami fractional-order', qe: '0.18 mg g⁻¹', iso: 'Toth', qmax: '0.510', text: 'Cd มีความจุการดูดซับต่ำกว่า และสอดคล้องกับพื้นผิวดูดซับที่ไม่เป็นเนื้อเดียวกัน', curve: 'M45 175 C70 80 105 48 160 36 C230 24 310 23 390 23', ion: 'Cd²⁺' },
        Pb: { kinetic: 'Pseudo-second-order', qe: '5.61 mg g⁻¹', iso: 'Sips', qmax: '9.020', text: 'Pb มีความจุการดูดซับสูงกว่ามาก และแบบจำลอง kinetics สอดคล้องกับพฤติกรรม chemisorption', curve: 'M45 175 C58 93 83 48 122 30 C190 18 292 20 390 20', ion: 'Pb²⁺' }
      },
      gainData: { Cd: [['น้ำ',29.33],['ชา',32.00],['กาแฟ',17.66]], Pb: [['น้ำ',106.66],['ชา',103.33],['กาแฟ',70.00]] },
      samples: [
        { name:'ชามินต์ 1', type:'ชามินต์', value:10.67 }, { name:'ชามินต์ 2', type:'ชามินต์', value:16.03 },
        { name:'กาแฟ 1', type:'กาแฟ', value:12.60 }, { name:'กาแฟ 2', type:'กาแฟ', value:15.81 }, { name:'กาแฟ 3', type:'กาแฟ', value:21.12 }
      ],
      figureData: {
        paper: {src:'assets/workflow-paper.webp', title:'รูปที่ 1 — ขั้นตอน DMSS-FAAS', desc:'ภาพขั้นตอนดั้งเดิมจากหน้า 3 ของบทความที่อัปโหลด เว็บไซต์นี้ใช้ภาพเคลื่อนไหวเพื่ออธิบายทั้งห้าขั้นตอนตามรูปดังกล่าว'},
        characterization: {src:'assets/characterization-paper.webp', title:'รูปที่ 2 — การยืนยันสมบัติทางเคมี ประจุพื้นผิว และความร้อน', desc:'ใช้ FTIR, zeta potential, TGA และ DTG เพื่อยืนยันว่าสร้างวัสดุ M-OPP ได้สำเร็จ'},
        microscopy: {src:'assets/microscopy-paper.webp', title:'รูปที่ 3 — ลักษณะ TEM และ SEM', desc:'เปรียบเทียบ OPP, M-OPP และ Fe₃O₄ เพื่อสนับสนุนการอภิปรายเรื่องโครงสร้างและสัณฐานวิทยา'}
      },
      installMessage: 'สามารถติดตั้งและใช้งานเว็บไซต์นี้แบบออฟไลน์ได้', installButton: 'ติดตั้ง'
    }
  };
  const t = dict[lang];

  const scenes = [...document.querySelectorAll('.scene')];
  let current = 0;
  let timerRemaining = 900;
  let timerId = null;
  let autoplayActive = false;
  let autoplayCountdown = null;
  let autoplayTickId = null;
  let deferredInstallPrompt = null;
  let compactFitRaf = null;

  const channelName = 'dmss-faas-presenter-sync';
  const syncChannel = 'BroadcastChannel' in window ? new BroadcastChannel(channelName) : null;

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
  const autoplayButton = document.getElementById('autoplayButton');
  const presenterButton = document.getElementById('presenterButton');
  const dualScreenButton = document.getElementById('dualScreenButton');
  const demoIndicator = document.getElementById('demoIndicator');
  const timerButton = document.getElementById('timerButton');
  const timerLabel = document.getElementById('timerLabel');

  const presenterPanel = document.getElementById('presenterPanel');
  const closePresenter = document.getElementById('closePresenter');
  const presenterCurrentTitle = document.getElementById('presenterCurrentTitle');
  const presenterCurrentIndex = document.getElementById('presenterCurrentIndex');
  const presenterAudienceTitle = document.getElementById('presenterAudienceTitle');
  const presenterNotesText = document.getElementById('presenterNotesText');
  const presenterSceneTime = document.getElementById('presenterSceneTime');
  const presenterCountdown = document.getElementById('presenterCountdown');
  const presenterTimer = document.getElementById('presenterTimer');
  const presenterNextTitle = document.getElementById('presenterNextTitle');
  const presenterSceneList = document.getElementById('presenterSceneList');
  const presenterMiniTimeline = document.getElementById('presenterMiniTimeline');
  const presenterPrev = document.getElementById('presenterPrev');
  const presenterNext = document.getElementById('presenterNext');
  const presenterRestartDemo = document.getElementById('presenterRestartDemo');
  const presenterAutoplayButton = document.getElementById('presenterAutoplayButton');

  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileCommandSheet = document.getElementById('mobileCommandSheet');
  const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
  const closeMobileMenu = document.getElementById('closeMobileMenu');

  const dialogImage = document.getElementById('dialogImage');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogDescription = document.getElementById('dialogDescription');
  const sourceDialog = document.getElementById('sourceDialog');

  function setViewportUnit(){
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
  }
  function formatTime(sec){
    const s = Math.max(0, Math.floor(sec));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }
  function isCompactLandscape(){
    return window.innerWidth <= 950 && window.innerHeight <= 520 && window.innerWidth > window.innerHeight;
  }
  function queueFitActiveScene(){
    if(compactFitRaf) cancelAnimationFrame(compactFitRaf);
    compactFitRaf = requestAnimationFrame(applyActiveSceneFit);
  }
  function applyActiveSceneFit(){
    document.body.classList.toggle('compact-landscape', isCompactLandscape());
    scenes.forEach(scene => {
      scene.style.zoom = '';
      scene.style.transformOrigin = '';
    });
    if(!isCompactLandscape()) return;
    const active = scenes[current];
    if(!active) return;
    const topbarH = document.querySelector('.topbar')?.offsetHeight || 0;
    const availableH = Math.max(260, window.innerHeight - topbarH - 12);
    const availableW = Math.max(320, window.innerWidth - 12);
    const originalZoom = active.style.zoom;
    active.style.zoom = '1';
    const contentH = active.scrollHeight || active.offsetHeight;
    const contentW = active.scrollWidth || active.offsetWidth;
    let scale = Math.min(1, availableH / contentH, availableW / contentW);
    scale = Math.max(0.72, Number.isFinite(scale) ? scale : 1);
    active.style.zoom = String(scale);
    active.style.transformOrigin = 'top center';
    if(originalZoom === '1' && scale === 1) active.style.zoom = '';
  }

  function postPresenterState(){
    const scene = scenes[current];
    const nextScene = scenes[current + 1] || null;
    const payload = {
      type: 'state', lang, title: t.dualWindowTitle, current, total: scenes.length,
      sceneTitle: scene?.dataset.title || '', notes: scene?.dataset.notes || t.noNotes,
      sceneTime: formatTime(Number(scene?.dataset.time || 0)), timerText: timerButton.textContent,
      nextTitle: nextScene?.dataset.title || '—', autoplayActive, autoplayCountdown,
      demoIndicator: demoIndicator?.textContent || '',
      scenes: scenes.map((s, i) => ({ index: i, title: s.dataset.title, time: formatTime(Number(s.dataset.time || 0)) }))
    };
    try {
      localStorage.setItem('dmss-faas-presenter-state', JSON.stringify(payload));
    } catch (_) {}
    if(syncChannel) syncChannel.postMessage(payload);
  }
  function handleRemoteCommand(data){
    if(!data || data.type !== 'command') return;
    switch(data.command){
      case 'next': updateScene(current + 1, 1); break;
      case 'prev': updateScene(current - 1, -1); break;
      case 'toggle-autoplay': toggleAutoplay(); break;
      case 'restart-demo': stopAutoplay(); updateScene(0, -1); resetTimer(); toggleAutoplay(true); break;
      case 'toggle-notes': toggleNotes(); break;
      case 'toggle-presenter': togglePresenter(); break;
    }
  }
  if(syncChannel){
    syncChannel.onmessage = ev => handleRemoteCommand(ev.data);
  }

  function setStaticUILanguage(){
    timerLabel.textContent = t.timerLabel;
    notesButton.textContent = t.quickNotesButton;
    presenterButton.textContent = t.presenterButton;
    if(dualScreenButton) dualScreenButton.textContent = t.dualButton;
    document.getElementById('notesPanelLabel').textContent = t.quickNotesLabel;
    document.getElementById('sceneTimeLabel').textContent = t.suggestedSceneTime;
    document.getElementById('keyboardHelpLabel').textContent = t.keyboardHelp;
    document.getElementById('kbNav').textContent = t.kbNav;
    document.getElementById('kbNotes').textContent = t.kbNotes;
    document.getElementById('kbFull').textContent = t.kbFull;
    document.getElementById('kbReset').textContent = t.kbReset;
    document.getElementById('kbDemo').textContent = t.kbDemo;
    document.getElementById('kbPresenter').textContent = t.kbPresenter;
    document.getElementById('presenterEyebrow').textContent = t.presenterEyebrow;
    document.getElementById('presenterCurrentLabel').textContent = t.presenterCurrentLabel;
    document.getElementById('presenterSuggestedLabel').textContent = t.presenterSuggestedLabel;
    document.getElementById('presenterCountdownLabel').textContent = t.presenterCountdownLabel;
    document.getElementById('presenterTimerLabel').textContent = t.presenterTimerLabel;
    document.getElementById('presenterNextLabel').textContent = t.presenterNextLabel;
    document.getElementById('presenterNextHint').textContent = t.presenterNextHint;
    document.getElementById('sceneListLabel').textContent = t.presenterSceneListLabel;
    document.getElementById('sceneListHint').textContent = t.presenterSceneListHint;
    presenterPrev.textContent = t.presenterPrev;
    presenterNext.textContent = t.presenterNext;
    presenterRestartDemo.textContent = t.presenterRestart;
    document.getElementById('dialogEyebrow').textContent = t.sourceFigure;
    document.getElementById('installToast').querySelector('span').textContent = t.installMessage;
    document.getElementById('installButton').textContent = t.installButton;
    document.getElementById('mobileMenuTitle').textContent = t.mobileMenuTitle;
    document.getElementById('mobilePrevLabel').textContent = t.mobilePrev;
    document.getElementById('mobileNextLabel').textContent = t.mobileNext;
    document.getElementById('mobileNotesLabel').textContent = t.mobileNotes;
    document.getElementById('mobilePresenterLabel').textContent = t.mobilePresenter;
    document.getElementById('mobileDualLabel').textContent = t.mobileDual;
    document.getElementById('mobileDemoLabel').textContent = t.mobileDemo;
    document.getElementById('mobileTimerLabel').textContent = t.mobileTimer;
    document.getElementById('mobileResetLabel').textContent = t.mobileReset;
    document.getElementById('mobileFullscreenLabel').textContent = t.mobileFullscreen;
  }

  function buildPresenterSceneList(){
    presenterSceneList.innerHTML = '';
    scenes.forEach((scene, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'scene-jump';
      btn.dataset.index = String(index);
      btn.innerHTML = `<b>${String(index + 1).padStart(2, '0')}</b><span>${scene.dataset.title}</span><small>${formatTime(Number(scene.dataset.time || 0))}</small>`;
      btn.addEventListener('click', () => updateScene(index, index > current ? 1 : -1));
      presenterSceneList.appendChild(btn);
    });
  }
  function renderMiniTimeline(){
    presenterMiniTimeline.innerHTML = '';
    const start = Math.max(0, current - 1);
    const end = Math.min(scenes.length - 1, current + 2);
    for(let i = start; i <= end; i++){
      const item = document.createElement('div');
      item.className = 'mini-scene-pill';
      if(i === current) item.classList.add('is-active');
      if(i === current + 1) item.classList.add('is-next');
      item.innerHTML = `<b>${String(i + 1).padStart(2, '0')}</b><span>${scenes[i].dataset.title}</span>`;
      presenterMiniTimeline.appendChild(item);
    }
  }
  function updateDemoIndicator(){
    if(!demoIndicator) return;
    demoIndicator.hidden = false;
    if(!autoplayActive){
      demoIndicator.classList.remove('is-active');
      demoIndicator.textContent = t.demoOff;
      return;
    }
    demoIndicator.classList.add('is-active');
    demoIndicator.textContent = autoplayCountdown == null ? t.demoOn : `${t.demoOn} • ${formatTime(autoplayCountdown)}`;
  }
  function updateAutoplayButtons(){
    const label = autoplayActive ? t.demoStop : t.demoStart;
    autoplayButton.textContent = label;
    presenterAutoplayButton.textContent = label;
    document.getElementById('mobileDemoLabel').textContent = autoplayActive ? t.demoStop.replace('❚❚ ','') : t.mobileDemo;
  }
  function updateChrome(){
    const scene = scenes[current];
    progressBar.style.width = `${((current + 1) / scenes.length) * 100}%`;
    sceneLabel.textContent = `${String(current + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')} • ${scene.dataset.title}`;
    prevButton.disabled = current === 0;
    nextButton.disabled = current === scenes.length - 1;
    notesTitle.textContent = scene.dataset.title;
    notesText.textContent = scene.dataset.notes || t.noNotes;
    sceneTime.textContent = formatTime(Number(scene.dataset.time || 0));

    presenterCurrentTitle.textContent = scene.dataset.title;
    presenterAudienceTitle.textContent = scene.dataset.title;
    presenterCurrentIndex.textContent = `${t.sceneWord} ${current + 1} ${t.ofWord} ${scenes.length}`;
    presenterNotesText.textContent = scene.dataset.notes || t.noNotes;
    presenterSceneTime.textContent = formatTime(Number(scene.dataset.time || 0));
    presenterTimer.textContent = timerButton.textContent;
    presenterNextTitle.textContent = scenes[current + 1] ? scenes[current + 1].dataset.title : '—';
    [...presenterSceneList.children].forEach((btn, i) => btn.classList.toggle('is-active', i === current));
    renderMiniTimeline();
    postPresenterState();
    queueFitActiveScene();
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

  prevButton.addEventListener('click', () => updateScene(current - 1, -1));
  nextButton.addEventListener('click', () => updateScene(current + 1, 1));
  presenterPrev.addEventListener('click', () => updateScene(current - 1, -1));
  presenterNext.addEventListener('click', () => updateScene(current + 1, 1));
  document.querySelectorAll('[data-next]').forEach(btn => btn.addEventListener('click', () => updateScene(current + 1, 1)));

  function toggleNotes(force){
    const open = typeof force === 'boolean' ? force : !notesPanel.classList.contains('is-open');
    notesPanel.classList.toggle('is-open', open);
    notesPanel.setAttribute('aria-hidden', String(!open));
  }
  function togglePresenter(force){
    const open = typeof force === 'boolean' ? force : !presenterPanel.classList.contains('is-open');
    presenterPanel.classList.toggle('is-open', open);
    presenterPanel.setAttribute('aria-hidden', String(!open));
  }
  function openDualScreen(){
    const url = `presenter.html?lang=${lang}`;
    const win = window.open(url, 'dmssFaasPresenterWindow', 'popup=yes,width=1280,height=820,resizable=yes');
    if(win) setTimeout(postPresenterState, 350);
  }
  notesButton.addEventListener('click', () => toggleNotes());
  closeNotes.addEventListener('click', () => toggleNotes(false));
  presenterButton.addEventListener('click', () => togglePresenter());
  closePresenter.addEventListener('click', () => togglePresenter(false));
  if(dualScreenButton) dualScreenButton.addEventListener('click', openDualScreen);

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

  function renderTimer(){
    const negative = timerRemaining < 0;
    const abs = Math.abs(timerRemaining);
    timerButton.textContent = `${negative ? '+' : ''}${formatTime(abs)}`;
    timerButton.classList.toggle('is-over', negative);
    presenterTimer.textContent = timerButton.textContent;
    postPresenterState();
  }
  function toggleTimer(){
    if(timerId){ clearInterval(timerId); timerId = null; timerButton.classList.remove('is-running'); return; }
    timerButton.classList.add('is-running');
    timerId = setInterval(() => { timerRemaining--; renderTimer(); }, 1000);
  }
  function resetTimer(){
    clearInterval(timerId); timerId = null; timerRemaining = 900;
    timerButton.classList.remove('is-running', 'is-over');
    renderTimer();
  }
  timerButton.addEventListener('click', toggleTimer);

  function nextAutoplaySceneIndex(index){
    const nextIndex = index + 1;
    if(nextIndex >= scenes.length) return null;
    if(Number(scenes[nextIndex].dataset.time || 0) <= 0) return null;
    return nextIndex;
  }
  function stopAutoplay(finalMessage){
    autoplayActive = false;
    autoplayCountdown = null;
    clearInterval(autoplayTickId);
    autoplayTickId = null;
    updateAutoplayButtons();
    updateDemoIndicator();
    presenterCountdown.textContent = finalMessage || '—';
    if(finalMessage){
      demoIndicator.textContent = finalMessage;
      demoIndicator.classList.remove('is-active');
    }
    postPresenterState();
  }
  function scheduleAutoplay(){
    clearInterval(autoplayTickId);
    if(!autoplayActive){ updateDemoIndicator(); return; }
    const duration = Number(scenes[current].dataset.time || 0);
    if(duration <= 0){ stopAutoplay(t.demoEnds); return; }
    autoplayCountdown = duration;
    presenterCountdown.textContent = formatTime(autoplayCountdown);
    updateDemoIndicator();
    postPresenterState();
    autoplayTickId = setInterval(() => {
      autoplayCountdown--;
      presenterCountdown.textContent = autoplayCountdown >= 0 ? formatTime(autoplayCountdown) : '0:00';
      updateDemoIndicator();
      postPresenterState();
      if(autoplayCountdown <= 0){
        const nextIndex = nextAutoplaySceneIndex(current);
        if(nextIndex == null){ stopAutoplay(t.demoEnds); return; }
        updateScene(nextIndex, 1);
        scheduleAutoplay();
      }
    }, 1000);
  }
  function toggleAutoplay(force){
    const open = typeof force === 'boolean' ? force : !autoplayActive;
    if(open){ autoplayActive = true; updateAutoplayButtons(); scheduleAutoplay(); }
    else stopAutoplay();
  }
  autoplayButton.addEventListener('click', () => toggleAutoplay());
  presenterAutoplayButton.addEventListener('click', () => toggleAutoplay());
  presenterRestartDemo.addEventListener('click', () => { stopAutoplay(); updateScene(0, -1); resetTimer(); toggleAutoplay(true); });

  // mobile command sheet
  function toggleMobileMenu(force){
    const open = typeof force === 'boolean' ? force : !mobileCommandSheet.classList.contains('is-open');
    mobileCommandSheet.classList.toggle('is-open', open);
    mobileCommandSheet.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('mobile-menu-open', open);
  }
  mobileMenuToggle.addEventListener('click', () => toggleMobileMenu());
  mobileMenuBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  closeMobileMenu.addEventListener('click', () => toggleMobileMenu(false));
  document.getElementById('mobilePrev').addEventListener('click', () => { updateScene(current - 1, -1); toggleMobileMenu(false); });
  document.getElementById('mobileNext').addEventListener('click', () => { updateScene(current + 1, 1); toggleMobileMenu(false); });
  document.getElementById('mobileNotes').addEventListener('click', () => { toggleNotes(); toggleMobileMenu(false); });
  document.getElementById('mobilePresenter').addEventListener('click', () => { togglePresenter(); toggleMobileMenu(false); });
  document.getElementById('mobileDual').addEventListener('click', () => { openDualScreen(); toggleMobileMenu(false); });
  document.getElementById('mobileDemo').addEventListener('click', () => { toggleAutoplay(); toggleMobileMenu(false); });
  document.getElementById('mobileTimer').addEventListener('click', () => { toggleTimer(); toggleMobileMenu(false); });
  document.getElementById('mobileReset').addEventListener('click', () => { resetTimer(); toggleMobileMenu(false); });
  document.getElementById('mobileFullscreen').addEventListener('click', () => { if(!fullscreenButton.disabled) fullscreenButton.click(); toggleMobileMenu(false); });

  document.addEventListener('keydown', e => {
    const tag = e.target.tagName;
    if(['INPUT', 'SELECT', 'TEXTAREA'].includes(tag)) return;
    if(e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' '){ e.preventDefault(); updateScene(current + 1, 1); }
    if(e.key === 'ArrowLeft' || e.key === 'PageUp'){ e.preventDefault(); updateScene(current - 1, -1); }
    if(e.key.toLowerCase() === 'n') toggleNotes();
    if(e.key.toLowerCase() === 'f' && fullscreenButton && !fullscreenButton.disabled) fullscreenButton.click();
    if(e.key.toLowerCase() === 'r') resetTimer();
    if(e.key.toLowerCase() === 'd') toggleAutoplay();
    if(e.key.toLowerCase() === 'p') togglePresenter();
    if(e.key.toLowerCase() === 'g') openDualScreen();
    if(e.key === 'Escape'){ toggleNotes(false); togglePresenter(false); toggleMobileMenu(false); }
  });

  // source figures dialog
  document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => {
    const data = t.figureData[btn.dataset.open];
    if(!data) return;
    dialogImage.src = data.src;
    dialogTitle.textContent = data.title;
    dialogDescription.textContent = data.desc;
    sourceDialog.showModal();
  }));
  sourceDialog.querySelector('.dialog-close').addEventListener('click', () => sourceDialog.close());
  sourceDialog.addEventListener('click', e => { if(e.target === sourceDialog) sourceDialog.close(); });

  // method comparison
  document.querySelectorAll('.compare-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.compare-tab').forEach(btn => btn.classList.toggle('is-selected', btn === tab));
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
    Cd: { name: 'Cd', pH: '7.0', signal: lang === 'th' ? 'การดูดกลืนของ Cd ที่ 228.8 nm' : 'Cd absorbance at 228.8 nm' },
    Pb: { name: 'Pb', pH: '4.0', signal: lang === 'th' ? 'การดูดกลืนของ Pb ที่ 283.3 nm' : 'Pb absorbance at 283.3 nm' }
  };
  let activeMetal = 'Cd';
  let expStep = 0;
  function experimentInstructions(){ return t.expSteps(metalInfo[activeMetal]); }
  function makeParticles(){
    particles.innerHTML = '';
    for(let i = 0; i < 38; i++){
      const dot = document.createElement('i');
      dot.style.left = `${8 + Math.random() * 80}%`;
      dot.style.top = `${15 + Math.random() * 72}%`;
      dot.style.animationDelay = `${-Math.random() * 2}s`;
      dot.style.setProperty('--left', `${15 + Math.random() * 70}%`);
      dot.style.setProperty('--settle', `${Math.random() * 12}px`);
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
    experimentSignal.setAttribute('d', 'M22 105 C80 105 120 105 160 105 C190 105 220 105 280 105');
  }
  function applyExperimentState(step){
    clearExperimentVisuals();
    if(step >= 0){ particles.style.opacity = '1'; signalCaption.textContent = t.signalDispersed(activeMetal, metalInfo[activeMetal].pH); }
    else signalCaption.textContent = t.waitingSorbent(activeMetal);
    if(step >= 1){ sampleTube.classList.add('is-shaking'); signalCaption.textContent = t.signalAdsorption; setTimeout(() => { if(expStep >= 2 || step >= 1) sampleTube.classList.remove('is-shaking'); }, 1300); }
    if(step >= 2){ sampleTube.classList.remove('is-shaking'); externalMagnet.classList.add('is-active'); particles.classList.add('is-settled'); signalCaption.textContent = t.signalGathered; }
    if(step >= 3){ magneticProbe.classList.add('is-lowered'); particles.style.opacity = '.15'; signalCaption.textContent = t.signalCollected; }
    if(step >= 4){
      magneticProbe.classList.remove('is-lowered'); magneticProbe.classList.add('is-flame'); flame.classList.add('is-hot');
      experimentSignal.setAttribute('d', 'M22 105 C85 105 130 105 165 105 C190 105 196 102 204 73 C211 43 216 16 222 16 C229 16 234 66 242 91 C251 105 267 105 280 105');
      signalCaption.textContent = t.signalPeak(metalInfo[activeMetal].signal);
    }
  }
  function renderExperiment(){
    const instructions = experimentInstructions();
    protocolItems.forEach((li, i) => { li.classList.toggle('is-current', i === expStep); li.classList.toggle('is-done', i < expStep); });
    experimentStepText.textContent = t.stepOf(Math.min(expStep + 1, 5));
    experimentInstruction.textContent = instructions[Math.min(expStep, instructions.length - 1)];
    experimentProgress.style.width = `${Math.min((expStep + 1) * 20, 100)}%`;
    runExperimentButton.innerHTML = expStep > 4 ? t.expComplete : t.expRun;
  }
  function resetExperiment(){ expStep = 0; makeParticles(); applyExperimentState(-1); renderExperiment(); }
  function performExperimentStep(step){ const target = typeof step === 'number' ? step : expStep; applyExperimentState(target); expStep = target >= 4 ? 5 : target + 1; renderExperiment(); }
  metalButtons.forEach(btn => btn.addEventListener('click', () => { activeMetal = btn.dataset.metal; metalButtons.forEach(b => b.classList.toggle('is-active', b === btn)); if(expStep === 0) applyExperimentState(-1); else applyExperimentState(Math.min(expStep - 1, 4)); renderExperiment(); }));
  runExperimentButton.addEventListener('click', () => { if(expStep > 4){ resetExperiment(); return; } performExperimentStep(); });
  document.getElementById('resetExperiment').addEventListener('click', resetExperiment);
  document.querySelectorAll('[data-exp-step]').forEach(btn => btn.addEventListener('click', () => { const target = Number(btn.dataset.expStep); resetExperiment(); for(let step = 0; step <= target; step++) applyExperimentState(step); expStep = Math.min(target + 1, 5); renderExperiment(); }));
  resetExperiment();

  // Sorbent synthesis
  document.querySelectorAll('.synthesis-step').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.synthesis-step').forEach(b => b.classList.toggle('is-active', b === btn));
    document.getElementById('synthesisVisual').className = `synthesis-visual state-${btn.dataset.synthesis}`;
  }));

  // DOE optimizer
  const volumeRange = document.getElementById('volumeRange');
  const massRange = document.getElementById('massRange');
  const timeRange = document.getElementById('timeRange');
  const matrixSelect = document.getElementById('matrixSelect');
  const optimizerMetal = document.getElementById('optimizerMetal');
  const predictedAbsorbance = document.getElementById('predictedAbsorbance');
  const responseGauge = document.getElementById('responseGauge');
  const optimizationVerdict = document.getElementById('optimizationVerdict');
  function predictAbs(){
    const V = Number(volumeRange.value), M = Number(massRange.value), Tm = Number(timeRange.value);
    const x1 = (V - 17.5) / 12.5, x2 = (M - 1.75) / 1.25, x3 = (Tm - 14) / 11;
    let y = 0;
    if(matrixSelect.value === 'coffee' && optimizerMetal.value === 'Cd') y = 0.412 + 0.090*x1 + 0.253*x2 + 0.058*x3 + 0.050*x1*x3 + 0.038*x2*x3;
    if(matrixSelect.value === 'coffee' && optimizerMetal.value === 'Pb') y = 0.064 + 0.014*x1 + 0.043*x2 + 0.012*x3 + 0.004*x1*x2 + 0.013*x1*x3 + 0.010*x2*x3;
    if(matrixSelect.value === 'tea' && optimizerMetal.value === 'Cd') y = 0.870 + 0.060*x1 + 0.300*x2 + 0.120*x3 - 0.070*x1*x3;
    if(matrixSelect.value === 'tea' && optimizerMetal.value === 'Pb') y = 0.103 + 0.023*x1 + 0.036*x2 + 0.009*x3 + 0.021*x1*x2;
    document.getElementById('volumeValue').textContent = `${V.toFixed(0)} mL`;
    document.getElementById('massValue').textContent = `${M.toFixed(1)} mg`;
    document.getElementById('timeValue').textContent = `${Tm.toFixed(0)} min`;
    predictedAbsorbance.textContent = Math.max(0, y).toFixed(3);
    const maxMap = { tea: { Cd: 1.30, Pb: 0.20 }, coffee: { Cd: 0.95, Pb: 0.17 } };
    const pct = Math.max(4, Math.min(100, (y / maxMap[matrixSelect.value][optimizerMetal.value]) * 100));
    requestAnimationFrame(() => { responseGauge.style.width = `${pct}%`; });
    const atOptimum = V === 30 && M === 3 && Tm === 25;
    optimizationVerdict.textContent = atOptimum ? t.optimized : t.insideRange;
    optimizationVerdict.style.color = atOptimum ? 'var(--mint)' : 'var(--gold)';
  }
  [volumeRange, massRange, timeRange, matrixSelect, optimizerMetal].forEach(el => el.addEventListener('input', predictAbs));
  document.getElementById('setOptimum').addEventListener('click', () => { volumeRange.value = 30; massRange.value = 3; timeRange.value = 25; predictAbs(); });
  predictAbs();

  // Adsorption toggle
  document.querySelectorAll('.adsorb-button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.adsorb-button').forEach(b => b.classList.toggle('is-active', b === btn));
    const d = t.adsorbData[btn.dataset.adsorb];
    document.getElementById('kineticModel').textContent = d.kinetic;
    document.getElementById('kineticQe').textContent = d.qe;
    document.getElementById('isothermModel').textContent = d.iso;
    document.getElementById('qmaxValue').textContent = d.qmax;
    document.getElementById('adsorbInterpretation').textContent = d.text;
    document.getElementById('kineticCurve').setAttribute('d', d.curve);
    const ions = document.getElementById('adsorbIons');
    ions.className = `adsorb-ions ${btn.dataset.adsorb === 'Pb' ? 'pb-mode' : 'cd-mode'}`;
    ions.querySelectorAll('i').forEach(i => i.textContent = d.ion);
  }));

  // smooth mini chart animation helpers
  function animateColumnBars(selector){
    document.querySelectorAll(selector).forEach(col => {
      const bar = col.querySelector('i');
      if(!bar) return;
      const target = bar.dataset.targetHeight || bar.style.height || '0%';
      bar.style.height = '0%';
      requestAnimationFrame(() => { requestAnimationFrame(() => { bar.style.height = target; }); });
    });
  }

  // Sensitivity chart
  function renderGain(metal){
    const chart = document.getElementById('gainChart');
    const data = t.gainData[metal];
    const max = Math.max(...data.map(d => d[1]));
    chart.innerHTML = '';
    data.forEach(([name, val]) => {
      const col = document.createElement('div');
      col.className = 'bar-column';
      const height = `${(val / max) * 82}%`;
      col.innerHTML = `<b>${val.toFixed(2)}×</b><i data-target-height="${height}" style="height:0%"></i><span>${name}</span>`;
      chart.appendChild(col);
    });
    animateColumnBars('#gainChart .bar-column');
  }
  document.querySelectorAll('.gain-button').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.gain-button').forEach(b => b.classList.toggle('is-active', b === btn)); renderGain(btn.dataset.gain); }));
  renderGain('Cd');

  // Real samples chart
  const samples = t.samples;
  const realChart = document.getElementById('realSampleChart');
  const sampleButtons = document.getElementById('sampleButtons');
  function selectSample(index){
    const s = samples[index];
    document.getElementById('selectedSampleType').textContent = s.type;
    document.getElementById('selectedSampleValue').textContent = s.value.toFixed(2);
    requestAnimationFrame(() => { document.getElementById('sampleMrlFill').style.width = `${(s.value / 50) * 100}%`; });
    [...sampleButtons.children].forEach((b, i) => b.classList.toggle('is-active', i === index));
  }
  samples.forEach((s, i) => {
    const bar = document.createElement('div');
    bar.className = 'sample-result-bar';
    const height = `${(s.value / 50) * 82}%`;
    bar.innerHTML = `<b>${s.value.toFixed(2)}</b><i data-target-height="${height}" style="height:0%"></i><span>${s.name}</span>`;
    realChart.appendChild(bar);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = s.name;
    btn.addEventListener('click', () => selectSample(i));
    sampleButtons.appendChild(btn);
  });
  animateColumnBars('#realSampleChart .sample-result-bar');
  selectSample(0);

  // Install prompt
  const installToast = document.getElementById('installToast');
  const installButton = document.getElementById('installButton');
  const dismissInstall = document.getElementById('dismissInstall');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    installToast.hidden = false;
  });
  installButton.addEventListener('click', async () => {
    if(!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice.catch(() => null);
    deferredInstallPrompt = null;
    installToast.hidden = true;
  });
  dismissInstall.addEventListener('click', () => { installToast.hidden = true; });

  // PWA
  if('serviceWorker' in navigator){
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(console.warn));
  }

  setViewportUnit();
  window.addEventListener('resize', () => { setViewportUnit(); queueFitActiveScene(); });
  window.addEventListener('orientationchange', () => { setViewportUnit(); setTimeout(queueFitActiveScene, 60); });

  setStaticUILanguage();
  buildPresenterSceneList();
  updateAutoplayButtons();
  updateChrome();
  renderTimer();
  updateDemoIndicator();
  queueFitActiveScene();
})();
