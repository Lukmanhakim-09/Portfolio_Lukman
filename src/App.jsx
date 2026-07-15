import { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  BookOpen, 
  Code, 
  Terminal, 
  GraduationCap, 
  Mail, 
  MessageSquare, 
  Linkedin, 
  MapPin, 
  Globe, 
  Layers, 
  Trophy, 
  ChevronUp, 
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// Animations from React Bits
import CircularGallery from './components/CircularGallery';
import DecryptedText from './components/DecryptedText';
import SpotlightCard from './components/SpotlightCard';
import Magnetic from './components/Magnetic';

// Particle Background Component
function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 60;
    
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.15 - 0.075;
        this.speedY = Math.random() * 0.15 - 0.075;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = `rgba(129, 140, 248, ${this.alpha})`; // Indigo glowing particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Highlights for CircularGallery
  const galleryItems = [
    { image: '/duta.jpg', text: 'Duta Kampus Sulsel' },
    { image: '/Kegiatan PKM-KC.jpg', text: 'ISARA Mobile App' },
    { image: '/magang.jpeg', text: 'Kalla Institute IT' },
    { image: '/ppkpt.jpeg', text: 'PPKPT Lapor Aman' },
    { image: '/bappeda.jpg', text: 'Bappeda Parepare' },
    { image: '/suruang.JPG', text: 'Beasiswa Kalla Suruang' },
    { image: '/graduation.jpeg', text: 'Graduation' },
    { image: '/sb2.jpg', text: 'Studi Banding UB' },
    { image: '/sb3.jpeg', text: 'Studi Banding ITS' },
    { image: '/iic.jpeg', text: 'IIC Competition' },
  ];

  // Achievements
  const achievements = [
    {
      title: "Lolos Hackathon x Digdaya",
      desc: "Berhasil lolos dan berkompetisi dalam Hackathon x Digdaya, menunjukkan kemampuan inovasi teknologi dan problem-solving dalam lingkungan kompetitif.",
      icon: Terminal,
      accent: "from-cyan-400 to-blue-500"
    },
    {
      title: "Top 5 Innovation Video Competition Tingkat Nasional",
      desc: "Meraih penghargaan dalam kompetisi video inovasi tingkat nasional yang menyoroti solusi teknologi kreatif.",
      icon: Trophy,
      accent: "from-amber-400 to-orange-500"
    },
    {
      title: "Lolos Pendanaan Program Kreativitas Mahasiswa (PKM)",
      desc: "Mendapat pendanaan riset bergengsi dari Kemendikbudristek untuk proyek Saintek inovatif.",
      icon: Award,
      accent: "from-emerald-400 to-teal-500"
    },
    {
      title: "Awardee Beasiswa Kalla",
      desc: "Penerima beasiswa prestasi penuh dari Kalla Group atas rekam jejak akademik & kepemimpinan yang unggul.",
      icon: GraduationCap,
      accent: "from-blue-400 to-indigo-500"
    },
    {
      title: "Juara Duta Kampus Intelegensia Sulawesi Selatan",
      desc: "Terpilih sebagai perwakilan duta akademik provinsi atas kemampuan intelektual dan kecakapan publik.",
      icon: Trophy,
      accent: "from-purple-400 to-pink-500"
    }
  ];

  // Complete Projects & Experiences Data
  const projectsData = [
    // Pengabdian Masyarakat
    {
      title: "Pelatihan Microsoft Project",
      subtitle: "Kantor Kelurahan Lapadde, Kota Parepare",
      description: "Memberikan pelatihan praktis pengelolaan jadwal dan anggaran proyek menggunakan MS Project untuk meningkatkan efisiensi kerja staf pelayanan kelurahan.",
      category: "Pendidikan & Pengabdian",
      image: "/pelatihan-microsoft-project.jpg",
      badge: "Pengabdian"
    },
    {
      title: "Program Pengabdian Beasiswa Kalla",
      subtitle: "Desa Suruang, Polewali Mandar",
      description: "Terjun langsung dalam program pemberdayaan masyarakat desa melalui inisiatif pendidikan, sosial, dan pendampingan ekonomi kreatif.",
      category: "Pendidikan & Pengabdian",
      image: "/suruang.JPG",
      badge: "Pengabdian"
    },
    // Penelitian & Pengembangan
    {
      title: "Aplikasi Monitoring Keuangan Bappeda",
      subtitle: "Badan Perencanaan Pembangunan Daerah Parepare",
      description: "Bertindak sebagai System Analyst & Front-End Developer untuk merancang sistem pemantauan alokasi dan realisasi anggaran daerah secara transparan.",
      category: "Teknologi & Dev",
      image: "/bappeda.jpg",
      badge: "Analyst & FE"
    },
    {
      title: "Aplikasi Keuangan Kalla Institute",
      subtitle: "Magang di Kalla Group",
      description: "Mengembangkan modul aplikasi manajemen keuangan internal pada Biro Keuangan Kalla Institute sebagai Fullstack Developer selama program magang.",
      category: "Teknologi & Dev",
      image: "/magang.jpeg",
      badge: "Fullstack Dev"
    },
    {
      title: "Website PPKPT \"Lapor Aman\"",
      subtitle: "Aplikasi Pelaporan Kekerasan Seksual Kampus",
      description: "Merancang arsitektur sistem dan antarmuka web enkripsi responsif untuk pelaporan kekerasan seksual yang menjamin kerahasiaan data korban.",
      category: "Teknologi & Dev",
      image: "/ppkpt.jpeg",
      badge: "System Analyst"
    },
    {
      title: "Game Edukasi Keamanan Jaringan \"Cyberscape\"",
      subtitle: "Media Edukasi Keamanan Cyber",
      description: "Merancang game interaktif berbasis 2D untuk mengedukasi pelajar sekolah menengah mengenai keamanan siber dan simulasi pertahanan jaringan komputer.",
      category: "Teknologi & Dev",
      image: "/cyberscape.png",
      badge: "Game Analyst & FE"
    },
    {
      title: "Aplikasi Mobile ISARA Language",
      subtitle: "Proyek Hibah Kemendikbudristek PKM-KC",
      description: "Sebagai Project Manager, memimpin tim membangun aplikasi penerjemah bahasa isyarat real-time untuk menjembatani inklusivitas kaum difabel.",
      category: "Teknologi & Dev",
      image: "/Kegiatan PKM-KC.jpg",
      badge: "Project Manager"
    },
    // Pelatihan & Sertifikasi
    {
      title: "Peningkatan Kapasitas Satgas PPKS",
      subtitle: "Kemendikbudristek Wilayah IV (Timur)",
      description: "Sertifikasi dan pelatihan intensif nasional mengenai hukum pencegahan serta penanganan tindak kekerasan seksual di perguruan tinggi.",
      category: "Pendidikan & Pengabdian",
      image: "/PPKS.jpg",
      badge: "Sertifikasi"
    },
    {
      title: "Kalla Leadership Training Program",
      subtitle: "Kalla Group (2022 - 2024)",
      description: "Program intensif pengembangan kecakapan interpersonal, pemecahan masalah kompleks, dan manajemen kepemimpinan masa depan.",
      category: "Kepemimpinan & Organisasi",
      image: "/kepemimpinan.jpeg",
      badge: "Kepemimpinan"
    },
    {
      title: "Duta Kampus Intelegensia Sulawesi Selatan",
      subtitle: "Ikatan Duta Kampus Sulsel (2023 - 2024)",
      description: "Berkampanye aktif menyosialisasikan pentingnya inklusi pendidikan tinggi dan literasi digital di kalangan mahasiswa Sulawesi Selatan.",
      category: "Kepemimpinan & Organisasi",
      image: "/duta.jpg",
      badge: "Duta Kampus"
    },
    {
      title: "Digital Entrepreneurship Academy",
      subtitle: "Kementerian Komunikasi & Informatika (2024)",
      description: "Pelatihan intensif pengembangan ide bisnis digital dan strategi pemasaran startup berbasis platform komputasi awan.",
      category: "Pendidikan & Pengabdian",
      image: "/kominfo1.jpeg",
      badge: "Kewirausahaan"
    },
    // Pengalaman Lain
    {
      title: "PPI (Purna Paskibraka Indonesia) Kabupaten",
      subtitle: "Dinas Kepemudaan & Olahraga",
      description: "Terpilih sebagai tim pengibar bendera pusaka tingkat kabupaten melalui seleksi fisik dan kepemimpinan yang ketat.",
      category: "Kepemimpinan & Organisasi",
      image: "/paskibra.jpeg",
      badge: "PPI"
    },
    {
      title: "Badan Eksekutif Mahasiswa (BEM)",
      subtitle: "Koordinator Penalaran & Keilmuan",
      description: "Memimpin divisi penalaran untuk menginisiasi forum diskusi, kajian ilmiah, serta pendampingan kompetisi akademik mahasiswa tingkat institut.",
      category: "Kepemimpinan & Organisasi",
      image: "/bem.jpeg",
      badge: "BEM ITBH"
    },
    {
      title: "Kalla Youth Changemakers (KYC)",
      subtitle: "Komunitas Penggerak Sosial Kalla Group",
      description: "Berpartisipasi aktif merancang proyek sosial berkelanjutan di bidang pendidikan dan pelestarian lingkungan hidup.",
      category: "Kepemimpinan & Organisasi",
      image: "/kalla.jpg",
      badge: "KYC Member"
    },
    {
      title: "Studi Banding ITS & Universitas Brawijaya",
      subtitle: "Delegasi Studi Banding SBPPKM (2024)",
      description: "Mengunjungi kampus ITS Surabaya dan Universitas Brawijaya Malang untuk riset tata kelola organisasi kemahasiswaan berprestasi.",
      category: "Kepemimpinan & Organisasi",
      image: "/sbppkm.jpeg",
      badge: "Studi Banding"
    },
    {
      title: "Sertifikasi Wirausaha Sandination",
      subtitle: "Makassar Community (2023)",
      description: "Mengikuti mentorship bisnis eksklusif dari program Sandination untuk pengembangan kepemimpinan dan jejaring wirausaha nasional.",
      category: "Pendidikan & Pengabdian",
      image: "/sandination.jpg",
      badge: "Sandination"
    },
    {
      title: "Master of Ceremony (MC) Profesional",
      subtitle: "Berbagai Event Formal & Non-Formal",
      description: "Memandu puluhan kegiatan tingkat universitas, seminar daerah, dan upacara keprotokoleran dengan keahlian komunikasi publik yang matang.",
      category: "Kepemimpinan & Organisasi",
      image: "/MC.jpg",
      badge: "Public Speaking"
    },
    {
      title: "Administrasi Bantuan Pangan (Banpang)",
      subtitle: "PERUM BULOG (Badan Urusan Logistik)",
      description: "Bertanggung jawab atas pengelolaan dokumen administrasi dan pencatatan data penyaluran program Bantuan Pangan (Banpang) masyarakat secara digital, serta berkoordinasi dengan tim logistik untuk efisiensi distribusi.",
      category: "Kepemimpinan & Organisasi",
      image: "/banpang.jpeg",
      badge: "Administrasi"
    }
  ];

  // Dicoding Certificates Data
  const dicodingCerts = [
    {
      title: "Belajar Dasar Pemrograman Python",
      issuer: "Dicoding Indonesia",
      date: "Juni 2026",
      pdf: "/certs/sertifikat_pemrograman_python.pdf",
      icon: Code,
      color: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30"
    },
    {
      title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
      issuer: "Dicoding Indonesia",
      date: "Juni 2026",
      pdf: "/certs/sertifikat_backend_pemula.pdf",
      icon: Terminal,
      color: "from-green-500/20 to-emerald-500/10 text-emerald-400 border-emerald-500/30"
    },
    {
      title: "Prompt Engineering untuk Software Developer",
      issuer: "Dicoding Indonesia",
      date: "Juni 2026",
      pdf: "/certs/sertifikat_prompt_engineering.pdf",
      icon: Terminal,
      color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30"
    },
    {
      title: "Belajar Dasar Google Cloud",
      issuer: "Dicoding Indonesia",
      date: "Juni 2026",
      pdf: "/certs/sertifikat_dasar_google_cloud.pdf",
      icon: Globe,
      color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30"
    },
    {
      title: "Menjadi Google Cloud Associate (Pembuatan Aplikasi)",
      issuer: "Dicoding Indonesia",
      date: "Juni 2026",
      pdf: "/certs/sertifikat_aplikasi_google_cloud.pdf",
      icon: Layers,
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30"
    },
    {
      title: "Belajar Dasar Manajemen Proyek",
      issuer: "Dicoding Indonesia",
      date: "Juni 2026",
      pdf: "/certs/sertifikat_manajemen_proyek.pdf",
      icon: BookOpen,
      color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30"
    },
    {
      title: "Pengenalan ke Kecerdasan Buatan (AI)",
      issuer: "Dicoding Indonesia",
      date: "Juni 2026",
      pdf: "/certs/sertifikat_ai.pdf",
      icon: Award,
      color: "from-violet-500/20 to-purple-500/10 text-violet-400 border-violet-500/30"
    },
    {
      title: "Belajar Dasar Data Science",
      issuer: "Dicoding Indonesia",
      date: "Juni 2026",
      pdf: "/certs/sertifikat_data_science.pdf",
      icon: Layers,
      color: "from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30"
    }
  ];

  // Filtering Logic
  const filteredProjects = activeTab === 'Semua' 
    ? projectsData 
    : projectsData.filter(item => item.category === activeTab);

  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#030303] text-gray-100 font-sans overflow-x-hidden">
      {/* Starfield Particles */}
      <ParticleBackground />

      {/* Background Glowing Orbs Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="glowing-bg-indigo top-[10%] left-0 -translate-x-1/2 animate-pulse-slow"></div>
        <div className="glowing-bg-cyan top-[60%] right-0 translate-x-1/2 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 px-3 md:px-8 py-3 md:py-4">
        <div className="max-w-7xl mx-auto glass-panel rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-2xl border-white/5">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-sm md:text-lg text-white shadow-lg shadow-indigo-500/20 font-display">
              LH
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-base md:text-lg tracking-wide text-white">Lukman Hakim</span>
              <span className="block text-[9px] md:text-[10px] text-indigo-400 font-medium font-display leading-none mt-0.5">SYSTEM INFORMATION</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button onClick={() => handleScrollToSection('about')} className="text-gray-300 hover:text-white transition font-medium text-sm">Tentang</button>
            <button onClick={() => handleScrollToSection('showcase')} className="text-gray-300 hover:text-white transition font-medium text-sm">Galeri 3D</button>
            <button onClick={() => handleScrollToSection('achievements')} className="text-gray-300 hover:text-white transition font-medium text-sm">Prestasi</button>
            <button onClick={() => handleScrollToSection('projects')} className="text-gray-300 hover:text-white transition font-medium text-sm">Proyek</button>
            <button onClick={() => handleScrollToSection('contact')} className="text-gray-300 hover:text-white transition font-medium text-sm">Kontak</button>
          </div>

          {/* Contact Button */}
          <div className="hidden lg:block">
            <Magnetic strength={0.2}>
              <button 
                onClick={() => handleScrollToSection('contact')}
                className="bg-indigo-600/90 text-white font-medium text-sm px-4 py-2 rounded-xl border border-indigo-500/30 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-500/30 transition-all duration-300 cursor-pointer"
              >
                Hubungi Saya
              </button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 glass-panel rounded-2xl px-6 py-4 shadow-2xl border-white/5 flex flex-col gap-1 animate-fade-in-down">
            <button onClick={() => handleScrollToSection('about')} className="text-left py-3 text-gray-300 hover:text-white transition font-medium text-sm border-b border-white/5">Tentang Saya</button>
            <button onClick={() => handleScrollToSection('showcase')} className="text-left py-3 text-gray-300 hover:text-white transition font-medium text-sm border-b border-white/5">Galeri 3D</button>
            <button onClick={() => handleScrollToSection('achievements')} className="text-left py-3 text-gray-300 hover:text-white transition font-medium text-sm border-b border-white/5">Prestasi</button>
            <button onClick={() => handleScrollToSection('projects')} className="text-left py-3 text-gray-300 hover:text-white transition font-medium text-sm border-b border-white/5">Proyek & Pengalaman</button>
            <button onClick={() => handleScrollToSection('contact')} className="text-left py-3 text-indigo-400 hover:text-indigo-300 transition font-bold text-sm">Hubungi Saya</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden px-4">
        <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center w-full">
          {/* Avatar Container */}
          <div className="relative mb-6 md:mb-8 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 blur-md opacity-75 group-hover:scale-105 transition-all duration-500"></div>
            <img 
              src="/Foto Lukman Hakim.png" 
              alt="Foto Lukman Hakim" 
              className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full border-4 border-slate-900 object-cover shadow-2xl z-10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* IPK Badge */}
            <span className="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[10px] md:text-xs font-bold font-display px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg border border-slate-900/60 z-20">
              GPA 3.97
            </span>
          </div>

          {/* Heading with Decrypted Text */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-3 md:mb-4 tracking-tight leading-tight select-none px-2">
            <span className="block text-gray-300 text-lg sm:text-xl md:text-3xl font-normal font-sans mb-1 md:mb-2">Halo, Saya</span>
            <DecryptedText 
              text="Lukman Hakim" 
              speed={60}
              delay={400}
              className="gradient-text-indigo-cyan font-bold"
              encryptedClassName="text-indigo-600/70"
            />
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 font-medium max-w-2xl mb-3 md:mb-4 leading-relaxed px-4">
            Mahasiswa Sistem Informasi &amp; Web Developer
          </p>

          {/* Location */}
          <div className="flex items-start gap-2 text-gray-500 text-[11px] sm:text-xs md:text-sm mb-8 md:mb-10 max-w-xs sm:max-w-sm md:max-w-md px-2 text-center justify-center">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug text-center">Institut Teknologi Bacharuddin Jusuf Habibie (ITBH), Pinrang, Sulsel</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center w-full max-w-sm sm:max-w-none px-4">
            <button 
              onClick={() => handleScrollToSection('projects')}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-xl hover:from-indigo-500 hover:to-indigo-600 transition-all duration-300 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/40 text-sm md:text-base flex items-center justify-center gap-2 cursor-pointer"
            >
              Lihat Proyek <ChevronRight className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => handleScrollToSection('contact')}
              className="w-full sm:w-auto bg-slate-900/80 hover:bg-slate-800 text-gray-300 hover:text-white font-semibold px-6 md:px-8 py-3 md:py-3.5 rounded-xl border border-white/5 transition-all duration-300 text-sm md:text-base cursor-pointer"
            >
              Kontak Saya
            </button>
          </div>
        </div>
      </section>

      {/* Showcase Section (Circular Gallery) */}
      <section id="showcase" className="py-14 md:py-24 relative overflow-hidden bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 text-center z-10 relative">
          <div className="mb-8 md:mb-12">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-indigo-400 font-display uppercase block mb-2 md:mb-3">GALLERY INTERAKTIF</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold font-sans">
              <DecryptedText 
                text="Highlight Pencapaian" 
                speed={50}
                delay={200}
                sequential={true}
                className="text-white"
              />
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mt-3 md:mt-4 text-xs md:text-base px-2">
              Geser atau swipe untuk menjelajahi dokumentasi 3D kegiatan utama saya.
            </p>
          </div>

          {/* CircularGallery Wrapper */}
          <div className="canvas-wrapper relative w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[550px] bg-indigo-950/5 rounded-2xl md:rounded-3xl border border-white/5 overflow-hidden">
            <CircularGallery
              items={galleryItems}
              bend={3}
              textColor="#ffffff"
              borderRadius={0.06}
              scrollEase={0.03}
              fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap"
              font="bold 22px Outfit"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-14 md:py-24 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Image/Tags */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-4 md:p-6 rounded-2xl md:rounded-3xl relative overflow-hidden group border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <img 
                src="/Foto Lukman Hakim.png" 
                alt="Tentang Lukman" 
                className="w-full h-56 sm:h-72 md:h-80 object-cover rounded-xl md:rounded-2xl shadow-lg border border-white/5 group-hover:scale-[1.01] transition-transform duration-700" 
              />
              
              {/* Badge Overlay */}
              <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
                <span className="bg-indigo-500/10 text-indigo-300 text-[10px] md:text-xs font-semibold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-indigo-500/20">
                  ⚡ IPK 3.97 / 4.00
                </span>
                <span className="bg-cyan-500/10 text-cyan-300 text-[10px] md:text-xs font-semibold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-cyan-500/20">
                  👑 Duta Kampus Sulsel
                </span>
                <span className="bg-purple-500/10 text-purple-300 text-[10px] md:text-xs font-semibold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-purple-500/20">
                  👥 Organisasi Aktif
                </span>
                <span className="bg-emerald-500/10 text-emerald-300 text-[10px] md:text-xs font-semibold px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-emerald-500/20">
                  🛡️ Satgas PPKS
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio */}
          <div className="lg:col-span-7 flex flex-col gap-5 md:gap-6">
            <div>
              <span className="text-[10px] md:text-xs font-bold tracking-widest text-indigo-400 font-display uppercase block mb-2 md:mb-3">TENTANG SAYA</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Mengejar Akademik &amp; Dedikasi Organisasi
              </h2>
            </div>
            
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
              Saya adalah mahasiswa S1 Sistem Informasi di <strong>Institut Teknologi Bacharuddin Jusuf Habibie</strong> yang berkomitmen tinggi untuk mencapai keunggulan akademik, terbukti dengan perolehan <strong>IPK 3.97</strong>.
            </p>
            
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
              Selain fokus di bidang teknologi dan analisis sistem, saya mendedikasikan diri dalam kepemimpinan mahasiswa dan pengabdian masyarakat. Sebagai <strong>Duta Kampus Intelegensia Sulawesi Selatan 2023</strong>, saya aktif mempromosikan kemajuan pendidikan dan berkontribusi dalam perlindungan mahasiswa melalui Satgas PPKS.
            </p>

            {/* Motto Quote Card */}
            <div className="relative border-l-4 border-indigo-500 bg-slate-900/40 backdrop-blur-md p-4 md:p-5 rounded-r-2xl border-y border-r border-white/5">
              <p className="italic text-indigo-300 font-medium text-sm md:text-base">
                "Dedikasi untuk pendidikan dan pengembangan diri adalah kunci masa depan."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-14 md:py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-indigo-400 font-display uppercase block mb-2 md:mb-3">REKAM PRESTASI</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            Pencapaian Nasional &amp; Daerah
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {achievements.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <SpotlightCard key={index} className="p-5 md:p-8">
                <div className="flex gap-4 md:gap-5 items-start">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-tr ${item.accent} flex items-center justify-center text-slate-950 flex-shrink-0 shadow-lg`}>
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm md:text-lg lg:text-xl text-white mb-1.5 md:mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs md:text-sm lg:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-14 md:py-24 px-4 bg-slate-950/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-[10px] md:text-xs font-bold tracking-widest text-indigo-400 font-display uppercase block mb-2 md:mb-3">DOKUMENTASI KARYA</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 md:mb-8">
              Proyek &amp; Pengalaman
            </h2>

            {/* Filter Tabs - scrollable on mobile */}
            <div className="flex overflow-x-auto pb-2 md:overflow-visible md:flex-wrap justify-start md:justify-center gap-2 max-w-3xl mx-auto bg-slate-900/60 p-2 rounded-xl md:rounded-2xl border border-white/5 backdrop-blur-md scrollbar-hide">
              {['Semua', 'Teknologi & Dev', 'Pendidikan & Pengabdian', 'Kepemimpinan & Organisasi'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl font-medium text-xs transition-all duration-300 cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((item, index) => (
              <SpotlightCard key={index} className="flex flex-col h-full">
                {/* Project Image */}
                <div className="relative h-40 md:h-48 overflow-hidden rounded-t-2xl group/img">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  {/* Category Badge */}
                  <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-[9px] md:text-[10px] font-bold font-display px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-indigo-300 border border-white/5">
                    {item.badge}
                  </span>
                </div>

                {/* Project Details */}
                <div className="p-4 md:p-6 flex flex-col flex-grow">
                  <span className="text-[9px] md:text-[10px] font-semibold text-indigo-400 uppercase tracking-widest font-display block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-sm md:text-lg text-white mb-1.5 md:mb-2 leading-snug hover:text-indigo-300 transition duration-300">
                    {item.title}
                  </h3>
                  <p className="text-indigo-200/50 text-[11px] md:text-xs font-medium mb-2 md:mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Dicoding Certificates Section */}
      <section id="certificates" className="py-14 md:py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-indigo-400 font-display uppercase block mb-2 md:mb-3">SERTIFIKASI ACADEMY</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
            Dicoding Certificates
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-3 md:mt-4 text-xs md:text-base px-2">
            Sertifikasi kompetensi resmi yang diterbitkan oleh Dicoding Indonesia sebagai Google Developers Authorized Training Partner.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {dicodingCerts.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <SpotlightCard key={index} className="p-5 md:p-6 flex flex-col h-full justify-between">
                <div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cert.color} flex items-center justify-center mb-4 border shadow-sm`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm md:text-base text-white mb-2 leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-gray-500 text-[11px] md:text-xs font-medium mb-1">
                    Penerbit: {cert.issuer}
                  </p>
                  <p className="text-gray-500 text-[11px] md:text-xs">
                    Diperoleh: {cert.date}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <a 
                    href={cert.pdf} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition duration-300"
                  >
                    Lihat Sertifikat (PDF) <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-14 md:py-24 px-4 max-w-4xl mx-auto">
        <div className="glass-panel p-6 sm:p-10 md:p-16 rounded-2xl md:rounded-3xl border-white/5 shadow-2xl relative overflow-hidden text-center">
          {/* Accent lighting inside panel */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none"></div>

          <span className="text-[10px] md:text-xs font-bold tracking-widest text-indigo-400 font-display uppercase block mb-2 md:mb-3">HUBUNGI SAYA</span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Mari Berkolaborasi!
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8 md:mb-12 text-xs sm:text-sm md:text-base px-2">
            Saya sangat antusias untuk berdiskusi tentang peluang magang, proyek web development, kegiatan organisasi, atau kolaborasi kepemudaan.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
            {/* Email */}
            <Magnetic strength={0.15} className="w-full">
              <a 
                href="mailto:lukman090603@gmail.com" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 bg-slate-900/60 hover:bg-slate-800 hover:border-indigo-500/40 p-4 rounded-2xl border border-white/5 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group justify-center w-full min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-[10px] text-gray-500 font-semibold font-display uppercase">Email</span>
                  <span className="block text-xs font-bold text-gray-200 group-hover:text-indigo-300 transition break-all">lukman090603@gmail.com</span>
                </div>
              </a>
            </Magnetic>

            {/* WhatsApp */}
            <Magnetic strength={0.15} className="w-full">
              <a 
                href="https://wa.me/6282296535929" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 bg-slate-900/60 hover:bg-slate-800 hover:border-emerald-500/40 p-4 rounded-2xl border border-white/5 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 group justify-center w-full min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-[10px] text-gray-500 font-semibold font-display uppercase">WhatsApp</span>
                  <span className="block text-xs font-bold text-gray-200 group-hover:text-emerald-400 transition">082296535929</span>
                </div>
              </a>
            </Magnetic>

            {/* LinkedIn */}
            <Magnetic strength={0.15} className="w-full">
              <a 
                href="https://www.linkedin.com/in/lukman-hakim09" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-3 bg-slate-900/60 hover:bg-slate-800 hover:border-blue-500/40 p-4 rounded-2xl border border-white/5 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group justify-center w-full min-w-0"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="text-left min-w-0">
                  <span className="block text-[10px] text-gray-500 font-semibold font-display uppercase">LinkedIn</span>
                  <span className="block text-xs font-bold text-gray-200 group-hover:text-blue-300 transition">lukman-hakim09</span>
                </div>
              </a>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 relative overflow-hidden bg-black/60">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-bold text-sm text-white font-display">LH</div>
              <span className="font-bold text-base text-white">Lukman Hakim</span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm">
              S1 Sistem Informasi - Institut Teknologi Bacharuddin Jusuf Habibie
            </p>
          </div>

          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Lukman Hakim. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 border border-indigo-500/20 transition-all duration-300 scale-100 hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 animate-bounce" />
        </button>
      )}
    </div>
  );
}
