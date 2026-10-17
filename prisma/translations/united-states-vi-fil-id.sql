-- Vietnamese, Filipino and Indonesian content for United States.
-- Writes ONLY the new *_vi, *_fil, *_idn columns. English and Thai/Myanmar columns are never touched.
-- All-or-nothing: one DO block, so if any row is not matched exactly once the whole
-- script errors and nothing is saved. Safe to re-run (it overwrites the same columns).
-- Child rows are matched by country + position AND the English text, so a row that
-- was edited in the admin panel is reported instead of silently overwritten.
-- Run in the Supabase SQL editor.

DO $$
DECLARE n integer;
BEGIN
  UPDATE countries SET
    "tagline_vi" = $q$Vùng đất của tầm ảnh hưởng toàn cầu$q$,
    "overview_vi" = $q$Với hơn 4.000 cơ sở giáo dục được công nhận, Mỹ đón nhiều sinh viên quốc tế hơn bất kỳ quốc gia nào khác. Nguồn tài trợ nghiên cứu của Mỹ là vô song, các khuôn viên đa dạng về văn hóa, và các chương trình từ cao đẳng khai phóng đến các trường đại học nghiên cứu Ivy League mang lại sự linh hoạt và kết quả nghề nghiệp vượt trội.$q$,
    "tagline_fil" = $q$Lupain ng pandaigdigang abot$q$,
    "overview_fil" = $q$Tahanan ng mahigit 4,000 akreditadong institusyon, ang USA ang may pinakamaraming international student kumpara sa ibang bansa. Walang kapantay ang pondo nito sa pananaliksik, magkakaiba ang kultura sa mga campus nito, at ang mga programa mula sa liberal arts college hanggang sa mga Ivy League research university ay nag-aalok ng pambihirang flexibility at resulta sa karera.$q$,
    "tagline_idn" = $q$Negeri dengan jangkauan global$q$,
    "overview_idn" = $q$Rumah bagi lebih dari 4.000 institusi terakreditasi, Amerika Serikat menampung lebih banyak mahasiswa internasional daripada negara mana pun. Dana risetnya tiada tanding, kampusnya beragam secara budaya, dan program mulai dari liberal arts college hingga universitas riset Ivy League menawarkan fleksibilitas dan hasil karier yang luar biasa.$q$
  WHERE slug = $q$united-states$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Sự linh hoạt học thuật vô song$q$,
    "description_vi" = $q$Triết lý giáo dục khai phóng cho phép bạn khám phá nhiều lĩnh vực trước khi chọn ngành chính. Bạn có thể đổi hướng mà không phải bắt đầu lại từ đầu.$q$,
    "title_fil" = $q$Walang kapantay na akademikong flexibility$q$,
    "description_fil" = $q$Pinapayagan ka ng liberal arts na pilosopiya na tuklasin ang iba't ibang disiplina bago pumili ng major. Puwede kang magpalit ng landas nang hindi nagsisimula ulit.$q$,
    "title_idn" = $q$Fleksibilitas akademik tiada tanding$q$,
    "description_idn" = $q$Filosofi liberal arts memungkinkan Anda menjelajahi berbagai disiplin sebelum menentukan jurusan utama. Ganti arah tanpa harus mulai dari nol.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND "order" = 1 AND title = $q$Unmatched Academic Flexibility$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Cường quốc nghiên cứu và đổi mới$q$,
    "description_vi" = $q$Hơn 75 tỷ USD tài trợ nghiên cứu đại học mỗi năm. MIT, Stanford và Harvard dẫn đầu bảng xếp hạng toàn cầu trong các ngành STEM.$q$,
    "title_fil" = $q$Sentro ng pananaliksik at inobasyon$q$,
    "description_fil" = $q$Mahigit USD 75 bilyon na pondo sa pananaliksik ng mga university kada taon. Nangunguna ang MIT, Stanford, at Harvard sa pandaigdigang ranking sa mga larangan ng STEM.$q$,
    "title_idn" = $q$Pusat riset dan inovasi$q$,
    "description_idn" = $q$Lebih dari USD 75 miliar pendanaan riset universitas setiap tahun. MIT, Stanford, dan Harvard memimpin peringkat global di berbagai bidang STEM.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND "order" = 2 AND title = $q$Research & Innovation Powerhouse$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$OPT và gia hạn STEM$q$,
    "description_vi" = $q$Làm việc tại Mỹ tới 3 năm sau khi tốt nghiệp các ngành STEM, một con đường trực tiếp đến sự nghiệp tại Mỹ và bảo lãnh H-1B.$q$,
    "title_fil" = $q$OPT at STEM Extension$q$,
    "description_fil" = $q$Magtrabaho sa US nang hanggang 3 taon pagkatapos magtapos sa mga larangan ng STEM, isang direktang landas patungo sa karera sa US at H-1B sponsorship.$q$,
    "title_idn" = $q$OPT dan perpanjangan STEM$q$,
    "description_idn" = $q$Bekerja di AS hingga 3 tahun setelah lulus di bidang STEM, jalur langsung menuju karier di AS dan sponsor H-1B.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND "order" = 3 AND title = $q$OPT & STEM Extension$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Các bài thi chuẩn hóa$q$,
    "description_vi" = $q$Thi SAT/ACT (bậc đại học) hoặc GRE/GMAT (bậc sau đại học), cùng TOEFL/IELTS để chứng minh trình độ tiếng Anh.$q$,
    "title_fil" = $q$Standardized tests$q$,
    "description_fil" = $q$Kunin ang SAT/ACT (undergraduate) o GRE/GMAT (graduate), kasama ang TOEFL/IELTS bilang patunay ng English proficiency.$q$,
    "title_idn" = $q$Tes standar$q$,
    "description_idn" = $q$Ikuti SAT/ACT (sarjana) atau GRE/GMAT (pascasarjana), ditambah TOEFL/IELTS untuk bukti kemampuan bahasa Inggris.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND step_number = 1 AND title = $q$Standardized Tests$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ vào các trường đại học$q$,
    "description_vi" = $q$Nộp hồ sơ qua Common App (bậc đại học) hoặc cổng tuyển sinh trực tiếp của từng trường. Kèm bài luận, bảng điểm và thư giới thiệu.$q$,
    "title_fil" = $q$Mag-apply sa mga university$q$,
    "description_fil" = $q$Isumite ang mga aplikasyon sa pamamagitan ng Common App (undergraduate) o direktang portal ng bawat university. Isama ang mga essay, transcript, at recommendation.$q$,
    "title_idn" = $q$Daftar ke universitas$q$,
    "description_idn" = $q$Kirim aplikasi melalui Common App (sarjana) atau portal langsung universitas. Sertakan esai, transkrip, dan surat rekomendasi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND step_number = 2 AND title = $q$Apply to Universities$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhận mẫu I-20$q$,
    "description_vi" = $q$Sau khi được nhận và nộp giấy tờ tài chính, trường sẽ cấp mẫu I-20, giấy tờ cần thiết để xin visa F-1 của bạn.$q$,
    "title_fil" = $q$Kunin ang I-20$q$,
    "description_fil" = $q$Pagkatapos ng acceptance at pagsusumite ng financial documentation, ibibigay ng university ang Form I-20, na kailangan para sa F-1 visa application mo.$q$,
    "title_idn" = $q$Terima I-20$q$,
    "description_idn" = $q$Setelah diterima dan menyerahkan dokumen keuangan, universitas menerbitkan Form I-20, yang diperlukan untuk pengajuan visa F-1 Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND step_number = 3 AND title = $q$Receive I-20$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Phỏng vấn visa F-1$q$,
    "description_vi" = $q$Đóng phí SEVIS, đặt lịch phỏng vấn tại lãnh sự quán và có thể nhập cảnh sớm tối đa 30 ngày trước khi chương trình bắt đầu.$q$,
    "title_fil" = $q$F-1 Visa Interview$q$,
    "description_fil" = $q$Bayaran ang SEVIS fee, mag-schedule ng interview sa konsulado, at puwedeng bumiyahe nang hanggang 30 araw bago magsimula ang programa.$q$,
    "title_idn" = $q$Wawancara visa F-1$q$,
    "description_idn" = $q$Bayar biaya SEVIS, jadwalkan wawancara di konsulat, dan berangkat paling cepat 30 hari sebelum program dimulai.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND step_number = 4 AND title = $q$F-1 Visa Interview$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$OPT là gì và tôi có thể ở lại Mỹ bao lâu sau khi tốt nghiệp?$q$,
    "answer_vi" = $q$Optional Practical Training (OPT) cho phép bạn làm việc trong lĩnh vực liên quan đến ngành học trong 12 tháng sau khi tốt nghiệp. Sinh viên tốt nghiệp ngành STEM có thể xin gia hạn thêm 24 tháng, tổng cộng có tới 3 năm kinh nghiệm làm việc tại Mỹ.$q$,
    "question_fil" = $q$Ano ang OPT at gaano katagal ako puwedeng manatili sa US pagkatapos magtapos?$q$,
    "answer_fil" = $q$Pinapayagan ka ng Optional Practical Training (OPT) na magtrabaho sa larangang kaugnay ng degree mo sa loob ng 12 buwan pagkatapos magtapos. Puwedeng mag-apply ang mga nagtapos ng STEM para sa 24-buwang extension, kaya aabot hanggang 3 taon ang karanasan sa trabaho sa US.$q$,
    "question_idn" = $q$Apa itu OPT dan berapa lama saya bisa tinggal di AS setelah lulus?$q$,
    "answer_idn" = $q$Optional Practical Training (OPT) memungkinkan Anda bekerja di bidang yang berkaitan dengan gelar Anda selama 12 bulan setelah lulus. Lulusan STEM dapat mengajukan perpanjangan 24 bulan, sehingga total hingga 3 tahun pengalaman kerja di AS.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND "order" = 1 AND question = $q$What is OPT and how long can I stay in the US after graduating?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần SAT/ACT để được nhận vào đại học Mỹ không?$q$,
    "answer_vi" = $q$Hầu hết các trường đại học Mỹ đã áp dụng chính sách không bắt buộc nộp điểm thi, nhưng các trường cạnh tranh cao vẫn coi trọng điểm số tốt. Với bậc sau đại học, thường yêu cầu điểm GRE hoặc GMAT.$q$,
    "question_fil" = $q$Kailangan ko ba ng SAT/ACT para makapasok sa mga university sa US?$q$,
    "answer_fil" = $q$Karamihan ng mga university sa US ay nagpatupad na ng test-optional na patakaran, pero binibigyang-halaga pa rin ng mga mapagkumpitensyang institusyon ang mataas na score. Para sa graduate programs, karaniwang kailangan ang GRE o GMAT score.$q$,
    "question_idn" = $q$Apakah saya perlu SAT/ACT untuk masuk universitas di AS?$q$,
    "answer_idn" = $q$Sebagian besar universitas di AS telah menerapkan kebijakan test-optional, tetapi institusi yang kompetitif tetap memberi bobot pada skor yang kuat. Untuk program pascasarjana, skor GRE atau GMAT biasanya diwajibkan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND "order" = 2 AND question = $q$Do I need SAT/ACT for US university admission?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Du học Mỹ tốn kém đến mức nào?$q$,
    "answer_vi" = $q$Học phí dao động từ USD 35,000 đến USD 65,000/năm tại các trường đại học tư, dù nhiều trường có hỗ trợ tài chính theo nhu cầu khá hào phóng. Chi phí sinh hoạt từ USD 12,000 (các thành phố nhỏ hơn) đến hơn USD 22,000 (New York, San Francisco).$q$,
    "question_fil" = $q$Gaano kamahal ang mag-aral sa US?$q$,
    "answer_fil" = $q$Nasa USD 35,000 hanggang USD 65,000/taon ang tuition sa mga pribadong university, bagama't marami ang nag-aalok ng malaking need-based aid. Nag-iiba ang gastos sa pamumuhay mula USD 12,000 (mas maliliit na lungsod) hanggang USD 22,000+ (New York, San Francisco).$q$,
    "question_idn" = $q$Seberapa mahal kuliah di AS?$q$,
    "answer_idn" = $q$Biaya kuliah berkisar dari USD 35,000 hingga USD 65,000/tahun di universitas swasta, meskipun banyak yang menawarkan bantuan keuangan berbasis kebutuhan yang besar. Biaya hidup bervariasi dari USD 12,000 (kota kecil) hingga USD 22,000+ (New York, San Francisco).$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND "order" = 3 AND question = $q$How expensive is it to study in the US?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có được làm việc ngoài khuôn viên khi giữ visa F-1 không?$q$,
    "answer_vi" = $q$Làm việc ngoài khuôn viên trong năm học nhìn chung không được phép, trừ khi được cho phép qua CPT hoặc trường hợp khó khăn kinh tế. Được làm việc trong khuôn viên tối đa 20 giờ mỗi tuần.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho sa labas ng campus habang may F-1 visa?$q$,
    "answer_fil" = $q$Karaniwang hindi pinapayagan ang trabaho sa labas ng campus sa panahon ng akademikong taon maliban kung pinahintulutan sa pamamagitan ng CPT o economic hardship. Pinapayagan ang trabaho sa loob ng campus nang hanggang 20 oras kada linggo.$q$,
    "question_idn" = $q$Bisakah saya bekerja di luar kampus dengan visa F-1?$q$,
    "answer_idn" = $q$Bekerja di luar kampus selama tahun akademik umumnya tidak diizinkan kecuali dengan otorisasi melalui CPT atau kesulitan ekonomi. Pekerjaan di dalam kampus hingga 20 jam per minggu diperbolehkan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-states$q$)
    AND "order" = 4 AND question = $q$Can I work off-campus during my F-1 visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United States faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'United States: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 3, 4, 4;
END $$;

-- Check (optional): every count below should be 3/4/4.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$united-states$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$united-states$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$united-states$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
