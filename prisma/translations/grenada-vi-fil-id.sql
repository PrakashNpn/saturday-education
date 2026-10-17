-- Vietnamese, Filipino and Indonesian content for Grenada.
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
    "tagline_vi" = $q$Cửa ngõ vùng Caribbean đến giấy phép hành nghề y tại Mỹ và Canada$q$,
    "overview_vi" = $q$Grenada là một quốc đảo nhỏ ở phía nam vùng Caribbean, được quốc tế biết đến là nơi đặt St. George's University (SGU), một trong những trường y ở nước ngoài lớn nhất và lâu đời nhất thế giới. Được thành lập năm 1976, SGU đã đào tạo nhiều bác sĩ đang có giấy phép hành nghề tại Hoa Kỳ hơn bất kỳ trường y nào khác trên thế giới. Chương trình MD theo giáo trình nghiêm ngặt kiểu Mỹ: sinh viên hoàn thành các môn khoa học cơ bản tại Grenada rồi chuyển đến các bệnh viện giảng dạy liên kết ở Hoa Kỳ, Canada và Vương quốc Anh để thực hành lâm sàng. Sinh viên tốt nghiệp đủ điều kiện dự thi Kỳ thi Cấp phép Y khoa Hoa Kỳ (USMLE) các Bước 1, 2 và 3, và mỗi năm hàng nghìn cựu sinh viên SGU đã trúng tuyển thành công vào các chương trình nội trú tại Mỹ thông qua National Resident Matching Program (NRMP). Ngoài y khoa, SGU còn cung cấp một trong những chương trình Bác sĩ Thú y hàng đầu thế giới, cùng các bằng cử nhân, thạc sĩ và y tế công cộng. Khí hậu Caribbean ấm áp, chi phí sinh hoạt phải chăng so với đại lục Mỹ và vị trí gần Hoa Kỳ khiến Grenada trở thành lựa chọn hấp dẫn cho sinh viên dự bị y khoa từ Bắc Mỹ, châu Á và nhiều nơi khác.$q$,
    "tagline_fil" = $q$Daan ng Caribbean patungo sa medical licensure sa US at Canada$q$,
    "overview_fil" = $q$Ang Grenada ay maliit na islang bansa sa timog na Caribbean na kilala sa buong mundo bilang tahanan ng St. George's University (SGU), isa sa pinakamalaki at pinakamatatag na offshore medical school sa mundo. Itinatag noong 1976, nakapagsanay ang SGU ng mas maraming doktor na kasalukuyang lisensyado sa United States kaysa sa alinmang medical school sa mundo. Sumusunod ang MD program sa mahigpit na US-style na kurikulum, kung saan tinatapos ng mga estudyante ang basic sciences sa Grenada bago lumipat sa mga affiliated na teaching hospital sa United States, Canada, at United Kingdom para sa clinical rotation. Kwalipikado ang mga nagtapos na kumuha ng United States Medical Licensing Examination (USMLE) Step 1, 2, at 3, at libu-libong SGU alumni ang matagumpay na na-match sa mga US residency programme bawat taon sa pamamagitan ng National Resident Matching Program (NRMP). Bukod sa medisina, nag-aalok din ang SGU ng isa sa pinakamahusay na Doctor of Veterinary Medicine programme sa mundo, kasama ang mga bachelor's, master's, at public health degree. Dahil sa mainit na klima ng Caribbean, abot-kayang gastos sa pamumuhay kumpara sa mainland US, at lapit sa United States, kaakit-akit na pagpipilian ang Grenada para sa mga pre-medical student mula sa North America, Asya, at higit pa.$q$,
    "tagline_idn" = $q$Gerbang Karibia menuju lisensi kedokteran AS dan Kanada$q$,
    "overview_idn" = $q$Grenada adalah negara pulau kecil di Karibia bagian selatan yang dikenal secara internasional sebagai rumah bagi St. George's University (SGU), salah satu sekolah kedokteran offshore terbesar dan paling mapan di dunia. Didirikan pada 1976, SGU telah melatih lebih banyak dokter yang saat ini berlisensi di Amerika Serikat daripada sekolah kedokteran mana pun di dunia. Program MD mengikuti kurikulum ketat gaya AS, dengan mahasiswa menyelesaikan ilmu dasar di Grenada sebelum pindah ke rumah sakit pendidikan afiliasi di Amerika Serikat, Kanada, dan Inggris untuk rotasi klinis. Lulusan memenuhi syarat mengikuti United States Medical Licensing Examination (USMLE) Step 1, 2, dan 3, dan ribuan alumni SGU berhasil dicocokkan ke program residensi AS setiap tahun melalui National Resident Matching Program (NRMP). Selain kedokteran, SGU juga menawarkan salah satu program Doctor of Veterinary Medicine terkemuka di dunia, beserta gelar sarjana, magister, dan kesehatan masyarakat. Iklim Karibia yang hangat, biaya hidup terjangkau dibandingkan daratan AS, dan kedekatan dengan Amerika Serikat menjadikan Grenada pilihan menarik bagi mahasiswa pra-kedokteran dari Amerika Utara, Asia, dan sekitarnya.$q$
  WHERE slug = $q$grenada$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Lộ trình USMLE đến giấy phép hành nghề y tại Mỹ$q$,
    "description_vi" = $q$Sinh viên tốt nghiệp SGU đủ điều kiện dự thi cả ba bước của USMLE và tham gia đợt ghép nội trú NRMP. Mỗi năm SGU liên tục đưa hàng trăm sinh viên tốt nghiệp vào các chương trình nội trú tại Mỹ, trở thành một trong những con đường ở nước ngoài đáng tin cậy nhất để hành nghề y tại Hoa Kỳ.$q$,
    "title_fil" = $q$USMLE na landas patungo sa US medical licensure$q$,
    "description_fil" = $q$Kwalipikado ang mga nagtapos sa SGU na kumuha ng lahat ng tatlong step ng USMLE at sumali sa NRMP residency match. Palaging nakakapag-place ang SGU ng daan-daang nagtapos sa mga US residency programme kada taon, kaya isa ito sa pinakamaaasahang offshore na landas para magpraktis ng medisina sa United States.$q$,
    "title_idn" = $q$Jalur USMLE menuju lisensi kedokteran AS$q$,
    "description_idn" = $q$Lulusan SGU memenuhi syarat mengikuti ketiga tahap USMLE dan ikut pencocokan residensi NRMP. SGU secara konsisten menempatkan ratusan lulusan ke program residensi AS setiap tahun, menjadikannya salah satu jalur offshore paling andal untuk berpraktik kedokteran di Amerika Serikat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 1 AND title = $q$USMLE Pathway to US Medical Licensure$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Thực hành lâm sàng tại Mỹ, Canada và Anh$q$,
    "description_vi" = $q$Sau khi hoàn thành khoa học cơ bản tại Grenada, sinh viên MD luân phiên qua mạng lưới hơn 70 bệnh viện giảng dạy liên kết của SGU ở Hoa Kỳ, Canada và Vương quốc Anh, tích lũy kinh nghiệm lâm sàng thực tế ngay tại những bệnh viện nơi sinh viên y khoa Mỹ thực tập.$q$,
    "title_fil" = $q$Mga clinical rotation sa US, Canada, at UK$q$,
    "description_fil" = $q$Pagkatapos ng basic sciences sa Grenada, nag-rotate ang mga MD student sa network ng SGU na mahigit 70 affiliated teaching hospital sa United States, Canada, at United Kingdom, at nakakakuha ng tunay na karanasang klinikal sa mismong mga ospital kung saan nagsasanay ang mga US medical graduate.$q$,
    "title_idn" = $q$Rotasi klinis di AS, Kanada, dan Inggris$q$,
    "description_idn" = $q$Setelah menyelesaikan ilmu dasar di Grenada, mahasiswa MD berotasi melalui jaringan lebih dari 70 rumah sakit pendidikan afiliasi SGU di Amerika Serikat, Kanada, dan Inggris, memperoleh pengalaman klinis nyata di rumah sakit yang sama tempat lulusan kedokteran AS berlatih.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 2 AND title = $q$US, Canadian & UK Clinical Rotations$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Chương trình Thú y nổi tiếng thế giới$q$,
    "description_vi" = $q$Trường Thú y của SGU liên tục được xếp hạng trong số những trường thú y hàng đầu thế giới và được Hiệp hội Thú y Hoa Kỳ (AVMA) kiểm định. Sinh viên tốt nghiệp đủ điều kiện dự thi NAVLE và hành nghề tại cả 50 tiểu bang Hoa Kỳ và Canada.$q$,
    "title_fil" = $q$Kilalang veterinary medicine programme sa buong mundo$q$,
    "description_fil" = $q$Palaging kabilang ang School of Veterinary Medicine ng SGU sa pinakamahusay na veterinary school sa mundo at akreditado ng American Veterinary Medical Association (AVMA). Kwalipikado ang mga nagtapos na kumuha ng NAVLE at magpraktis sa lahat ng 50 estado ng US at sa Canada.$q$,
    "title_idn" = $q$Program kedokteran hewan yang terkenal di dunia$q$,
    "description_idn" = $q$School of Veterinary Medicine SGU secara konsisten termasuk sekolah kedokteran hewan terbaik di dunia dan terakreditasi oleh American Veterinary Medical Association (AVMA). Lulusan memenuhi syarat mengikuti NAVLE dan berpraktik di seluruh 50 negara bagian AS dan Kanada.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 3 AND title = $q$World-Renowned Veterinary Medicine Program$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Lối sống Caribbean và chi phí sinh hoạt phải chăng$q$,
    "description_vi" = $q$Grenada mang đến môi trường đảo an toàn, thân thiện với chi phí sinh hoạt thấp hơn đáng kể so với các thành phố ở đại lục Mỹ hoặc Canada. Khuôn viên True Blue của trường nằm trên một bán đảo đẹp nhìn ra biển Caribbean, tạo nên bối cảnh học tập tập trung giữa khung cảnh nhiệt đới.$q$,
    "title_fil" = $q$Caribbean na lifestyle at abot-kayang pamumuhay$q$,
    "description_fil" = $q$Nag-aalok ang Grenada ng ligtas at maaliwalas na isla na may gastos sa pamumuhay na mas mababa nang malaki kaysa sa mga lungsod sa mainland US o Canada. Ang True Blue campus ng university ay nasa magandang peninsula na tanaw ang Caribbean Sea, na nagbibigay ng nakatutok na akademikong kapaligiran sa gitna ng tropikal na tanawin.$q$,
    "title_idn" = $q$Gaya hidup Karibia dan biaya hidup terjangkau$q$,
    "description_idn" = $q$Grenada menawarkan lingkungan pulau yang aman dan ramah dengan biaya hidup jauh lebih rendah daripada kota-kota di daratan AS atau Kanada. Kampus True Blue universitas berada di semenanjung indah yang menghadap Laut Karibia, menyediakan suasana akademik yang fokus dengan lingkungan tropis.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 4 AND title = $q$Caribbean Lifestyle & Affordable Living$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Kiểm định LCME và AVMA$q$,
    "description_vi" = $q$Trường Y SGU được Cơ quan Kiểm định Caribbean về Giáo dục Y khoa và Các Ngành Chăm sóc Sức khỏe khác (CAAM-HP) kiểm định, và Trường Thú y được AVMA kiểm định, bảo đảm bằng cấp được các cơ quan cấp phép hành nghề của Mỹ và Canada công nhận.$q$,
    "title_fil" = $q$LCME at AVMA accreditation$q$,
    "description_fil" = $q$Akreditado ang SGU School of Medicine ng Caribbean Accreditation Authority for Education in Medicine and Other Health Professions (CAAM-HP), at akreditado ng AVMA ang School of Veterinary Medicine, kaya tinitiyak na kinikilala ng mga licensing body sa US at Canada ang mga degree.$q$,
    "title_idn" = $q$Akreditasi LCME dan AVMA$q$,
    "description_idn" = $q$SGU School of Medicine terakreditasi oleh Caribbean Accreditation Authority for Education in Medicine and Other Health Professions (CAAM-HP), dan School of Veterinary Medicine terakreditasi AVMA, memastikan gelar diakui oleh badan perizinan AS dan Kanada.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 5 AND title = $q$LCME & AVMA Accreditation$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada advantage 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Kiểm tra điều kiện tiên quyết và thi MCAT/GRE$q$,
    "description_vi" = $q$Với chương trình MD, hãy hoàn thành các môn khoa học tiên quyết (sinh học, hóa học, hóa hữu cơ, vật lý, hóa sinh) và thi MCAT. Cần có điểm MCAT cạnh tranh (lý tưởng từ 500 trở lên) và GPA đại học tốt (khuyến nghị từ 3.0 trở lên). Chương trình DVM cũng yêu cầu các môn khoa học tiên quyết và thành tích học tập tốt.$q$,
    "title_fil" = $q$Tingnan ang mga prerequisite at kumuha ng MCAT/GRE$q$,
    "description_fil" = $q$Para sa MD programme, tapusin ang mga prerequisite na science (biology, chemistry, organic chemistry, physics, biochemistry) at kumuha ng MCAT. Kailangan ang mapagkumpitensyang MCAT score (ideyal na 500+) at malakas na undergraduate GPA (inirerekomenda ang 3.0+). May kailangan ding prerequisite na science at malakas na akademikong rekord para sa DVM programme.$q$,
    "title_idn" = $q$Periksa prasyarat dan ikuti MCAT/GRE$q$,
    "description_idn" = $q$Untuk program MD, selesaikan prasyarat sains (biologi, kimia, kimia organik, fisika, biokimia) dan ikuti MCAT. Skor MCAT yang kompetitif (idealnya 500+) dan IPK sarjana yang kuat (disarankan 3.0+) diperlukan. Program DVM juga memerlukan prasyarat sains dan rekam akademik yang kuat.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND step_number = 1 AND title = $q$Check Prerequisites & Take MCAT/GRE$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ SGU$q$,
    "description_vi" = $q$Nộp hồ sơ qua cổng đăng ký trực tuyến của SGU tại sgu.edu. Nộp bảng điểm, thư giới thiệu (cần 3 thư, ít nhất 2 thư từ giảng viên khoa học), thư giới thiệu bản thân, điểm MCAT và bằng chứng về kinh nghiệm chăm sóc sức khỏe hoặc nghiên cứu. SGU xét tuyển liên tục với nhiều kỳ nhập học mỗi năm (tháng 1, tháng 5, tháng 8).$q$,
    "title_fil" = $q$Isumite ang SGU Application$q$,
    "description_fil" = $q$Mag-apply sa online application portal ng SGU sa sgu.edu. Isumite ang transcript, mga recommendation letter (3 ang kailangan, hindi bababa sa 2 mula sa science faculty), personal statement, MCAT score, at patunay ng karanasan sa healthcare o research. Gumagamit ang SGU ng rolling admissions na may maraming intake kada taon (January, May, August).$q$,
    "title_idn" = $q$Kirim aplikasi SGU$q$,
    "description_idn" = $q$Daftar melalui portal aplikasi online SGU di sgu.edu. Kirim transkrip, surat rekomendasi (3 diperlukan, minimal 2 dari dosen sains), pernyataan pribadi, skor MCAT, dan bukti pengalaman di bidang layanan kesehatan atau riset. SGU menggunakan penerimaan bergulir dengan beberapa periode masuk per tahun (Januari, Mei, Agustus).$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND step_number = 2 AND title = $q$Submit SGU Application$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Phỏng vấn và nhận quyết định tuyển sinh$q$,
    "description_vi" = $q$Các ứng viên lọt vào danh sách rút gọn được mời phỏng vấn (trực tiếp hoặc trực tuyến). Hội đồng tuyển sinh của SGU đánh giá mức độ sẵn sàng học thuật, động lực theo đuổi y khoa và sự trưởng thành nghề nghiệp. Quyết định thường được thông báo trong vòng 4-6 tuần kể từ khi hoàn tất hồ sơ.$q$,
    "title_fil" = $q$Interview at kunin ang admission decision$q$,
    "description_fil" = $q$Iniimbitahan sa interview (in-person o virtual) ang mga shortlisted na aplikante. Sinusuri ng admissions committee ng SGU ang akademikong kahandaan, motibasyon sa medisina, at propesyonal na kapanahunan. Karaniwang ipinapaalam ang desisyon sa loob ng 4-6 na linggo mula nang makumpleto ang aplikasyon.$q$,
    "title_idn" = $q$Wawancara dan terima keputusan penerimaan$q$,
    "description_idn" = $q$Pelamar yang masuk daftar pendek diundang wawancara (langsung atau virtual). Komite penerimaan SGU menilai kesiapan akademik, motivasi terhadap kedokteran, dan kedewasaan profesional. Keputusan biasanya disampaikan dalam 4-6 minggu setelah aplikasi lengkap.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND step_number = 3 AND title = $q$Interview & Receive Admission Decision$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học Grenada$q$,
    "description_vi" = $q$Công dân của hầu hết các quốc gia có thể nhập cảnh Grenada mà không cần visa hoặc xin giấy phép sinh viên khi đến nơi. Công dân Mỹ và Canada không cần visa du học riêng trong suốt thời gian học. Ứng viên ngoài Bắc Mỹ nên xác nhận yêu cầu với Cao ủy Grenada tại nước mình.$q$,
    "title_fil" = $q$Mag-apply para sa Grenada Student Visa$q$,
    "description_fil" = $q$Puwedeng pumasok sa Grenada nang walang visa o kumuha ng student permit pagdating ang mga mamamayan ng karamihan sa mga bansa. Hindi kailangan ng hiwalay na student visa ang mga mamamayan ng US at Canada sa buong panahon ng pag-aaral. Dapat kumpirmahin ng mga non-North American na aplikante ang mga requirement sa Grenadian High Commission sa bansa nila.$q$,
    "title_idn" = $q$Ajukan visa pelajar Grenada$q$,
    "description_idn" = $q$Warga negara sebagian besar negara dapat masuk Grenada tanpa visa atau memperoleh izin pelajar saat tiba. Warga AS dan Kanada tidak memerlukan visa pelajar terpisah selama masa studi. Pelamar non-Amerika Utara sebaiknya memastikan persyaratan ke Grenadian High Commission di negara asal.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND step_number = 4 AND title = $q$Apply for Grenada Student Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Hoàn thành khoa học cơ bản tại Grenada và bắt đầu ôn USMLE$q$,
    "description_vi" = $q$Dành 2 năm đầu hoàn thành các môn y khoa cơ bản tại khuôn viên Grenada của SGU. Bắt đầu ôn USMLE Bước 1 từ Học kỳ 3. Sau khi đậu Bước 1, chuyển sang thực hành lâm sàng tại các bệnh viện giảng dạy liên kết ở Mỹ hoặc Canada trong 2 năm cuối của chương trình MD.$q$,
    "title_fil" = $q$Tapusin ang basic sciences sa Grenada at simulan ang USMLE preparation$q$,
    "description_fil" = $q$Gugulin ang unang 2 taon sa pagtatapos ng basic medical sciences sa Grenada campus ng SGU. Simulan ang paghahanda sa USMLE Step 1 mula Term 3. Pagkapasa sa Step 1, magpatuloy sa clinical rotation sa mga affiliated na teaching hospital sa US o Canada para sa huling 2 taon ng MD programme.$q$,
    "title_idn" = $q$Selesaikan ilmu dasar di Grenada dan mulai persiapan USMLE$q$,
    "description_idn" = $q$Habiskan 2 tahun pertama menyelesaikan ilmu kedokteran dasar di kampus SGU Grenada. Mulai persiapan USMLE Step 1 dari Term 3. Setelah lulus Step 1, lanjutkan ke rotasi klinis di rumah sakit pendidikan afiliasi di AS atau Kanada selama 2 tahun terakhir program MD.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND step_number = 5 AND title = $q$Complete Basic Sciences in Grenada & Begin USMLE Preparation$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada step 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Bằng y khoa của SGU có được công nhận tại Hoa Kỳ và Canada không?$q$,
    "answer_vi" = $q$Có. Sinh viên tốt nghiệp MD của SGU đủ điều kiện xin giấy phép hành nghề y tại Mỹ bằng cách dự thi USMLE Bước 1, 2 CK và 3. Hàng nghìn sinh viên tốt nghiệp SGU đang hành nghề y trên khắp Mỹ và Canada. SGU có tên trong Danh bạ Trường Y Thế giới và sinh viên tốt nghiệp đáp ứng yêu cầu cấp phép của hội đồng y khoa ở cả 50 tiểu bang Hoa Kỳ.$q$,
    "question_fil" = $q$Kinikilala ba sa United States at Canada ang mga medical degree ng SGU?$q$,
    "answer_fil" = $q$Oo. Kwalipikado ang mga MD graduate ng SGU na mag-apply para sa US medical licensure sa pamamagitan ng pagkuha ng USMLE Step 1, 2 CK, at 3. Libu-libong SGU graduate ang nagpa-praktis ng medisina sa buong US at Canada. Nakalista ang SGU sa World Directory of Medical Schools at natutugunan ng mga nagtapos ang licensing requirement ng state medical board sa lahat ng 50 estado ng US.$q$,
    "question_idn" = $q$Apakah gelar kedokteran SGU diakui di Amerika Serikat dan Kanada?$q$,
    "answer_idn" = $q$Ya. Lulusan MD SGU memenuhi syarat mengajukan lisensi kedokteran AS dengan mengikuti USMLE Step 1, 2 CK, dan 3. Ribuan lulusan SGU berpraktik kedokteran di seluruh AS dan Kanada. SGU terdaftar dalam World Directory of Medical Schools dan lulusannya memenuhi persyaratan perizinan dewan kedokteran negara bagian di seluruh 50 negara bagian AS.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 1 AND question = $q$Are SGU medical degrees recognised in the United States and Canada?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Việc ghép nội trú USMLE diễn ra như thế nào đối với sinh viên tốt nghiệp SGU?$q$,
    "answer_vi" = $q$Sau khi đậu USMLE Bước 1 và Bước 2 CK, sinh viên SGU bắt đầu thực hành lâm sàng tại các bệnh viện liên kết ở Mỹ. Sau khi hoàn thành MD, sinh viên nộp hồ sơ vào các chương trình nội trú tại Mỹ qua National Resident Matching Program (NRMP). SGU công bố dữ liệu ghép hằng năm cho thấy hàng trăm sinh viên tốt nghiệp trúng tuyển nội trú mỗi năm, kể cả các chuyên khoa cạnh tranh.$q$,
    "question_fil" = $q$Paano gumagana ang USMLE residency match para sa mga SGU graduate?$q$,
    "answer_fil" = $q$Pagkapasa sa USMLE Step 1 at Step 2 CK, pumapasok ang mga SGU student sa clinical rotation sa mga affiliated na ospital sa US. Pagkatapos ng MD, nag-a-apply ang mga nagtapos sa mga US residency programme sa pamamagitan ng National Resident Matching Program (NRMP). Naglalathala ang SGU ng taunang match data na nagpapakitang daan-daang nagtapos ang matagumpay na na-ma-match sa residency kada taon, kabilang ang mga mapagkumpitensyang specialty.$q$,
    "question_idn" = $q$Bagaimana cara kerja pencocokan residensi USMLE untuk lulusan SGU?$q$,
    "answer_idn" = $q$Setelah lulus USMLE Step 1 dan Step 2 CK, mahasiswa SGU memasuki rotasi klinis di rumah sakit afiliasi AS. Setelah menyelesaikan MD, lulusan mendaftar ke program residensi AS melalui National Resident Matching Program (NRMP). SGU menerbitkan data pencocokan tahunan yang menunjukkan ratusan lulusan berhasil dicocokkan ke residensi setiap tahun, termasuk spesialisasi yang kompetitif.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 2 AND question = $q$How does the USMLE residency match work for SGU graduates?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tổng chi phí của chương trình MD tại SGU là bao nhiêu?$q$,
    "answer_vi" = $q$Tổng học phí chương trình MD (4 năm) khoảng USD 240,000-260,000. Học phí hằng năm khoảng USD 55,000-64,000 cho các học kỳ khoa học cơ bản tại Grenada. Các học kỳ thực hành lâm sàng có cơ cấu phí khác. Chi phí sinh hoạt tại Grenada trung bình USD 12,000-18,000 mỗi năm.$q$,
    "question_fil" = $q$Magkano ang kabuuang gastos ng SGU MD programme?$q$,
    "answer_fil" = $q$Humigit-kumulang USD 240,000-260,000 ang kabuuang tuition ng MD programme (4 na taon). Nasa USD 55,000-64,000 ang taunang tuition para sa mga basic science semester sa Grenada. May ibang istruktura ng bayarin ang mga clinical rotation semester. Nasa average na USD 12,000-18,000 kada taon ang gastos sa pamumuhay sa Grenada.$q$,
    "question_idn" = $q$Berapa total biaya program MD SGU?$q$,
    "answer_idn" = $q$Total biaya kuliah program MD (4 tahun) sekitar USD 240,000-260,000. Biaya kuliah tahunan sekitar USD 55,000-64,000 untuk semester ilmu dasar di Grenada. Semester rotasi klinis memiliki struktur biaya yang berbeda. Biaya hidup di Grenada rata-rata USD 12,000-18,000 per tahun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 3 AND question = $q$What is the total cost of the SGU MD program?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$SGU có hỗ trợ tài chính hoặc học bổng cho sinh viên quốc tế không?$q$,
    "answer_vi" = $q$SGU cung cấp học bổng theo năng lực, và sinh viên từ Hoa Kỳ và Canada có thể tiếp cận lần lượt các khoản vay sinh viên liên bang Mỹ (Title IV) và chương trình vay sinh viên của Canada. SGU cũng làm việc với các tổ chức cho vay tư nhân. Sinh viên quốc tế ngoài Bắc Mỹ nên tìm hiểu các khoản vay giáo dục tư nhân và học bổng tại quốc gia của mình.$q$,
    "question_fil" = $q$May financial aid o scholarship ba ang SGU para sa mga international student?$q$,
    "answer_fil" = $q$Nag-aalok ang SGU ng mga merit-based scholarship, at ang mga estudyante mula sa United States at Canada ay maaaring kumuha ng US federal student loan (Title IV) at Canadian student loan programme, ayon sa pagkakabanggit. Katuwang din ng SGU ang mga pribadong nagpapautang. Dapat tuklasin ng mga non-North American na international student ang mga pribadong educational loan at scholarship sa sarili nilang bansa.$q$,
    "question_idn" = $q$Apakah SGU menawarkan bantuan keuangan atau beasiswa bagi mahasiswa internasional?$q$,
    "answer_idn" = $q$SGU menawarkan beasiswa berbasis prestasi, dan mahasiswa dari Amerika Serikat dan Kanada dapat mengakses pinjaman mahasiswa federal AS (Title IV) dan program pinjaman mahasiswa Kanada, masing-masing. SGU juga bekerja sama dengan pemberi pinjaman swasta. Mahasiswa internasional non-Amerika Utara sebaiknya menjajaki pinjaman pendidikan swasta dan beasiswa dari negara asal.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 4 AND question = $q$Does SGU offer financial aid or scholarships for international students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Sinh viên không phải người Mỹ/Canada có con đường hành nghề y tại Mỹ sau SGU không?$q$,
    "answer_vi" = $q$Có. Bất kể quốc tịch, mọi sinh viên tốt nghiệp SGU đậu các bước USMLE và có chứng chỉ ECFMG đều đủ điều kiện nộp hồ sơ vào các chương trình nội trú tại Mỹ. Nhiều sinh viên quốc tế từ châu Á, châu Phi và vùng Caribbean đã trúng tuyển thành công vào các chương trình nội trú tại Mỹ với tư cách là sinh viên tốt nghiệp SGU.$q$,
    "question_fil" = $q$May landas ba para sa mga hindi US/Canadian na estudyante na magpraktis ng medisina sa US pagkatapos ng SGU?$q$,
    "answer_fil" = $q$Oo. Anuman ang nasyonalidad, kwalipikadong mag-apply sa mga US residency programme ang sinumang SGU graduate na pumasa sa mga USMLE step at nakakuha ng ECFMG certificate. Maraming international student mula sa Asya, Africa, at Caribbean ang matagumpay na na-match sa mga US residency bilang mga SGU graduate.$q$,
    "question_idn" = $q$Apakah ada jalur bagi mahasiswa non-AS/Kanada untuk berpraktik kedokteran di AS setelah SGU?$q$,
    "answer_idn" = $q$Ya. Apa pun kewarganegaraannya, setiap lulusan SGU yang lulus tahap USMLE dan memperoleh sertifikat ECFMG memenuhi syarat mendaftar ke program residensi AS. Banyak mahasiswa internasional dari Asia, Afrika, dan Karibia berhasil dicocokkan ke residensi AS sebagai lulusan SGU.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 5 AND question = $q$Is there a pathway for non-US/Canadian students to practice medicine in the US after SGU?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Chương trình thú y của SGU được kiểm định như thế nào?$q$,
    "answer_vi" = $q$Trường Thú y SGU được Hội đồng Giáo dục của Hiệp hội Thú y Hoa Kỳ (AVMA) kiểm định, tiêu chuẩn vàng của kiểm định thú y. Kiểm định AVMA có nghĩa là sinh viên tốt nghiệp DVM của SGU đủ điều kiện dự thi Kỳ thi Cấp phép Thú y Bắc Mỹ (NAVLE) và hành nghề tại cả 50 tiểu bang Hoa Kỳ và các tỉnh của Canada mà không cần thi thêm.$q$,
    "question_fil" = $q$Paano naaakreditahan ang veterinary programme ng SGU?$q$,
    "answer_fil" = $q$Akreditado ng American Veterinary Medical Association (AVMA) Council on Education ang SGU School of Veterinary Medicine, ang gold standard sa veterinary accreditation. Ibig sabihin ng AVMA accreditation, kwalipikado ang mga SGU DVM graduate na kumuha ng North American Veterinary Licensing Examination (NAVLE) at magpraktis sa lahat ng 50 estado ng US at mga lalawigan ng Canada nang walang karagdagang pagsusulit.$q$,
    "question_idn" = $q$Bagaimana program kedokteran hewan SGU diakreditasi?$q$,
    "answer_idn" = $q$SGU School of Veterinary Medicine diakreditasi oleh American Veterinary Medical Association (AVMA) Council on Education, standar emas akreditasi kedokteran hewan. Akreditasi AVMA berarti lulusan DVM SGU memenuhi syarat mengikuti North American Veterinary Licensing Examination (NAVLE) dan berpraktik di seluruh 50 negara bagian AS dan provinsi Kanada tanpa ujian tambahan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$grenada$q$)
    AND "order" = 6 AND question = $q$How is SGU's veterinary program accredited?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Grenada faq 6: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Grenada: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 5, 5, 6;
END $$;

-- Check (optional): every count below should be 5/5/6.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$grenada$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$grenada$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$grenada$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
