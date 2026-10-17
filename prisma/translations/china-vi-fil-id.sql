-- Vietnamese, Filipino and Indonesian content for China.
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
    "tagline_vi" = $q$Học bổng, quy mô và con đường ở lại làm việc$q$,
    "overview_vi" = $q$Trung Quốc đã xây dựng một trong những hệ thống giáo dục quốc tế lớn nhất và tăng trưởng nhanh nhất thế giới, đón khoảng 380.000 sinh viên quốc tế, trong đó khoảng 205.000 theo học các chương trình cấp bằng đầy đủ, tại hàng trăm trường đại học có các lựa chọn giảng dạy bằng tiếng Anh. Học bổng Chính phủ Trung Quốc, gọi là CSC, là một trong những học bổng hào phóng nhất châu Á, chi trả toàn bộ học phí, chỗ ở trong trường, trợ cấp sinh hoạt hằng tháng và bảo hiểm y tế toàn diện cho hàng nghìn sinh viên quốc tế mỗi năm. Học phí cho sinh viên tự túc thường từ CNY 20,000 đến CNY 50,000 mỗi năm, với tổng chi phí gồm sinh hoạt thường nằm trong khoảng CNY 50,000 đến CNY 100,000. Sinh viên tốt nghiệp ngoài EU có bằng thạc sĩ trở lên không còn phải rời Trung Quốc để chuyển visa du học thành visa làm việc; quy định áp dụng từ 2026 cho phép họ nộp đơn xin visa làm việc Z trong vòng một năm sau khi tốt nghiệp, và các thành phố như Thượng Hải và Bắc Kinh có giấy phép thực tập và khởi nghiệp riêng cho sinh viên mới tốt nghiệp bên cạnh các quy định quốc gia.$q$,
    "tagline_fil" = $q$Mga scholarship, laki, at landas para manatili at magtrabaho$q$,
    "overview_fil" = $q$Nakabuo ang China ng isa sa pinakamalaki at pinakamabilis lumagong sistema ng international education sa mundo, na may humigit-kumulang 380,000 international student, mga 205,000 sa kanila ay nasa full degree programme, sa daan-daang university na nag-aalok ng English-taught na opsyon. Ang Chinese Government Scholarship, na kilala bilang CSC, ay isa sa pinakamaluwag sa Asya, na sumasaklaw sa buong tuition, campus accommodation, buwanang living allowance, at komprehensibong medical insurance para sa libu-libong international student kada taon. Karaniwang nasa CNY 20,000 hanggang CNY 50,000 kada taon ang tuition para sa mga self-funded na estudyante, at ang kabuuang gastos kasama ang pamumuhay ay karaniwang nasa pagitan ng CNY 50,000 at CNY 100,000. Hindi na kailangang umalis ng China ang mga non-EU graduate na may Master's degree o mas mataas para gawing work visa ang student visa nila; ang mga regulasyong ipinakilala noong 2026 ay nagpapahintulot sa kanilang mag-apply ng Z work visa sa loob ng isang taon pagkatapos magtapos, at ang mga lungsod gaya ng Shanghai at Beijing ay may sarili ring internship at start-up permit para sa mga bagong nagtapos bukod sa pambansang patakaran.$q$,
    "tagline_idn" = $q$Beasiswa, skala, dan jalur untuk tinggal dan bekerja$q$,
    "overview_idn" = $q$Tiongkok telah membangun salah satu sistem pendidikan internasional terbesar dan paling cepat berkembang di dunia, menampung sekitar 380.000 mahasiswa internasional, sekitar 205.000 di antaranya dalam program gelar penuh, di ratusan universitas yang menawarkan opsi berbahasa pengantar Inggris. Beasiswa Pemerintah Tiongkok, dikenal sebagai CSC, adalah salah satu yang paling murah hati di Asia, mencakup biaya kuliah penuh, akomodasi kampus, tunjangan hidup bulanan, dan asuransi kesehatan komprehensif untuk ribuan mahasiswa internasional setiap tahun. Biaya kuliah bagi mahasiswa mandiri biasanya berkisar dari CNY 20,000 hingga CNY 50,000 per tahun, dengan total biaya termasuk biaya hidup biasanya berada di antara CNY 50,000 dan CNY 100,000. Lulusan non-UE dengan gelar Magister atau lebih tinggi tidak lagi perlu meninggalkan Tiongkok untuk mengubah visa pelajar menjadi visa kerja; peraturan yang diperkenalkan pada 2026 memungkinkan mereka mengajukan visa kerja Z dalam satu tahun setelah lulus, dan kota-kota seperti Shanghai dan Beijing menjalankan izin magang dan startup sendiri bagi lulusan baru di samping aturan nasional.$q$
  WHERE slug = $q$china$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Một trong những chương trình học bổng hào phóng nhất châu Á$q$,
    "description_vi" = $q$Học bổng Chính phủ Trung Quốc, hay CSC, chi trả toàn bộ học phí, chỗ ở trong trường, trợ cấp sinh hoạt hằng tháng từ CNY 2,500 đến CNY 3,500 và bảo hiểm y tế toàn diện, và được trao cho hàng nghìn sinh viên quốc tế mỗi năm.$q$,
    "title_fil" = $q$Isa sa pinakamaluwag na scholarship programme sa Asya$q$,
    "description_fil" = $q$Ang Chinese Government Scholarship, o CSC, ay sumasaklaw sa buong tuition, campus accommodation, buwanang living allowance na CNY 2,500 hanggang CNY 3,500, at komprehensibong medical insurance, at ibinibigay sa libu-libong international student kada taon.$q$,
    "title_idn" = $q$Salah satu program beasiswa paling murah hati di Asia$q$,
    "description_idn" = $q$Beasiswa Pemerintah Tiongkok, atau CSC, mencakup biaya kuliah penuh, akomodasi kampus, tunjangan hidup bulanan CNY 2,500 hingga CNY 3,500, dan asuransi kesehatan komprehensif, dan diberikan kepada ribuan mahasiswa internasional setiap tahun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 1 AND title = $q$One of Asia's Most Generous Scholarship Programmes$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Quy mô mang lại nhiều lựa chọn$q$,
    "description_vi" = $q$Với hàng trăm trường đại học có chương trình giảng dạy bằng tiếng Anh và khoảng 205.000 sinh viên quốc tế học cấp bằng đầy đủ, Trung Quốc mang đến sự đa dạng về cơ sở giáo dục, thành phố và chuyên ngành mà rất ít điểm đến khác sánh được.$q$,
    "title_fil" = $q$Laki na nagbibigay ng pagpipilian$q$,
    "description_fil" = $q$Sa daan-daang university na nag-aalok ng English-taught na programa at humigit-kumulang 205,000 international student sa full degree study, nag-aalok ang China ng lawak ng institusyon, lungsod, at espesyalisasyon na kakaunting destinasyon ang makakatapat.$q$,
    "title_idn" = $q$Skala yang menghadirkan pilihan$q$,
    "description_idn" = $q$Dengan ratusan universitas yang menawarkan program berbahasa pengantar Inggris dan sekitar 205.000 mahasiswa internasional dalam studi gelar penuh, Tiongkok menawarkan ragam institusi, kota, dan spesialisasi yang sulit ditandingi destinasi lain.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 2 AND title = $q$Scale That Brings Choice$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Con đường trực tiếp từ tốt nghiệp đến visa làm việc$q$,
    "description_vi" = $q$Sinh viên tốt nghiệp thạc sĩ và tiến sĩ không còn cần hai năm kinh nghiệm làm việc ở nước ngoài để đủ điều kiện xin visa làm việc Trung Quốc; quy định áp dụng từ 2026 cho phép họ nộp đơn xin visa Z trong vòng một năm sau khi tốt nghiệp, trực tiếp từ tư cách sinh viên.$q$,
    "title_fil" = $q$Direktang ruta mula pagtatapos patungo sa work visa$q$,
    "description_fil" = $q$Hindi na kailangan ng mga nagtapos ng Master's at PhD ng dalawang taong karanasan sa trabaho sa ibang bansa para maging kwalipikado sa Chinese work visa; ang mga regulasyong ipinakilala noong 2026 ay nagpapahintulot sa kanilang mag-apply ng Z visa sa loob ng isang taon pagkatapos magtapos, direkta mula sa kanilang student status.$q$,
    "title_idn" = $q$Jalur langsung dari kelulusan ke visa kerja$q$,
    "description_idn" = $q$Lulusan Magister dan PhD tidak lagi memerlukan dua tahun pengalaman kerja di luar negeri untuk memenuhi syarat visa kerja Tiongkok; peraturan yang diperkenalkan pada 2026 memungkinkan mereka mengajukan visa Z dalam satu tahun setelah lulus, langsung dari status pelajar mereka.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 3 AND title = $q$A Direct Route from Graduation to a Work Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Hỗ trợ cấp thành phố cho sinh viên tốt nghiệp khởi nghiệp$q$,
    "description_vi" = $q$Thượng Hải và Bắc Kinh đều có giấy phép riêng cho phép sinh viên mới tốt nghiệp thực tập, khởi nghiệp hoặc làm việc trong các khu đổi mới sáng tạo được chỉ định tối đa hai năm sau khi hoàn thành bằng cấp, bên cạnh các quy định visa làm việc quốc gia.$q$,
    "title_fil" = $q$Suporta sa antas ng lungsod para sa mga graduate entrepreneur$q$,
    "description_fil" = $q$Parehong may sariling permit ang Shanghai at Beijing na nagpapahintulot sa mga bagong nagtapos na mag-intern, magsimula ng negosyo, o magtrabaho sa mga itinalagang innovation zone nang hanggang dalawang taon pagkatapos ng degree, bukod pa sa pambansang patakaran sa work visa.$q$,
    "title_idn" = $q$Dukungan tingkat kota untuk wirausahawan lulusan$q$,
    "description_idn" = $q$Shanghai dan Beijing sama-sama menjalankan izin sendiri yang memungkinkan lulusan baru magang, memulai bisnis, atau bekerja di zona inovasi yang ditunjuk hingga dua tahun setelah menyelesaikan gelar, di samping aturan visa kerja nasional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 4 AND title = $q$City-Level Support for Graduate Entrepreneurs$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn trường đại học và xác nhận hạn nộp CSC$q$,
    "description_vi" = $q$Quyết định giữa hồ sơ Học bổng Chính phủ Trung Quốc, thực hiện qua cơ quan giáo dục nước bạn hoặc trực tiếp qua trường đại học tiếp nhận, và hồ sơ tự túc. Hạn nộp CSC thường rơi vào tháng 12 đến tháng 3 cho kỳ nhập học mùa thu năm sau.$q$,
    "title_fil" = $q$Piliin ang university at kumpirmahin ang CSC deadline$q$,
    "description_fil" = $q$Magpasya sa pagitan ng aplikasyon sa Chinese Government Scholarship, na idinadaan sa education authority ng bansa mo o direkta sa host university, at self-funded na aplikasyon. Karaniwang nasa pagitan ng December at March ang mga CSC deadline para sa susunod na autumn intake.$q$,
    "title_idn" = $q$Pilih universitas Anda dan pastikan tenggat CSC$q$,
    "description_idn" = $q$Tentukan antara pendaftaran Beasiswa Pemerintah Tiongkok, yang melalui otoritas pendidikan negara asal Anda atau langsung melalui universitas tujuan, dan pendaftaran mandiri. Tenggat CSC biasanya jatuh antara Desember dan Maret untuk penerimaan musim gugur berikutnya.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND step_number = 1 AND title = $q$Choose your university and confirm the CSC deadline$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận Thông báo nhập học cùng mẫu visa$q$,
    "description_vi" = $q$Nộp bảng điểm, kế hoạch học tập và, với các chương trình giảng dạy bằng tiếng Trung, điểm HSK. Sinh viên được nhận sẽ nhận Thông báo nhập học và mẫu JW202 hoặc JW201 cần thiết để xin visa.$q$,
    "title_fil" = $q$Mag-apply at kunin ang Admission Notice at visa form$q$,
    "description_fil" = $q$Isumite ang transcript, study plan, at para sa mga programang itinuturo sa Chinese, HSK score. Ang mga natanggap na estudyante ay makakatanggap ng Admission Notice at ng JW202 o JW201 form na kailangan para mag-apply ng visa.$q$,
    "title_idn" = $q$Daftar dan terima Admission Notice serta formulir visa$q$,
    "description_idn" = $q$Kirim transkrip, rencana studi, dan, untuk program berbahasa Tionghoa, skor HSK. Mahasiswa yang diterima menerima Admission Notice dan formulir JW202 atau JW201 yang diperlukan untuk mengajukan visa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND step_number = 2 AND title = $q$Apply and receive your Admission Notice and visa form$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học X1 hoặc X2$q$,
    "description_vi" = $q$Dùng Thông báo nhập học và mẫu visa để xin visa X1 (khóa học trên 180 ngày) hoặc visa X2 (dưới 180 ngày) tại đại sứ quán hoặc lãnh sự quán Trung Quốc ở nước bạn.$q$,
    "title_fil" = $q$Mag-apply para sa X1 o X2 student visa$q$,
    "description_fil" = $q$Gamitin ang Admission Notice at visa form mo para mag-apply ng X1 visa (mga kursong lampas 180 araw) o X2 visa (wala pang 180 araw) sa embahada o konsulado ng China sa bansa mo.$q$,
    "title_idn" = $q$Ajukan visa pelajar X1 atau X2$q$,
    "description_idn" = $q$Gunakan Admission Notice dan formulir visa Anda untuk mengajukan visa X1 (program lebih dari 180 hari) atau visa X2 (kurang dari 180 hari) di kedutaan atau konsulat Tiongkok di negara asal Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND step_number = 3 AND title = $q$Apply for an X1 or X2 student visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và chuyển visa thành giấy phép cư trú$q$,
    "description_vi" = $q$Người giữ visa X1 phải chuyển visa thành giấy phép cư trú trong vòng 30 ngày sau khi đến, thông qua văn phòng sinh viên quốc tế của trường và Cục An ninh Công cộng địa phương.$q$,
    "title_fil" = $q$Dumating at gawing residence permit ang visa mo$q$,
    "description_fil" = $q$Dapat gawing residence permit ng mga may X1 visa ang kanilang visa sa loob ng 30 araw mula pagdating, sa pamamagitan ng international student office ng university at ng lokal na Public Security Bureau.$q$,
    "title_idn" = $q$Tiba dan ubah visa Anda menjadi izin tinggal$q$,
    "description_idn" = $q$Pemegang visa X1 harus mengubah visanya menjadi izin tinggal dalam 30 hari setelah tiba, melalui kantor mahasiswa internasional universitas dan Biro Keamanan Publik setempat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND step_number = 4 AND title = $q$Arrive and convert your visa to a residence permit$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần nói tiếng Trung để học ở Trung Quốc không?$q$,
    "answer_vi" = $q$Không phải với mọi chương trình. Ngày càng nhiều chương trình, đặc biệt ở bậc thạc sĩ về kinh doanh, kỹ thuật và quan hệ quốc tế, được giảng dạy hoàn toàn bằng tiếng Anh. Các chương trình giảng dạy bằng tiếng Trung thường yêu cầu điểm HSK.$q$,
    "question_fil" = $q$Kailangan ko bang magsalita ng Chinese para mag-aral sa China?$q$,
    "answer_fil" = $q$Hindi para sa bawat programa. Malaki at dumaraming bilang ng degree, lalo na sa Master's level sa business, engineering, at international relations, ang itinuturo nang buo sa Ingles. Karaniwang humihingi ng HSK language score ang mga programang itinuturo sa Chinese.$q$,
    "question_idn" = $q$Apakah saya harus bisa berbahasa Tionghoa untuk kuliah di Tiongkok?$q$,
    "answer_idn" = $q$Tidak untuk setiap program. Semakin banyak gelar, terutama di tingkat Magister di bidang bisnis, teknik, dan hubungan internasional, diajarkan sepenuhnya dalam bahasa Inggris. Program yang diajarkan dalam bahasa Tionghoa biasanya memerlukan skor bahasa HSK.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 1 AND question = $q$Do I need to speak Chinese to study in China?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Du học Trung Quốc tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Học phí cho sinh viên tự túc thường từ CNY 20,000 đến CNY 50,000 mỗi năm. Tính cả chi phí sinh hoạt, tổng chi tiêu hằng năm thường nằm trong khoảng CNY 50,000 đến CNY 100,000, dù người nhận học bổng CSC được chi trả phần lớn khoản này qua học bổng.$q$,
    "question_fil" = $q$Magkano ang gastos sa pag-aaral sa China?$q$,
    "answer_fil" = $q$Karaniwang nasa CNY 20,000 hanggang CNY 50,000 kada taon ang tuition para sa mga self-funded na estudyante. Kasama ang gastos sa pamumuhay, karaniwang nasa pagitan ng CNY 50,000 at CNY 100,000 ang kabuuang taunang gastos, bagama't sinasaklaw ng mga CSC scholarship recipient ang karamihan nito sa pamamagitan ng award nila.$q$,
    "question_idn" = $q$Berapa biaya kuliah di Tiongkok?$q$,
    "answer_idn" = $q$Biaya kuliah bagi mahasiswa mandiri biasanya berkisar dari CNY 20,000 hingga CNY 50,000 per tahun. Termasuk biaya hidup, total pengeluaran tahunan biasanya berada di antara CNY 50,000 dan CNY 100,000, meskipun penerima beasiswa CSC menanggung sebagian besar biaya ini melalui beasiswanya.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 2 AND question = $q$How much does it cost to study in China?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Trung Quốc không?$q$,
    "answer_vi" = $q$Chỉ khi được cho phép. Làm thêm chính thức cần có Thư đồng ý từ trường, giấy xác nhận của nhà tuyển dụng và đăng ký với Cục An ninh Công cộng địa phương, sau đó bạn thường được làm tối đa 8 giờ mỗi tuần trong học kỳ và 16 giờ mỗi tuần trong các kỳ nghỉ chính thức.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa China?$q$,
    "answer_fil" = $q$May awtorisasyon lang. Ang pormal na part-time na trabaho ay nangangailangan ng Consent Letter mula sa university mo, sertipikasyon mula sa employer, at pagpaparehistro sa lokal na Public Security Bureau, pagkatapos nito karaniwang puwede kang magtrabaho nang hanggang 8 oras kada linggo habang may klase at 16 oras kada linggo tuwing opisyal na break.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Tiongkok?$q$,
    "answer_idn" = $q$Hanya dengan otorisasi. Kerja paruh waktu resmi memerlukan Consent Letter dari universitas Anda, sertifikasi dari pemberi kerja, dan registrasi ke Biro Keamanan Publik setempat, setelah itu Anda biasanya dapat bekerja hingga 8 jam per minggu selama semester dan 16 jam per minggu selama libur resmi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 3 AND question = $q$Can I work while studying in China?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Học bổng CSC là gì?$q$,
    "answer_vi" = $q$Học bổng Chính phủ Trung Quốc, hay CSC, là học bổng quốc gia của Trung Quốc dành cho sinh viên quốc tế. Học bổng chi trả toàn bộ học phí, chỗ ở trong trường, trợ cấp hằng tháng và bảo hiểm y tế, và là một trong những chương trình học bổng toàn diện nhất châu Á.$q$,
    "question_fil" = $q$Ano ang CSC scholarship?$q$,
    "answer_fil" = $q$Ang Chinese Government Scholarship, o CSC, ay pambansang scholarship ng China para sa mga international student. Sinasaklaw nito ang buong tuition, campus accommodation, buwanang stipend, at medical insurance, at isa ito sa pinakakomprehensibong scholarship programme sa Asya.$q$,
    "question_idn" = $q$Apa itu beasiswa CSC?$q$,
    "answer_idn" = $q$Beasiswa Pemerintah Tiongkok, atau CSC, adalah beasiswa nasional Tiongkok bagi mahasiswa internasional. Beasiswa ini mencakup biaya kuliah penuh, akomodasi kampus, tunjangan bulanan, dan asuransi kesehatan, dan merupakan salah satu program beasiswa paling komprehensif di Asia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 4 AND question = $q$What is the CSC scholarship?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại và làm việc tại Trung Quốc sau khi tốt nghiệp không?$q$,
    "answer_vi" = $q$Có, nếu bạn có bằng thạc sĩ trở lên. Quy định áp dụng từ 2026 cho phép những sinh viên tốt nghiệp này nộp đơn xin visa làm việc Z trong vòng một năm sau khi tốt nghiệp mà không cần kinh nghiệm làm việc ở nước ngoài trước đó, và các thành phố như Thượng Hải và Bắc Kinh còn có thêm giấy phép thực tập và khởi nghiệp.$q$,
    "question_fil" = $q$Puwede ba akong manatili at magtrabaho sa China pagkatapos magtapos?$q$,
    "answer_fil" = $q$Oo, kung may hawak kang Master's degree o mas mataas. Ang mga regulasyong ipinakilala noong 2026 ay nagpapahintulot sa mga nagtapos na ito na mag-apply ng Z work visa sa loob ng isang taon pagkatapos magtapos, nang hindi kailangan ng naunang karanasan sa trabaho sa ibang bansa, at ang mga lungsod gaya ng Shanghai at Beijing ay nag-aalok ng karagdagang internship at start-up permit.$q$,
    "question_idn" = $q$Bisakah saya tinggal dan bekerja di Tiongkok setelah lulus?$q$,
    "answer_idn" = $q$Bisa, jika Anda memiliki gelar Magister atau lebih tinggi. Peraturan yang diperkenalkan pada 2026 memungkinkan lulusan ini mengajukan visa kerja Z dalam satu tahun setelah lulus, tanpa memerlukan pengalaman kerja di luar negeri sebelumnya, dan kota-kota seperti Shanghai dan Beijing menawarkan izin magang dan startup tambahan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$china$q$)
    AND "order" = 5 AND question = $q$Can I stay and work in China after I graduate?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'China faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'China: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$china$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$china$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$china$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
