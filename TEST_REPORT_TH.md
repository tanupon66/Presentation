# Test Report — DMSS-FAAS Interactive Research Story v2.3.0

วันที่ทดสอบ: 2026-06-30

## การตรวจสอบโครงสร้าง

- JavaScript syntax ผ่าน: `app.js`, `scene_enrichment.js`, `presenter.js`, `sw.js`
- พบฉากครบ 13 ฉากทั้งภาษาอังกฤษและภาษาไทย
- สร้าง compact topic toolbar ครบ 13 ฉาก
- ไม่สร้าง legacy `scene-topic-panel` หรือ `dense-scene-enrichment` ลงในหน้า
- เนื้อหาเชิงลึกมี 3 หัวข้อต่อฉากครบทั้ง 13 ฉาก
- พบภาพจาก paper แบบเต็ม 3 ภาพ และภาพครอป 17 ภาพ
- Service worker cache version: `dmss-faas-interactive-v2.3.0`

## Browser runtime test

ทดสอบด้วย Chromium headless โดยโหลด HTML, CSS และ JavaScript จริง:

- Topic dialog เปิดและปิดได้
- Topic dialog อยู่ภายใน viewport ทุกขนาดที่ทดสอบ
- Mobile portrait เปลี่ยนเป็น bottom sheet
- Mobile landscape เปลี่ยนเป็น dialog เต็มจอ
- Desktop และ tablet ใช้ modal ที่มี internal scrolling
- เปิด Paper Evidence Viewer จากรูปใน topic dialog ได้โดยไม่เกิด dialog ซ้อน
- ไม่พบ JavaScript runtime error
- เล่น animation ได้ครบทั้ง 13 ฉาก
- เปลี่ยนฉากแล้ว animation timer เดิมถูกยกเลิก
- Virtual experiment, synthesis, optimization, adsorption, sensitivity และ sample selector ทำงาน

## Responsive test

ขนาดที่ตรวจด้วย browser runtime:

- 320 × 568 — โทรศัพท์ขนาดเล็ก
- 390 × 844 — โทรศัพท์แนวตั้ง
- 412 × 915 — โทรศัพท์แนวตั้ง ภาษาไทย
- 667 × 375 — โทรศัพท์แนวนอนความสูงต่ำ
- 844 × 390 — โทรศัพท์แนวนอน
- 768 × 1024 — แท็บเล็ตแนวตั้ง
- 1024 × 768 — แท็บเล็ตแนวนอน
- 1440 × 900 — เดสก์ท็อป
- 2560 × 1440 — จอกว้าง

ผลการตรวจ:

- `document.scrollWidth` เท่ากับ viewport width ในทุกขนาดที่ทดสอบ
- ทั้ง 13 ฉากไม่มี document-level horizontal overflow บนมือถือแนวตั้งและแนวนอน
- เนื้อหาที่ยาวเลื่อนภายใน scene โดยไม่ใช้ CSS zoom
- แถบหัวข้อเลื่อนแนวนอนเฉพาะภายใน toolbar
- Dialog, ปุ่มปิด และข้อความไม่ออกนอก safe viewport
- ภาษาไทยและอังกฤษผ่านโดยไม่พบ runtime error

## หมายเหตุ

Animation เป็นการย่อเวลาเพื่อการนำเสนอ ไม่ใช่ simulation เชิงจลนศาสตร์จริง ควรตรวจบนโทรศัพท์จริงหลัง deploy อีกครั้ง เพราะพื้นที่ browser chrome และ safe-area ของแต่ละรุ่นอาจต่างกันเล็กน้อย
