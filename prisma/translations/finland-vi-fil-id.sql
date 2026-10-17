-- Vietnamese, Filipino and Indonesian content for Finland.
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
    "tagline_vi" = $q$Hai năm để xây dựng sự nghiệp sau khi tốt nghiệp$q$,
    "overview_vi" = $q$Phần Lan đã xây dựng một trong những hệ thống giáo dục được kính trọng nhất thế giới, và danh tiếng đó lan tỏa đến 13 trường đại học và 22 trường đại học khoa học ứng dụng, cùng đón hơn 30.000 sinh viên quốc tế. Sinh viên ngoài EU cần giấy phép cư trú cho thời gian học trên 90 ngày, và học phí các chương trình cử nhân và thạc sĩ giảng dạy bằng tiếng Anh thường từ EUR 8,000 đến EUR 20,000 mỗi năm, trong khi bậc tiến sĩ vẫn miễn phí cho mọi quốc tịch. Sinh viên quốc tế được làm việc tối đa 30 giờ mỗi tuần trong học kỳ, một trong những mức cho phép rộng rãi nhất châu Âu, và công việc thực tập hoặc làm luận văn không bị giới hạn số giờ. Sau khi tốt nghiệp, sinh viên ngoài EU có thể xin giấy phép cư trú để tìm việc hoặc khởi nghiệp có thời hạn tối đa 24 tháng, một trong những khoảng thời gian sau tốt nghiệp dài nhất châu Âu, rất phù hợp với ngành công nghệ và game nổi tiếng toàn cầu của Phần Lan.$q$,
    "tagline_fil" = $q$Dalawang taon para bumuo ng karera pagkatapos magtapos$q$,
    "overview_fil" = $q$Nakabuo ang Finland ng isa sa pinakarespetadong sistema ng edukasyon sa mundo, at umaabot ang reputasyong iyon sa 13 university at 22 university of applied sciences nito, na magkakasamang may mahigit 30,000 international student. Kailangan ng mga non-EU student ng residence permit para sa pag-aaral na lampas 90 araw, at karaniwang nasa EUR 8,000 hanggang EUR 20,000 kada taon ang tuition para sa mga English-taught na bachelor's at master's programme, habang libre pa rin ang doctoral study para sa lahat ng nasyonalidad. Puwedeng magtrabaho ang mga international student nang hanggang 30 oras kada linggo habang may klase, isa sa pinakamaluwag na pinapayagan sa Europa, at walang limitasyong oras ang internship o thesis work. Pagkatapos magtapos, puwedeng mag-apply ang mga non-EU student ng residence permit para maghanap ng trabaho o magsimula ng negosyo na tumatagal nang hanggang 24 na buwan, isa sa pinakamahabang post-study window sa Europa, bagay na bagay sa kilalang technology at gaming industry ng Finland sa buong mundo.$q$,
    "tagline_idn" = $q$Dua tahun untuk membangun karier setelah lulus$q$,
    "overview_idn" = $q$Finlandia telah membangun salah satu sistem pendidikan paling dihormati di dunia, dan reputasi itu meluas ke 13 universitasnya dan 22 universitas ilmu terapan, yang bersama-sama menampung lebih dari 30.000 mahasiswa internasional. Mahasiswa non-UE memerlukan izin tinggal untuk studi lebih dari 90 hari, dan biaya kuliah program sarjana dan magister berbahasa pengantar Inggris biasanya berkisar dari EUR 8,000 hingga EUR 20,000 per tahun, sementara studi doktoral tetap gratis bagi semua kewarganegaraan. Mahasiswa internasional dapat bekerja hingga 30 jam per minggu selama semester, salah satu izin paling longgar di Eropa, dan pekerjaan magang atau tesis tidak memiliki batas jam sama sekali. Setelah lulus, mahasiswa non-UE dapat mengajukan izin tinggal untuk mencari kerja atau memulai bisnis yang berlaku hingga 24 bulan, salah satu jendela pascastudi terpanjang di Eropa, sangat cocok dengan industri teknologi dan gim Finlandia yang terkenal secara global.$q$
  WHERE slug = $q$finland$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland: country row not matched (% rows)', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Một trong những hệ thống giáo dục xếp hạng hàng đầu thế giới$q$,
    "description_vi" = $q$Phần Lan liên tục nằm trong nhóm các hệ thống giáo dục hoạt động tốt nhất thế giới, và danh tiếng đó lan đến 13 trường đại học và 22 trường đại học khoa học ứng dụng, cùng đón hơn 30.000 sinh viên quốc tế.$q$,
    "title_fil" = $q$Isa sa mga sistema ng edukasyong pinakamataas ang ranggo sa mundo$q$,
    "description_fil" = $q$Palaging kabilang ang Finland sa mga sistema ng edukasyong pinakamahusay ang performance sa mundo, at umaabot ang reputasyong iyon sa 13 university at 22 university of applied sciences nito, na magkakasamang may mahigit 30,000 international student.$q$,
    "title_idn" = $q$Salah satu sistem pendidikan berperingkat teratas di dunia$q$,
    "description_idn" = $q$Finlandia secara konsisten termasuk sistem pendidikan berkinerja terbaik di dunia, dan reputasi itu meluas ke 13 universitasnya dan 22 universitas ilmu terapan, yang bersama-sama menampung lebih dari 30.000 mahasiswa internasional.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 1 AND title = $q$One of the World's Top-Ranked Education Systems$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland advantage 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Làm việc tới 30 giờ mỗi tuần khi đang học$q$,
    "description_vi" = $q$Sinh viên quốc tế được làm việc tối đa 30 giờ mỗi tuần trong học kỳ, một trong những mức cho phép rộng rãi nhất châu Âu, và công việc thực tập hoặc liên quan đến luận văn không bị giới hạn số giờ, giúp dễ tích lũy kinh nghiệm tại địa phương khi đang học.$q$,
    "title_fil" = $q$Hanggang 30 oras na trabaho kada linggo habang nag-aaral$q$,
    "description_fil" = $q$Puwedeng magtrabaho ang mga international student nang hanggang 30 oras kada linggo habang may klase, isa sa pinakamaluwag na pinapayagan sa Europa, at walang limitasyong oras ang internship o thesis-related na trabaho, kaya mas madaling magkaroon ng lokal na karanasan habang nag-aaral.$q$,
    "title_idn" = $q$Bekerja hingga 30 jam per minggu sambil kuliah$q$,
    "description_idn" = $q$Mahasiswa internasional dapat bekerja hingga 30 jam per minggu selama semester, salah satu izin paling longgar di Eropa, dan pekerjaan magang atau terkait tesis tidak memiliki batas jam sama sekali, sehingga lebih mudah memperoleh pengalaman lokal sambil kuliah.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 2 AND title = $q$Up to 30 Hours of Work a Week While Studying$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland advantage 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Khoảng thời gian 24 tháng để tìm việc sau khi tốt nghiệp$q$,
    "description_vi" = $q$Sinh viên tốt nghiệp có thể xin giấy phép cư trú để tìm việc hoặc khởi nghiệp có thời hạn tối đa 24 tháng, một trong những khoảng thời gian sau tốt nghiệp dài nhất châu Âu và là bệ đỡ thực sự để biến bằng cấp Phần Lan thành sự nghiệp.$q$,
    "title_fil" = $q$24-buwang window para maghanap ng trabaho pagkatapos magtapos$q$,
    "description_fil" = $q$Puwedeng mag-apply ang mga nagtapos ng residence permit para maghanap ng trabaho o magsimula ng negosyo na tumatagal nang hanggang 24 na buwan, isa sa pinakamahabang post-study period sa Europa at tunay na panahon para gawing karera ang degree sa Finland.$q$,
    "title_idn" = $q$Jendela 24 bulan untuk mencari kerja setelah lulus$q$,
    "description_idn" = $q$Lulusan dapat mengajukan izin tinggal untuk mencari kerja atau memulai bisnis yang berlaku hingga 24 bulan, salah satu periode pascastudi terpanjang di Eropa dan landasan nyata untuk mengubah gelar Finlandia menjadi karier.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 3 AND title = $q$A 24-Month Window to Find Work After Graduating$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland advantage 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_advantages SET
    "title_vi" = $q$Ngôi nhà của công nghệ và game$q$,
    "description_vi" = $q$Ngành công nghệ của Phần Lan, nơi có các công ty ra đời từ di sản của Nokia và các studio game như Supercell và Rovio, mang đến cho sinh viên tốt nghiệp ngành khoa học máy tính, kỹ thuật và thiết kế một thị trường việc làm tập trung, dùng tiếng Anh để bước vào sau khi học.$q$,
    "title_fil" = $q$Tahanan ng technology at gaming$q$,
    "description_fil" = $q$Ang technology sector ng Finland, tahanan ng mga kompanyang nagmula sa legacy ng Nokia at ng mga gaming studio gaya ng Supercell at Rovio, ay nagbibigay sa mga nagtapos sa computer science, engineering, at design ng nakatuong English-speaking na job market na mapapasukan pagkatapos mag-aral.$q$,
    "title_idn" = $q$Rumah bagi teknologi dan gim$q$,
    "description_idn" = $q$Sektor teknologi Finlandia, rumah bagi perusahaan yang lahir dari warisan Nokia dan studio gim seperti Supercell dan Rovio, memberi lulusan ilmu komputer, teknik, dan desain pasar kerja berbahasa Inggris yang terkonsentrasi untuk dimasuki setelah studi.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 4 AND title = $q$A Home for Technology and Gaming$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland advantage 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Chọn chương trình và kiểm tra kỳ nhập học$q$,
    "description_vi" = $q$Tìm các chương trình cử nhân và thạc sĩ giảng dạy bằng tiếng Anh qua Studyinfo.fi, cổng nộp hồ sơ quốc gia của Phần Lan, và lưu ý kỳ nhập học: hầu hết các chương trình tuyển một lần mỗi năm với hạn nộp hồ sơ vào tháng 1.$q$,
    "title_fil" = $q$Piliin ang programa at tingnan ang intake$q$,
    "description_fil" = $q$Maghanap ng mga English-taught na bachelor's at master's programme sa Studyinfo.fi, ang pambansang application portal ng Finland, at tandaan ang intake: karamihan ng programa ay tumatanggap isang beses kada taon na ang aplikasyon ay due sa January.$q$,
    "title_idn" = $q$Pilih program Anda dan periksa periode masuk$q$,
    "description_idn" = $q$Cari program sarjana dan magister berbahasa pengantar Inggris melalui Studyinfo.fi, portal pendaftaran nasional Finlandia, dan perhatikan periode masuk: sebagian besar program menerima sekali setahun dengan pendaftaran jatuh tempo pada Januari.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND step_number = 1 AND title = $q$Choose your programme and check the intake$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland step 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nộp hồ sơ qua Studyinfo và tham gia các kỳ thi đầu vào$q$,
    "description_vi" = $q$Nộp hồ sơ qua Studyinfo.fi kèm bảng điểm và kết quả thi ngôn ngữ. Một số chương trình yêu cầu thi đầu vào hoặc hồ sơ năng lực riêng, đặc biệt trong thiết kế và nghệ thuật.$q$,
    "title_fil" = $q$Mag-apply sa Studyinfo at kumuha ng anumang entrance exam$q$,
    "description_fil" = $q$Isumite ang aplikasyon mo sa Studyinfo.fi kasama ang transcript at resulta ng language test. May ilang programang humihingi ng entrance examination o hiwalay na portfolio, lalo na sa design at sining.$q$,
    "title_idn" = $q$Daftar melalui Studyinfo dan ikuti ujian masuk$q$,
    "description_idn" = $q$Kirim aplikasi Anda melalui Studyinfo.fi dengan transkrip dan hasil tes bahasa. Beberapa program memerlukan ujian masuk atau portofolio terpisah, terutama di bidang desain dan seni.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND step_number = 2 AND title = $q$Apply through Studyinfo and sit any entrance exams$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland step 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Đóng học phí đặt cọc và xin giấy phép cư trú$q$,
    "description_vi" = $q$Sau khi được nhận, đóng học phí năm đầu (trừ khi bạn có học bổng) và nộp hồ sơ trực tuyến cho Cơ quan Di trú Phần Lan, Migri, để xin giấy phép cư trú học tập, kèm chứng minh tài chính ít nhất EUR 560 mỗi tháng.$q$,
    "title_fil" = $q$Bayaran ang tuition deposit at mag-apply para sa residence permit$q$,
    "description_fil" = $q$Pagkatanggap, bayaran ang tuition sa unang taon (maliban kung may scholarship ka) at mag-apply online sa Finnish Immigration Service, Migri, para sa residence permit for studies, na may patunay ng hindi bababa sa EUR 560 kada buwan na pondo.$q$,
    "title_idn" = $q$Bayar deposit biaya kuliah dan ajukan izin tinggal$q$,
    "description_idn" = $q$Setelah diterima, bayar biaya kuliah tahun pertama (kecuali Anda memiliki beasiswa) dan ajukan secara online ke Layanan Imigrasi Finlandia, Migri, untuk izin tinggal studi, dengan bukti dana minimal EUR 560 per bulan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND step_number = 3 AND title = $q$Pay your tuition deposit and apply for a residence permit$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland step 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_process_steps SET
    "title_vi" = $q$Nhập cảnh và đăng ký nơi cư trú$q$,
    "description_vi" = $q$Sau khi đến, hãy đăng ký với Cơ quan Dịch vụ Dữ liệu Dân cư và Kỹ thuật số địa phương và nhận thẻ giấy phép cư trú. Văn phòng quốc tế của trường thường tổ chức buổi định hướng riêng cho việc này.$q$,
    "title_fil" = $q$Dumating at iparehistro ang paninirahan mo$q$,
    "description_fil" = $q$Pagkadating, magparehistro sa lokal na Digital and Population Data Services Agency at kunin ang residence permit card mo. Karaniwang may nakalaang orientation ang international office ng university para dito.$q$,
    "title_idn" = $q$Tiba dan daftarkan tempat tinggal Anda$q$,
    "description_idn" = $q$Setelah tiba, daftar ke Digital and Population Data Services Agency setempat dan ambil kartu izin tinggal Anda. Kantor internasional universitas biasanya menyelenggarakan orientasi khusus untuk ini.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND step_number = 4 AND title = $q$Arrive and register your residence$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland step 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có cần nói tiếng Phần Lan để học ở Phần Lan không?$q$,
    "answer_vi" = $q$Không. Phần Lan có nhiều chương trình cử nhân và thạc sĩ giảng dạy hoàn toàn bằng tiếng Anh, và cuộc sống hằng ngày ở hầu hết các thành phố cũng thoải mái với tiếng Anh, dù biết một ít tiếng Phần Lan sẽ giúp ích khi làm thêm và ổn định lâu dài.$q$,
    "question_fil" = $q$Kailangan ko bang magsalita ng Finnish para mag-aral sa Finland?$q$,
    "answer_fil" = $q$Hindi. Nag-aalok ang Finland ng malawak na hanay ng bachelor's at master's programme na itinuturo nang buo sa Ingles, at komportable rin ang araw-araw na buhay sa karamihan ng lungsod sa Ingles, bagama't nakakatulong ang pag-aaral ng kaunting Finnish sa part-time na trabaho at sa pangmatagalang pagsasaayos ng buhay.$q$,
    "question_idn" = $q$Apakah saya harus bisa berbahasa Finlandia untuk kuliah di Finlandia?$q$,
    "answer_idn" = $q$Tidak. Finlandia menawarkan beragam program sarjana dan magister yang diajarkan sepenuhnya dalam bahasa Inggris, dan kehidupan sehari-hari di sebagian besar kota juga nyaman dengan bahasa Inggris, meskipun belajar sedikit bahasa Finlandia membantu untuk kerja paruh waktu dan menetap jangka panjang.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 1 AND question = $q$Do I need to speak Finnish to study in Finland?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland faq 1: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Du học Phần Lan tốn bao nhiêu tiền?$q$,
    "answer_vi" = $q$Học phí cho sinh viên ngoài EU thường từ EUR 8,000 đến EUR 20,000 mỗi năm cho các chương trình cử nhân và thạc sĩ. Bậc tiến sĩ miễn phí cho mọi quốc tịch. Chi phí sinh hoạt cộng thêm khoảng EUR 700 đến EUR 1,200 mỗi tháng.$q$,
    "question_fil" = $q$Magkano ang gastos sa pag-aaral sa Finland?$q$,
    "answer_fil" = $q$Karaniwang nasa EUR 8,000 hanggang EUR 20,000 kada taon ang tuition para sa mga non-EU student sa bachelor's at master's programme. Libre ang doctoral study para sa lahat ng nasyonalidad. Nadaragdagan ng humigit-kumulang EUR 700 hanggang EUR 1,200 kada buwan ang gastos sa pamumuhay.$q$,
    "question_idn" = $q$Berapa biaya kuliah di Finlandia?$q$,
    "answer_idn" = $q$Biaya kuliah bagi mahasiswa non-UE biasanya berkisar dari EUR 8,000 hingga EUR 20,000 per tahun untuk program sarjana dan magister. Studi doktoral gratis bagi semua kewarganegaraan. Biaya hidup menambah sekitar EUR 700 hingga EUR 1,200 per bulan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 2 AND question = $q$How much does it cost to study in Finland?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland faq 2: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể vừa học vừa làm ở Phần Lan không?$q$,
    "answer_vi" = $q$Có. Sinh viên quốc tế được làm việc tối đa 30 giờ mỗi tuần trong học kỳ và làm toàn thời gian trong các kỳ nghỉ, một trong những mức cho phép làm thêm dành cho sinh viên rộng rãi nhất châu Âu. Công việc thực tập và làm luận văn không tính vào giới hạn này.$q$,
    "question_fil" = $q$Puwede ba akong magtrabaho habang nag-aaral sa Finland?$q$,
    "answer_fil" = $q$Oo. Puwedeng magtrabaho ang mga international student nang hanggang 30 oras kada linggo habang may klase at full-time tuwing bakasyon, isa sa pinakamaluwag na student work allowance sa Europa. Hindi isinasama sa limitasyong ito ang internship at thesis work.$q$,
    "question_idn" = $q$Bisakah saya bekerja sambil kuliah di Finlandia?$q$,
    "answer_idn" = $q$Bisa. Mahasiswa internasional dapat bekerja hingga 30 jam per minggu selama semester dan penuh waktu selama libur, salah satu izin kerja mahasiswa paling longgar di Eropa. Pekerjaan magang dan tesis tidak dihitung dalam batas ini.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 3 AND question = $q$Can I work while studying in Finland?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland faq 3: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi cần chứng minh bao nhiêu tiền để xin giấy phép cư trú Phần Lan?$q$,
    "answer_vi" = $q$Bạn cần chứng minh khả năng tài chính khoảng EUR 560 mỗi tháng, tức khoảng EUR 6,720 cho cả năm, cùng bảo hiểm y tế tư nhân chi trả chi phí khám chữa bệnh và thuốc.$q$,
    "question_fil" = $q$Magkano ang kailangan kong ipakita para sa Finnish residence permit?$q$,
    "answer_fil" = $q$Kailangan mong ipakita ang pondong humigit-kumulang EUR 560 kada buwan, mga EUR 6,720 para sa buong taon, kasama ang pribadong health insurance na sumasaklaw sa gastos sa medikal at gamot.$q$,
    "question_idn" = $q$Berapa dana yang harus saya tunjukkan untuk izin tinggal Finlandia?$q$,
    "answer_idn" = $q$Anda perlu menunjukkan dana sekitar EUR 560 per bulan, sekitar EUR 6,720 untuk satu tahun penuh, beserta asuransi kesehatan swasta yang menanggung biaya medis dan obat-obatan.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 4 AND question = $q$How much money do I need to show for a Finnish residence permit?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland faq 4: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  UPDATE country_faqs SET
    "question_vi" = $q$Tôi có thể ở lại Phần Lan sau khi tốt nghiệp không?$q$,
    "answer_vi" = $q$Có. Sinh viên tốt nghiệp có thể xin giấy phép cư trú để tìm việc hoặc khởi nghiệp, có hiệu lực tối đa 24 tháng, một trong những giấy phép sau tốt nghiệp dài nhất châu Âu.$q$,
    "question_fil" = $q$Puwede ba akong manatili sa Finland pagkatapos magtapos?$q$,
    "answer_fil" = $q$Oo. Puwedeng mag-apply ang mga nagtapos ng residence permit para maghanap ng trabaho o magsimula ng negosyo, balido nang hanggang 24 na buwan, isa sa pinakamahabang post-study permit sa Europa.$q$,
    "question_idn" = $q$Bisakah saya tinggal di Finlandia setelah lulus?$q$,
    "answer_idn" = $q$Bisa. Lulusan dapat mengajukan izin tinggal untuk mencari kerja atau memulai bisnis, berlaku hingga 24 bulan, salah satu izin pascastudi terpanjang di Eropa.$q$
  WHERE country_id = (SELECT id FROM countries WHERE slug = $q$finland$q$)
    AND "order" = 5 AND question = $q$Can I stay in Finland after I graduate?$q$;
  GET DIAGNOSTICS n = ROW_COUNT;
  IF n <> 1 THEN RAISE EXCEPTION 'Finland faq 5: not matched exactly once (% rows). Check the English text in the database.', n; END IF;

  RAISE NOTICE 'Finland: vi, fil, idn content saved (1 country, % advantages, % steps, % FAQs).', 4, 4, 5;
END $$;

-- Check (optional): every count below should be 4/4/5.
SELECT
  (SELECT count(*) FROM country_advantages a JOIN countries c ON c.id = a.country_id WHERE c.slug = $q$finland$q$ AND a.title_vi IS NOT NULL AND a.title_fil IS NOT NULL AND a.title_idn IS NOT NULL) AS advantages,
  (SELECT count(*) FROM country_process_steps s JOIN countries c ON c.id = s.country_id WHERE c.slug = $q$finland$q$ AND s.title_vi IS NOT NULL AND s.title_fil IS NOT NULL AND s.title_idn IS NOT NULL) AS steps,
  (SELECT count(*) FROM country_faqs f JOIN countries c ON c.id = f.country_id WHERE c.slug = $q$finland$q$ AND f.question_vi IS NOT NULL AND f.question_fil IS NOT NULL AND f.question_idn IS NOT NULL) AS faqs;
