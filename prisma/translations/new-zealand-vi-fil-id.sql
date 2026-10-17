-- Vietnamese, Filipino and Indonesian content for New Zealand.
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
    "tagline_vi" = $q$Nền giáo dục đẳng cấp thế giới trong môi trường thiên nhiên an toàn và tuyệt đẹp$q$,
    "overview_vi" = $q$New Zealand là một trong những điểm đến du học được kính trọng nhất thế giới, liên tục nằm trong nhóm các quốc gia hàng đầu về chất lượng cuộc sống, an toàn và sự xuất sắc học thuật. Đất nước này có tám trường đại học do chính phủ tài trợ và hơn 400 cơ sở đào tạo tư thục, tất cả đều chịu sự quản lý của Cơ quan Văn bằng New Zealand (NZQA). Với trọng tâm là nghiên cứu, đổi mới và phát triển bền vững, các trường đại học New Zealand nằm trong top 3% toàn cầu. Sinh viên quốc tế được làm việc tối đa 20 giờ mỗi tuần trong thời gian học, nhận Visa làm việc sau tốt nghiệp lên tới 3 năm và có các lộ trình thuận lợi đến thường trú, đặc biệt trong những ngành đang thiếu nhân lực như kỹ thuật, CNTT, y tế và nông nghiệp.$q$,
    "tagline_fil" = $q$World-class na edukasyon sa ligtas at napakagandang kapaligiran$q$,
    "overview_fil" = $q$Ang New Zealand ay isa sa mga pinakarespetadong destinasyon sa pag-aaral sa mundo, na palaging kabilang sa mga nangungunang bansa sa kalidad ng buhay, kaligtasan, at kahusayang akademiko. Tahanan ito ng walong university na pinopondohan ng gobyerno at mahigit 400 pribadong training establishment, na pawang kinokontrol ng New Zealand Qualifications Authority (NZQA). Dahil sa matinding diin sa pananaliksik, inobasyon, at sustainability, kabilang ang mga university ng New Zealand sa top 3% sa buong mundo. Nakikinabang ang mga international student sa hanggang 20 oras ng trabaho kada linggo habang nag-aaral, Post Study Work Visa na hanggang 3 taon pagkatapos magtapos, at mga pinadaling landas patungong permanent residency, lalo na sa mga in-demand na larangan gaya ng engineering, IT, health, at agriculture.$q$,
    "tagline_idn" = $q$Pendidikan kelas dunia di lingkungan alam yang aman dan memukau$q$,
    "overview_idn" = $q$Selandia Baru adalah salah satu destinasi studi yang paling dihormati di dunia, secara konsisten masuk jajaran negara teratas dalam kualitas hidup, keamanan, dan keunggulan akademik. Negara ini memiliki delapan universitas yang didanai pemerintah dan lebih dari 400 lembaga pelatihan swasta, semuanya diatur oleh New Zealand Qualifications Authority (NZQA). Dengan penekanan kuat pada riset, inovasi, dan keberlanjutan, universitas di Selandia Baru termasuk 3% teratas secara global. Mahasiswa internasional mendapat manfaat berupa izin bekerja hingga 20 jam per minggu selama studi, Post Study Work Visa hingga 3 tahun setelah lulus, dan jalur residensi tetap yang dipermudah, terutama di bidang yang sangat dibutuhkan seperti teknik, TI, kesehatan, dan pertanian.$q$
  WHERE slug = $q$new-zealand$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Môi trường an toàn và thân thiện$q$,
    "description_vi" = $q$New Zealand liên tục được xếp là một trong những quốc gia an toàn và yên bình nhất thế giới. Văn hóa Kiwi nổi tiếng với sự ấm áp, đa dạng và hòa nhập, giúp sinh viên quốc tế nhanh chóng cảm thấy như ở nhà.$q$,
    "title_fil" = $q$Ligtas at maaliwalas na kapaligiran$q$,
    "description_fil" = $q$Palaging kabilang ang New Zealand sa pinakaligtas at pinakapayapang bansa sa mundo. Kilala ang kulturang Kiwi sa init, pagkakaiba-iba, at pagiging inklusibo, kaya mabilis na nakakaramdam ng pagiging at home ang mga international student.$q$,
    "title_idn" = $q$Lingkungan yang aman dan ramah$q$,
    "description_idn" = $q$Selandia Baru secara konsisten menjadi salah satu negara paling aman dan damai di dunia. Budaya Kiwi dikenal hangat, beragam, dan inklusif, sehingga mahasiswa internasional cepat merasa seperti di rumah.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 1 AND title = $q$Safe and Welcoming Environment$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bằng cấp được công nhận toàn cầu$q$,
    "description_vi" = $q$Cả tám trường đại học của New Zealand đều nằm trong top 3% các trường đại học trên thế giới. Bằng cấp được công nhận quốc tế và được nhà tuyển dụng toàn cầu đánh giá cao, đặc biệt ở Úc, Anh và châu Á.$q$,
    "title_fil" = $q$Mga degree na kinikilala sa buong mundo$q$,
    "description_fil" = $q$Lahat ng walong university sa New Zealand ay kabilang sa top 3% ng mga university sa buong mundo. Kinikilala sa buong mundo ang mga degree at iginagalang ng mga employer, lalo na sa Australia, UK, at Asya.$q$,
    "title_idn" = $q$Gelar yang diakui secara global$q$,
    "description_idn" = $q$Kedelapan universitas Selandia Baru masuk 3% universitas teratas dunia. Gelarnya diakui secara internasional dan dihormati pemberi kerja global, terutama di Australia, Inggris, dan Asia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 2 AND title = $q$Globally Recognised Degrees$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Visa làm việc sau tốt nghiệp lên tới 3 năm$q$,
    "description_vi" = $q$Người giữ visa Graduate có thể sống và làm việc tại New Zealand tới 3 năm sau khi hoàn thành bằng cử nhân trở lên. Visa làm việc mở này cho phép bạn làm việc trong bất kỳ lĩnh vực nào, tích lũy kinh nghiệm và mở đường đến thường trú.$q$,
    "title_fil" = $q$Post-Study Work Visa na hanggang 3 taon$q$,
    "description_fil" = $q$Puwedeng manirahan at magtrabaho sa New Zealand nang hanggang 3 taon ang mga may Graduate visa pagkatapos makumpleto ang bachelor's degree o mas mataas. Pinapayagan ng open work visa na ito na magtrabaho ka sa anumang sektor, bumuo ng karanasan, at maghanda ng landas patungong residency.$q$,
    "title_idn" = $q$Visa kerja pascastudi hingga 3 tahun$q$,
    "description_idn" = $q$Pemegang visa Graduate dapat tinggal dan bekerja di Selandia Baru hingga 3 tahun setelah menyelesaikan gelar sarjana atau lebih tinggi. Visa kerja terbuka ini memungkinkan Anda bekerja di sektor apa pun, membangun pengalaman, dan membuka jalur menuju residensi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 3 AND title = $q$Post-Study Work Visa up to 3 Years$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Vừa học vừa làm$q$,
    "description_vi" = $q$Sinh viên quốc tế được làm việc tối đa 20 giờ mỗi tuần trong học kỳ và không giới hạn giờ trong kỳ nghỉ. Điều này giúp bù đắp chi phí sinh hoạt và tích lũy kinh nghiệm làm việc quý giá tại New Zealand.$q$,
    "title_fil" = $q$Magtrabaho habang nag-aaral$q$,
    "description_fil" = $q$Puwedeng magtrabaho ang mga international student nang hanggang 20 oras kada linggo habang may semester at walang limitasyong oras tuwing break. Nakakatulong ito sa gastusin sa pamumuhay at sa pagkuha ng mahalagang karanasan sa trabaho sa New Zealand.$q$,
    "title_idn" = $q$Bekerja sambil kuliah$q$,
    "description_idn" = $q$Mahasiswa internasional dapat bekerja hingga 20 jam per minggu selama semester dan tanpa batas jam selama libur. Ini membantu menutup biaya hidup dan memperoleh pengalaman kerja berharga di Selandia Baru.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 4 AND title = $q$Work While You Study$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Dẫn đầu về nghiên cứu và đổi mới$q$,
    "description_vi" = $q$New Zealand là quốc gia dẫn đầu toàn cầu về nông nghiệp, khoa học môi trường, sinh học biển và công nghệ địa nhiệt. Các trường như Otago, Auckland và Canterbury được công nhận về nghiên cứu tiên tiến và quan hệ hợp tác với doanh nghiệp.$q$,
    "title_fil" = $q$Lider sa pananaliksik at inobasyon$q$,
    "description_fil" = $q$Pandaigdigang lider ang New Zealand sa agriculture, environmental science, marine biology, at geothermal technology. Kinikilala ang mga university gaya ng Otago, Auckland, at Canterbury sa makabagong pananaliksik at partnership sa industriya.$q$,
    "title_idn" = $q$Pemimpin riset dan inovasi$q$,
    "description_idn" = $q$Selandia Baru adalah pemimpin global dalam pertanian, ilmu lingkungan, biologi kelautan, dan teknologi panas bumi. Universitas seperti Otago, Auckland, dan Canterbury diakui atas riset mutakhir dan kemitraan industri.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 5 AND title = $q$Research & Innovation Leader$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand advantage 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Lộ trình đến thường trú nhân$q$,
    "description_vi" = $q$New Zealand tích cực khuyến khích lao động tay nghề cao nhập cư. Sinh viên tốt nghiệp các ngành đang thiếu nhân lực như CNTT, kỹ thuật và y tế có lộ trình rõ ràng để xin cư trú diện tay nghề, đặc biệt ngoài Auckland.$q$,
    "title_fil" = $q$Landas patungong permanent residency$q$,
    "description_fil" = $q$Aktibong hinihikayat ng New Zealand ang mga skilled migrant. May malinaw na landas ang mga nagtapos sa mga in-demand na larangan gaya ng IT, engineering, at healthcare para makakuha ng skilled migrant residence, lalo na sa labas ng Auckland.$q$,
    "title_idn" = $q$Jalur menuju residensi tetap$q$,
    "description_idn" = $q$Selandia Baru aktif mendorong migran terampil. Lulusan di bidang yang sangat dibutuhkan seperti TI, teknik, dan layanan kesehatan memiliki jalur yang jelas untuk memperoleh residensi migran terampil, terutama di luar Auckland.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 6 AND title = $q$Pathway to Permanent Residency$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand advantage 6: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn trường đại học và chương trình$q$,
    "description_vi" = $q$Tìm hiểu các trường đại học New Zealand thông qua các cơ sở đào tạo đã đăng ký NZQA. Xác nhận yêu cầu tiếng Anh (thường là IELTS 6.0-6.5 cho bậc đại học, 6.5-7.0 cho bậc sau đại học). Kiểm tra điều kiện đầu vào cho chương trình và quốc tịch của bạn.$q$,
    "title_fil" = $q$Piliin ang university at programa mo$q$,
    "description_fil" = $q$Saliksikin ang mga university sa New Zealand gamit ang mga NZQA-registered na provider. Tiyakin ang English language requirement (karaniwang IELTS 6.0-6.5 para sa undergraduate, 6.5-7.0 para sa postgraduate). Tingnan ang entry requirement para sa partikular mong programa at nasyonalidad.$q$,
    "title_idn" = $q$Pilih universitas dan program Anda$q$,
    "description_idn" = $q$Teliti universitas di Selandia Baru melalui penyelenggara terdaftar NZQA. Pastikan persyaratan bahasa Inggris (biasanya IELTS 6.0-6.5 untuk sarjana, 6.5-7.0 untuk pascasarjana). Periksa persyaratan masuk untuk program dan kewarganegaraan Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND step_number = 1 AND title = $q$Choose Your University and Program$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ trực tiếp cho trường$q$,
    "description_vi" = $q$Nộp hồ sơ trực tiếp qua cổng tuyển sinh quốc tế của trường. Bạn sẽ cần bảng điểm, kết quả thi tiếng Anh, thư giới thiệu bản thân và các giấy tờ bổ sung riêng cho chương trình.$q$,
    "title_fil" = $q$Direktang mag-apply sa university$q$,
    "description_fil" = $q$Isumite ang aplikasyon nang direkta sa international admissions portal ng university. Kakailanganin mo ang transcript, resulta ng English proficiency test, personal statement, at iba pang dokumentong tiyak sa programa mo.$q$,
    "title_idn" = $q$Daftar langsung ke universitas$q$,
    "description_idn" = $q$Kirim aplikasi langsung melalui portal penerimaan internasional universitas. Anda memerlukan transkrip akademik, hasil tes kemampuan bahasa Inggris, pernyataan pribadi, dan dokumen pendukung lain yang khusus untuk program Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND step_number = 2 AND title = $q$Apply Directly to the University$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhận Thư mời nhập học (Offer of Place)$q$,
    "description_vi" = $q$Sau khi được nhận, bạn sẽ nhận Offer of Place (thư chấp nhận) chính thức từ trường. Hãy xem kỹ thư, chấp nhận và đóng khoản đặt cọc nhập học cần thiết để giữ chỗ.$q$,
    "title_fil" = $q$Kunin ang Offer of Place$q$,
    "description_fil" = $q$Kapag natanggap ka na, makakakuha ka ng pormal na Offer of Place (acceptance letter) mula sa university. Suriing mabuti ang offer, tanggapin ito, at bayaran ang kinakailangang enrolment deposit para masiguro ang puwesto mo.$q$,
    "title_idn" = $q$Terima Offer of Place$q$,
    "description_idn" = $q$Setelah diterima, Anda akan menerima Offer of Place (surat penerimaan) resmi dari universitas. Tinjau tawaran dengan cermat, terima, dan bayar deposit pendaftaran yang diperlukan untuk mengamankan tempat Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND step_number = 3 AND title = $q$Receive Offer of Place$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học$q$,
    "description_vi" = $q$Nộp hồ sơ xin Visa du học New Zealand trực tuyến qua Immigration New Zealand (immigrationonline.govt.nz). Nộp Offer of Place, chứng minh tài chính (khoảng NZD 15,000/năm cho sinh hoạt), bảo hiểm y tế và vé khứ hồi hoặc bằng chứng tài chính. Thời gian xử lý thường là 4-8 tuần.$q$,
    "title_fil" = $q$Mag-apply para sa Student Visa$q$,
    "description_fil" = $q$Mag-apply para sa New Zealand Student Visa online sa pamamagitan ng Immigration New Zealand (immigrationonline.govt.nz). Isumite ang Offer of Place, patunay ng pondo (humigit-kumulang NZD 15,000/taon para sa pamumuhay), health insurance, at return ticket o patunay ng pondo. Karaniwang 4-8 linggo ang pagproseso.$q$,
    "title_idn" = $q$Ajukan visa pelajar$q$,
    "description_idn" = $q$Ajukan Visa Pelajar Selandia Baru secara online melalui Immigration New Zealand (immigrationonline.govt.nz). Serahkan Offer of Place, bukti dana (sekitar NZD 15,000/tahun untuk biaya hidup), asuransi kesehatan, dan tiket pulang atau bukti dana. Pemrosesan biasanya memakan waktu 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND step_number = 4 AND title = $q$Apply for Student Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và nhập học$q$,
    "description_vi" = $q$Tham dự tuần lễ định hướng tại trường, hoàn tất thủ tục nhập học chính thức, mở tài khoản ngân hàng sinh viên và đăng ký mã số thuế IRD. Đăng ký với bác sĩ gia đình (GP) địa phương để được chăm sóc sức khỏe và kết nối với các dịch vụ hỗ trợ sinh viên quốc tế trong trường.$q$,
    "title_fil" = $q$Dumating at mag-enrol$q$,
    "description_fil" = $q$Dumalo sa orientation week sa university mo, kumpletuhin ang pormal na enrolment, at mag-set up ng student bank account at IRD (tax) number. Magparehistro sa lokal na GP para sa serbisyong pangkalusugan at makipag-ugnayan sa mga serbisyong pangsuporta para sa international student sa campus.$q$,
    "title_idn" = $q$Tiba dan daftar ulang$q$,
    "description_idn" = $q$Ikuti minggu orientasi di universitas Anda, selesaikan pendaftaran resmi, dan buat rekening bank mahasiswa serta nomor IRD (pajak). Daftar ke dokter umum (GP) setempat untuk layanan kesehatan dan hubungi layanan dukungan mahasiswa internasional di kampus.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND step_number = 5 AND title = $q$Arrive and Enrol$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand step 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở New Zealand không?$q$,
    "answer_vi" = $q$Có. Sinh viên quốc tế học toàn thời gian một chương trình kéo dài ít nhất 2 năm tại trường đại học hoặc polytechnic được làm việc tối đa 20 giờ mỗi tuần trong học kỳ và làm toàn thời gian trong các kỳ nghỉ chính thức. Quyền này đã có sẵn trong visa du học của bạn.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa New Zealand?$q$,
    "answer_fil" = $q$Oo. Ang mga international student na full-time na naka-enroll sa programang hindi bababa sa 2 taon sa university o polytechnic ay puwedeng magtrabaho nang hanggang 20 oras kada linggo habang may semester at full-time tuwing opisyal na semester break. Kasama na ang karapatang ito sa student visa mo.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Selandia Baru?$q$,
    "answer_idn" = $q$Bisa. Mahasiswa internasional yang terdaftar penuh waktu pada program minimal 2 tahun di universitas atau politeknik boleh bekerja hingga 20 jam per minggu selama semester dan penuh waktu selama libur semester resmi. Hak ini sudah termasuk dalam visa pelajar Anda.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 1 AND question = $q$Can I work while studying in New Zealand?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại New Zealand bao lâu sau khi tốt nghiệp?$q$,
    "answer_vi" = $q$Sinh viên tốt nghiệp từ bậc cử nhân trở lên đủ điều kiện xin Visa làm việc sau tốt nghiệp. Thời hạn khác nhau: 1 năm với văn bằng diploma, 2 năm với bằng cử nhân và tới 3 năm với bằng sau đại học. Đây là visa mở: bạn có thể làm bất kỳ công việc nào cho bất kỳ nhà tuyển dụng nào.$q$,
    "question_fil" = $q$Gaano katagal ako puwedeng manatili sa New Zealand pagkatapos magtapos?$q$,
    "answer_fil" = $q$Kwalipikado sa Post Study Work Visa ang mga nagtapos ng bachelor's degree at mas mataas. Nag-iiba ang tagal: 1 taon para sa diploma, 2 taon para sa bachelor's degree, at hanggang 3 taon para sa postgraduate qualification. Open ang visa: puwede kang magtrabaho sa anumang trabaho, para sa anumang employer.$q$,
    "question_idn" = $q$Berapa lama saya bisa tinggal di Selandia Baru setelah lulus?$q$,
    "answer_idn" = $q$Lulusan sarjana dan di atasnya memenuhi syarat untuk Post Study Work Visa. Durasinya bervariasi: 1 tahun untuk diploma, 2 tahun untuk gelar sarjana, dan hingga 3 tahun untuk kualifikasi pascasarjana. Visa ini terbuka: Anda dapat bekerja di pekerjaan apa pun untuk pemberi kerja mana pun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 2 AND question = $q$How long can I stay in New Zealand after graduating?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$New Zealand có an toàn cho sinh viên quốc tế không?$q$,
    "answer_vi" = $q$New Zealand liên tục được xếp là một trong những quốc gia an toàn nhất thế giới. Đất nước có các biện pháp bảo vệ pháp lý mạnh cho sinh viên quốc tế theo Bộ quy tắc Giáo dục (Chăm sóc Mục vụ cho Người học Đại học và Quốc tế) 2021, yêu cầu mọi cơ sở giáo dục phải bảo đảm sức khỏe và phúc lợi của sinh viên.$q$,
    "question_fil" = $q$Ligtas ba ang New Zealand para sa mga international student?$q$,
    "answer_fil" = $q$Palaging kabilang ang New Zealand sa pinakaligtas na bansa sa mundo. May matibay itong legal na proteksyon para sa mga international student sa ilalim ng Education (Pastoral Care of Tertiary and International Learners) Code 2021, na nag-uutos sa lahat ng institusyon na tiyakin ang kapakanan at kapakanang pangkalusugan ng estudyante.$q$,
    "question_idn" = $q$Apakah Selandia Baru aman bagi mahasiswa internasional?$q$,
    "answer_idn" = $q$Selandia Baru secara konsisten menjadi salah satu negara paling aman di dunia. Negara ini memiliki perlindungan hukum yang kuat bagi mahasiswa internasional berdasarkan Education (Pastoral Care of Tertiary and International Learners) Code 2021, yang mewajibkan semua institusi menjamin kesejahteraan mahasiswa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 3 AND question = $q$Is New Zealand safe for international students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi cần điểm thi tiếng Anh bao nhiêu?$q$,
    "answer_vi" = $q$Hầu hết các trường đại học yêu cầu IELTS Academic 6.0-6.5 cho bậc đại học và 6.5-7.0 cho bậc sau đại học. TOEFL iBT từ 79-90 cũng được chấp nhận rộng rãi. Một số cơ sở chấp nhận Pearson PTE Academic thay thế.$q$,
    "question_fil" = $q$Anong English test score ang kailangan ko?$q$,
    "answer_fil" = $q$Karamihan ng mga university ay humihingi ng IELTS Academic 6.0-6.5 para sa undergraduate program at 6.5-7.0 para sa postgraduate program. Malawakan ding tinatanggap ang TOEFL iBT na 79-90. May ilang institusyong tumatanggap ng Pearson PTE Academic bilang alternatibo.$q$,
    "question_idn" = $q$Berapa skor tes bahasa Inggris yang saya butuhkan?$q$,
    "answer_idn" = $q$Sebagian besar universitas mensyaratkan IELTS Academic 6.0-6.5 untuk program sarjana dan 6.5-7.0 untuk program pascasarjana. TOEFL iBT 79-90 juga diterima luas. Beberapa institusi menerima Pearson PTE Academic sebagai alternatif.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 4 AND question = $q$What English test scores do I need?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Chi phí sinh hoạt ở New Zealand là bao nhiêu?$q$,
    "answer_vi" = $q$Chi phí sinh hoạt phụ thuộc vào thành phố. Auckland và Wellington đắt hơn (NZD 18,000-24,000/năm), trong khi Dunedin, Hamilton, Christchurch và các thành phố vùng khác rẻ hơn đáng kể (NZD 14,000-18,000/năm). Hầu hết các trường đại học đều có ký túc xá trong khuôn viên.$q$,
    "question_fil" = $q$Magkano ang gastos sa pamumuhay sa New Zealand?$q$,
    "answer_fil" = $q$Nakadepende sa lungsod ang gastos sa pamumuhay. Mas mahal ang Auckland at Wellington (NZD 18,000-24,000/taon), habang mas abot-kaya nang malaki ang Dunedin, Hamilton, Christchurch, at mga regional na lungsod (NZD 14,000-18,000/taon). May on-campus accommodation sa karamihan ng university.$q$,
    "question_idn" = $q$Berapa biaya hidup di Selandia Baru?$q$,
    "answer_idn" = $q$Biaya hidup bergantung pada kota. Auckland dan Wellington lebih mahal (NZD 18,000-24,000/tahun), sedangkan Dunedin, Hamilton, Christchurch, dan kota-kota regional jauh lebih terjangkau (NZD 14,000-18,000/tahun). Akomodasi di kampus tersedia di sebagian besar universitas.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$new-zealand$q$)
    AND "order" = 5 AND question = $q$What is the cost of living in New Zealand?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'New Zealand faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'New Zealand: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 6, 5, 5;
END $$;

-- Check (optional): every count below should be 6/5/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$new-zealand$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$new-zealand$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$new-zealand$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
