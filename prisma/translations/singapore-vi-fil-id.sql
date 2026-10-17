-- Vietnamese, Filipino and Indonesian content for Singapore.
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
    "tagline_vi" = $q$Khuôn viên toàn cầu của châu Á, tiêu chuẩn thế giới, trái tim châu Á$q$,
    "overview_vi" = $q$Singapore có tầm ảnh hưởng vượt xa quy mô của mình với tư cách là một điểm đến giáo dục toàn cầu. Hai trường đại học xếp hạng cao nhất châu Á, NUS (hạng 8) và NTU (hạng 15 theo QS 2025), là trụ cột của một hệ sinh thái dày đặc gồm INSEAD, ESSEC và Singapore Management University, cùng mạng lưới các cơ sở tư thục lâu đời liên kết với các trường đại học hàng đầu của Anh, Úc và Mỹ. Toàn bộ việc giảng dạy bằng tiếng Anh. Sinh viên tốt nghiệp được hưởng lợi từ vị thế của Singapore là thủ đô tài chính và logistics của ASEAN, nơi có hơn 7.000 tập đoàn đa quốc gia và tỷ lệ thất nghiệp của sinh viên tốt nghiệp dưới 5%. Student Pass của Singapore cho phép làm thêm (tối đa 16 giờ/tuần), và hệ thống giao thông công cộng, sự an toàn cùng môi trường đa văn hóa khiến Singapore trở thành một trong những thành phố đáng sống nhất châu Á.$q$,
    "tagline_fil" = $q$Global campus ng Asya, pamantayang pandaigdig, pusong Asyano$q$,
    "overview_fil" = $q$Higit na higit ang naaabot ng Singapore kaysa sa laki nito bilang pandaigdigang destinasyon sa edukasyon. Dalawa sa pinakamataas ang ranggo na university sa Asya, ang NUS (#8) at NTU (#15 QS 2025), ang sandigan ng masikip na ecosystem na kinabibilangan ng INSEAD, ESSEC, at Singapore Management University, kasama ang network ng mga matagal nang pribadong institusyong katuwang ng mga nangungunang university sa UK, Australia, at US. Ingles ang gamit sa lahat ng pagtuturo. Nakikinabang ang mga nagtapos sa reputasyon ng Singapore bilang financial at logistics capital ng ASEAN, tahanan ng mahigit 7,000 multinational corporation at may graduate unemployment rate na mababa sa 5%. Pinapayagan ng Singapore Student Pass ang part-time na trabaho (hanggang 16 oras/linggo), at ang public transport, kaligtasan, at multicultural na kapaligiran ng bansa ang dahilan kung bakit isa ito sa pinakamainam tirhan na lungsod sa Asya.$q$,
    "tagline_idn" = $q$Kampus global Asia, standar dunia, hati Asia$q$,
    "overview_idn" = $q$Singapura memiliki pengaruh yang jauh melampaui ukurannya sebagai destinasi pendidikan global. Dua universitas berperingkat tertinggi di Asia, NUS (#8) dan NTU (#15 QS 2025), menjadi jangkar ekosistem padat yang mencakup INSEAD, ESSEC, dan Singapore Management University, ditambah jaringan institusi swasta mapan yang bermitra dengan universitas terkemuka Inggris, Australia, dan AS. Seluruh pengajaran berbahasa Inggris. Lulusan diuntungkan oleh reputasi Singapura sebagai ibu kota keuangan dan logistik ASEAN, rumah bagi lebih dari 7.000 perusahaan multinasional dan tingkat pengangguran lulusan di bawah 5%. Student Pass Singapura mengizinkan kerja paruh waktu (hingga 16 jam/minggu), dan transportasi umum, keamanan, serta lingkungan multikulturalnya menjadikan Singapura salah satu kota paling layak huni di Asia.$q$
  WHERE slug = $q$singapore$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Xếp hạng toàn cầu, vị trí châu Á$q$,
    "description_vi" = $q$NUS và NTU nằm trong top 20 thế giới. Ngay cả các cơ sở tư thục cũng liên kết với các trường thuộc Russell Group và Group of Eight, nên sinh viên tốt nghiệp với bằng cấp được công nhận quốc tế.$q$,
    "title_fil" = $q$Pandaigdigang ranking, lokasyong Asyano$q$,
    "description_fil" = $q$Kabilang ang NUS at NTU sa global top 20. Kahit ang mga pribadong institusyon ay may partnership sa mga university ng Russell Group at Group of Eight, kaya nagtatapos ang mga estudyante na may mga degree na kinikilala sa buong mundo.$q$,
    "title_idn" = $q$Peringkat global, lokasi Asia$q$,
    "description_idn" = $q$NUS dan NTU masuk 20 besar dunia. Bahkan institusi swasta bermitra dengan universitas Russell Group dan Group of Eight, sehingga mahasiswa lulus dengan gelar yang diakui secara internasional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 1 AND title = $q$Global Rankings, Asian Location$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Cửa ngõ đến sự nghiệp ASEAN$q$,
    "description_vi" = $q$Singapore là nơi đặt trụ sở châu Á - Thái Bình Dương của Google, Meta, Grab, Sea Group và hơn 7.000 tập đoàn đa quốc gia. Sinh viên tốt nghiệp có cơ hội tiếp cận vô song với thị trường việc làm tăng trưởng nhanh nhất Đông Nam Á.$q$,
    "title_fil" = $q$Daan patungo sa mga karera sa ASEAN$q$,
    "description_fil" = $q$Narito ang Asia-Pacific HQ ng Google, Meta, Grab, Sea Group, at mahigit 7,000 MNC. Nakakakuha ang mga nagtapos ng walang kapantay na access sa pinakamabilis lumagong job market sa Timog-Silangang Asya.$q$,
    "title_idn" = $q$Gerbang menuju karier ASEAN$q$,
    "description_idn" = $q$Singapura menjadi markas Asia-Pasifik bagi Google, Meta, Grab, Sea Group, dan lebih dari 7.000 MNC. Lulusan mendapat akses tiada tanding ke pasar kerja dengan pertumbuhan tercepat di Asia Tenggara.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 2 AND title = $q$Gateway to ASEAN Careers$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Giảng dạy bằng tiếng Anh, an toàn và hiệu quả$q$,
    "description_vi" = $q$Tiếng Anh là ngôn ngữ giảng dạy chính thức tại tất cả các cơ sở. Singapore liên tục được xếp là thành phố an toàn nhất châu Á với giao thông công cộng, y tế và hạ tầng số đẳng cấp thế giới.$q$,
    "title_fil" = $q$English-medium, ligtas, at mahusay$q$,
    "description_fil" = $q$Ingles ang opisyal na wika ng pagtuturo sa lahat ng institusyon. Palaging kinikilala ang Singapore bilang pinakaligtas na lungsod sa Asya na may world-class na public transport, healthcare, at digital infrastructure.$q$,
    "title_idn" = $q$Berbahasa pengantar Inggris, aman, dan efisien$q$,
    "description_idn" = $q$Bahasa Inggris adalah bahasa pengantar resmi di seluruh institusi. Singapura secara konsisten menjadi kota teraman di Asia dengan transportasi umum, layanan kesehatan, dan infrastruktur digital kelas dunia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 3 AND title = $q$English-Medium, Safe, and Efficient$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Làm thêm trong thời gian học$q$,
    "description_vi" = $q$Người giữ Student Pass được làm tối đa 16 giờ mỗi tuần trong học kỳ và không giới hạn giờ trong các kỳ nghỉ chính thức của trường, giúp bù đắp chi phí sinh hoạt tại một trong những nền kinh tế năng động nhất châu Á.$q$,
    "title_fil" = $q$Part-time na trabaho habang nag-aaral$q$,
    "description_fil" = $q$Puwedeng magtrabaho ang mga may Student Pass nang hanggang 16 oras kada linggo habang may klase at walang limitasyong oras tuwing opisyal na school holiday, na nakakatulong sa gastusin sa pamumuhay sa isa sa pinakadinamikong ekonomiya sa Asya.$q$,
    "title_idn" = $q$Kerja paruh waktu selama studi$q$,
    "description_idn" = $q$Pemegang Student Pass boleh bekerja hingga 16 jam per minggu selama semester dan tanpa batas jam selama libur sekolah resmi, membantu menutup biaya hidup di salah satu ekonomi paling dinamis di Asia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 4 AND title = $q$Part-Time Work During Studies$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn cơ sở giáo dục và chương trình$q$,
    "description_vi" = $q$Tìm hiểu các cơ sở tư thục đã đăng ký CPE hoặc các trường đại học công lập, so sánh các trường đối tác và việc công nhận chương trình, rồi xác định kỳ nhập học bạn muốn (hầu hết các PEI có nhập học theo quý).$q$,
    "title_fil" = $q$Piliin ang institusyon at programa$q$,
    "description_fil" = $q$Saliksikin ang mga CPE-registered na pribadong institusyon o pampublikong university, ihambing ang mga partner university at accreditation ng programa, at tukuyin ang gusto mong intake (karamihan ng PEI ay may quarterly intake).$q$,
    "title_idn" = $q$Pilih institusi dan program$q$,
    "description_idn" = $q$Teliti institusi swasta terdaftar CPE atau universitas negeri, bandingkan universitas mitra dan akreditasi program, lalu tentukan periode masuk yang Anda inginkan (sebagian besar PEI memiliki penerimaan per kuartal).$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND step_number = 1 AND title = $q$Choose Institution and Programme$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận thư mời nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ kèm bảng điểm, bản sao hộ chiếu, điểm thi tiếng Anh (nếu yêu cầu) và các giấy tờ bổ sung. Hầu hết các PEI phản hồi trong vòng 1-2 tuần.$q$,
    "title_fil" = $q$Mag-apply at kunin ang Letter of Offer$q$,
    "description_fil" = $q$Isumite ang aplikasyon kasama ang transcript, kopya ng pasaporte, English test score (kung kailangan), at iba pang karagdagang dokumento. Karamihan ng PEI ay sumasagot sa loob ng 1-2 linggo.$q$,
    "title_idn" = $q$Daftar dan terima Letter of Offer$q$,
    "description_idn" = $q$Kirim aplikasi dengan transkrip akademik, salinan paspor, skor tes bahasa Inggris (jika diperlukan), dan dokumen tambahan lain. Sebagian besar PEI merespons dalam 1-2 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND step_number = 2 AND title = $q$Apply and Receive Letter of Offer$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin Student Pass qua SOLAR+$q$,
    "description_vi" = $q$Cơ sở giáo dục của bạn sẽ thay bạn nộp hồ sơ Student Pass qua hệ thống SOLAR+ của ICA. Thời gian xử lý 2-4 tuần. Đừng đến Singapore cho tới khi thẻ của bạn được chấp thuận.$q$,
    "title_fil" = $q$Mag-apply para sa Student Pass sa pamamagitan ng SOLAR+$q$,
    "description_fil" = $q$Ang institusyon mo ang magsusumite ng Student Pass application para sa iyo sa pamamagitan ng SOLAR+ system ng ICA. Tumatagal ng 2-4 linggo ang pagproseso. Huwag bumiyahe papuntang Singapore hangga't hindi pa aprubado ang pass mo.$q$,
    "title_idn" = $q$Ajukan Student Pass melalui SOLAR+$q$,
    "description_idn" = $q$Institusi Anda mengajukan permohonan Student Pass atas nama Anda melalui sistem SOLAR+ milik ICA. Pemrosesan memakan waktu 2-4 minggu. Jangan berangkat ke Singapura sebelum pass Anda disetujui.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND step_number = 3 AND title = $q$Apply for Student Pass via SOLAR+$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và hoàn tất nhập học trực tiếp$q$,
    "description_vi" = $q$Nhận Student Pass tại ICA, hoàn tất đăng ký tại trường và tham dự buổi định hướng. Mở tài khoản ngân hàng địa phương và kích hoạt thẻ ưu đãi sinh viên để được giảm giá đi lại.$q$,
    "title_fil" = $q$Dumating at kumpletuhin ang in-person enrolment$q$,
    "description_fil" = $q$Kunin ang Student Pass mo sa ICA, kumpletuhin ang campus registration, at dumalo sa orientation. Magbukas ng lokal na bank account at i-activate ang student concession card para sa may diskwentong pamasahe.$q$,
    "title_idn" = $q$Tiba dan selesaikan pendaftaran langsung$q$,
    "description_idn" = $q$Ambil Student Pass Anda di ICA, selesaikan registrasi kampus, dan ikuti orientasi. Buka rekening bank lokal dan aktifkan kartu konsesi pelajar untuk potongan harga transportasi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND step_number = 4 AND title = $q$Arrive and Complete In-Person Enrolment$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần thi tiếng Anh để học ở Singapore không?$q$,
    "answer_vi" = $q$Hầu hết các cơ sở tư thục miễn yêu cầu tiếng Anh đối với sinh viên đến từ các quốc gia dùng tiếng Anh làm ngôn ngữ giảng dạy chính. Các nơi khác chấp nhận IELTS 5.5-6.5 hoặc điểm TOEFL/PTE tương đương.$q$,
    "question_fil" = $q$Kailangan ko bang kumuha ng English language test para mag-aral sa Singapore?$q$,
    "answer_fil" = $q$Karamihan ng pribadong institusyon ay hindi humihingi ng English requirement sa mga estudyanteng galing sa mga bansang Ingles ang pangunahing wika ng pagtuturo. May iba namang tumatanggap ng IELTS 5.5-6.5 o katumbas na TOEFL/PTE score.$q$,
    "question_idn" = $q$Apakah saya perlu mengikuti tes bahasa Inggris untuk kuliah di Singapura?$q$,
    "answer_idn" = $q$Sebagian besar institusi swasta membebaskan persyaratan bahasa Inggris bagi mahasiswa dari negara yang menggunakan bahasa Inggris sebagai bahasa pengantar utama. Yang lain menerima IELTS 5.5-6.5 atau skor TOEFL/PTE yang setara.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 1 AND question = $q$Do I need to take an English language test to study in Singapore?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể làm thêm khi đang học ở Singapore không?$q$,
    "answer_vi" = $q$Có. Người giữ Student Pass được làm tối đa 16 giờ mỗi tuần trong học kỳ và làm toàn thời gian trong các kỳ nghỉ chính thức của trường, ở bất kỳ lĩnh vực nào.$q$,
    "question_fil" = $q$Puwede ba akong mag-part-time habang nag-aaral sa Singapore?$q$,
    "answer_fil" = $q$Oo. Puwedeng magtrabaho ang mga may Student Pass nang hanggang 16 oras kada linggo habang may klase at full-time tuwing opisyal na school holiday, sa anumang sektor.$q$,
    "question_idn" = $q$Bisakah saya bekerja paruh waktu sambil kuliah di Singapura?$q$,
    "answer_idn" = $q$Bisa. Pemegang Student Pass boleh bekerja hingga 16 jam per minggu selama semester dan penuh waktu selama libur sekolah resmi, di sektor apa pun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 2 AND question = $q$Can I work part-time while studying in Singapore?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Chi phí sinh hoạt của sinh viên ở Singapore là bao nhiêu?$q$,
    "answer_vi" = $q$Sinh viên thường chi khoảng SGD 1,500-2,500 mỗi tháng (USD 1,100-1,850), bao gồm chỗ ở chung (SGD 600-1,200), ăn uống (SGD 400-600), đi lại (SGD 80-150) và chi tiêu cá nhân.$q$,
    "question_fil" = $q$Magkano ang gastos sa pamumuhay sa Singapore para sa mga estudyante?$q$,
    "answer_fil" = $q$Karaniwang gumagastos ang mga estudyante ng SGD 1,500-2,500 kada buwan (USD 1,100-1,850), na sumasaklaw sa shared accommodation (SGD 600-1,200), pagkain (SGD 400-600), transportasyon (SGD 80-150), at personal na gastusin.$q$,
    "question_idn" = $q$Berapa biaya hidup mahasiswa di Singapura?$q$,
    "answer_idn" = $q$Mahasiswa biasanya menghabiskan SGD 1,500-2,500 per bulan (USD 1,100-1,850), mencakup akomodasi bersama (SGD 600-1,200), makanan (SGD 400-600), transportasi (SGD 80-150), dan pengeluaran pribadi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 3 AND question = $q$What is the cost of living in Singapore for students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Làm thế nào để xin Student Pass của Singapore?$q$,
    "answer_vi" = $q$Cơ sở giáo dục của bạn sẽ nộp hồ sơ thay bạn qua hệ thống SOLAR+ của Cơ quan Di trú và Kiểm soát Cửa khẩu (ICA) sau khi bạn chấp nhận thư mời. Bạn không nên đến Singapore cho tới khi thẻ được chấp thuận.$q$,
    "question_fil" = $q$Paano ako mag-a-apply para sa Singapore Student Pass?$q$,
    "answer_fil" = $q$Ang institusyon mo ang mag-a-apply para sa iyo sa pamamagitan ng SOLAR+ system ng Immigration and Checkpoints Authority (ICA) pagkatapos mong tanggapin ang offer. Huwag bumiyahe papuntang Singapore hangga't hindi pa aprubado ang pass.$q$,
    "question_idn" = $q$Bagaimana cara mengajukan Student Pass Singapura?$q$,
    "answer_idn" = $q$Institusi Anda mengajukan atas nama Anda melalui sistem SOLAR+ Immigration and Checkpoints Authority (ICA) setelah Anda menerima tawaran. Anda tidak boleh berangkat ke Singapura sebelum pass disetujui.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 4 AND question = $q$How do I apply for a Singapore Student Pass?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại Singapore sau khi tốt nghiệp để tìm việc không?$q$,
    "answer_vi" = $q$Singapore không có visa làm việc sau tốt nghiệp riêng. Sinh viên tốt nghiệp thường xin gia hạn Long-Term Visit Pass hoặc xin Employment Pass (EP) khi đã có thư mời làm việc từ một nhà tuyển dụng ở Singapore.$q$,
    "question_fil" = $q$Puwede ba akong manatili sa Singapore pagkatapos magtapos para maghanap ng trabaho?$q$,
    "answer_fil" = $q$Walang nakalaang post-study work visa ang Singapore. Karaniwang nag-a-apply ang mga nagtapos ng extension ng Long-Term Visit Pass o ng Employment Pass (EP) kapag nakakuha na sila ng job offer mula sa employer sa Singapore.$q$,
    "question_idn" = $q$Bisakah saya tinggal di Singapura setelah lulus untuk mencari kerja?$q$,
    "answer_idn" = $q$Singapura tidak memiliki visa kerja pascastudi khusus. Lulusan biasanya mengajukan perpanjangan Long-Term Visit Pass atau Employment Pass (EP) setelah mendapat tawaran kerja dari pemberi kerja di Singapura.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$singapore$q$)
    AND "order" = 5 AND question = $q$Can I stay in Singapore after graduation to find work?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Singapore faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Singapore: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$singapore$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$singapore$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$singapore$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
