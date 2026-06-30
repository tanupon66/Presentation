# DMSS-FAAS Interactive Research Story v2.3.0

เว็บไซต์นำเสนอแบบ Interactive สำหรับอธิบายงานวิจัยการตรวจ Cd และ Pb ในชาและกาแฟด้วย DMSS-FAAS รองรับภาษาอังกฤษ/ไทย, Presenter Mode, Dual-screen, PWA Offline และการนำเสนอจากโทรศัพท์

## ไฟล์หลัก

- `index.html` — เวอร์ชันภาษาอังกฤษ
- `index_th.html` — เวอร์ชันภาษาไทย
- `presenter.html` — หน้าจอ Presenter แยกจอ
- `styles.css` — UI, responsive และ animation
- `app.js` — ระบบนำเสนอและ interactive experiment
- `research_content.js` — เนื้อหาเชิงลึกและสคริปต์ครบทุกฉาก
- `scene_enrichment.js` — fact cards, metrics และแผนที่ภาพจาก paper
- `assets/paper_crops/` — ภาพย่อยที่ครอปจาก Fig. 1–3 ของบทความต้นฉบับ
- `sw.js` และ `manifest.webmanifest` — PWA/Offline

## จุดเปลี่ยนสำคัญใน v2.3.0

### 1. หน้าสไลด์กลับมาสะอาดและไม่ถูกเนื้อหาเสริมดันจนพัง

- นำ panel ขนาดใหญ่ที่ถูกแทรกลงในทุกฉากออกทั้งหมด
- ไม่แสดง facts, metrics หรือ gallery ยาว ๆ บนหน้าสไลด์โดยตรง
- แต่ละฉากมีเพียงแถบหัวข้อขนาดเล็ก 3 หัวข้อ และปุ่มเล่นคำอธิบาย
- บนมือถือ แถบหัวข้อเลื่อนแนวนอนได้โดยไม่ทำให้ document ล้นจอ

### 2. หัวข้อกดได้และเปิดข้อมูลเฉพาะเมื่อผู้ใช้ต้องการ

เมื่อกดหัวข้อ จะเปิดหน้าต่างรายละเอียดที่ประกอบด้วย:

- ภาพรวมของฉาก
- คำอธิบายเชิงวิชาการของหัวข้อนั้น
- ข้อควรระวังในการตีความ
- ตำแหน่งอ้างอิงในบทความ
- Additional evidence แบบพับเก็บได้
- ภาพจริงจาก paper เฉพาะหัวข้อที่มีหลักฐานภาพรองรับ

Popup ถูกออกแบบแยกตามอุปกรณ์:

- Desktop: modal สองคอลัมน์ ภาพและเนื้อหาอยู่คนละส่วน
- Tablet: modal คอลัมน์เดียวที่อ่านได้เต็มพื้นที่
- Mobile portrait: bottom sheet ที่มี header และปุ่มปิดชัดเจน
- Mobile landscape: dialog เต็มจอ ภาพอยู่ด้านซ้ายและข้อความอยู่ด้านขวา

### 3. ภาพจริงจาก paper

มีภาพหลักและภาพครอปจากบทความรวม 20 รายการ:

- Fig. 1 แบบเต็ม และ Fig. 1A–1E
- Fig. 2 แบบเต็ม และ Fig. 2A–2F
- Fig. 3 แบบเต็ม และ Fig. 3A–3F

กดภาพใน popup เพื่อเปิด Paper Evidence Viewer พร้อมคำอธิบายว่าควรใช้ภาพนั้นอธิบายประเด็นใด

### 4. Animation รายฉาก

ทุกฉากมีปุ่ม `Play explanation / เล่นคำอธิบาย` และยังคงลำดับ animation เดิมครบ 13 ฉาก เช่น การจับ Cd/Pb, ขั้นตอน DMSS-FAAS, การสร้าง M-OPP, DOE optimization, adsorption, validation และ real samples

Animation จะหยุดและล้าง timer เมื่อเปลี่ยนฉาก เพื่อไม่ให้ animation ของฉากเก่าทำงานซ้อนกับฉากใหม่

### 5. Responsive และการแก้บัคหน้าจอ

- ยกเลิกการย่อหน้าด้วย CSS `zoom`
- ใช้การเลื่อนภายในฉากแทนการบีบองค์ประกอบ
- จำกัดความกว้างของ hero, toolbar, dialog และรูปภาพไม่ให้เกิน viewport
- ปรับ Virtual Experiment บนมือถือให้ FAAS, beam และ signal monitor ไม่ดันหน้าจอล้น
- ย้ายปุ่มเมนูบนจอเล็กมากให้ไม่ทับแถบหัวข้อ
- เปลี่ยนไอคอนที่เสี่ยงแสดงเป็นสี่เหลี่ยมหรืออักขระผิดเป็น SVG

## วิธีใช้งาน

1. แตกไฟล์ ZIP
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดขึ้น GitHub Pages, Cloudflare Pages หรือ Static Hosting
3. เปิด `index.html` หรือ `index_th.html`

การทดสอบ PWA/Offline ต้องเปิดผ่าน HTTP/HTTPS ไม่ควรดับเบิลคลิกไฟล์โดยตรง

```bash
python -m http.server 8080
```

จากนั้นเปิด `http://localhost:8080`

## ปุ่มควบคุม

- ลูกศรซ้าย/ขวา หรือ Space — เปลี่ยนฉาก
- N — Notes
- E — Research Details
- P — Presenter Mode
- G — Dual-screen Presenter
- D — Auto Demo
- F — Fullscreen
- R — รีเซ็ตเวลา 15 นาที
- กดเวลามุมขวาบน — เริ่ม/หยุดจับเวลา

## Deploy บน GitHub Pages

อัปโหลดเนื้อหาภายในโฟลเดอร์นี้ไปยัง root ของ repository แล้วเปิด Pages จาก branch ที่ใช้งาน ไม่ต้อง build

## Deploy บน Cloudflare Pages

- Framework preset: None
- Build command: เว้นว่าง
- Build output directory: `/` หรือโฟลเดอร์ที่มี `index.html`

## การอัปเดตจากเวอร์ชันเก่า

เนื่องจากมีการเปลี่ยน cache เป็น `dmss-faas-interactive-v2.3.0` ควรทำอย่างใดอย่างหนึ่งหลัง deploy:

1. Reload หน้า 1–2 ครั้ง
2. Clear site data/cache
3. ถ้าติดตั้ง PWA เก่า ให้ลบแล้วติดตั้งใหม่

## หมายเหตุทางวิทยาศาสตร์

- Animation เป็นการอธิบายเชิงแนวคิดตามลำดับวิธีในบทความ ไม่ได้จำลองอัตราการเคลื่อนที่จริง
- ช่วงเวลา 25 นาทีถูกย่อให้เล่นได้ภายในไม่กี่วินาที แต่ข้อความระบุเวลาจริงไว้ครบ
- sensitivity gain หมายถึงความชัน calibration curve ไม่ใช่ accuracy เพิ่มตามจำนวนเท่า
- qmax เป็นความจุตัวดูดซับ ไม่ใช่ความเข้มข้นในเครื่องดื่ม
- not detected หมายถึงต่ำกว่า LOD ไม่ได้แปลว่าไม่มีสารโดยสมบูรณ์
