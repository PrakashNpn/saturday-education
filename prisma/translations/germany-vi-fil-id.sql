-- Vietnamese, Filipino and Indonesian content for Germany.
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
    "tagline_vi" = $q$Kỹ thuật xuất sắc đi cùng chi phí hợp lý$q$,
    "overview_vi" = $q$Đức là một trong những điểm đến du học hàng đầu thế giới, với hơn 400 cơ sở giáo dục đại học và hơn 400.000 sinh viên quốc tế. Nổi tiếng về kỹ thuật, công nghệ và kinh doanh, Đức cung cấp nền giáo dục miễn học phí hoặc chi phí thấp tại các trường đại học công lập, cùng ngày càng nhiều chương trình giảng dạy bằng tiếng Anh tại các trường tư. Với nền kinh tế mạnh, visa tìm việc 18 tháng và cho phép làm 120 ngày mỗi năm trong thời gian học, Đức mang lại giá trị vượt trội cho những sinh viên quốc tế đầy tham vọng.$q$,
    "tagline_fil" = $q$Mahusay na engineering na abot-kaya$q$,
    "overview_fil" = $q$Ang Germany ay isa sa mga nangungunang destinasyon sa pag-aaral sa mundo, tahanan ng mahigit 400 institusyon ng mas mataas na edukasyon at mahigit 400,000 international student. Kilala sa engineering, technology, at business, nag-aalok ang Germany ng libre o mababang gastos na edukasyon sa mga pampublikong university at ng dumaraming English-taught na programa sa mga pribadong institusyon. Dahil sa matatag na ekonomiya, 18-buwang Job Seeker Visa, at 120 araw na pinapayagang trabaho kada taon habang nag-aaral, walang kapantay ang halaga ng Germany para sa mga international student na may malalaking pangarap.$q$,
    "tagline_idn" = $q$Keunggulan teknik dengan biaya terjangkau$q$,
    "overview_idn" = $q$Jerman adalah salah satu destinasi studi terbaik di dunia, rumah bagi lebih dari 400 institusi pendidikan tinggi dan lebih dari 400.000 mahasiswa internasional. Terkenal di bidang teknik, teknologi, dan bisnis, Jerman menawarkan pendidikan bebas biaya kuliah atau berbiaya rendah di universitas negeri dan semakin banyak program berbahasa Inggris di institusi swasta. Dengan ekonomi yang kuat, Job Seeker Visa 18 bulan, dan izin kerja 120 hari per tahun selama studi, Jerman memberikan nilai yang tak tertandingi bagi mahasiswa internasional yang berambisi.$q$
  WHERE slug = $q$germany$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Học phí thấp hoặc miễn phí$q$,
    "description_vi" = $q$Các trường đại học công lập không thu học phí đối với hầu hết các chương trình. Ngay cả các trường đại học tư ở Đức cũng rẻ hơn đáng kể so với Anh hoặc Mỹ, với mức phí hằng năm thường từ €5,000-€20,000.$q$,
    "title_fil" = $q$Mababa o walang tuition fee$q$,
    "description_fil" = $q$Walang sinisingil na tuition ang mga pampublikong university sa karamihan ng programa. Kahit ang mga pribadong university sa Germany ay mas mura nang malaki kaysa sa UK o USA, na karaniwang nasa €5,000-€20,000 ang taunang bayarin.$q$,
    "title_idn" = $q$Biaya kuliah rendah atau gratis$q$,
    "description_idn" = $q$Universitas negeri tidak memungut biaya kuliah untuk sebagian besar program. Bahkan universitas swasta di Jerman jauh lebih murah daripada di Inggris atau AS, dengan biaya tahunan biasanya antara €5,000-€20,000.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 1 AND title = $q$Low or Zero Tuition Fees$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Kỹ thuật và công nghệ hàng đầu thế giới$q$,
    "description_vi" = $q$Đức đào tạo những kỹ sư đứng sau BMW, Bosch, Siemens và SAP. Bằng kỹ thuật hoặc công nghệ của Đức được công nhận toàn cầu và mở ra cơ hội khắp châu Âu và xa hơn nữa.$q$,
    "title_fil" = $q$Nangungunang engineering at tech sa mundo$q$,
    "description_fil" = $q$Sa Germany nagmumula ang mga engineer sa likod ng BMW, Bosch, Siemens, at SAP. Kinikilala sa buong mundo ang degree sa engineering o tech ng Germany at nagbubukas ito ng pinto sa buong Europa at higit pa.$q$,
    "title_idn" = $q$Teknik dan teknologi terkemuka dunia$q$,
    "description_idn" = $q$Jerman menghasilkan para insinyur di balik BMW, Bosch, Siemens, dan SAP. Gelar teknik atau teknologi Jerman diakui secara global dan membuka pintu di seluruh Eropa dan sekitarnya.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 2 AND title = $q$World-Leading Engineering & Tech$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Visa làm việc sau tốt nghiệp 18 tháng$q$,
    "description_vi" = $q$Sau khi tốt nghiệp, Job Seeker Visa của Đức cho bạn 18 tháng để tìm việc. Với một trong những thị trường việc làm mạnh nhất châu Âu, sinh viên quốc tế tốt nghiệp có lộ trình rõ ràng để làm việc và định cư.$q$,
    "title_fil" = $q$18-buwang Post-Study Work Visa$q$,
    "description_fil" = $q$Pagkatapos magtapos, bibigyan ka ng German Job Seeker Visa ng 18 buwan para maghanap ng trabaho. Dahil sa isa sa pinakamatibay na job market sa Europa, may malinaw na landas sa trabaho at residency ang mga nagtapos na international student.$q$,
    "title_idn" = $q$Visa kerja pascastudi 18 bulan$q$,
    "description_idn" = $q$Setelah lulus, Job Seeker Visa Jerman memberi Anda 18 bulan untuk mencari pekerjaan. Dengan salah satu pasar kerja terkuat di Eropa, lulusan mahasiswa internasional memiliki jalur yang jelas menuju pekerjaan dan residensi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 3 AND title = $q$18-Month Post-Study Work Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Cửa ngõ vào trung tâm châu Âu$q$,
    "description_vi" = $q$Học tại Đức đưa bạn vào trung tâm châu Âu. Di chuyển tự do qua 26 quốc gia Schengen, xây dựng mạng lưới quan hệ khắp châu Âu và tiếp cận một trong những nền kinh tế lớn và ổn định nhất thế giới.$q$,
    "title_fil" = $q$Daan papunta sa gitna ng Europa$q$,
    "description_fil" = $q$Ang pag-aaral sa Germany ay naglalagay sa iyo sa sentro ng Europa. Malayang maglakbay sa 26 na bansang Schengen, bumuo ng pan-European na network, at makinabang sa isa sa pinakamalaki at pinakamatatag na ekonomiya sa mundo.$q$,
    "title_idn" = $q$Gerbang menuju jantung Eropa$q$,
    "description_idn" = $q$Kuliah di Jerman menempatkan Anda di pusat Eropa. Bepergian bebas ke 26 negara Schengen, bangun jaringan pan-Eropa, dan akses salah satu ekonomi terbesar dan paling stabil di dunia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 4 AND title = $q$Central European Gateway$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Tìm hiểu và chọn chương trình$q$,
    "description_vi" = $q$Xác định bạn muốn học trường công lập hay tư thục. Dùng DAAD (daad.de) để tìm các chương trình giảng dạy bằng tiếng Anh. Xác nhận yêu cầu ngôn ngữ: hầu hết các trường tư dạy bằng tiếng Anh, còn hầu hết các trường công dạy bằng tiếng Đức.$q$,
    "title_fil" = $q$Magsaliksik at piliin ang programa mo$q$,
    "description_fil" = $q$Alamin kung pampubliko o pribadong university ang gusto mo. Gamitin ang DAAD (daad.de) para tuklasin ang mga English-taught na programa. Tiyakin ang language requirement: karamihan ng pribadong university ay nagtuturo sa Ingles; karamihan ng pampubliko ay nagtuturo sa German.$q$,
    "title_idn" = $q$Riset dan pilih program Anda$q$,
    "description_idn" = $q$Tentukan apakah Anda ingin universitas negeri atau swasta. Gunakan DAAD (daad.de) untuk menjelajahi program berbahasa Inggris. Pastikan persyaratan bahasa: sebagian besar universitas swasta mengajar dalam bahasa Inggris; sebagian besar universitas negeri mengajar dalam bahasa Jerman.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND step_number = 1 AND title = $q$Research & Choose Your Program$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chuẩn bị và nộp hồ sơ$q$,
    "description_vi" = $q$Chuẩn bị bảng điểm, chứng chỉ tiếng Anh (IELTS/TOEFL), thư động lực và CV. Nộp hồ sơ trực tiếp cho trường hoặc qua uni-assist.de (cổng nộp hồ sơ tập trung mà hầu hết các trường đại học Đức dùng cho thí sinh quốc tế).$q$,
    "title_fil" = $q$Ihanda at isumite ang aplikasyon$q$,
    "description_fil" = $q$Ihanda ang transcript, English proficiency score (IELTS/TOEFL), motivation letter, at CV. Mag-apply nang direkta sa university o sa pamamagitan ng uni-assist.de (ang sentral na application portal na ginagamit ng karamihan ng mga university sa Germany para sa mga international applicant).$q$,
    "title_idn" = $q$Siapkan dan kirim aplikasi$q$,
    "description_idn" = $q$Kumpulkan transkrip, skor kemampuan bahasa Inggris (IELTS/TOEFL), surat motivasi, dan CV. Daftar langsung ke universitas atau melalui uni-assist.de (portal pendaftaran terpusat yang digunakan sebagian besar universitas Jerman untuk pelamar internasional).$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND step_number = 2 AND title = $q$Prepare & Submit Application$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhận thư nhập học và mở tài khoản phong tỏa$q$,
    "description_vi" = $q$Sau khi được nhận, bạn sẽ có thư nhập học chính thức. Hãy mở tài khoản phong tỏa của Đức (Sperrkonto) với số tiền €11,208/năm, yêu cầu bắt buộc của visa du học để chứng minh đủ khả năng tài chính.$q$,
    "title_fil" = $q$Kunin ang Admission Letter at Blocked Account$q$,
    "description_fil" = $q$Kapag natanggap ka, makakakuha ka ng opisyal na admission letter. Magbukas ng German blocked account (Sperrkonto) na may €11,208/taon, isang mandatoryong requirement ng student visa para patunayang sapat ang pondo mo.$q$,
    "title_idn" = $q$Terima surat penerimaan dan buka rekening blokir$q$,
    "description_idn" = $q$Setelah diterima, Anda akan mendapat surat penerimaan resmi. Buka rekening blokir Jerman (Sperrkonto) senilai €11,208/tahun, syarat wajib visa pelajar untuk membuktikan kecukupan dana.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND step_number = 3 AND title = $q$Receive Admission Letter & Block Account$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học và nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ xin Visa Quốc gia Đức (Loại D) tại đại sứ quán hoặc lãnh sự quán Đức ở nước bạn. Mang theo thư nhập học, chứng minh tài khoản phong tỏa, bảo hiểm y tế và hộ chiếu đến buổi hẹn. Thời gian xử lý visa là 4-8 tuần.$q$,
    "title_fil" = $q$Mag-apply para sa Student Visa at mag-enrol$q$,
    "description_fil" = $q$Mag-apply para sa German National Visa (Type D) sa embahada o konsulado ng Germany sa bansa mo. Dalhin sa appointment ang admission letter, patunay ng blocked account, health insurance, at pasaporte. Tumatagal ng 4-8 linggo ang pagproseso ng visa.$q$,
    "title_idn" = $q$Ajukan visa pelajar dan daftar ulang$q$,
    "description_idn" = $q$Ajukan Visa Nasional Jerman (Tipe D) di kedutaan atau konsulat Jerman di negara Anda. Hadiri janji temu dengan membawa surat penerimaan, bukti rekening blokir, asuransi kesehatan, dan paspor. Pemrosesan visa memakan waktu 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND step_number = 4 AND title = $q$Apply for Student Visa & Enroll$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần nói tiếng Đức để học ở Đức không?$q$,
    "answer_vi" = $q$Không nhất thiết. Nhiều trường đại học tư ở Đức, gồm IU International, GISMA, SRH Berlin và các trường khác, có chương trình cử nhân và thạc sĩ giảng dạy hoàn toàn bằng tiếng Anh. Các trường công chủ yếu dạy bằng tiếng Đức, nên thường yêu cầu trình độ B2/C1 cho các chương trình đó.$q$,
    "question_fil" = $q$Kailangan ko bang magsalita ng German para mag-aral sa Germany?$q$,
    "answer_fil" = $q$Hindi naman kailangan. Maraming pribadong university sa Germany, kabilang ang IU International, GISMA, SRH Berlin, at iba pa, ang nag-aalok ng buong English-taught na programa sa bachelor's at master's level. Karaniwang German ang gamit sa mga pampublikong university, kaya kadalasang kailangan ng B2/C1 level para sa mga programang iyon.$q$,
    "question_idn" = $q$Apakah saya harus bisa berbahasa Jerman untuk kuliah di Jerman?$q$,
    "answer_idn" = $q$Tidak harus. Banyak universitas swasta di Jerman, termasuk IU International, GISMA, SRH Berlin, dan lainnya, menawarkan program sarjana dan magister yang sepenuhnya berbahasa Inggris. Universitas negeri umumnya mengajar dalam bahasa Jerman, sehingga biasanya diperlukan level B2/C1 untuk program tersebut.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 1 AND question = $q$Do I need to speak German to study in Germany?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tài khoản phong tỏa là gì và vì sao tôi cần?$q$,
    "answer_vi" = $q$Tài khoản phong tỏa của Đức (Sperrkonto) là loại tài khoản ngân hàng đặc biệt giữ chi phí sinh hoạt một năm của bạn (hiện là €11,208). Bạn chỉ được rút một khoản cố định mỗi tháng. Đại sứ quán Đức yêu cầu chứng minh tài khoản này trước khi cấp visa du học, nhằm bảo đảm bạn tự lo được cho mình mà không cần đi làm.$q$,
    "question_fil" = $q$Ano ang blocked account at bakit ko ito kailangan?$q$,
    "answer_fil" = $q$Ang German blocked account (Sperrkonto) ay espesyal na bank account na nag-iimbak ng gastusin mo sa pamumuhay para sa isang taon (kasalukuyang €11,208). Isang takdang halaga lang kada buwan ang puwede mong i-withdraw. Hinihingi ng embahada ng Germany ang patunay ng account na ito bago magbigay ng student visa dahil ginagarantiya nitong kaya mong suportahan ang sarili mo nang hindi nagtatrabaho.$q$,
    "question_idn" = $q$Apa itu rekening blokir dan mengapa saya membutuhkannya?$q$,
    "answer_idn" = $q$Rekening blokir Jerman (Sperrkonto) adalah rekening bank khusus yang menyimpan biaya hidup Anda selama satu tahun (saat ini €11,208). Anda hanya dapat menarik jumlah tetap setiap bulan. Kedutaan Jerman mewajibkan bukti rekening ini sebelum menerbitkan visa pelajar, karena menjamin Anda dapat membiayai diri sendiri tanpa harus bekerja.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 2 AND question = $q$What is a blocked account and why do I need it?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi được làm bao nhiêu giờ khi đang học ở Đức?$q$,
    "answer_vi" = $q$Sinh viên quốc tế được làm 120 ngày làm việc đầy đủ hoặc 240 nửa ngày mỗi năm (khoảng 20 giờ mỗi tuần trong học kỳ). Làm nhiều hơn cần có sự chấp thuận của Cơ quan Việc làm Liên bang và cơ quan quản lý người nước ngoài tại địa phương.$q$,
    "question_fil" = $q$Ilang oras ako puwedeng magtrabaho habang nag-aaral sa Germany?$q$,
    "answer_fil" = $q$Puwedeng magtrabaho ang mga international student nang 120 buong araw o 240 kalahating araw kada taon (humigit-kumulang 20 oras kada linggo habang may semester). Kung mas marami pa rito, kailangan ng pahintulot ng Federal Employment Agency at ng lokal na foreigners' authority.$q$,
    "question_idn" = $q$Berapa jam saya boleh bekerja selama kuliah di Jerman?$q$,
    "answer_idn" = $q$Mahasiswa internasional dapat bekerja 120 hari penuh atau 240 setengah hari per tahun (sekitar 20 jam per minggu selama semester). Bekerja lebih dari itu memerlukan persetujuan dari Badan Ketenagakerjaan Federal dan otoritas orang asing setempat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 3 AND question = $q$How many hours can I work while studying in Germany?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại Đức sau khi tốt nghiệp để tìm việc không?$q$,
    "answer_vi" = $q$Có. Đức cung cấp Job Seeker Visa 18 tháng sau khi tốt nghiệp, cho phép bạn tìm việc liên quan đến ngành học. Khi tìm được công việc phù hợp với trình độ, bạn có thể chuyển sang giấy phép lao động và cuối cùng xin thường trú.$q$,
    "question_fil" = $q$Puwede ba akong manatili sa Germany pagkatapos magtapos para maghanap ng trabaho?$q$,
    "answer_fil" = $q$Oo. Nag-aalok ang Germany ng 18-buwang Job Seeker Visa pagkatapos magtapos, para makahanap ka ng trabahong kaugnay ng degree mo. Kapag nakahanap ka ng trabahong akma sa kwalipikasyon mo, puwede kang lumipat sa work permit at kalaunan ay mag-apply para sa permanent residency.$q$,
    "question_idn" = $q$Bisakah saya tinggal di Jerman setelah lulus untuk mencari pekerjaan?$q$,
    "answer_idn" = $q$Bisa. Jerman menawarkan Job Seeker Visa 18 bulan setelah lulus, memungkinkan Anda mencari pekerjaan yang berkaitan dengan gelar Anda. Setelah mendapat pekerjaan yang sesuai kualifikasi, Anda dapat beralih ke izin kerja dan akhirnya mengajukan residensi tetap.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 4 AND question = $q$Can I stay in Germany after graduation to find a job?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$DAAD là gì và có thể giúp tôi như thế nào?$q$,
    "answer_vi" = $q$DAAD (Deutscher Akademischer Austauschdienst / Cơ quan Trao đổi Học thuật Đức) là tổ chức chính thức của Đức về hợp tác học thuật quốc tế. Trang web của DAAD (daad.de) liệt kê tất cả các chương trình được công nhận, cơ hội học bổng cho sinh viên quốc tế và yêu cầu tuyển sinh chính thức theo từng quốc gia.$q$,
    "question_fil" = $q$Ano ang DAAD at paano ito makakatulong sa akin?$q$,
    "answer_fil" = $q$Ang DAAD (Deutscher Akademischer Austauschdienst / German Academic Exchange Service) ay opisyal na organisasyon ng Germany para sa internasyonal na akademikong kooperasyon. Nakalista sa website nito (daad.de) ang lahat ng akreditadong programa, mga oportunidad sa scholarship para sa mga international student, at opisyal na admission requirement ayon sa bawat bansa.$q$,
    "question_idn" = $q$Apa itu DAAD dan bagaimana DAAD dapat membantu saya?$q$,
    "answer_idn" = $q$DAAD (Deutscher Akademischer Austauschdienst / Layanan Pertukaran Akademik Jerman) adalah organisasi resmi Jerman untuk kerja sama akademik internasional. Situs webnya (daad.de) memuat semua program terakreditasi, peluang beasiswa untuk mahasiswa internasional, dan persyaratan penerimaan resmi untuk tiap negara.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$germany$q$)
    AND "order" = 5 AND question = $q$What is DAAD and how can it help me?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Germany faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Germany: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$germany$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$germany$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$germany$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
