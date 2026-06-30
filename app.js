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
  const contentData = (window.RESEARCH_CONTENT && window.RESEARCH_CONTENT[lang]) || [];

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
  const presenterScriptText = document.getElementById('presenterScriptText');
  const presenterEvidenceText = document.getElementById('presenterEvidenceText');
  const presenterScriptTab = document.getElementById('presenterScriptTab');
  const presenterQuickTab = document.getElementById('presenterQuickTab');
  const presenterEvidenceTab = document.getElementById('presenterEvidenceTab');
  const presenterScriptContent = document.getElementById('presenterScriptContent');
  const presenterQuickContent = document.getElementById('presenterQuickContent');
  const presenterEvidenceContent = document.getElementById('presenterEvidenceContent');

  const researchButton = document.getElementById('researchButton');
  const researchPanel = document.getElementById('researchPanel');
  const closeResearch = document.getElementById('closeResearch');
  const researchTitle = document.getElementById('researchTitle');
  const researchSummary = document.getElementById('researchSummary');
  const researchSectionList = document.getElementById('researchSectionList');
  const researchCaution = document.getElementById('researchCaution');
  const researchSourceLine = document.getElementById('researchSourceLine');

  const notesQuickTab = document.getElementById('notesQuickTab');
  const notesScriptTab = document.getElementById('notesScriptTab');
  const notesQuickContent = document.getElementById('notesQuickContent');
  const notesScriptContent = document.getElementById('notesScriptContent');
  const notesScriptText = document.getElementById('notesScriptText');

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
    const compact = isCompactLandscape();
    document.body.classList.toggle('compact-landscape', compact);
    // Do not scale the active scene with CSS zoom. Zoom causes incorrect
    // pointer coordinates, inflated scroll widths and clipped dialogs.
    scenes.forEach(scene => {
      scene.style.removeProperty('zoom');
      scene.style.removeProperty('width');
      scene.style.removeProperty('height');
      scene.style.removeProperty('transform-origin');
    });
  }

  function postPresenterState(){
    const scene = scenes[current];
    const nextScene = scenes[current + 1] || null;
    const payload = {
      type: 'state', lang, title: t.dualWindowTitle, current, total: scenes.length,
      sceneTitle: scene?.dataset.title || '', notes: scene?.dataset.notes || t.noNotes,
      script: contentData[current]?.script || scene?.dataset.notes || t.noNotes,
      evidence: typeof getSceneEvidenceText === 'function' ? getSceneEvidenceText(current) : (contentData[current]?.summary || ''),
      source: contentData[current]?.source || '',
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
    document.getElementById('mobileResearchLabel').textContent = lang === 'th' ? 'เนื้อหาเชิงลึก' : 'Research details';
    researchButton.textContent = lang === 'th' ? 'เนื้อหาเชิงลึก' : 'Research';
    document.getElementById('researchEyebrow').textContent = lang === 'th' ? 'ข้อมูลวิจัยเชิงลึก' : 'RESEARCH DEEP DIVE';
    notesQuickTab.textContent = lang === 'th' ? 'โน้ตย่อ' : 'Quick notes';
    notesScriptTab.textContent = lang === 'th' ? 'สคริปต์เต็ม' : 'Full script';
    presenterScriptTab.textContent = lang === 'th' ? 'สคริปต์เต็ม' : 'Full script';
    presenterQuickTab.textContent = lang === 'th' ? 'โน้ตย่อ' : 'Quick notes';
    presenterEvidenceTab.textContent = lang === 'th' ? 'หลักฐาน' : 'Evidence';
    document.getElementById('kbResearch').textContent = lang === 'th' ? 'E: เนื้อหาเชิงลึก' : 'E: research details';
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
  function setNotesMode(mode){
    const scriptMode = mode === 'script';
    notesQuickTab.classList.toggle('is-active', !scriptMode);
    notesScriptTab.classList.toggle('is-active', scriptMode);
    notesQuickContent.classList.toggle('is-active', !scriptMode);
    notesScriptContent.classList.toggle('is-active', scriptMode);
  }
  function setPresenterReadingMode(mode){
    const map = {
      script: [presenterScriptTab, presenterScriptContent],
      quick: [presenterQuickTab, presenterQuickContent],
      evidence: [presenterEvidenceTab, presenterEvidenceContent]
    };
    Object.entries(map).forEach(([key, pair]) => {
      pair[0].classList.toggle('is-active', key === mode);
      pair[1].classList.toggle('is-active', key === mode);
    });
  }
  function renderResearchDetails(){
    const data = contentData[current] || {};
    researchTitle.textContent = scenes[current]?.dataset.title || '';
    researchSummary.textContent = data.summary || '';
    researchSourceLine.textContent = data.source || 'Rosa et al., Food Chemistry 487 (2025) 144709';
    researchSectionList.innerHTML = '';
    (data.sections || []).forEach((section, index) => {
      const article = document.createElement('article');
      article.className = 'research-detail-card';
      article.innerHTML = `<b>${String(index + 1).padStart(2,'0')}</b><div><h4>${section.title}</h4><p>${section.body}</p></div>`;
      researchSectionList.appendChild(article);
    });
    researchCaution.innerHTML = data.caution ? `<strong>${lang === 'th' ? 'ข้อควรระวังในการตีความ' : 'Interpretation caution'}</strong><p>${data.caution}</p>` : '';
  }

  function updateChrome(){
    const scene = scenes[current];
    progressBar.style.width = `${((current + 1) / scenes.length) * 100}%`;
    sceneLabel.textContent = `${String(current + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')} • ${scene.dataset.title}`;
    prevButton.disabled = current === 0;
    nextButton.disabled = current === scenes.length - 1;
    notesTitle.textContent = scene.dataset.title;
    notesText.textContent = scene.dataset.notes || t.noNotes;
    notesScriptText.textContent = contentData[current]?.script || scene.dataset.notes || t.noNotes;
    sceneTime.textContent = formatTime(Number(scene.dataset.time || 0));
    renderResearchDetails();

    presenterCurrentTitle.textContent = scene.dataset.title;
    presenterAudienceTitle.textContent = scene.dataset.title;
    presenterCurrentIndex.textContent = `${t.sceneWord} ${current + 1} ${t.ofWord} ${scenes.length}`;
    presenterNotesText.textContent = scene.dataset.notes || t.noNotes;
    presenterScriptText.textContent = contentData[current]?.script || scene.dataset.notes || t.noNotes;
    presenterEvidenceText.textContent = typeof getSceneEvidenceText === 'function' ? getSceneEvidenceText(current) : (contentData[current]?.summary || '');
    presenterSceneTime.textContent = formatTime(Number(scene.dataset.time || 0));
    presenterTimer.textContent = timerButton.textContent;
    presenterNextTitle.textContent = scenes[current + 1] ? scenes[current + 1].dataset.title : '—';
    [...presenterSceneList.children].forEach((btn, i) => btn.classList.toggle('is-active', i === current));
    renderMiniTimeline();
    postPresenterState();
    queueFitActiveScene();
    if(typeof activateSceneEntry === 'function') activateSceneEntry(current);
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
  function toggleResearch(force){
    const open = typeof force === 'boolean' ? force : !researchPanel.classList.contains('is-open');
    researchPanel.classList.toggle('is-open', open);
    researchPanel.setAttribute('aria-hidden', String(!open));
    if(open) renderResearchDetails();
  }
  function openDualScreen(){
    const url = `presenter.html?lang=${lang}`;
    const win = window.open(url, 'dmssFaasPresenterWindow', 'popup=yes,width=1280,height=820,resizable=yes');
    if(win) setTimeout(postPresenterState, 350);
  }
  notesButton.addEventListener('click', () => toggleNotes());
  closeNotes.addEventListener('click', () => toggleNotes(false));
  researchButton.addEventListener('click', () => toggleResearch());
  closeResearch.addEventListener('click', () => toggleResearch(false));
  notesQuickTab.addEventListener('click', () => setNotesMode('quick'));
  notesScriptTab.addEventListener('click', () => setNotesMode('script'));
  presenterScriptTab.addEventListener('click', () => setPresenterReadingMode('script'));
  presenterQuickTab.addEventListener('click', () => setPresenterReadingMode('quick'));
  presenterEvidenceTab.addEventListener('click', () => setPresenterReadingMode('evidence'));
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
  document.getElementById('mobileResearch').addEventListener('click', () => { toggleResearch(); toggleMobileMenu(false); });
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
    if(e.key.toLowerCase() === 'e') toggleResearch();
    if(e.key === 'Escape'){ toggleNotes(false); togglePresenter(false); toggleResearch(false); toggleMobileMenu(false); }
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


  // Enriched scene details, topic popups and robust icon labels
  const uiWords = {
    keyIdea: lang === 'th' ? 'สาระสำคัญของฉากนี้' : 'Key idea for this scene',
    topicMenu: lang === 'th' ? 'หัวข้อย่อยกดเพื่ออ่านเพิ่ม' : 'Tap a topic for more depth',
    topicOpen: lang === 'th' ? 'เปิดข้อมูลเพิ่มเติม' : 'Open detailed explanation',
    topicSource: lang === 'th' ? 'แหล่งอ้างอิง' : 'Source',
    caution: lang === 'th' ? 'ข้อควรระวังในการตีความ' : 'Interpretive caution',
    summary: lang === 'th' ? 'สรุปภาพรวม' : 'Scene summary',
    chapterImage: lang === 'th' ? 'ภาพประกอบหัวข้อนี้' : 'Topic illustration',
    close: lang === 'th' ? 'ปิด' : 'Close',
    scene: lang === 'th' ? 'ฉาก' : 'Scene',
    topic: lang === 'th' ? 'หัวข้อ' : 'Topic',
    moreInfo: lang === 'th' ? 'ข้อมูลเชิงลึก' : 'Deep dive',
    theory: lang === 'th' ? 'เหตุผลตามทฤษฎี' : 'Theoretical basis'
  };
  const topicSceneImages = Array.from({ length: Math.max(contentData.length, 12) }, (_, i) => `assets/topic_${String(i + 1).padStart(2, '0')}.svg`);
  const enrichmentRoot = window.SCENE_ENRICHMENT || {};
  const sceneEnrichment = enrichmentRoot[lang] || [];
  const figureRegistry = enrichmentRoot.figures || {};

  function getSceneEvidenceText(index){
    const base = contentData[index]?.summary || '';
    const extra = sceneEnrichment[index] || {};
    const facts = (extra.facts || []).map(f => `• ${f}`).join('\n');
    const metrics = (extra.metrics || []).map(([label,value]) => `${label}: ${value}`).join('  |  ');
    return [base, facts, metrics].filter(Boolean).join('\n\n');
  }

  function ensureTopicDialog(){
    let dialog = document.getElementById('topicDetailDialog');
    if(dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.id = 'topicDetailDialog';
    dialog.className = 'topic-dialog';
    dialog.innerHTML = `
      <button class="ghost-button dialog-close" id="topicDialogClose" type="button">×</button>
      <div class="topic-dialog-grid">
        <div class="topic-dialog-image-wrap">
          <div class="topic-dialog-kicker" id="topicDialogKicker">${uiWords.moreInfo}</div>
          <img id="topicDialogImage" alt="${uiWords.chapterImage}" src="" />
        </div>
        <div class="topic-dialog-copy">
          <span class="topic-dialog-scene" id="topicDialogScene"></span>
          <h3 id="topicDialogTitle"></h3>
          <p class="topic-dialog-summary" id="topicDialogSummary"></p>
          <div class="topic-dialog-block"><span>${uiWords.theory}</span><p id="topicDialogBody"></p></div>
          <div class="topic-dialog-block topic-dialog-caution"><span>${uiWords.caution}</span><p id="topicDialogCaution"></p></div>
          <div class="topic-dialog-block"><span>${uiWords.topicSource}</span><p id="topicDialogSource"></p></div>
        </div>
      </div>`;
    document.body.appendChild(dialog);
    dialog.querySelector('#topicDialogClose').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', ev => {
      const rect = dialog.getBoundingClientRect();
      const within = rect.top <= ev.clientY && ev.clientY <= rect.top + rect.height && rect.left <= ev.clientX && ev.clientX <= rect.left + rect.width;
      if(!within) dialog.close();
    });
    return dialog;
  }

  function renderSceneTopicPanels(){
    scenes.forEach((scene, sceneIndex) => {
      const data = contentData[sceneIndex];
      if(!data || scene.querySelector('.scene-topic-panel')) return;
      const panel = document.createElement('section');
      panel.className = 'scene-topic-panel';
      const chips = (data.sections || []).map((sec, topicIndex) => `
        <button class="topic-chip" type="button" data-scene-topic-open="1" data-scene-index="${sceneIndex}" data-topic-index="${topicIndex}" aria-label="${uiWords.topicOpen}: ${sec.title}">
          <b>${String(topicIndex + 1).padStart(2, '0')}</b>
          <span>${sec.title}</span>
        </button>`).join('');
      panel.innerHTML = `
        <div class="scene-summary-card">
          <span>${uiWords.keyIdea}</span>
          <p>${data.summary}</p>
        </div>
        <div class="scene-topic-list-wrap">
          <div class="scene-topic-list-head">
            <span>${uiWords.topicMenu}</span>
            <small>${uiWords.scene} ${String(sceneIndex + 1).padStart(2, '0')}</small>
          </div>
          <div class="scene-topic-list">${chips}</div>
        </div>`;
      if(scene.classList.contains('scene-opening')){
        const anchor = scene.querySelector('.opening-question') || scene.lastElementChild;
        anchor.insertAdjacentElement('beforebegin', panel);
      } else if(scene.classList.contains('scene-qa')) {
        const anchor = scene.querySelector('.qa-grid') || scene.lastElementChild;
        anchor.insertAdjacentElement('beforebegin', panel);
      } else {
        const heading = scene.querySelector('.section-heading');
        if(heading) heading.insertAdjacentElement('afterend', panel);
        else scene.insertAdjacentElement('afterbegin', panel);
      }
    });
  }

  function openTopicDialog(sceneIndex, topicIndex){
    const data = contentData[sceneIndex];
    if(!data || !data.sections || !data.sections[topicIndex]) return;
    toggleNotes(false); togglePresenter(false); toggleResearch(false); toggleMobileMenu(false);
    const dialog = ensureTopicDialog();
    const section = data.sections[topicIndex];
    const img = topicSceneImages[sceneIndex] || topicSceneImages[0];
    dialog.querySelector('#topicDialogImage').src = img;
    dialog.querySelector('#topicDialogImage').alt = `${data.summary}`;
    dialog.querySelector('#topicDialogScene').textContent = `${uiWords.scene} ${String(sceneIndex + 1).padStart(2, '0')} • ${scenes[sceneIndex]?.dataset.title || ''}`;
    dialog.querySelector('#topicDialogTitle').textContent = `${String(topicIndex + 1).padStart(2, '0')} — ${section.title}`;
    dialog.querySelector('#topicDialogSummary').textContent = data.summary || '';
    dialog.querySelector('#topicDialogBody').textContent = section.body || '';
    dialog.querySelector('#topicDialogCaution').textContent = data.caution || '—';
    dialog.querySelector('#topicDialogSource').textContent = data.source || '—';
    if(!dialog.open) dialog.showModal();
  }

  document.addEventListener('click', ev => {
    const chip = ev.target.closest('[data-scene-topic-open]');
    if(!chip) return;
    openTopicDialog(Number(chip.dataset.sceneIndex), Number(chip.dataset.topicIndex));
  });

  function reinforceCompactIcons(){
    const labels = ['TIME', 'PEAK', 'ECO', 'MASS'];
    document.querySelectorAll('.efficiency-grid .eff-icon').forEach((el, i) => { el.textContent = labels[i] || 'INFO'; });
    document.querySelectorAll('.sample-summary article, .efficiency-grid article').forEach(card => {
      if(card.querySelector('.data-accent')) return;
      const accent = document.createElement('i');
      accent.className = 'data-accent';
      card.prepend(accent);
    });
  }

  function addTheoryCaptions(){
    const synthesisVisual = document.getElementById('synthesisVisual');
    if(synthesisVisual && !document.getElementById('synthesisCaption')){
      const captions = {
        wash: lang === 'th' ? 'ล้างและอบเปลือกส้มเพื่อลดความชื้นและเตรียมหมู่ฟังก์ชันบนชีวมวล' : 'Washing and drying stabilize the biomass and prepare oxygen-rich binding groups.',
        grind: lang === 'th' ? 'บดและร่อนให้ขนาดอนุภาคสม่ำเสมอ เพิ่มพื้นที่ผิวให้การดูดซับสม่ำเสมอขึ้น' : 'Grinding and sieving increase accessible surface area and improve extraction consistency.',
        magnetize: lang === 'th' ? 'เกิด Fe₃O₄ บนชีวมวลด้วย co-precipitation ทำให้อนุภาคถูกแยกด้วยแม่เหล็กได้' : 'Fe₃O₄ is formed by co-precipitation, enabling magnetic recovery of the biosorbent.',
        separate: lang === 'th' ? 'ล้าง คืนสภาพ และแยกด้วยแม่เหล็กเพื่อให้ได้ M-OPP พร้อมใช้งาน' : 'Magnetic recovery, washing and drying yield the final M-OPP sorbent ready for use.'
      };
      const cap = document.createElement('p');
      cap.id = 'synthesisCaption';
      cap.className = 'theory-caption';
      synthesisVisual.insertAdjacentElement('afterend', cap);
      const update = () => {
        const active = document.querySelector('.synthesis-step.is-active');
        cap.textContent = captions[active?.dataset.synthesis || 'wash'];
      };
      document.querySelectorAll('.synthesis-step').forEach(btn => btn.addEventListener('click', update));
      update();
    }

    const methodVerdict = document.querySelector('.difference-verdict');
    if(methodVerdict && !methodVerdict.nextElementSibling?.classList?.contains('theory-caption')){
      const cap = document.createElement('p');
      cap.className = 'theory-caption';
      cap.textContent = lang === 'th'
        ? 'ตามทฤษฎี DMSS-FAAS เพิ่มความไวเพราะโลหะจากตัวอย่าง 30 mL ถูกรวมอยู่บน M-OPP เพียง 3 mg แล้วส่งเข้าเปลวไฟโดยตรง จึงลดการสูญเสียในระบบ nebulizer.'
        : 'Theoretically, DMSS-FAAS increases sensitivity because analyte from 30 mL of sample is concentrated onto only 3 mg of M-OPP and delivered directly to the flame, bypassing nebulizer losses.';
      methodVerdict.insertAdjacentElement('afterend', cap);
    }
  }


  function ensurePaperEvidenceDialog(){
    let dialog = document.getElementById('paperEvidenceDialog');
    if(dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.id = 'paperEvidenceDialog';
    dialog.className = 'paper-evidence-dialog';
    dialog.innerHTML = `
      <button class="ghost-button dialog-close" id="paperEvidenceClose" type="button">×</button>
      <div class="paper-evidence-layout">
        <div class="paper-evidence-media"><img id="paperEvidenceImage" alt="" src="" /></div>
        <div class="paper-evidence-copy">
          <span>${lang === 'th' ? 'ภาพจากบทความต้นฉบับ' : 'ORIGINAL PAPER EVIDENCE'}</span>
          <h3 id="paperEvidenceTitle"></h3>
          <p id="paperEvidenceDescription"></p>
          <div class="paper-evidence-note"><b>${lang === 'th' ? 'ใช้ภาพนี้อธิบายอะไร' : 'How to explain this figure'}</b><p id="paperEvidenceTeaching"></p></div>
          <small>Rosa et al., Food Chemistry 487 (2025) 144709</small>
        </div>
      </div>`;
    document.body.appendChild(dialog);
    dialog.querySelector('#paperEvidenceClose').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', ev => {
      const rect = dialog.getBoundingClientRect();
      if(ev.clientX < rect.left || ev.clientX > rect.right || ev.clientY < rect.top || ev.clientY > rect.bottom) dialog.close();
    });
    return dialog;
  }

  function figureTeachingText(key){
    const map = lang === 'th' ? {
      workflow_full:'ใช้ชี้ให้เห็นว่าการสกัด การแยก และการนำตัวอย่างเข้าเปลวไฟเป็นกระบวนการต่อเนื่องเดียวกัน',
      fig1A:'เน้นปริมาตรตัวอย่าง 30 mL, M-OPP 3 mg และการเขย่าเพื่อให้ไอออนสัมผัสตำแหน่งจับ',
      fig1B:'เน้นว่าการแยกอนุภาคใช้แรงแม่เหล็ก ไม่ต้องกรองหรือปั่นเหวี่ยง',
      fig1C:'อธิบายว่า probe ทำหน้าที่เก็บเฟสของแข็งที่มีโลหะเข้มข้นอยู่แล้ว',
      fig1D:'อธิบายการถ่ายโอน analyte โดยไม่ต้องชะกลับเป็นสารละลาย',
      fig1E:'ชี้เส้นทางลำแสง เปลวไฟ และ transient peak ที่เกิดจากการเผา M-OPP',
      char_full:'ใช้สรุปว่าผู้วิจัยยืนยันวัสดุด้วยหลักฐานหลายชนิด ไม่ได้ใช้ FTIR เพียงอย่างเดียว',
      fig2A:'ชี้แถบ Fe–O และหมู่ O–H / C=O ที่เกี่ยวข้องกับการสร้างวัสดุและการจับโลหะ',
      fig2B:'เชื่อมประจุพื้นผิวลบกับการดึงดูดไอออน Cd²⁺ และ Pb²⁺ พร้อมอธิบายผลของ pH',
      fig2C:'เปรียบเทียบมวลคงเหลือเพื่อแสดงส่วน Fe₃O₄ ในวัสดุไฮบริด',
      fig2D:'แสดงการสลายตัวของชีวมวลดิบและใช้เป็นฐานเปรียบเทียบกับ M-OPP',
      fig2E:'แสดงว่า M-OPP มีพฤติกรรมความร้อนต่างจาก OPP เพราะมี Fe₃O₄ และปฏิสัมพันธ์ในวัสดุ',
      fig2F:'ใช้ยืนยันว่า Fe₃O₄ เป็นองค์ประกอบที่เสถียรกว่าในช่วงอุณหภูมิสูง',
      micro_full:'เปรียบเทียบ OPP, M-OPP และ Fe₃O₄ ทั้ง TEM และ SEM ในภาพเดียว',
      fig3A:'ชี้โครงสร้างเส้นใยของ OPP ก่อนการทำให้เป็นแม่เหล็ก',
      fig3B:'ชี้กลุ่มอนุภาคนาโนที่เกาะบนชีวมวลหลังสร้าง M-OPP',
      fig3C:'แสดงลักษณะการรวมกลุ่มของ Fe₃O₄ บริสุทธิ์เพื่อใช้เทียบกับ M-OPP',
      fig3D:'ชี้พื้นผิวขรุขระของอนุภาค OPP ดิบ',
      fig3E:'ชี้ความไม่สม่ำเสมอและอนุภาคที่เพิ่มขึ้นบน M-OPP',
      fig3F:'ใช้เทียบรูปร่างอนุภาค Fe₃O₄ กับวัสดุไฮบริด'
    } : {
      workflow_full:'Use it to show that extraction, magnetic separation and direct flame introduction form one continuous analytical workflow.',
      fig1A:'Emphasize 30 mL sample, 3 mg M-OPP and agitation that brings ions into contact with binding sites.',
      fig1B:'Emphasize that particles are separated magnetically without filtration or centrifugation.',
      fig1C:'Explain that the probe collects a solid phase already enriched with analyte.',
      fig1D:'Explain analyte transfer without a liquid elution step.',
      fig1E:'Point to the optical beam, flame and transient peak produced as M-OPP burns.',
      char_full:'Use it to show that material verification relied on multiple independent techniques, not FTIR alone.',
      fig2A:'Point to Fe–O and oxygen-containing bands associated with magnetization and metal binding.',
      fig2B:'Connect negative surface charge with attraction of Cd²⁺ and Pb²⁺ and explain the pH effect.',
      fig2C:'Compare residual mass to demonstrate the inorganic Fe₃O₄ fraction in the hybrid.',
      fig2D:'Show raw biomass decomposition as the baseline for comparison with M-OPP.',
      fig2E:'Show that M-OPP has altered thermal behavior due to Fe₃O₄ and hybrid interactions.',
      fig2F:'Use it to confirm that Fe₃O₄ is the more thermally stable component.',
      micro_full:'Compare OPP, M-OPP and Fe₃O₄ using both TEM and SEM in a single figure.',
      fig3A:'Point to the fibrous structure of OPP before magnetization.',
      fig3B:'Point to nanoparticle aggregates deposited on the biomass after M-OPP synthesis.',
      fig3C:'Show aggregation of pure Fe₃O₄ as a reference for the hybrid material.',
      fig3D:'Point to the rough irregular surface of raw OPP.',
      fig3E:'Point to the heterogeneous processed particles in M-OPP.',
      fig3F:'Compare the compact angular Fe₃O₄ particles with the hybrid.'
    };
    return map[key] || '';
  }

  function openPaperEvidence(key){
    const fig = figureRegistry[key];
    if(!fig) return;
    const topicDialog = document.getElementById('topicDetailDialog');
    if(topicDialog?.open) topicDialog.close();
    const compactDialog = document.getElementById('compactTopicDialog');
    if(compactDialog?.open) compactDialog.close();
    document.documentElement.classList.remove('has-open-dialog');
    if(sourceDialog?.open) sourceDialog.close();
    toggleNotes(false); togglePresenter(false); toggleResearch(false); toggleMobileMenu(false);
    const dialog = ensurePaperEvidenceDialog();
    const copy = fig[lang] || fig.en;
    dialog.querySelector('#paperEvidenceImage').src = fig.src;
    dialog.querySelector('#paperEvidenceImage').alt = copy.title;
    dialog.querySelector('#paperEvidenceTitle').textContent = copy.title;
    dialog.querySelector('#paperEvidenceDescription').textContent = copy.desc;
    dialog.querySelector('#paperEvidenceTeaching').textContent = figureTeachingText(key);
    if(!dialog.open) dialog.showModal();
  }

  function renderDenseSceneEnrichment(){
    scenes.forEach((scene, sceneIndex) => {
      const extra = sceneEnrichment[sceneIndex];
      if(!extra || scene.querySelector('.dense-scene-enrichment')) return;
      const wrap = document.createElement('section');
      wrap.className = 'dense-scene-enrichment';
      const metrics = (extra.metrics || []).map(([label,value]) => `<article><span>${label}</span><b>${value}</b></article>`).join('');
      const facts = (extra.facts || []).map((fact,i) => `<li><b>${String(i+1).padStart(2,'0')}</b><span>${fact}</span></li>`).join('');
      const figures = (extra.images || []).map(key => {
        const fig = figureRegistry[key]; if(!fig) return '';
        const copy = fig[lang] || fig.en;
        return `<button class="paper-thumb" type="button" data-paper-key="${key}"><img src="${fig.src}" alt="${copy.title}" loading="lazy"><span>${copy.title}</span></button>`;
      }).join('');
      wrap.innerHTML = `
        <div class="dense-metrics">${metrics}</div>
        <div class="dense-detail-grid">
          <div class="dense-facts"><div class="dense-block-title"><span>${lang === 'th' ? 'รายละเอียดสำคัญ' : 'DETAILED TAKEAWAYS'}</span><small>${lang === 'th' ? 'ใช้พูดอธิบายเพิ่มเติม' : 'speaker-ready depth'}</small></div><ol>${facts}</ol></div>
          <div class="paper-gallery"><div class="dense-block-title"><span>${lang === 'th' ? 'หลักฐานจากรูปใน paper' : 'PAPER FIGURE EVIDENCE'}</span><small>${lang === 'th' ? 'กดภาพเพื่อขยาย' : 'tap to enlarge'}</small></div><div class="paper-thumb-grid">${figures}</div></div>
        </div>`;
      const topicPanel = scene.querySelector('.scene-topic-panel');
      if(topicPanel) topicPanel.insertAdjacentElement('afterend', wrap);
      else scene.appendChild(wrap);
    });
  }

  document.addEventListener('click', ev => {
    const button = ev.target.closest('[data-paper-key]');
    if(button) openPaperEvidence(button.dataset.paperKey);
  });

  function upgradeTopicDialog(sceneIndex){
    const dialog = ensureTopicDialog();
    if(!dialog.querySelector('.topic-extra-panel')){
      const extraPanel = document.createElement('div');
      extraPanel.className = 'topic-extra-panel';
      extraPanel.innerHTML = `<div class="topic-extra-facts"><span>${lang === 'th' ? 'ประเด็นเพิ่มเติม' : 'Additional evidence'}</span><ul id="topicDialogFacts"></ul></div><div class="topic-extra-metrics" id="topicDialogMetrics"></div><div class="topic-dialog-paper" id="topicDialogPaper"></div>`;
      dialog.querySelector('.topic-dialog-copy').appendChild(extraPanel);
    }
    const extra = sceneEnrichment[sceneIndex] || {};
    dialog.querySelector('#topicDialogFacts').innerHTML = (extra.facts || []).map(f => `<li>${f}</li>`).join('');
    dialog.querySelector('#topicDialogMetrics').innerHTML = (extra.metrics || []).map(([l,v]) => `<article><span>${l}</span><b>${v}</b></article>`).join('');
    dialog.querySelector('#topicDialogPaper').innerHTML = (extra.images || []).slice(0,3).map(key => {
      const fig=figureRegistry[key]; if(!fig) return ''; const c=fig[lang]||fig.en;
      return `<button type="button" data-paper-key="${key}"><img src="${fig.src}" alt="${c.title}"><span>${c.title}</span></button>`;
    }).join('');
  }

  const originalOpenTopicDialog = openTopicDialog;
  openTopicDialog = function(sceneIndex, topicIndex){
    originalOpenTopicDialog(sceneIndex, topicIndex);
    upgradeTopicDialog(sceneIndex);
  };

  let sceneAnimationTimers = [];
  function clearSceneAnimationTimers(){ sceneAnimationTimers.forEach(clearTimeout); sceneAnimationTimers = []; }
  function scheduleSceneAction(fn, delay){ sceneAnimationTimers.push(setTimeout(fn, delay)); }
  function pulseElements(elements, interval=420){
    elements.forEach((el,i) => scheduleSceneAction(() => {
      elements.forEach(node => node.classList.remove('scene-focus'));
      el.classList.add('scene-focus');
    }, i*interval));
    scheduleSceneAction(() => elements.forEach(node => node.classList.remove('scene-focus')), elements.length*interval+500);
  }

  function playSceneAnimation(sceneIndex){
    clearSceneAnimationTimers();
    const scene = scenes[sceneIndex];
    if(!scene) return;
    scene.classList.remove('scene-playback'); void scene.offsetWidth; scene.classList.add('scene-playback');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const unit = reduced ? 80 : 650;
    if(sceneIndex === 0){
      scheduleSceneAction(() => scene.classList.add('opening-capture'), 100);
      scheduleSceneAction(() => scene.classList.add('opening-signal'), unit*3);
      scheduleSceneAction(() => scene.classList.remove('opening-capture','opening-signal','scene-playback'), unit*6);
    } else if(sceneIndex === 1){
      pulseElements([...scene.querySelectorAll('.goal-card')], unit*.72);
    } else if(sceneIndex === 2){
      const tabs=[...scene.querySelectorAll('.compare-tab')];
      if(tabs[0]) tabs[0].click();
      scheduleSceneAction(() => tabs[1]?.click(), unit*3);
      scheduleSceneAction(() => scene.classList.remove('scene-playback'), unit*6);
    } else if(sceneIndex === 3){
      resetExperiment();
      [0,1,2,3,4].forEach((step,i)=>scheduleSceneAction(()=>performExperimentStep(step), 200+i*unit*1.55));
      scheduleSceneAction(()=>scene.classList.remove('scene-playback'), unit*9);
    } else if(sceneIndex === 4){
      const steps=[...scene.querySelectorAll('.synthesis-step')];
      steps.forEach((btn,i)=>scheduleSceneAction(()=>btn.click(), i*unit*1.35));
      scheduleSceneAction(()=>scene.classList.remove('scene-playback'), unit*6);
    } else if(sceneIndex === 5){
      volumeRange.value=5; massRange.value=.5; timeRange.value=3; predictAbs();
      for(let i=1;i<=10;i++) scheduleSceneAction(()=>{
        volumeRange.value=(5+(25*i/10)).toFixed(0); massRange.value=(.5+(2.5*i/10)).toFixed(1); timeRange.value=(3+(22*i/10)).toFixed(0); predictAbs();
      },i*unit*.38);
      scheduleSceneAction(()=>scene.classList.remove('scene-playback'), unit*5);
    } else if(sceneIndex === 6){
      const buttons=[...scene.querySelectorAll('.adsorb-button')];
      buttons[0]?.click(); scheduleSceneAction(()=>buttons[1]?.click(),unit*3); scheduleSceneAction(()=>scene.classList.remove('scene-playback'),unit*6);
    } else if(sceneIndex === 7){
      const buttons=[...scene.querySelectorAll('.gain-button')];
      buttons[0]?.click(); scheduleSceneAction(()=>buttons[1]?.click(),unit*3); scheduleSceneAction(()=>scene.classList.remove('scene-playback'),unit*6);
    } else if(sceneIndex === 8){
      pulseElements([...scene.querySelectorAll('.validation-dashboard article, .evidence-ladder li')], unit*.5);
    } else if(sceneIndex === 9){
      samples.forEach((_,i)=>scheduleSceneAction(()=>selectSample(i),i*unit*.85));
      scheduleSceneAction(()=>scene.classList.remove('scene-playback'),unit*6);
    } else if(sceneIndex === 10){
      pulseElements([...scene.querySelectorAll('.scope-in, .scope-out, .reporting-note')], unit*1.2);
    } else if(sceneIndex === 11){
      pulseElements([...scene.querySelectorAll('.answer-grid article, .cycle-item')], unit*.55);
    } else {
      const details=[...scene.querySelectorAll('.qa-grid details')];
      details.forEach((d,i)=>scheduleSceneAction(()=>{ details.forEach(x=>x.open=false); d.open=true; },i*unit));
      scheduleSceneAction(()=>scene.classList.remove('scene-playback'),details.length*unit+400);
    }
  }

  function addSceneAnimationControls(){
    scenes.forEach((scene,i)=>{
      if(scene.querySelector('.scene-animation-button')) return;
      const btn=document.createElement('button');
      btn.type='button'; btn.className='small-button scene-animation-button';
      btn.innerHTML=`<span aria-hidden="true">▶</span> ${lang === 'th' ? 'เล่นอนิเมชันอธิบาย' : 'Play explanation'}`;
      btn.addEventListener('click',()=>playSceneAnimation(i));
      const heading=scene.querySelector('.section-heading');
      if(heading) heading.appendChild(btn);
      else {
        const actions=scene.querySelector('.hero-actions') || scene.querySelector('.conclusion-next');
        if(actions?.classList?.contains('hero-actions')) actions.appendChild(btn); else if(actions) actions.insertAdjacentElement('beforebegin',btn); else scene.prepend(btn);
      }
    });
  }

  // v2.3.0 — compact topic triggers and viewport-safe detail dialog.
  // Slides remain visually clean; details appear only after a topic is tapped.
  const compactTopicWords = {
    topics: lang === 'th' ? 'หัวข้อเพิ่มเติม' : 'Explore topics',
    play: lang === 'th' ? 'เล่นคำอธิบาย' : 'Play explanation',
    playing: lang === 'th' ? 'กำลังเล่น…' : 'Playing…',
    close: lang === 'th' ? 'ปิดหน้าต่าง' : 'Close dialog',
    overview: lang === 'th' ? 'ภาพรวมของฉาก' : 'Scene overview',
    theory: lang === 'th' ? 'คำอธิบายเชิงวิชาการ' : 'Scientific explanation',
    caution: lang === 'th' ? 'ข้อควรระวังในการตีความ' : 'Interpretive caution',
    source: lang === 'th' ? 'ตำแหน่งอ้างอิงในบทความ' : 'Paper source',
    evidence: lang === 'th' ? 'หลักฐานเพิ่มเติม' : 'Additional evidence',
    figures: lang === 'th' ? 'รูปจริงจากบทความ' : 'Figures from the paper',
    tapFigure: lang === 'th' ? 'แตะรูปเพื่อขยาย' : 'Tap a figure to enlarge'
  };

  const topicFigureMap = {
    0: ['workflow_full', 'fig1E', 'workflow_full'],
    1: ['workflow_full', 'char_full', 'micro_full'],
    2: [null, 'workflow_full', 'fig1E'],
    3: ['fig1E', 'fig1A', 'fig1E'],
    4: ['fig3B', 'fig2A', 'fig3E'],
    5: [null, null, null],
    6: ['fig2B', 'fig3B', 'char_full'],
    7: ['fig1E', null, 'workflow_full'],
    8: ['char_full', 'fig1E', 'micro_full'],
    9: [null, null, null],
    10: [null, null, null],
    11: ['workflow_full', 'fig1E', 'micro_full'],
    12: [null, null, null]
  };

  function removeLegacyInjectedContent(){
    document.querySelectorAll('.scene-topic-panel,.dense-scene-enrichment,.theory-caption').forEach(node => node.remove());
    const old = document.getElementById('topicDetailDialog');
    if(old) old.remove();
  }

  function ensureCompactTopicDialog(){
    let dialog = document.getElementById('compactTopicDialog');
    if(dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.id = 'compactTopicDialog';
    dialog.className = 'compact-topic-dialog';
    dialog.setAttribute('aria-labelledby', 'compactTopicTitle');
    dialog.innerHTML = `
      <div class="compact-topic-shell">
        <header class="compact-topic-header">
          <div>
            <span id="compactTopicScene"></span>
            <h3 id="compactTopicTitle"></h3>
          </div>
          <button class="compact-topic-close" id="compactTopicClose" type="button" aria-label="${compactTopicWords.close}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </header>
        <div class="compact-topic-scroll">
          <div class="compact-topic-layout" id="compactTopicLayout">
            <figure class="compact-topic-media" id="compactTopicMedia" hidden>
              <button type="button" id="compactTopicFigureButton">
                <img id="compactTopicImage" alt="" src="" />
                <span id="compactTopicFigureLabel"></span>
              </button>
            </figure>
            <article class="compact-topic-copy">
              <section class="compact-topic-overview">
                <span>${compactTopicWords.overview}</span>
                <p id="compactTopicOverview"></p>
              </section>
              <section class="compact-topic-section">
                <span>${compactTopicWords.theory}</span>
                <p id="compactTopicBody"></p>
              </section>
              <section class="compact-topic-section compact-topic-warning">
                <span>${compactTopicWords.caution}</span>
                <p id="compactTopicCaution"></p>
              </section>
              <section class="compact-topic-section">
                <span>${compactTopicWords.source}</span>
                <p id="compactTopicSource"></p>
              </section>
              <details class="compact-topic-more" id="compactTopicMore">
                <summary>${compactTopicWords.evidence}</summary>
                <div class="compact-topic-facts" id="compactTopicFacts"></div>
                <div class="compact-topic-metrics" id="compactTopicMetrics"></div>
              </details>
              <section class="compact-topic-paper-strip" id="compactTopicPaperStrip" hidden>
                <div><span>${compactTopicWords.figures}</span><small>${compactTopicWords.tapFigure}</small></div>
                <div class="compact-topic-paper-list" id="compactTopicPaperList"></div>
              </section>
            </article>
          </div>
        </div>
      </div>`;
    document.body.appendChild(dialog);
    const close = () => {
      if(dialog.open) dialog.close();
      document.documentElement.classList.remove('has-open-dialog');
    };
    dialog.querySelector('#compactTopicClose').addEventListener('click', close);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('click', event => { if(event.target === dialog) close(); });
    dialog.addEventListener('close', () => document.documentElement.classList.remove('has-open-dialog'));
    return dialog;
  }

  function topicPaperKeys(sceneIndex){
    const extra = sceneEnrichment[sceneIndex] || {};
    return [...new Set((extra.images || []).filter(key => figureRegistry[key]))].slice(0, 4);
  }

  function openCompactTopic(sceneIndex, topicIndex){
    const data = contentData[sceneIndex];
    const section = data?.sections?.[topicIndex];
    if(!data || !section) return;
    toggleNotes(false); togglePresenter(false); toggleResearch(false); toggleMobileMenu(false);
    if(sourceDialog?.open) sourceDialog.close();
    const paperDialog = document.getElementById('paperEvidenceDialog');
    if(paperDialog?.open) paperDialog.close();

    const dialog = ensureCompactTopicDialog();
    dialog.querySelector('#compactTopicScene').textContent = `${lang === 'th' ? 'ฉาก' : 'Scene'} ${String(sceneIndex + 1).padStart(2, '0')} • ${scenes[sceneIndex]?.dataset.title || ''}`;
    dialog.querySelector('#compactTopicTitle').textContent = section.title;
    dialog.querySelector('#compactTopicOverview').textContent = data.summary || '';
    dialog.querySelector('#compactTopicBody').textContent = section.body || '';
    dialog.querySelector('#compactTopicCaution').textContent = data.caution || '—';
    dialog.querySelector('#compactTopicSource').textContent = data.source || '—';

    const facts = (sceneEnrichment[sceneIndex]?.facts || []).slice(0, 4);
    dialog.querySelector('#compactTopicFacts').innerHTML = facts.map((fact, index) => `<p><b>${String(index + 1).padStart(2, '0')}</b><span>${fact}</span></p>`).join('');
    const metrics = (sceneEnrichment[sceneIndex]?.metrics || []).slice(0, 4);
    dialog.querySelector('#compactTopicMetrics').innerHTML = metrics.map(([label, value]) => `<div><span>${label}</span><b>${value}</b></div>`).join('');
    const more = dialog.querySelector('#compactTopicMore');
    more.hidden = !facts.length && !metrics.length;
    more.open = false;

    const selectedKey = topicFigureMap[sceneIndex]?.[topicIndex] || null;
    const selectedFigure = selectedKey ? figureRegistry[selectedKey] : null;
    const media = dialog.querySelector('#compactTopicMedia');
    const layout = dialog.querySelector('#compactTopicLayout');
    if(selectedFigure){
      const copy = selectedFigure[lang] || selectedFigure.en;
      media.hidden = false;
      layout.classList.add('has-media');
      const image = dialog.querySelector('#compactTopicImage');
      image.src = selectedFigure.src;
      image.alt = copy.title;
      dialog.querySelector('#compactTopicFigureLabel').textContent = copy.title;
      dialog.querySelector('#compactTopicFigureButton').onclick = event => {
        event.stopPropagation();
        openPaperEvidence(selectedKey);
      };
    } else {
      media.hidden = true;
      layout.classList.remove('has-media');
      dialog.querySelector('#compactTopicImage').removeAttribute('src');
      dialog.querySelector('#compactTopicFigureButton').onclick = null;
    }

    const paperKeys = topicPaperKeys(sceneIndex);
    const strip = dialog.querySelector('#compactTopicPaperStrip');
    const list = dialog.querySelector('#compactTopicPaperList');
    if(paperKeys.length){
      strip.hidden = false;
      list.innerHTML = paperKeys.map(key => {
        const figure = figureRegistry[key];
        const copy = figure[lang] || figure.en;
        return `<button type="button" data-paper-key="${key}"><img src="${figure.src}" alt="${copy.title}" loading="lazy"><span>${copy.title}</span></button>`;
      }).join('');
    } else {
      strip.hidden = true;
      list.innerHTML = '';
    }

    if(!dialog.open){
      document.documentElement.classList.add('has-open-dialog');
      dialog.showModal();
    }
    requestAnimationFrame(() => { dialog.querySelector('.compact-topic-scroll').scrollTop = 0; });
  }

  function buildResponsiveSceneToolbars(){
    removeLegacyInjectedContent();
    scenes.forEach((scene, sceneIndex) => {
      const data = contentData[sceneIndex];
      if(!data?.sections?.length || scene.querySelector('.scene-tool-row')) return;
      const row = document.createElement('div');
      row.className = 'scene-tool-row';
      row.setAttribute('aria-label', compactTopicWords.topics);
      const topics = data.sections.map((section, topicIndex) => `
        <button class="scene-topic-trigger" type="button" data-compact-topic="1" data-scene-index="${sceneIndex}" data-topic-index="${topicIndex}">
          <b>${String(topicIndex + 1).padStart(2, '0')}</b><span>${section.title}</span>
        </button>`).join('');
      row.innerHTML = `<div class="scene-topic-triggers">${topics}</div><button class="scene-play-trigger" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg><span>${compactTopicWords.play}</span></button>`;
      const heading = scene.querySelector('.section-heading');
      const heroActions = scene.querySelector('.hero-actions');
      if(heading) heading.insertAdjacentElement('afterend', row);
      else if(heroActions) heroActions.insertAdjacentElement('afterend', row);
      else scene.insertAdjacentElement('afterbegin', row);
      row.querySelector('.scene-play-trigger').addEventListener('click', event => {
        const button = event.currentTarget;
        button.classList.add('is-playing');
        button.querySelector('span').textContent = compactTopicWords.playing;
        playSceneAnimation(sceneIndex);
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        setTimeout(() => {
          button.classList.remove('is-playing');
          button.querySelector('span').textContent = compactTopicWords.play;
        }, reduced ? 900 : 6500);
      });
    });
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-compact-topic]');
      if(!button) return;
      openCompactTopic(Number(button.dataset.sceneIndex), Number(button.dataset.topicIndex));
    });
  }

  function repairUnreliableIcons(){
    const icons = [
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/></svg>',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 13h4l2-6 4 12 2-6h6"/></svg>',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5c-7 0-11 4-11 10 4 1 9-1 11-10zM6 19c2-5 6-8 12-10"/></svg>',
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v4H7zM5 8h14v12H5z"/><path d="M9 12h6"/></svg>'
    ];
    document.querySelectorAll('.efficiency-grid .eff-icon').forEach((node, index) => {
      node.innerHTML = icons[index] || icons[0];
      node.classList.add('is-svg-icon');
    });
    const fullscreen = document.getElementById('fullscreenButton');
    if(fullscreen) fullscreen.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>';
  }

  // Keep the old delegated topic handler compatible with the clean dialog.
  openTopicDialog = openCompactTopic;

  function activateSceneEntry(sceneIndex){
    clearSceneAnimationTimers();
    scenes.forEach((s,i)=>{
      s.classList.toggle('scene-enter-active',i===sceneIndex);
      if(i!==sceneIndex) s.classList.remove('scene-playback','opening-capture','opening-signal');
    });
    const scene=scenes[sceneIndex];
    if(!scene) return;
    scene.querySelectorAll('.bar-column i,.sample-result-bar i').forEach(bar=>{
      const target=bar.dataset.targetHeight || bar.style.height; bar.style.height='0%'; requestAnimationFrame(()=>bar.style.height=target);
    });
  }

  buildResponsiveSceneToolbars();
  repairUnreliableIcons();
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
  setNotesMode('quick');
  setPresenterReadingMode('script');
  buildPresenterSceneList();
  updateAutoplayButtons();
  updateChrome();
  renderTimer();
  updateDemoIndicator();
  queueFitActiveScene();
})();
