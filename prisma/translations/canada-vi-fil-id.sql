-- Vietnamese, Filipino and Indonesian content for Canada.
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
    "tagline_vi" = $q$Nền giáo dục đẳng cấp thế giới, lộ trình định cư lâu dài và chất lượng cuộc sống vượt trội$q$,
    "overview_vi" = $q$Canada là một trong những điểm đến du học được săn đón nhất thế giới, thu hút gần 800.000 sinh viên quốc tế mỗi năm. Hệ thống giáo dục của Canada nổi tiếng về chất lượng và sự đa dạng, từ các trường đại học nghiên cứu được xếp hạng toàn cầu như UBC, McGill và University of Toronto, đến các trường cao đẳng ứng dụng và polytechnic như BCIT, Humber và SAIT với chương trình đào tạo thực hành, sẵn sàng đi làm. Canada là quốc gia song ngữ chính thức với tiếng Anh và tiếng Pháp, cho phép bạn lựa chọn học bằng cả hai ngôn ngữ, và nổi tiếng với xã hội đa văn hóa, cởi mở, nơi sinh viên từ mọi hoàn cảnh đều cảm thấy như ở nhà.

Ngoài học thuật, Giấy phép làm việc sau tốt nghiệp (PGWP) của Canada là một lợi thế quyết định: sinh viên tốt nghiệp từ các cơ sở giáo dục đủ điều kiện của Canada có thể nhận giấy phép làm việc mở có thời hạn tối đa ba năm, giúp họ tích lũy kinh nghiệm làm việc tại Canada, từ đó dẫn thẳng đến các lộ trình thường trú như Canadian Experience Class trong hệ thống Express Entry và các Chương trình Đề cử của Tỉnh bang. Lộ trình từ PGWP đến thường trú nhân này là một trong những con đường nhập cư rõ ràng và dễ tiếp cận nhất trên thế giới.

Đời sống sinh viên ở Canada trải dài từ những thành phố toàn cầu sôi động như Toronto, Vancouver, Montreal đến các thành phố cỡ vừa năng động và những thị trấn đại học gắn kết. Cảnh quan thiên nhiên, hệ thống y tế công, tỷ lệ tội phạm thấp và tinh thần khoan dung công dân khiến Canada trở thành nơi lý tưởng để sinh sống và xây dựng tương lai. Với học phí thấp hơn đáng kể so với các chương trình tương đương ở Mỹ hoặc Anh, cùng nhiều học bổng ở cả cấp liên bang và cấp trường, Canada mang lại giá trị vượt trội cho sinh viên quốc tế đầu tư vào một nền giáo dục toàn cầu.$q$,
    "tagline_fil" = $q$World-class na edukasyon, mga landas sa permanent residency, at walang kapantay na kalidad ng buhay$q$,
    "overview_fil" = $q$Ang Canada ay isa sa mga pinakahinahanap na destinasyon sa pag-aaral sa buong mundo, na umaakit ng halos 800,000 international student bawat taon. Kilala ang sistema ng edukasyon nito sa kalidad at pagkakaiba-iba, mula sa mga research university na kabilang sa pandaigdigang ranking gaya ng UBC, McGill, at University of Toronto, hanggang sa mga applied college at polytechnic gaya ng BCIT, Humber, at SAIT na nagbibigay ng praktikal na pagsasanay na handa na para sa trabaho. Opisyal na bilingual ang Canada sa Ingles at Pranses, kaya may mga opsyon sa pag-aaral sa parehong wika, at tanyag ito sa multicultural at inklusibong lipunan kung saan komportable ang mga estudyante mula sa kahit anong pinagmulan.

Bukod sa akademiko, malaking bentahe ang Post-Graduation Work Permit (PGWP) ng Canada: ang mga nagtapos mula sa mga kwalipikadong institusyon sa Canada ay maaaring makakuha ng open work permit na may bisa hanggang tatlong taon, na nagbibigay-daan para magkaroon ng karanasan sa trabaho sa Canada na direktang nagagamit sa mga landas patungong permanent residency gaya ng Canadian Experience Class sa ilalim ng Express Entry at ng mga Provincial Nominee Program. Ang PGWP-to-PR pipeline na ito ay isa sa pinakamalinaw at pinakamadaling ruta ng imigrasyon sa buong mundo.

Saklaw ng buhay-kampus sa Canada ang mga masiglang pandaigdigang lungsod gaya ng Toronto, Vancouver, at Montreal, pati na ang mga dinamikong katamtamang laki ng lungsod at mga masikip na university town. Ang likas na tanawin, public healthcare system, mababang antas ng krimen, at reputasyon sa pagiging mapagparaya ay ginagawang kahanga-hangang lugar ang Canada para mamuhay at bumuo ng kinabukasan. Dahil mas mababa nang malaki ang tuition fee kaysa sa mga katumbas na programa sa United States o United Kingdom, at sa dami ng scholarship sa antas pederal at institusyonal, napakahusay ng halaga ng Canada para sa mga international student na namumuhunan sa global na edukasyon.$q$,
    "tagline_idn" = $q$Pendidikan kelas dunia, jalur menuju residensi tetap, dan kualitas hidup yang tak tertandingi$q$,
    "overview_idn" = $q$Kanada adalah salah satu destinasi studi yang paling diminati di dunia, menarik hampir 800.000 mahasiswa internasional setiap tahun. Sistem pendidikannya terkenal akan kualitas dan keragamannya, mulai dari universitas riset berperingkat global seperti UBC, McGill, dan University of Toronto, hingga college terapan dan politeknik seperti BCIT, Humber, dan SAIT yang memberikan pelatihan praktis dan siap kerja. Kanada secara resmi dwibahasa, yaitu bahasa Inggris dan Prancis, sehingga tersedia pilihan studi dalam kedua bahasa, dan dikenal dengan masyarakatnya yang multikultural dan inklusif, tempat mahasiswa dari latar belakang apa pun merasa seperti di rumah sendiri.

Selain akademik, Post-Graduation Work Permit (PGWP) Kanada adalah keunggulan yang menentukan: lulusan institusi Kanada yang memenuhi syarat dapat memperoleh izin kerja terbuka yang berlaku hingga tiga tahun, sehingga memperoleh pengalaman kerja di Kanada yang langsung mendukung jalur residensi tetap seperti Canadian Experience Class dalam Express Entry dan Provincial Nominee Program. Jalur dari PGWP menuju PR ini adalah salah satu rute imigrasi paling jelas dan paling mudah diakses di dunia.

Kehidupan kampus di Kanada meliputi kota-kota global yang semarak seperti Toronto, Vancouver, dan Montreal, serta kota berukuran sedang yang dinamis dan kota universitas yang akrab. Keindahan alamnya, sistem layanan kesehatan publik, tingkat kejahatan yang rendah, dan reputasi toleransi warganya menjadikan Kanada tempat yang luar biasa untuk tinggal dan membangun masa depan. Dengan biaya kuliah yang jauh lebih rendah daripada program sebanding di Amerika Serikat atau Inggris, serta beasiswa yang melimpah di tingkat federal maupun institusi, Kanada menawarkan nilai yang sangat baik bagi mahasiswa internasional yang berinvestasi dalam pendidikan global.$q$
  WHERE slug = $q$canada$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Lộ trình PGWP dẫn đến thường trú nhân$q$,
    "description_vi" = $q$Sinh viên tốt nghiệp từ các cơ sở giáo dục đủ điều kiện của Canada có thể nhận Giấy phép làm việc sau tốt nghiệp (PGWP) có thời hạn tối đa ba năm, giúp tích lũy kinh nghiệm làm việc tại Canada cần thiết để xin thường trú qua Express Entry hoặc các Chương trình Đề cử của Tỉnh bang.$q$,
    "title_fil" = $q$PGWP na landas patungong Permanent Residency$q$,
    "description_fil" = $q$Ang mga nagtapos mula sa mga kwalipikadong institusyon sa Canada ay maaaring makakuha ng Post-Graduation Work Permit (PGWP) na hanggang tatlong taon, para magkaroon ng karanasan sa trabaho sa Canada na kailangan para sa permanent residency sa pamamagitan ng Express Entry o ng mga Provincial Nominee Program.$q$,
    "title_idn" = $q$Jalur PGWP menuju Residensi Tetap$q$,
    "description_idn" = $q$Lulusan institusi Kanada yang memenuhi syarat dapat memperoleh Post-Graduation Work Permit (PGWP) hingga tiga tahun, sehingga dapat memperoleh pengalaman kerja di Kanada yang dibutuhkan untuk residensi tetap melalui Express Entry atau Provincial Nominee Program.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 1 AND title = $q$PGWP Pathway to Permanent Residency$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Đại học đẳng cấp thế giới và các trường cao đẳng ứng dụng$q$,
    "description_vi" = $q$Hệ thống giáo dục Canada kết hợp các trường đại học nghiên cứu được xếp hạng toàn cầu (UBC, University of Toronto, McGill) với các trường polytechnic và cao đẳng hàng đầu (BCIT, Humber, SAIT), cung cấp các chương trình thực hành, gắn với nhu cầu doanh nghiệp ở mọi bậc học.$q$,
    "title_fil" = $q$Mga world-class na university at applied college$q$,
    "description_fil" = $q$Pinagsasama ng sistema ng edukasyon ng Canada ang mga research university na kabilang sa pandaigdigang ranking (UBC, University of Toronto, McGill) at ang mga nangungunang polytechnic at college (BCIT, Humber, SAIT) na may praktikal na programang tugma sa pangangailangan ng employer sa bawat antas ng akademya.$q$,
    "title_idn" = $q$Universitas kelas dunia dan college terapan$q$,
    "description_idn" = $q$Sistem pendidikan Kanada memadukan universitas riset berperingkat global (UBC, University of Toronto, McGill) dengan politeknik dan college terkemuka (BCIT, Humber, SAIT) yang menawarkan program praktis dan selaras dengan kebutuhan pemberi kerja di setiap jenjang akademik.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 2 AND title = $q$World-Class Universities and Applied Colleges$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Xã hội an toàn, đa văn hóa và song ngữ$q$,
    "description_vi" = $q$Canada liên tục nằm trong nhóm những quốc gia an toàn và cởi mở nhất thế giới. Chế độ song ngữ chính thức Anh và Pháp, cùng nhiều thập kỷ đa văn hóa hình thành từ nhập cư, tạo nên môi trường thực sự thân thiện với sinh viên từ mọi nền văn hóa và hoàn cảnh.$q$,
    "title_fil" = $q$Ligtas, multicultural, at bilingual na lipunan$q$,
    "description_fil" = $q$Palaging kabilang ang Canada sa pinakaligtas at pinaka-inklusibong bansa sa mundo. Dahil sa opisyal na bilingualism sa Ingles at Pranses, at sa mga dekada ng multiculturalism na hinubog ng imigrasyon, tunay na maaliwalas ang kapaligiran para sa mga estudyante mula sa lahat ng kultura at pinagmulan.$q$,
    "title_idn" = $q$Masyarakat yang aman, multikultural, dan dwibahasa$q$,
    "description_idn" = $q$Kanada secara konsisten termasuk negara paling aman dan paling inklusif di dunia. Dwibahasa resminya dalam bahasa Inggris dan Prancis, ditambah puluhan tahun multikulturalisme yang dibentuk oleh imigrasi, menciptakan lingkungan yang benar-benar ramah bagi mahasiswa dari semua budaya dan latar belakang.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 3 AND title = $q$Safe, Multicultural, and Bilingual Society$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Chi phí học tập hợp lý so với các điểm đến khác$q$,
    "description_vi" = $q$Học phí tại Canada thấp hơn đáng kể so với các chương trình tương đương ở Mỹ hoặc Anh, trong khi chất lượng vẫn cạnh tranh toàn cầu. Nhiều học bổng của trường, tỉnh bang và liên bang giúp giảm thêm gánh nặng tài chính cho sinh viên quốc tế.$q$,
    "title_fil" = $q$Abot-kayang edukasyon kumpara sa iba$q$,
    "description_fil" = $q$Mas mababa nang malaki ang tuition fee sa Canada kaysa sa mga katumbas na programa sa United States o United Kingdom, habang nananatiling globally competitive ang kalidad. Marami ring scholarship mula sa institusyon, probinsya, at pederal na pamahalaan na nagpapagaan pa ng gastusin ng mga international student.$q$,
    "title_idn" = $q$Pendidikan terjangkau dibandingkan negara lain$q$,
    "description_idn" = $q$Biaya kuliah di Kanada jauh lebih rendah daripada program setara di Amerika Serikat atau Inggris, sementara kualitasnya tetap bersaing secara global. Beragam beasiswa dari institusi, provinsi, dan pemerintah federal juga mengurangi beban finansial mahasiswa internasional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 4 AND title = $q$Affordable Education Relative to Peers$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Kết quả việc làm sau tốt nghiệp mạnh mẽ$q$,
    "description_vi" = $q$Nền kinh tế vững mạnh, ngành nghề đa dạng và văn hóa co-op/thực tập của Canada mang lại tỷ lệ có việc làm cao cho sinh viên tốt nghiệp. Các ngành công nghệ, y tế, kỹ thuật và kinh doanh luôn có nhu cầu lớn ở mọi tỉnh bang chính.$q$,
    "title_fil" = $q$Matibay na resulta sa trabaho ng mga nagtapos$q$,
    "description_fil" = $q$Dahil sa matatag na ekonomiya ng Canada, sari-saring industriya, at kultura ng co-op/internship, mataas ang employment rate ng mga nagtapos. Laging in-demand ang mga nagtapos sa tech, healthcare, engineering, at business sa lahat ng pangunahing probinsya.$q$,
    "title_idn" = $q$Hasil kerja lulusan yang kuat$q$,
    "description_idn" = $q$Ekonomi Kanada yang kokoh, industri yang beragam, serta budaya co-op/magang menghasilkan tingkat kerja lulusan yang tinggi. Lulusan bidang teknologi, kesehatan, teknik, dan bisnis selalu dicari di semua provinsi utama.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 5 AND title = $q$Strong Graduate Employment Outcomes$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada advantage 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn cơ sở giáo dục và chương trình$q$,
    "description_vi" = $q$Tìm hiểu các trường đại học và cao đẳng Canada để chọn một Cơ sở giáo dục được chỉ định (DLI) có chương trình bạn mong muốn. Xác nhận điều kiện đầu vào, học phí và việc trường có đủ điều kiện cấp PGWP hay không.$q$,
    "title_fil" = $q$Pumili ng institusyon at programa$q$,
    "description_fil" = $q$Saliksikin ang mga university at college sa Canada para makahanap ng Designated Learning Institution (DLI) na may programang gusto mo. Tiyakin ang mga entry requirement, tuition fee, at kung kwalipikado sa PGWP ang institusyon.$q$,
    "title_idn" = $q$Pilih institusi dan program$q$,
    "description_idn" = $q$Teliti universitas dan college di Kanada untuk menemukan Designated Learning Institution (DLI) yang menawarkan program yang Anda inginkan. Pastikan persyaratan masuk, biaya kuliah, dan kelayakan PGWP institusi tersebut.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND step_number = 1 AND title = $q$Choose Institution and Program$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận thư chấp nhận nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ kèm bảng điểm, chứng chỉ tiếng Anh (IELTS/TOEFL) và các giấy tờ bổ sung theo yêu cầu. Sau khi được nhận, bạn sẽ có Thư chấp nhận nhập học (LOA) cần thiết cho hồ sơ xin visa.$q$,
    "title_fil" = $q$Mag-apply at kumuha ng Letter of Acceptance$q$,
    "description_fil" = $q$Isumite ang aplikasyon kasama ang transcript, English proficiency score (IELTS/TOEFL), at iba pang kinakailangang dokumento. Kapag natanggap ka, makakakuha ka ng Letter of Acceptance (LOA) na kailangan sa visa application mo.$q$,
    "title_idn" = $q$Daftar dan peroleh Letter of Acceptance$q$,
    "description_idn" = $q$Kirim aplikasi Anda beserta transkrip, skor kemampuan bahasa Inggris (IELTS/TOEFL), dan dokumen pendukung lain yang diminta. Setelah diterima, Anda akan mendapat Letter of Acceptance (LOA) yang diperlukan untuk pengajuan visa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND step_number = 2 AND title = $q$Apply and Obtain Letter of Acceptance$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học Canada (Study Permit)$q$,
    "description_vi" = $q$Nộp hồ sơ xin giấy phép du học trực tuyến lên IRCC (Bộ Di trú, Người tị nạn và Quốc tịch Canada). Đính kèm LOA, chứng minh tài chính, hộ chiếu và sinh trắc học. Thời gian xử lý thường là 8-12 tuần.$q$,
    "title_fil" = $q$Mag-apply para sa Canadian Student Visa (Study Permit)$q$,
    "description_fil" = $q$Isumite online ang study permit application mo sa IRCC (Immigration, Refugees and Citizenship Canada). Isama ang LOA, patunay ng pondo, pasaporte, at biometrics. Karaniwang tumatagal ng 8-12 linggo ang pagproseso.$q$,
    "title_idn" = $q$Ajukan Visa Pelajar Kanada (Study Permit)$q$,
    "description_idn" = $q$Kirim permohonan study permit Anda secara online ke IRCC (Immigration, Refugees and Citizenship Canada). Lampirkan LOA, bukti keuangan, paspor, dan biometrik. Pemrosesan biasanya memakan waktu 8-12 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND step_number = 3 AND title = $q$Apply for Canadian Student Visa (Study Permit)$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và nhập học$q$,
    "description_vi" = $q$Khi đến Canada, bạn nhận giấy phép du học tại cửa khẩu. Hoàn tất đăng ký với trường, tham dự buổi định hướng và sử dụng các dịch vụ hỗ trợ dành cho sinh viên quốc tế trong khuôn viên trường.$q$,
    "title_fil" = $q$Dumating at mag-enrol$q$,
    "description_fil" = $q$Pagdating sa Canada, kunin ang study permit mo sa port of entry. Kumpletuhin ang registration sa university o college, dumalo sa orientation, at gamitin ang mga serbisyong pangsuporta para sa mga international student sa campus.$q$,
    "title_idn" = $q$Tiba dan registrasi$q$,
    "description_idn" = $q$Setibanya di Kanada, ambil study permit Anda di pintu masuk. Selesaikan registrasi universitas atau college, ikuti orientasi, dan manfaatkan layanan dukungan kampus untuk mahasiswa internasional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND step_number = 4 AND title = $q$Arrive and Enrol$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Tốt nghiệp và xin PGWP$q$,
    "description_vi" = $q$Sau khi hoàn thành chương trình, hãy nộp đơn xin Giấy phép làm việc sau tốt nghiệp trong vòng 180 ngày kể từ khi nhận kết quả cuối cùng. PGWP cho phép bạn làm việc toàn thời gian ở bất kỳ đâu tại Canada, là nền tảng cho lộ trình thường trú của bạn.$q$,
    "title_fil" = $q$Magtapos at mag-apply para sa PGWP$q$,
    "description_fil" = $q$Pagkatapos ng programa mo, mag-apply para sa Post-Graduation Work Permit sa loob ng 180 araw mula nang matanggap ang final marks mo. Nagbibigay ang PGWP ng karapatang magtrabaho nang full-time saanman sa Canada, at ito ang pundasyon ng PR pathway mo.$q$,
    "title_idn" = $q$Lulus dan ajukan PGWP$q$,
    "description_idn" = $q$Setelah menyelesaikan program, ajukan Post-Graduation Work Permit dalam 180 hari sejak menerima nilai akhir. PGWP memungkinkan Anda bekerja penuh waktu di mana saja di Kanada dan menjadi fondasi jalur PR Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND step_number = 5 AND title = $q$Graduate and Apply for PGWP$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada step 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần IELTS để học ở Canada không?$q$,
    "answer_vi" = $q$Hầu hết các trường đại học và cao đẳng Canada yêu cầu chứng chỉ tiếng Anh như IELTS Academic (thường 6.0-6.5) hoặc TOEFL iBT (80-90 trở lên). Một số trường chấp nhận các chứng chỉ thay thế như Duolingo hoặc PTE. Các trường dạy bằng tiếng Pháp có thể yêu cầu điểm DALF/DELF hoặc TEF.$q$,
    "question_fil" = $q$Kailangan ko ba ng IELTS para mag-aral sa Canada?$q$,
    "answer_fil" = $q$Karamihan ng mga university at college sa Canada ay humihingi ng patunay ng English proficiency gaya ng IELTS Academic (karaniwang 6.0-6.5) o TOEFL iBT (80-90 pataas). May ilang institusyong tumatanggap ng alternatibo gaya ng Duolingo o PTE. Ang mga institusyong French-language ay maaaring humingi ng DALF/DELF o TEF score.$q$,
    "question_idn" = $q$Apakah saya perlu IELTS untuk kuliah di Kanada?$q$,
    "answer_idn" = $q$Sebagian besar universitas dan college di Kanada mewajibkan bukti kemampuan bahasa Inggris seperti IELTS Academic (biasanya 6.0-6.5) atau TOEFL iBT (80-90 ke atas). Beberapa institusi menerima alternatif seperti Duolingo atau PTE. Institusi berbahasa Prancis mungkin meminta skor DALF/DELF atau TEF.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 1 AND question = $q$Do I need IELTS to study in Canada?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Giấy phép làm việc sau tốt nghiệp (PGWP) là gì?$q$,
    "answer_vi" = $q$PGWP là giấy phép làm việc mở dành cho sinh viên quốc tế tốt nghiệp từ các DLI đủ điều kiện của Canada. Giấy phép cho phép bạn làm việc cho bất kỳ nhà tuyển dụng nào ở Canada trong thời gian tương ứng với độ dài chương trình học, tối đa 3 năm. Đây là bước quan trọng để tích lũy kinh nghiệm làm việc tại Canada phục vụ cho thường trú.$q$,
    "question_fil" = $q$Ano ang Post-Graduation Work Permit (PGWP)?$q$,
    "answer_fil" = $q$Ang PGWP ay open work permit para sa mga international graduate ng mga kwalipikadong DLI sa Canada. Puwede kang magtrabaho sa kahit anong employer sa Canada sa loob ng panahong katumbas ng haba ng programa mo, hanggang pinakamataas na 3 taon. Mahalagang hakbang ito para magkaroon ng karanasan sa trabaho sa Canada na kailangan sa permanent residency.$q$,
    "question_idn" = $q$Apa itu Post-Graduation Work Permit (PGWP)?$q$,
    "answer_idn" = $q$PGWP adalah izin kerja terbuka bagi lulusan internasional dari DLI Kanada yang memenuhi syarat. Izin ini memungkinkan Anda bekerja untuk pemberi kerja mana pun di Kanada selama durasi yang sama dengan lama program studi, maksimal 3 tahun. Ini adalah langkah penting untuk memperoleh pengalaman kerja di Kanada demi residensi tetap.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 2 AND question = $q$What is the Post-Graduation Work Permit (PGWP)?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Canada không?$q$,
    "answer_vi" = $q$Có. Sinh viên quốc tế có giấy phép du học hợp lệ được làm thêm tối đa 20 giờ mỗi tuần ngoài khuôn viên trong học kỳ, và làm toàn thời gian trong các kỳ nghỉ theo lịch của trường như kỳ nghỉ hè và nghỉ đông.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Canada?$q$,
    "answer_fil" = $q$Oo. Ang mga international student na may balidong study permit ay puwedeng magtrabaho nang hanggang 20 oras kada linggo sa labas ng campus habang may klase, at full-time tuwing may nakatakdang akademikong break gaya ng summer at winter holiday.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Kanada?$q$,
    "answer_idn" = $q$Bisa. Mahasiswa internasional dengan study permit yang berlaku boleh bekerja hingga 20 jam per minggu di luar kampus selama semester, dan penuh waktu selama libur akademik terjadwal seperti libur musim panas dan musim dingin.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 3 AND question = $q$Can I work while studying in Canada?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Đại học và cao đẳng ở Canada khác nhau như thế nào?$q$,
    "answer_vi" = $q$Các trường đại học cấp bằng cử nhân, thạc sĩ và tiến sĩ, tập trung vào chương trình học thuật và nghiên cứu. Các trường cao đẳng và polytechnic như Humber, BCIT và SAIT cấp văn bằng, chứng chỉ và bằng ứng dụng với chương trình thực hành, định hướng nghề nghiệp và quan hệ chặt chẽ với doanh nghiệp.$q$,
    "question_fil" = $q$Ano ang pagkakaiba ng university at college sa Canada?$q$,
    "answer_fil" = $q$Ang mga university ay nagbibigay ng bachelor's, master's, at doctoral degree na nakatuon sa akademiko at pananaliksik. Ang mga college at polytechnic gaya ng Humber, BCIT, at SAIT ay nagbibigay ng diploma, certificate, at applied degree na may praktikal, career-focused na kurikulum at matibay na partnership sa mga employer.$q$,
    "question_idn" = $q$Apa perbedaan universitas dan college di Kanada?$q$,
    "answer_idn" = $q$Universitas memberikan gelar sarjana, magister, dan doktor dengan fokus pada program akademik dan riset. College dan politeknik seperti Humber, BCIT, dan SAIT menawarkan diploma, sertifikat, dan gelar terapan dengan kurikulum praktis berorientasi karier serta kemitraan kuat dengan pemberi kerja.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 4 AND question = $q$What is the difference between a university and a college in Canada?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Du học Canada tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Học phí dao động từ khoảng CAD 13,000/năm tại các trường cao đẳng cộng đồng đến CAD 55,000/năm cho các chương trình sau đại học cạnh tranh tại các trường đại học hàng đầu. Chi phí sinh hoạt thường thêm CAD 10,000-18,000 mỗi năm tùy thành phố. Vancouver và Toronto đắt đỏ nhất; Bắc Ontario và các tỉnh Maritimes có chi phí thấp hơn.$q$,
    "question_fil" = $q$Magkano ang gastos sa pag-aaral sa Canada?$q$,
    "answer_fil" = $q$Nasa humigit-kumulang CAD 13,000/taon ang tuition sa mga community college hanggang CAD 55,000/taon para sa mga mapagkumpitensyang graduate program sa mga nangungunang university. Karaniwang dagdag na CAD 10,000-18,000 kada taon ang gastos sa pamumuhay depende sa lungsod. Pinakamahal ang Vancouver at Toronto; mas abot-kaya ang Northern Ontario at ang Maritimes.$q$,
    "question_idn" = $q$Berapa biaya kuliah di Kanada?$q$,
    "answer_idn" = $q$Biaya kuliah berkisar dari sekitar CAD 13,000/tahun di community college hingga CAD 55,000/tahun untuk program pascasarjana kompetitif di universitas papan atas. Biaya hidup biasanya menambah CAD 10,000-18,000 per tahun tergantung kota. Vancouver dan Toronto paling mahal; Ontario Utara dan Maritimes lebih terjangkau.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$canada$q$)
    AND "order" = 5 AND question = $q$How much does it cost to study in Canada?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Canada faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Canada: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 5, 5, 5;
END $$;

-- Check (optional): every count below should be 5/5/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$canada$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$canada$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$canada$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
