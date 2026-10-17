-- Vietnamese, Filipino and Indonesian content for Switzerland.
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
    "tagline_vi" = $q$Thủ đô giáo dục quản trị khách sạn của thế giới$q$,
    "overview_vi" = $q$Thụy Sĩ là chuẩn mực toàn cầu về giáo dục quản trị khách sạn từ thế kỷ 19, khi người Thụy Sĩ tiên phong trong dịch vụ khách sạn hiện đại và nghệ thuật ẩm thực xuất sắc. Ngày nay, các trường khách sạn Thụy Sĩ liên tục thống trị các bảng xếp hạng toàn cầu, nắm giữ 9 trong top 10 vị trí của Bảng xếp hạng Đại học Thế giới QS theo ngành Quản trị Khách sạn và Giải trí. Các chương trình quản trị khách sạn Thụy Sĩ khác biệt căn bản với đại học truyền thống: họ kết hợp học thuật với các kỳ thực tập quốc tế có lương bắt buộc (thường có mức lương CHF 2,100-2,400/tháng), nghĩa là sinh viên vừa học vừa kiếm tiền. Hầu hết các chương trình được cung cấp tại các cơ sở tư thục chuyên ngành ở những địa điểm đẹp như hồ Montreux, vùng núi Alps Leysin hay Lucerne, và cấp bằng kép cùng các trường đại học đối tác được công nhận của Anh hoặc Mỹ. Học phí cao hơn hầu hết các điểm đến du học khác (CHF 20,000-65,000/năm, trọn gói gồm học phí, chỗ ở và ăn uống), nhưng kết quả nghề nghiệp rất xuất sắc: sinh viên tốt nghiệp thường vào các vị trí quản lý tại Four Seasons, Ritz-Carlton, Marriott, Hilton và các thương hiệu cao cấp khác chỉ vài tháng sau khi ra trường.$q$,
    "tagline_fil" = $q$Kabisera ng edukasyon sa hospitality ng mundo$q$,
    "overview_fil" = $q$Ang Switzerland ang pandaigdigang pamantayan sa edukasyon sa hospitality mula pa noong ika-19 na siglo, nang pangunahan ng mga Swiss ang makabagong serbisyo sa hotel at kahusayan sa culinary. Ngayon, palaging nangingibabaw ang mga hotel school sa Switzerland sa mga pandaigdigang ranking, na hawak ang 9 sa top 10 na puwesto sa QS World University Rankings by Subject para sa Hospitality & Leisure Management. Iba ang mga hospitality programme ng Switzerland sa tradisyunal na university: pinagsasama nila ang akademikong pag-aaral at mandatoryong bayad na international internship (karaniwang sahod na CHF 2,100-2,400/buwan), kaya kumikita ang mga estudyante habang nag-aaral. Karamihan ng programa ay iniaalok sa mga pribadong specialist institution sa magagandang lokasyon, gaya ng lakeside Montreux, Alpine Leysin, o Lucerne, at nagbibigay ng dual degree kasama ang mga akreditadong partner university sa UK o US. Mas mataas ang bayarin kaysa sa karamihan ng destinasyon sa pag-aaral (CHF 20,000-65,000/taon na all-inclusive para sa tuition, tirahan, at pagkain), pero pambihira ang resulta sa karera: karaniwang napupunta ang mga nagtapos sa management role sa Four Seasons, Ritz-Carlton, Marriott, Hilton, at iba pang luxury brand sa loob lang ng ilang buwan pagkatapos magtapos.$q$,
    "tagline_idn" = $q$Ibu kota pendidikan perhotelan dunia$q$,
    "overview_idn" = $q$Swiss telah menjadi tolok ukur global pendidikan perhotelan sejak abad ke-19, ketika orang Swiss memelopori layanan hotel modern dan keunggulan kuliner. Kini, sekolah perhotelan Swiss secara konsisten mendominasi peringkat global, memegang 9 dari 10 posisi teratas dalam QS World University Rankings by Subject untuk Hospitality & Leisure Management. Program perhotelan Swiss berbeda mendasar dari universitas tradisional: memadukan studi akademik dengan magang internasional berbayar yang wajib (biasanya bergaji CHF 2,100-2,400/bulan), sehingga mahasiswa memperoleh penghasilan sambil belajar. Sebagian besar program ditawarkan di institusi spesialis swasta di lokasi yang indah, seperti tepi danau Montreux, Leysin di Pegunungan Alpen, atau Lucerne, dan memberikan gelar ganda bersama universitas mitra terakreditasi di Inggris atau AS. Biayanya lebih tinggi daripada kebanyakan destinasi studi (CHF 20,000-65,000/tahun all-inclusive untuk biaya kuliah, akomodasi, dan makan), tetapi hasil kariernya luar biasa: lulusan rutin menempati posisi manajemen di Four Seasons, Ritz-Carlton, Marriott, Hilton, dan merek mewah lain hanya beberapa bulan setelah lulus.$q$
  WHERE slug = $q$switzerland$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Nền giáo dục khách sạn số 1 thế giới$q$,
    "description_vi" = $q$Các trường khách sạn Thụy Sĩ nắm giữ 9 trong top 10 toàn cầu của Bảng xếp hạng theo ngành QS về Quản trị Khách sạn. Bằng quản trị khách sạn Thụy Sĩ là chứng chỉ được công nhận rộng rãi nhất trong ngành khách sạn toàn cầu, mở ra cánh cửa tại mọi thương hiệu cao cấp trên thế giới.$q$,
    "title_fil" = $q$Pinakamahusay na edukasyon sa hospitality sa mundo$q$,
    "description_fil" = $q$Hawak ng mga hotel school sa Switzerland ang 9 sa global top 10 na puwesto sa QS Subject Rankings para sa Hospitality. Ang Swiss hospitality degree ang pinakakilalang kredensyal sa pandaigdigang hotel industry, na nagbubukas ng pinto sa bawat luxury brand sa buong mundo.$q$,
    "title_idn" = $q$Pendidikan perhotelan nomor 1 dunia$q$,
    "description_idn" = $q$Sekolah perhotelan Swiss memegang 9 dari 10 posisi teratas global dalam QS Subject Rankings untuk Hospitality. Gelar perhotelan Swiss adalah kredensial paling dikenal dalam industri hotel global, membuka pintu di setiap merek mewah di seluruh dunia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 1 AND title = $q$World's #1 Hospitality Education$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Vừa học vừa kiếm tiền với thực tập có lương tích hợp sẵn$q$,
    "description_vi" = $q$Các chương trình Thụy Sĩ có học kỳ thực tập có lương bắt buộc tại các khách sạn đối tác (Four Seasons, Ritz-Carlton, Kempinski). Thực tập sinh nhận CHF 2,100-2,400/tháng, bù đắp đáng kể chi phí học tập đồng thời xây dựng mạng lưới chuyên môn toàn cầu.$q$,
    "title_fil" = $q$Kumita habang nag-aaral, may bayad na internship na kasama na$q$,
    "description_fil" = $q$May mandatoryong bayad na internship semester ang mga programa sa Switzerland sa mga partner hotel (Four Seasons, Ritz-Carlton, Kempinski). Kumikita ang mga intern ng CHF 2,100-2,400/buwan, na malaking tulong sa gastos sa pag-aaral habang bumubuo ng pandaigdigang propesyonal na network.$q$,
    "title_idn" = $q$Dapat penghasilan sambil kuliah, magang berbayar sudah termasuk$q$,
    "description_idn" = $q$Program Swiss mencakup semester magang berbayar yang wajib di hotel mitra (Four Seasons, Ritz-Carlton, Kempinski). Peserta magang memperoleh CHF 2,100-2,400/bulan, yang secara berarti menutup biaya studi sambil membangun jaringan profesional global.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 2 AND title = $q$Earn While You Study — Paid Internships Built In$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bằng kép từ các trường đại học Anh và Mỹ$q$,
    "description_vi" = $q$Hầu hết các trường khách sạn Thụy Sĩ cấp bằng cùng các trường đại học đối tác được công nhận của Anh (University of Derby, Ulster University, Edinburgh Napier) hoặc Mỹ (Washington State University, Northwood University), giúp sinh viên tốt nghiệp có hai chứng chỉ được công nhận quốc tế.$q$,
    "title_fil" = $q$Dual degree mula sa mga university sa UK at US$q$,
    "description_fil" = $q$Karamihan ng hospitality school sa Switzerland ay nagbibigay ng degree kasama ang mga akreditadong partner university sa UK (University of Derby, Ulster University, Edinburgh Napier) o US (Washington State University, Northwood University), kaya may dalawang kinikilalang kredensyal sa buong mundo ang mga nagtapos.$q$,
    "title_idn" = $q$Gelar ganda dari universitas Inggris dan AS$q$,
    "description_idn" = $q$Sebagian besar sekolah perhotelan Swiss memberikan gelar bersama universitas mitra terakreditasi di Inggris (University of Derby, Ulster University, Edinburgh Napier) atau AS (Washington State University, Northwood University), memberi lulusan dua kredensial yang diakui secara internasional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 3 AND title = $q$Dual Degrees from UK and US Universities$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Trải nghiệm khuôn viên Alps đắm chìm$q$,
    "description_vi" = $q$Học trong những khách sạn cung điện Thụy Sĩ được cải tạo phía trên hồ Geneva, ở trung tâm Lucerne hoặc tại các khu nghỉ dưỡng trên núi Alps, những khuôn viên tự thân là khách sạn sang trọng, mang đến môi trường vừa sống vừa học khách sạn vô song.$q$,
    "title_fil" = $q$Immersive na karanasan sa Alpine campus$q$,
    "description_fil" = $q$Mag-aral sa mga ginawang Swiss palace hotel sa itaas ng Lake Geneva, sa gitna ng Lucerne, o sa mga Alpine resort, mga campus na sila mismo ay luxury hotel, na nagbibigay ng walang kapantay na live-and-learn na hospitality na kapaligiran.$q$,
    "title_idn" = $q$Pengalaman kampus Alpen yang imersif$q$,
    "description_idn" = $q$Belajar di bekas hotel istana Swiss di atas Danau Jenewa, di jantung Lucerne, atau di resor Alpen, kampus yang merupakan hotel mewah tersendiri, menyediakan lingkungan perhotelan live-and-learn yang tiada tanding.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 4 AND title = $q$Immersive Alpine Campus Experience$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn trường và chương trình$q$,
    "description_vi" = $q$Tìm hiểu sáu trường khách sạn hàng đầu của Thụy Sĩ, so sánh các chương trình (quản trị khách sạn, nghệ thuật ẩm thực, kinh doanh), địa điểm khuôn viên và văn bằng của trường đối tác để chọn nơi phù hợp nhất với bạn.$q$,
    "title_fil" = $q$Piliin ang school at programa mo$q$,
    "description_fil" = $q$Saliksikin ang anim na nangungunang hospitality school sa Switzerland, ihambing ang mga programa (hospitality management, culinary arts, business), lokasyon ng campus, at degree na ibinibigay ng partner university para mahanap ang pinakaakma sa iyo.$q$,
    "title_idn" = $q$Pilih sekolah dan program Anda$q$,
    "description_idn" = $q$Teliti enam sekolah perhotelan terkemuka Swiss, bandingkan program (manajemen perhotelan, seni kuliner, bisnis), lokasi kampus, dan gelar yang diberikan universitas mitra untuk menemukan yang paling cocok.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND step_number = 1 AND title = $q$Choose Your School and Programme$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận thư mời nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ kèm bảng điểm, chứng chỉ tiếng Anh, bản sao hộ chiếu và thư giới thiệu bản thân. Hầu hết các trường khách sạn Thụy Sĩ xét tuyển liên tục với nhiều kỳ nhập học mỗi năm.$q$,
    "title_fil" = $q$Mag-apply at kunin ang Offer Letter$q$,
    "description_fil" = $q$Isumite ang aplikasyon kasama ang transcript, patunay ng English, kopya ng pasaporte, at personal statement. Karamihan ng hospitality school sa Switzerland ay may rolling admissions na may maraming intake kada taon.$q$,
    "title_idn" = $q$Daftar dan terima surat tawaran$q$,
    "description_idn" = $q$Kirim aplikasi dengan transkrip akademik, bukti kemampuan bahasa Inggris, salinan paspor, dan pernyataan pribadi. Sebagian besar sekolah perhotelan Swiss memiliki penerimaan bergulir dengan beberapa periode masuk per tahun.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND step_number = 2 AND title = $q$Apply and Receive Offer Letter$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Đóng tiền đặt cọc xác nhận và làm visa Thụy Sĩ$q$,
    "description_vi" = $q$Sau khi chấp nhận thư mời và đóng tiền đặt cọc xác nhận (thường CHF 2,000-3,000), hãy xin Visa Quốc gia Thụy Sĩ (Loại D) tại đại sứ quán Thụy Sĩ ở nước bạn. Thời gian xử lý 4-8 tuần.$q$,
    "title_fil" = $q$Bayaran ang confirmation deposit at asikasuhin ang Swiss visa$q$,
    "description_fil" = $q$Pagkatapos tanggapin ang offer at bayaran ang confirmation deposit (karaniwang CHF 2,000-3,000), mag-apply para sa Swiss National Visa (Category D) sa lokal na embahada ng Switzerland. Tumatagal ng 4-8 linggo ang pagproseso.$q$,
    "title_idn" = $q$Bayar deposit konfirmasi dan urus visa Swiss$q$,
    "description_idn" = $q$Setelah menerima tawaran dan membayar deposit konfirmasi (biasanya CHF 2,000-3,000), ajukan Visa Nasional Swiss (Kategori D) di kedutaan Swiss setempat. Pemrosesan memakan waktu 4-8 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND step_number = 3 AND title = $q$Pay Confirmation Deposit and Arrange Swiss Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và đăng ký giấy phép cư trú$q$,
    "description_vi" = $q$Đến Thụy Sĩ, nhận phòng ký túc xá trong khuôn viên, tham dự buổi định hướng và đăng ký với chính quyền địa phương trong vòng 14 ngày để nhận giấy phép cư trú (loại L hoặc B). Trường sẽ hướng dẫn bạn trong quy trình này.$q$,
    "title_fil" = $q$Dumating at magparehistro para sa Residence Permit$q$,
    "description_fil" = $q$Dumating sa Switzerland, mag-check in sa on-campus accommodation, dumalo sa orientation, at magparehistro sa lokal na awtoridad sa loob ng 14 na araw para makuha ang residence permit (L o B permit). Gagabayan ka ng school mo sa prosesong ito.$q$,
    "title_idn" = $q$Tiba dan daftar izin tinggal$q$,
    "description_idn" = $q$Tiba di Swiss, check in di akomodasi kampus, ikuti orientasi, dan daftar ke otoritas setempat dalam 14 hari untuk memperoleh izin tinggal (izin L atau B). Sekolah Anda akan membimbing proses ini.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND step_number = 4 AND title = $q$Arrive and Register for Residence Permit$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Các trường khách sạn Thụy Sĩ có được công nhận toàn cầu không?$q$,
    "answer_vi" = $q$Có. Các trường khách sạn Thụy Sĩ có chứng chỉ quản trị khách sạn được kính trọng nhất thế giới. Các trường Thụy Sĩ nắm giữ 9 trong top 10 vị trí toàn cầu của QS về Quản trị Khách sạn và Giải trí. Sinh viên tốt nghiệp được Four Seasons, Ritz-Carlton, Marriott, Hyatt và mọi tập đoàn khách sạn cao cấp lớn tích cực tuyển dụng ngay từ ngày đầu.$q$,
    "question_fil" = $q$Kinikilala ba sa buong mundo ang mga hospitality school sa Switzerland?$q$,
    "answer_fil" = $q$Oo. Ang mga hotel school sa Switzerland ang pinakarespetadong hospitality credential sa mundo. Hawak ng mga Swiss school ang 9 sa QS top 10 na global na puwesto para sa Hospitality & Leisure Management. Aktibong nire-recruit ang mga nagtapos ng Four Seasons, Ritz-Carlton, Marriott, Hyatt, at bawat pangunahing luxury hotel group mula pa sa unang araw.$q$,
    "question_idn" = $q$Apakah sekolah perhotelan Swiss diakui secara global?$q$,
    "answer_idn" = $q$Ya. Sekolah hotel Swiss memiliki kredensial perhotelan yang paling dihormati di dunia. Sekolah Swiss memegang 9 dari 10 posisi teratas global QS untuk Hospitality & Leisure Management. Lulusan aktif direkrut oleh Four Seasons, Ritz-Carlton, Marriott, Hyatt, dan setiap grup hotel mewah besar sejak hari pertama.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 1 AND question = $q$Are Swiss hospitality schools globally recognised?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Học phí tại các trường khách sạn Thụy Sĩ là bao nhiêu?$q$,
    "answer_vi" = $q$Học phí dao động từ CHF 20,000 đến CHF 65,000 mỗi năm. Nhiều chương trình trọn gói (gồm học phí, chỗ ở và ăn uống), giúp thu hẹp khoảng cách chi phí sinh hoạt trên danh nghĩa. Các học kỳ thực tập có lương (CHF 2,100-2,400/tháng) cũng giúp bù đắp tổng chi phí chương trình.$q$,
    "question_fil" = $q$Magkano ang tuition fee sa mga hospitality school sa Switzerland?$q$,
    "answer_fil" = $q$Nasa CHF 20,000 hanggang CHF 65,000 kada taon ang bayarin. Maraming programa ang all-inclusive (sakop ang tuition, tirahan, at pagkain), kaya lumiliit ang nakikitang agwat sa gastos sa pamumuhay. Nakakatulong din ang mga bayad na internship semester (kumikita ng CHF 2,100-2,400/buwan) sa kabuuang gastos ng programa.$q$,
    "question_idn" = $q$Berapa biaya kuliah di sekolah perhotelan Swiss?$q$,
    "answer_idn" = $q$Biaya berkisar dari CHF 20,000 hingga CHF 65,000 per tahun. Banyak program bersifat all-inclusive (mencakup biaya kuliah, akomodasi, dan makan), yang mengurangi kesenjangan biaya hidup yang tampak. Semester magang berbayar (penghasilan CHF 2,100-2,400/bulan) juga membantu menutup total biaya program.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 2 AND question = $q$What are the tuition fees at Swiss hospitality schools?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Bằng quản trị khách sạn Thụy Sĩ có yêu cầu trình độ tiếng Anh không?$q$,
    "answer_vi" = $q$Có. Tất cả các chương trình tại các trường này được giảng dạy hoàn toàn bằng tiếng Anh. Yêu cầu khác nhau: IELTS 5.0-6.5 (hoặc TOEFL/PTE tương đương) tùy trường và bậc chương trình. Một số trường có chương trình tiếng Anh dự bị cho sinh viên cần hỗ trợ ngôn ngữ.$q$,
    "question_fil" = $q$Kailangan ba ng English proficiency para sa mga hospitality degree sa Switzerland?$q$,
    "answer_fil" = $q$Oo. Ganap na sa Ingles itinuturo ang lahat ng programa sa mga school na ito. Nag-iiba ang requirement: IELTS 5.0-6.5 (o katumbas na TOEFL/PTE) depende sa school at antas ng programa. May ilang school na nag-aalok ng preparatory English programme para sa mga estudyanteng nangangailangan ng suporta sa wika.$q$,
    "question_idn" = $q$Apakah gelar perhotelan Swiss memerlukan kemampuan bahasa Inggris?$q$,
    "answer_idn" = $q$Ya. Semua program di sekolah ini diajarkan sepenuhnya dalam bahasa Inggris. Persyaratan bervariasi: IELTS 5.0-6.5 (atau TOEFL/PTE yang setara) tergantung sekolah dan jenjang program. Beberapa sekolah menawarkan program bahasa Inggris persiapan bagi mahasiswa yang membutuhkan dukungan bahasa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 3 AND question = $q$Do Swiss hospitality degrees require English proficiency?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Thụy Sĩ không?$q$,
    "answer_vi" = $q$Sinh viên ngoài EU có visa du học được làm tối đa 15 giờ mỗi tuần trong thời gian học. Tuy nhiên, các học kỳ thực tập có lương đã được tích hợp trong hầu hết các chương trình khách sạn Thụy Sĩ và được thực hiện theo visa du học, mang lại CHF 2,100-2,400/tháng và được tính vào chương trình học.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Switzerland?$q$,
    "answer_fil" = $q$Puwedeng magtrabaho nang hanggang 15 oras kada linggo habang nag-aaral ang mga non-EU student na may student visa. Gayunpaman, kasama na sa karamihan ng hospitality programme sa Switzerland ang mga bayad na internship semester, at ginagawa ang mga ito sa ilalim ng student visa, na nagbibigay ng CHF 2,100-2,400/buwan at bahagi ng degree.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Swiss?$q$,
    "answer_idn" = $q$Mahasiswa non-UE dengan visa pelajar boleh bekerja hingga 15 jam per minggu selama studi. Namun, semester magang berbayar sudah termasuk dalam sebagian besar program perhotelan Swiss dan dijalani di bawah visa pelajar, memberi CHF 2,100-2,400/bulan dan dihitung sebagai bagian dari gelar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 4 AND question = $q$Can I work while studying in Switzerland?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Lịch nhập học điển hình của các trường khách sạn Thụy Sĩ là gì?$q$,
    "answer_vi" = $q$Hầu hết các trường khách sạn Thụy Sĩ có nhiều kỳ nhập học mỗi năm, thường vào tháng 1, tháng 4, tháng 7 và tháng 10. Xét tuyển liên tục nghĩa là không có một hạn nộp duy nhất, nhưng việc xử lý visa cần chuẩn bị trước 8-12 tuần.$q$,
    "question_fil" = $q$Ano ang karaniwang iskedyul ng intake ng mga hospitality school sa Switzerland?$q$,
    "answer_fil" = $q$Karamihan ng hospitality school sa Switzerland ay may maraming intake kada taon, karaniwang sa January, April, July, at October. Dahil rolling ang admissions, walang iisang deadline sa aplikasyon, pero kailangan ng 8-12 linggong lead time para sa pagproseso ng visa.$q$,
    "question_idn" = $q$Bagaimana jadwal penerimaan umum sekolah perhotelan Swiss?$q$,
    "answer_idn" = $q$Sebagian besar sekolah perhotelan Swiss menawarkan beberapa periode masuk per tahun, biasanya pada Januari, April, Juli, dan Oktober. Penerimaan bergulir berarti tidak ada satu tenggat pendaftaran, tetapi pemrosesan visa memerlukan waktu persiapan 8-12 minggu.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$switzerland$q$)
    AND "order" = 5 AND question = $q$What is the typical intake schedule for Swiss hospitality schools?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Switzerland faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Switzerland: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$switzerland$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$switzerland$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$switzerland$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
