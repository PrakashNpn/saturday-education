-- Vietnamese, Filipino and Indonesian content for UAE.
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
    "tagline_vi" = $q$Bằng cấp toàn cầu giữa lòng Trung Đông$q$,
    "overview_vi" = $q$UAE đã biến mình thành một điểm đến giáo dục hàng đầu thế giới, với Dubai và Abu Dhabi có hơn 70 cơ sở liên kết quốc tế của các trường đại học danh tiếng. Sinh viên học tại UAE được hưởng cùng chương trình học và kiểm định bằng cấp như trường mẹ, dù là Úc (UOW, Curtin, Murdoch), Anh (Middlesex, De Montfort) hay Thụy Sĩ (HTMi), đồng thời sống tại một trong những thành phố năng động và kết nối quốc tế nhất thế giới. Môi trường miễn thuế, sự an toàn và dân số đa văn hóa hơn 200 quốc tịch của Dubai tạo nên bối cảnh đặc biệt thân thiện cho sinh viên quốc tế đến từ châu Á và nhiều nơi khác. Vị trí chiến lược của UAE ở ngã tư châu Á, châu Âu và châu Phi cũng biến nơi đây thành bệ phóng sự nghiệp mạnh mẽ, với các tập đoàn đa quốc gia, trụ sở khu vực và ngành công nghệ, dịch vụ tài chính đang bùng nổ mang lại nhiều cơ hội việc làm cho sinh viên tốt nghiệp. Học phí thường được thanh toán bằng Dirham UAE (AED) và dao động từ AED 35,000 đến AED 100,000 mỗi năm tùy cơ sở và bậc chương trình.$q$,
    "tagline_fil" = $q$Mga global na degree sa puso ng Middle East$q$,
    "overview_fil" = $q$Ginawang nangungunang pandaigdigang destinasyon sa edukasyon ng UAE ang sarili nito, kung saan nagho-host ang Dubai at Abu Dhabi ng mahigit 70 international branch campus ng mga nangungunang university sa mundo. Nakikinabang ang mga estudyanteng nag-aaral sa UAE sa parehong kurikulum at degree accreditation ng parent institution, Australian man (UOW, Curtin, Murdoch), British (Middlesex, De Montfort), o Swiss (HTMi), habang nakatira sa isa sa pinakadinamiko at pinakakonektadong lungsod sa mundo. Ang tax-free na kapaligiran, kaligtasan, at multicultural na populasyon ng Dubai na mahigit 200 nasyonalidad ay lumilikha ng napakagiliw na kapaligiran para sa mga international student mula sa Asya at higit pa. Ang estratehikong lokasyon ng UAE sa sangandaan ng Asya, Europa, at Africa ay ginagawa rin itong malakas na launch pad sa karera, na may mga multinational corporation, rehiyonal na headquarters, at umuunlad na technology at financial services sector na nag-aalok ng malalakas na oportunidad sa trabaho para sa mga nagtapos. Karaniwang binabayaran ang tuition sa UAE Dirham (AED) at nasa AED 35,000 hanggang AED 100,000 kada taon depende sa institusyon at antas ng programa.$q$,
    "tagline_idn" = $q$Gelar global di jantung Timur Tengah$q$,
    "overview_idn" = $q$UEA telah mengubah dirinya menjadi destinasi pendidikan global terkemuka, dengan Dubai dan Abu Dhabi menjadi tuan rumah lebih dari 70 kampus cabang internasional dari universitas-universitas terkemuka dunia. Mahasiswa yang belajar di UEA mendapat kurikulum dan akreditasi gelar yang sama dengan institusi induk, baik Australia (UOW, Curtin, Murdoch), Inggris (Middlesex, De Montfort), maupun Swiss (HTMi), sambil tinggal di salah satu kota paling dinamis dan terhubung secara internasional di dunia. Lingkungan bebas pajak, keamanan, dan penduduk multikultural Dubai dari lebih dari 200 kebangsaan menciptakan suasana yang sangat ramah bagi mahasiswa internasional dari Asia dan sekitarnya. Lokasi strategis UEA di persimpangan Asia, Eropa, dan Afrika juga menjadikannya landasan peluncuran karier yang kuat, dengan perusahaan multinasional, kantor pusat regional, dan sektor teknologi serta jasa keuangan yang berkembang pesat menawarkan peluang kerja lulusan yang kuat. Biaya kuliah biasanya dibayar dalam Dirham UEA (AED) dan berkisar dari AED 35,000 hingga AED 100,000 per tahun tergantung institusi dan jenjang program.$q$
  WHERE slug = $q$uae$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Bằng của cơ sở liên kết: cùng chứng chỉ, chi phí thấp hơn$q$,
    "description_vi" = $q$Nhận bằng của Úc (UOW, Curtin, Murdoch) hoặc Anh (Middlesex, De Montfort) tại Dubai với chi phí thấp hơn đáng kể so với học tại Úc hoặc Anh, cùng một văn bằng được công nhận quốc tế và do cùng một trường mẹ cấp.$q$,
    "title_fil" = $q$Mga branch campus degree: parehong kredensyal, mas mababang gastos$q$,
    "description_fil" = $q$Kumuha ng Australian (UOW, Curtin, Murdoch) o British (Middlesex, De Montfort) na degree sa Dubai sa mas mababang gastos nang malaki kaysa sa pag-aaral sa Australia o UK, parehong kinikilalang kwalipikasyon sa buong mundo na ibinibigay ng iisang parent university.$q$,
    "title_idn" = $q$Gelar kampus cabang: kredensial sama, biaya lebih rendah$q$,
    "description_idn" = $q$Raih gelar Australia (UOW, Curtin, Murdoch) atau Inggris (Middlesex, De Montfort) di Dubai dengan biaya jauh lebih rendah daripada kuliah di Australia atau Inggris, kualifikasi yang sama-sama diakui secara internasional dan diberikan oleh universitas induk yang sama.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 1 AND title = $q$Branch Campus Degrees — Same Credential, Lower Cost$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Dubai, bệ phóng sự nghiệp toàn cầu$q$,
    "description_vi" = $q$Dubai là nơi đặt trụ sở khu vực của hàng trăm tập đoàn đa quốc gia trong các lĩnh vực tài chính, công nghệ, logistics và khách sạn. Học tại đây giúp xây dựng mạng lưới chuyên môn tại một trong những trung tâm kinh doanh có vị trí chiến lược nhất thế giới.$q$,
    "title_fil" = $q$Dubai, global na launch pad sa karera$q$,
    "description_fil" = $q$Tahanan ang Dubai ng mga rehiyonal na headquarters ng daan-daang multinational sa finance, technology, logistics, at hospitality. Ang pag-aaral dito ay bumubuo ng propesyonal na network sa isa sa pinakaestratehikong business hub sa mundo.$q$,
    "title_idn" = $q$Dubai, landasan peluncuran karier global$q$,
    "description_idn" = $q$Dubai menjadi markas regional ratusan perusahaan multinasional di bidang keuangan, teknologi, logistik, dan perhotelan. Kuliah di sini membangun jaringan profesional di salah satu pusat bisnis dengan lokasi paling strategis di dunia.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 2 AND title = $q$Dubai — A Global Career Launch Pad$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Miễn thuế, an toàn và đa văn hóa$q$,
    "description_vi" = $q$UAE là một trong những quốc gia an toàn nhất thế giới với xã hội rất đa văn hóa, hơn 200 quốc tịch sinh sống tại Dubai. Môi trường miễn thuế và đồng AED mạnh khiến mức lương và khoản tiết kiệm rất cạnh tranh đối với sinh viên tốt nghiệp ở lại làm việc.$q$,
    "title_fil" = $q$Tax-free, ligtas, at multicultural$q$,
    "description_fil" = $q$Isa ang UAE sa pinakaligtas na bansa sa mundo na may lubhang multicultural na lipunan: mahigit 200 nasyonalidad ang naninirahan sa Dubai. Dahil sa tax-free na kapaligiran at matatag na AED, napakakompetitibo ng sahod at ipon ng mga nagtapos na nananatili para magtrabaho.$q$,
    "title_idn" = $q$Bebas pajak, aman, dan multikultural$q$,
    "description_idn" = $q$UEA adalah salah satu negara teraman di dunia dengan masyarakat yang sangat multikultural: lebih dari 200 kebangsaan tinggal di Dubai. Lingkungan bebas pajak dan mata uang AED yang kuat membuat gaji dan tabungan sangat kompetitif bagi lulusan yang tinggal untuk bekerja.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 3 AND title = $q$Tax-Free, Safe, and Multicultural$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Visa tìm việc sau tốt nghiệp$q$,
    "description_vi" = $q$Sinh viên tốt nghiệp tại UAE có thể xin Visa tìm việc 12 tháng sau khi hoàn thành bằng cấp, có thời gian riêng để tìm việc mà không phải rời khỏi đất nước, một lợi thế đáng kể trong thị trường việc làm cạnh tranh dành cho sinh viên mới tốt nghiệp.$q$,
    "title_fil" = $q$Post-Study Job Seeker Visa$q$,
    "description_fil" = $q$Puwedeng mag-apply ang mga nagtapos sa UAE ng 12-buwang Job Seeker Visa pagkatapos makumpleto ang degree, na nagbibigay ng nakalaang oras para maghanap ng trabaho nang hindi umaalis ng bansa, isang malaking bentahe sa mapagkumpitensyang job market ng mga nagtapos.$q$,
    "title_idn" = $q$Visa pencari kerja pascastudi$q$,
    "description_idn" = $q$Lulusan UEA dapat mengajukan Job Seeker Visa 12 bulan setelah menyelesaikan gelar, memberi waktu khusus untuk mencari pekerjaan tanpa meninggalkan negara, keunggulan signifikan di pasar kerja lulusan yang kompetitif.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 4 AND title = $q$Post-Study Job Seeker Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn trường đại học và chương trình$q$,
    "description_vi" = $q$Tìm hiểu các trường đại học có cơ sở liên kết ở Dubai: các cơ sở của Úc, Anh và Thụy Sĩ đều cung cấp đầy đủ chương trình cấp bằng. So sánh học phí (bằng AED), tháng nhập học và địa điểm khuôn viên (Knowledge Park, DIAC, Knowledge Village).$q$,
    "title_fil" = $q$Piliin ang university at programa mo$q$,
    "description_fil" = $q$Saliksikin ang mga branch campus na university sa Dubai: nag-aalok ng buong degree programme ang mga institusyon mula Australia, UK, at Switzerland. Ihambing ang bayarin (sa AED), buwan ng intake, at lokasyon ng campus (Knowledge Park, DIAC, Knowledge Village).$q$,
    "title_idn" = $q$Pilih universitas dan program Anda$q$,
    "description_idn" = $q$Teliti universitas kampus cabang di Dubai: institusi Australia, Inggris, dan Swiss semuanya menawarkan program gelar penuh. Bandingkan biaya (dalam AED), bulan penerimaan, dan lokasi kampus (Knowledge Park, DIAC, Knowledge Village).$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND step_number = 1 AND title = $q$Choose Your University and Programme$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ và nhận thư mời nhập học$q$,
    "description_vi" = $q$Nộp hồ sơ trực tiếp cho cơ sở Dubai bạn chọn kèm bảng điểm, điểm thi tiếng Anh (IELTS/TOEFL), bản sao hộ chiếu và thư giới thiệu bản thân. Hầu hết các cơ sở xét tuyển liên tục cho các kỳ nhập học tháng 9 và tháng 1.$q$,
    "title_fil" = $q$Mag-apply at kunin ang Offer Letter$q$,
    "description_fil" = $q$Direktang mag-apply sa napili mong campus sa Dubai kasama ang transcript, English test score (IELTS/TOEFL), kopya ng pasaporte, at personal statement. Karamihan ng campus ay may rolling admissions para sa September at January intake.$q$,
    "title_idn" = $q$Daftar dan terima surat tawaran$q$,
    "description_idn" = $q$Daftar langsung ke kampus Dubai pilihan Anda dengan transkrip akademik, skor tes bahasa Inggris (IELTS/TOEFL), salinan paspor, dan pernyataan pribadi. Sebagian besar kampus memiliki penerimaan bergulir untuk periode masuk September dan Januari.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND step_number = 2 AND title = $q$Apply and Receive Offer Letter$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Xin visa du học UAE$q$,
    "description_vi" = $q$Sau khi nhận thư mời và đóng tiền đặt cọc xác nhận, trường sẽ bảo lãnh visa du học UAE và Emirates ID của bạn. Quy trình thường mất 2-4 tuần và yêu cầu khám sức khỏe cùng sinh trắc học.$q$,
    "title_fil" = $q$Mag-apply para sa UAE Student Visa$q$,
    "description_fil" = $q$Pagkatapos matanggap ang offer at mabayaran ang confirmation deposit, ang university mo ang magsa-sponsor ng UAE student visa at Emirates ID mo. Karaniwang 2-4 linggo ang proseso at kailangan ng medical fitness test at biometrics.$q$,
    "title_idn" = $q$Ajukan visa pelajar UEA$q$,
    "description_idn" = $q$Setelah menerima tawaran dan membayar deposit konfirmasi, universitas Anda akan mensponsori visa pelajar UEA dan Emirates ID Anda. Prosesnya biasanya memakan waktu 2-4 minggu dan memerlukan tes kelayakan medis serta biometrik.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND step_number = 3 AND title = $q$Apply for UAE Student Visa$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và hoàn tất đăng ký di trú$q$,
    "description_vi" = $q$Bay đến Dubai, hoàn tất đăng ký Emirates ID với Cơ quan Liên bang về Danh tính và Quốc tịch (ICA), mở tài khoản ngân hàng địa phương và tham dự buổi định hướng của trường. Nhóm hỗ trợ sinh viên quốc tế của trường sẽ hướng dẫn bạn từng bước.$q$,
    "title_fil" = $q$Dumating at kumpletuhin ang immigration registration$q$,
    "description_fil" = $q$Lumipad papuntang Dubai, kumpletuhin ang Emirates ID registration sa Federal Authority for Identity and Citizenship (ICA), magbukas ng lokal na bank account, at dumalo sa orientation ng university. Gagabayan ka ng international student team ng university sa bawat hakbang.$q$,
    "title_idn" = $q$Tiba dan selesaikan registrasi imigrasi$q$,
    "description_idn" = $q$Terbang ke Dubai, selesaikan registrasi Emirates ID dengan Federal Authority for Identity and Citizenship (ICA), buka rekening bank lokal, dan ikuti orientasi universitas. Tim mahasiswa internasional universitas Anda akan membimbing di setiap langkah.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND step_number = 4 AND title = $q$Arrive and Complete Immigration Registration$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Bằng của các cơ sở liên kết tại UAE có giống bằng của trường mẹ không?$q$,
    "answer_vi" = $q$Có. Bằng của cơ sở liên kết do trường mẹ cấp (ví dụ University of Wollongong Úc, Middlesex University Anh) và giống hệt về nội dung học thuật, kiểm định và mức độ công nhận so với bằng nhận tại cơ sở chính. Nhà tuyển dụng trên toàn cầu công nhận đó là văn bằng của trường mẹ.$q$,
    "question_fil" = $q$Pareho ba ang mga degree ng UAE branch campus sa parent university?$q$,
    "answer_fil" = $q$Oo. Ang mga degree ng branch campus ay ibinibigay ng parent institution (hal. University of Wollongong Australia, Middlesex University UK) at pareho ang akademikong nilalaman, accreditation, at pagkilala sa mga degree na nakuha sa home campus. Kinikilala ng mga employer sa buong mundo ang mga ito bilang kwalipikasyon ng parent university.$q$,
    "question_idn" = $q$Apakah gelar dari kampus cabang UEA sama dengan universitas induknya?$q$,
    "answer_idn" = $q$Ya. Gelar kampus cabang diberikan oleh institusi induk (mis. University of Wollongong Australia, Middlesex University Inggris) dan identik dalam isi akademik, akreditasi, dan pengakuan dengan gelar yang diperoleh di kampus utama. Pemberi kerja di seluruh dunia mengakuinya sebagai kualifikasi universitas induk.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 1 AND question = $q$Are degrees from UAE branch campuses the same as the parent university?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở UAE không?$q$,
    "answer_vi" = $q$Người giữ visa du học tại UAE có thể làm thêm và thực tập. Hầu hết các chương trình cấp bằng tại cơ sở liên kết có học kỳ thực tập có cấu trúc được tính vào bằng. Việc làm toàn thời gian ngoài trường cần giấy phép lao động riêng do nhà tuyển dụng bảo lãnh.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa UAE?$q$,
    "answer_fil" = $q$Puwedeng mag-part-time at mag-internship ang mga may student visa sa UAE. Karamihan ng branch campus degree programme ay may nakaistrukturang internship semester na bahagi ng degree. Ang full-time na trabaho sa labas ng campus ay nangangailangan ng hiwalay na work permit na ini-sponsor ng employer.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di UEA?$q$,
    "answer_idn" = $q$Pemegang visa pelajar di UEA dapat bekerja paruh waktu dan magang. Sebagian besar program gelar kampus cabang mencakup semester magang terstruktur yang dihitung sebagai bagian dari gelar. Pekerjaan penuh waktu di luar kampus memerlukan izin kerja terpisah yang disponsori pemberi kerja.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 2 AND question = $q$Can I work while studying in the UAE?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Các trường đại học UAE yêu cầu trình độ tiếng Anh như thế nào?$q$,
    "answer_vi" = $q$Yêu cầu tương tự trường mẹ: thường IELTS 6.0-6.5 cho bậc đại học và 6.5-7.0 cho bậc sau đại học. Có các chương trình dự bị cho sinh viên cần cải thiện tiếng Anh trước khi vào học chương trình cấp bằng.$q$,
    "question_fil" = $q$Anong English language requirement ang mayroon ang mga university sa UAE?$q$,
    "answer_fil" = $q$Kapareho ng sa parent institution: karaniwang IELTS 6.0-6.5 para sa undergraduate at 6.5-7.0 para sa postgraduate programme. May foundation pathway programme para sa mga estudyanteng kailangang pagbutihin ang Ingles bago pumasok sa degree study.$q$,
    "question_idn" = $q$Apa persyaratan bahasa Inggris universitas di UEA?$q$,
    "answer_idn" = $q$Persyaratan mengikuti institusi induk: biasanya IELTS 6.0-6.5 untuk sarjana dan 6.5-7.0 untuk pascasarjana. Tersedia program jalur foundation bagi mahasiswa yang perlu meningkatkan bahasa Inggris sebelum memasuki studi gelar.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 3 AND question = $q$What English language requirements do UAE universities have?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Dubai có an toàn cho sinh viên quốc tế không?$q$,
    "answer_vi" = $q$Có. UAE liên tục nằm trong nhóm những quốc gia an toàn nhất thế giới, với tỷ lệ tội phạm cực thấp và cộng đồng sinh viên quốc tế lâu đời. Môi trường quốc tế, đa văn hóa của Dubai đặc biệt thân thiện với sinh viên từ khắp châu Á và nhiều nơi khác.$q$,
    "question_fil" = $q$Ligtas ba ang Dubai para sa mga international student?$q$,
    "answer_fil" = $q$Oo. Palaging kabilang ang UAE sa pinakaligtas na bansa sa mundo, na may napakababang antas ng krimen at matagal nang komunidad ng mga international student. Ang cosmopolitan at multicultural na kapaligiran ng Dubai ay napakagiliw para sa mga estudyante mula sa buong Asya at higit pa.$q$,
    "question_idn" = $q$Apakah Dubai aman bagi mahasiswa internasional?$q$,
    "answer_idn" = $q$Ya. UEA secara konsisten termasuk negara teraman di dunia, dengan tingkat kejahatan sangat rendah dan komunitas mahasiswa internasional yang mapan. Lingkungan kosmopolitan dan multikultural Dubai sangat ramah bagi mahasiswa dari seluruh Asia dan sekitarnya.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 4 AND question = $q$Is Dubai safe for international students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Chi phí sinh hoạt của sinh viên ở Dubai là bao nhiêu?$q$,
    "answer_vi" = $q$Sinh viên thường chi khoảng AED 4,000-8,000 mỗi tháng (USD 1,100-2,200), bao gồm chỗ ở chung (AED 2,000-4,000), ăn uống (AED 800-1,500), đi lại (AED 300-600) và chi tiêu cá nhân. Ký túc xá trong trường và khu nhà ở sinh viên gần Knowledge Park có mức giá ở khoảng thấp của dải này.$q$,
    "question_fil" = $q$Magkano ang gastos sa pamumuhay sa Dubai para sa mga estudyante?$q$,
    "answer_fil" = $q$Karaniwang gumagastos ang mga estudyante ng AED 4,000-8,000 kada buwan (USD 1,100-2,200), na sumasaklaw sa shared accommodation (AED 2,000-4,000), pagkain (AED 800-1,500), transportasyon (AED 300-600), at personal na gastusin. May on-campus accommodation at mga student housing area malapit sa Knowledge Park na nasa mababang dulo ng saklaw na ito.$q$,
    "question_idn" = $q$Berapa biaya hidup mahasiswa di Dubai?$q$,
    "answer_idn" = $q$Mahasiswa biasanya menghabiskan AED 4,000-8,000 per bulan (USD 1,100-2,200), mencakup akomodasi bersama (AED 2,000-4,000), makanan (AED 800-1,500), transportasi (AED 300-600), dan pengeluaran pribadi. Akomodasi di kampus dan area hunian mahasiswa dekat Knowledge Park tersedia di kisaran bawah ini.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$uae$q$)
    AND "order" = 5 AND question = $q$What is the cost of living in Dubai for students?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'UAE faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'UAE: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$uae$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$uae$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$uae$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
