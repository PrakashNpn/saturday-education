-- Vietnamese, Filipino and Indonesian content for Spain.
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
    "tagline_vi" = $q$Nền giáo dục châu Âu giá phải chăng với tâm hồn Địa Trung Hải$q$,
    "overview_vi" = $q$Tây Ban Nha là một trong những điểm đến du học hấp dẫn nhất châu Âu, mang đến nền giáo dục đẳng cấp thế giới với chi phí chỉ bằng một phần nhỏ so với Anh hoặc Mỹ. Với hơn 80 trường đại học và hơn 170.000 sinh viên quốc tế, Tây Ban Nha kết hợp sự xuất sắc học thuật với chất lượng cuộc sống vô song: nắng, văn hóa, ẩm thực và sự đón tiếp nồng hậu dành cho người học toàn cầu. Học phí thuộc hàng thấp nhất Tây Âu, từ €5,000 đến €18,000 mỗi năm tại các cơ sở tư thục, trong khi lối sống Địa Trung Hải giúp chi phí sinh hoạt ở mức hợp lý. Tiếng Tây Ban Nha, ngôn ngữ mẹ đẻ được nói nhiều thứ hai thế giới, mang lại lợi thế nghề nghiệp cho sinh viên tốt nghiệp trên khắp châu Âu, Mỹ Latinh và xa hơn nữa. Sau khi tốt nghiệp, visa Búsqueda de Empleo (Tìm việc) của Tây Ban Nha cho phép ở lại 12 tháng để tìm việc, và hệ sinh thái khởi nghiệp sôi động ở Barcelona và Madrid mở ra cơ hội khắp EU. Dù bạn hướng đến khách sạn, kinh doanh, logistics hay các ngành sáng tạo, Tây Ban Nha mang lại một văn bằng châu Âu, kinh nghiệm thực tế và cửa ngõ vào thị trường việc làm của lục địa.$q$,
    "tagline_fil" = $q$Abot-kayang edukasyong Europeo na may puso ng Mediterranean$q$,
    "overview_fil" = $q$Ang Spain ay isa sa pinakakaakit-akit na destinasyon sa pag-aaral sa Europa, na nag-aalok ng world-class na edukasyon sa maliit na bahagi lamang ng gastos sa UK o US. Sa mahigit 80 university at mahigit 170,000 international student, pinagsasama ng Spain ang kahusayang akademiko at walang kapantay na kalidad ng buhay: araw, kultura, pagkain, at mainit na pagtanggap sa mga global learner. Isa sa pinakamababa sa Kanlurang Europa ang tuition fee, nasa €5,000 hanggang €18,000 kada taon sa mga pribadong institusyon, habang nananatiling kayang-kaya ang gastos sa pamumuhay dahil sa Mediterranean na lifestyle. Ang Spanish, ang ikalawang pinakamaraming nagsasalitang katutubong wika sa mundo, ay nagbibigay ng bentahe sa karera sa mga nagtapos sa buong Europa, Latin America, at higit pa. Pagkatapos magtapos, ang Búsqueda de Empleo (Job Search) visa ng Spain ay nagbibigay ng 12 buwan para maghanap ng trabaho, at ang umuunlad na startup ecosystem sa Barcelona at Madrid ay nagbubukas ng pinto sa buong EU. Hospitality man, business, logistics, o creative industry ang target mo, nag-aalok ang Spain ng European na kwalipikasyon, tunay na karanasan, at daan patungo sa job market ng kontinente.$q$,
    "tagline_idn" = $q$Pendidikan Eropa yang terjangkau dengan jiwa Mediterania$q$,
    "overview_idn" = $q$Spanyol adalah salah satu destinasi studi paling menarik di Eropa, menawarkan pendidikan kelas dunia dengan biaya hanya sebagian kecil dari Inggris atau AS. Dengan lebih dari 80 universitas dan lebih dari 170.000 mahasiswa internasional, Spanyol memadukan keunggulan akademik dengan kualitas hidup yang tiada tanding: sinar matahari, budaya, kuliner, dan sambutan hangat bagi pembelajar global. Biaya kuliah termasuk yang terendah di Eropa Barat, berkisar €5,000 hingga €18,000 per tahun di institusi swasta, sementara gaya hidup Mediterania menjaga biaya hidup tetap terjangkau. Bahasa Spanyol, bahasa ibu dengan penutur terbanyak kedua di dunia, memberi lulusan keunggulan karier di seluruh Eropa, Amerika Latin, dan sekitarnya. Setelah lulus, visa Búsqueda de Empleo (Pencarian Kerja) Spanyol memberikan 12 bulan untuk mencari pekerjaan, dan ekosistem startup yang berkembang di Barcelona dan Madrid membuka pintu di seluruh UE. Baik Anda mengincar perhotelan, bisnis, logistik, maupun industri kreatif, Spanyol menawarkan kualifikasi Eropa, pengalaman dunia nyata, dan gerbang menuju pasar kerja benua ini.$q$
  WHERE slug = $q$spain$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Học phí phải chăng ở Tây Âu$q$,
    "description_vi" = $q$Học phí các trường đại học tư thục ở Tây Ban Nha dao động từ €5,000 đến €18,000 mỗi năm, thấp hơn đáng kể so với Anh, Ireland hoặc Hà Lan. Các trường công lập còn thu ít hơn. Sinh viên nhận được bằng châu Âu chất lượng mà không phải trả mức giá Tây Âu.$q$,
    "title_fil" = $q$Abot-kayang tuition sa Kanlurang Europa$q$,
    "description_fil" = $q$Nasa €5,000 hanggang €18,000 kada taon ang bayarin sa mga pribadong university sa Spain, mas mababa nang malaki kaysa sa UK, Ireland, o Netherlands. Mas mababa pa ang singil ng mga pampublikong university. Nakakakuha ang mga estudyante ng de-kalidad na European degree nang walang presyong pang-Kanlurang Europa.$q$,
    "title_idn" = $q$Biaya kuliah terjangkau di Eropa Barat$q$,
    "description_idn" = $q$Biaya universitas swasta di Spanyol berkisar €5,000 hingga €18,000 per tahun, jauh lebih rendah daripada Inggris, Irlandia, atau Belanda. Universitas negeri memungut biaya lebih rendah lagi. Mahasiswa mendapat gelar Eropa berkualitas tanpa harga Eropa Barat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 1 AND title = $q$Affordable Tuition in Western Europe$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Lợi thế tiếng Tây Ban Nha$q$,
    "description_vi" = $q$Tiếng Tây Ban Nha là ngôn ngữ mẹ đẻ được nói nhiều thứ hai trên thế giới, với hơn 500 triệu người nói ở châu Âu, Mỹ Latinh và Mỹ. Tốt nghiệp với tiếng Tây Ban Nha ở trình độ chuyên nghiệp mở ra cơ hội nghề nghiệp trên ba châu lục.$q$,
    "title_fil" = $q$Bentahe ng wikang Spanish$q$,
    "description_fil" = $q$Ang Spanish ang ikalawang pinakamaraming nagsasalitang katutubong wika sa mundo, na may mahigit 500 milyong nagsasalita sa Europa, Latin America, at US. Ang pagtatapos nang may propesyonal na antas ng Spanish ay nagbubukas ng pinto sa mga karera sa tatlong kontinente.$q$,
    "title_idn" = $q$Keunggulan bahasa Spanyol$q$,
    "description_idn" = $q$Bahasa Spanyol adalah bahasa ibu dengan penutur terbanyak kedua di dunia, dengan lebih dari 500 juta penutur di Eropa, Amerika Latin, dan AS. Lulus dengan kemampuan bahasa Spanyol tingkat profesional membuka pintu karier di tiga benua.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 2 AND title = $q$Spanish Language Advantage$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Lối sống Địa Trung Hải và an toàn$q$,
    "description_vi" = $q$Tây Ban Nha liên tục nằm trong nhóm những quốc gia an toàn và đáng sống nhất châu Âu. Ẩm thực tuyệt vời, văn hóa ngoài trời, các thành phố đẳng cấp thế giới và khí hậu ấm áp khiến cuộc sống sinh viên hằng ngày thực sự thú vị, không chỉ hiệu quả về mặt học thuật.$q$,
    "title_fil" = $q$Mediterranean na lifestyle at kaligtasan$q$,
    "description_fil" = $q$Palaging kabilang ang Spain sa pinakaligtas at pinakamainam tirhan na bansa sa Europa. Dahil sa masarap na pagkain, outdoor culture, world-class na mga lungsod, at mainit na klima, tunay na kasiya-siya ang araw-araw na buhay-estudyante, hindi lang produktibo sa akademya.$q$,
    "title_idn" = $q$Gaya hidup Mediterania dan keamanan$q$,
    "description_idn" = $q$Spanyol secara konsisten termasuk negara teraman dan paling layak huni di Eropa. Makanan lezat, budaya luar ruang, kota kelas dunia, dan iklim hangat membuat kehidupan mahasiswa sehari-hari benar-benar menyenangkan, bukan sekadar produktif secara akademik.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 3 AND title = $q$Mediterranean Lifestyle & Safety$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Cửa ngõ vào thị trường việc làm EU$q$,
    "description_vi" = $q$Bằng của Tây Ban Nha được công nhận tại cả 27 quốc gia thành viên EU. Barcelona và Madrid là các trung tâm khởi nghiệp và doanh nghiệp sôi động. Visa tìm việc Búsqueda de Empleo 12 tháng sau tốt nghiệp cho sinh viên thời gian tìm việc trước khi chuyển sang giấy phép lao động.$q$,
    "title_fil" = $q$Daan patungo sa EU job market$q$,
    "description_fil" = $q$Kinikilala sa lahat ng 27 miyembrong estado ng EU ang degree sa Spain. Ang Barcelona at Madrid ay masiglang startup at corporate hub. Ang 12-buwang Búsqueda de Empleo post-study visa ay nagbibigay sa mga nagtapos ng oras para makakuha ng trabaho bago lumipat sa work permit.$q$,
    "title_idn" = $q$Gerbang menuju pasar kerja UE$q$,
    "description_idn" = $q$Gelar Spanyol diakui di seluruh 27 negara anggota UE. Barcelona dan Madrid adalah pusat startup dan korporasi yang berkembang. Visa pascastudi Búsqueda de Empleo 12 bulan memberi lulusan waktu untuk mendapatkan pekerjaan sebelum beralih ke izin kerja.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 4 AND title = $q$Gateway to the EU Job Market$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Tìm hiểu và chọn chương trình$q$,
    "description_vi" = $q$Xác định lĩnh vực mục tiêu: khách sạn, kinh doanh, logistics hoặc ngôn ngữ. Xác nhận chương trình dạy bằng tiếng Anh hay tiếng Tây Ban Nha và kiểm tra điều kiện đầu vào, gồm chứng chỉ tiếng Anh (IELTS/TOEFL) hoặc tiếng Tây Ban Nha.$q$,
    "title_fil" = $q$Magsaliksik at piliin ang programa mo$q$,
    "description_fil" = $q$Tukuyin ang target mong larangan: hospitality, business, logistics, o wika. Tiyakin kung sa Ingles o Spanish itinuturo ang programa, at tingnan ang entry requirement, kabilang ang English proficiency (IELTS/TOEFL) o Spanish language score.$q$,
    "title_idn" = $q$Riset dan pilih program Anda$q$,
    "description_idn" = $q$Tentukan bidang target Anda: perhotelan, bisnis, logistik, atau bahasa. Pastikan apakah program diajarkan dalam bahasa Inggris atau Spanyol, dan periksa persyaratan masuk termasuk kemampuan bahasa Inggris (IELTS/TOEFL) atau skor bahasa Spanyol.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND step_number = 1 AND title = $q$Research & Choose Your Program$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chuẩn bị và nộp hồ sơ$q$,
    "description_vi" = $q$Chuẩn bị bảng điểm, chứng chỉ tiếng Anh hoặc tiếng Tây Ban Nha, CV, thư động lực và bản sao hộ chiếu. Nộp hồ sơ trực tiếp cho trường qua cổng trực tuyến hoặc thông qua một đại diện giáo dục được ủy quyền.$q$,
    "title_fil" = $q$Ihanda at isumite ang aplikasyon$q$,
    "description_fil" = $q$Ihanda ang transcript, English o Spanish proficiency certificate, CV/resume, motivation letter, at kopya ng pasaporte. Mag-apply nang direkta sa institusyon sa pamamagitan ng online portal nila o ng awtorisadong education agent.$q$,
    "title_idn" = $q$Siapkan dan kirim aplikasi$q$,
    "description_idn" = $q$Kumpulkan transkrip akademik, sertifikat kemampuan bahasa Inggris atau Spanyol, CV, surat motivasi, dan salinan paspor. Daftar langsung ke institusi lewat portal online mereka atau melalui agen pendidikan resmi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND step_number = 2 AND title = $q$Prepare & Submit Application$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhận thư mời và đóng tiền đặt cọc nhập học$q$,
    "description_vi" = $q$Sau khi được nhận, bạn sẽ có thư chấp nhận chính thức. Đóng tiền đặt cọc nhập học để xác nhận chỗ của bạn. Thư này cần thiết cho hồ sơ xin visa.$q$,
    "title_fil" = $q$Kunin ang offer at bayaran ang enrollment deposit$q$,
    "description_fil" = $q$Kapag natanggap ka na, kunin ang opisyal na acceptance letter. Bayaran ang enrollment deposit para makumpirma ang puwesto mo. Kailangan ang liham na ito sa visa application mo.$q$,
    "title_idn" = $q$Terima tawaran dan bayar deposit pendaftaran$q$,
    "description_idn" = $q$Setelah diterima, terima surat penerimaan resmi. Bayar deposit pendaftaran untuk mengonfirmasi tempat Anda. Surat ini diperlukan untuk pengajuan visa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND step_number = 3 AND title = $q$Receive Offer & Pay Enrollment Deposit$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học Tây Ban Nha (Visado de Estudios)$q$,
    "description_vi" = $q$Nộp hồ sơ tại lãnh sự quán hoặc đại sứ quán Tây Ban Nha ở nước bạn. Giấy tờ cần có: thư chấp nhận, chứng minh tài chính đủ (khoảng €700/tháng), bảo hiểm y tế, chứng minh chỗ ở và lý lịch tư pháp sạch. Thời gian xử lý 4-8 tuần.$q$,
    "title_fil" = $q$Mag-apply para sa Spanish Student Visa (Visado de Estudios)$q$,
    "description_fil" = $q$Mag-apply sa konsulado o embahada ng Spain sa bansa mo. Mga kailangang dokumento: acceptance letter, patunay ng sapat na pondo (humigit-kumulang €700/buwan), health insurance, patunay ng tirahan, at malinis na criminal record. Tumatagal ng 4-8 linggo ang pagproseso.$q$,
    "title_idn" = $q$Ajukan Visa Pelajar Spanyol (Visado de Estudios)$q$,
    "description_idn" = $q$Ajukan di konsulat atau kedutaan Spanyol di negara Anda. Dokumen yang diperlukan: surat penerimaan, bukti dana yang cukup (sekitar €700/bulan), asuransi kesehatan, bukti akomodasi, dan catatan kriminal yang bersih. Pemrosesan memakan waktu 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND step_number = 4 AND title = $q$Apply for Spanish Student Visa (Visado de Estudios)$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần nói tiếng Tây Ban Nha để học ở Tây Ban Nha không?$q$,
    "answer_vi" = $q$Không phải lúc nào cũng cần. Nhiều cơ sở tư thục, gồm C3S Business School và IHMGS, có chương trình giảng dạy hoàn toàn bằng tiếng Anh. Tuy nhiên, rất nên học một ít tiếng Tây Ban Nha vì nó cải thiện đáng kể cuộc sống hằng ngày và triển vọng việc làm của bạn ở Tây Ban Nha và khắp Mỹ Latinh.$q$,
    "question_fil" = $q$Kailangan ko bang magsalita ng Spanish para mag-aral sa Spain?$q$,
    "answer_fil" = $q$Hindi palagi. Maraming pribadong institusyon, kabilang ang C3S Business School at IHMGS, ang nag-aalok ng buong English-taught na programa. Gayunpaman, lubos na inirerekomendang matuto ng kaunting Spanish dahil malaki ang naitutulong nito sa araw-araw na buhay at sa job prospect mo sa Spain at sa buong Latin America.$q$,
    "question_idn" = $q$Apakah saya harus bisa berbahasa Spanyol untuk kuliah di Spanyol?$q$,
    "answer_idn" = $q$Tidak selalu. Banyak institusi swasta, termasuk C3S Business School dan IHMGS, menawarkan program yang sepenuhnya berbahasa pengantar Inggris. Namun, sangat disarankan belajar sedikit bahasa Spanyol karena sangat meningkatkan kehidupan sehari-hari dan prospek kerja Anda di Spanyol dan seluruh Amerika Latin.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 1 AND question = $q$Do I need to speak Spanish to study in Spain?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Tây Ban Nha không?$q$,
    "answer_vi" = $q$Có. Sinh viên ngoài EU có visa du học được làm tối đa 20 giờ mỗi tuần trong học kỳ. Bạn cần xin giấy phép lao động dành cho sinh viên (autorización de trabajo) từ cơ quan di trú Tây Ban Nha.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Spain?$q$,
    "answer_fil" = $q$Oo. Puwedeng magtrabaho ang mga non-EU student na may student visa nang hanggang 20 oras kada linggo habang may klase. Kailangan mong mag-apply ng student work authorisation (autorización de trabajo) sa mga immigration authority ng Spain.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Spanyol?$q$,
    "answer_idn" = $q$Bisa. Mahasiswa non-UE dengan visa pelajar boleh bekerja hingga 20 jam per minggu selama masa kuliah. Anda perlu mengajukan otorisasi kerja mahasiswa (autorización de trabajo) dari otoritas imigrasi Spanyol.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 2 AND question = $q$Can I work while studying in Spain?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Visa Búsqueda de Empleo là gì?$q$,
    "answer_vi" = $q$Visa Tìm việc (Búsqueda de Empleo) của Tây Ban Nha cho phép sinh viên quốc tế đã hoàn thành bằng cấp tại một cơ sở Tây Ban Nha ở lại 12 tháng để tìm việc. Visa có thể được chuyển thành giấy phép lao động khi bạn có thư mời làm việc.$q$,
    "question_fil" = $q$Ano ang Búsqueda de Empleo visa?$q$,
    "answer_fil" = $q$Ang Job Search Visa (Búsqueda de Empleo) ng Spain ay nagpapahintulot sa mga international graduate na nakatapos ng degree sa isang institusyon sa Spain na manatili sa Spain nang 12 buwan para maghanap ng trabaho. Maaari itong gawing work permit kapag nakakuha ka ng job offer.$q$,
    "question_idn" = $q$Apa itu visa Búsqueda de Empleo?$q$,
    "answer_idn" = $q$Visa Pencarian Kerja (Búsqueda de Empleo) Spanyol memungkinkan lulusan internasional yang menyelesaikan gelarnya di institusi Spanyol untuk tinggal di Spanyol selama 12 bulan guna mencari pekerjaan. Visa ini dapat diubah menjadi izin kerja setelah Anda mendapat tawaran kerja.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 3 AND question = $q$What is the Búsqueda de Empleo visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Sinh viên sống ở Tây Ban Nha tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Chi phí hằng tháng dao động khoảng €750 đến €1,200 tùy thành phố. Barcelona và Madrid đắt nhất; Valencia và các thành phố nhỏ hơn rẻ hơn đáng kể. Chi phí bao gồm chỗ ở, ăn uống, đi lại và chi tiêu cá nhân.$q$,
    "question_fil" = $q$Magkano ang gastos sa pamumuhay sa Spain bilang estudyante?$q$,
    "answer_fil" = $q$Nasa humigit-kumulang €750 hanggang €1,200 ang buwanang gastos depende sa lungsod. Pinakamahal ang Barcelona at Madrid; mas mura nang malaki ang Valencia at mas maliliit na lungsod. Kasama sa gastos ang tirahan, pagkain, transportasyon, at personal na gastusin.$q$,
    "question_idn" = $q$Berapa biaya hidup di Spanyol sebagai mahasiswa?$q$,
    "answer_idn" = $q$Biaya bulanan berkisar sekitar €750 hingga €1,200 tergantung kota. Barcelona dan Madrid paling mahal; Valencia dan kota-kota yang lebih kecil jauh lebih murah. Biaya mencakup akomodasi, makanan, transportasi, dan pengeluaran pribadi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 4 AND question = $q$How much does it cost to live in Spain as a student?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Bằng của Tây Ban Nha có được công nhận quốc tế không?$q$,
    "answer_vi" = $q$Có. Bằng của các cơ sở Tây Ban Nha được kiểm định được công nhận khắp EU theo Tiến trình Bologna (hệ thống tín chỉ ECTS). Nhiều trường tư cũng cấp bằng do các trường đại học Anh trao (ví dụ OTHM, NCC, Abertay University), mang lại thêm sự công nhận quốc tế.$q$,
    "question_fil" = $q$Kinikilala ba sa buong mundo ang mga degree sa Spain?$q$,
    "answer_fil" = $q$Oo. Kinikilala sa buong EU ang mga degree mula sa mga akreditadong institusyon sa Spain sa ilalim ng Bologna Process (ECTS credit system). Maraming pribadong school din ang nag-aalok ng mga degree na ibinibigay ng mga university sa UK (hal. OTHM, NCC, Abertay University), na nagdaragdag pa ng internasyonal na pagkilala.$q$,
    "question_idn" = $q$Apakah gelar Spanyol diakui secara internasional?$q$,
    "answer_idn" = $q$Ya. Gelar dari institusi Spanyol yang terakreditasi diakui di seluruh UE berdasarkan Proses Bologna (sistem kredit ECTS). Banyak sekolah swasta juga menawarkan gelar yang diberikan universitas Inggris (mis. OTHM, NCC, Abertay University), menambah pengakuan internasional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$spain$q$)
    AND "order" = 5 AND question = $q$Are Spanish degrees recognised internationally?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Spain faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Spain: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$spain$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$spain$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$spain$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
