-- Vietnamese, Filipino and Indonesian content for Belgium.
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
    "tagline_vi" = $q$Chỗ ngồi hàng đầu để theo dõi chính sách và kinh doanh của EU$q$,
    "overview_vi" = $q$Bỉ có tầm ảnh hưởng vượt xa quy mô của mình với tư cách một điểm đến du học, đón hơn 55.000 sinh viên quốc tế, khoảng 10 phần trăm tổng số sinh viên, trong một hệ thống chia thành các cộng đồng nói tiếng Flemish, tiếng Pháp và tiếng Đức, mỗi cộng đồng có các trường đại học và cao đẳng riêng. Riêng KU Leuven, trường đại học xếp hạng cao nhất cả nước, đã thu hút hàng chục nghìn sinh viên quốc tế, và vai trò thủ đô trên thực tế của Liên minh châu Âu của Brussels khiến Bỉ trở thành cơ sở tự nhiên cho sinh viên ngành luật, khoa học chính trị, quan hệ quốc tế và kinh doanh. Học phí cho sinh viên ngoài EU thường từ EUR 2,000 đến EUR 18,000 mỗi năm tùy cơ sở và vùng, thấp hơn nhiều so với các chương trình tương đương ở Anh hoặc Mỹ, và các chương trình giảng dạy bằng tiếng Hà Lan, tiếng Pháp và tiếng Anh đều phổ biến. Sau khi tốt nghiệp, sinh viên ngoài EU có thể gia hạn cư trú 12 tháng để tìm việc hoặc khởi nghiệp.$q$,
    "tagline_fil" = $q$Front row seat sa patakaran at negosyo ng EU$q$,
    "overview_fil" = $q$Higit na higit ang naaabot ng Belgium kaysa sa laki nito bilang destinasyon sa pag-aaral, na may mahigit 55,000 international student, humigit-kumulang 10 porsiyento ng kabuuang populasyon ng estudyante, sa isang sistemang nahahati sa mga komunidad na nagsasalita ng Flemish, French, at German, na may kanya-kanyang university at university college. Ang KU Leuven lang, ang pinakamataas ang ranggong university sa bansa, ay may libu-libong international student, at dahil sa papel ng Brussels bilang de facto na kabisera ng European Union, natural na base ang Belgium para sa mga estudyante ng law, political science, international relations, at business. Karaniwang nasa EUR 2,000 hanggang EUR 18,000 kada taon ang tuition para sa mga non-EU student depende sa institusyon at rehiyon, mas mababa nang malaki kaysa sa mga katumbas na programa sa UK o US, at malawak na available ang mga programang itinuturo sa Dutch, French, at Ingles. Pagkatapos magtapos, puwedeng i-extend ng mga non-EU student ang kanilang paninirahan nang 12 buwan para maghanap ng trabaho o magsimula ng negosyo.$q$,
    "tagline_idn" = $q$Kursi barisan depan untuk kebijakan dan bisnis UE$q$,
    "overview_idn" = $q$Belgia memiliki pengaruh yang jauh melampaui ukurannya sebagai destinasi studi, menampung lebih dari 55.000 mahasiswa internasional, sekitar 10 persen dari total populasi mahasiswa, dalam sistem yang terbagi menjadi komunitas berbahasa Flemish, Prancis, dan Jerman, masing-masing dengan universitas dan university college sendiri. KU Leuven saja, universitas berperingkat tertinggi di negara ini, menerima puluhan ribu mahasiswa internasional, dan peran Brussels sebagai ibu kota de facto Uni Eropa menjadikan Belgia basis alami bagi mahasiswa hukum, ilmu politik, hubungan internasional, dan bisnis. Biaya kuliah bagi mahasiswa non-UE biasanya berkisar dari EUR 2,000 hingga EUR 18,000 per tahun tergantung institusi dan wilayah, jauh di bawah program setara di Inggris atau AS, dan program berbahasa pengantar Belanda, Prancis, dan Inggris semuanya tersedia luas. Setelah lulus, mahasiswa non-UE dapat memperpanjang izin tinggal selama 12 bulan untuk mencari kerja atau memulai bisnis.$q$
  WHERE slug = $q$belgium$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Chỗ ngồi hàng đầu tại các thể chế EU$q$,
    "description_vi" = $q$Brussels là nơi đặt trụ sở của Liên minh châu Âu, NATO và hàng trăm tổ chức quốc tế cùng công ty vận động hành lang, giúp sinh viên ngành luật, khoa học chính trị và quan hệ quốc tế tiếp cận trực tiếp cơ hội thực tập và mạng lưới quan hệ mà rất ít thành phố khác sánh được.$q$,
    "title_fil" = $q$Front row seat sa mga institusyon ng EU$q$,
    "description_fil" = $q$Tahanan ang Brussels ng headquarters ng European Union, NATO, at daan-daang internasyonal na organisasyon at lobbying firm, kaya may direktang access ang mga estudyante ng law, political science, at international relations sa mga internship at network na kakaunting lungsod ang makakatapat.$q$,
    "title_idn" = $q$Kursi barisan depan di lembaga-lembaga UE$q$,
    "description_idn" = $q$Brussels menjadi markas Uni Eropa, NATO, dan ratusan organisasi internasional serta firma lobi, memberi mahasiswa hukum, ilmu politik, dan hubungan internasional akses langsung ke magang dan jaringan yang sulit ditandingi kota lain.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 1 AND title = $q$A Front Row Seat to EU Institutions$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Học phí hợp lý cho bằng cấp Tây Âu$q$,
    "description_vi" = $q$Học phí cho sinh viên ngoài EU thường từ EUR 2,000 đến EUR 18,000 mỗi năm, thấp hơn nhiều so với các chương trình tương đương ở Anh hoặc Mỹ, trong đó các trường công lập như KU Leuven và Ghent University mang lại giá trị tốt ở mức thấp của khoảng này.$q$,
    "title_fil" = $q$Abot-kayang tuition para sa degree na Kanlurang Europa$q$,
    "description_fil" = $q$Karaniwang nasa EUR 2,000 hanggang EUR 18,000 kada taon ang tuition para sa mga non-EU student, mas mababa nang malaki kaysa sa mga katumbas na programa sa UK o US, kung saan ang mga pampublikong university gaya ng KU Leuven at Ghent University ay nag-aalok ng magandang halaga sa mababang dulo ng saklaw na iyon.$q$,
    "title_idn" = $q$Biaya kuliah terjangkau untuk gelar Eropa Barat$q$,
    "description_idn" = $q$Biaya kuliah bagi mahasiswa non-UE biasanya berkisar dari EUR 2,000 hingga EUR 18,000 per tahun, jauh di bawah program sebanding di Inggris atau AS, dengan universitas negeri seperti KU Leuven dan Ghent University menawarkan nilai yang baik di kisaran bawah itu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 2 AND title = $q$Affordable Tuition for a Western European Degree$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Môi trường đa ngôn ngữ thực thụ$q$,
    "description_vi" = $q$Bỉ chia thành các cộng đồng nói tiếng Hà Lan, tiếng Pháp và tiếng Đức, và hầu hết các trường đại học cũng ngày càng mở nhiều chương trình giảng dạy hoàn toàn bằng tiếng Anh, nên sinh viên tốt nghiệp được tiếp xúc với nhiều ngôn ngữ trong một đất nước nhỏ, dễ di chuyển.$q$,
    "title_fil" = $q$Tunay na multilingual na kapaligiran$q$,
    "description_fil" = $q$Nahahati ang Belgium sa mga komunidad na nagsasalita ng Dutch, French, at German, at karamihan ng university ay nag-aalok din ng dumaraming programang itinuturo nang buo sa Ingles, kaya nagtatapos ang mga estudyante na may exposure sa ilang wika sa loob ng iisang maliit at madaling libutin na bansa.$q$,
    "title_idn" = $q$Lingkungan yang benar-benar multibahasa$q$,
    "description_idn" = $q$Belgia terbagi menjadi komunitas berbahasa Belanda, Prancis, dan Jerman, dan sebagian besar universitas juga mengajar semakin banyak program sepenuhnya dalam bahasa Inggris, sehingga mahasiswa lulus dengan paparan beberapa bahasa di dalam satu negara kecil yang mudah dijelajahi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 3 AND title = $q$A Genuinely Multilingual Environment$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Một năm để tìm việc sau khi tốt nghiệp$q$,
    "description_vi" = $q$Sinh viên tốt nghiệp ngoài EU có thể xin gia hạn giấy phép cư trú thêm 12 tháng để tìm việc hoặc khởi nghiệp, tạo một khoảng thời gian rõ ràng để biến bằng cấp của Bỉ thành kinh nghiệm làm việc tại địa phương.$q$,
    "title_fil" = $q$Isang taon para maghanap ng trabaho pagkatapos magtapos$q$,
    "description_fil" = $q$Puwedeng mag-apply ang mga non-EU graduate ng 12-buwang extension sa kanilang residence permit para maghanap ng trabaho o magsimula ng negosyo, na nagbibigay ng malinaw na panahon para gawing lokal na karanasan sa trabaho ang degree sa Belgium.$q$,
    "title_idn" = $q$Satu tahun untuk mencari kerja setelah lulus$q$,
    "description_idn" = $q$Lulusan non-UE dapat mengajukan perpanjangan izin tinggal 12 bulan untuk mencari pekerjaan atau memulai bisnis, memberi landasan yang jelas untuk mengubah gelar Belgia menjadi pengalaman kerja lokal.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 4 AND title = $q$A Year to Search for Work After Graduating$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn vùng, cơ sở giáo dục và ngôn ngữ giảng dạy$q$,
    "description_vi" = $q$Các cộng đồng Flemish, Pháp và Đức của Bỉ tự quản lý các trường đại học của mình, vì vậy hãy xác nhận chương trình dạy bằng tiếng Hà Lan, tiếng Pháp hay tiếng Anh, và kiểm tra hạn nộp hồ sơ cụ thể của cộng đồng đó.$q$,
    "title_fil" = $q$Piliin ang rehiyon, institusyon, at wika ng pagtuturo$q$,
    "description_fil" = $q$Kanya-kanyang kinokontrol ng mga komunidad ng Flemish, French, at German sa Belgium ang sarili nilang university, kaya kumpirmahin kung sa Dutch, French, o Ingles itinuturo ang programa mo, at tingnan ang mga partikular na deadline ng aplikasyon para sa komunidad na iyon.$q$,
    "title_idn" = $q$Pilih wilayah, institusi, dan bahasa pengantar$q$,
    "description_idn" = $q$Komunitas Flemish, Prancis, dan Jerman di Belgia masing-masing mengatur universitasnya sendiri, jadi pastikan apakah program Anda diajarkan dalam bahasa Belanda, Prancis, atau Inggris, dan periksa tenggat pendaftaran khusus untuk komunitas tersebut.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND step_number = 1 AND title = $q$Choose your region, institution and language of instruction$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ trực tiếp cho trường$q$,
    "description_vi" = $q$Hồ sơ được nộp trực tiếp cho cơ sở giáo dục chứ không qua cổng trung tâm. Ứng viên ngoài EU thường cần bảng điểm, chứng chỉ tiếng Anh hoặc ngôn ngữ, và trong một số trường hợp là bước đánh giá tương đương sơ bộ đối với bằng cấp nước ngoài.$q$,
    "title_fil" = $q$Direktang mag-apply sa university$q$,
    "description_fil" = $q$Direktang sa institusyon ipinapasa ang mga aplikasyon, hindi sa sentral na portal. Karaniwang kailangan ng mga non-EU applicant ang transcript, English o language proficiency certificate, at sa ilang kaso ay paunang equivalence check sa mga banyagang kwalipikasyon.$q$,
    "title_idn" = $q$Daftar langsung ke universitas$q$,
    "description_idn" = $q$Pendaftaran dikirim langsung ke institusi, bukan melalui portal pusat. Pelamar non-UE biasanya memerlukan transkrip akademik, sertifikat kemampuan bahasa Inggris atau bahasa lain, dan dalam beberapa kasus pemeriksaan kesetaraan awal atas kualifikasi asing.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND step_number = 2 AND title = $q$Apply directly to the university$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chứng minh tài chính và xin visa Loại D$q$,
    "description_vi" = $q$Sinh viên ngoài EU phải chứng minh khả năng chi trả sinh hoạt, EUR 1,062 mỗi tháng cho năm 2026/2027, và xin visa dài hạn Loại D tại đại sứ quán hoặc lãnh sự quán Bỉ ở nước mình.$q$,
    "title_fil" = $q$Patunayan ang pondo mo at mag-apply para sa Type D visa$q$,
    "description_fil" = $q$Kailangang ipakita ng mga non-EU student ang means of subsistence, EUR 1,062 kada buwan para sa 2026/2027, at mag-apply para sa long-stay Type D visa sa embahada o konsulado ng Belgium sa bansa nila.$q$,
    "title_idn" = $q$Buktikan keuangan Anda dan ajukan visa Tipe D$q$,
    "description_idn" = $q$Mahasiswa non-UE harus menunjukkan sarana penghidupan, EUR 1,062 per bulan untuk tahun 2026/2027, dan mengajukan visa jangka panjang Tipe D di kedutaan atau konsulat Belgia di negara asal.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND step_number = 3 AND title = $q$Prove your finances and apply for a Type D visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và đăng ký với chính quyền địa phương$q$,
    "description_vi" = $q$Sau khi đến, hãy đăng ký với commune hoặc gemeente nơi bạn sống để nhận giấy phép cư trú. Văn phòng quốc tế của trường thường hướng dẫn sinh viên mới thực hiện bước này trong buổi định hướng.$q$,
    "title_fil" = $q$Dumating at magparehistro sa lokal na municipality$q$,
    "description_fil" = $q$Pagkadating, magparehistro sa commune o gemeente kung saan ka nakatira para makuha ang residence permit mo. Karaniwang ginagabayan ng international office ng university ang mga bagong estudyante sa hakbang na ito sa orientation.$q$,
    "title_idn" = $q$Tiba dan daftar ke pemerintah daerah setempat$q$,
    "description_idn" = $q$Setelah tiba, daftar ke commune atau gemeente tempat Anda tinggal untuk menerima izin tinggal. Kantor internasional universitas biasanya membimbing mahasiswa baru melalui langkah ini selama orientasi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND step_number = 4 AND title = $q$Arrive and register with your local municipality$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần nói tiếng Hà Lan hoặc tiếng Pháp để học ở Bỉ không?$q$,
    "answer_vi" = $q$Không phải với mọi chương trình. Ngày càng nhiều bằng cấp, đặc biệt ở bậc sau đại học, được giảng dạy hoàn toàn bằng tiếng Anh, dù nhiều chương trình cử nhân vẫn dạy bằng tiếng Hà Lan hoặc tiếng Pháp tùy cộng đồng. Hãy xác nhận ngôn ngữ giảng dạy trước khi nộp hồ sơ.$q$,
    "question_fil" = $q$Kailangan ko bang magsalita ng Dutch o French para mag-aral sa Belgium?$q$,
    "answer_fil" = $q$Hindi para sa bawat programa. Dumaraming degree, lalo na sa postgraduate level, ang itinuturo nang buo sa Ingles, bagama't marami pa ring bachelor's programme ang itinuturo sa Dutch o French depende sa komunidad. Kumpirmahin ang wika ng pagtuturo bago mag-apply.$q$,
    "question_idn" = $q$Apakah saya harus bisa berbahasa Belanda atau Prancis untuk kuliah di Belgia?$q$,
    "answer_idn" = $q$Tidak untuk setiap program. Semakin banyak gelar, terutama di tingkat pascasarjana, diajarkan sepenuhnya dalam bahasa Inggris, meskipun banyak program sarjana masih disampaikan dalam bahasa Belanda atau Prancis tergantung komunitasnya. Pastikan bahasa pengantar sebelum mendaftar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 1 AND question = $q$Do I need to speak Dutch or French to study in Belgium?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Du học Bỉ tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Học phí cho sinh viên ngoài EU thường từ EUR 2,000 đến EUR 18,000 mỗi năm tùy cơ sở và chương trình. Chi phí sinh hoạt cộng thêm khoảng EUR 900 đến EUR 1,200 mỗi tháng, trong đó Brussels ở mức cao hơn.$q$,
    "question_fil" = $q$Magkano ang gastos sa pag-aaral sa Belgium?$q$,
    "answer_fil" = $q$Karaniwang nasa EUR 2,000 hanggang EUR 18,000 kada taon ang tuition para sa mga non-EU student depende sa institusyon at programa. Nadaragdagan ng humigit-kumulang EUR 900 hanggang EUR 1,200 kada buwan ang gastos sa pamumuhay, at mas mataas ang Brussels.$q$,
    "question_idn" = $q$Berapa biaya kuliah di Belgia?$q$,
    "answer_idn" = $q$Biaya kuliah bagi mahasiswa non-UE biasanya berkisar dari EUR 2,000 hingga EUR 18,000 per tahun tergantung institusi dan program. Biaya hidup menambah sekitar EUR 900 hingga EUR 1,200 per bulan, dengan Brussels di kisaran yang lebih tinggi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 2 AND question = $q$How much does it cost to study in Belgium?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Bỉ không?$q$,
    "answer_vi" = $q$Có. Sinh viên quốc tế được làm việc tối đa 20 giờ mỗi tuần trong học kỳ theo giấy phép lao động dành cho sinh viên, và làm toàn thời gian trong các kỳ nghỉ chính thức của trường.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Belgium?$q$,
    "answer_fil" = $q$Oo. Puwedeng magtrabaho ang mga international student nang hanggang 20 oras kada linggo habang may klase sa ilalim ng student work permit, at full-time tuwing opisyal na bakasyon ng university.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Belgia?$q$,
    "answer_idn" = $q$Bisa. Mahasiswa internasional boleh bekerja hingga 20 jam per minggu selama semester dengan izin kerja mahasiswa, dan penuh waktu selama libur resmi universitas.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 3 AND question = $q$Can I work while studying in Belgium?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi cần chứng minh bao nhiêu tiền để xin visa du học Bỉ?$q$,
    "answer_vi" = $q$Với năm học 2026/2027, bạn cần chứng minh khả năng chi trả sinh hoạt EUR 1,062 ròng mỗi tháng, khoảng EUR 12,700 cho cả năm.$q$,
    "question_fil" = $q$Magkano ang kailangan kong ipakita para sa Belgian student visa?$q$,
    "answer_fil" = $q$Para sa 2026/2027 academic year, kailangan mong ipakita ang means of subsistence na EUR 1,062 net kada buwan, humigit-kumulang EUR 12,700 para sa buong taon.$q$,
    "question_idn" = $q$Berapa dana yang harus saya tunjukkan untuk visa pelajar Belgia?$q$,
    "answer_idn" = $q$Untuk tahun akademik 2026/2027, Anda perlu menunjukkan sarana penghidupan sebesar EUR 1,062 bersih per bulan, sekitar EUR 12,700 untuk satu tahun penuh.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 4 AND question = $q$How much money do I need to show for a Belgian student visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại Bỉ sau khi tốt nghiệp không?$q$,
    "answer_vi" = $q$Có. Sinh viên tốt nghiệp ngoài EU có thể xin gia hạn giấy phép cư trú thêm 12 tháng để tìm việc hoặc khởi nghiệp, một trong những con đường sau tốt nghiệp đơn giản hơn ở châu Âu.$q$,
    "question_fil" = $q$Puwede ba akong manatili sa Belgium pagkatapos magtapos?$q$,
    "answer_fil" = $q$Oo. Puwedeng mag-apply ang mga non-EU graduate ng 12-buwang extension sa kanilang residence permit para maghanap ng trabaho o magsimula ng negosyo, isa sa mas madaling post-study na ruta sa Europa.$q$,
    "question_idn" = $q$Bisakah saya tinggal di Belgia setelah lulus?$q$,
    "answer_idn" = $q$Bisa. Lulusan non-UE dapat mengajukan perpanjangan izin tinggal 12 bulan untuk mencari kerja atau memulai bisnis, salah satu jalur pascastudi yang lebih mudah di Eropa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$belgium$q$)
    AND "order" = 5 AND question = $q$Can I stay in Belgium after I graduate?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Belgium faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Belgium: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$belgium$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$belgium$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$belgium$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
