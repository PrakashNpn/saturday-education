-- Vietnamese, Filipino and Indonesian content for Ireland.
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
    "tagline_vi" = $q$Hòn đảo công nghệ và nhân tài của châu Âu$q$,
    "overview_vi" = $q$Ireland là quốc gia duy nhất ở châu Âu có tiếng Anh là ngôn ngữ bản địa trong khu vực đồng Euro, là cửa ngõ tự nhiên cho sinh viên muốn có bằng cấp được công nhận toàn cầu và tiếp cận trực tiếp thị trường việc làm EU. Là nơi đặt trụ sở châu Âu của Apple, Google, Meta, Microsoft, Amazon và 19 trong số 20 tập đoàn dược phẩm hàng đầu thế giới, Ireland đưa sinh viên vào trung tâm của ngành công nghiệp thực tế. Tám trường đại học có tên trong các bảng xếp hạng thế giới, học phí cạnh tranh so với Anh hoặc Úc, và Chương trình Sau đại học Third Level cho phép sinh viên tốt nghiệp ngoài EU ở lại tối đa 24 tháng sau khi học xong để tìm việc. Với 44.500 sinh viên quốc tế cùng nền văn hóa thân thiện, an toàn, Ireland có tầm ảnh hưởng vượt xa quy mô của mình.$q$,
    "tagline_fil" = $q$Isla ng teknolohiya at talento ng Europa$q$,
    "overview_fil" = $q$Ang Ireland ang nag-iisang katutubong English-speaking na bansa sa Eurozone, kaya natural itong daan para sa mga estudyanteng gustong magkaroon ng degree na kinikilala sa buong mundo at direktang access sa EU job market. Tahanan ito ng mga European headquarters ng Apple, Google, Meta, Microsoft, Amazon, at 19 sa nangungunang 20 pharma company sa mundo, kaya inilalagay ng Ireland ang mga estudyante sa gitna ng tunay na industriya. Walong university ang kabilang sa mga pandaigdigang ranking, kompetitibo ang tuition kumpara sa UK o Australia, at pinapayagan ng Third Level Graduate Programme ang mga non-EU graduate na manatili nang hanggang 24 na buwan pagkatapos ng pag-aaral para maghanap ng trabaho. Sa 44,500 international student at mainit at ligtas na kultura, higit na higit ang naaabot ng Ireland kaysa sa laki nito.$q$,
    "tagline_idn" = $q$Pulau teknologi dan talenta di Eropa$q$,
    "overview_idn" = $q$Irlandia adalah satu-satunya negara berbahasa Inggris asli di zona Euro di Eropa, menjadikannya gerbang alami bagi mahasiswa yang menginginkan gelar yang diakui secara global dengan akses langsung ke pasar kerja Uni Eropa. Menjadi markas besar Eropa bagi Apple, Google, Meta, Microsoft, Amazon, dan 19 dari 20 perusahaan farmasi teratas dunia, Irlandia menempatkan mahasiswa di jantung industri yang nyata. Delapan universitas masuk peringkat dunia, biaya kuliah bersaing dibandingkan Inggris atau Australia, dan Third Level Graduate Programme memungkinkan lulusan non-UE tinggal hingga 24 bulan setelah studi untuk mencari kerja. Dengan 44.500 mahasiswa internasional serta budaya yang hangat dan aman, Irlandia memiliki pengaruh yang jauh melampaui ukurannya.$q$
  WHERE slug = $q$ireland$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Cửa ngõ nói tiếng Anh vào châu Âu$q$,
    "description_vi" = $q$Ireland là quốc gia nói tiếng Anh duy nhất trong khu vực đồng Euro. Sinh viên nhận bằng được giảng dạy hoàn toàn bằng tiếng Anh trong khi sống trong EU, với khả năng di chuyển nghề nghiệp vô song khắp 27 quốc gia châu Âu.$q$,
    "title_fil" = $q$English-speaking na daan patungong Europa$q$,
    "description_fil" = $q$Ang Ireland ang nag-iisang English-speaking na bansa sa Eurozone. Nakakakuha ang mga estudyante ng degree na ganap na itinuturo sa Ingles habang nakatira sa loob ng EU, na walang kapantay na career mobility sa 27 bansa sa Europa.$q$,
    "title_idn" = $q$Gerbang berbahasa Inggris menuju Eropa$q$,
    "description_idn" = $q$Irlandia adalah satu-satunya negara berbahasa Inggris di zona Euro. Mahasiswa memperoleh gelar yang diajarkan sepenuhnya dalam bahasa Inggris sambil tinggal di dalam UE, dengan mobilitas karier tiada tanding di 27 negara Eropa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 1 AND title = $q$English-Speaking Gateway to Europe$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Tiếp cận trực tiếp các tập đoàn dẫn đầu toàn cầu$q$,
    "description_vi" = $q$Apple, Google, Meta, Microsoft, Amazon và 19 trong số 20 tập đoàn dược hàng đầu thế giới đều có cơ sở châu Âu tại Ireland. Sinh viên có thể thực tập, kết nối và khởi đầu sự nghiệp trong các tập đoàn đa quốc gia đẳng cấp thế giới.$q$,
    "title_fil" = $q$Direktang access sa mga pandaigdigang lider ng industriya$q$,
    "description_fil" = $q$May European base sa Ireland ang Apple, Google, Meta, Microsoft, Amazon, at 19 sa nangungunang 20 pharma company sa mundo. Puwedeng mag-intern, mag-network, at magsimula ng karera ang mga estudyante sa loob ng mga world-class na multinational.$q$,
    "title_idn" = $q$Akses langsung ke pemimpin industri global$q$,
    "description_idn" = $q$Apple, Google, Meta, Microsoft, Amazon, dan 19 dari 20 perusahaan farmasi teratas dunia memiliki basis Eropa di Irlandia. Mahasiswa dapat magang, membangun jaringan, dan memulai karier di dalam perusahaan multinasional kelas dunia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 2 AND title = $q$Direct Access to Global Industry Leaders$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Được phép làm việc sau tốt nghiệp tới 24 tháng$q$,
    "description_vi" = $q$Chương trình Sau đại học Third Level (Stamp 1G) cho phép sinh viên tốt nghiệp ngoài EU ở lại 12 tháng sau bậc cử nhân và tới 24 tháng sau bậc thạc sĩ trở lên, với quyền làm việc đầy đủ 40 giờ/tuần.$q$,
    "title_fil" = $q$Hanggang 24 na buwang pahintulot magtrabaho pagkatapos mag-aral$q$,
    "description_fil" = $q$Pinapayagan ng Third Level Graduate Programme (Stamp 1G) ang mga non-EU graduate na manatili nang 12 buwan pagkatapos ng Bachelor's at hanggang 24 na buwan pagkatapos ng Master's o mas mataas, na may buong karapatang magtrabaho nang 40 oras/linggo.$q$,
    "title_idn" = $q$Izin kerja pascastudi hingga 24 bulan$q$,
    "description_idn" = $q$Third Level Graduate Programme (Stamp 1G) memungkinkan lulusan non-UE tinggal 12 bulan setelah S1 dan hingga 24 bulan setelah S2 atau lebih tinggi, dengan hak kerja penuh 40 jam/minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 3 AND title = $q$Up to 24 Months Post-Study Work Permission$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$An toàn, thân thiện và dễ thích nghi$q$,
    "description_vi" = $q$Ireland liên tục nằm trong nhóm những quốc gia an toàn nhất châu Âu. Với dân số chỉ 5 triệu người, các thành phố có quy mô vừa tầm người, cộng đồng gắn kết và dịch vụ hỗ trợ sinh viên trong trường rất đầy đủ.$q$,
    "title_fil" = $q$Ligtas, maaliwalas, at madaling pamahalaan$q$,
    "description_fil" = $q$Palaging kabilang ang Ireland sa pinakaligtas na bansa sa Europa. Sa populasyong 5 milyon lang, sakto sa tao ang laki ng mga lungsod, malapit ang mga komunidad, at malawak ang mga serbisyong pangsuporta sa campus.$q$,
    "title_idn" = $q$Aman, ramah, dan mudah dijalani$q$,
    "description_idn" = $q$Irlandia secara konsisten termasuk negara teraman di Eropa. Dengan penduduk hanya 5 juta jiwa, kota-kotanya berskala manusiawi, komunitasnya akrab, dan layanan dukungan kampusnya lengkap.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 4 AND title = $q$Safe, Welcoming, and Manageable$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Tìm hiểu và nộp hồ sơ vào trường đại học$q$,
    "description_vi" = $q$Xem các khóa học trên Educationinireland.com. Hầu hết các trường yêu cầu IELTS 6.0-6.5 (đại học) hoặc 6.5 trở lên (sau đại học). Nộp hồ sơ trực tiếp cho trường từ tháng 10 trở đi; hạn nộp chính thường rơi vào tháng 2 đến tháng 3.$q$,
    "title_fil" = $q$Magsaliksik at mag-apply sa university$q$,
    "description_fil" = $q$Mag-browse ng mga kurso sa Educationinireland.com. Karamihan ng university ay humihingi ng IELTS 6.0-6.5 (UG) o 6.5+ (PG). Direktang mag-apply sa mga university mula October pataas; karaniwang nasa February hanggang March ang malalaking deadline.$q$,
    "title_idn" = $q$Riset dan daftar ke universitas$q$,
    "description_idn" = $q$Telusuri program di Educationinireland.com. Sebagian besar universitas mensyaratkan IELTS 6.0-6.5 (S1) atau 6.5+ (S2). Daftar langsung ke universitas mulai Oktober; tenggat utama biasanya jatuh pada Februari hingga Maret.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND step_number = 1 AND title = $q$Research & Apply to University$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhận thư mời và đóng tiền đặt cọc$q$,
    "description_vi" = $q$Khi nhận thư mời, hãy đóng tiền đặt cọc học phí và đóng trước ít nhất €6,000 học phí (bắt buộc đối với sinh viên thuộc nhóm quốc gia cần visa). Xác nhận thanh toán này là giấy tờ cốt lõi của hồ sơ visa.$q$,
    "title_fil" = $q$Tanggapin ang offer at bayaran ang deposit$q$,
    "description_fil" = $q$Kapag nakatanggap ng offer, bayaran ang tuition deposit at mag-pre-pay ng hindi bababa sa €6,000 na bayarin (kailangan para sa mga estudyanteng mula sa visa-required na bansa). Pangunahing dokumento sa visa ang kumpirmasyon ng bayad na ito.$q$,
    "title_idn" = $q$Terima tawaran dan bayar deposit$q$,
    "description_idn" = $q$Setelah menerima tawaran, bayar deposit biaya kuliah dan bayar di muka paling sedikit €6,000 biaya kuliah (wajib bagi mahasiswa dari negara yang memerlukan visa). Konfirmasi pembayaran ini merupakan dokumen inti visa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND step_number = 2 AND title = $q$Receive Offer & Pay Deposit$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin Visa du học dài hạn (Loại D)$q$,
    "description_vi" = $q$Nộp hồ sơ trực tuyến qua hệ thống AVATS, sau đó đến buổi hẹn lấy sinh trắc học tại VFS Global. Giấy tờ cần có: thư mời của trường, chứng minh tài chính từ €10,000 trở lên, sao kê ngân hàng 6 tháng, bảo hiểm du lịch và hộ chiếu. Thời gian xử lý 4-8 tuần.$q$,
    "title_fil" = $q$Mag-apply para sa Long-Stay Study Visa (Type D)$q$,
    "description_fil" = $q$Isumite online sa pamamagitan ng AVATS system, pagkatapos ay dumalo sa VFS Global biometric appointment. Mga kailangang dokumento: offer ng university, patunay ng €10,000+ na pondo, 6-buwang bank statement, travel insurance, at pasaporte. Maglaan ng 4-8 linggo.$q$,
    "title_idn" = $q$Ajukan Visa Studi Jangka Panjang (Tipe D)$q$,
    "description_idn" = $q$Ajukan secara online melalui sistem AVATS, lalu hadiri janji temu biometrik di VFS Global. Dokumen yang diperlukan: tawaran universitas, bukti dana €10,000+, rekening koran 6 bulan, asuransi perjalanan, dan paspor. Perkirakan 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND step_number = 3 AND title = $q$Apply for the Long-Stay Study Visa (Type D)$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và đăng ký với ISD$q$,
    "description_vi" = $q$Trong vòng 90 ngày sau khi đến, hãy đăng ký tại Văn phòng Đăng ký Di trú địa phương để nhận thẻ Giấy phép Cư trú Ireland (IRP), tức Stamp 2. Thẻ này cho phép bạn học tập hợp pháp và làm việc 20 giờ/tuần trong học kỳ.$q$,
    "title_fil" = $q$Dumating at magparehistro sa ISD$q$,
    "description_fil" = $q$Sa loob ng 90 araw mula pagdating, magparehistro sa lokal mong Immigration Registration Office para makuha ang Irish Residence Permit (IRP) card, ang Stamp 2. Nagbibigay ito ng legal na pahintulot na mag-aral at magtrabaho nang 20 oras/linggo habang may klase.$q$,
    "title_idn" = $q$Tiba dan daftar ke ISD$q$,
    "description_idn" = $q$Dalam 90 hari setelah tiba, daftar di Kantor Registrasi Imigrasi setempat untuk menerima kartu Irish Residence Permit (IRP), yaitu Stamp 2. Kartu ini memberi Anda izin legal untuk belajar dan bekerja 20 jam/minggu selama semester.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND step_number = 4 AND title = $q$Arrive & Register with ISD$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần visa để du học Ireland từ Myanmar hoặc Thái Lan không?$q$,
    "answer_vi" = $q$Có, cả hai đều là quốc gia cần visa. Hãy nộp hồ sơ xin Visa du học dài hạn (Loại D) qua AVATS và đến buổi hẹn lấy sinh trắc học tại VFS Global. Thời gian xử lý 4-8 tuần (lên tới 12 tuần vào tháng 7 đến tháng 9). Hãy nộp ít nhất 3 tháng trước ngày nhập học.$q$,
    "question_fil" = $q$Kailangan ko ba ng visa para mag-aral sa Ireland mula Myanmar o Thailand?$q$,
    "answer_fil" = $q$Oo, parehong visa-required na bansa ang dalawa. Mag-apply para sa Long-Stay (Type D) Study Visa sa pamamagitan ng AVATS at dumalo sa VFS Global biometric appointment. Maglaan ng 4-8 linggo (hanggang 12 linggo tuwing July hanggang September). Mag-apply nang hindi bababa sa 3 buwan bago ang simula ng pag-aaral.$q$,
    "question_idn" = $q$Apakah saya perlu visa untuk kuliah di Irlandia dari Myanmar atau Thailand?$q$,
    "answer_idn" = $q$Ya, keduanya adalah negara yang mewajibkan visa. Ajukan Visa Studi Jangka Panjang (Tipe D) melalui AVATS dan hadiri janji temu biometrik di VFS Global. Perkirakan 4-8 minggu (hingga 12 minggu pada Juli hingga September). Ajukan paling lambat 3 bulan sebelum tanggal mulai.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 1 AND question = $q$Do I need a visa to study in Ireland from Myanmar or Thailand?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi cần chứng minh bao nhiêu tiền để xin visa du học Ireland?$q$,
    "answer_vi" = $q$Từ ngày 30 tháng 6 năm 2025, bạn phải chứng minh €10,000 cho mỗi năm học trong tài khoản ngân hàng, cùng bằng chứng đã đóng trước ít nhất €6,000 học phí. Số tiền này phải được giữ ít nhất 6 tháng và thể hiện trên sao kê ngân hàng gần đây.$q$,
    "question_fil" = $q$Magkano ang kailangan kong ipakita para sa Ireland student visa?$q$,
    "answer_fil" = $q$Mula 30 June 2025, kailangan mong ipakita ang €10,000 kada taon ng pag-aaral sa isang bank account, kasama ang patunay ng pre-payment ng hindi bababa sa €6,000 na tuition fee. Dapat nakalagak ang pondo nang hindi bababa sa 6 na buwan at makikita sa mga bagong bank statement.$q$,
    "question_idn" = $q$Berapa dana yang harus saya tunjukkan untuk visa pelajar Irlandia?$q$,
    "answer_idn" = $q$Mulai 30 Juni 2025, Anda harus menunjukkan €10,000 per tahun studi di rekening bank, ditambah bukti pembayaran di muka paling sedikit €6,000 biaya kuliah. Dana harus disimpan paling sedikit 6 bulan dan tercantum pada rekening koran terbaru.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 2 AND question = $q$How much money do I need to show for an Ireland student visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Ireland không?$q$,
    "answer_vi" = $q$Có. Với Stamp 2 hợp lệ, bạn được làm tối đa 20 giờ/tuần trong học kỳ và 40 giờ/tuần trong kỳ nghỉ (từ 1 tháng 6 đến 30 tháng 9 và từ 15 tháng 12 đến 15 tháng 1). Bạn cần có mã số PPS và thẻ IRP để làm việc hợp pháp.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Ireland?$q$,
    "answer_fil" = $q$Oo. Kapag may balidong Stamp 2, puwede kang magtrabaho nang hanggang 20 oras/linggo habang may klase at 40 oras/linggo tuwing bakasyon (1 June hanggang 30 September at 15 December hanggang 15 January). Kailangan mo ng PPS number at IRP card para legal na magtrabaho.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Irlandia?$q$,
    "answer_idn" = $q$Bisa. Dengan Stamp 2 yang berlaku, Anda boleh bekerja hingga 20 jam/minggu selama semester dan 40 jam/minggu selama libur (1 Juni hingga 30 September dan 15 Desember hingga 15 Januari). Anda memerlukan nomor PPS dan kartu IRP untuk bekerja secara legal.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 3 AND question = $q$Can I work while studying in Ireland?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Sau khi tốt nghiệp tôi có thể ở lại và làm việc không?$q$,
    "answer_vi" = $q$Có. Chương trình Sau đại học Third Level (Stamp 1G) cho phép 12 tháng tìm việc sau bậc cử nhân, hoặc tới 24 tháng sau bậc thạc sĩ trở lên. Bạn được làm việc toàn thời gian (40 giờ/tuần). 80% sinh viên quốc tế tốt nghiệp tìm được việc trong vòng 9 tháng.$q$,
    "question_fil" = $q$Ano ang mangyayari pagkatapos kong magtapos, puwede ba akong manatili at magtrabaho?$q$,
    "answer_fil" = $q$Oo. Pinapayagan ng Third Level Graduate Programme (Stamp 1G) ang 12 buwan para maghanap ng trabaho pagkatapos ng Bachelor's, o hanggang 24 na buwan pagkatapos ng Master's pataas. Puwede kang magtrabaho nang full-time (40 oras/linggo). 80% ng mga international graduate ay nakakahanap ng trabaho sa loob ng 9 na buwan.$q$,
    "question_idn" = $q$Apa yang terjadi setelah saya lulus, bisakah saya tinggal dan bekerja?$q$,
    "answer_idn" = $q$Bisa. Third Level Graduate Programme (Stamp 1G) memberi 12 bulan untuk mencari kerja setelah S1, atau hingga 24 bulan setelah S2 ke atas. Anda dapat bekerja penuh waktu (40 jam/minggu). 80% lulusan internasional mendapat pekerjaan dalam 9 bulan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 4 AND question = $q$What happens after I graduate — can I stay and work?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Ireland có đắt đỏ so với Anh hoặc Úc không?$q$,
    "answer_vi" = $q$Nhìn chung tương đương với Anh. Ngân sách hằng tháng dao động từ €1,264 đến €2,600 (USD 1,350 đến USD 2,800), Dublin là nơi đắt nhất. Học phí nhìn chung thấp hơn các trường đại học Anh/Úc. Học bổng Giáo dục Quốc tế của Chính phủ Ireland trao 60 suất mỗi năm cho sinh viên quốc tế sau đại học xuất sắc.$q$,
    "question_fil" = $q$Mahal ba ang Ireland kumpara sa UK o Australia?$q$,
    "answer_fil" = $q$Halos kapareho ng UK. Nasa €1,264 hanggang €2,600 (USD 1,350 hanggang USD 2,800) ang buwanang badyet, at ang Dublin ang pinakamahal. Karaniwang mas mababa ang tuition kaysa sa mga university sa UK/Australia. Ang Government of Ireland International Education Scholarship ay nagbibigay ng 60 scholarship kada taon sa mga natatanging international postgrad student.$q$,
    "question_idn" = $q$Apakah Irlandia mahal dibandingkan Inggris atau Australia?$q$,
    "answer_idn" = $q$Secara umum mirip dengan Inggris. Anggaran bulanan berkisar €1,264 hingga €2,600 (USD 1,350 hingga USD 2,800), dengan Dublin yang paling mahal. Biaya kuliah umumnya lebih rendah daripada universitas Inggris/Australia. Government of Ireland International Education Scholarship memberikan 60 beasiswa per tahun kepada mahasiswa pascasarjana internasional berprestasi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 5 AND question = $q$Is Ireland expensive compared to the UK or Australia?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Những khóa học nào đang được săn đón nhất đối với sinh viên quốc tế?$q$,
    "answer_vi" = $q$Khoa học Dữ liệu và AI, Khoa học Máy tính và An ninh mạng, Khoa học Dược, Kinh doanh và Tài chính (MBA/MSc) và Kỹ thuật là những ngành gắn với nghề nghiệp nhất. Các ngành này phù hợp trực tiếp với các ngành công nghệ và dược phẩm thống lĩnh của Ireland.$q$,
    "question_fil" = $q$Anong mga kurso ang pinaka-in-demand sa mga international student?$q$,
    "answer_fil" = $q$Ang Data Science at AI, Computer Science at Cybersecurity, Pharmaceutical Sciences, Business at Finance (MBA/MSc), at Engineering ang pinaka-kaugnay sa karera. Direktang tugma ang mga ito sa nangingibabaw na tech at pharma industry ng Ireland.$q$,
    "question_idn" = $q$Program apa yang paling dicari oleh mahasiswa internasional?$q$,
    "answer_idn" = $q$Data Science dan AI, Ilmu Komputer dan Keamanan Siber, Ilmu Farmasi, Bisnis dan Keuangan (MBA/MSc), serta Teknik adalah yang paling relevan dengan karier. Bidang-bidang ini selaras langsung dengan industri teknologi dan farmasi yang mendominasi Irlandia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$ireland$q$)
    AND "order" = 6 AND question = $q$What are the most in-demand courses for international students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Ireland faq 6: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Ireland: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 6;
END $$;

-- Check (optional): every count below should be 4/4/6.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$ireland$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$ireland$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$ireland$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
