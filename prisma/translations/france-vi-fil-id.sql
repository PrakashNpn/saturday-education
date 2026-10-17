-- Vietnamese, Filipino and Indonesian content for France.
-- Writes ONLY the new *_vi, *_fil, *_idn columns. English and Thai/Myanmar columns are never touched.
-- All-or-nothing: one DO block, so if any row is not matched exactly once the whole
-- script errors and nothing is saved. Safe to re-run (it overwrites the same columns).
-- Child rows are matched by country AND the exact English text, so a row that
-- was edited in the admin panel is reported instead of silently overwritten.
-- Run in the Supabase SQL editor.

DO $$
DECLARE n integer;
BEGIN
  UPDATE countries SET
    "tagline_vi" = $q$Grandes Écoles và con đường ở lại làm việc$q$,
    "overview_vi" = $q$Pháp là điểm đến du học hàng đầu thế giới không nói tiếng Anh, đón gần 445.000 sinh viên quốc tế tại hơn 3.500 cơ sở công lập và tư thục, từ các trường đại học nghiên cứu đến các trường Grandes Écoles chuyên ngành về kỹ thuật, kinh doanh và nghệ thuật. Ứng viên ngoài EU nộp hồ sơ qua Campus France, một nền tảng quốc gia duy nhất điều phối tuyển sinh tại hầu hết các cơ sở và, với nhiều quốc gia, là bước bắt buộc trước khi được cấp visa du học. Từ năm học 2026/2027, sinh viên ngoài EU tại các trường đại học công lập trả học phí phân biệt khoảng EUR 2,895 mỗi năm cho bậc cử nhân và EUR 3,941 cho bậc thạc sĩ, vẫn thấp hơn nhiều so với Anh hoặc Mỹ, trong khi các trường kinh doanh và kỹ thuật tư thục thu cao hơn đáng kể. Sau khi hoàn thành bằng từ bậc cử nhân trở lên, sinh viên tốt nghiệp có thể xin Autorisation Provisoire de Séjour, giấy phép một năm để tìm việc hoặc khởi nghiệp tại Pháp.$q$,
    "tagline_fil" = $q$Mga Grandes Écoles at landas para manatili at magtrabaho$q$,
    "overview_fil" = $q$Ang France ang nangungunang non-English-speaking na destinasyon sa pag-aaral sa mundo, na may halos 445,000 international student sa mahigit 3,500 pampubliko at pribadong institusyon, mula sa mga research university hanggang sa mga specialist na Grandes Écoles sa engineering, business, at sining. Nag-a-apply ang mga non-EU applicant sa pamamagitan ng Campus France, isang pambansang platform na nag-uugnay ng admission sa karamihan ng institusyon at, para sa maraming bansa, ay kinakailangang hakbang bago mabigyan ng student visa. Simula sa 2026/2027 academic year, nagbabayad ang mga non-EU student sa mga pampublikong university ng differentiated na tuition na humigit-kumulang EUR 2,895 kada taon para sa bachelor's degree at EUR 3,941 para sa master's, mas mababa pa rin nang malaki kaysa sa UK o US, habang mas mataas nang malaki ang singil ng mga pribadong business at engineering school. Pagkatapos makumpleto ang degree sa Bachelor's level o mas mataas, puwedeng mag-apply ang mga nagtapos ng Autorisation Provisoire de Séjour, isang isang-taong permit para maghanap ng trabaho o magsimula ng negosyo sa France.$q$,
    "tagline_idn" = $q$Grandes Écoles dan jalur untuk tinggal dan bekerja$q$,
    "overview_idn" = $q$Prancis adalah destinasi studi non-berbahasa Inggris terkemuka di dunia, menampung hampir 445.000 mahasiswa internasional di lebih dari 3.500 institusi negeri dan swasta, dari universitas riset hingga Grandes Écoles spesialis di bidang teknik, bisnis, dan seni. Pelamar non-UE mendaftar melalui Campus France, platform nasional tunggal yang mengoordinasikan penerimaan di sebagian besar institusi dan, untuk banyak negara, merupakan langkah wajib sebelum visa pelajar dapat diterbitkan. Mulai tahun akademik 2026/2027, mahasiswa non-UE di universitas negeri membayar biaya kuliah diferensial sekitar EUR 2,895 per tahun untuk sarjana dan EUR 3,941 untuk magister, masih jauh di bawah Inggris atau AS, sementara sekolah bisnis dan teknik swasta mengenakan biaya jauh lebih tinggi. Setelah menyelesaikan gelar tingkat Sarjana atau lebih tinggi, lulusan dapat mengajukan Autorisation Provisoire de Séjour, izin satu tahun untuk mencari kerja atau memulai bisnis di Prancis.$q$
  WHERE slug = $q$france$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Grandes Écoles song hành cùng các trường đại học công lập$q$,
    "description_vi" = $q$Hệ thống giáo dục đại học của Pháp vận hành các trường đại học nghiên cứu công lập song song với các trường Grandes Écoles chuyên ngành về kỹ thuật, kinh doanh và nghệ thuật, những cơ sở như HEC Paris và các khuôn viên École Centrale và Polytechnique có tầm ảnh hưởng toàn cầu trong lĩnh vực của mình.$q$,
    "title_fil" = $q$Mga Grandes Écoles kasabay ng mga pampublikong university$q$,
    "description_fil" = $q$Pinatatakbo ng sistema ng higher education ng France ang mga pampublikong research university kasabay ng mga specialist na Grandes Écoles sa engineering, business, at sining, mga institusyong gaya ng HEC Paris at ng iba't ibang campus ng École Centrale at Polytechnique na may pandaigdigang bigat sa kanilang larangan.$q$,
    "title_idn" = $q$Grandes Écoles berdampingan dengan universitas negeri$q$,
    "description_idn" = $q$Sistem pendidikan tinggi Prancis menjalankan universitas riset negeri secara paralel dengan Grandes Écoles spesialis di bidang teknik, bisnis, dan seni, institusi seperti HEC Paris dan berbagai kampus École Centrale dan Polytechnique yang memiliki bobot global di bidangnya.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 1 AND title = $q$Grandes Écoles Alongside Public Universities$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Học phí thấp tại các trường đại học công lập$q$,
    "description_vi" = $q$Từ 2026/2027, sinh viên ngoài EU tại các trường đại học công lập trả mức phí chuẩn khoảng EUR 2,895 mỗi năm cho bậc cử nhân và EUR 3,941 cho bậc thạc sĩ, chỉ bằng một phần nhỏ so với các chương trình tương đương ở Anh hoặc Mỹ. Các trường Grandes Écoles và trường kinh doanh thu cao hơn đáng kể.$q$,
    "title_fil" = $q$Mababang tuition sa mga pampublikong university$q$,
    "description_fil" = $q$Simula 2026/2027, nagbabayad ang mga non-EU student sa mga pampublikong university ng karaniwang halagang humigit-kumulang EUR 2,895 kada taon para sa bachelor's degree at EUR 3,941 para sa master's, maliit na bahagi lamang ng mga katumbas na programa sa UK o US. Mas mataas nang malaki ang singil ng mga Grandes Écoles at business school.$q$,
    "title_idn" = $q$Biaya kuliah rendah di universitas negeri$q$,
    "description_idn" = $q$Mulai 2026/2027, mahasiswa non-UE di universitas negeri membayar tarif standar sekitar EUR 2,895 per tahun untuk sarjana dan EUR 3,941 untuk magister, hanya sebagian kecil dari program sebanding di Inggris atau AS. Grandes Écoles dan sekolah bisnis mengenakan biaya jauh lebih tinggi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 2 AND title = $q$Low Tuition at Public Universities$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Một nền tảng duy nhất cho hầu hết hồ sơ$q$,
    "description_vi" = $q$Campus France điều phối hồ sơ tại hầu hết các cơ sở giáo dục Pháp cho sinh viên từ các quốc gia tham gia, thay thế hàng chục hệ thống nộp hồ sơ riêng lẻ bằng một quy trình và một đầu mối chuẩn bị visa.$q$,
    "title_fil" = $q$Iisang platform para sa karamihan ng aplikasyon$q$,
    "description_fil" = $q$Inuugnay ng Campus France ang mga aplikasyon sa karamihan ng institusyon sa France para sa mga estudyante mula sa mga kalahok na bansa, na pumapalit sa dose-dosenang magkakahiwalay na sistema ng aplikasyon ng iisang proseso at iisang contact point sa paghahanda ng visa.$q$,
    "title_idn" = $q$Satu platform untuk sebagian besar pendaftaran$q$,
    "description_idn" = $q$Campus France mengoordinasikan pendaftaran di sebagian besar institusi Prancis bagi mahasiswa dari negara peserta, menggantikan puluhan sistem pendaftaran terpisah dengan satu proses dan satu titik kontak untuk persiapan visa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 3 AND title = $q$A Single Platform for Most Applications$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Một năm để tìm việc sau khi tốt nghiệp$q$,
    "description_vi" = $q$Sinh viên tốt nghiệp từ bậc cử nhân trở lên có thể xin Autorisation Provisoire de Séjour, thường gọi là APS, giấy phép cư trú một năm để tìm việc hoặc khởi nghiệp tại Pháp.$q$,
    "title_fil" = $q$Isang taon para maghanap ng trabaho pagkatapos magtapos$q$,
    "description_fil" = $q$Puwedeng mag-apply ang mga nagtapos ng Bachelor's degree o mas mataas ng Autorisation Provisoire de Séjour, na karaniwang tinatawag na APS, isang isang-taong residence permit para maghanap ng trabaho o magsimula ng negosyo sa France.$q$,
    "title_idn" = $q$Satu tahun untuk mencari kerja setelah lulus$q$,
    "description_idn" = $q$Lulusan tingkat Sarjana atau lebih tinggi dapat mengajukan Autorisation Provisoire de Séjour, yang biasa dikenal sebagai APS, izin tinggal satu tahun untuk mencari pekerjaan atau memulai bisnis di Prancis.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 4 AND title = $q$A Year to Find Work After Graduating$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Đăng ký với Campus France và chọn chương trình$q$,
    "description_vi" = $q$Hầu hết ứng viên ngoài EU trước tiên tạo tài khoản Campus France, gọi là Études en France ở các quốc gia tham gia, để tìm hiểu chương trình và bắt đầu song song quy trình nộp hồ sơ và xin visa.$q$,
    "title_fil" = $q$Magparehistro sa Campus France at piliin ang programa mo$q$,
    "description_fil" = $q$Karamihan ng non-EU applicant ay unang gumagawa ng Campus France account, na tinatawag na Études en France sa mga kalahok na bansa, para saliksikin ang mga programa at sabay na simulan ang aplikasyon at proseso ng visa.$q$,
    "title_idn" = $q$Daftar ke Campus France dan pilih program Anda$q$,
    "description_idn" = $q$Sebagian besar pelamar non-UE pertama-tama membuat akun Campus France, bernama Études en France di negara peserta, untuk meneliti program dan memulai proses pendaftaran dan visa secara paralel.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND step_number = 1 AND title = $q$Register with Campus France and choose your programme$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ vào các cơ sở bạn chọn$q$,
    "description_vi" = $q$Nộp bảng điểm, kết quả thi ngôn ngữ và, với nhiều chương trình, một thư giới thiệu bản thân qua Campus France hoặc trực tiếp cho các trường Grandes Écoles và trường kinh doanh tự tổ chức tuyển sinh.$q$,
    "title_fil" = $q$Mag-apply sa mga napili mong institusyon$q$,
    "description_fil" = $q$Isumite ang transcript, resulta ng language test, at para sa maraming programa, personal statement sa pamamagitan ng Campus France o direkta sa mga Grandes Écoles at business school na may sarili nilang admission.$q$,
    "title_idn" = $q$Daftar ke institusi pilihan Anda$q$,
    "description_idn" = $q$Kirim transkrip, hasil tes bahasa, dan untuk banyak program, pernyataan pribadi melalui Campus France atau langsung ke Grandes Écoles dan sekolah bisnis yang menjalankan penerimaan sendiri.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND step_number = 2 AND title = $q$Apply to your chosen institutions$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chuẩn bị tài chính và xin visa VLS-TS$q$,
    "description_vi" = $q$Chứng minh tài chính ít nhất EUR 877.50 mỗi tháng và xin visa du học dài hạn VLS-TS tại lãnh sự quán Pháp. Việc xử lý theo hồ sơ Campus France của bạn, vì vậy hãy cập nhật cả hai.$q$,
    "title_fil" = $q$Ihanda ang pondo at mag-apply para sa VLS-TS visa$q$,
    "description_fil" = $q$Ipakita ang patunay ng hindi bababa sa EUR 877.50 kada buwan na pondo at mag-apply para sa VLS-TS long-stay student visa sa French consulate. Sumusunod ang pagproseso sa Campus France file mo, kaya panatilihing updated ang pareho.$q$,
    "title_idn" = $q$Siapkan keuangan dan ajukan visa VLS-TS$q$,
    "description_idn" = $q$Tunjukkan bukti dana minimal EUR 877.50 per bulan dan ajukan visa pelajar jangka panjang VLS-TS di konsulat Prancis. Pemrosesan mengikuti berkas Campus France Anda, jadi jaga keduanya tetap terbaru.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND step_number = 3 AND title = $q$Prepare your finances and apply for a VLS-TS visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và xác nhận visa$q$,
    "description_vi" = $q$Trong vòng ba tháng sau khi đến, hãy xác nhận VLS-TS trực tuyến qua cổng thông tin di trú của Pháp, đây là giấy phép cư trú của bạn trong năm học đầu tiên.$q$,
    "title_fil" = $q$Dumating at i-validate ang visa mo$q$,
    "description_fil" = $q$Sa loob ng tatlong buwan mula pagdating, i-validate online ang VLS-TS mo sa French immigration portal, na nagsisilbing residence permit mo sa unang taon ng pag-aaral.$q$,
    "title_idn" = $q$Tiba dan validasi visa Anda$q$,
    "description_idn" = $q$Dalam tiga bulan setelah tiba, validasi VLS-TS Anda secara online melalui portal imigrasi Prancis, yang berfungsi sebagai izin tinggal Anda untuk tahun pertama studi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND step_number = 4 AND title = $q$Arrive and validate your visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần nói tiếng Pháp để học ở Pháp không?$q$,
    "answer_vi" = $q$Không phải với mọi chương trình. Ngày càng nhiều chương trình thạc sĩ và Grandes Écoles được giảng dạy hoàn toàn bằng tiếng Anh, đặc biệt trong kinh doanh và kỹ thuật, dù hầu hết các chương trình cử nhân tại các trường đại học công lập vẫn bằng tiếng Pháp.$q$,
    "question_fil" = $q$Kailangan ko bang magsalita ng French para mag-aral sa France?$q$,
    "answer_fil" = $q$Hindi para sa bawat programa. Malaki at dumaraming bilang ng Master's degree at programa ng Grandes Écoles ang itinuturo nang buo sa Ingles, lalo na sa business at engineering, bagama't nananatiling French ang karamihan ng bachelor's degree sa mga pampublikong university.$q$,
    "question_idn" = $q$Apakah saya harus bisa berbahasa Prancis untuk kuliah di Prancis?$q$,
    "answer_idn" = $q$Tidak untuk setiap program. Semakin banyak gelar magister dan program Grandes Écoles diajarkan sepenuhnya dalam bahasa Inggris, terutama di bidang bisnis dan teknik, meskipun sebagian besar gelar sarjana di universitas negeri tetap dalam bahasa Prancis.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 1 AND question = $q$Do I need to speak French to study in France?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Du học Pháp tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Từ 2026/2027, sinh viên ngoài EU tại các trường đại học công lập trả khoảng EUR 2,895 mỗi năm cho bậc cử nhân và EUR 3,941 cho bậc thạc sĩ. Các trường Grandes Écoles và trường kinh doanh tư thục thu cao hơn đáng kể, thường EUR 10,000 đến EUR 25,000 mỗi năm.$q$,
    "question_fil" = $q$Magkano ang gastos sa pag-aaral sa France?$q$,
    "answer_fil" = $q$Simula 2026/2027, nagbabayad ang mga non-EU student sa mga pampublikong university ng humigit-kumulang EUR 2,895 kada taon para sa bachelor's degree at EUR 3,941 para sa master's. Mas mataas nang malaki ang singil ng mga Grandes Écoles at pribadong business school, madalas EUR 10,000 hanggang EUR 25,000 kada taon.$q$,
    "question_idn" = $q$Berapa biaya kuliah di Prancis?$q$,
    "answer_idn" = $q$Mulai 2026/2027, mahasiswa non-UE di universitas negeri membayar sekitar EUR 2,895 per tahun untuk sarjana dan EUR 3,941 untuk magister. Grandes Écoles dan sekolah bisnis swasta mengenakan biaya jauh lebih tinggi, sering EUR 10,000 hingga EUR 25,000 per tahun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 2 AND question = $q$How much does it cost to study in France?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Campus France là gì?$q$,
    "answer_vi" = $q$Campus France là nền tảng quốc gia điều phối việc du học Pháp cho sinh viên quốc tế, từ tìm hiểu chương trình đến chuẩn bị hồ sơ visa. Ở nhiều quốc gia, đây là bước đầu tiên bắt buộc trước khi nộp hồ sơ vào các trường đại học Pháp.$q$,
    "question_fil" = $q$Ano ang Campus France?$q$,
    "answer_fil" = $q$Ang Campus France ay ang pambansang platform na nag-uugnay ng pag-aaral sa France para sa mga international student, mula sa pagsasaliksik ng mga programa hanggang sa paghahanda ng visa file mo. Sa maraming bansa, ito ang mandatoryong unang hakbang bago mag-apply sa mga university sa France.$q$,
    "question_idn" = $q$Apa itu Campus France?$q$,
    "answer_idn" = $q$Campus France adalah platform nasional yang mengoordinasikan studi di Prancis bagi mahasiswa internasional, dari meneliti program hingga menyiapkan berkas visa Anda. Di banyak negara, ini adalah langkah pertama wajib sebelum mendaftar ke universitas Prancis.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 3 AND question = $q$What is Campus France?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Pháp không?$q$,
    "answer_vi" = $q$Có. Sinh viên quốc tế được làm tối đa 964 giờ mỗi năm, trung bình khoảng 20 giờ mỗi tuần, với giấy phép cư trú sinh viên hợp lệ.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa France?$q$,
    "answer_fil" = $q$Oo. Puwedeng magtrabaho ang mga international student nang hanggang 964 oras kada taon, humigit-kumulang 20 oras kada linggo sa average, gamit ang balidong student residence permit.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Prancis?$q$,
    "answer_idn" = $q$Bisa. Mahasiswa internasional boleh bekerja hingga 964 jam per tahun, rata-rata sekitar 20 jam per minggu, dengan izin tinggal pelajar yang berlaku.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 4 AND question = $q$Can I work while studying in France?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại Pháp sau khi tốt nghiệp không?$q$,
    "answer_vi" = $q$Có. Sinh viên tốt nghiệp từ bậc cử nhân trở lên có thể xin Autorisation Provisoire de Séjour, giấy phép một năm để tìm việc hoặc khởi nghiệp tại Pháp.$q$,
    "question_fil" = $q$Puwede ba akong manatili sa France pagkatapos magtapos?$q$,
    "answer_fil" = $q$Oo. Puwedeng mag-apply ang mga nagtapos ng Bachelor's degree o mas mataas ng Autorisation Provisoire de Séjour, isang isang-taong permit para maghanap ng trabaho o magsimula ng negosyo sa France.$q$,
    "question_idn" = $q$Bisakah saya tinggal di Prancis setelah lulus?$q$,
    "answer_idn" = $q$Bisa. Lulusan tingkat Sarjana atau lebih tinggi dapat mengajukan Autorisation Provisoire de Séjour, izin satu tahun untuk mencari kerja atau memulai bisnis di Prancis.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$france$q$)
    AND "order" = 5 AND question = $q$Can I stay in France after I graduate?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'France faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'France: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$france$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$france$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$france$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
