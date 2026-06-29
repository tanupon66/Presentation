# DMSS-FAAS Interactive Research Story

เว็บไซต์นำเสนอแบบ Interactive สำหรับงานวิจัยการตรวจ Cd และ Pb ในชาและกาแฟด้วย DMSS-FAAS ออกแบบให้พูดจบภายในประมาณ 15 นาที และใช้เป็น PWA แบบออฟไลน์ได้

## วิธีเปิดใช้งาน

### วิธีง่ายที่สุด
1. แตกไฟล์ ZIP
2. อัปโหลดโฟลเดอร์ทั้งหมดขึ้น Cloudflare Pages, GitHub Pages หรือ Static Hosting
3. เปิด `index.html`

### เปิดบนเครื่องแบบ Local Server
ไม่ควรดับเบิลคลิก `index.html` หากต้องการทดสอบ PWA/Offline เพราะ Service Worker ต้องทำงานผ่าน HTTP/HTTPS

```bash
python -m http.server 8080
```

แล้วเปิด `http://localhost:8080`

## ปุ่มควบคุม
- ลูกศรซ้าย/ขวา หรือ Space: เปลี่ยนฉาก
- N: เปิด Presenter Notes ภาษาไทย
- F: Fullscreen
- R: รีเซ็ตเวลา 15 นาที
- คลิกเวลามุมขวาบน: เริ่ม/หยุดจับเวลา

## โครงเรื่อง (13 ฉาก โดยฉาก Q&A ไม่รวมในเวลา 15 นาที)
1. Opening question
2. Research goal
3. Conventional FAAS vs DMSS-FAAS
4. Virtual experiment
5. M-OPP synthesis and evidence
6. Optimization simulator
7. Adsorption behavior
8. Performance and sensitivity
9. Validation and reliability
10. Real sample results
11. Experimental scope
12. Final conclusion + Q&A backup

## หมายเหตุทางวิทยาศาสตร์
- กราฟ DOE ใช้สมการ regression ที่รายงานในบทความ และจำกัดไว้ในช่วงตัวแปรที่ศึกษา
- ภาพการเคลื่อนที่ของไอออนเป็น conceptual animation
- ภาพ Fig. 1–3 เป็นภาพจากบทความที่ผู้ใช้อัปโหลด ใช้สำหรับการนำเสนอในชั้นเรียน
- ค่า sensitivity gain หมายถึงความชัน calibration curve ไม่ใช่ accuracy เพิ่มขึ้นตามจำนวนเท่า

## Deploy บน Cloudflare Pages
- Build command: เว้นว่าง
- Build output directory: `/` หรือโฟลเดอร์ที่มี `index.html`
- Framework preset: None


## อัปเดต v1.1.0
- ปรับ Responsive UI ให้รองรับหน้าจอขนาดเล็ก กลาง ใหญ่ และโหมดแนวตั้ง/แนวนอนดีขึ้น
- เอา orientation lock แบบ landscape-only ออก เพื่อให้ติดตั้งเป็น PWA ได้ทั้ง portrait และ landscape
- ปรับปุ่มและ top bar บนมือถือไม่ให้หาย และใช้งานได้ในจอแคบ
- เพิ่มการคำนวณ `--vh` เพื่อแก้ปัญหาความสูงเพี้ยนบนมือถือบางรุ่น
- ปรับ experiment animation ให้ deterministic มากขึ้นเมื่อกดข้ามขั้น รีเซ็ต หรือสลับโลหะ Cd/Pb
- เพิ่มข้อความกำกับว่า experiment signal เป็น conceptual transient peak ตามลำดับขั้นตอนในบทความ
- อัปเดต service worker cache version เป็น 1.1.0


## อัปเดต v1.2.0
- รีเฟรช UI ให้ดูทันสมัยขึ้น โดยเพิ่ม control chips, glass panel และ layout ที่เหมาะกับการนำเสนอมากขึ้น
- เพิ่ม **Presenter Mode** สำหรับผู้พูด: มี current scene, next scene, scene notes, countdown, rehearsal timer และ scene jump list
- เพิ่ม **Auto-play Demo Mode** ให้เว็บเปลี่ยนฉากอัตโนมัติตามเวลาที่กำหนดในแต่ละ scene
- เพิ่ม **2 ภาษา ไทย/อังกฤษ** ผ่าน `index.html` (English) และ `index_th.html` (Thai)
- เพิ่มการรองรับ install prompt ของ PWA
- เพิ่มการ cache หน้าไทยใน service worker เพื่อใช้งานแบบ offline ได้


## อัปเดต v1.3.0
- เพิ่ม **mobile popup command menu** สำหรับใช้งานบนมือถือ โดยเฉพาะเมื่ออยู่ในโหมดแนวนอน
- เพิ่ม **compact landscape mode** เพื่อลดปัญหาเนื้อหาเกินหน้าจอในมือถือแนวนอน และพยายามให้แสดงได้ครบในจอเดียวมากขึ้น
- เพิ่ม **Dual-screen Presenter View** ผ่านไฟล์ `presenter.html` พร้อมการ sync แบบ live ระหว่างหน้าหลักกับหน้าผู้นำเสนอ
- เพิ่ม remote controls บนหน้าผู้นำเสนอ (prev / next / demo / restart / toggle notes / toggle presenter overlay)
- ปรับ mini chart และ gauge animation ให้ลื่นขึ้น
- อัปเดต service worker cache เป็น `v1.3.0` และ cache ไฟล์ presenter เพิ่มเติม


## Hotfix v1.3.1
สาเหตุของ UI ซ้อนกันใน v1.3.0 คือ mobile media query กำหนดแถว header ไว้ 58 px แต่ topbar ถูกอนุญาตให้ wrap เป็นหลายแถว ทำให้ความสูงจริงมากกว่า grid row และ slide เริ่มแสดงอยู่ใต้ header นอกจากนี้ปุ่ม utility ทั้งหมดถูกแสดงใน header แทนที่จะย้ายไป popup menu

สิ่งที่แก้:
- บังคับ mobile header ให้เป็นแถวเดียวและมีความสูงคงที่
- ซ่อน Demo / Presenter / Dual / Notes จาก header บนมือถือ แล้วย้ายไป popup command menu
- ให้ slide scroll ภายใน stage โดยไม่ทับ header และ footer
- ปรับ compact landscape ให้ fit-to-screen มากขึ้น
- ปรับ service worker เป็น network-first สำหรับ HTML/CSS/JS พร้อม version query `v=1.3.1`


## อัปเดต v1.4.0 — เนื้อหาเชิงลึกและสคริปต์ผู้นำเสนอ
- เพิ่มปุ่ม **Research / เนื้อหาเชิงลึก** เพื่อเปิดรายละเอียดของฉากปัจจุบัน
- เพิ่มข้อมูลเชิงลึกครบทั้ง 13 ฉาก: วิธีทดลอง ตัวแปร เครื่องมือ แบบจำลอง สถิติ validation ผลตัวอย่างจริง และข้อจำกัด
- เพิ่ม **Full Script** ภาษาอังกฤษและภาษาไทยในแผง Notes
- โหมด Presenter มี 3 แท็บ: Full Script, Quick Notes และ Evidence
- Dual-screen Presenter ส่งสคริปต์เต็ม หลักฐาน และแหล่งอ้างอิงของฉากปัจจุบันไปยังจอผู้พูด
- เพิ่มข้อควรระวังในการตีความ เช่น sensitivity gain ไม่เท่ากับ accuracy และ not detected ไม่เท่ากับศูนย์
- ปุ่มลัด `E` ใช้เปิด/ปิด Research Details
