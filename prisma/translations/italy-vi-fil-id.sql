-- Vietnamese, Filipino and Indonesian content for Italy.
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
    "tagline_vi" = $q$Đại học lâu đời, học phí hiện đại$q$,
    "overview_vi" = $q$Ý đã lặng lẽ trở thành một trong những điểm đến du học có giá trị tốt nhất châu Âu đối với sinh viên ngoài EU, với khoảng 110.000 sinh viên quốc tế theo học tại hơn 90 trường đại học, trong đó có University of Bologna, thành lập năm 1088 và là trường đại học lâu đời nhất thế giới. Học phí đại học công lập dành cho sinh viên quốc tế thường từ EUR 900 đến EUR 4,000 mỗi năm, chỉ bằng một phần nhỏ chi phí ở Anh hoặc Mỹ, trong khi các trường đại học tư và trường kinh doanh thu EUR 6,000 đến EUR 20,000. Bằng cấp của Ý được công nhận khắp Liên minh châu Âu, và các chương trình giảng dạy bằng tiếng Anh ngày càng phổ biến trong kinh doanh, kỹ thuật, thiết kế và khoa học, bên cạnh thế mạnh lâu đời của Ý về nghệ thuật, kiến trúc và thời trang. Sau khi tốt nghiệp, sinh viên quốc tế được cấp tự động giấy phép cư trú 12 tháng để tìm việc, không cần nhà tuyển dụng bảo lãnh hay mức lương tối thiểu.$q$,
    "tagline_fil" = $q$Mga makasaysayang university, makabagong tuition fee$q$,
    "overview_fil" = $q$Tahimik na naging isa ang Italy sa pinakamagandang halaga na destinasyon sa pag-aaral sa Europa para sa mga non-EU student, na may humigit-kumulang 110,000 international student sa mahigit 90 university, kabilang ang University of Bologna, na itinatag noong 1088 at pinakamatandang university sa mundo. Karaniwang nasa EUR 900 hanggang EUR 4,000 kada taon ang tuition sa mga pampublikong university para sa mga international student, maliit na bahagi lamang ng gastos sa UK o US, habang nasa EUR 6,000 hanggang EUR 20,000 ang singil ng mga pribadong university at business school. Kinikilala sa buong European Union ang mga degree sa Italy, at dumarami ang mga English-taught na programa sa business, engineering, design, at sciences, bukod pa sa matagal nang lakas ng Italy sa sining, arkitektura, at fashion. Pagkatapos magtapos, awtomatikong nakakatanggap ang mga international student ng 12-buwang residence permit para maghanap ng trabaho, nang hindi kailangan ng employer sponsorship o minimum na sahod.$q$,
    "tagline_idn" = $q$Universitas bersejarah, biaya kuliah modern$q$,
    "overview_idn" = $q$Italia diam-diam menjadi salah satu destinasi studi dengan nilai terbaik di Eropa bagi mahasiswa non-UE, dengan sekitar 110.000 mahasiswa internasional di lebih dari 90 universitas, termasuk University of Bologna, yang didirikan pada 1088 dan merupakan universitas tertua di dunia. Biaya kuliah universitas negeri bagi mahasiswa internasional biasanya berkisar antara EUR 900 dan EUR 4,000 per tahun, hanya sebagian kecil dari biaya di Inggris atau AS, sementara universitas swasta dan sekolah bisnis mengenakan EUR 6,000 hingga EUR 20,000. Gelar Italia diakui di seluruh Uni Eropa, dan program berbahasa pengantar Inggris semakin umum di bidang bisnis, teknik, desain, dan sains, di samping kekuatan lama Italia dalam seni, arsitektur, dan mode. Setelah lulus, mahasiswa internasional secara otomatis menerima izin tinggal 12 bulan untuk mencari kerja, tanpa memerlukan sponsor pemberi kerja atau gaji minimum.$q$
  WHERE slug = $q$italy$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bằng cấp lâu đời với mức giá hiện đại$q$,
    "description_vi" = $q$Học phí công lập dành cho sinh viên quốc tế thường từ EUR 900 đến EUR 4,000 mỗi năm tại các cơ sở như University of Bologna, thành lập năm 1088 và là trường đại học lâu đời nhất thế giới. Các trường đại học tư và trường kinh doanh thu cao hơn, từ EUR 6,000 đến EUR 20,000, vẫn thấp hơn nhiều so với các chương trình tương đương ở Anh hoặc Mỹ.$q$,
    "title_fil" = $q$Makasaysayang degree sa makabagong presyo$q$,
    "description_fil" = $q$Karaniwang nasa EUR 900 hanggang EUR 4,000 kada taon ang tuition sa mga pampublikong institusyon para sa mga international student, kabilang ang University of Bologna, na itinatag noong 1088 at pinakamatandang university sa mundo. Mas mataas ang singil ng mga pribadong university at business school, mula EUR 6,000 hanggang EUR 20,000, pero mas mababa pa rin nang malaki kaysa sa mga katumbas na programa sa UK o US.$q$,
    "title_idn" = $q$Gelar bersejarah dengan harga modern$q$,
    "description_idn" = $q$Biaya kuliah negeri bagi mahasiswa internasional biasanya berkisar dari EUR 900 hingga EUR 4,000 per tahun di institusi seperti University of Bologna, yang didirikan pada 1088 dan merupakan universitas tertua di dunia. Universitas swasta dan sekolah bisnis mengenakan biaya lebih tinggi, dari EUR 6,000 hingga EUR 20,000, tetapi masih jauh di bawah program setara di Inggris atau AS.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 1 AND title = $q$A Historic Degree at a Modern Price$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Một năm tự động để tìm việc sau khi tốt nghiệp$q$,
    "description_vi" = $q$Sinh viên tốt nghiệp được cấp tự động giấy phép cư trú 12 tháng để tìm việc, gọi là permesso di soggiorno per attesa occupazione, không cần nhà tuyển dụng bảo lãnh hay mức lương tối thiểu. Đây là một trong những giấy phép sau tốt nghiệp dễ tiếp cận nhất châu Âu.$q$,
    "title_fil" = $q$Awtomatikong isang taon para maghanap ng trabaho pagkatapos magtapos$q$,
    "description_fil" = $q$Awtomatikong nakakatanggap ang mga nagtapos ng 12-buwang residence permit para maghanap ng trabaho, ang permesso di soggiorno per attesa occupazione, nang hindi kailangan ng employer sponsor o minimum na sahod. Isa ito sa pinakamadaling makuhang post-study permit sa Europa.$q$,
    "title_idn" = $q$Satu tahun otomatis untuk mencari kerja setelah lulus$q$,
    "description_idn" = $q$Lulusan secara otomatis menerima izin tinggal 12 bulan untuk mencari kerja, yaitu permesso di soggiorno per attesa occupazione, tanpa memerlukan sponsor pemberi kerja atau gaji minimum. Ini salah satu izin pascastudi yang paling mudah diperoleh di Eropa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 2 AND title = $q$An Automatic Year to Find Work After Graduating$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Ngôi nhà tự nhiên của thiết kế, thời trang và kỹ thuật$q$,
    "description_vi" = $q$Ý kết hợp chuyên môn sâu về nghệ thuật, kiến trúc và thời trang với truyền thống kỹ thuật và ô tô mạnh mẽ, là nơi có các cơ sở như Politecnico di Milano và các công ty như Ferrari và Pirelli. Rất ít quốc gia kết hợp việc học sáng tạo và kỹ thuật gần gũi đến vậy.$q$,
    "title_fil" = $q$Likas na tahanan ng design, fashion, at engineering$q$,
    "description_fil" = $q$Pinagsasama ng Italy ang malalim na kadalubhasaan sa sining, arkitektura, at fashion at ang matibay na tradisyon sa engineering at automotive, tahanan ng mga institusyong gaya ng Politecnico di Milano at mga kompanyang gaya ng Ferrari at Pirelli. Kakaunting bansa ang nagsasama nang ganito kalapit ng creative at technical na pag-aaral.$q$,
    "title_idn" = $q$Rumah alami bagi desain, mode, dan teknik$q$,
    "description_idn" = $q$Italia memadukan keahlian mendalam dalam seni, arsitektur, dan mode dengan tradisi teknik dan otomotif yang kuat, menjadi rumah bagi institusi seperti Politecnico di Milano dan perusahaan seperti Ferrari dan Pirelli. Hanya sedikit negara yang memadukan studi kreatif dan teknis seerat ini.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 3 AND title = $q$A Natural Home for Design, Fashion and Engineering$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bằng cấp được công nhận trong EU và Schengen$q$,
    "description_vi" = $q$Là thành viên Liên minh châu Âu, bằng cấp của Ý được công nhận khắp khối, và tư cách thành viên Schengen cho phép sinh viên đi lại tự do qua 26 quốc gia châu Âu khác trong thời gian học.$q$,
    "title_fil" = $q$Kwalipikasyong kinikilala sa EU at Schengen$q$,
    "description_fil" = $q$Bilang miyembro ng European Union, kinikilala sa buong bloc ang degree sa Italy, at dahil sa pagiging miyembro ng Schengen, malayang makapaglalakbay ang mga estudyante sa 26 pang bansa sa Europa habang nag-aaral.$q$,
    "title_idn" = $q$Kualifikasi yang diakui di UE dan Schengen$q$,
    "description_idn" = $q$Sebagai anggota Uni Eropa, gelar Italia diakui di seluruh blok, dan keanggotaan Schengen memungkinkan mahasiswa bepergian bebas ke 26 negara Eropa lainnya selama studi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 4 AND title = $q$An EU and Schengen Qualification$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn chương trình và xác nhận ngôn ngữ giảng dạy$q$,
    "description_vi" = $q$Quyết định giữa trường công lập hay tư thục và xác nhận chương trình dạy bằng tiếng Anh hay tiếng Ý. Các trường công lập ngày càng mở nhiều khóa sau đại học giảng dạy bằng tiếng Anh về kinh doanh, kỹ thuật và khoa học.$q$,
    "title_fil" = $q$Piliin ang programa at kumpirmahin ang wika$q$,
    "description_fil" = $q$Magpasya sa pagitan ng pampubliko o pribadong university at kumpirmahin kung sa Ingles o Italian itinuturo ang programa. Dumarami ang mga English-taught na postgraduate course sa mga pampublikong university sa business, engineering, at sciences.$q$,
    "title_idn" = $q$Pilih program dan pastikan bahasa pengantar$q$,
    "description_idn" = $q$Tentukan antara universitas negeri atau swasta dan pastikan apakah program diajarkan dalam bahasa Inggris atau Italia. Universitas negeri semakin banyak menawarkan program pascasarjana berbahasa Inggris di bidang bisnis, teknik, dan sains.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND step_number = 1 AND title = $q$Choose your programme and confirm the language$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ qua Universitaly hoặc trực tiếp cho trường$q$,
    "description_vi" = $q$Hầu hết hồ sơ vào trường công lập đi qua cổng quốc gia Universitaly, và một số trường yêu cầu đánh giá sơ bộ tại lãnh sự quán Ý ở nước bạn trước khi nộp hồ sơ. Các trường tư thường nhận hồ sơ nộp trực tiếp.$q$,
    "title_fil" = $q$Mag-apply sa pamamagitan ng Universitaly o direkta sa institusyon$q$,
    "description_fil" = $q$Karamihan ng aplikasyon sa mga pampublikong university ay dumadaan sa pambansang Universitaly portal, at may ilang humihingi ng paunang pagsusuri sa Italian consulate sa bansa mo bago ka makapag-apply. Karaniwang tumatanggap ng direktang aplikasyon ang mga pribadong university.$q$,
    "title_idn" = $q$Daftar melalui Universitaly atau langsung ke institusi$q$,
    "description_idn" = $q$Sebagian besar pendaftaran ke universitas negeri melalui portal nasional Universitaly, dan beberapa memerlukan evaluasi awal di konsulat Italia di negara Anda sebelum Anda dapat mendaftar. Universitas swasta umumnya menerima pendaftaran langsung.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND step_number = 2 AND title = $q$Apply through Universitaly or directly to the institution$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chuẩn bị tài chính và xin visa Loại D$q$,
    "description_vi" = $q$Chứng minh khả năng tài chính theo yêu cầu, EUR 10,179.85 cho năm học 2026/2027, và xin visa quốc gia Loại D tại lãnh sự quán Ý ở nước bạn. Thời gian xử lý thường là 4 đến 8 tuần.$q$,
    "title_fil" = $q$Ihanda ang pondo at mag-apply para sa Type D visa$q$,
    "description_fil" = $q$Ipakita ang patunay ng kinakailangang pondo, EUR 10,179.85 para sa 2026/2027 academic year, at mag-apply para sa Type D national visa sa Italian consulate sa bansa mo. Karaniwang tumatagal ng 4 hanggang 8 linggo ang pagproseso.$q$,
    "title_idn" = $q$Siapkan keuangan dan ajukan visa Tipe D$q$,
    "description_idn" = $q$Tunjukkan bukti dana yang diwajibkan, EUR 10,179.85 untuk tahun akademik 2026/2027, dan ajukan visa nasional Tipe D di konsulat Italia di negara Anda. Pemrosesan biasanya memakan waktu 4 hingga 8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND step_number = 3 AND title = $q$Prepare your finances and apply for a Type D visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và xin permesso di soggiorno$q$,
    "description_vi" = $q$Trong vòng 8 ngày sau khi đến, hãy xin giấy phép cư trú, gọi là permesso di soggiorno, tại bưu điện địa phương hoặc trụ sở cảnh sát. Giấy phép này bắt buộc trong suốt thời gian học và phải được gia hạn khi khóa học tiến triển.$q$,
    "title_fil" = $q$Dumating at mag-apply para sa permesso di soggiorno$q$,
    "description_fil" = $q$Sa loob ng 8 araw mula pagdating, mag-apply para sa residence permit mo, ang permesso di soggiorno, sa lokal na post office o police headquarters. Kailangan ito sa buong panahon ng pag-aaral mo at kailangang i-renew habang umuusad ang kurso mo.$q$,
    "title_idn" = $q$Tiba dan ajukan permesso di soggiorno$q$,
    "description_idn" = $q$Dalam 8 hari setelah tiba, ajukan izin tinggal Anda, yaitu permesso di soggiorno, di kantor pos setempat atau markas polisi. Izin ini diwajibkan selama seluruh masa studi dan harus diperpanjang seiring berjalannya kuliah Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND step_number = 4 AND title = $q$Arrive and apply for your permesso di soggiorno$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần nói tiếng Ý để học ở Ý không?$q$,
    "answer_vi" = $q$Không nhất thiết. Ngày càng nhiều chương trình, đặc biệt là các khóa sau đại học về kinh doanh, kỹ thuật và khoa học, được giảng dạy hoàn toàn bằng tiếng Anh. Nhiều chương trình cử nhân tại các trường công lập vẫn dạy bằng tiếng Ý, nên hãy kiểm tra từng khóa học.$q$,
    "question_fil" = $q$Kailangan ko bang magsalita ng Italian para mag-aral sa Italy?$q$,
    "answer_fil" = $q$Hindi naman kailangan. Dumarami ang mga programang itinuturo nang buo sa Ingles, lalo na ang mga postgraduate course sa business, engineering, at sciences. Marami pa ring bachelor's programme sa mga pampublikong university ang itinuturo sa Italian, kaya tingnan ang bawat kurso.$q$,
    "question_idn" = $q$Apakah saya harus bisa berbahasa Italia untuk kuliah di Italia?$q$,
    "answer_idn" = $q$Tidak harus. Semakin banyak program, terutama program pascasarjana di bidang bisnis, teknik, dan sains, diajarkan sepenuhnya dalam bahasa Inggris. Banyak program sarjana di universitas negeri masih disampaikan dalam bahasa Italia, jadi periksa setiap program secara terpisah.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 1 AND question = $q$Do I need to speak Italian to study in Italy?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Du học Ý tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Học phí đại học công lập dành cho sinh viên quốc tế thường từ EUR 900 đến EUR 4,000 mỗi năm, thuộc hàng thấp nhất Tây Âu. Các trường đại học tư và trường kinh doanh thu từ EUR 6,000 đến EUR 20,000. Chi phí sinh hoạt khác nhau tùy thành phố, với Milan và Rome ở mức cao hơn.$q$,
    "question_fil" = $q$Magkano ang gastos sa pag-aaral sa Italy?$q$,
    "answer_fil" = $q$Karaniwang nasa EUR 900 hanggang EUR 4,000 kada taon ang tuition sa mga pampublikong university para sa mga international student, isa sa pinakamababa sa Kanlurang Europa. Nasa EUR 6,000 hanggang EUR 20,000 ang singil ng mga pribadong university at business school. Nag-iiba ang gastos sa pamumuhay ayon sa lungsod, at mas mataas ang Milan at Rome.$q$,
    "question_idn" = $q$Berapa biaya kuliah di Italia?$q$,
    "answer_idn" = $q$Biaya kuliah universitas negeri bagi mahasiswa internasional biasanya berkisar dari EUR 900 hingga EUR 4,000 per tahun, termasuk yang terendah di Eropa Barat. Universitas swasta dan sekolah bisnis mengenakan EUR 6,000 hingga EUR 20,000. Biaya hidup bervariasi menurut kota, dengan Milan dan Roma di kisaran yang lebih tinggi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 2 AND question = $q$How much does it cost to study in Italy?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm không?$q$,
    "answer_vi" = $q$Có. Giấy phép cư trú sinh viên hợp lệ cho phép sinh viên quốc tế làm việc tối đa 20 giờ mỗi tuần.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral?$q$,
    "answer_fil" = $q$Oo. Pinapayagan ng balidong student residence permit ang mga international student na magtrabaho nang hanggang 20 oras kada linggo.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah?$q$,
    "answer_idn" = $q$Bisa. Izin tinggal pelajar yang berlaku mengizinkan mahasiswa internasional bekerja hingga 20 jam per minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 3 AND question = $q$Can I work while I study?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại Ý sau khi tốt nghiệp không?$q$,
    "answer_vi" = $q$Có. Sinh viên tốt nghiệp tự động đủ điều kiện nhận giấy phép cư trú 12 tháng để tìm việc, không cần nhà tuyển dụng bảo lãnh hay ngưỡng lương, với điều kiện giấy phép sinh viên của bạn vẫn còn hiệu lực khi nộp đơn.$q$,
    "question_fil" = $q$Puwede ba akong manatili sa Italy pagkatapos magtapos?$q$,
    "answer_fil" = $q$Oo. Awtomatikong kwalipikado ang mga nagtapos sa 12-buwang residence permit para maghanap ng trabaho, nang hindi kailangan ng employer sponsor o salary threshold, basta balido pa ang student permit mo kapag nag-apply ka.$q$,
    "question_idn" = $q$Bisakah saya tinggal di Italia setelah lulus?$q$,
    "answer_idn" = $q$Bisa. Lulusan secara otomatis memenuhi syarat untuk izin tinggal 12 bulan guna mencari kerja, tanpa memerlukan sponsor pemberi kerja atau ambang gaji, selama izin pelajar Anda masih berlaku saat Anda mengajukan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 4 AND question = $q$Can I stay in Italy after I graduate?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi cần chứng minh bao nhiêu tiền để xin visa du học Ý?$q$,
    "answer_vi" = $q$Với năm học 2026/2027, các lãnh sự quán Ý yêu cầu chứng minh khoảng EUR 10,179.85 tài chính, tăng mạnh so với những năm trước, vì vậy hãy chuẩn bị khoản này từ sớm trước khi nộp hồ sơ.$q$,
    "question_fil" = $q$Magkano ang kailangan kong ipakita para sa Italian student visa?$q$,
    "answer_fil" = $q$Para sa 2026/2027 academic year, humihingi ang mga Italian consulate ng patunay ng humigit-kumulang EUR 10,179.85 na pondo, malaking pagtaas kumpara sa mga nakaraang taon, kaya paghandaan ito nang maaga bago ang aplikasyon mo.$q$,
    "question_idn" = $q$Berapa dana yang harus saya tunjukkan untuk visa pelajar Italia?$q$,
    "answer_idn" = $q$Untuk tahun akademik 2026/2027, konsulat Italia mensyaratkan bukti dana sekitar EUR 10,179.85, kenaikan tajam dibandingkan tahun-tahun sebelumnya, jadi siapkan dana ini jauh sebelum pengajuan Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$italy$q$)
    AND "order" = 5 AND question = $q$How much money do I need to show for an Italian student visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Italy faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Italy: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$italy$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$italy$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$italy$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
