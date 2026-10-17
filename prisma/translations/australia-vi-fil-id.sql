-- Vietnamese, Filipino and Indonesian content for Australia.
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
    "tagline_vi" = $q$Xuất sắc, quyền làm việc và lộ trình định cư rõ ràng$q$,
    "overview_vi" = $q$Úc luôn nằm trong số những điểm đến du học hàng đầu thế giới, kết hợp các trường đại học đẳng cấp thế giới với chất lượng sống cao, các thành phố đa văn hóa và kết quả việc làm sau tốt nghiệp nổi bật. Tám trường đại học nghiên cứu danh tiếng thuộc nhóm Group of Eight (Go8) là trụ cột của một hệ sinh thái rộng lớn hơn gồm các trường cao đẳng chuyên ngành và cơ sở giáo dục thiên về giảng dạy, cùng phục vụ hơn 750.000 sinh viên quốc tế mỗi năm. Bằng cấp của Úc được công nhận và đánh giá cao trên toàn thế giới, đặc biệt ở khu vực châu Á - Thái Bình Dương, và quyền làm việc sau tốt nghiệp (visa Temporary Graduate, subclass 485) cho phép sinh viên ở lại Úc từ 2 đến 4 năm tùy trình độ bằng cấp, với lộ trình rõ ràng đến di trú tay nghề và thường trú nhân. Sinh viên quốc tế được làm việc 48 giờ mỗi hai tuần trong học kỳ và làm toàn thời gian trong các kỳ nghỉ chính thức, giúp bù đắp đáng kể chi phí sinh hoạt. Các thành phố như Melbourne, Sydney, Perth và Brisbane thường xuyên nằm trong danh sách những thành phố đáng sống nhất thế giới, mang lại môi trường an toàn và sôi động cho sinh viên quốc tế.$q$,
    "tagline_fil" = $q$Kahusayan, karapatang magtrabaho, at malinaw na landas patungong PR$q$,
    "overview_fil" = $q$Palaging kabilang ang Australia sa mga nangungunang destinasyon sa pag-aaral sa buong mundo, na pinagsasama ang mga world-class na university, mataas na kalidad ng buhay, mga multicultural na lungsod, at natatanging resulta sa trabaho ng mga nagtapos. Ang walong prestihiyosong research university ng Group of Eight (Go8) ang sandigan ng mas malawak na ecosystem ng mga espesyalistang college at institusyong nakatuon sa pagtuturo, na magkakasamang naglilingkod sa mahigit 750,000 international student kada taon. Kinikilala at iginagalang sa buong mundo ang mga degree sa Australia, lalo na sa rehiyong Asia-Pacific, at ang post-study work rights nito (Temporary Graduate visa, subclass 485) ay nagpapahintulot sa mga nagtapos na manatili sa Australia nang 2 hanggang 4 na taon depende sa antas ng kanilang kwalipikasyon, na may malinaw na landas patungo sa skilled migration at permanent residency. Puwedeng magtrabaho ang mga international student nang 48 oras kada dalawang linggo habang may klase at full-time tuwing opisyal na break, na malaking tulong sa gastusin sa pamumuhay. Ang mga lungsod gaya ng Melbourne, Sydney, Perth, at Brisbane ay palaging kabilang sa mga pinakamainam tirhan sa mundo, na nag-aalok ng ligtas at masiglang kapaligiran para sa mga international student.$q$,
    "tagline_idn" = $q$Keunggulan, hak bekerja, dan jalur yang jelas menuju PR$q$,
    "overview_idn" = $q$Australia secara konsisten termasuk destinasi studi terbaik di dunia, memadukan universitas kelas dunia dengan kualitas hidup yang tinggi, kota-kota multikultural, dan hasil kerja lulusan yang luar biasa. Delapan universitas riset bergengsi dalam Group of Eight (Go8) menjadi tulang punggung ekosistem yang lebih luas berupa college spesialis dan institusi berfokus pengajaran, yang bersama-sama melayani lebih dari 750.000 mahasiswa internasional setiap tahun. Gelar Australia diakui dan dihormati secara internasional, terutama di kawasan Asia-Pasifik, dan hak kerja pascastudinya (visa Temporary Graduate, subclass 485) memungkinkan lulusan tinggal di Australia selama 2 hingga 4 tahun tergantung jenjang kualifikasi, dengan jalur yang jelas menuju migrasi terampil dan residensi tetap. Mahasiswa internasional dapat bekerja 48 jam per dua minggu selama semester dan penuh waktu selama libur resmi, yang secara berarti membantu menutup biaya hidup. Kota-kota seperti Melbourne, Sydney, Perth, dan Brisbane secara konsisten masuk dalam daftar kota paling layak huni di dunia, menawarkan lingkungan yang aman dan semarak bagi mahasiswa internasional.$q$
  WHERE slug = $q$australia$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Đại học đẳng cấp thế giới: 7 trường trong Top 100 toàn cầu$q$,
    "description_vi" = $q$Nhóm Group of Eight của Úc, gồm UNSW, Monash và các trường khác, liên tục nằm trong top 100 thế giới. Bằng cấp được công nhận toàn cầu và được nhà tuyển dụng ở khu vực châu Á - Thái Bình Dương đánh giá cao.$q$,
    "title_fil" = $q$Mga world-class na university: 7 sa Global Top 100$q$,
    "description_fil" = $q$Ang Group of Eight na mga university ng Australia, kabilang ang UNSW, Monash, at iba pa, ay palaging kabilang sa top 100 sa mundo. Kinikilala sa buong mundo ang mga degree at mataas ang pagpapahalaga ng mga employer sa rehiyong Asia-Pacific.$q$,
    "title_idn" = $q$Universitas kelas dunia: 7 masuk 100 besar global$q$,
    "description_idn" = $q$Universitas Group of Eight Australia, termasuk UNSW, Monash, dan lainnya, secara konsisten masuk 100 besar dunia. Gelarnya diakui secara global dan sangat dihargai pemberi kerja di kawasan Asia-Pasifik.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 1 AND title = $q$World-Class Universities — 7 in Global Top 100$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Quyền làm việc dành cho sinh viên tốt nhất thế giới$q$,
    "description_vi" = $q$48 giờ mỗi hai tuần trong học kỳ và không giới hạn giờ trong kỳ nghỉ. Úc có mức cho phép làm thêm dành cho sinh viên rộng rãi nhất trong các điểm đến nói tiếng Anh lớn, giúp sinh viên bù đắp chi phí sinh hoạt.$q$,
    "title_fil" = $q$Pinakamahusay na karapatang magtrabaho para sa estudyante sa mundo$q$,
    "description_fil" = $q$48 oras kada dalawang linggo habang may klase at walang limitasyong oras tuwing break. Pinakamaluwag ang pinapayagang trabaho ng estudyante sa Australia kumpara sa iba pang pangunahing English-speaking na destinasyon sa pag-aaral, kaya natutulungan ang mga estudyante sa gastusin sa pamumuhay.$q$,
    "title_idn" = $q$Hak bekerja mahasiswa terbaik di dunia$q$,
    "description_idn" = $q$48 jam per dua minggu selama semester dan jam kerja tanpa batas selama libur. Australia menawarkan izin kerja mahasiswa paling longgar di antara destinasi studi berbahasa Inggris utama, membantu mahasiswa menutup biaya hidup.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 2 AND title = $q$Best Student Work Rights in the World$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Visa làm việc sau tốt nghiệp và lộ trình thường trú$q$,
    "description_vi" = $q$Visa Temporary Graduate (subclass 485) cấp quyền làm việc 2-4 năm sau tốt nghiệp. Kết hợp với hệ thống tính điểm di trú tay nghề, Úc mang đến một trong những con đường dễ tiếp cận nhất để chuyển từ sinh viên thành thường trú nhân.$q$,
    "title_fil" = $q$Post-Study Work Visa at landas patungong PR$q$,
    "description_fil" = $q$Ang Temporary Graduate visa (subclass 485) ay nagbibigay ng 2-4 na taong karapatang magtrabaho pagkatapos magtapos. Kasama ng skilled migration points system, isa ang Australia sa pinakamadaling landas mula estudyante tungo sa permanent resident.$q$,
    "title_idn" = $q$Visa kerja pascastudi dan jalur menuju PR$q$,
    "description_idn" = $q$Visa Temporary Graduate (subclass 485) memberikan hak kerja 2-4 tahun setelah lulus. Dipadukan dengan sistem poin migrasi terampil, Australia menawarkan salah satu jalur paling mudah diakses dari mahasiswa menjadi penduduk tetap.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 3 AND title = $q$Post-Study Work Visa & PR Pathway$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Thành phố an toàn, đa văn hóa và đẳng cấp thế giới$q$,
    "description_vi" = $q$Melbourne, Sydney, Brisbane và Perth liên tục nằm trong các bảng xếp hạng mức độ đáng sống toàn cầu. Cộng đồng sinh viên châu Á lớn và lâu đời ở mọi thành phố giúp việc hòa nhập dễ dàng hơn và tạo mạng lưới hỗ trợ bạn bè vững chắc.$q$,
    "title_fil" = $q$Ligtas, multicultural, at world-class na mga lungsod$q$,
    "description_fil" = $q$Palaging kabilang ang Melbourne, Sydney, Brisbane, at Perth sa mga global liveability index. Ang malaki at matagal nang komunidad ng mga Asyanong estudyante sa bawat lungsod ay nagpapagaan ng paglipat at nagbibigay ng matibay na support network ng mga kapwa estudyante.$q$,
    "title_idn" = $q$Kota yang aman, multikultural, dan kelas dunia$q$,
    "description_idn" = $q$Melbourne, Sydney, Brisbane, dan Perth secara konsisten masuk indeks kelayakhunian global. Komunitas mahasiswa Asia yang besar dan mapan di setiap kota mempermudah adaptasi dan menyediakan jaringan dukungan sebaya yang kuat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 4 AND title = $q$Safe, Multicultural, World-Class Cities$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn khóa học và trường đại học$q$,
    "description_vi" = $q$Tìm hiểu các chương trình đã đăng ký CRICOS phù hợp với nền tảng học vấn và mục tiêu nghề nghiệp của bạn. Hãy xem danh sách ngành nghề tay nghề nếu thường trú là mục tiêu dài hạn, vì ngành học của bạn ảnh hưởng đến điểm PR.$q$,
    "title_fil" = $q$Piliin ang kurso at university mo$q$,
    "description_fil" = $q$Saliksikin ang mga programang rehistrado sa CRICOS na tugma sa akademikong background at mga layunin mo sa karera. Tingnan ang skilled occupation list kung pangmatagalang layunin ang permanent residency, dahil nakakaapekto ang larangan ng degree mo sa PR points.$q$,
    "title_idn" = $q$Pilih program dan universitas Anda$q$,
    "description_idn" = $q$Teliti program terdaftar CRICOS yang sesuai dengan latar belakang akademik dan tujuan karier Anda. Periksa daftar pekerjaan terampil jika residensi tetap adalah tujuan jangka panjang, karena bidang gelar Anda memengaruhi poin PR.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND step_number = 1 AND title = $q$Choose Your Course and University$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận Thư xác nhận nhập học (CoE)$q$,
    "description_vi" = $q$Nộp hồ sơ trực tiếp cho trường bạn chọn kèm bảng điểm, điểm thi tiếng Anh (IELTS/PTE/TOEFL) và giấy tờ bổ sung. Chấp nhận thư mời và nhận CoE, giấy tờ bắt buộc để xin visa du học.$q$,
    "title_fil" = $q$Mag-apply at tanggapin ang Confirmation of Enrolment (CoE)$q$,
    "description_fil" = $q$Direktang mag-apply sa napili mong university kasama ang transcript, English test score (IELTS/PTE/TOEFL), at mga sumusuportang dokumento. Tanggapin ang offer mo at kunin ang CoE, na kailangan para sa student visa.$q$,
    "title_idn" = $q$Daftar dan terima Confirmation of Enrolment (CoE)$q$,
    "description_idn" = $q$Daftar langsung ke universitas pilihan Anda dengan transkrip akademik, skor tes bahasa Inggris (IELTS/PTE/TOEFL), dan dokumen pendukung. Terima tawaran Anda dan dapatkan CoE, yang diperlukan untuk visa pelajar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND step_number = 2 AND title = $q$Apply and Receive Confirmation of Enrolment (CoE)$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chuẩn bị bản giải trình GTE$q$,
    "description_vi" = $q$Viết bản giải trình Genuine Temporary Entrant (GTE) nêu rõ mục đích học tập và kế hoạch về nước sau khi tốt nghiệp. Đây là phần quan trọng nhất của hồ sơ visa du học Úc: GTE yếu là lý do hàng đầu dẫn đến bị từ chối.$q$,
    "title_fil" = $q$Ihanda ang GTE Statement mo$q$,
    "description_fil" = $q$Isulat ang Genuine Temporary Entrant (GTE) statement na nagpapaliwanag ng layunin mo sa pag-aaral at plano mong umuwi pagkatapos magtapos. Ito ang pinakamahalagang bahagi ng Australian student visa: ang mahinang GTE ang pangunahing dahilan ng pagtanggi.$q$,
    "title_idn" = $q$Siapkan pernyataan GTE Anda$q$,
    "description_idn" = $q$Tulis pernyataan Genuine Temporary Entrant (GTE) yang menjelaskan tujuan studi dan rencana Anda kembali ke negara asal setelah lulus. Ini bagian terpenting dari visa pelajar Australia: GTE yang lemah adalah alasan utama penolakan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND step_number = 3 AND title = $q$Prepare Your GTE Statement$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ visa du học (Subclass 500)$q$,
    "description_vi" = $q$Nộp hồ sơ trực tuyến qua ImmiAccount kèm CoE, bản giải trình GTE, Bảo hiểm Y tế Sinh viên Quốc tế (OSHC), chứng minh tài chính và kết quả thi tiếng Anh. Thời gian xử lý trung bình 4-8 tuần.$q$,
    "title_fil" = $q$Isumite ang Student Visa (Subclass 500)$q$,
    "description_fil" = $q$Mag-apply online sa pamamagitan ng ImmiAccount kasama ang CoE, GTE statement, Overseas Student Health Cover (OSHC), patunay ng pondo, at resulta ng English test. Karaniwang 4-8 linggo ang pagproseso.$q$,
    "title_idn" = $q$Ajukan visa pelajar (Subclass 500)$q$,
    "description_idn" = $q$Ajukan secara online lewat ImmiAccount dengan CoE, pernyataan GTE, Overseas Student Health Cover (OSHC), bukti keuangan, dan hasil tes bahasa Inggris. Pemrosesan rata-rata 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND step_number = 4 AND title = $q$Lodge Student Visa (Subclass 500)$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Bản giải trình GTE là gì và vì sao quan trọng?$q$,
    "answer_vi" = $q$Bản giải trình Genuine Temporary Entrant (GTE) là phần bạn giải thích vì sao muốn học tại Úc và ý định rời đi khi visa hết hạn. Nhân viên di trú dùng nó để đánh giá tính xác thực của hồ sơ, và đây là lý do phổ biến nhất khiến visa du học bị từ chối khi viết kém.$q$,
    "question_fil" = $q$Ano ang GTE statement at bakit mahalaga ito?$q$,
    "answer_fil" = $q$Ang Genuine Temporary Entrant (GTE) statement ay paliwanag mo kung bakit gusto mong mag-aral sa Australia at ang balak mong umalis pagkatapos mag-expire ng visa mo. Ginagamit ito ng mga immigration officer para suriin kung totoo ang aplikasyon mo, at ito ang pinakakaraniwang dahilan ng pagtanggi sa student visa kapag mahina ang pagkakasulat.$q$,
    "question_idn" = $q$Apa itu pernyataan GTE dan mengapa penting?$q$,
    "answer_idn" = $q$Pernyataan Genuine Temporary Entrant (GTE) adalah penjelasan Anda tentang mengapa ingin kuliah di Australia dan niat Anda pergi setelah visa berakhir. Petugas imigrasi menggunakannya untuk menilai keaslian permohonan Anda, dan ini alasan paling umum penolakan visa pelajar jika ditulis dengan buruk.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 1 AND question = $q$What is the GTE statement and why does it matter?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi được làm bao nhiêu giờ mỗi tuần ở Úc với visa du học?$q$,
    "answer_vi" = $q$Bạn được làm 48 giờ mỗi hai tuần (chu kỳ hai tuần) trong thời gian đang học, và không giới hạn giờ trong các kỳ nghỉ chính thức của trường đại học. Đây là mức cho phép làm thêm rộng rãi nhất trong các điểm đến du học nói tiếng Anh.$q$,
    "question_fil" = $q$Ilang oras ako puwedeng magtrabaho sa Australia gamit ang student visa?$q$,
    "answer_fil" = $q$Puwede kang magtrabaho nang 48 oras kada dalawang linggo habang naka-enroll ka, at walang limitasyong oras tuwing opisyal na bakasyon ng university. Ito ang pinakamaluwag na pinapayagang trabaho ng estudyante sa mga English-speaking na destinasyon sa pag-aaral.$q$,
    "question_idn" = $q$Berapa jam saya boleh bekerja di Australia dengan visa pelajar?$q$,
    "answer_idn" = $q$Anda boleh bekerja 48 jam per dua minggu selama periode studi yang terdaftar, dan tanpa batas jam selama libur resmi universitas. Ini adalah izin kerja mahasiswa paling longgar di antara destinasi studi berbahasa Inggris.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 2 AND question = $q$How many hours can I work in Australia on a student visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Visa Temporary Graduate (subclass 485) là gì?$q$,
    "answer_vi" = $q$Sau khi hoàn thành bằng cấp tại Úc, bạn có thể xin visa Temporary Graduate, cho phép sống và làm việc tại Úc trong 2-4 năm. Thời hạn phụ thuộc vào trình độ bằng cấp (cử nhân = 2 năm; thạc sĩ/tiến sĩ = 3-4 năm) và việc bạn có học ở khu vực vùng xa hay không.$q$,
    "question_fil" = $q$Ano ang Temporary Graduate visa (subclass 485)?$q$,
    "answer_fil" = $q$Pagkatapos ng degree mo sa Australia, puwede kang mag-apply para sa Temporary Graduate visa, na nagpapahintulot sa iyong manirahan at magtrabaho sa Australia nang 2-4 na taon. Nakadepende ang haba sa antas ng degree mo (bachelor = 2 taon; master/doktorado = 3-4 na taon) at kung nag-aral ka sa regional area.$q$,
    "question_idn" = $q$Apa itu visa Temporary Graduate (subclass 485)?$q$,
    "answer_idn" = $q$Setelah menyelesaikan gelar di Australia, Anda dapat mengajukan visa Temporary Graduate, yang memungkinkan Anda tinggal dan bekerja di Australia selama 2-4 tahun. Durasinya tergantung jenjang gelar Anda (sarjana = 2 tahun; magister/doktor = 3-4 tahun) dan apakah Anda belajar di wilayah regional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 3 AND question = $q$What is the Temporary Graduate visa (subclass 485)?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần chứng minh tài chính khi xin visa du học Úc không?$q$,
    "answer_vi" = $q$Có. Bạn phải chứng minh đủ khả năng chi trả học phí năm đầu, chi phí sinh hoạt AUD 21,041/năm (mức năm 2024), vé máy bay khứ hồi và chi phí cho người thân đi cùng nếu có. Sao kê ngân hàng, học bổng hoặc thư bảo lãnh đều được chấp nhận làm bằng chứng.$q$,
    "question_fil" = $q$Kailangan ko bang magpakita ng patunay ng pondo para sa Australian student visa?$q$,
    "answer_fil" = $q$Oo. Kailangan mong ipakitang kaya mong bayaran ang tuition sa unang taon, AUD 21,041/taon na gastos sa pamumuhay (rate ng 2024), pamasahe pabalik, at gastos ng mga kasamang miyembro ng pamilya. Tinatanggap na ebidensya ang bank statement, scholarship, o sponsor letter.$q$,
    "question_idn" = $q$Apakah saya perlu menunjukkan bukti dana untuk visa pelajar Australia?$q$,
    "answer_idn" = $q$Ya. Anda harus menunjukkan mampu menanggung biaya kuliah tahun pertama, biaya hidup AUD 21,041/tahun (tarif 2024), tiket pesawat pulang, dan biaya anggota keluarga yang menyertai. Rekening koran, beasiswa, atau surat sponsor diterima sebagai bukti.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 4 AND question = $q$Do I need to show proof of funds for an Australian student visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Các trường đại học Úc có yêu cầu IELTS không?$q$,
    "answer_vi" = $q$Hầu hết các trường đại học Úc yêu cầu IELTS Academic 6.0-6.5 tổng điểm (không kỹ năng nào dưới 5.5-6.0) cho bậc đại học và 6.5-7.0 cho bậc sau đại học. PTE Academic và TOEFL iBT được chấp nhận rộng rãi thay thế. Một số trường có chương trình dự bị tiếng Anh riêng cho sinh viên chưa đạt ngưỡng nhập học trực tiếp.$q$,
    "question_fil" = $q$Kailangan ba ng IELTS score sa mga university sa Australia?$q$,
    "answer_fil" = $q$Karamihan ng mga university sa Australia ay humihingi ng IELTS Academic 6.0-6.5 overall (walang band na mas mababa sa 5.5-6.0) para sa undergraduate programme, at 6.5-7.0 para sa postgraduate. Malawakang tinatanggap na alternatibo ang PTE Academic at TOEFL iBT. May ilang university na may sariling English pathway programme para sa mga estudyanteng kulang sa direct entry threshold.$q$,
    "question_idn" = $q$Apakah skor IELTS diperlukan untuk universitas di Australia?$q$,
    "answer_idn" = $q$Sebagian besar universitas Australia mensyaratkan IELTS Academic 6.0-6.5 secara keseluruhan (tidak ada band di bawah 5.5-6.0) untuk program sarjana, dan 6.5-7.0 untuk pascasarjana. PTE Academic dan TOEFL iBT diterima luas sebagai alternatif. Beberapa universitas menawarkan program jalur bahasa Inggris sendiri bagi mahasiswa di bawah ambang masuk langsung.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$australia$q$)
    AND "order" = 5 AND question = $q$Is an IELTS score required for Australian universities?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Australia faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Australia: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$australia$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$australia$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$australia$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
