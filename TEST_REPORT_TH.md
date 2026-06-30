# รายงานการทดสอบ DMSS-FAAS Interactive Presentation v2.0.0

วันที่ตรวจสอบ: 30 มิถุนายน 2026

## 1. Static validation

ผ่านการตรวจสอบ 68 รายการ รวมถึง:

- JavaScript syntax: `app.js`, `presenter.js`, `research_content.js`, `sw.js`
- JSON parse: `manifest.webmanifest`
- HTML structure: `index.html`, `index_th.html`, `presenter.html`
- ไม่พบ DOM ID ซ้ำในหน้าหลัก
- ทุก `getElementById()` ใน controller มี element ปลายทาง
- Service Worker อ้างอิงไฟล์ offline core ที่มีอยู่จริง
- ไม่พบ responsive logic ที่ใช้ CSS `zoom`
- Experiment particles ใช้ลำดับ deterministic
- ไฟล์หลักอ้างอิงเวอร์ชัน cache v2.0.0

ผล: **PASS 68/68**

## 2. Chromium layout rendering

ทดสอบการแสดงผลจริงครบ 13 ฉากในขนาด:

- Desktop: 1440 × 900
- Tablet: 1024 × 768
- Mobile portrait: 390 × 844
- Mobile landscape: 844 × 390

ผลที่ตรวจ:

- มี active scene เพียงหนึ่งฉากทุกครั้ง
- Navigation ไปครบทั้ง 13 ฉาก
- ไม่พบ page-level horizontal overflow
- ไม่พบ active-scene horizontal overflow
- หน้า Reliability บนมือถือแสดงเป็นคอลัมน์เดียวและไม่ดันเนื้อหาออกนอกจอ
- ไม่พบ JavaScript page error ในทุก viewport

ผล: **PASS**

## 3. Interaction checks

ตรวจสอบแล้ว:

- Chapter rail กระโดดไปยังฉากที่เลือก
- Virtual experiment เดินขั้นและ reset กลับสู่สถานะเริ่มต้น
- Notes, Presenter และ Research panels ทำงานแบบ mutually exclusive
- Source figure dialog เปิดและปิดได้
- Rehearsal timer เดินจาก 15:00 เป็น 14:59 และ reset ได้
- Auto demo แสดงสถานะเฉพาะเมื่อเปิด และซ่อนเมื่อปิด
- หน้าไทยโหลดครบ 13 ฉากและไม่ล้นจอ
- Dual-screen Presenter มีปุ่มควบคุม 6 ปุ่มและไม่ล้นแนวนอน

ผล: **PASS — ไม่พบ JavaScript error**

## 4. PWA checks

- Manifest, start URL, scope และ display mode ถูกต้อง
- Offline core list ใน Service Worker ตรงกับไฟล์จริง
- Cache name อัปเดตเป็น v2.0.0 เพื่อไม่ใช้ asset เก่าปะปน
- HTML/CSS/JS ใช้ version query v2.0.0

หมายเหตุ: การ render test ใช้ Chromium headless โดยฝัง local CSS/JS เข้าเอกสารโดยตรง เนื่องจากสภาพแวดล้อมทดสอบบล็อกการนำทางไป local URL ส่วนโครงสร้าง PWA และรายการ offline cache ตรวจด้วย static validation

## 5. ขอบเขตการรับรอง

ผลทดสอบครอบคลุมโครงสร้าง โค้ด interaction และ viewport หลัก แต่เบราว์เซอร์/อุปกรณ์จริงบางรุ่นอาจมีพฤติกรรม popup, fullscreen หรือ safe-area ต่างกัน ควรทดสอบรอบสุดท้ายบนอุปกรณ์ที่จะใช้พรีเซนต์จริงก่อนวันนำเสนอ
