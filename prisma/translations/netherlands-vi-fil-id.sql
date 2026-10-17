-- Vietnamese, Filipino and Indonesian content for Netherlands.
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
    "tagline_vi" = $q$Bằng cấp giảng dạy bằng tiếng Anh giữa lòng châu Âu$q$,
    "overview_vi" = $q$Hà Lan có tầm ảnh hưởng vượt xa quy mô của mình trong giáo dục đại học quốc tế. Với hơn 2.200 chương trình cử nhân và thạc sĩ giảng dạy bằng tiếng Anh và hơn 115.000 sinh viên quốc tế, đây là một trong những điểm đến du học dễ tiếp cận nhất châu Âu đối với người không nói tiếng Hà Lan. Giáo dục đại học Hà Lan mang tính thực hành và ứng dụng cao, đặc biệt ở các Trường Đại học Khoa học Ứng dụng (HBO), nơi tập trung vào kỹ năng sẵn sàng đi làm và thực tập bắt buộc. Hệ thống giáo dục Hà Lan được NVAO (Tổ chức Kiểm định Hà Lan-Flemish) kiểm định quốc tế, bảo đảm mọi bằng cấp đáp ứng chuẩn chất lượng châu Âu. Các cơ sở tư thục như Tio và Wittenborg đặc biệt phục vụ sinh viên quốc tế, với các khuôn viên giảng dạy hoàn toàn bằng tiếng Anh tại Amsterdam, Utrecht, Rotterdam và Apeldoorn. Hà Lan cũng có visa Orientation Year (zoekjaar), giấy phép một năm sau tốt nghiệp để tìm việc hoặc khởi nghiệp, khiến đây là điểm đến hấp dẫn với sinh viên quốc tế định hướng nghề nghiệp. Chi phí sinh hoạt tại các thành phố Hà Lan ở mức vừa phải so với chuẩn Tây Âu, thường EUR 900-1,400/tháng đối với sinh viên.$q$,
    "tagline_fil" = $q$Mga English-taught na degree sa puso ng Europa$q$,
    "overview_fil" = $q$Higit na higit ang naaabot ng Netherlands kaysa sa laki nito sa international higher education. Sa mahigit 2,200 English-taught na bachelor's at master's programme at mahigit 115,000 international student, isa ito sa pinakamadaling puntahan na destinasyon sa pag-aaral sa Europa para sa mga hindi nagsasalita ng Dutch. Lubhang praktikal at application-oriented ang Dutch higher education, lalo na sa mga University of Applied Sciences (HBO), na nakatuon sa industry-ready na skills at mandatoryong internship. Akreditado sa buong mundo ang sistema ng edukasyon ng Netherlands ng NVAO (Dutch-Flemish Accreditation Organisation), na tinitiyak na natutugunan ng lahat ng degree ang pamantayan sa kalidad ng Europa. Ang mga pribadong institusyon gaya ng Tio at Wittenborg ay partikular na nagsisilbi sa mga international student, na may mga English-only na campus sa Amsterdam, Utrecht, Rotterdam, at Apeldoorn. Nag-aalok din ang Netherlands ng Orientation Year (zoekjaar) visa, isang isang-taong permit pagkatapos magtapos para maghanap ng trabaho o magsimula ng negosyo, kaya kaakit-akit itong destinasyon para sa mga career-focused na international student. Katamtaman ang gastos sa pamumuhay sa mga lungsod sa Netherlands ayon sa pamantayan ng Kanlurang Europa, karaniwang EUR 900-1,400/buwan para sa mga estudyante.$q$,
    "tagline_idn" = $q$Gelar berbahasa pengantar Inggris di jantung Eropa$q$,
    "overview_idn" = $q$Belanda memiliki pengaruh yang jauh melampaui ukurannya dalam pendidikan tinggi internasional. Dengan lebih dari 2.200 program sarjana dan magister berbahasa pengantar Inggris dan 115.000+ mahasiswa internasional, Belanda adalah salah satu destinasi studi paling mudah diakses di Eropa bagi penutur non-Belanda. Pendidikan tinggi Belanda sangat praktis dan berorientasi terapan, terutama di Universities of Applied Sciences (HBO), yang berfokus pada keterampilan siap kerja dan magang wajib. Sistem pendidikan Belanda terakreditasi internasional oleh NVAO (Dutch-Flemish Accreditation Organisation), memastikan semua gelar memenuhi standar kualitas Eropa. Institusi swasta seperti Tio dan Wittenborg secara khusus melayani mahasiswa internasional, dengan kampus berbahasa Inggris sepenuhnya di Amsterdam, Utrecht, Rotterdam, dan Apeldoorn. Belanda juga menawarkan visa Orientation Year (zoekjaar), izin satu tahun pascalulus untuk mencari kerja atau memulai bisnis, menjadikannya destinasi menarik bagi mahasiswa internasional yang berorientasi karier. Biaya hidup di kota-kota Belanda tergolong moderat menurut standar Eropa Barat, biasanya EUR 900-1,400/bulan bagi mahasiswa.$q$
  WHERE slug = $q$netherlands$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Hơn 2.200 chương trình giảng dạy bằng tiếng Anh$q$,
    "description_vi" = $q$Hà Lan có nhiều chương trình giảng dạy bằng tiếng Anh hơn bất kỳ quốc gia nào ở châu Âu không nói tiếng Anh. Sinh viên có thể học trọn bằng cử nhân hoặc thạc sĩ hoàn toàn bằng tiếng Anh mà không cần học tiếng Hà Lan.$q$,
    "title_fil" = $q$Mahigit 2,200 English-taught na programa$q$,
    "description_fil" = $q$Mas marami ang English-medium na programa ng Netherlands kaysa sa alinmang non-English-speaking na bansa sa Europa. Puwedeng mag-aral ang mga estudyante ng buong bachelor's o master's degree nang buo sa Ingles nang hindi natututo ng Dutch.$q$,
    "title_idn" = $q$Lebih dari 2.200 program berbahasa pengantar Inggris$q$,
    "description_idn" = $q$Belanda memiliki lebih banyak program berbahasa pengantar Inggris daripada negara non-penutur Inggris mana pun di Eropa. Mahasiswa dapat menempuh gelar sarjana atau magister penuh sepenuhnya dalam bahasa Inggris tanpa belajar bahasa Belanda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 1 AND title = $q$2,200+ English-Taught Programmes$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Visa làm việc sau tốt nghiệp 1 năm (Zoekjaar)$q$,
    "description_vi" = $q$Visa Orientation Year cho sinh viên tốt nghiệp 12 tháng sau khi ra trường để tìm việc hoặc khởi nghiệp tại Hà Lan, một trong những quyền làm việc sau tốt nghiệp rộng rãi nhất châu Âu.$q$,
    "title_fil" = $q$1-taong Post-Study Work Visa (Zoekjaar)$q$,
    "description_fil" = $q$Binibigyan ng Orientation Year visa ang mga nagtapos ng 12 buwan pagkatapos magtapos para maghanap ng trabaho o magtayo ng startup sa Netherlands, isa sa pinakamaluwag na post-study work rights sa Europa.$q$,
    "title_idn" = $q$Visa kerja pascastudi 1 tahun (Zoekjaar)$q$,
    "description_idn" = $q$Visa Orientation Year memberi lulusan 12 bulan setelah lulus untuk mencari kerja atau meluncurkan startup di Belanda, salah satu hak kerja pascastudi paling longgar di Eropa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 2 AND title = $q$1-Year Post-Study Work Visa (Zoekjaar)$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Học phí phải chăng so với Anh$q$,
    "description_vi" = $q$Học phí các trường tư thục Hà Lan (EUR 6,000-25,000/năm) thấp hơn đáng kể so với các chương trình tương đương ở Anh hoặc Mỹ. Hà Lan mang đến nền giáo dục chuẩn châu Âu với mức giá chỉ bằng một phần nhỏ so với các nước nói tiếng Anh.$q$,
    "title_fil" = $q$Abot-kayang bayarin kumpara sa UK$q$,
    "description_fil" = $q$Mas mababa nang malaki ang bayarin ng mga pribadong Dutch college (EUR 6,000-25,000/taon) kaysa sa mga katumbas na programa sa UK o US. Nag-aalok ang Netherlands ng edukasyong may pamantayang Europeo sa maliit na bahagi lamang ng presyo sa mga bansang Ingles.$q$,
    "title_idn" = $q$Biaya terjangkau dibandingkan Inggris$q$,
    "description_idn" = $q$Biaya college swasta Belanda (EUR 6,000-25,000/tahun) jauh lebih rendah daripada program setara di Inggris atau AS. Belanda menawarkan pendidikan standar Eropa dengan sebagian kecil harga negara berbahasa Inggris.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 3 AND title = $q$Affordable Fees Compared to the UK$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Trung tâm kinh doanh kết nối quốc tế$q$,
    "description_vi" = $q$Amsterdam và Rotterdam là những thành phố kinh doanh quan trọng bậc nhất châu Âu, nơi đặt trụ sở của Shell, Heineken, ASML, ING và hàng trăm tập đoàn đa quốc gia, mang lại cơ hội thực tập và việc làm cho sinh viên mới tốt nghiệp vượt trội.$q$,
    "title_fil" = $q$Business hub na konektado sa buong mundo$q$,
    "description_fil" = $q$Ang Amsterdam at Rotterdam ay kabilang sa pinakamahalagang business city sa Europa, tahanan ng mga headquarters ng Shell, Heineken, ASML, ING, at daan-daang multinational, na nagbibigay ng pambihirang oportunidad sa internship at trabaho para sa mga nagtapos.$q$,
    "title_idn" = $q$Pusat bisnis yang terhubung secara internasional$q$,
    "description_idn" = $q$Amsterdam dan Rotterdam termasuk kota bisnis terpenting di Eropa, menjadi markas Shell, Heineken, ASML, ING, dan ratusan perusahaan multinasional, menyediakan peluang magang dan kerja lulusan yang luar biasa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 4 AND title = $q$Internationally Connected Business Hub$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn chương trình và cơ sở giáo dục$q$,
    "description_vi" = $q$Tìm hiểu các chương trình giảng dạy bằng tiếng Anh tại các trường đại học và cao đẳng tư thục Hà Lan. Kiểm định NVAO bảo đảm chất lượng: hãy kiểm tra danh sách chính thức tại nvao.net trước khi nộp hồ sơ.$q$,
    "title_fil" = $q$Piliin ang programa at institusyon mo$q$,
    "description_fil" = $q$Saliksikin ang mga English-taught na programa sa mga university at pribadong college sa Netherlands. Tinitiyak ng NVAO accreditation ang kalidad: tingnan ang opisyal na rehistro sa nvao.net bago mag-apply.$q$,
    "title_idn" = $q$Pilih program dan institusi Anda$q$,
    "description_idn" = $q$Teliti program berbahasa Inggris di universitas dan college swasta Belanda. Akreditasi NVAO menjamin kualitas: periksa daftar resmi di nvao.net sebelum mendaftar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND step_number = 1 AND title = $q$Choose Your Programme and Institution$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận thư nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ kèm bảng điểm, điểm thi tiếng Anh (IELTS/TOEFL), bản sao hộ chiếu và thư động lực. Hầu hết các trường cao đẳng tư thục xét tuyển liên tục.$q$,
    "title_fil" = $q$Mag-apply at kunin ang Admission Letter$q$,
    "description_fil" = $q$Isumite ang aplikasyon kasama ang transcript, English test score (IELTS/TOEFL), kopya ng pasaporte, at motivation letter. Karamihan ng pribadong college ay may rolling admissions.$q$,
    "title_idn" = $q$Daftar dan terima surat penerimaan$q$,
    "description_idn" = $q$Kirim aplikasi dengan transkrip akademik, skor tes bahasa Inggris (IELTS/TOEFL), salinan paspor, dan surat motivasi. Sebagian besar college swasta memiliki penerimaan bergulir.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND step_number = 2 AND title = $q$Apply and Receive Admission Letter$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học Hà Lan / MVV$q$,
    "description_vi" = $q$Sinh viên ngoài EU cần có visa nhập cảnh Hà Lan (MVV) và giấy phép cư trú (VVR). Trường sẽ đăng ký cho bạn với IND (Cơ quan Di trú và Nhập tịch). Thời gian xử lý 3-8 tuần.$q$,
    "title_fil" = $q$Mag-apply para sa Dutch Student Visa / MVV$q$,
    "description_fil" = $q$Kailangan ng mga non-EU student ang Dutch entry visa (MVV) at residence permit (VVR). Ire-rehistro ka ng university mo sa IND (Immigration and Naturalisation Service). Tumatagal ng 3-8 linggo ang pagproseso.$q$,
    "title_idn" = $q$Ajukan visa pelajar Belanda / MVV$q$,
    "description_idn" = $q$Mahasiswa non-UE memerlukan visa masuk Belanda (MVV) dan izin tinggal (VVR). Universitas Anda akan mendaftarkan Anda ke IND (Immigration and Naturalisation Service). Pemrosesan memakan waktu 3-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND step_number = 3 AND title = $q$Apply for Dutch Student Visa / MVV$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và đăng ký với chính quyền địa phương$q$,
    "description_vi" = $q$Sau khi đến, hãy đăng ký với chính quyền địa phương (gemeente) trong vòng 5 ngày để nhận BSN (mã số dịch vụ công dân), bắt buộc cho ngân hàng, chăm sóc sức khỏe và thuế.$q$,
    "title_fil" = $q$Dumating at magparehistro sa Municipality$q$,
    "description_fil" = $q$Pagkadating, magparehistro sa lokal na municipality (gemeente) sa loob ng 5 araw para makuha ang BSN (citizen service number), na kailangan para sa banking, healthcare, at buwis.$q$,
    "title_idn" = $q$Tiba dan daftar ke pemerintah kota$q$,
    "description_idn" = $q$Setelah tiba, daftar ke pemerintah kota setempat (gemeente) dalam 5 hari untuk mendapatkan BSN (nomor layanan warga), yang diperlukan untuk perbankan, layanan kesehatan, dan pajak.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND step_number = 4 AND title = $q$Arrive and Register with Municipality$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần nói tiếng Hà Lan để học ở Hà Lan không?$q$,
    "answer_vi" = $q$Không. Hà Lan có nhiều chương trình giảng dạy bằng tiếng Anh hơn bất kỳ quốc gia nào khác ở châu Âu không nói tiếng Anh. Tại các trường cao đẳng tư thục như Tio và Wittenborg, tất cả chương trình đều giảng dạy hoàn toàn bằng tiếng Anh. Không yêu cầu kỹ năng tiếng Hà Lan để nhập học hay theo học.$q$,
    "question_fil" = $q$Kailangan ko bang magsalita ng Dutch para mag-aral sa Netherlands?$q$,
    "answer_fil" = $q$Hindi. Mas marami ang English-taught na programa ng Netherlands kaysa sa alinmang non-English-speaking na bansa sa Europa. Sa mga pribadong college gaya ng Tio at Wittenborg, buo sa Ingles ang pagtuturo ng lahat ng programa. Hindi kailangan ang kasanayan sa Dutch para sa admission o pag-aaral.$q$,
    "question_idn" = $q$Apakah saya harus bisa berbahasa Belanda untuk kuliah di Belanda?$q$,
    "answer_idn" = $q$Tidak. Belanda memiliki lebih banyak program berbahasa pengantar Inggris daripada negara non-penutur Inggris lainnya di Eropa. Di college swasta seperti Tio dan Wittenborg, semua program diajarkan sepenuhnya dalam bahasa Inggris. Kemampuan bahasa Belanda tidak diwajibkan untuk penerimaan maupun studi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 1 AND question = $q$Do I need to speak Dutch to study in the Netherlands?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Hà Lan không?$q$,
    "answer_vi" = $q$Có. Sinh viên ngoài EU có giấy phép cư trú hợp lệ được làm 16 giờ mỗi tuần trong năm học và làm toàn thời gian trong các tháng hè (tháng 6 đến tháng 8). Nhà tuyển dụng của bạn phải có giấy phép lao động hợp lệ cho vị trí của bạn.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Netherlands?$q$,
    "answer_fil" = $q$Oo. Puwedeng magtrabaho ang mga non-EU student na may balidong residence permit nang 16 oras kada linggo sa akademikong taon at full-time tuwing summer (June hanggang August). Dapat may balidong work permit ang employer mo para sa trabaho mo.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Belanda?$q$,
    "answer_idn" = $q$Bisa. Mahasiswa non-UE dengan izin tinggal yang berlaku boleh bekerja 16 jam per minggu selama tahun akademik dan penuh waktu selama bulan-bulan musim panas (Juni hingga Agustus). Pemberi kerja Anda harus memiliki izin kerja yang berlaku untuk pekerjaan Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 2 AND question = $q$Can I work while studying in the Netherlands?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Visa Orientation Year (Zoekjaar) là gì?$q$,
    "answer_vi" = $q$Sau khi tốt nghiệp một chương trình cấp bằng của Hà Lan, sinh viên ngoài EU có thể xin giấy phép cư trú Orientation Year (zoekjaar), cho họ 12 tháng để tìm việc ở trình độ tốt nghiệp hoặc khởi nghiệp tại Hà Lan. Đây là một trong những quyền làm việc sau tốt nghiệp rộng rãi nhất châu Âu.$q$,
    "question_fil" = $q$Ano ang Orientation Year (Zoekjaar) visa?$q$,
    "answer_fil" = $q$Pagkatapos magtapos sa isang Dutch degree programme, puwedeng mag-apply ang mga non-EU student ng Orientation Year (zoekjaar) residence permit, na nagbibigay ng 12 buwan para makahanap ng trabahong pang-graduate o magsimula ng negosyo sa Netherlands. Isa ito sa pinakamaluwag na post-study work rights sa Europa.$q$,
    "question_idn" = $q$Apa itu visa Orientation Year (Zoekjaar)?$q$,
    "answer_idn" = $q$Setelah lulus dari program gelar Belanda, mahasiswa non-UE dapat mengajukan izin tinggal Orientation Year (zoekjaar), yang memberi mereka 12 bulan untuk mencari pekerjaan tingkat lulusan atau memulai bisnis di Belanda. Ini salah satu hak kerja pascastudi paling longgar di Eropa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 3 AND question = $q$What is the Orientation Year (Zoekjaar) visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Bằng đại học Hà Lan có được công nhận quốc tế không?$q$,
    "answer_vi" = $q$Có. Bằng của Hà Lan được NVAO (Tổ chức Kiểm định Hà Lan-Flemish) kiểm định và được công nhận đầy đủ khắp châu Âu và trên thế giới. Wittenborg còn cấp bằng liên kết với University of Brighton (Anh), mang lại chứng chỉ thứ hai được công nhận quốc tế.$q$,
    "question_fil" = $q$Kinikilala ba sa buong mundo ang mga degree ng mga university sa Netherlands?$q$,
    "answer_fil" = $q$Oo. Akreditado ng NVAO (Dutch-Flemish Accreditation Organisation) ang mga Dutch degree at ganap na kinikilala sa buong Europa at sa buong mundo. Nagbibigay din ang Wittenborg ng joint degree kasama ang University of Brighton (UK), na nagbibigay ng pangalawang kinikilalang kredensyal sa buong mundo.$q$,
    "question_idn" = $q$Apakah gelar universitas Belanda diakui secara internasional?$q$,
    "answer_idn" = $q$Ya. Gelar Belanda diakreditasi oleh NVAO (Dutch-Flemish Accreditation Organisation) dan sepenuhnya diakui di seluruh Eropa dan internasional. Wittenborg juga memberikan gelar bersama dengan University of Brighton (Inggris), memberi kredensial kedua yang diakui secara internasional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 4 AND question = $q$Are Dutch university degrees recognised internationally?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Chi phí sinh hoạt của sinh viên ở Hà Lan là bao nhiêu?$q$,
    "answer_vi" = $q$Sinh viên thường chi khoảng EUR 900-1,400 mỗi tháng (USD 1,000-1,550), bao gồm chỗ ở chung (EUR 400-700), ăn uống (EUR 200-300), đi lại (EUR 80-150) và chi tiêu cá nhân. Amsterdam là thành phố đắt nhất; Apeldoorn và các thành phố nhỏ hơn rẻ hơn đáng kể.$q$,
    "question_fil" = $q$Magkano ang gastos sa pamumuhay sa Netherlands para sa mga estudyante?$q$,
    "answer_fil" = $q$Karaniwang gumagastos ang mga estudyante ng EUR 900-1,400 kada buwan (USD 1,000-1,550), na sumasaklaw sa shared accommodation (EUR 400-700), pagkain (EUR 200-300), transportasyon (EUR 80-150), at personal na gastusin. Pinakamahal ang Amsterdam; mas mura nang malaki ang Apeldoorn at mas maliliit na lungsod.$q$,
    "question_idn" = $q$Berapa biaya hidup mahasiswa di Belanda?$q$,
    "answer_idn" = $q$Mahasiswa biasanya menghabiskan EUR 900-1,400 per bulan (USD 1,000-1,550), mencakup akomodasi bersama (EUR 400-700), makanan (EUR 200-300), transportasi (EUR 80-150), dan pengeluaran pribadi. Amsterdam adalah kota termahal; Apeldoorn dan kota-kota yang lebih kecil jauh lebih murah.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$netherlands$q$)
    AND "order" = 5 AND question = $q$What is the cost of living in the Netherlands for students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Netherlands faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Netherlands: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$netherlands$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$netherlands$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$netherlands$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
