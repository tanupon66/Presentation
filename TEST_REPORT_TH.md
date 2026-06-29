# Test Report — DMSS-FAAS Interactive Research Story v1.3.1

## สาเหตุของบัคที่แก้ไข
- mobile header ถูกกำหนด grid row ไว้เพียง 58–64 px แต่ปุ่มด้านบน wrap เป็นหลายแถว ทำให้ความสูงจริงของ header มากกว่า row และ slide เริ่มแสดงอยู่ใต้ header
- `Demo / Presenter / Dual / Notes` ยังถูกแสดงบน mobile header แม้มี popup command menu แล้ว ทำให้ UI แน่นและซ้อนกัน
- media query รุ่นเก่าหลายชุดทำงานทับกัน ทำให้ mobile stage สลับระหว่าง `position: relative`, `sticky`, `auto height` และ `fixed height`
- compact landscape เดิมบังคับ layout เป็นคอลัมน์เดียวก่อน scale ทำให้เนื้อหายาวเกินจอแม้มีการย่อ

## Automated syntax and structure checks
- `app.js`: PASS (`node --check`)
- `presenter.js`: PASS (`node --check`)
- `sw.js`: PASS (`node --check`)
- `manifest.webmanifest`: PASS (JSON parse)
- `index.html`: PASS (HTML parse)
- `index_th.html`: PASS (HTML parse)
- `presenter.html`: PASS (HTML parse)
- Main-page DOM bindings: PASS — 120 referenced IDs found in both language pages
- Presenter-page DOM bindings: PASS — 24 referenced IDs found
- Required local assets: PASS

## Browser rendering tests (Chromium)

### Phone portrait 360 × 800
- Document size: 360 × 800
- Header: 64 px
- Stage: 678 px
- Footer controls: 58 px
- Header, stage and footer boundaries do not overlap
- Desktop utility controls hidden from header
- Mobile command popup opens correctly
- No JavaScript page errors detected

### Phone portrait 412 × 915
- Document size matches viewport: 412 × 915
- Header / stage / footer boundaries correct
- Desktop utility controls hidden from header
- No JavaScript page errors detected

### Phone landscape 800 × 360
- Compact landscape mode active
- Header reduced to 48 px
- Footer controls hidden and replaced by popup command button
- Adsorption scene converted to three-column compact layout and fits in one visible screen
- No JavaScript page errors detected

### Phone landscape 915 × 412
- Compact landscape mode active
- Stage fills the remaining screen after the 48 px header
- Active scene receives automatic fit scale
- No JavaScript page errors detected

### Dual-screen presenter 1280 × 800
- Presenter state rendered successfully
- Scene title, notes, next scene, rehearsal timer, autoplay countdown and all 13 scene entries displayed
- No JavaScript page errors detected

## Cache/update behavior
- Service-worker cache updated to `dmss-faas-interactive-v1.3.1`
- HTML/CSS/JS changed to network-first behavior
- CSS and JavaScript URLs include `?v=1.3.1` to reduce stale-cache problems after deployment

## Important limitation
Automated tests cover the layouts and interactions above. Browser UI, Android WebView behavior and popup permissions can still vary by device. After deployment, a one-time check on the actual presentation phone and laptop/projector setup is recommended.
