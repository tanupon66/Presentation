# DMSS-FAAS Interactive Presentation v2.0.0

เว็บแอปนำเสนองานวิจัยการตรวจ Cd และ Pb ในชาและกาแฟด้วย DMSS-FAAS เวอร์ชันนี้เป็นการรีโครงสร้างตัวโปรแกรมและออกแบบ UI ใหม่ทั้งหมด โดยคงเนื้อหาเชิงวิชาการ สคริปต์ผู้นำเสนอ ภาษาไทย/อังกฤษ การทดลองเสมือน โหมดเดโม และ Presenter แบบสองจอจากเวอร์ชันเดิมไว้

## จุดสำคัญของ v2.0.0

- เปลี่ยนจากการย่อหน้าเว็บด้วย `zoom` เป็น app shell ที่แบ่งพื้นที่ Top bar, Chapter rail, Stage และ Navigation ชัดเจน
- แต่ละฉากเลื่อนภายในพื้นที่ของตนเอง จึงไม่ซ้อนใต้ส่วนหัวหรือปุ่มควบคุม
- ออกแบบใหม่ครบทุกฉาก การ์ด กราฟ แผงควบคุม dialog และหน้าผู้นำเสนอ
- รองรับ Desktop, Tablet, Mobile portrait และ Mobile landscape โดยไม่ตัดเนื้อหาวิชาการ
- เพิ่ม Chapter rail บนจอใหญ่ และ command sheet บนมือถือ
- Notes, Research details และ Presenter overlay เปิดได้ทีละส่วน ไม่ซ้อนกัน
- ปรับ experiment animation ให้ deterministic และยกเลิก timer เก่าเมื่อ reset หรือเปลี่ยนสถานะ
- รองรับ swipe ซ้าย/ขวาโดยไม่รบกวนการเลื่อนแนวตั้ง
- รองรับ `prefers-reduced-motion`, keyboard focus และ ARIA state
- อัปเดต PWA manifest และ offline cache เป็น v2.0.0

## วิธีเปิดใช้งาน

### Deploy บน Cloudflare Pages / GitHub Pages / Static Hosting

1. แตกไฟล์ ZIP
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมด โดยให้ `index.html` อยู่ที่ root ของเว็บไซต์
3. ไม่ต้องใช้ Build command และไม่ต้องใช้ Node.js server
4. เปิด `index.html` สำหรับภาษาอังกฤษ หรือ `index_th.html` สำหรับภาษาไทย

ค่าที่แนะนำสำหรับ Cloudflare Pages:

- Framework preset: `None`
- Build command: เว้นว่าง
- Build output directory: `/` หรือโฟลเดอร์ที่มี `index.html`

### ทดสอบบนเครื่อง

Service Worker ต้องทำงานผ่าน HTTP/HTTPS ไม่ควรดับเบิลคลิกไฟล์โดยตรงเมื่อต้องการทดสอบ PWA หรือ Offline

```bash
python -m http.server 8080
```

จากนั้นเปิด `http://localhost:8080`

## การควบคุม

- `←` / `→` หรือ Space: เปลี่ยนฉาก
- `N`: เปิด/ปิด Notes
- `E`: เปิด/ปิด Research details
- `P`: เปิด/ปิด Presenter overlay
- `G`: เปิด Dual-screen Presenter View
- `D`: เปิด/ปิด Auto demo
- `F`: Fullscreen
- `R`: รีเซ็ตตัวจับเวลา 15 นาที
- แตะตัวจับเวลา: เริ่ม/หยุดเวลา
- มือถือ: ใช้ปุ่มเมนูลอยเพื่อเปิดคำสั่งทั้งหมด

## Presenter แบบสองจอ

1. เปิดหน้าหลักบนจอที่ใช้ฉาย
2. กด `Dual` หรือปุ่ม `G`
3. ย้ายหน้าต่าง Presenter ไปยังจอของผู้พูด
4. หน้าผู้นำเสนอจะแสดงฉากปัจจุบัน ฉากถัดไป สคริปต์ โน้ต หลักฐาน เวลา และรีโมตควบคุม

เบราว์เซอร์อาจบล็อกหน้าต่างใหม่ในครั้งแรก ให้กดอนุญาต popup สำหรับเว็บไซต์นี้

## โครงเรื่อง 13 ฉาก

1. Opening
2. Research goal
3. Conventional FAAS vs DMSS-FAAS
4. Virtual experiment
5. Sorbent evidence
6. Optimization
7. Adsorption behavior
8. Performance and sensitivity
9. Validation and reliability
10. Real sample results
11. Experimental scope
12. Conclusion
13. Q&A backup

## ไฟล์หลัก

- `index.html` — หน้าหลักภาษาอังกฤษ
- `index_th.html` — หน้าหลักภาษาไทย
- `styles.css` — design system และ responsive layout ใหม่
- `app.js` — navigation, timer, animation, panels และ interaction
- `research_content.js` — สคริปต์และเนื้อหาเชิงลึกสองภาษา
- `presenter.html` / `presenter.js` — Presenter แบบสองจอ
- `manifest.webmanifest` / `sw.js` — PWA และ offline cache
- `PRESENTER_SCRIPT_TH.md` / `PRESENTER_SCRIPT_EN.md` — สคริปต์แยกไฟล์
- `TEST_REPORT_TH.md` — รายงานการตรวจสอบเวอร์ชันนี้

## หมายเหตุทางวิทยาศาสตร์

- กราฟ DOE ใช้สมการ regression ที่รายงานในบทความและจำกัดการตีความไว้ในช่วงตัวแปรที่ศึกษา
- การเคลื่อนที่ของไอออนและบาง visualization เป็น conceptual animation เพื่ออธิบายกลไก
- ค่า sensitivity gain หมายถึงการเพิ่มความชัน calibration curve ไม่ได้หมายถึง accuracy เพิ่มขึ้นเท่ากัน
- “Not detected” ไม่ได้แปลว่าความเข้มข้นเป็นศูนย์
- ภาพจากบทความใช้เพื่อการนำเสนอในชั้นเรียนตามบริบทของโปรเจกต์นี้
