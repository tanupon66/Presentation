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
