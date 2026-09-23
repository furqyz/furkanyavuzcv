document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen Logic
    const splashOverlay = document.getElementById('splashOverlay');
    const enterBtn = document.getElementById('enterBtn');

    if (enterBtn && splashOverlay) {
        enterBtn.addEventListener('click', () => {
            // Phase 1: Initiation
            splashOverlay.classList.add('zoom-out');

            // Phase 2: Fade out overlay
            setTimeout(() => {
                splashOverlay.classList.add('hide');
            }, 600);

            // Phase 3: Total cleanup
            setTimeout(() => {
                splashOverlay.style.display = 'none';
            }, 1500);
        });
    }

    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');

    // Function to show a specific section
    const showSection = (targetId) => {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update nav active state
        navItems.forEach(nav => {
            nav.classList.remove('active');
            if (nav.getAttribute('href') === targetId) {
                nav.classList.add('active');
            }
        });

        // Reset scroll position
        window.scrollTo(0, 0);
    };

    // Handle nav clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            showSection(targetId);
        });
    });

    // Handle Bana Ulaş Toggle
    const contactBtn = document.getElementById('contactBtn');
    const contactGroup = document.getElementById('contactGroup');

    if (contactBtn && contactGroup) {
        contactBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            contactGroup.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', () => {
            contactGroup.classList.remove('active');
        });

        // Prevent closing when clicking inside the links
        const contactLinks = contactGroup.querySelector('.contact-links');
        if (contactLinks) {
            contactLinks.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // Cursor Star Trail
    let lastX = 0;
    let lastY = 0;
    const distanceThreshold = 35; // Minimum travel distance for a new star

    document.addEventListener('mousemove', (e) => {
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

        if (dist > distanceThreshold) {
            createStar(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    function createStar(x, y) {
        const star = document.createElement('div');
        star.className = 'cursor-star';

        // Custom fall direction
        const tx = (Math.random() - 0.5) * 60;
        const ty = 40 + Math.random() * 40;
        star.style.setProperty('--tx', `${tx}px`);
        star.style.setProperty('--ty', `${ty}px`);

        // Random size
        const size = 5 + Math.random() * 8;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.left = `${x - size / 2}px`;
        star.style.top = `${y - size / 2}px`;

        document.body.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 800);
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    const toggleTheme = () => {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    };

    const updateThemeIcon = (isDark) => {
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcon(true);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // --- Multi-Language Support ---
    const translations = {
        tr: {
            profile_title: "Orman Endüstri Mühendisi",
            nav_about: "Hakkımda",
            nav_projects: "Proje Deneyimlerim",
            nav_experience: "Çalışma Hayatım",
            nav_certificates: "Sertifikalarım",
            btn_contact: "Bana Ulaş",
            btn_cv: "CV İndir",
            about_title: "Hakkımda olan bilgiler",
            bio_heading: "Ben Kimim",
            bio_p1: "Ben Furkan YAVUZ. 2004 yılında Zonguldak’ın Çaycuma ilçesinde doğdum. Lise eğitimimi Zonguldak’ta tamamladıktan sonra üniversite eğitimi için İzmir’e yerleştim ve İzmir Katip Çelebi Üniversitesi Orman Endüstri Mühendisliği bölümünden başarıyla mezun oldum. Bu süreci sadece akademik bir yolculuk olarak değil; bitmek bilmeyen bir öğrenme tutkusu ve girişimcilik serüveni olarak tanımlıyorum. 4 yıllık lisans hayatım boyunca, sınırları zorlayan pek çok farklı disiplinde kendimi denemekten ve yeni alanlara atılmaktan asla çekinmedim. Yazılımdan finansal analizlere, e-ticaret operasyonlarından TÜBİTAK 2209-A projelerine kadar uzanan bu süreçte; 500.000’den fazla kullanıcıya ulaşan projeler yönettim ve sayısız girişimde aktif rol aldım.",
            tag_counter_500k: "500.000",
            bio_p2: "Benim için en büyük motivasyon kaynağı, bilinmeyen bir konunun derinliklerine inip onu en ince ayrıntısına kadar çözümlemektir. Bir problemi veya teknolojiyi günlerce, gerekirse haftalarca titizlikle araştırmaktan; o konunun uzmanı olana dek detaylarda kaybolmaktan büyük keyif alırım. Öğrenmeye olan bu \"aşırı\" açık yapım ve teknik altyapımı ticari zekayla birleştirme yeteneğimle, sadece verilen işi yapan değil; o işi kökten kavrayan, analiz eden ve inovatif çözümler üreten bir vizyonla hareket ediyorum.",
            career_heading: "Kariyer Hedefleri",
            career_p1: "Orman Endüstri Mühendisliği disiplinini, ileri seviye teknoloji hakimiyetim ve dijital araçları en uç sınırlarına kadar kullanma becerimle birleştirerek sektörde fark yaratmayı hedefliyorum. Yazılım vizyonum ve analitik düşünme yapımla; geleneksel mühendislik süreçlerini dijital sistemlere entegre eden, verimliliği teknolojiyle maksimize eden öncü projelerde etkin rol almayı amaçlıyorum.",
            career_p2: "Öğrenmeye olan sınırsız merakımı ve teknik analitik yeteneğimi, kurumun dijital dönüşüm vizyonuna değer katacak bir kariyere dönüştürmek temel gayemdir. Sektörel bilgi birikimimi teknolojik çözüm üretme gücümle birleştirerek, sadece süreci yöneten değil, geleceğin mühendislik çözümlerini inşa eden bir vizyonla hareket ediyorum.",
            tag_personal: "Kişisel Bilgiler",
            info_birth: "Doğum:",
            info_residence: "İkamet:",
            info_license: "Ehliyet:",
            info_military: "Askerlik:",
            military_status: "Tecilli",
            tag_education: "Eğitim",
            uni_name: "İzmir Katip Çelebi Üniversitesi",
            uni_deg: "Orman Endüstri Mühendisliği (2022 - 2026)",
            highschool_name: "Çaycuma Oktay ve Olcay Yurtbay Anadolu Lisesi",
            tag_languages: "Diller",
            lang_tr: "Türkçe",
            lang_tr_level: "Anadil",
            lang_en: "İngilizce",
            lang_en_level: "B2 - Üst Orta Seviye (Teknik okuma ve yazma yetkinliği)",
            projects_title: "Proje Deneyimlerim",
            tag_ops: "Operasyon & Satış",
            proj_ops_title: "Dijital & Fiziksel Ürün Operasyonları",
            date_present: "2021 – 2026",
            proj_ops_desc: "Lisans, yazılım ve fiziksel ürünlerin tedarik, satış ve ödeme süreçlerini uçtan uca yönetiyorum.",
            tag_trade: "Ticaret & Tedarik",
            proj_trade_title: "Uluslararası Ürün Tedarik & Satış Operasyonu",
            proj_trade_desc: "Yurtdışından ürün tedarik edip (oyun konsolu ve aksesuarları) online ve fiziksel dağıtım kanalları üzerinden 250’den fazla satış işlemini uçtan uca yönettim.",
            tag_hobby: "Yazılım & Tasarım",
            proj_web_title: "Yazılım & Web Geliştirme (Hobi)",
            date_constant: "Sürekli Gelişim",
            proj_web_desc: "Kullanıcı ihtiyaçlarına yönelik basit çaplı uygulama geliştirme çalışmaları yürütüyor ve modern arayüz tasarımlarına sahip web siteleri hazırlıyorum.",
            tag_software: "Yazılım Geliştirme",
            proj_bot_title: "Yazılım & Bot Geliştirme",
            proj_bot_desc: "500.000+ kullanıcıya ulaşan yüksek etkileşimli Discord botları geliştirdim ve ticarileştirdim.",
            tag_ecommerce: "E-Ticaret Girişimi",
            proj_ecomm2_title: "E-Ticaret & Perakende Girişimi",
            proj_ecomm2_desc: "Online ayakkabı satış mağazası kurulumu kapsamında pazar araştırması ve operasyonel planlama süreçlerini tamamladım.",
            tag_design: "Tasarım & İçerik",
            proj_design_title: "Grafik Tasarım & İçerik Üretimi",
            proj_design_desc: "Sosyal medya platformları için profesyonel içerik üretimi, logo tasarımı ve video kurgusu süreçlerini yönettim.",
            experience_title: "Çalışma Hayatım",
            tag_family: "Aile İşletmesi / Ticaret",
            exp_yavuzlar_title: "Yavuzlar Plastik",
            exp_yavuzlar_loc: "Filyos - Zonguldak",
            exp_yavuzlar_desc: "Kendi iş yerimizde montaj ve satış operasyonlarını bizzat yürütüyorum; ürün tedarik ve müşteri yönetimi süreçlerini yönetiyorum.",
            tag_intern: "Staj / Deneyim",
            exp_teksoz_title: "Teksöz Orman Ürünleri",
            exp_teksoz_loc: "Hatay - Antakya",
            exp_teksoz_desc: "Sektörel süreçler ve hammadde yönetimi üzerine pratik saha deneyimi.",
            tag_field: "Staj / Saha Deneyimi",
            exp_akyuzlu_title: "Akyüzlü Mühendislik",
            exp_akyuzlu_loc: "Çaycuma - Zonguldak",
            exp_akyuzlu_desc: "Saha çalışmalarına aktif katılım sağlayarak; izin belgelerinin düzenlenmesi ve mühendislik planlama süreçlerinde rol alıyorum.",
            skills_title: "Beceriler & Sertifikalar",
            tech_skills_heading: "Teknik Beceriler",
            skill_pazar: "Pazar Analizi & Trend Öngörüsü",
            skill_endustri: "Endüstriyel Süreç Yönetimi",
            skill_veri: "Veri Odaklı Satış Stratejileri",
            skill_gorsel: "Görsel Kimlik & Marka İletişimi",
            skill_teknik: "Teknik & Kreatif Metin Yazarlığı",
            skill_dijital: "Dijital İş Akışı & Otomasyon",
            skill_stratejik: "Stratejik Planlama & Çizelgeleme",
            skill_analitik: "Analitik Problem Çözme",
            skill_ileri: "İleri Seviye Veri Analitiği",
            skill_proje: "Proje Yaşam Döngüsü Takibi",
            certs_heading: "Sertifikalar & Belgeler",
            cert_excel: "Microsoft Excel Temelleri",
            cert_word: "Microsoft Word Temelleri",
            cert_ent: "Girişimcilik Temelleri",
            cert_invest: "Şirket Değerleme ve Yatırım Süreçleri",
            cert_fin: "Finansal Okuryazarlık",
            cert_canva: "Uygulamalı Canva",
            cert_en: "B2 Seviye İngilizce",
            cert_sea: "Amatör Denizci Belgesi",
            cert_uav: "İHA - 1 - Sportif / Amatör Belgesi"
        },
        en: {
            profile_title: "Forest Industrial Engineer",
            nav_about: "About Me",
            nav_projects: "Project Experience",
            nav_experience: "Work History",
            nav_certificates: "Certificates",
            btn_contact: "Contact Me",
            btn_cv: "Download CV",
            about_title: "About Me Information",
            bio_heading: "Who Am I",
            bio_p1: "I am Furkan YAVUZ. I was born in 2004 in Zonguldak, Çaycuma. After completing my high school education in Zonguldak, I moved to Izmir for university and successfully graduated from Izmir Katip Celebi University with a bachelor's degree in Forest Industrial Engineering. I define this process not just as an academic journey, but as an endless passion for learning and an entrepreneurial adventure. Throughout my 4-year undergraduate education, I have never hesitated to test myself in various disciplines and venture into new fields. From software to financial analysis, e-commerce operations to TUBITAK 2209-A projects; I managed projects reaching over 500.000 users and took active roles in numerous ventures.",
            tag_counter_500k: "500,000",
            bio_p2: "The greatest source of motivation for me is to dive deep into an unknown subject and solve it down to the finest detail. I take great pleasure in carefully researching a problem or technology for days, even weeks if necessary, until I become an expert. With my open-minded nature for learning and my ability to combine technical infrastructure with commercial intelligence, I act with a vision that not only does the given job but fundamentally grasps, analyzes, and produces innovative solutions.",
            career_heading: "Career Goals",
            career_p1: "I aim to make a difference in the sector by combining my Forest Industrial Engineering discipline with my high level of technology command and my ability to use digital tools to their limits. With my software vision and analytical thinking structure, I aim to play an active role in pioneering projects that integrate traditional engineering processes into digital systems and maximize efficiency through technology.",
            career_p2: "My fundamental goal is to turn my unlimited curiosity for learning and technical analytical talent into a career that adds value to the institution's digital transformation vision. By combining my sectoral knowledge with my power to produce technological solutions, I act with a vision that not only manages the process but builds the engineering solutions of the future.",
            tag_personal: "Personal Information",
            info_birth: "Birth:",
            info_residence: "Residence:",
            info_license: "License:",
            info_military: "Military:",
            military_status: "Postponed",
            tag_education: "Education",
            uni_name: "Izmir Katip Celebi University",
            uni_deg: "Forest Industrial Engineering (2022 - 2026)",
            highschool_name: "Caycuma Anadolu High School",
            tag_languages: "Languages",
            lang_tr: "Turkish",
            lang_tr_level: "Native",
            lang_en: "English",
            lang_en_level: "B2 - Upper Intermediate (Technical reading & writing)",
            projects_title: "Project Experiences",
            tag_ops: "Operations & Sales",
            proj_ops_title: "Digital & Physical Product Operations",
            date_present: "2021 – 2026",
            proj_ops_desc: "I manage end-to-end procurement, sales, and payment processes for license, software, and physical products.",
            tag_trade: "Trade & Procurement",
            proj_trade_title: "International Sourcing & Sales Operation",
            proj_trade_desc: "I managed end-to-end sales operations for more than 250 transactions through online and physical distribution channels via global sourcing.",
            tag_hobby: "Software & Design",
            proj_web_title: "Software & Web Dev (Hobby)",
            date_constant: "Constant Learning",
            proj_web_desc: "I conduct application development studies based on user needs and prepare websites with modern interface designs.",
            tag_software: "Software Development",
            proj_bot_title: "Software & Bot Development",
            proj_bot_desc: "Developed and commercialized highly interactive Discord bots reaching over 500,000 users.",
            tag_ecommerce: "E-Commerce Venture",
            proj_ecomm2_title: "E-Commerce & Retail Venture",
            proj_ecomm2_desc: "Completed market research and operational planning for an online shoe store setup.",
            tag_design: "Design & Content",
            proj_design_title: "Graphic Design & Content Creation",
            proj_design_desc: "Managed professional content production, logo design, and video editing for social media platforms.",
            experience_title: "My Work Life",
            tag_family: "Family Business / Trade",
            exp_yavuzlar_title: "Yavuzlar Plastic",
            exp_yavuzlar_loc: "Filyos - Zonguldak",
            exp_yavuzlar_desc: "Executing assembly and sales operations; specialized in procurement and customer management.",
            tag_intern: "Internship / Experience",
            exp_teksoz_title: "Teksoz Forest Products",
            exp_teksoz_loc: "Hatay - Antakya",
            exp_teksoz_desc: "Practical field experience in sectoral processes and raw material management.",
            tag_field: "Internship / Field",
            exp_akyuzlu_title: "Akyüzlü Engineering",
            exp_akyuzlu_loc: "Caycuma - Zonguldak",
            exp_akyuzlu_desc: "Active participation in field work; handling documentation and engineering planning processes.",
            skills_title: "Skills & Certificates",
            tech_skills_heading: "Technical Skills",
            skill_pazar: "Market Analysis & Trend Forecasting",
            skill_endustri: "Industrial Process Management",
            skill_veri: "Data-Driven Sales Strategies",
            skill_gorsel: "Visual Identity & Brand Comm.",
            skill_teknik: "Technical & Creative Copywriting",
            skill_dijital: "Digital Workflow & Automation",
            skill_stratejik: "Strategic Planning & Scheduling",
            skill_analitik: "Analytical Problem Solving",
            skill_ileri: "Advanced Data Analytics",
            skill_proje: "Project Lifecycle Tracking",
            certs_heading: "Certificates & Documents",
            cert_excel: "Microsoft Excel Fundamentals",
            cert_word: "Microsoft Word Fundamentals",
            cert_ent: "Entrepreneurship Basics",
            cert_invest: "Valuation & Investment Processes",
            cert_fin: "Financial Literacy",
            cert_canva: "Applied Canva",
            cert_en: "B2 Level English",
            cert_sea: "Amateur Seaman's Certificate",
            cert_uav: "UAV - 1 - Sport/Amateur License"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'tr';
    const langToggle = document.getElementById('langToggle');

    const updateLanguage = () => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            let text = translations[currentLang][key];
            if (text) {
                el.innerText = text;
            }
        });
        langToggle.innerText = currentLang === 'tr' ? 'EN' : 'TR';
        document.documentElement.lang = currentLang;
    };

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'tr' ? 'en' : 'tr';
            localStorage.setItem('lang', currentLang);
            updateLanguage();
        });
    }

    // --- vCard Generation ---
    const vcardBtn = document.getElementById('vcardBtn');
    if (vcardBtn) {
        vcardBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Furkan YAVUZ
ORG:Orman Endüstri Mühendisi
TEL;TYPE=CELL:+905352023691
EMAIL:67dedem67@gmail.com
URL:https://linkedin.com/in/yavuz-furkan
END:VCARD`;
            const blob = new Blob([vcard], { type: 'text/vcard' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Furkan_YAVUZ.vcf';
            a.click();
        });
    }

    // --- Scroll Reveal ---
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const initReveal = () => {
        document.querySelectorAll('.card, .section-title, .profile-section').forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    };

    // Initial load
    updateLanguage();
    initReveal();
    showSection('#kimim');
});
