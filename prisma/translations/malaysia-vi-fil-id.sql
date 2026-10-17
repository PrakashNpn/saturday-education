-- Vietnamese, Filipino and Indonesian content for Malaysia.
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
    "tagline_vi" = $q$Trung tâm giáo dục của châu Á với chi phí chỉ bằng một nửa$q$,
    "overview_vi" = $q$Malaysia đã nhanh chóng xây dựng vị thế một cường quốc giáo dục khu vực, cung cấp các chương trình cấp bằng của Úc, Anh và Mỹ thông qua các cơ sở liên kết được xếp hạng toàn cầu với học phí chỉ bằng một phần nhỏ so với phương Tây. Với hơn 170.000 sinh viên quốc tế đến từ hơn 130 quốc gia, Malaysia nằm trong top 10 điểm đến du học tại châu Á. Các trường như Taylor's, APU, IMU, Curtin và Swinburne có thứ hạng QS cao và quan hệ hợp tác sâu rộng với các tập đoàn đa quốc gia đặt tại Kuala Lumpur và Multimedia Super Corridor. Sinh viên được hưởng lợi từ việc giảng dạy bằng tiếng Anh, một xã hội an toàn, đa văn hóa và chi phí sinh hoạt phải chăng, trung bình MYR 1,500-3,000 mỗi tháng.$q$,
    "tagline_fil" = $q$Education hub ng Asya sa kalahati ng presyo$q$,
    "overview_fil" = $q$Mabilis na ginawang rehiyonal na powerhouse sa edukasyon ng Malaysia ang sarili nito, na nag-aalok ng mga degree programme ng Australia, UK, at US sa pamamagitan ng mga branch campus na kabilang sa pandaigdigang ranking sa maliit na bahagi lamang ng tuition sa Kanluran. Tahanan ito ng mahigit 170,000 international student mula sa mahigit 130 bansa, at kabilang ang Malaysia sa top 10 na destinasyon sa pag-aaral sa Asya. Malakas ang QS ranking at malalim ang partnership sa industriya ng mga university gaya ng Taylor's, APU, IMU, Curtin, at Swinburne sa mga multinational company na nakabase sa Kuala Lumpur at Multimedia Super Corridor. Nakikinabang ang mga estudyante sa English-medium na pagtuturo, ligtas at multicultural na lipunan, at abot-kayang gastos sa pamumuhay na nasa average na MYR 1,500-3,000 kada buwan.$q$,
    "tagline_idn" = $q$Pusat pendidikan Asia dengan separuh harga$q$,
    "overview_idn" = $q$Malaysia dengan cepat membangun dirinya menjadi kekuatan pendidikan regional, menawarkan program gelar Australia, Inggris, dan Amerika melalui kampus cabang berperingkat global dengan biaya kuliah hanya sebagian kecil dari biaya di Barat. Menjadi rumah bagi lebih dari 170.000 mahasiswa internasional dari lebih dari 130 negara, Malaysia termasuk 10 destinasi studi teratas di Asia. Universitas seperti Taylor's, APU, IMU, Curtin, dan Swinburne memiliki peringkat QS yang kuat dan kemitraan industri yang mendalam dengan perusahaan multinasional di Kuala Lumpur dan Multimedia Super Corridor. Mahasiswa diuntungkan oleh pengajaran berbahasa Inggris, masyarakat yang aman dan multikultural, serta biaya hidup terjangkau rata-rata MYR 1,500-3,000 per bulan.$q$
  WHERE slug = $q$malaysia$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bằng của Úc và Anh với mức giá Malaysia$q$,
    "description_vi" = $q$Các cơ sở liên kết của Curtin, Swinburne, University of Reading và UOW cấp cùng loại bằng như trường mẹ, với học phí thấp hơn 40-60% so với học ở nước ngoài.$q$,
    "title_fil" = $q$Mga degree ng Australia at UK sa presyo ng Malaysia$q$,
    "description_fil" = $q$Ang mga branch campus ng Curtin, Swinburne, University of Reading, at UOW ay nagbibigay ng parehong degree gaya ng kanilang parent institution, sa tuition na 40-60% na mas mababa kaysa sa pag-aaral abroad.$q$,
    "title_idn" = $q$Gelar Australia dan Inggris dengan harga Malaysia$q$,
    "description_idn" = $q$Kampus cabang Curtin, Swinburne, University of Reading, dan UOW memberikan gelar yang sama dengan institusi induknya, dengan biaya kuliah 40-60% lebih rendah daripada kuliah di luar negeri.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 1 AND title = $q$Australian & UK Degrees at Malaysian Prices$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Sinh hoạt phí hợp lý, giá trị tốt nhất châu Á$q$,
    "description_vi" = $q$Chi phí sinh hoạt hằng tháng MYR 1,500-3,000 (USD 350-700) đã gồm chỗ ở, ăn uống và đi lại. Malaysia liên tục nằm trong số những điểm đến có chi phí thấp nhất thế giới dành cho sinh viên.$q$,
    "title_fil" = $q$Abot-kayang pamumuhay, pinakamagandang halaga sa Asya$q$,
    "description_fil" = $q$Kasama sa buwanang gastos sa pamumuhay na MYR 1,500-3,000 (USD 350-700) ang tirahan, pagkain, at transportasyon. Palaging kabilang ang Malaysia sa mga pinaka-abot-kayang destinasyon ng estudyante sa mundo.$q$,
    "title_idn" = $q$Biaya hidup terjangkau, nilai terbaik di Asia$q$,
    "description_idn" = $q$Biaya hidup bulanan MYR 1,500-3,000 (USD 350-700) sudah mencakup akomodasi, makanan, dan transportasi. Malaysia secara konsisten termasuk destinasi mahasiswa paling terjangkau di dunia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 2 AND title = $q$Affordable Living — Asia's Best Value$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Giảng dạy bằng tiếng Anh, môi trường đa văn hóa$q$,
    "description_vi" = $q$Ngôn ngữ giáo dục chính thức của Malaysia là tiếng Anh. Sự pha trộn văn hóa Mã Lai, Hoa và Ấn tạo nên trải nghiệm khuôn viên thực sự quốc tế, giúp sinh viên châu Á dễ hòa nhập.$q$,
    "title_fil" = $q$English-medium at multicultural na kapaligiran$q$,
    "description_fil" = $q$Ingles ang opisyal na wika ng edukasyon sa Malaysia. Ang halo ng kulturang Malay, Chinese, at Indian ay lumilikha ng tunay na cosmopolitan na karanasan sa campus na nagpapagaan ng pakikibagay ng mga estudyanteng Asyano.$q$,
    "title_idn" = $q$Berbahasa pengantar Inggris, lingkungan multikultural$q$,
    "description_idn" = $q$Bahasa pendidikan resmi Malaysia adalah bahasa Inggris. Perpaduan budaya Melayu, Tionghoa, dan India menciptakan pengalaman kampus yang benar-benar kosmopolitan dan memudahkan adaptasi sosial mahasiswa Asia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 3 AND title = $q$English-Medium, Multicultural Environment$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Cửa ngõ đến mạng lưới kinh doanh châu Á$q$,
    "description_vi" = $q$Nằm ở trung tâm ASEAN, Malaysia là nơi đặt trụ sở khu vực của Shell, EY, HSBC và hàng trăm tập đoàn đa quốc gia. Sinh viên có cơ hội tiếp cận trực tiếp các vị trí thực tập và việc làm dành cho sinh viên mới tốt nghiệp trong khu vực.$q$,
    "title_fil" = $q$Daan patungo sa mga business network sa Asya$q$,
    "description_fil" = $q$Matatagpuan sa gitna ng ASEAN, tahanan ang Malaysia ng mga rehiyonal na HQ ng Shell, EY, HSBC, at daan-daang multinational. Nakakakuha ang mga estudyante ng direktang access sa mga internship at graduate role sa buong rehiyon.$q$,
    "title_idn" = $q$Gerbang menuju jaringan bisnis Asia$q$,
    "description_idn" = $q$Terletak di jantung ASEAN, Malaysia menjadi markas regional Shell, EY, HSBC, dan ratusan perusahaan multinasional. Mahasiswa mendapat akses langsung ke magang dan posisi lulusan di seluruh kawasan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 4 AND title = $q$Gateway to Asian Business Networks$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn trường đại học và chương trình$q$,
    "description_vi" = $q$Tìm hiểu các trường đại học công lập và tư thục, so sánh học phí và thứ hạng, rồi xác định chương trình và kỳ nhập học bạn muốn (tháng 3, tháng 7 hoặc tháng 11).$q$,
    "title_fil" = $q$Piliin ang university at programa mo$q$,
    "description_fil" = $q$Saliksikin ang mga pampubliko at pribadong university, ihambing ang tuition fee at ranking, at tukuyin ang gusto mong programa at intake (March, July, o November).$q$,
    "title_idn" = $q$Pilih universitas dan program Anda$q$,
    "description_idn" = $q$Teliti universitas negeri dan swasta, bandingkan biaya kuliah dan peringkat, lalu tentukan program dan periode masuk yang Anda inginkan (Maret, Juli, atau November).$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND step_number = 1 AND title = $q$Choose Your University and Programme$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận thư mời nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ kèm bảng điểm, bản sao hộ chiếu và điểm thi tiếng Anh (IELTS 5.5-6.5 tùy trường). Bạn sẽ nhận thư mời có điều kiện hoặc không điều kiện.$q$,
    "title_fil" = $q$Mag-apply at kunin ang Offer Letter$q$,
    "description_fil" = $q$Isumite ang aplikasyon kasama ang transcript, kopya ng pasaporte, at English test score (IELTS 5.5-6.5 depende sa institusyon). Makakatanggap ka ng conditional o unconditional offer.$q$,
    "title_idn" = $q$Daftar dan terima surat tawaran$q$,
    "description_idn" = $q$Kirim aplikasi dengan transkrip akademik, salinan paspor, dan skor tes bahasa Inggris (IELTS 5.5-6.5 tergantung institusi). Anda akan menerima tawaran bersyarat atau tanpa syarat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND step_number = 2 AND title = $q$Apply and Receive Offer Letter$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin Student Pass qua EMGS$q$,
    "description_vi" = $q$Trường sẽ thay bạn nộp hồ sơ visa lên cổng Education Malaysia Global Services (EMGS). Thời gian xử lý thường là 4-8 tuần.$q$,
    "title_fil" = $q$Mag-apply para sa Student Pass sa pamamagitan ng EMGS$q$,
    "description_fil" = $q$Ang university ang magsusumite ng visa application mo sa Education Malaysia Global Services (EMGS) portal para sa iyo. Karaniwang 4-8 linggo ang pagproseso.$q$,
    "title_idn" = $q$Ajukan Student Pass melalui EMGS$q$,
    "description_idn" = $q$Universitas mengajukan permohonan visa Anda ke portal Education Malaysia Global Services (EMGS) atas nama Anda. Pemrosesan biasanya memakan waktu 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND step_number = 3 AND title = $q$Apply for Student Pass via EMGS$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và đăng ký$q$,
    "description_vi" = $q$Bay đến Malaysia, nhận Student Pass tại Cơ quan Di trú, tham dự buổi định hướng của trường và mở tài khoản ngân hàng địa phương. Cuộc sống sinh viên bắt đầu ngay lập tức.$q$,
    "title_fil" = $q$Dumating at magparehistro$q$,
    "description_fil" = $q$Lumipad papuntang Malaysia, kunin ang Student Pass mo sa Immigration, dumalo sa orientation ng university, at magbukas ng lokal na bank account. Agad na magsisimula ang buhay-kampus.$q$,
    "title_idn" = $q$Tiba dan daftar$q$,
    "description_idn" = $q$Terbang ke Malaysia, ambil Student Pass Anda di Imigrasi, ikuti orientasi universitas, dan buka rekening bank lokal. Kehidupan kampus langsung dimulai.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND step_number = 4 AND title = $q$Arrive and Register$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Malaysia có an toàn cho sinh viên quốc tế không?$q$,
    "answer_vi" = $q$Có. Malaysia liên tục nằm trong nhóm những quốc gia an toàn nhất Đông Nam Á, với môi trường chính trị ổn định và tỷ lệ tội phạm thấp. Cộng đồng sinh viên quốc tế đông đảo bảo đảm các dịch vụ hỗ trợ trong trường được xây dựng bài bản.$q$,
    "question_fil" = $q$Ligtas ba ang Malaysia para sa mga international student?$q$,
    "answer_fil" = $q$Oo. Palaging kabilang ang Malaysia sa pinakaligtas na bansa sa Timog-Silangang Asya, na may matatag na kalagayang pampolitika at mababang antas ng krimen. Dahil malaki ang populasyon ng mga international student, matatag ang mga serbisyong pangsuporta sa campus.$q$,
    "question_idn" = $q$Apakah Malaysia aman bagi mahasiswa internasional?$q$,
    "answer_idn" = $q$Ya. Malaysia secara konsisten termasuk negara teraman di Asia Tenggara, dengan lingkungan politik yang stabil dan tingkat kejahatan rendah. Populasi mahasiswa internasional yang besar memastikan layanan dukungan kampus yang sudah mapan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 1 AND question = $q$Is Malaysia a safe country for international students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Malaysia không?$q$,
    "answer_vi" = $q$Sinh viên quốc tế được làm việc tối đa 20 giờ mỗi tuần trong học kỳ và làm toàn thời gian trong kỳ nghỉ, ở các lĩnh vực được phép như nhà hàng, trạm xăng và siêu thị mini.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Malaysia?$q$,
    "answer_fil" = $q$Puwedeng magtrabaho ang mga international student nang hanggang 20 oras kada linggo habang may semester, at full-time tuwing semester break, sa mga pinahihintulutang sektor gaya ng restaurant, gasolinahan, at mini market.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Malaysia?$q$,
    "answer_idn" = $q$Mahasiswa internasional boleh bekerja hingga 20 jam per minggu selama semester, dan penuh waktu selama libur semester, di sektor yang diizinkan seperti restoran, pom bensin, dan minimarket.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 2 AND question = $q$Can I work while studying in Malaysia?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi cần điểm tiếng Anh bao nhiêu?$q$,
    "answer_vi" = $q$Yêu cầu khác nhau tùy trường: hầu hết các trường đại học tư yêu cầu IELTS 5.5-6.5 (hoặc TOEFL/PTE tương đương). Các cơ sở liên kết của đại học Úc và Anh thường yêu cầu IELTS 6.0-6.5.$q$,
    "question_fil" = $q$Anong English language score ang kailangan ko?$q$,
    "answer_fil" = $q$Nag-iiba ang requirement depende sa institusyon: karamihan ng pribadong university ay humihingi ng IELTS 5.5-6.5 (o katumbas na TOEFL/PTE). Ang mga branch campus ng mga university sa Australia at UK ay karaniwang humihingi ng IELTS 6.0-6.5.$q$,
    "question_idn" = $q$Berapa skor bahasa Inggris yang saya butuhkan?$q$,
    "answer_idn" = $q$Persyaratan bervariasi per institusi: sebagian besar universitas swasta mensyaratkan IELTS 5.5-6.5 (atau TOEFL/PTE yang setara). Kampus cabang universitas Australia dan Inggris biasanya mensyaratkan IELTS 6.0-6.5.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 3 AND question = $q$What English language score do I need?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Làm thế nào để xin visa du học Malaysia?$q$,
    "answer_vi" = $q$Trường của bạn sẽ thay bạn nộp hồ sơ qua hệ thống trực tuyến Education Malaysia Global Services (EMGS) sau khi bạn chấp nhận thư mời và đóng tiền đặt cọc. Thời gian xử lý 4-8 tuần.$q$,
    "question_fil" = $q$Paano ako mag-a-apply para sa Malaysian student visa?$q$,
    "answer_fil" = $q$Ang university mo ang mag-a-apply para sa iyo sa pamamagitan ng online system ng Education Malaysia Global Services (EMGS) pagkatapos mong tanggapin ang offer at bayaran ang deposit. Tumatagal ng 4-8 linggo ang pagproseso.$q$,
    "question_idn" = $q$Bagaimana cara mengajukan visa pelajar Malaysia?$q$,
    "answer_idn" = $q$Universitas Anda mengajukan atas nama Anda melalui sistem online Education Malaysia Global Services (EMGS) setelah Anda menerima tawaran dan membayar deposit. Pemrosesan memakan waktu 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 4 AND question = $q$How do I apply for a Malaysian student visa?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Chi phí sinh hoạt của sinh viên ở Malaysia là bao nhiêu?$q$,
    "answer_vi" = $q$Sinh viên thường chi khoảng MYR 1,500-3,000 mỗi tháng (USD 350-700), bao gồm chỗ ở chung (MYR 400-800), ăn uống (MYR 400-600), đi lại (MYR 100-200) và chi tiêu cá nhân.$q$,
    "question_fil" = $q$Magkano ang gastos sa pamumuhay sa Malaysia para sa mga estudyante?$q$,
    "answer_fil" = $q$Karaniwang gumagastos ang mga estudyante ng MYR 1,500-3,000 kada buwan (USD 350-700), na sumasaklaw sa shared accommodation (MYR 400-800), pagkain (MYR 400-600), transportasyon (MYR 100-200), at personal na gastusin.$q$,
    "question_idn" = $q$Berapa biaya hidup mahasiswa di Malaysia?$q$,
    "answer_idn" = $q$Mahasiswa biasanya menghabiskan MYR 1,500-3,000 per bulan (USD 350-700), mencakup akomodasi bersama (MYR 400-800), makan (MYR 400-600), transportasi (MYR 100-200), dan pengeluaran pribadi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$malaysia$q$)
    AND "order" = 5 AND question = $q$What is the cost of living in Malaysia for students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Malaysia faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Malaysia: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$malaysia$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$malaysia$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$malaysia$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
