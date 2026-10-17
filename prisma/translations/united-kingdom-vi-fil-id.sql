-- Vietnamese, Filipino and Indonesian content for United Kingdom.
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
    "tagline_vi" = $q$Bằng cấp đẳng cấp thế giới chỉ trong 3 năm, kèm visa làm việc sau tốt nghiệp$q$,
    "overview_vi" = $q$Vương quốc Anh là một trong những điểm đến du học hàng đầu thế giới, nơi có một số trường đại học lâu đời và danh tiếng nhất hành tinh, trong đó có Oxford, Cambridge, Imperial và London School of Economics. Ngoài nhóm Russell Group tinh hoa, các trường đại học post-92 và cao đẳng chuyên ngành của Anh mang lại giá trị vượt trội cho sinh viên quốc tế, với khuôn viên hiện đại, quan hệ chặt chẽ với doanh nghiệp và đa dạng chương trình về kinh doanh, kỹ thuật, y tế, luật, thiết kế và nghệ thuật sáng tạo. Bằng cấp Anh được nhà tuyển dụng khắp châu Á và toàn thế giới đánh giá cao, và thời gian học ngắn hơn (cử nhân 3 năm, thạc sĩ 1 năm) giúp tổng chi phí thấp hơn so với học tại Mỹ hoặc Canada. Visa Graduate Route, được áp dụng từ năm 2021, cho phép sinh viên quốc tế tốt nghiệp có 2 năm (3 năm đối với tiến sĩ) để làm việc hoặc tìm việc tại Anh sau khi hoàn thành chương trình, một lợi thế nghề nghiệp đáng kể. Các thành phố đa văn hóa của Anh như London, Manchester, Birmingham, Leeds, Edinburgh mang đến môi trường sôi động với cộng đồng sinh viên quốc tế lâu đời.$q$,
    "tagline_fil" = $q$World-class na degree sa loob ng 3 taon, kasama ang post-study work visa$q$,
    "overview_fil" = $q$Ang United Kingdom ay isa sa mga pangunahing destinasyon sa pag-aaral sa mundo, tahanan ng ilan sa pinakamatatanda at pinakarespetadong university sa planeta, kabilang ang Oxford, Cambridge, Imperial, at London School of Economics. Bukod sa elite na Russell Group, nag-aalok din ang mga post-92 university at specialist college ng UK ng napakagandang halaga para sa mga international student, na may modernong campus, matibay na ugnayan sa industriya, at iba't ibang programa sa business, engineering, health, law, design, at creative arts. Lubos na iginagalang ng mga employer sa buong Asya at sa buong mundo ang mga degree sa UK, at dahil mas maikli ang tagal (3 taon sa bachelor's, 1 taon sa master's), mas mababa ang kabuuang gastos kumpara sa pag-aaral sa USA o Canada. Ang Graduate Route visa, na ipinakilala noong 2021, ay nagbibigay sa mga international graduate ng 2 taon (3 para sa mga nagtapos ng PhD) para magtrabaho o maghanap ng trabaho sa UK pagkatapos ng pag-aaral, isang malaking bentahe sa karera. Ang mga magkakaibang multicultural na lungsod ng UK, gaya ng London, Manchester, Birmingham, Leeds, at Edinburgh, ay nag-aalok ng masiglang kapaligiran na may matagal nang komunidad ng mga international student.$q$,
    "tagline_idn" = $q$Gelar kelas dunia dalam 3 tahun, dengan visa kerja pascastudi$q$,
    "overview_idn" = $q$Inggris adalah salah satu destinasi studi terkemuka dunia, rumah bagi beberapa universitas tertua dan paling dihormati di planet ini, termasuk Oxford, Cambridge, Imperial, dan London School of Economics. Selain Russell Group yang elite, universitas post-92 dan college spesialis di Inggris menawarkan nilai luar biasa bagi mahasiswa internasional, dengan kampus modern, hubungan industri yang kuat, dan beragam program di bidang bisnis, teknik, kesehatan, hukum, desain, dan seni kreatif. Gelar Inggris sangat dihormati pemberi kerja di seluruh Asia dan dunia, dan durasi yang lebih singkat (S1 3 tahun, S2 1 tahun) berarti biaya keseluruhan lebih rendah dibandingkan kuliah di AS atau Kanada. Visa Graduate Route, yang diperkenalkan pada 2021, memberi lulusan internasional 2 tahun (3 tahun untuk lulusan PhD) untuk bekerja atau mencari kerja di Inggris setelah menyelesaikan studi, keunggulan karier yang signifikan. Kota-kota Inggris yang beragam dan multikultural, seperti London, Manchester, Birmingham, Leeds, dan Edinburgh, menyediakan lingkungan yang semarak dengan komunitas mahasiswa internasional yang sudah mapan.$q$
  WHERE slug = $q$united-kingdom$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Chương trình ngắn hơn, tổng chi phí thấp hơn$q$,
    "description_vi" = $q$Bằng cử nhân ở Anh kéo dài 3 năm (một số chương trình ở Scotland là 2 năm) và thạc sĩ chỉ 1 năm, tiết kiệm trọn một năm học phí và sinh hoạt phí so với Mỹ, Canada hoặc Úc. Cùng một văn bằng được công nhận quốc tế, nhưng nhanh hơn.$q$,
    "title_fil" = $q$Mas maiikling degree, mas mababang kabuuang gastos$q$,
    "description_fil" = $q$Tumatagal ng 3 taon ang bachelor's degree sa UK (2 taon sa Scotland para sa ilan) at 1 taon lang ang master's, kaya nakakatipid ka ng isang buong taon ng tuition at gastos sa pamumuhay kumpara sa USA, Canada, o Australia. Parehong kinikilalang kredensyal sa buong mundo, pero mas mabilis.$q$,
    "title_idn" = $q$Gelar lebih singkat, total biaya lebih rendah$q$,
    "description_idn" = $q$Gelar sarjana di Inggris memakan waktu 3 tahun (2 tahun di Skotlandia untuk sebagian program) dan magister hanya 1 tahun, menghemat satu tahun penuh biaya kuliah dan biaya hidup dibandingkan AS, Kanada, atau Australia. Kredensial yang sama-sama diakui secara internasional, tetapi lebih cepat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 1 AND title = $q$Shorter Degrees — Lower Total Cost$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Visa làm việc sau tốt nghiệp 2 năm$q$,
    "description_vi" = $q$Visa Graduate Route cho phép sinh viên quốc tế làm việc ở bất kỳ đâu tại Anh trong 2 năm sau khi tốt nghiệp (3 năm với tiến sĩ) mà không cần có sẵn thư mời làm việc, là một trong những quyền làm việc sau tốt nghiệp linh hoạt nhất thế giới.$q$,
    "title_fil" = $q$2-taong Post-Study Work Visa$q$,
    "description_fil" = $q$Pinapayagan ng Graduate Route visa ang mga international student na magtrabaho saanman sa UK nang 2 taon pagkatapos magtapos (3 taon para sa mga nagtapos ng PhD) nang hindi kailangan ng job offer nang maaga, isa sa pinakamaluwag na post-study work rights sa mundo.$q$,
    "title_idn" = $q$Visa kerja pascastudi 2 tahun$q$,
    "description_idn" = $q$Visa Graduate Route memungkinkan mahasiswa internasional bekerja di mana saja di Inggris selama 2 tahun setelah lulus (3 tahun untuk lulusan PhD) tanpa memerlukan tawaran kerja terlebih dahulu, salah satu hak kerja pascastudi paling fleksibel di dunia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 2 AND title = $q$2-Year Post-Study Work Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Đại học đẳng cấp thế giới ở mọi mức ngân sách$q$,
    "description_vi" = $q$Từ các trường đại học nghiên cứu Russell Group đến các trường post-92 hiện đại, định hướng doanh nghiệp và các cao đẳng chuyên ngành, Anh cung cấp bằng cấp được công nhận quốc tế ở mọi mức giá, từ GBP 11,000 đến GBP 38,000 mỗi năm.$q$,
    "title_fil" = $q$Mga world-class na university sa bawat antas ng badyet$q$,
    "description_fil" = $q$Mula sa mga research university ng Russell Group hanggang sa mga makabago at industry-focused na post-92 institution at specialist college, nag-aalok ang UK ng mga degree na kinikilala sa buong mundo sa bawat presyo, mula GBP 11,000 hanggang GBP 38,000 kada taon.$q$,
    "title_idn" = $q$Universitas kelas dunia di setiap tingkat anggaran$q$,
    "description_idn" = $q$Dari universitas riset Russell Group hingga institusi post-92 modern yang berfokus industri dan college spesialis, Inggris menawarkan gelar yang diakui internasional di setiap kisaran harga, dari GBP 11,000 hingga GBP 38,000 per tahun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 3 AND title = $q$World-Class Universities Across All Budget Levels$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Được công nhận toàn cầu và kết quả nghề nghiệp tốt$q$,
    "description_vi" = $q$Bằng cấp Anh được nhà tuyển dụng ở mọi quốc gia công nhận và coi trọng. Mạng lưới chuyên môn mạnh của Anh trong tài chính (London), công nghệ (London, Manchester), y tế (NHS) và các ngành sáng tạo mang lại lợi thế cạnh tranh toàn cầu cho sinh viên tốt nghiệp.$q$,
    "title_fil" = $q$Pandaigdigang pagkilala at magandang resulta sa karera$q$,
    "description_fil" = $q$Kinikilala at iginagalang ng mga employer sa bawat bansa ang mga degree sa UK. Ang matitibay na propesyonal na network ng UK sa finance (London), technology (London, Manchester), health (NHS), at mga creative industry ay nagbibigay sa mga nagtapos ng competitive edge sa buong mundo.$q$,
    "title_idn" = $q$Pengakuan global dan hasil karier yang baik$q$,
    "description_idn" = $q$Gelar Inggris diakui dan dihormati pemberi kerja di setiap negara. Jaringan profesional Inggris yang kuat di bidang keuangan (London), teknologi (London, Manchester), kesehatan (NHS), dan industri kreatif memberi lulusan keunggulan kompetitif secara global.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 4 AND title = $q$Global Recognition & Career Outcomes$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Tìm hiểu và lập danh sách trường$q$,
    "description_vi" = $q$Xác định các trường đại học và chương trình trên UCAS phù hợp với hồ sơ học tập và mục tiêu nghề nghiệp của bạn. Với bậc đại học, nộp hồ sơ qua UCAS (hệ thống nộp hồ sơ tập trung của Anh). Sinh viên sau đại học nộp trực tiếp cho từng trường.$q$,
    "title_fil" = $q$Magsaliksik at gumawa ng shortlist ng mga university$q$,
    "description_fil" = $q$Tukuyin ang mga university at programang nakalista sa UCAS na tugma sa akademikong profile at mga layunin mo sa karera. Para sa undergraduate, gamitin ang UCAS (ang sentralisadong sistema ng aplikasyon sa UK). Direktang nag-a-apply ang mga postgraduate sa bawat university.$q$,
    "title_idn" = $q$Riset dan pilih daftar universitas$q$,
    "description_idn" = $q$Tentukan universitas dan program terdaftar UCAS yang sesuai dengan profil akademik dan tujuan karier Anda. Untuk jenjang sarjana, gunakan UCAS (sistem pendaftaran terpusat di Inggris). Mahasiswa pascasarjana mendaftar langsung ke tiap universitas.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND step_number = 1 AND title = $q$Research and Shortlist Universities$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận thư mời nhập học$q$,
    "description_vi" = $q$Bậc đại học: nộp qua UCAS trước ngày 31 tháng 1 (15 tháng 10 đối với Oxford/Cambridge/ngành y). Sau đại học: nộp trực tiếp cho từng trường, xét tuyển liên tục nên hãy nộp sớm. Bạn sẽ nhận thư mời có điều kiện hoặc không điều kiện trong vòng 4-8 tuần.$q$,
    "title_fil" = $q$Mag-apply at tanggapin ang offer$q$,
    "description_fil" = $q$Undergraduate: mag-apply sa UCAS bago mag-January 31 (October 15 para sa Oxford/Cambridge/medicine). Postgraduate: direktang mag-apply sa bawat university, rolling admissions kaya mag-apply nang maaga. Makakatanggap ng conditional o unconditional offer sa loob ng 4-8 linggo.$q$,
    "title_idn" = $q$Daftar dan terima tawaran$q$,
    "description_idn" = $q$Sarjana: daftar lewat UCAS paling lambat 31 Januari (15 Oktober untuk Oxford/Cambridge/kedokteran). Pascasarjana: daftar langsung ke tiap universitas, penerimaan bergulir sehingga daftarlah lebih awal. Tawaran bersyarat atau tanpa syarat diterima dalam 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND step_number = 2 AND title = $q$Apply and Receive Offer$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chấp nhận thư mời và nhận CAS$q$,
    "description_vi" = $q$Chấp nhận thư mời, đáp ứng các điều kiện (ví dụ kết quả thi, chứng chỉ tiếng Anh), đóng tiền đặt cọc và nhận Confirmation of Acceptance for Studies (CAS), mã tham chiếu duy nhất cần thiết cho hồ sơ xin visa du học.$q$,
    "title_fil" = $q$Tanggapin ang offer at kunin ang CAS$q$,
    "description_fil" = $q$Tanggapin ang offer, tuparin ang anumang kondisyon (hal. resulta ng exam, English test), bayaran ang deposit, at kunin ang Confirmation of Acceptance for Studies (CAS), ang natatanging reference number na kailangan sa Student visa application mo.$q$,
    "title_idn" = $q$Terima tawaran dan dapatkan CAS$q$,
    "description_idn" = $q$Terima tawaran Anda, penuhi syarat apa pun (misalnya hasil ujian, tes bahasa Inggris), bayar deposit, dan dapatkan Confirmation of Acceptance for Studies (CAS), nomor referensi unik yang diperlukan untuk pengajuan visa pelajar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND step_number = 3 AND title = $q$Accept Offer and Receive CAS$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học Anh$q$,
    "description_vi" = $q$Nộp hồ sơ xin visa du học Anh trực tuyến bằng mã CAS, đóng Phụ phí Y tế Nhập cư (IHS), nộp sinh trắc học và cung cấp chứng minh tài chính. Thời gian xử lý khoảng 3 tuần.$q$,
    "title_fil" = $q$Mag-apply para sa UK Student Visa$q$,
    "description_fil" = $q$Mag-apply online para sa UK Student visa gamit ang CAS number mo, bayaran ang Immigration Health Surcharge (IHS), isumite ang biometrics, at magbigay ng patunay ng pondo. Humigit-kumulang 3 linggo ang pagproseso.$q$,
    "title_idn" = $q$Ajukan visa pelajar Inggris$q$,
    "description_idn" = $q$Ajukan visa pelajar Inggris secara online dengan nomor CAS Anda, bayar Immigration Health Surcharge (IHS), serahkan biometrik, dan berikan bukti keuangan. Pemrosesan memakan waktu sekitar 3 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND step_number = 4 AND title = $q$Apply for UK Student Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi cần điểm IELTS bao nhiêu để vào đại học Anh?$q$,
    "answer_vi" = $q$Hầu hết các trường đại học Anh yêu cầu IELTS Academic 6.0-6.5 tổng điểm (không kỹ năng nào dưới 5.5) cho bậc đại học. Bậc sau đại học và ngành luật thường yêu cầu 6.5-7.0. Các chương trình của Russell Group và chuyên ngành có thể yêu cầu cao hơn. PTE, TOEFL và các chứng chỉ Cambridge English được chấp nhận rộng rãi thay thế.$q$,
    "question_fil" = $q$Anong IELTS score ang kailangan ko para sa mga university sa UK?$q$,
    "answer_fil" = $q$Karamihan ng mga university sa UK ay humihingi ng IELTS Academic 6.0-6.5 overall (walang indibidwal na band na mas mababa sa 5.5) para sa undergraduate programme. Karaniwang 6.5-7.0 ang hinihingi sa postgraduate at law programme. Maaaring mas mataas ang hingin ng Russell Group at mga specialist programme. Malawakang tinatanggap na alternatibo ang PTE, TOEFL, at mga kwalipikasyon ng Cambridge English.$q$,
    "question_idn" = $q$Berapa skor IELTS yang saya butuhkan untuk universitas di Inggris?$q$,
    "answer_idn" = $q$Sebagian besar universitas Inggris mensyaratkan IELTS Academic 6.0-6.5 secara keseluruhan (tidak ada band di bawah 5.5) untuk program sarjana. Program pascasarjana dan hukum biasanya mensyaratkan 6.5-7.0. Russell Group dan program spesialis bisa mensyaratkan lebih tinggi. PTE, TOEFL, dan kualifikasi Cambridge English diterima luas sebagai alternatif.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 1 AND question = $q$What IELTS score do I need for UK universities?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi được làm bao nhiêu giờ ở Anh với visa du học?$q$,
    "answer_vi" = $q$Người giữ visa du học được làm 20 giờ mỗi tuần trong thời gian học và làm toàn thời gian trong các kỳ nghỉ chính thức của trường (Giáng sinh, Phục sinh, mùa hè). Sau khi tốt nghiệp, visa Graduate Route cho phép làm việc không giới hạn giờ ở bất kỳ vị trí nào.$q$,
    "question_fil" = $q$Ilang oras ako puwedeng magtrabaho sa UK gamit ang Student visa?$q$,
    "answer_fil" = $q$Puwedeng magtrabaho ang mga may hawak ng Student visa nang 20 oras kada linggo habang may klase at full-time tuwing opisyal na bakasyon ng university (Pasko, Easter, tag-init). Pagkatapos magtapos, pinapayagan ng Graduate Route visa ang walang limitasyong oras ng trabaho sa anumang posisyon.$q$,
    "question_idn" = $q$Berapa jam saya boleh bekerja di Inggris dengan visa pelajar?$q$,
    "answer_idn" = $q$Pemegang visa pelajar boleh bekerja 20 jam per minggu selama masa perkuliahan dan penuh waktu selama libur resmi universitas (Natal, Paskah, musim panas). Setelah lulus, visa Graduate Route mengizinkan jam kerja tanpa batas di posisi apa pun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 2 AND question = $q$How many hours can I work in the UK on a Student visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Visa Graduate Route là gì?$q$,
    "answer_vi" = $q$Graduate Route là visa làm việc sau tốt nghiệp của Anh dành cho sinh viên quốc tế đã hoàn thành bằng cấp tại Anh. Visa cho bạn 2 năm (3 năm với tiến sĩ) sống và làm việc tại Anh mà không cần thư mời làm việc. Bạn có thể chuyển sang visa Skilled Worker nếu tìm được công việc ở trình độ tốt nghiệp.$q$,
    "question_fil" = $q$Ano ang Graduate Route visa?$q$,
    "answer_fil" = $q$Ang Graduate Route ay post-study work visa ng UK para sa mga international student na nakatapos ng degree sa UK. Nagbibigay ito ng 2 taon (3 taon para sa mga nagtapos ng PhD) para manirahan at magtrabaho sa UK nang hindi kailangan ng job offer. Puwede kang lumipat sa Skilled Worker visa kung makahanap ka ng trabahong pang-graduate.$q$,
    "question_idn" = $q$Apa itu visa Graduate Route?$q$,
    "answer_idn" = $q$Graduate Route adalah visa kerja pascastudi Inggris bagi mahasiswa internasional yang telah menyelesaikan gelar di Inggris. Visa ini memberi Anda 2 tahun (3 tahun untuk lulusan PhD) untuk tinggal dan bekerja di Inggris tanpa memerlukan tawaran kerja. Anda dapat beralih ke visa Skilled Worker jika mendapat pekerjaan tingkat lulusan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 3 AND question = $q$What is the Graduate Route visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Russell Group và các trường post-92 khác nhau như thế nào?$q$,
    "answer_vi" = $q$Các trường Russell Group (24 trường, gồm Sheffield, Leeds, Manchester, Nottingham) thiên về nghiên cứu, có các chương trình được xếp hạng toàn cầu và tuyển sinh chọn lọc. Các trường post-92 (trước đây là polytechnic) tập trung vào giáo dục ứng dụng, chuyên nghiệp, có quan hệ chặt chẽ với doanh nghiệp, tỷ lệ trúng tuyển cao hơn và học phí thấp hơn. Cả hai đều cấp cùng một văn bằng của Anh.$q$,
    "question_fil" = $q$Ano ang pagkakaiba ng Russell Group at post-92 na mga university?$q$,
    "answer_fil" = $q$Ang mga university ng Russell Group (24 na institusyon kabilang ang Sheffield, Leeds, Manchester, Nottingham) ay nakatuon sa pananaliksik, may mga programang kabilang sa pandaigdigang ranking, at mapili ang admission. Ang mga post-92 university (dating polytechnic) ay nakatuon sa applied at propesyonal na edukasyon na may matibay na ugnayan sa industriya, mas mataas na acceptance rate, at mas mababang bayarin. Parehong UK degree ang ibinibigay ng dalawa.$q$,
    "question_idn" = $q$Apa perbedaan universitas Russell Group dan post-92?$q$,
    "answer_idn" = $q$Universitas Russell Group (24 institusi termasuk Sheffield, Leeds, Manchester, Nottingham) berfokus pada riset dengan program berperingkat global dan seleksi penerimaan yang ketat. Universitas post-92 (dulu politeknik) berfokus pada pendidikan terapan dan profesional dengan hubungan industri yang kuat, tingkat penerimaan lebih tinggi, dan biaya lebih rendah. Keduanya memberikan gelar Inggris yang sama.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 4 AND question = $q$What is the difference between Russell Group and post-92 universities?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có phải đóng Phụ phí Y tế Nhập cư (IHS) không?$q$,
    "answer_vi" = $q$Có. Sinh viên quốc tế xin visa du học Anh phải đóng trước Phụ phí Y tế Nhập cư (hiện là GBP 776/năm tính đến năm 2024) ngoài lệ phí visa. Khoản này cho phép bạn sử dụng dịch vụ NHS trong thời gian ở Anh, tương đương cư dân Anh.$q$,
    "question_fil" = $q$Kailangan ko bang bayaran ang Immigration Health Surcharge (IHS)?$q$,
    "answer_fil" = $q$Oo. Kailangang bayaran nang maaga ng mga international student na nag-a-apply para sa UK Student visa ang Immigration Health Surcharge (kasalukuyang GBP 776/taon noong 2024) bukod sa visa fee. Nagbibigay ito ng access sa NHS habang nasa UK ka, katulad ng mga residente ng UK.$q$,
    "question_idn" = $q$Apakah saya harus membayar Immigration Health Surcharge (IHS)?$q$,
    "answer_idn" = $q$Ya. Mahasiswa internasional yang mengajukan visa pelajar Inggris harus membayar Immigration Health Surcharge di muka (saat ini GBP 776/tahun per 2024) selain biaya visa. Ini memberi Anda akses ke NHS selama tinggal di Inggris, setara dengan penduduk Inggris.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$united-kingdom$q$)
    AND "order" = 5 AND question = $q$Do I need to pay the Immigration Health Surcharge (IHS)?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'United Kingdom faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'United Kingdom: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$united-kingdom$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$united-kingdom$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$united-kingdom$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
