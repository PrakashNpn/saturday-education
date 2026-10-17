-- Vietnamese, Filipino and Indonesian content for Hungary.
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
    "tagline_vi" = $q$Con đường tiết kiệm vào châu Âu$q$,
    "overview_vi" = $q$Hungary đã lặng lẽ trở thành một trong những điểm đến du học có giá trị tốt hơn của châu Âu, đón 49.458 sinh viên quốc tế trong năm học 2025/2026 tại hơn 60 cơ sở được kiểm định. Các trường y, nha và thú y của Hungary đã giảng dạy bằng tiếng Anh trong nhiều thập kỷ và thu hút sinh viên từ khắp thế giới, trong khi các khoa kỹ thuật và kinh doanh cũng ngày càng được giảng dạy bằng tiếng Anh. Là thành viên của Liên minh châu Âu và khu vực Schengen, bằng cấp của Hungary được công nhận khắp châu Âu, và học phí thấp hơn nhiều so với mức Tây Âu. Chính phủ cũng tài trợ chương trình Stipendium Hungaricum, trao khoảng 5.000 suất học bổng cho sinh viên quốc tế mỗi năm, chi trả học phí, chỗ ở và trợ cấp hằng tháng. Sinh viên tốt nghiệp có thể ở lại tối đa chín tháng để tìm việc.$q$,
    "tagline_fil" = $q$Abot-kayang ruta papasok sa Europa$q$,
    "overview_fil" = $q$Tahimik na naging isa ang Hungary sa mas magandang halaga na destinasyon sa pag-aaral sa Europa, na may 49,458 international student noong 2025/2026 academic year sa mahigit 60 akreditadong institusyon. Ang mga medical, dental, at veterinary school nito ay nagtuturo sa Ingles sa loob ng ilang dekada at umaakit ng mga estudyante mula sa buong mundo, habang dumarami rin ang mga engineering at business faculty na itinuturo sa Ingles. Bilang miyembro ng European Union at Schengen, kinikilala sa buong Europa ang degree sa Hungary, at mas mababa nang malaki ang tuition kaysa sa antas ng Kanlurang Europa. Pinopondohan din ng gobyerno ang Stipendium Hungaricum programme, na nagbibigay ng humigit-kumulang 5,000 scholarship sa mga international student kada taon, na sumasaklaw sa tuition, tirahan, at buwanang stipend. Puwedeng manatili ang mga nagtapos nang hanggang siyam na buwan para maghanap ng trabaho.$q$,
    "tagline_idn" = $q$Jalur terjangkau menuju Eropa$q$,
    "overview_idn" = $q$Hungaria diam-diam menjadi salah satu destinasi studi Eropa dengan nilai lebih baik, menampung 49.458 mahasiswa internasional pada tahun akademik 2025/2026 di lebih dari 60 institusi terakreditasi. Sekolah kedokteran, kedokteran gigi, dan kedokteran hewannya telah mengajar dalam bahasa Inggris selama puluhan tahun dan menarik mahasiswa dari seluruh dunia, sementara fakultas teknik dan bisnisnya juga semakin banyak diajarkan dalam bahasa Inggris. Sebagai anggota Uni Eropa dan Schengen, gelar Hungaria diakui di seluruh Eropa, dan biaya kuliah jauh di bawah tingkat Eropa Barat. Pemerintah juga mendanai program Stipendium Hungaricum, yang memberikan sekitar 5.000 beasiswa kepada mahasiswa internasional setiap tahun, mencakup biaya kuliah, akomodasi, dan tunjangan bulanan. Lulusan dapat tinggal hingga sembilan bulan untuk mencari kerja.$q$
  WHERE slug = $q$hungary$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bằng cấp châu Âu với chi phí chỉ bằng một phần nhỏ$q$,
    "description_vi" = $q$Học phí tại các cơ sở của Hungary thường từ EUR 1,200 đến EUR 5,000 mỗi năm, so với gấp nhiều lần ở Tây Âu, và chi phí sinh hoạt còn thấp hơn nữa. Bằng cấp vẫn là văn bằng của Liên minh châu Âu, được công nhận khắp khối.$q$,
    "title_fil" = $q$Mga European degree sa maliit na bahagi ng gastos$q$,
    "description_fil" = $q$Karaniwang nasa EUR 1,200 hanggang EUR 5,000 kada taon ang tuition sa mga institusyon sa Hungary, kumpara sa ilang ulit nito sa Kanlurang Europa, at mas mababa pa ang gastos sa pamumuhay. European Union qualification pa rin ang degree, kinikilala sa buong bloc.$q$,
    "title_idn" = $q$Gelar Eropa dengan sebagian kecil biaya$q$,
    "description_idn" = $q$Biaya kuliah di institusi Hungaria biasanya berkisar antara EUR 1,200 dan EUR 5,000 per tahun, dibandingkan berkali-kali lipat di Eropa Barat, dan biaya hidup lebih rendah lagi. Gelarnya tetap kualifikasi Uni Eropa, diakui di seluruh blok.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 1 AND title = $q$European Degrees at a Fraction of the Cost$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Ngôi nhà lâu đời của ngành Y và Nha khoa$q$,
    "description_vi" = $q$Các trường y và nha của Hungary đã giảng dạy bằng tiếng Anh trong nhiều thập kỷ và là con đường quen thuộc với sinh viên quốc tế. Y và Nha khoa tốn hơn, khoảng EUR 12,000 đến EUR 16,000 mỗi năm, nhưng vẫn thấp hơn nhiều so với mức tương đương ở Anh, Úc hoặc Mỹ.$q$,
    "title_fil" = $q$Matagal nang tahanan ng Medicine at Dentistry$q$,
    "description_fil" = $q$Ang mga medical at dental school sa Hungary ay nagtuturo na sa Ingles sa loob ng ilang dekada at isa itong kilalang ruta para sa mga international student. Mas mahal ang Medicine at Dentistry, nasa EUR 12,000 hanggang EUR 16,000 kada taon, pero mas mababa pa rin nang malaki kaysa sa katumbas sa United Kingdom, Australia, o United States.$q$,
    "title_idn" = $q$Rumah lama bagi Kedokteran dan Kedokteran Gigi$q$,
    "description_idn" = $q$Sekolah kedokteran dan kedokteran gigi Hungaria telah mengajar dalam bahasa Inggris selama puluhan tahun dan menjadi rute yang sudah umum bagi mahasiswa internasional. Kedokteran dan kedokteran gigi lebih mahal, sekitar EUR 12,000 hingga EUR 16,000 per tahun, tetapi tetap jauh di bawah yang setara di Inggris, Australia, atau Amerika Serikat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 2 AND title = $q$A Long Established Home for Medicine and Dentistry$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Khoảng 5.000 suất học bổng chính phủ mỗi năm$q$,
    "description_vi" = $q$Chương trình Stipendium Hungaricum do chính phủ Hungary tài trợ trao khoảng 5.000 suất học bổng cho sinh viên quốc tế mỗi năm. Học bổng chi trả toàn bộ học phí, cung cấp chỗ ở ký túc xá hoặc hỗ trợ tiền nhà, trợ cấp hằng tháng và bảo hiểm y tế.$q$,
    "title_fil" = $q$Humigit-kumulang 5,000 scholarship ng gobyerno kada taon$q$,
    "description_fil" = $q$Ang Stipendium Hungaricum programme, na pinopondohan ng gobyerno ng Hungary, ay nagbibigay ng humigit-kumulang 5,000 scholarship sa mga international student taun-taon. Sinasaklaw ng mga award ang buong tuition, nagbibigay ng dormitory accommodation o housing contribution, buwanang stipend, at medical insurance.$q$,
    "title_idn" = $q$Sekitar 5.000 beasiswa pemerintah setiap tahun$q$,
    "description_idn" = $q$Program Stipendium Hungaricum, yang didanai pemerintah Hungaria, memberikan sekitar 5.000 beasiswa kepada mahasiswa internasional setiap tahun. Beasiswa mencakup biaya kuliah penuh, menyediakan akomodasi asrama atau kontribusi perumahan, tunjangan bulanan, dan asuransi kesehatan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 3 AND title = $q$Around 5,000 Government Scholarships Each Year$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Tiếp cận Schengen và con đường ở lại$q$,
    "description_vi" = $q$Hungary nằm trong cả Liên minh châu Âu và khu vực Schengen, nên giấy phép cư trú sinh viên cho phép bạn đi lại khắp khu vực. Sau khi tốt nghiệp, bạn có thể xin giấy phép cư trú chuyển từ học sang làm việc và ở lại tối đa chín tháng trong khi tìm việc.$q$,
    "title_fil" = $q$Schengen access at ruta para manatili$q$,
    "description_fil" = $q$Nasa European Union at Schengen area ang Hungary, kaya pinapayagan ka ng student residence permit na maglakbay sa buong zone. Pagkatapos magtapos, puwede kang mag-apply ng study to work residence permit at manatili nang hanggang siyam na buwan habang naghahanap ng trabaho.$q$,
    "title_idn" = $q$Akses Schengen dan jalur untuk tetap tinggal$q$,
    "description_idn" = $q$Hungaria berada di Uni Eropa dan wilayah Schengen, sehingga izin tinggal pelajar memungkinkan Anda bepergian ke seluruh zona. Setelah lulus, Anda dapat mengajukan izin tinggal peralihan studi ke kerja dan tinggal hingga sembilan bulan sambil mencari pekerjaan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 4 AND title = $q$Schengen Access and a Route to Stay On$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn chương trình và kiểm tra ngôn ngữ$q$,
    "description_vi" = $q$Xác nhận chương trình dạy bằng tiếng Anh và bằng cấp của bạn đáp ứng điều kiện đầu vào. Hầu hết các cơ sở yêu cầu IELTS hoặc tương đương, và các chương trình y thường thêm bài thi đầu vào về sinh học và hóa học.$q$,
    "title_fil" = $q$Piliin ang programa at tingnan ang wika$q$,
    "description_fil" = $q$Kumpirmahin na sa Ingles itinuturo ang degree at natutugunan ng kwalipikasyon mo ang entry requirement. Karamihan ng institusyon ay humihingi ng IELTS o katumbas, at karaniwang may dagdag na entrance examination sa biology at chemistry ang mga medical programme.$q$,
    "title_idn" = $q$Pilih program Anda dan periksa bahasa$q$,
    "description_idn" = $q$Pastikan gelar diajarkan dalam bahasa Inggris dan kualifikasi Anda memenuhi persyaratan masuk. Sebagian besar institusi meminta IELTS atau setara, dan program kedokteran biasanya menambahkan ujian masuk biologi dan kimia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND step_number = 1 AND title = $q$Choose your programme and check the language$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ vào trường, hoặc xin học bổng Stipendium Hungaricum$q$,
    "description_vi" = $q$Bạn có thể nộp hồ sơ trực tiếp cho cơ sở giáo dục, hoặc qua chương trình Stipendium Hungaricum nếu nước bạn có thỏa thuận với Hungary. Con đường học bổng có hạn nộp riêng, thường vào tháng 1, và hồ sơ đi qua cơ quan cử đi của nước bạn.$q$,
    "title_fil" = $q$Mag-apply sa university, o para sa Stipendium Hungaricum award$q$,
    "description_fil" = $q$Puwede kang mag-apply nang direkta sa institusyon, o sa pamamagitan ng Stipendium Hungaricum programme kung may kasunduan ang bansa mo sa Hungary. May sarili nitong deadline ang scholarship route, karaniwang sa January, at dumadaan ang mga aplikasyon sa sending authority ng bansa mo.$q$,
    "title_idn" = $q$Daftar ke universitas, atau ke beasiswa Stipendium Hungaricum$q$,
    "description_idn" = $q$Anda dapat mendaftar langsung ke institusi, atau melalui program Stipendium Hungaricum jika negara Anda memiliki perjanjian dengan Hungaria. Jalur beasiswa memiliki tenggat sendiri, biasanya pada Januari, dan pendaftaran melalui otoritas pengirim negara asal Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND step_number = 2 AND title = $q$Apply to the university, or for a Stipendium Hungaricum award$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chấp nhận thư mời và chuẩn bị tài chính$q$,
    "description_vi" = $q$Đóng tiền đặt cọc (nếu có) và chuẩn bị chứng minh tài chính. Từ năm 2025, ứng viên ngoài Liên minh châu Âu được yêu cầu chứng minh khoảng EUR 1,200 mỗi tháng cho sinh hoạt, tăng đáng kể so với yêu cầu trước đây, vì vậy hãy chuẩn bị ngân sách sớm.$q$,
    "title_fil" = $q$Tanggapin ang offer at ihanda ang pondo$q$,
    "description_fil" = $q$Bayaran ang anumang deposit at ihanda ang patunay ng pondo. Mula 2025, hinihingan ang mga non European Union applicant na ipakita ang humigit-kumulang EUR 1,200 kada buwan para sa gastos sa pamumuhay, malaking pagtaas sa dating requirement, kaya paghandaan ito nang maaga.$q$,
    "title_idn" = $q$Terima tawaran dan siapkan keuangan$q$,
    "description_idn" = $q$Bayar deposit apa pun dan kumpulkan bukti dana. Sejak 2025, pelamar non-Uni Eropa diminta menunjukkan sekitar EUR 1,200 per bulan untuk biaya hidup, kenaikan signifikan dari persyaratan sebelumnya, jadi siapkan anggaran sejak dini.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND step_number = 3 AND title = $q$Accept your offer and prepare your finances$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa Loại D và nhận giấy phép cư trú$q$,
    "description_vi" = $q$Nộp hồ sơ xin visa quốc gia Loại D tại cơ quan đại diện Hungary ở nước bạn, cần dự trù 30 đến 60 ngày xử lý. Sau khi đến, bạn phải lấy giấy phép cư trú sinh viên trong vòng 30 ngày. Giấy phép được cấp một năm và gia hạn hằng năm trong suốt thời gian khóa học.$q$,
    "title_fil" = $q$Mag-apply para sa Type D visa at kunin ang residence permit$q$,
    "description_fil" = $q$Mag-apply para sa national Type D visa sa Hungarian mission sa bansa mo, maglaan ng 30 hanggang 60 araw para sa pagproseso. Pagkadating, kailangan mong makuha ang student residence permit mo sa loob ng 30 araw. Isang taon itong ibinibigay at nire-renew taun-taon sa haba ng kurso mo.$q$,
    "title_idn" = $q$Ajukan visa Tipe D dan ambil izin tinggal Anda$q$,
    "description_idn" = $q$Ajukan visa nasional Tipe D di perwakilan Hungaria di negara Anda, sediakan waktu 30 hingga 60 hari untuk pemrosesan. Setelah tiba, Anda harus memperoleh izin tinggal pelajar dalam 30 hari. Izin diterbitkan untuk satu tahun dan diperpanjang setiap tahun selama masa program Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND step_number = 4 AND title = $q$Apply for a Type D visa and collect your residence permit$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể học bằng tiếng Anh ở Hungary không?$q$,
    "answer_vi" = $q$Có. Hungary đã cung cấp các chương trình giảng dạy bằng tiếng Anh trong nhiều thập kỷ, đặc biệt trong y khoa, nha khoa và thú y, và ngày càng nhiều trong kỹ thuật, công nghệ thông tin và kinh doanh. Bạn không cần tiếng Hungary để học, dù biết một ít sẽ giúp cuộc sống hằng ngày dễ dàng hơn.$q$,
    "question_fil" = $q$Puwede ba akong mag-aral sa Ingles sa Hungary?$q$,
    "answer_fil" = $q$Oo. Matagal nang nag-aalok ang Hungary ng mga English-taught na degree, lalo na sa medicine, dentistry, at veterinary science, at dumarami sa engineering, information technology, at business. Hindi mo kailangan ng Hungarian para mag-aral, bagama't mas madali ang araw-araw na buhay kapag may alam ka.$q$,
    "question_idn" = $q$Bisakah saya kuliah dalam bahasa Inggris di Hungaria?$q$,
    "answer_idn" = $q$Bisa. Hungaria telah menawarkan gelar berbahasa pengantar Inggris selama puluhan tahun, terutama di bidang kedokteran, kedokteran gigi, dan kedokteran hewan, dan semakin banyak di bidang teknik, teknologi informasi, dan bisnis. Anda tidak memerlukan bahasa Hungaria untuk kuliah, meskipun belajar sedikit membuat kehidupan sehari-hari lebih mudah.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 1 AND question = $q$Can I study in English in Hungary?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Học bằng cấp ở Hungary tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Hầu hết các chương trình từ EUR 1,200 đến EUR 5,000 mỗi năm. Y và Nha khoa là ngoại lệ, khoảng EUR 12,000 đến EUR 16,000 mỗi năm. Chi phí sinh hoạt cộng thêm khoảng EUR 500 đến EUR 800 mỗi tháng tùy thành phố, trong đó Budapest ở mức cao hơn.$q$,
    "question_fil" = $q$Magkano ang degree sa Hungary?$q$,
    "answer_fil" = $q$Karamihan ng programa ay nasa EUR 1,200 hanggang EUR 5,000 kada taon. Exception ang Medicine at Dentistry na nasa EUR 12,000 hanggang EUR 16,000 kada taon. Nadaragdagan ng humigit-kumulang EUR 500 hanggang EUR 800 kada buwan ang gastos sa pamumuhay depende sa lungsod, at mas mataas ang Budapest.$q$,
    "question_idn" = $q$Berapa biaya gelar di Hungaria?$q$,
    "answer_idn" = $q$Sebagian besar program berkisar antara EUR 1,200 dan EUR 5,000 per tahun. Kedokteran dan kedokteran gigi adalah pengecualian, sekitar EUR 12,000 hingga EUR 16,000 per tahun. Biaya hidup menambah sekitar EUR 500 hingga EUR 800 per bulan tergantung kota, dengan Budapest di kisaran yang lebih tinggi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 2 AND question = $q$How much does a degree in Hungary cost?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm không?$q$,
    "answer_vi" = $q$Có. Giấy phép cư trú sinh viên cho phép làm việc tối đa 30 giờ mỗi tuần trong học kỳ, và làm toàn thời gian tối đa 90 ngày mỗi năm ngoài học kỳ. Làm thêm sẽ giúp trang trải sinh hoạt nhưng không nên trông cậy để chi trả học phí.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral?$q$,
    "answer_fil" = $q$Oo. Pinapayagan ng student residence permit ang hanggang 30 oras na trabaho kada linggo habang may klase, at full-time na trabaho nang hanggang 90 araw kada taon sa labas ng klase. Makakatulong ang part-time na trabaho sa gastos sa pamumuhay pero hindi dapat asahan para bayaran ang tuition.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah?$q$,
    "answer_idn" = $q$Bisa. Izin tinggal pelajar mengizinkan hingga 30 jam kerja per minggu selama semester, dan kerja penuh waktu hingga 90 hari per tahun di luar semester. Kerja paruh waktu akan membantu biaya hidup tetapi tidak boleh diandalkan untuk menutup biaya kuliah.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 3 AND question = $q$Can I work while I study?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Có những học bổng nào?$q$,
    "answer_vi" = $q$Học bổng chính là Stipendium Hungaricum, chương trình của chính phủ Hungary trao khoảng 5.000 suất mỗi năm. Học bổng chi trả toàn bộ học phí, chỗ ở hoặc hỗ trợ tiền nhà, trợ cấp hằng tháng và bảo hiểm y tế. Từng trường đại học cũng có các suất hỗ trợ một phần riêng.$q$,
    "question_fil" = $q$Anong mga scholarship ang available?$q$,
    "answer_fil" = $q$Ang pangunahin ay ang Stipendium Hungaricum, programa ng gobyerno ng Hungary na nagbibigay ng humigit-kumulang 5,000 scholarship kada taon. Sinasaklaw nito ang buong tuition, tirahan o housing contribution, buwanang stipend, at medical insurance. May sarili ring partial award ang mga indibidwal na university.$q$,
    "question_idn" = $q$Beasiswa apa saja yang tersedia?$q$,
    "answer_idn" = $q$Yang utama adalah Stipendium Hungaricum, program pemerintah Hungaria yang memberikan sekitar 5.000 beasiswa per tahun. Beasiswa mencakup biaya kuliah penuh, akomodasi atau kontribusi perumahan, tunjangan bulanan, dan asuransi kesehatan. Universitas masing-masing juga menawarkan bantuan sebagian sendiri.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 4 AND question = $q$What scholarships are available?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại Hungary sau khi tốt nghiệp không?$q$,
    "answer_vi" = $q$Có. Sinh viên tốt nghiệp các cơ sở của Hungary có thể xin giấy phép cư trú chuyển từ học sang làm việc và ở lại tối đa chín tháng để tìm việc. Bạn phải nộp đơn chậm nhất 15 ngày trước khi giấy phép cư trú sinh viên hết hạn, vì vậy hãy lên kế hoạch trước khi kết thúc khóa học.$q$,
    "question_fil" = $q$Puwede ba akong manatili sa Hungary pagkatapos magtapos?$q$,
    "answer_fil" = $q$Oo. Puwedeng mag-apply ang mga nagtapos sa mga institusyon sa Hungary ng study to work residence permit at manatili nang hanggang siyam na buwan para maghanap ng trabaho. Kailangan mong mag-apply nang hindi lalampas sa 15 araw bago mag-expire ang student residence permit mo, kaya planuhin ito bago ka matapos.$q$,
    "question_idn" = $q$Bisakah saya tinggal di Hungaria setelah lulus?$q$,
    "answer_idn" = $q$Bisa. Lulusan institusi Hungaria dapat mengajukan izin tinggal peralihan studi ke kerja dan tinggal hingga sembilan bulan untuk mencari pekerjaan. Anda harus mengajukan paling lambat 15 hari sebelum izin tinggal pelajar Anda berakhir, jadi rencanakan sebelum Anda selesai.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$hungary$q$)
    AND "order" = 5 AND question = $q$Can I stay in Hungary after I graduate?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Hungary faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Hungary: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$hungary$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$hungary$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$hungary$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
