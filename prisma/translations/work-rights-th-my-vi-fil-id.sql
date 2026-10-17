-- Work rights text in Thai, Myanmar, Vietnamese, Filipino and Indonesian for all 22 countries.
-- Writes ONLY the new work_rights_th/_my/_vi/_fil/_idn columns (run the add-columns migration first).
-- English work_rights and every other column are never touched.
-- All-or-nothing: one DO block. Each row is matched by slug AND the exact current English
-- text, so a country whose English was edited is reported instead of overwritten.
-- Safe to re-run. Run in the Supabase SQL editor.

DO $$
DECLARE n integer;
BEGIN
  UPDATE countries SET
    "work_rights_th" = $q$48 ชั่วโมงต่อสองสัปดาห์ในช่วงภาคเรียน; ไม่จำกัดชั่วโมงในช่วงวันหยุดอย่างเป็นทางการ; หลังเรียนจบ: วีซ่า subclass 485 นาน 2-4 ปี$q$,
    "work_rights_my" = $q$Semester အတွင်း နှစ်ပတ်လျှင် ၄၈ နာရီ; တရားဝင် အားလပ်ရက်တွေမှာ အကန့်အသတ်မရှိ; ပညာတော်သင်ပြီးနောက်: Subclass 485 Visa, ၂-၄ နှစ်$q$,
    "work_rights_vi" = $q$48 giờ mỗi hai tuần trong học kỳ; không giới hạn trong các kỳ nghỉ chính thức; Sau tốt nghiệp: visa subclass 485, 2-4 năm$q$,
    "work_rights_fil" = $q$48 oras kada dalawang linggo habang may semester; walang limitasyon tuwing opisyal na bakasyon; Post-study: subclass 485 visa, 2-4 na taon$q$,
    "work_rights_idn" = $q$48 jam per dua minggu selama semester; tanpa batas selama libur resmi; Pascastudi: visa subclass 485, 2-4 tahun$q$
  WHERE slug = $q$australia$q$ AND work_rights = $q$48 hrs/fortnight during semester; unlimited during official holidays. Post-study: subclass 485 visa — 2–4 years.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'australia: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$ทำงานได้สูงสุด 20 ชั่วโมงต่อสัปดาห์ในช่วงภาคเรียนตามใบอนุญาตทำงานของนักศึกษา และทำงานเต็มเวลาได้ในช่วงวันหยุดอย่างเป็นทางการของมหาวิทยาลัย; หลังเรียนจบ: ต่อระยะเวลาพำนักเพื่อหางานได้ 12 เดือนสำหรับผู้สำเร็จการศึกษาที่ไม่ได้มาจาก EU$q$,
    "work_rights_my" = $q$Student work permit နဲ့ Semester အတွင်း တစ်ပတ်လျှင် ၂၀ နာရီအထိ၊ တက္ကသိုလ်ရဲ့ တရားဝင် အားလပ်ရက်တွေမှာ Full-time လုပ်နိုင်တယ်; ပညာတော်သင်ပြီးနောက်: EU မဟုတ်တဲ့ ကျောင်းဆင်းတွေအတွက် အလုပ်ရှာဖို့ ၁၂ လ Residence တိုးမြှင့်ခွင့် ရှိတယ်$q$,
    "work_rights_vi" = $q$Tối đa 20 giờ mỗi tuần trong học kỳ theo giấy phép lao động dành cho sinh viên, làm toàn thời gian trong các kỳ nghỉ chính thức của trường; Sau tốt nghiệp: có thể gia hạn cư trú 12 tháng để tìm việc dành cho sinh viên tốt nghiệp ngoài EU$q$,
    "work_rights_fil" = $q$Hanggang 20 oras kada linggo habang may klase sa ilalim ng student work permit, full-time tuwing opisyal na bakasyon ng university; Post-study: may 12-buwang job search extension para sa mga non-EU graduate$q$,
    "work_rights_idn" = $q$Hingga 20 jam per minggu selama semester dengan izin kerja mahasiswa, penuh waktu selama libur resmi universitas; Pascastudi: tersedia perpanjangan pencarian kerja 12 bulan bagi lulusan non-UE$q$
  WHERE slug = $q$belgium$q$ AND work_rights = $q$Up to 20 hours a week during term time on a student work permit, full time during official university holidays. Post-study: 12-month job search extension available for non-EU graduates.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'belgium: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$20 ชั่วโมง/สัปดาห์ในช่วงภาคเรียน; ทำงานเต็มเวลาได้ในช่วงปิดภาคตามกำหนด; PGWP หลังเรียนจบ: ใบอนุญาตทำงานแบบเปิดเท่ากับระยะเวลาการศึกษา สูงสุด 3 ปี$q$,
    "work_rights_my" = $q$Semester အတွင်း တစ်ပတ်လျှင် ၂၀ နာရီ; သတ်မှတ်ထားတဲ့ Break တွေမှာ Full-time လုပ်နိုင်တယ်; ဘွဲ့ရပြီးနောက် PGWP: ပညာသင်တဲ့ကာလနဲ့ညီတဲ့ Open work permit, အများဆုံး ၃ နှစ်$q$,
    "work_rights_vi" = $q$20 giờ/tuần trong học kỳ; toàn thời gian trong các kỳ nghỉ theo lịch; PGWP sau tốt nghiệp: giấy phép làm việc mở có thời hạn bằng thời gian học, tối đa 3 năm$q$,
    "work_rights_fil" = $q$20 oras/linggo habang may klase; full-time tuwing nakatakdang break; PGWP pagkatapos magtapos: open work permit na katumbas ng haba ng pag-aaral, hanggang 3 taon$q$,
    "work_rights_idn" = $q$20 jam/minggu selama semester; penuh waktu selama libur terjadwal; PGWP setelah lulus: izin kerja terbuka sesuai lama studi, hingga 3 tahun$q$
  WHERE slug = $q$canada$q$ AND work_rights = $q$20 hrs/week during term; full-time during scheduled breaks. PGWP after graduation: open work permit matching study length, up to 3 years.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'canada: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$ทำงานได้สูงสุด 8 ชั่วโมงต่อสัปดาห์ในช่วงภาคเรียนเมื่อได้รับอนุญาตจากมหาวิทยาลัยและสำนักความมั่นคงสาธารณะ และ 16 ชั่วโมงต่อสัปดาห์ในช่วงปิดภาคอย่างเป็นทางการ; หลังเรียนจบ: ผู้สำเร็จการศึกษาระดับปริญญาโทและเอกสามารถขอวีซ่าทำงานประเภท Z ได้ภายใน 1 ปีหลังเรียนจบ$q$,
    "work_rights_my" = $q$တက္ကသိုလ်နဲ့ Public Security Bureau ရဲ့ ခွင့်ပြုချက်ရရင် Semester အတွင်း တစ်ပတ်လျှင် ၈ နာရီအထိ၊ တရားဝင် Break တွေမှာ တစ်ပတ်လျှင် ၁၆ နာရီအထိ; ပညာတော်သင်ပြီးနောက်: Master's နဲ့ PhD ဘွဲ့ရသူတွေက ဘွဲ့ရပြီး ၁ နှစ်အတွင်း Z work visa လျှောက်နိုင်တယ်$q$,
    "work_rights_vi" = $q$Tối đa 8 giờ mỗi tuần trong học kỳ khi có sự cho phép của trường và Cục An ninh Công cộng, 16 giờ mỗi tuần trong các kỳ nghỉ chính thức; Sau tốt nghiệp: sinh viên tốt nghiệp thạc sĩ và tiến sĩ có thể xin visa làm việc Z trong vòng 1 năm sau khi tốt nghiệp$q$,
    "work_rights_fil" = $q$Hanggang 8 oras kada linggo habang may klase kapag may awtorisasyon ng university at Public Security Bureau, 16 oras kada linggo tuwing opisyal na break; Post-study: puwedeng mag-apply ng Z work visa sa loob ng 1 taon pagkatapos magtapos ang mga nagtapos ng Master's at PhD$q$,
    "work_rights_idn" = $q$Hingga 8 jam per minggu selama semester dengan otorisasi universitas dan Biro Keamanan Publik, 16 jam per minggu selama libur resmi; Pascastudi: lulusan Magister dan PhD dapat mengajukan visa kerja Z dalam 1 tahun setelah lulus$q$
  WHERE slug = $q$china$q$ AND work_rights = $q$Up to 8 hours a week during term with university and Public Security Bureau authorisation, 16 hours a week during official breaks. Post-study: Master's and PhD graduates can apply for a Z work visa within 1 year of graduating.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'china: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$ทำงานได้สูงสุด 30 ชั่วโมงต่อสัปดาห์ในช่วงภาคเรียน; ไม่จำกัดสำหรับการฝึกงานและงานวิทยานิพนธ์; หลังเรียนจบ: ใบอนุญาตพำนักเพื่อหางาน สูงสุด 24 เดือน$q$,
    "work_rights_my" = $q$Semester အတွင်း တစ်ပတ်လျှင် ၃၀ နာရီအထိ; Internship နဲ့ Thesis လုပ်ငန်းတွေအတွက် အကန့်အသတ်မရှိ; ပညာတော်သင်ပြီးနောက်: အလုပ်ရှာဖို့ Residence permit, အများဆုံး ၂၄ လ$q$,
    "work_rights_vi" = $q$Tối đa 30 giờ mỗi tuần trong học kỳ; không giới hạn đối với thực tập và làm luận văn; Sau tốt nghiệp: giấy phép cư trú để tìm việc, tối đa 24 tháng$q$,
    "work_rights_fil" = $q$Hanggang 30 oras kada linggo habang may klase; walang limitasyon para sa internship at thesis work; Post-study: residence permit para sa paghahanap ng trabaho, hanggang 24 na buwan$q$,
    "work_rights_idn" = $q$Hingga 30 jam per minggu selama semester; tanpa batasan untuk magang dan pengerjaan tesis; Pascastudi: izin tinggal untuk mencari kerja, hingga 24 bulan$q$
  WHERE slug = $q$finland$q$ AND work_rights = $q$Up to 30 hours a week during term time; unrestricted for internships and thesis work. Post-study: residence permit for jobseeking, up to 24 months.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'finland: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$ทำงานได้สูงสุด 964 ชั่วโมงต่อปี (เฉลี่ยประมาณ 20 ชั่วโมงต่อสัปดาห์) ด้วยใบอนุญาตพำนักนักศึกษาที่ยังมีผล; หลังเรียนจบ: ใบอนุญาต APS 12 เดือนเพื่อหางานหรือเริ่มธุรกิจ$q$,
    "work_rights_my" = $q$တရားဝင် Student residence permit နဲ့ တစ်နှစ်လျှင် ၉၆၄ နာရီအထိ (ပျမ်းမျှ တစ်ပတ်လျှင် ၂၀ နာရီခန့်); ပညာတော်သင်ပြီးနောက်: အလုပ်ရှာဖို့ ဒါမှမဟုတ် Business စတင်ဖို့ ၁၂ လ APS permit$q$,
    "work_rights_vi" = $q$Tối đa 964 giờ mỗi năm (trung bình khoảng 20 giờ mỗi tuần) với giấy phép cư trú sinh viên hợp lệ; Sau tốt nghiệp: giấy phép APS 12 tháng để tìm việc hoặc khởi nghiệp$q$,
    "work_rights_fil" = $q$Hanggang 964 oras kada taon (humigit-kumulang 20 oras kada linggo sa average) gamit ang balidong student residence permit; Post-study: APS permit na 12 buwan para maghanap ng trabaho o magsimula ng negosyo$q$,
    "work_rights_idn" = $q$Hingga 964 jam per tahun (rata-rata sekitar 20 jam per minggu) dengan izin tinggal pelajar yang berlaku; Pascastudi: izin APS selama 12 bulan untuk mencari kerja atau memulai bisnis$q$
  WHERE slug = $q$france$q$ AND work_rights = $q$Up to 964 hours a year (about 20 hours a week on average) on a valid student residence permit. Post-study: APS permit for 12 months to find work or start a business.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'france: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$120 วันเต็มหรือ 240 ครึ่งวันต่อปีในระหว่างการศึกษา; หลังเรียนจบ: Job Seeker Visa 18 เดือนเพื่อหางาน$q$,
    "work_rights_my" = $q$ပညာသင်နေစဉ် တစ်နှစ်လျှင် တစ်ရက်ပြည့် ၁၂၀ ရက် ဒါမှမဟုတ် တစ်ဝက်ရက် ၂၄၀; ပညာတော်သင်ပြီးနောက်: အလုပ်ရှာဖို့ ၁၈ လ Job Seeker Visa$q$,
    "work_rights_vi" = $q$120 ngày làm việc đầy đủ hoặc 240 nửa ngày mỗi năm trong thời gian học; Sau tốt nghiệp: Job Seeker Visa 18 tháng để tìm việc$q$,
    "work_rights_fil" = $q$120 buong araw o 240 kalahating araw kada taon habang nag-aaral; Post-study: Job Seeker Visa na 18 buwan para maghanap ng trabaho$q$,
    "work_rights_idn" = $q$120 hari penuh atau 240 setengah hari per tahun selama studi; Pascastudi: Job Seeker Visa selama 18 bulan untuk mencari kerja$q$
  WHERE slug = $q$germany$q$ AND work_rights = $q$120 full days or 240 half days per year during study. Post-study: Job Seeker Visa for 18 months to find work.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'germany: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$จำกัดการทำงานในมหาวิทยาลัยในระหว่างการศึกษา; หลังสำเร็จการศึกษา: จับคู่เข้าโปรแกรมแพทย์ประจำบ้านในสหรัฐฯ หรือแคนาดาผ่านเส้นทาง USMLE/NRMP; ไม่มีเส้นทางวีซ่าทำงานทั่วไปในเกรเนดา$q$,
    "work_rights_my" = $q$ပညာသင်နေစဉ် Campus ထဲမှာ အလုပ်လုပ်ခွင့် အကန့်အသတ်ရှိတယ်; ဘွဲ့ရပြီးနောက်: USMLE/NRMP လမ်းကြောင်းနဲ့ US ဒါမှမဟုတ် Canada ရဲ့ Residency programme တွေကို Match ဖြစ်အောင်လုပ်ရတယ်; Grenada မှာ အထွေထွေ Work visa လမ်းကြောင်း မရှိပါဘူး$q$,
    "work_rights_vi" = $q$Việc làm trong khuôn viên trường bị giới hạn trong thời gian học; Sau tốt nghiệp: trúng tuyển vào các chương trình nội trú ở Mỹ hoặc Canada qua lộ trình USMLE/NRMP; không có lộ trình visa làm việc phổ thông tại Grenada$q$,
    "work_rights_fil" = $q$Limitado ang on-campus na trabaho habang nag-aaral; Pagkatapos magtapos: ma-match sa mga residency programme sa US o Canada sa pamamagitan ng USMLE/NRMP pathway; walang pangkalahatang work visa pathway sa Grenada$q$,
    "work_rights_idn" = $q$Pekerjaan di dalam kampus terbatas selama studi; Setelah lulus: dicocokkan ke program residensi AS atau Kanada melalui jalur USMLE/NRMP; tidak ada jalur visa kerja umum di Grenada$q$
  WHERE slug = $q$grenada$q$ AND work_rights = $q$Limited on-campus employment during study. Post-graduation: match into US or Canadian residency programs via USMLE/NRMP pathway; no general work visa pathway in Grenada.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'grenada: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$ทำงานได้สูงสุด 30 ชั่วโมงต่อสัปดาห์ในช่วงภาคเรียน และทำงานเต็มเวลาได้สูงสุด 90 วันต่อปีนอกภาคเรียน; หลังเรียนจบคุณสามารถขอใบอนุญาตพำนักแบบเปลี่ยนจากการเรียนเป็นการทำงาน ซึ่งให้เวลาสูงสุดเก้าเดือนในการหางาน$q$,
    "work_rights_my" = $q$Semester အတွင်း တစ်ပတ်လျှင် ၃၀ နာရီအထိ၊ Semester အပြင်မှာ တစ်နှစ်လျှင် ရက် ၉၀ အထိ Full-time လုပ်နိုင်တယ်; ဘွဲ့ရပြီးနောက် Study to work residence permit လျှောက်နိုင်ပြီး အလုပ်ရှာဖို့ ကိုးလအထိ ရတယ်$q$,
    "work_rights_vi" = $q$Tối đa 30 giờ mỗi tuần trong học kỳ, và làm toàn thời gian tối đa 90 ngày mỗi năm ngoài học kỳ; Sau khi tốt nghiệp bạn có thể xin giấy phép cư trú chuyển từ học sang làm việc, cho bạn tối đa chín tháng để tìm việc$q$,
    "work_rights_fil" = $q$Hanggang 30 oras kada linggo habang may klase, at full-time nang hanggang 90 araw kada taon sa labas ng klase; Pagkatapos magtapos, puwede kang mag-apply ng study to work residence permit na nagbibigay ng hanggang siyam na buwan para maghanap ng trabaho$q$,
    "work_rights_idn" = $q$Hingga 30 jam per minggu selama semester, dan penuh waktu hingga 90 hari per tahun di luar semester; Setelah lulus Anda dapat mengajukan izin tinggal peralihan studi ke kerja yang memberi hingga sembilan bulan untuk mencari pekerjaan$q$
  WHERE slug = $q$hungary$q$ AND work_rights = $q$Up to 30 hours a week during term time, and full time for a maximum of 90 days a year outside term. After graduating you may apply for a study to work residence permit giving you up to nine months to find employment.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'hungary: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$20 ชั่วโมง/สัปดาห์ในช่วงภาคเรียน; 40 ชั่วโมง/สัปดาห์ในช่วงปิดภาค (1 มิถุนายน-30 กันยายน และ 15 ธันวาคม-15 มกราคม); หลังเรียนจบ: Stamp 1G นาน 12-24 เดือน$q$,
    "work_rights_my" = $q$Semester အတွင်း တစ်ပတ်လျှင် ၂၀ နာရီ; အားလပ်ရက်တွေမှာ တစ်ပတ်လျှင် ၄၀ နာရီ (ဇွန် ၁ ရက်-စက်တင်ဘာ ၃၀ နဲ့ ဒီဇင်ဘာ ၁၅ ရက်-ဇန်နဝါရီ ၁၅ ရက်); ပညာတော်သင်ပြီးနောက်: Stamp 1G, ၁၂-၂၄ လ$q$,
    "work_rights_vi" = $q$20 giờ/tuần trong học kỳ; 40 giờ/tuần trong kỳ nghỉ (1/6-30/9 và 15/12-15/1); Sau tốt nghiệp: Stamp 1G trong 12-24 tháng$q$,
    "work_rights_fil" = $q$20 oras/linggo habang may klase; 40 oras/linggo tuwing bakasyon (1 Jun-30 Sep at 15 Dec-15 Jan); Post-study: Stamp 1G na 12-24 buwan$q$,
    "work_rights_idn" = $q$20 jam/minggu selama semester; 40 jam/minggu selama libur (1 Jun-30 Sep dan 15 Des-15 Jan); Pascastudi: Stamp 1G selama 12-24 bulan$q$
  WHERE slug = $q$ireland$q$ AND work_rights = $q$20 hrs/week during term; 40 hrs/week during holidays (1 Jun–30 Sep & 15 Dec–15 Jan). Post-study: Stamp 1G for 12–24 months.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'ireland: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$ทำงานได้สูงสุด 20 ชั่วโมงต่อสัปดาห์ในช่วงภาคเรียนด้วยใบอนุญาตพำนักนักศึกษา; หลังเรียนจบ: ใบอนุญาตหางาน 12 เดือนที่ได้รับโดยอัตโนมัติ ไม่ต้องมีนายจ้างสนับสนุน$q$,
    "work_rights_my" = $q$Student residence permit နဲ့ Semester အတွင်း တစ်ပတ်လျှင် ၂၀ နာရီအထိ; ပညာတော်သင်ပြီးနောက်: ၁၂ လ Job search permit ကို အလိုအလျောက် ရတယ်၊ Employer sponsor မလိုဘူး$q$,
    "work_rights_vi" = $q$Tối đa 20 giờ mỗi tuần trong học kỳ với giấy phép cư trú sinh viên; Sau tốt nghiệp: giấy phép tìm việc 12 tháng được cấp tự động, không cần nhà tuyển dụng bảo lãnh$q$,
    "work_rights_fil" = $q$Hanggang 20 oras kada linggo habang may klase gamit ang student residence permit; Post-study: awtomatikong 12-buwang job search permit, hindi kailangan ng employer sponsor$q$,
    "work_rights_idn" = $q$Hingga 20 jam per minggu selama semester dengan izin tinggal pelajar; Pascastudi: izin pencarian kerja 12 bulan otomatis, tanpa sponsor pemberi kerja$q$
  WHERE slug = $q$italy$q$ AND work_rights = $q$Up to 20 hours a week during term time on a student residence permit. Post-study: automatic 12-month job search permit, no employer sponsor required.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'italy: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$20 ชั่วโมง/สัปดาห์ในช่วงภาคเรียน; ทำงานเต็มเวลาได้ในช่วงปิดภาค$q$,
    "work_rights_my" = $q$Semester အတွင်း တစ်ပတ်လျှင် ၂၀ နာရီ; အားလပ်ရက်တွေမှာ Full-time လုပ်နိုင်တယ်$q$,
    "work_rights_vi" = $q$20 giờ/tuần trong học kỳ; toàn thời gian trong kỳ nghỉ$q$,
    "work_rights_fil" = $q$20 oras/linggo habang may semester; full-time tuwing bakasyon$q$,
    "work_rights_idn" = $q$20 jam/minggu selama semester; penuh waktu selama libur$q$
  WHERE slug = $q$malaysia$q$ AND work_rights = $q$20 hrs/week during semester; full-time during holidays$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'malaysia: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$16 ชั่วโมง/สัปดาห์ในช่วงภาคเรียน; ทำงานเต็มเวลาได้ในช่วงฤดูร้อน (มิถุนายนถึงสิงหาคม)$q$,
    "work_rights_my" = $q$Semester အတွင်း တစ်ပတ်လျှင် ၁၆ နာရီ; နွေရာသီ (ဇွန်လမှ ဩဂုတ်လအထိ) မှာ Full-time လုပ်နိုင်တယ်$q$,
    "work_rights_vi" = $q$16 giờ/tuần trong học kỳ; toàn thời gian trong mùa hè (tháng 6 đến tháng 8)$q$,
    "work_rights_fil" = $q$16 oras/linggo habang may semester; full-time tuwing summer (June hanggang August)$q$,
    "work_rights_idn" = $q$16 jam/minggu selama semester; penuh waktu selama musim panas (Juni hingga Agustus)$q$
  WHERE slug = $q$netherlands$q$ AND work_rights = $q$16 hrs/week during semester; full-time during summer (June–August)$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'netherlands: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$20 ชั่วโมงต่อสัปดาห์ในระหว่างการศึกษา; ทำงานเต็มเวลาได้ในช่วงปิดภาคตามกำหนด; หลังเรียนจบ: วีซ่าทำงานแบบเปิดสูงสุด 3 ปีสำหรับผู้สำเร็จการศึกษาระดับปริญญาตรีขึ้นไป$q$,
    "work_rights_my" = $q$ပညာသင်နေစဉ် တစ်ပတ်လျှင် ၂၀ နာရီ; သတ်မှတ်ထားတဲ့ Break တွေမှာ Full-time လုပ်နိုင်တယ်; ပညာတော်သင်ပြီးနောက်: Bachelor's ဘွဲ့နဲ့အထက် ရသူတွေအတွက် အများဆုံး ၃ နှစ် Open work visa$q$,
    "work_rights_vi" = $q$20 giờ mỗi tuần trong thời gian học; toàn thời gian trong các kỳ nghỉ theo lịch; Sau tốt nghiệp: visa làm việc mở tối đa 3 năm cho sinh viên tốt nghiệp từ bậc cử nhân trở lên$q$,
    "work_rights_fil" = $q$20 oras kada linggo habang nag-aaral; full-time tuwing nakatakdang break; Post-study: hanggang 3 taong open work visa para sa mga nagtapos ng bachelor's degree at mas mataas$q$,
    "work_rights_idn" = $q$20 jam per minggu selama studi; penuh waktu selama libur terjadwal; Pascastudi: visa kerja terbuka hingga 3 tahun bagi lulusan sarjana ke atas$q$
  WHERE slug = $q$new-zealand$q$ AND work_rights = $q$20 hours per week during study; full-time during scheduled breaks. Post-study: up to 3 years open work visa for bachelor's degree graduates and above.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'new-zealand: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$16 ชั่วโมง/สัปดาห์ในช่วงภาคเรียน; ไม่จำกัดชั่วโมงในช่วงวันหยุดของโรงเรียนอย่างเป็นทางการ$q$,
    "work_rights_my" = $q$Semester အတွင်း တစ်ပတ်လျှင် ၁၆ နာရီ; ကျောင်းရဲ့ တရားဝင် အားလပ်ရက်တွေမှာ အကန့်အသတ်မရှိ$q$,
    "work_rights_vi" = $q$16 giờ/tuần trong học kỳ; không giới hạn trong các kỳ nghỉ chính thức của trường$q$,
    "work_rights_fil" = $q$16 oras/linggo habang may semester; walang limitasyon tuwing opisyal na school holiday$q$,
    "work_rights_idn" = $q$16 jam/minggu selama semester; tanpa batas selama libur sekolah resmi$q$
  WHERE slug = $q$singapore$q$ AND work_rights = $q$16 hrs/week during semester; unlimited during official school holidays$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'singapore: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$20 ชั่วโมง/สัปดาห์ในช่วงภาคเรียนด้วยวีซ่านักศึกษา; หลังเรียนจบ: วีซ่า Búsqueda de Empleo 12 เดือนเพื่อหางาน$q$,
    "work_rights_my" = $q$Student visa နဲ့ Semester အတွင်း တစ်ပတ်လျှင် ၂၀ နာရီ; ပညာတော်သင်ပြီးနောက်: အလုပ်ရှာဖို့ ၁၂ လ Búsqueda de Empleo visa$q$,
    "work_rights_vi" = $q$20 giờ/tuần trong học kỳ với visa du học; Sau tốt nghiệp: visa Búsqueda de Empleo 12 tháng để tìm việc$q$,
    "work_rights_fil" = $q$20 oras/linggo habang may klase gamit ang student visa; Post-study: Búsqueda de Empleo visa na 12 buwan para maghanap ng trabaho$q$,
    "work_rights_idn" = $q$20 jam/minggu selama semester dengan visa pelajar; Pascastudi: visa Búsqueda de Empleo selama 12 bulan untuk mencari kerja$q$
  WHERE slug = $q$spain$q$ AND work_rights = $q$20 hrs/week during term with a student visa. Post-study: Búsqueda de Empleo visa for 12 months to find employment.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'spain: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$15 ชั่วโมง/สัปดาห์ในระหว่างการศึกษา; การฝึกงานแบบได้รับค่าตอบแทนรวมอยู่ในโครงสร้างหลักสูตร$q$,
    "work_rights_my" = $q$ပညာသင်နေစဉ် တစ်ပတ်လျှင် ၁၅ နာရီ; လစာရတဲ့ Internship တွေက Programme ဖွဲ့စည်းပုံထဲမှာ ပါပြီးသား$q$,
    "work_rights_vi" = $q$15 giờ/tuần trong thời gian học; thực tập có lương được tích hợp trong cấu trúc chương trình$q$,
    "work_rights_fil" = $q$15 oras/linggo habang nag-aaral; kasama na sa istruktura ng programa ang mga bayad na internship$q$,
    "work_rights_idn" = $q$15 jam/minggu selama studi; magang berbayar sudah termasuk dalam struktur program$q$
  WHERE slug = $q$switzerland$q$ AND work_rights = $q$15 hrs/week during studies; paid internships included in programme structure$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'switzerland: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$การทำงานนอกเวลาต้องมีใบอนุญาตทำงานแยกต่างหาก; นักศึกษามีโอกาสจำกัด$q$,
    "work_rights_my" = $q$Part-time အလုပ်လုပ်ဖို့ သီးသန့် Work permit လိုတယ်; ကျောင်းသားတွေအတွက် အခွင့်အလမ်း အကန့်အသတ်ရှိတယ်$q$,
    "work_rights_vi" = $q$Làm thêm cần có giấy phép lao động riêng; sinh viên có rất ít cơ hội làm việc$q$,
    "work_rights_fil" = $q$Kailangan ng hiwalay na work permit para sa part-time na trabaho; limitado ang pagkakataon para sa mga estudyante$q$,
    "work_rights_idn" = $q$Kerja paruh waktu memerlukan izin kerja terpisah; kesempatan bagi mahasiswa terbatas$q$
  WHERE slug = $q$thailand$q$ AND work_rights = $q$Part-time work requires separate work permit; limited availability for students$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'thailand: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$อนุญาตให้ทำงานนอกเวลาด้วยวีซ่านักศึกษา; การฝึกงานรวมอยู่ในหลักสูตรส่วนใหญ่$q$,
    "work_rights_my" = $q$Student visa နဲ့ Part-time အလုပ်လုပ်ခွင့်ရှိတယ်; Programme အများစုမှာ Internship တွေ ပါပြီးသား$q$,
    "work_rights_vi" = $q$Được phép làm thêm với visa du học; thực tập được tích hợp trong hầu hết các chương trình$q$,
    "work_rights_fil" = $q$Pinapayagan ang part-time na trabaho gamit ang student visa; kasama na sa karamihan ng programa ang mga internship$q$,
    "work_rights_idn" = $q$Kerja paruh waktu diizinkan dengan visa pelajar; magang sudah termasuk dalam sebagian besar program$q$
  WHERE slug = $q$uae$q$ AND work_rights = $q$Part-time work permitted with student visa; internships built into most programmes$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'uae: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$20 ชั่วโมง/สัปดาห์ในช่วงภาคเรียน; ทำงานเต็มเวลาได้ในช่วงวันหยุดอย่างเป็นทางการ; หลังเรียนจบ: Graduate Route 2 ปี (3 ปีสำหรับปริญญาเอก)$q$,
    "work_rights_my" = $q$Semester အတွင်း တစ်ပတ်လျှင် ၂၀ နာရီ; တရားဝင် အားလပ်ရက်တွေမှာ Full-time လုပ်နိုင်တယ်; ပညာတော်သင်ပြီးနောက်: Graduate Route, ၂ နှစ် (PhD အတွက် ၃ နှစ်)$q$,
    "work_rights_vi" = $q$20 giờ/tuần trong học kỳ; toàn thời gian trong các kỳ nghỉ chính thức; Sau tốt nghiệp: Graduate Route, 2 năm (3 năm cho tiến sĩ)$q$,
    "work_rights_fil" = $q$20 oras/linggo habang may klase; full-time tuwing opisyal na bakasyon; Post-study: Graduate Route, 2 taon (3 para sa PhD)$q$,
    "work_rights_idn" = $q$20 jam/minggu selama semester; penuh waktu selama libur resmi; Pascastudi: Graduate Route, 2 tahun (3 tahun untuk PhD)$q$
  WHERE slug = $q$united-kingdom$q$ AND work_rights = $q$20 hrs/week during term; full-time during official holidays. Post-study: Graduate Route — 2 years (3 for PhD).$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'united-kingdom: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$20 ชั่วโมง/สัปดาห์ภายในมหาวิทยาลัยในช่วงภาคเรียน; หลังเรียนจบ: OPT 12 เดือน ขยายได้ถึง 36 เดือนสำหรับสาขา STEM$q$,
    "work_rights_my" = $q$Semester အတွင်း Campus ထဲမှာ တစ်ပတ်လျှင် ၂၀ နာရီ; ပညာတော်သင်ပြီးနောက်: OPT, ၁၂ လ၊ STEM အတွက် ၃၆ လအထိ တိုးနိုင်တယ်$q$,
    "work_rights_vi" = $q$20 giờ/tuần trong khuôn viên trường trong học kỳ; Sau tốt nghiệp: OPT, 12 tháng, gia hạn đến 36 tháng đối với ngành STEM$q$,
    "work_rights_fil" = $q$20 oras/linggo sa loob ng campus habang may klase; Post-study: OPT, 12 buwan, puwedeng i-extend hanggang 36 na buwan para sa STEM$q$,
    "work_rights_idn" = $q$20 jam/minggu di dalam kampus selama semester; Pascastudi: OPT, 12 bulan, dapat diperpanjang hingga 36 bulan untuk STEM$q$
  WHERE slug = $q$united-states$q$ AND work_rights = $q$20 hrs/week on-campus during term. Post-study: OPT — 12 months, extendable to 36 months for STEM.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'united-states: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE countries SET
    "work_rights_th" = $q$ปัจจุบันเวียดนามยังไม่มีสิทธิ์ทำงานนอกเวลาอย่างเป็นทางการสำหรับนักศึกษาต่างชาติ; อนุญาตให้ฝึกงานได้โดยไม่ต้องมีใบอนุญาตทำงานแยกต่างหาก และกระทรวงศึกษาธิการและฝึกอบรมได้เสนอให้ทำงานได้สูงสุด 20 ชั่วโมงต่อสัปดาห์ แต่ยังไม่มีผลบังคับใช้; อย่าวางแผนว่าจะหารายได้จากการทำงานเพื่อจ่ายค่าเล่าเรียน$q$,
    "work_rights_my" = $q$Vietnam မှာ နိုင်ငံတကာကျောင်းသားတွေအတွက် တရားဝင် Part-time အလုပ်လုပ်ခွင့် လောလောဆယ် မရှိသေးဘူး; Internship တွေကို သီးသန့် Work permit မလိုဘဲ ခွင့်ပြုထားပြီး Ministry of Education and Training က တစ်ပတ်လျှင် ၂၀ နာရီအထိ ခွင့်ပြုဖို့ အဆိုပြုထားပေမယ့် မအသက်ဝင်သေးဘူး; ပညာသင်စရိတ်အတွက် အလုပ်လုပ်ဖို့ အားမကိုးပါနဲ့$q$,
    "work_rights_vi" = $q$Hiện nay Việt Nam chưa có quy định chính thức cho phép sinh viên quốc tế làm thêm; Thực tập được phép mà không cần giấy phép lao động riêng, và Bộ Giáo dục và Đào tạo đã đề xuất cho phép tối đa 20 giờ mỗi tuần, nhưng chưa có hiệu lực; Đừng dựa vào việc đi làm để trang trải học phí$q$,
    "work_rights_fil" = $q$Kasalukuyang walang pormal na part time work allowance ang Vietnam para sa mga international student; Pinapayagan ang mga internship nang walang hiwalay na work permit, at nagmungkahi ang Ministry of Education and Training na payagan ang hanggang 20 oras kada linggo, pero hindi pa ito ipinapatupad; Huwag umasa sa pagtatrabaho para pondohan ang pag-aaral mo$q$,
    "work_rights_idn" = $q$Vietnam saat ini tidak memiliki izin kerja paruh waktu resmi bagi mahasiswa internasional; Magang diizinkan tanpa izin kerja terpisah, dan Kementerian Pendidikan dan Pelatihan telah mengusulkan izin hingga 20 jam per minggu, tetapi belum berlaku; Jangan mengandalkan bekerja untuk membiayai studi Anda$q$
  WHERE slug = $q$vietnam$q$ AND work_rights = $q$Vietnam currently has no formal part time work allowance for international students. Internships are permitted without a separate work permit, and the Ministry of Education and Training has proposed allowing up to 20 hours a week, but this is not yet in force. Do not plan on working to fund your studies.$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'vietnam: work rights not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Work rights saved for 22 countries in 5 languages.';
END $$;

-- Check (optional): should return 22.
SELECT count(*) AS countries_with_all_five FROM countries
WHERE work_rights_th IS NOT NULL AND work_rights_my IS NOT NULL AND work_rights_vi IS NOT NULL
  AND work_rights_fil IS NOT NULL AND work_rights_idn IS NOT NULL;
