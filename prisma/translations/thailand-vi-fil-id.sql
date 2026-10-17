-- Vietnamese, Filipino and Indonesian content for Thailand.
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
    "tagline_vi" = $q$Trung tâm học bằng tiếng Anh giá phải chăng nhất Đông Nam Á$q$,
    "overview_vi" = $q$Thái Lan nổi lên như một trong những điểm đến du học hấp dẫn nhất Đông Nam Á, với hơn 30 trường đại học và cao đẳng tư thục cung cấp các chương trình giảng dạy bằng tiếng Anh về kinh doanh, khách sạn, công nghệ, nghệ thuật ẩm thực và các ngành sáng tạo. Bangkok, một thành phố toàn cầu với kết nối giao thông tuyệt vời, là nơi đặt phần lớn các cơ sở quốc tế, bao gồm các chi nhánh của Harbour.Space (Barcelona) và hợp tác với Le Cordon Bleu (Paris). Khối giáo dục đại học Thái Lan đã quốc tế hóa nhanh chóng, với các trường như Assumption University (ABAC), Stamford International và Rangsit University thu hút sinh viên từ khắp châu Á và xa hơn. Học phí dao động từ THB 60,000 đến THB 350,000 mỗi năm (USD 1,700-10,000), khiến Thái Lan trở thành một trong những điểm đến học bằng tiếng Anh hiệu quả nhất về chi phí trên toàn cầu. Chi phí sinh hoạt ở Bangkok, thường THB 15,000-35,000 mỗi tháng, thuộc hàng thấp nhất trong các thủ đô lớn của châu Á, giúp sinh viên sống thoải mái gần các tiện ích của trường.$q$,
    "tagline_fil" = $q$Pinakamurang English study hub sa Timog-Silangang Asya$q$,
    "overview_fil" = $q$Lumitaw ang Thailand bilang isa sa pinakakaakit-akit na destinasyon sa pag-aaral sa Timog-Silangang Asya, na may mahigit 30 pribadong university at college na nag-aalok ng English-medium na programa sa business, hospitality, technology, culinary arts, at mga creative na larangan. Ang Bangkok, isang global na lungsod na may mahusay na koneksyon sa transportasyon, ang nagho-host ng karamihan sa mga international campus, kabilang ang mga branch ng Harbour.Space (Barcelona) at partnership sa Le Cordon Bleu (Paris). Mabilis na nag-internationalize ang higher education sector ng Thailand, kung saan umaakit ng mga estudyante mula sa buong Asya at higit pa ang mga institusyong gaya ng Assumption University (ABAC), Stamford International, at Rangsit University. Nasa THB 60,000 hanggang THB 350,000 kada taon ang tuition fee (USD 1,700-10,000), kaya isa ang Thailand sa pinakamatipid na English-medium na destinasyon sa pag-aaral sa buong mundo. Isa sa pinakamababa sa mga pangunahing kabisera sa Asya ang gastos sa pamumuhay sa Bangkok, karaniwang THB 15,000-35,000 kada buwan, kaya komportable ang buhay ng mga estudyante malapit sa mga pasilidad ng campus.$q$,
    "tagline_idn" = $q$Pusat studi berbahasa Inggris paling terjangkau di Asia Tenggara$q$,
    "overview_idn" = $q$Thailand muncul sebagai salah satu destinasi studi paling menarik di Asia Tenggara, dengan lebih dari 30 universitas dan college swasta yang menawarkan program berbahasa pengantar Inggris di bidang bisnis, perhotelan, teknologi, seni kuliner, dan disiplin kreatif. Bangkok, kota global dengan konektivitas transportasi yang sangat baik, menjadi tuan rumah sebagian besar kampus internasional, termasuk cabang Harbour.Space (Barcelona) dan kemitraan dengan Le Cordon Bleu (Paris). Sektor pendidikan tinggi Thailand telah berkembang pesat secara internasional, dengan institusi seperti Assumption University (ABAC), Stamford International, dan Rangsit University menarik mahasiswa dari seluruh Asia dan sekitarnya. Biaya kuliah berkisar dari THB 60,000 hingga THB 350,000 per tahun (USD 1,700-10,000), menjadikan Thailand salah satu destinasi studi berbahasa Inggris yang paling hemat biaya di dunia. Biaya hidup di Bangkok, biasanya THB 15,000-35,000 per bulan, termasuk yang terendah di antara ibu kota besar Asia, memungkinkan mahasiswa hidup nyaman di dekat fasilitas kampus.$q$
  WHERE slug = $q$thailand$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Học phí và sinh hoạt phí cực kỳ phải chăng$q$,
    "description_vi" = $q$Học phí từ THB 60,000/năm (USD 1,700) và chi phí sinh hoạt hằng tháng thấp nhất chỉ THB 15,000 khiến Thái Lan trở thành một trong những điểm đến học bằng tiếng Anh rẻ nhất châu Á, lý tưởng cho sinh viên muốn chất lượng mà không phải gánh nợ lớn.$q$,
    "title_fil" = $q$Napakamurang tuition at gastos sa pamumuhay$q$,
    "description_fil" = $q$Dahil sa tuition na simula THB 60,000/taon (USD 1,700) at buwanang gastos sa pamumuhay na kasingbaba ng THB 15,000, isa ang Thailand sa pinaka-abot-kayang English-medium na destinasyon sa pag-aaral sa Asya, perpekto para sa mga estudyanteng gustong kalidad nang walang malaking utang.$q$,
    "title_idn" = $q$Biaya kuliah dan hidup sangat terjangkau$q$,
    "description_idn" = $q$Biaya kuliah mulai THB 60,000/tahun (USD 1,700) dan biaya hidup bulanan serendah THB 15,000 menjadikan Thailand salah satu destinasi studi berbahasa Inggris paling terjangkau di Asia, ideal bagi mahasiswa yang mencari kualitas tanpa utang besar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 1 AND title = $q$Ultra-Affordable Tuition and Living Costs$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Giáo dục khách sạn và ẩm thực đẳng cấp thế giới$q$,
    "description_vi" = $q$Ngành du lịch và khách sạn của Thái Lan là một trong những ngành lớn nhất thế giới, là nơi lý tưởng để học quản trị khách sạn, nghệ thuật ẩm thực hoặc du lịch. Các cơ sở như Dusit Thani College, AIHM và Le Cordon Bleu Dusit cung cấp chứng chỉ được công nhận quốc tế kèm cơ hội bố trí việc làm trực tiếp trong ngành khách sạn.$q$,
    "title_fil" = $q$World-class na edukasyon sa hospitality at culinary$q$,
    "description_fil" = $q$Isa ang tourism at hospitality industry ng Thailand sa pinakamalaki sa mundo, kaya mainam na lugar ito para mag-aral ng hotel management, culinary arts, o tourism. Ang mga institusyong gaya ng Dusit Thani College, AIHM, at Le Cordon Bleu Dusit ay nag-aalok ng mga kinikilalang kredensyal sa buong mundo na may direktang placement sa hotel industry.$q$,
    "title_idn" = $q$Pendidikan perhotelan dan kuliner kelas dunia$q$,
    "description_idn" = $q$Industri pariwisata dan perhotelan Thailand adalah salah satu yang terbesar di dunia, menjadikannya tempat ideal untuk belajar manajemen hotel, seni kuliner, atau pariwisata. Institusi seperti Dusit Thani College, AIHM, dan Le Cordon Bleu Dusit menawarkan kredensial yang diakui internasional dengan penempatan langsung di industri hotel.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 2 AND title = $q$World-Class Hospitality & Culinary Education$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Chương trình tiếng Anh được kiểm định quốc tế$q$,
    "description_vi" = $q$Các trường đại học tư thục hàng đầu của Thái Lan có chứng nhận kiểm định quốc tế (IACBE, ACBSP) và liên kết với các trường đại học ở Anh, Mỹ và Úc để cấp bằng kép hoặc bằng có thể chuyển đổi, tất cả giảng dạy bằng tiếng Anh.$q$,
    "title_fil" = $q$Mga English programme na may international accreditation$q$,
    "description_fil" = $q$Ang mga nangungunang pribadong university sa Thailand ay may international accreditation (IACBE, ACBSP) at may partnership sa mga university sa UK, USA, at Australia para magbigay ng dual o transferable na degree, lahat ay itinuturo sa Ingles.$q$,
    "title_idn" = $q$Program berbahasa Inggris terakreditasi internasional$q$,
    "description_idn" = $q$Universitas swasta terkemuka Thailand memiliki akreditasi internasional (IACBE, ACBSP) dan bermitra dengan universitas di Inggris, AS, dan Australia untuk memberikan gelar ganda atau yang dapat ditransfer, semuanya diajarkan dalam bahasa Inggris.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 3 AND title = $q$Internationally Accredited English Programmes$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bangkok, trung tâm của một thành phố toàn cầu$q$,
    "description_vi" = $q$Bangkok là một thành phố thế giới với các chuyến bay kết nối tuyệt vời đến toàn châu Á, môi trường khởi nghiệp sôi động, trụ sở của các tập đoàn đa quốc gia và văn hóa thân thiện với sinh viên. Thành phố liên tục nằm trong số những nơi được ghé thăm nhiều nhất thế giới, mang lại lối sống và cơ hội nghề nghiệp vô song.$q$,
    "title_fil" = $q$Bangkok, sentro ng isang global na lungsod$q$,
    "description_fil" = $q$Ang Bangkok ay world city na may mahusay na flight connection sa buong Asya, masiglang startup scene, mga headquarters ng multinational company, at kulturang magiliw sa estudyante. Palagi itong kabilang sa mga pinakabinibisitang lungsod sa mundo, na nag-aalok ng walang kapantay na lifestyle at oportunidad sa karera.$q$,
    "title_idn" = $q$Bangkok, pusat kota global$q$,
    "description_idn" = $q$Bangkok adalah kota dunia dengan koneksi penerbangan yang sangat baik ke seluruh Asia, ekosistem startup yang berkembang, kantor pusat perusahaan multinasional, dan budaya yang ramah mahasiswa. Kota ini secara konsisten termasuk yang paling banyak dikunjungi di dunia, menawarkan gaya hidup dan peluang karier tiada tanding.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 4 AND title = $q$Bangkok — A Global City Hub$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn trường đại học và chương trình$q$,
    "description_vi" = $q$Tìm hiểu các chương trình giảng dạy bằng tiếng Anh tại các trường đại học tư thục Thái Lan, so sánh học phí và kiểm định, rồi xác định kỳ nhập học bạn muốn (thường là tháng 8/9 hoặc tháng 1/2).$q$,
    "title_fil" = $q$Piliin ang university at programa mo$q$,
    "description_fil" = $q$Saliksikin ang mga English-taught na programa sa mga pribadong university sa Thailand, ihambing ang tuition at accreditation, at tukuyin ang gusto mong intake (karaniwang August/September o January/February).$q$,
    "title_idn" = $q$Pilih universitas dan program Anda$q$,
    "description_idn" = $q$Teliti program berbahasa Inggris di universitas swasta Thailand, bandingkan biaya kuliah dan akreditasi, lalu tentukan periode masuk yang Anda inginkan (biasanya Agustus/September atau Januari/Februari).$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND step_number = 1 AND title = $q$Choose Your University and Programme$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận thư mời nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ kèm bảng điểm, bản sao hộ chiếu và điểm thi tiếng Anh (IELTS 5.0-6.0 hoặc tương đương). Nhiều trường xét tuyển liên tục với thời gian phản hồi nhanh.$q$,
    "title_fil" = $q$Mag-apply at kunin ang Offer Letter$q$,
    "description_fil" = $q$Isumite ang aplikasyon kasama ang transcript, kopya ng pasaporte, at English test score (IELTS 5.0-6.0 o katumbas). Maraming university ang may rolling admissions na mabilis ang sagot.$q$,
    "title_idn" = $q$Daftar dan terima surat tawaran$q$,
    "description_idn" = $q$Kirim aplikasi dengan transkrip akademik, salinan paspor, dan skor tes bahasa Inggris (IELTS 5.0-6.0 atau setara). Banyak universitas menawarkan penerimaan bergulir dengan respons cepat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND step_number = 2 AND title = $q$Apply and Receive Offer Letter$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa Non-Immigrant ED$q$,
    "description_vi" = $q$Với thư mời nhập học, hãy xin visa Non-Immigrant ED (Giáo dục) tại đại sứ quán Thái Lan ở nước bạn. Visa cho phép học toàn thời gian và có thể gia hạn hằng năm.$q$,
    "title_fil" = $q$Mag-apply para sa Non-Immigrant ED Visa$q$,
    "description_fil" = $q$Gamit ang offer letter mo, mag-apply para sa Non-Immigrant ED (Education) visa sa embahada ng Thailand sa bansa mo. Pinapayagan ng visa ang full-time na pag-aaral at puwedeng i-renew kada taon.$q$,
    "title_idn" = $q$Ajukan Visa Non-Immigrant ED$q$,
    "description_idn" = $q$Dengan surat tawaran Anda, ajukan visa Non-Immigrant ED (Pendidikan) di kedutaan Thailand di negara Anda. Visa ini memungkinkan studi penuh waktu dan dapat diperpanjang setiap tahun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND step_number = 3 AND title = $q$Apply for Non-Immigrant ED Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh, đăng ký và gia hạn visa$q$,
    "description_vi" = $q$Đến Thái Lan, tham dự buổi định hướng, đăng ký tại trường và trình báo với Cục Di trú Thái Lan trong vòng 90 ngày. Trường sẽ hướng dẫn bạn quy trình gia hạn visa hằng năm.$q$,
    "title_fil" = $q$Dumating, magparehistro, at i-extend ang visa$q$,
    "description_fil" = $q$Dumating sa Thailand, dumalo sa orientation, magparehistro sa university mo, at mag-report sa Thai Immigration sa loob ng 90 araw. Gagabayan ka ng university mo sa taunang proseso ng visa extension.$q$,
    "title_idn" = $q$Tiba, daftar, dan perpanjang visa$q$,
    "description_idn" = $q$Tiba di Thailand, ikuti orientasi, daftar di universitas Anda, dan lapor ke Imigrasi Thailand dalam 90 hari. Universitas Anda akan membimbing proses perpanjangan visa tahunan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND step_number = 4 AND title = $q$Arrive, Register, and Extend Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Thái Lan có an toàn cho sinh viên quốc tế không?$q$,
    "answer_vi" = $q$Có. Thái Lan là một quốc gia an toàn và thân thiện với sinh viên quốc tế, đặc biệt ở Bangkok và các thành phố đại học lớn. Cộng đồng sinh viên quốc tế đông đảo và các dịch vụ hỗ trợ của trường được xây dựng bài bản giúp việc ổn định cuộc sống trở nên dễ dàng.$q$,
    "question_fil" = $q$Ligtas ba ang Thailand para sa mga international student?$q$,
    "answer_fil" = $q$Oo. Ligtas at magiliw ang Thailand para sa mga international student, lalo na sa Bangkok at mga pangunahing university city. Dahil malaki ang populasyon ng mga international student at matatag ang mga serbisyong pangsuporta ng university, madali ang pag-aayos ng buhay doon.$q$,
    "question_idn" = $q$Apakah Thailand aman bagi mahasiswa internasional?$q$,
    "answer_idn" = $q$Ya. Thailand adalah negara yang aman dan ramah bagi mahasiswa internasional, terutama di Bangkok dan kota-kota universitas utama. Populasi mahasiswa internasional yang besar dan layanan dukungan universitas yang mapan membuat proses menetap menjadi mudah.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 1 AND question = $q$Is Thailand safe for international students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Thái Lan không?$q$,
    "answer_vi" = $q$Người giữ visa du học nhìn chung không được làm việc ở Thái Lan nếu không có giấy phép lao động riêng, và giấy phép này phải do nhà tuyển dụng bảo lãnh. Một số trường có chương trình thực tập mang lại kinh nghiệm làm việc trong khuôn khổ học thuật.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Thailand?$q$,
    "answer_fil" = $q$Karaniwang hindi puwedeng magtrabaho sa Thailand ang mga may student visa nang walang hiwalay na work permit, na dapat i-sponsor ng employer. May ilang university na may internship programme na nagbibigay ng karanasan sa trabaho sa loob ng akademikong istruktura.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Thailand?$q$,
    "answer_idn" = $q$Pemegang visa pelajar umumnya tidak boleh bekerja di Thailand tanpa izin kerja terpisah, yang harus disponsori pemberi kerja. Beberapa universitas memiliki program magang yang memberikan pengalaman kerja dalam struktur akademik.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 2 AND question = $q$Can I work while studying in Thailand?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Các trường đại học Thái Lan yêu cầu điểm tiếng Anh bao nhiêu?$q$,
    "answer_vi" = $q$Yêu cầu khác nhau tùy trường: hầu hết các trường tư chấp nhận IELTS 5.0-6.0 hoặc TOEFL iBT 60-79. Một số trường (như Stamford International) tự tổ chức bài kiểm tra xếp lớp tiếng Anh và có các khóa tiếng Anh dự bị.$q$,
    "question_fil" = $q$Anong English language score ang hinihingi ng mga university sa Thailand?$q$,
    "answer_fil" = $q$Nag-iiba ang requirement depende sa institusyon: karamihan ng pribadong university ay tumatanggap ng IELTS 5.0-6.0 o TOEFL iBT 60-79. May ilang university (gaya ng Stamford International) na nagsasagawa ng sarili nilang English placement test at nag-aalok ng preparatory English course.$q$,
    "question_idn" = $q$Berapa skor bahasa Inggris yang disyaratkan universitas Thailand?$q$,
    "answer_idn" = $q$Persyaratan bervariasi per institusi: sebagian besar universitas swasta menerima IELTS 5.0-6.0 atau TOEFL iBT 60-79. Beberapa universitas (seperti Stamford International) menyelenggarakan tes penempatan bahasa Inggris sendiri dan menawarkan kursus bahasa Inggris persiapan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 3 AND question = $q$What English language scores do Thai universities require?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Làm thế nào để xin visa du học Thái Lan?$q$,
    "answer_vi" = $q$Sau khi nhận thư mời nhập học, hãy xin visa Non-Immigrant ED tại đại sứ quán Thái Lan ở nước bạn. Mang theo thư mời nhập học, hộ chiếu, đơn xin visa và sao kê ngân hàng. Thời gian xử lý 2-4 tuần.$q$,
    "question_fil" = $q$Paano ako mag-a-apply para sa Thai student visa?$q$,
    "answer_fil" = $q$Kapag natanggap mo na ang offer letter, mag-apply para sa Non-Immigrant ED visa sa embahada ng Thailand sa bansa mo. Dalhin ang offer letter, pasaporte, application form, at bank statement. Tumatagal ng 2-4 linggo ang pagproseso.$q$,
    "question_idn" = $q$Bagaimana cara mengajukan visa pelajar Thailand?$q$,
    "answer_idn" = $q$Setelah menerima surat tawaran, ajukan visa Non-Immigrant ED di kedutaan Thailand di negara Anda. Bawa surat tawaran, paspor, formulir aplikasi, dan rekening koran. Pemrosesan memakan waktu 2-4 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 4 AND question = $q$How do I apply for a Thai student visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Chi phí sinh hoạt của sinh viên ở Bangkok là bao nhiêu?$q$,
    "answer_vi" = $q$Sinh viên thường chi khoảng THB 15,000-35,000 mỗi tháng (USD 430-1,000), bao gồm chỗ ở (THB 5,000-12,000), ăn uống (THB 4,000-8,000), đi lại (THB 1,500-3,000) và chi tiêu cá nhân. Bangkok rẻ hơn đáng kể so với Singapore, Hồng Kông hoặc Tokyo.$q$,
    "question_fil" = $q$Magkano ang gastos sa pamumuhay sa Bangkok para sa mga estudyante?$q$,
    "answer_fil" = $q$Karaniwang gumagastos ang mga estudyante ng THB 15,000-35,000 kada buwan (USD 430-1,000), na sumasaklaw sa tirahan (THB 5,000-12,000), pagkain (THB 4,000-8,000), transportasyon (THB 1,500-3,000), at personal na gastusin. Mas mura nang malaki ang Bangkok kaysa sa Singapore, Hong Kong, o Tokyo.$q$,
    "question_idn" = $q$Berapa biaya hidup mahasiswa di Bangkok?$q$,
    "answer_idn" = $q$Mahasiswa biasanya menghabiskan THB 15,000-35,000 per bulan (USD 430-1,000), mencakup akomodasi (THB 5,000-12,000), makan (THB 4,000-8,000), transportasi (THB 1,500-3,000), dan pengeluaran pribadi. Bangkok jauh lebih murah daripada Singapura, Hong Kong, atau Tokyo.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$thailand$q$)
    AND "order" = 5 AND question = $q$What is the cost of living in Bangkok for students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Thailand faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Thailand: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$thailand$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$thailand$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$thailand$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
