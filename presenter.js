(() => {
  'use strict';
  const lang = new URLSearchParams(location.search).get('lang') === 'th' ? 'th' : 'en';
  const t = {
    en: {
      title: 'DMSS-FAAS Presenter View', eyebrow: 'DUAL-SCREEN PRESENTER VIEW', waiting: 'Waiting for the main presentation window…',
      scene: 'Current scene', timer: 'Rehearsal timer', countdown: 'Auto next in', current: 'CURRENT', next: 'NEXT', controls: 'REMOTE CONTROLS',
      prev: '← Prev', nextBtn: 'Next →', demo: 'Demo', restart: 'Restart demo', toggleNotes: 'Toggle notes', toggleOverlay: 'Toggle presenter overlay',
      sceneList: 'Scene list', sceneListHint: 'Live sync from the presentation window', noNotes: 'No notes received yet.'
    },
    th: {
      title: 'หน้าผู้นำเสนอ DMSS-FAAS', eyebrow: 'มุมมองผู้นำเสนอแบบสองจอ', waiting: 'กำลังรอข้อมูลจากหน้าหลัก…',
      scene: 'ฉากปัจจุบัน', timer: 'ตัวจับเวลาซ้อม', countdown: 'เปลี่ยนฉากใน', current: 'ปัจจุบัน', next: 'ถัดไป', controls: 'รีโมตคอนโทรล',
      prev: '← ก่อนหน้า', nextBtn: 'ถัดไป →', demo: 'เดโม', restart: 'เริ่มเดโมใหม่', toggleNotes: 'สลับโน้ต', toggleOverlay: 'สลับ overlay ผู้นำเสนอ',
      sceneList: 'รายการฉาก', sceneListHint: 'ซิงก์สดจากหน้าหลัก', noNotes: 'ยังไม่มีโน้ตจากหน้าหลัก'
    }
  }[lang];

  const channelName = 'dmss-faas-presenter-sync';
  const channel = 'BroadcastChannel' in window ? new BroadcastChannel(channelName) : null;
  const sceneList = document.getElementById('pwSceneList');
  const els = {
    title: document.getElementById('pwTitle'), status: document.getElementById('pwStatus'), sceneCounter: document.getElementById('pwSceneCounter'),
    timer: document.getElementById('pwTimer'), countdown: document.getElementById('pwCountdown'), currentTitle: document.getElementById('pwCurrentTitle'),
    nextTitle: document.getElementById('pwNextTitle'), notes: document.getElementById('pwNotes')
  };

  function setLabels(){
    document.title = t.title; document.getElementById('pwEyebrow').textContent = t.eyebrow; els.title.textContent = t.title; els.status.textContent = t.waiting;
    document.getElementById('pwSceneLabel').textContent = t.scene; document.getElementById('pwTimerLabel').textContent = t.timer; document.getElementById('pwCountdownLabel').textContent = t.countdown;
    document.getElementById('pwCurrentEyebrow').textContent = t.current; document.getElementById('pwNextEyebrow').textContent = t.next; document.getElementById('pwControlEyebrow').textContent = t.controls;
    document.getElementById('pwPrev').textContent = t.prev; document.getElementById('pwNext').textContent = t.nextBtn; document.getElementById('pwDemo').textContent = t.demo;
    document.getElementById('pwRestart').textContent = t.restart; document.getElementById('pwNotesToggle').textContent = t.toggleNotes; document.getElementById('pwOverlayToggle').textContent = t.toggleOverlay;
    document.getElementById('pwSceneListLabel').textContent = t.sceneList; document.getElementById('pwSceneListHint').textContent = t.sceneListHint;
  }
  function sendCommand(command){ if(channel) channel.postMessage({ type: 'command', command }); }
  function renderState(state){
    if(!state) return;
    if(state.title) document.title = state.title;
    els.status.textContent = state.demoIndicator || t.waiting;
    els.sceneCounter.textContent = `${state.current + 1} / ${state.total}`;
    els.timer.textContent = state.timerText || '15:00';
    els.countdown.textContent = state.autoplayActive && state.autoplayCountdown != null ? `${Math.floor(state.autoplayCountdown/60)}:${String(state.autoplayCountdown%60).padStart(2,'0')}` : '—';
    els.currentTitle.textContent = state.sceneTitle || '—';
    els.nextTitle.textContent = state.nextTitle || '—';
    els.notes.textContent = state.notes || t.noNotes;
    sceneList.innerHTML = '';
    (state.scenes || []).forEach(scene => {
      const item = document.createElement('div');
      item.className = 'presenter-window-scene';
      if(scene.index === state.current) item.classList.add('is-active');
      item.innerHTML = `<b>${String(scene.index + 1).padStart(2, '0')}</b><span>${scene.title}</span><small>${scene.time}</small>`;
      sceneList.appendChild(item);
    });
  }

  setLabels();
  try {
    const existing = localStorage.getItem('dmss-faas-presenter-state');
    if(existing) renderState(JSON.parse(existing));
  } catch (_) {}
  if(channel) channel.onmessage = ev => { if(ev.data?.type === 'state') renderState(ev.data); };
  window.addEventListener('storage', ev => { if(ev.key === 'dmss-faas-presenter-state' && ev.newValue) try { renderState(JSON.parse(ev.newValue)); } catch (_) {} });

  document.getElementById('pwPrev').addEventListener('click', () => sendCommand('prev'));
  document.getElementById('pwNext').addEventListener('click', () => sendCommand('next'));
  document.getElementById('pwDemo').addEventListener('click', () => sendCommand('toggle-autoplay'));
  document.getElementById('pwRestart').addEventListener('click', () => sendCommand('restart-demo'));
  document.getElementById('pwNotesToggle').addEventListener('click', () => sendCommand('toggle-notes'));
  document.getElementById('pwOverlayToggle').addEventListener('click', () => sendCommand('toggle-presenter'));
})();
