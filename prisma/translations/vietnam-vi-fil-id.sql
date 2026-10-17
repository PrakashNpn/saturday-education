-- Vietnamese, Filipino and Indonesian content for Vietnam.
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
    "tagline_vi" = $q$Học tập chi phí thấp, gần quê nhà$q$,
    "overview_vi" = $q$Việt Nam là một điểm đến du học đang nổi chứ chưa phải một điểm đến đã khẳng định, đón khoảng 22.000 sinh viên quốc tế so với dân số trong nước gần 2,1 triệu người. Điều khiến Việt Nam thú vị là chi phí và sự gần gũi. Học phí tại các trường đại học công lập từ khoảng USD 1,000 đến USD 4,000 mỗi năm và chi phí sinh hoạt nằm giữa USD 400 và USD 650 mỗi tháng, thuộc hàng thấp nhất trong khu vực. Ngày càng nhiều cơ sở tư thục và quốc tế hiện cung cấp các chương trình cấp bằng đầy đủ bằng tiếng Anh, một số cấp bằng nước ngoài ngay tại địa phương, và một số có lộ trình chuyển tiếp cho phép sinh viên bắt đầu ở Việt Nam và hoàn thành ở Mỹ hoặc nơi khác với tổng chi phí chỉ bằng một phần nhỏ. Sinh viên cần lưu ý rằng hiện nay Việt Nam chưa có quy định chính thức về quyền làm thêm cho sinh viên quốc tế, và cũng không có visa làm việc sau tốt nghiệp riêng.$q$,
    "tagline_fil" = $q$Murang pag-aaral na malapit sa tahanan$q$,
    "overview_fil" = $q$Ang Vietnam ay umuusbong na destinasyon sa pag-aaral at hindi pa matatag, na may humigit-kumulang 22,000 international student kumpara sa populasyon ng bansa na halos 2.1 milyon. Ang nagpapaganda rito ay ang gastos at lapit. Nasa USD 1,000 hanggang USD 4,000 kada taon ang tuition sa mga pampublikong university at nasa USD 400 hanggang USD 650 kada buwan ang gastos sa pamumuhay, isa sa pinakamababa sa rehiyon. Dumaraming pribado at internasyonal na institusyon ngayon ang nagbibigay ng buong degree sa Ingles, ang ilan ay nagbibigay ng banyagang kwalipikasyon sa mismong lugar, at ang ilan ay may transfer route na nagpapahintulot sa estudyanteng magsimula sa Vietnam at magtapos sa United States o sa iba pang lugar sa maliit na bahagi ng kabuuang gastos. Dapat malaman ng mga estudyante na wala pang pormal na part time work rights ang Vietnam para sa mga international student sa ngayon, at walang nakalaang post study work visa.$q$,
    "tagline_idn" = $q$Studi berbiaya rendah dekat dari rumah$q$,
    "overview_idn" = $q$Vietnam adalah destinasi studi yang sedang berkembang dan belum mapan, menampung sekitar 22.000 mahasiswa internasional dibandingkan populasi domestik hampir 2,1 juta. Yang membuatnya menarik adalah biaya dan kedekatannya. Biaya kuliah di universitas negeri berkisar dari sekitar USD 1,000 hingga USD 4,000 per tahun dan biaya hidup antara USD 400 dan USD 650 per bulan, termasuk yang terendah di kawasan ini. Semakin banyak institusi swasta dan internasional kini menyelenggarakan gelar penuh dalam bahasa Inggris, beberapa di antaranya memberikan kualifikasi asing secara lokal, dan beberapa menawarkan jalur transfer yang memungkinkan mahasiswa memulai di Vietnam dan menyelesaikan di Amerika Serikat atau tempat lain dengan sebagian kecil dari total biaya. Mahasiswa perlu menyadari bahwa saat ini Vietnam belum memiliki hak kerja paruh waktu resmi bagi mahasiswa internasional, dan tidak ada visa kerja pascastudi khusus.$q$
  WHERE slug = $q$vietnam$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Một trong những chi phí học tập thấp nhất châu Á$q$,
    "description_vi" = $q$Học phí đại học công lập từ khoảng USD 1,000 đến USD 4,000 mỗi năm và chi phí sinh hoạt từ USD 400 đến USD 650 mỗi tháng. Phòng ký túc xá bắt đầu từ khoảng USD 50 mỗi tháng. Với những sinh viên mà ngân sách không cho phép chọn châu Âu hay Úc, Việt Nam giúp một tấm bằng đầy đủ trở nên trong tầm tay.$q$,
    "title_fil" = $q$Isa sa pinakamababang gastos sa pag-aaral sa Asya$q$,
    "description_fil" = $q$Nasa humigit-kumulang USD 1,000 hanggang USD 4,000 kada taon ang tuition sa mga pampublikong university at USD 400 hanggang USD 650 kada buwan ang gastos sa pamumuhay. Nagsisimula sa humigit-kumulang USD 50 kada buwan ang mga dormitory room. Para sa mga estudyanteng hindi kaya ng badyet ang Europa o Australia, abot-kamay sa Vietnam ang buong degree.$q$,
    "title_idn" = $q$Salah satu biaya studi terendah di Asia$q$,
    "description_idn" = $q$Biaya kuliah universitas negeri berkisar sekitar USD 1,000 hingga USD 4,000 per tahun dan biaya hidup antara USD 400 dan USD 650 per bulan. Kamar asrama mulai sekitar USD 50 per bulan. Bagi mahasiswa yang anggarannya tidak memungkinkan Eropa atau Australia, Vietnam membuat gelar penuh terjangkau.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 1 AND title = $q$Among the Lowest Study Costs in Asia$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bằng cấp nước ngoài được cung cấp ngay tại địa phương$q$,
    "description_vi" = $q$Một số cơ sở tại Việt Nam cung cấp các bằng cấp do trường đại học nước ngoài cấp và giảng dạy hoàn toàn bằng tiếng Anh, nên sinh viên có thể nhận bằng của Mỹ hoặc quốc tế mà không cần rời khu vực hay trả học phí kiểu phương Tây.$q$,
    "title_fil" = $q$Mga banyagang degree na iniaalok sa mismong lugar$q$,
    "description_fil" = $q$May ilang institusyon sa Vietnam na nagbibigay ng mga degree mula sa mga banyagang university na itinuturo nang buo sa Ingles, kaya puwedeng makakuha ang estudyante ng American o internasyonal na kwalipikasyon nang hindi umaalis sa rehiyon o nagbabayad ng tuition na pang-Kanluran.$q$,
    "title_idn" = $q$Gelar asing yang diselenggarakan secara lokal$q$,
    "description_idn" = $q$Sejumlah institusi di Vietnam menyelenggarakan gelar yang diberikan universitas asing dan diajarkan sepenuhnya dalam bahasa Inggris, sehingga mahasiswa dapat memperoleh kualifikasi Amerika atau internasional tanpa meninggalkan kawasan atau membayar biaya kuliah Barat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 2 AND title = $q$Foreign Degrees Delivered Locally$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Lộ trình chuyển tiếp đến Mỹ và xa hơn$q$,
    "description_vi" = $q$Một số chương trình được xây dựng để sinh viên hoàn thành hai năm đầu tại Việt Nam và chuyển tiếp ra nước ngoài cho hai năm cuối, trên cùng một bằng cấp xuyên suốt. Đây là một trong những cách rẻ nhất để có được bằng của Mỹ.$q$,
    "title_fil" = $q$Mga transfer route patungong United States at higit pa$q$,
    "description_fil" = $q$May ilang programang binuo para matapos ng estudyante ang unang dalawang taon sa Vietnam at lumipat sa ibang bansa para sa huling dalawa, sa iisang degree sa buong panahon. Isa ito sa pinakamurang paraan para magkaroon ng American degree.$q$,
    "title_idn" = $q$Jalur transfer ke Amerika Serikat dan sekitarnya$q$,
    "description_idn" = $q$Beberapa program disusun agar mahasiswa menyelesaikan dua tahun pertama di Vietnam dan pindah ke luar negeri untuk dua tahun terakhir, dengan gelar yang sama sepanjang waktu. Ini salah satu cara termurah untuk memperoleh gelar Amerika.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 3 AND title = $q$Transfer Routes to the United States and Beyond$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Gần quê nhà và dễ đi lại$q$,
    "description_vi" = $q$Việt Nam chỉ cách Yangon và Bangkok một chuyến bay ngắn, giúp giảm chi phí đi lại và việc về thăm nhà trở nên thiết thực. Khoảng cách văn hóa nhỏ hơn nhiều so với việc chuyển đến châu Âu hay Bắc Mỹ, và nền kinh tế thuộc nhóm tăng trưởng nhanh nhất Đông Nam Á.$q$,
    "title_fil" = $q$Malapit sa tahanan at madaling puntahan$q$,
    "description_fil" = $q$Maikling flight lang ang Vietnam mula Yangon at Bangkok, kaya mababa ang gastos sa biyahe at praktikal ang pag-uwi. Mas maliit nang malaki ang agwat sa kultura kaysa sa paglipat sa Europa o North America, at isa ang ekonomiya sa pinakamabilis lumago sa Timog-Silangang Asya.$q$,
    "title_idn" = $q$Dekat dari rumah dan mudah dijangkau$q$,
    "description_idn" = $q$Vietnam hanya sebentar penerbangan dari Yangon dan Bangkok, yang menekan biaya perjalanan dan membuat kunjungan pulang praktis. Jarak budayanya jauh lebih kecil dibandingkan pindah ke Eropa atau Amerika Utara, dan ekonominya termasuk yang tumbuh paling cepat di Asia Tenggara.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 4 AND title = $q$Close to Home and Easy to Reach$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn chương trình và xác nhận ngôn ngữ giảng dạy$q$,
    "description_vi" = $q$Điều này quan trọng ở Việt Nam hơn ở hầu hết các điểm đến khác. Nhiều chương trình dạy bằng tiếng Việt, một số hoàn toàn bằng tiếng Anh, và một số kết hợp cả hai. Hãy xác nhận bằng văn bản chương trình của bạn dùng ngôn ngữ nào trước khi nộp hồ sơ.$q$,
    "title_fil" = $q$Pumili ng programa at kumpirmahin ang wika ng pagtuturo$q$,
    "description_fil" = $q$Mas mahalaga ito sa Vietnam kaysa sa karamihan ng destinasyon. Maraming degree ang itinuturo sa Vietnamese, ang ilan ay buo sa Ingles, at ang ilan ay pinaghalo ang dalawa. Kumpirmahin nang nakasulat kung aling wika ang gamit ng programa mo bago mag-apply.$q$,
    "title_idn" = $q$Pilih program dan pastikan bahasa pengantar$q$,
    "description_idn" = $q$Ini lebih penting di Vietnam daripada di kebanyakan destinasi. Banyak gelar diajarkan dalam bahasa Vietnam, beberapa sepenuhnya dalam bahasa Inggris, dan beberapa mencampur keduanya. Pastikan secara tertulis bahasa apa yang digunakan program Anda sebelum mendaftar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND step_number = 1 AND title = $q$Choose a programme and confirm the language of instruction$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận giấy tờ nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ trực tiếp cho cơ sở giáo dục kèm bảng điểm, chứng chỉ và hộ chiếu. Bạn cần có giấy tờ nhập học chính thức trong tay trước khi bắt đầu hồ sơ visa, vì cơ sở giáo dục đóng vai trò bảo lãnh cho bạn.$q$,
    "title_fil" = $q$Mag-apply at kunin ang mga admission document mo$q$,
    "description_fil" = $q$Mag-apply nang direkta sa institusyon kasama ang transcript, certificate, at pasaporte. Kailangan mong hawak na ang opisyal na admission document bago makapagsimula ang visa application, dahil ang institusyon ang nagsisilbing sponsor mo.$q$,
    "title_idn" = $q$Daftar dan peroleh dokumen penerimaan$q$,
    "description_idn" = $q$Daftar langsung ke institusi dengan transkrip, sertifikat, dan paspor Anda. Anda memerlukan dokumen penerimaan resmi di tangan sebelum pengajuan visa dapat dimulai, karena institusi bertindak sebagai sponsor Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND step_number = 2 AND title = $q$Apply and obtain your admission documents$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học DH$q$,
    "description_vi" = $q$Việt Nam cấp visa du học riêng theo ký hiệu DH, có giá trị tối đa 12 tháng. Cơ sở giáo dục bảo lãnh nộp hồ sơ lên Cục Quản lý Xuất nhập cảnh Việt Nam để xin thư chấp thuận. Hãy bắt đầu bốn đến sáu tuần trước khi khóa học bắt đầu.$q$,
    "title_fil" = $q$Mag-apply para sa DH student visa$q$,
    "description_fil" = $q$Nagbibigay ang Vietnam ng nakalaang student visa sa ilalim ng DH code, balido nang hanggang 12 buwan. Ang sponsoring institution mo ang magsusumite ng aplikasyon sa Vietnam Immigration Department para sa approval letter. Magsimula apat hanggang anim na linggo bago magsimula ang kurso mo.$q$,
    "title_idn" = $q$Ajukan visa pelajar DH$q$,
    "description_idn" = $q$Vietnam menerbitkan visa pelajar khusus dengan kode DH, berlaku hingga 12 bulan. Institusi sponsor Anda mengajukan permohonan ke Departemen Imigrasi Vietnam untuk surat persetujuan. Mulailah empat hingga enam minggu sebelum program Anda dimulai.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND step_number = 3 AND title = $q$Apply for the DH student visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và xin thẻ tạm trú$q$,
    "description_vi" = $q$Sau khi bắt đầu khóa học, cơ sở giáo dục thường sẽ giúp bạn xin thẻ tạm trú DH, có thể được cấp tối đa năm năm và giúp bạn không phải gia hạn visa nhiều lần. Hộ chiếu của bạn phải còn hiệu lực ít nhất 13 tháng.$q$,
    "title_fil" = $q$Dumating at mag-apply para sa temporary residence card$q$,
    "description_fil" = $q$Kapag nagsimula ka na sa kurso mo, karaniwang tutulungan ka ng institusyon mo na mag-apply ng DH temporary residence card, na puwedeng ibigay nang hanggang limang taon at hindi na kailangang paulit-ulit na i-renew ang visa. Dapat may natitira pang hindi bababa sa 13 buwang bisa ang pasaporte mo.$q$,
    "title_idn" = $q$Tiba dan ajukan kartu izin tinggal sementara$q$,
    "description_idn" = $q$Setelah Anda memulai program, institusi Anda biasanya akan membantu mengajukan kartu izin tinggal sementara DH, yang dapat diberikan hingga lima tahun dan menghemat perpanjangan visa berulang kali. Paspor Anda harus memiliki masa berlaku minimal 13 bulan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND step_number = 4 AND title = $q$Arrive and apply for a temporary residence card$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể học bằng tiếng Anh ở Việt Nam không?$q$,
    "answer_vi" = $q$Có, nhưng hãy kiểm tra từng chương trình. Các trường đại học công lập chủ yếu dạy bằng tiếng Việt, trong khi các cơ sở tư thục và quốc tế ngày càng cung cấp các chương trình cấp bằng đầy đủ bằng tiếng Anh. Một số chương trình dạy một phần bằng tiếng Việt, vì vậy hãy xác nhận bằng văn bản ngôn ngữ giảng dạy trước khi quyết định.$q$,
    "question_fil" = $q$Puwede ba akong mag-aral sa Ingles sa Vietnam?$q$,
    "answer_fil" = $q$Oo, pero suriin ang bawat programa. Karamihan sa Vietnamese nagtuturo ang mga pampublikong university, habang dumarami ang mga pribado at internasyonal na institusyong nagbibigay ng buong degree sa Ingles. May ilang programang bahagyang nasa Vietnamese, kaya kumpirmahin nang nakasulat ang wika ng pagtuturo bago ka mag-commit.$q$,
    "question_idn" = $q$Bisakah saya kuliah dalam bahasa Inggris di Vietnam?$q$,
    "answer_idn" = $q$Bisa, tetapi periksa setiap program. Universitas negeri mengajar sebagian besar dalam bahasa Vietnam, sedangkan institusi swasta dan internasional semakin banyak menyelenggarakan gelar penuh dalam bahasa Inggris. Beberapa program sebagian dalam bahasa Vietnam, jadi pastikan secara tertulis bahasa pengantar sebelum Anda berkomitmen.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 1 AND question = $q$Can I study in English in Vietnam?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Du học Việt Nam tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Học phí đại học công lập từ khoảng USD 1,000 đến USD 4,000 mỗi năm, bậc sau đại học ở mức cao hơn. Các cơ sở tư thục và quốc tế thu cao hơn đáng kể. Chi phí sinh hoạt từ USD 400 đến USD 650 mỗi tháng, với phòng ký túc xá từ khoảng USD 50.$q$,
    "question_fil" = $q$Magkano ang gastos sa pag-aaral sa Vietnam?$q$,
    "answer_fil" = $q$Nasa humigit-kumulang USD 1,000 hanggang USD 4,000 kada taon ang tuition sa mga pampublikong university, na nasa mataas na dulo ang postgraduate study. Mas mataas nang malaki ang singil ng mga pribado at internasyonal na institusyon. Nasa USD 400 hanggang USD 650 kada buwan ang gastos sa pamumuhay, at mula humigit-kumulang USD 50 ang dormitory room.$q$,
    "question_idn" = $q$Berapa biaya kuliah di Vietnam?$q$,
    "answer_idn" = $q$Biaya kuliah universitas negeri berkisar dari sekitar USD 1,000 hingga USD 4,000 per tahun, dengan studi pascasarjana di kisaran atas. Institusi swasta dan internasional mengenakan biaya jauh lebih tinggi. Biaya hidup antara USD 400 dan USD 650 per bulan, dengan kamar asrama mulai sekitar USD 50.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 2 AND question = $q$How much does it cost to study in Vietnam?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể làm thêm khi đang học không?$q$,
    "answer_vi" = $q$Không chính thức. Hiện Việt Nam chưa có quy định cho phép sinh viên làm thêm, dù thực tập được phép mà không cần giấy phép lao động riêng và Bộ Giáo dục và Đào tạo đã đề xuất giới hạn 20 giờ mỗi tuần. Hãy lập kế hoạch tài chính trên cơ sở bạn sẽ không đi làm.$q$,
    "question_fil" = $q$Puwede ba akong mag-part time habang nag-aaral?$q$,
    "answer_fil" = $q$Hindi pormal. Walang student work allowance ang Vietnam sa ngayon, bagama't pinapayagan ang mga internship nang walang hiwalay na work permit at nagmungkahi ang Ministry of Education and Training ng 20 oras na lingguhang limitasyon. Planuhin ang pondo mo na hindi ka magtatrabaho.$q$,
    "question_idn" = $q$Bisakah saya bekerja paruh waktu sambil kuliah?$q$,
    "answer_idn" = $q$Tidak secara resmi. Vietnam saat ini tidak memiliki izin kerja mahasiswa, meskipun magang diizinkan tanpa izin kerja terpisah dan Kementerian Pendidikan dan Pelatihan telah mengusulkan batas 20 jam per minggu. Rencanakan keuangan Anda dengan asumsi Anda tidak akan bekerja.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 3 AND question = $q$Can I work part time while studying?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể chuyển tiếp sang trường đại học ở nước khác không?$q$,
    "answer_vi" = $q$Với một số chương trình thì có. Một số cơ sở có chương trình học hai năm đầu tại Việt Nam và hai năm cuối ở nước ngoài, phổ biến nhất là ở Mỹ. Hãy xác nhận thỏa thuận chuyển tiếp và những trường nào chấp nhận tín chỉ trước khi nhập học.$q$,
    "question_fil" = $q$Puwede ba akong lumipat sa university sa ibang bansa?$q$,
    "answer_fil" = $q$Sa ilang programa, oo. May ilang institusyong may degree kung saan ang unang dalawang taon ay sa Vietnam at ang huling dalawa ay sa ibang bansa, pinakakaraniwan sa United States. Kumpirmahin ang transfer arrangement at kung aling institusyon ang tumatanggap ng credit bago mag-enrol.$q$,
    "question_idn" = $q$Bisakah saya pindah ke universitas di negara lain?$q$,
    "answer_idn" = $q$Pada beberapa program, bisa. Beberapa institusi menjalankan gelar dengan dua tahun pertama di Vietnam dan dua tahun terakhir di luar negeri, paling umum di Amerika Serikat. Pastikan pengaturan transfer dan institusi mana yang menerima kredit sebelum Anda mendaftar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 4 AND question = $q$Can I transfer to a university in another country?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Visa du học kéo dài bao lâu và tôi có thể ở lại sau khi tốt nghiệp không?$q$,
    "answer_vi" = $q$Visa du học DH có thời hạn tối đa 12 tháng và thường được nối tiếp bằng thẻ tạm trú có giá trị tối đa năm năm học. Không có visa làm việc sau tốt nghiệp riêng, vì vậy muốn ở lại làm việc cần có nhà tuyển dụng bảo lãnh giấy phép lao động.$q$,
    "question_fil" = $q$Gaano katagal ang student visa at puwede ba akong manatili pagkatapos magtapos?$q$,
    "answer_fil" = $q$Ang DH student visa ay tumatagal nang hanggang 12 buwan at karaniwang sinusundan ng temporary residence card na balido nang hanggang limang taon ng pag-aaral. Walang nakalaang post study work visa, kaya para manatili at magtrabaho, kailangan ng employer na mag-sponsor ng work permit.$q$,
    "question_idn" = $q$Berapa lama visa pelajar berlaku dan bisakah saya tinggal setelah lulus?$q$,
    "answer_idn" = $q$Visa pelajar DH berlaku hingga 12 bulan dan biasanya diikuti kartu izin tinggal sementara yang berlaku hingga lima tahun masa studi. Tidak ada visa kerja pascastudi khusus, sehingga tinggal untuk bekerja memerlukan pemberi kerja yang mensponsori izin kerja.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$vietnam$q$)
    AND "order" = 5 AND question = $q$How long is the student visa and can I stay after graduating?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Vietnam faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Vietnam: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$vietnam$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$vietnam$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$vietnam$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
