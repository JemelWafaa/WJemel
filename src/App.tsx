import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { jsPDF } from "jspdf";
import {
  Mail,
  Linkedin,
  Download,
  Menu,
  X,
  Database,
  BarChart,
  FileSpreadsheet,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";

export default function App() {
  const navLinks = [
    { id: "profile", name: "Profil" },
    { id: "skills", name: "Compétences" },
    { id: "experience", name: "Expérience" },
    { id: "formation", name: "Formation" },
    { id: "contact", name: "Contact" },
  ];

  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleDownloadCV = () => {
    const doc = new jsPDF();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("WAFAA JEMEL", 20, 25);

    doc.setFontSize(14);
    doc.setTextColor(37, 99, 235); // Blue-600
    doc.text("BI Data Analyst | Power BI", 20, 35);

    doc.setDrawColor(200, 200, 200);
    doc.line(20, 40, 190, 40);

    // Contact
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text("Email: wafaa.jemel1805@gmail.com", 20, 50);
    doc.text("LinkedIn: linkedin.com/in/wafaa-jemel-316440142/", 20, 55);

    // Abstract
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("PROFIL PROFESSIONNEL", 20, 70);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const profilDesc =
      "Analyste de données spécialisée en informatique décisionnelle avec plus de 3 ans d'expérience sur Power BI, SQL et la modélisation décisionnelle. Expertise en transformation de données complexes en insights stratégiques.";
    const splitProfil = doc.splitTextToSize(profilDesc, 170);
    doc.text(splitProfil, 20, 80);

    // Skills
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("COMPÉTENCES", 20, 105);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(
      "- Bases de données: SQL Server, PostgreSQL, Modélisation (Star Schema)",
      25,
      115,
    );
    doc.text("- BI: Power BI (DAX, PowerQuery), Qlik Sense, SSRS", 25, 122);
    doc.text(
      "- Data Engineering: ETL (SSIS), DataWarehouse, Excel VBA",
      25,
      129,
    );

    // Experience
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("EXPÉRIENCE PROFESSIONNELLE", 20, 145);

    const experiences = [
      {
        title: "Consultant Télécom - Orange, Lyon",
        desc: "Conception d'un système décisionnel pour le suivi du trafic réseaux (ETL, SQL, Power BI).",
      },
      {
        title: "Data Analyst Transport - ONCF, Casablanca",
        desc: "Pilotage de performance via dashboards (Qlik Sense & SSRS) et supervision flux ETL.",
      },
      {
        title: "Consultant Data - Cdiscount, Maroc",
        desc: "Analyse e-commerce et mise en place de reportings décisionnels.",
      },
    ];

    let yPos = 155;
    experiences.forEach((exp) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(exp.title, 20, yPos);
      yPos += 7;
      doc.setFont("helvetica", "normal");
      const splitDesc = doc.splitTextToSize(exp.desc, 170);
      doc.text(splitDesc, 20, yPos);
      yPos += 15;
    });

    // Education
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("FORMATION", 20, 215);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(
      "Certification Power BI Data Analyst Associate (PL-300) - Microsoft",
      20,
      225,
    );
    doc.text(
      "Diplôme d'Ingénieur Informatique - EMSI Casablanca (Spécialité MIAGE)",
      20,
      232,
    );
    doc.text(
      "Technicien Spécialisé en Développement - ISTA Casablanca",
      20,
      239,
    );
    doc.text(
      "Baccalauréat Scientifique (Option SVT) - Lycée Abderrahmane Belkorchi",
      20,
      246,
    );

    doc.save("CV_Wafaa_Jemel.pdf");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startApp = () => {
    setShowSplash(false);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => console.log("Audio play failed:", err));
    }
  };

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => console.error("Audio play failed:", err));
    } else {
      audio.pause();
      setIsMusicPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <svg
          className="absolute top-[10%] -right-20 opacity-[0.03] text-blue-600"
          width="600"
          height="600"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="40" fill="currentColor" />
          <line
            x1="10"
            y1="50"
            x2="90"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="90"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </svg>
        <svg
          className="absolute bottom-[20%] -left-20 opacity-[0.05] text-slate-400 rotate-12"
          width="400"
          height="400"
          viewBox="0 0 100 100"
        >
          <path
            d="M0 50 Q25 20 50 50 T100 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M0 60 Q25 30 50 60 T100 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M0 70 Q25 40 50 70 T100 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Navigation Fixée */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex justify-between items-center text-slate-900">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-xl tracking-tighter"
          >
            Wafaa
            <span className="text-blue-600">
              <span> </span>JEMEL
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all relative py-2 ${
                  activeSection === link.id
                    ? "text-blue-600"
                    : "text-slate-400 hover:text-blue-600"
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-32">
        {/* Section: Profil */}
        <section id="profile" className="py-24 min-h-[70vh] flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-10"
          >
            <div className="w-40 h-40 md:w-48 md:h-48 shrink-0 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-100">
              <img
                src={`${import.meta.env.BASE_URL}WhatsApp Image 2026-05-03 at 17.33.10.jpeg`}
                alt="Wafaa Jemel"
                className="w-full h-full object-cover filter contrast-[1.05] brightness-[1.02] saturate-[1.1]"
                onError={(e) =>
                  ((e.target as HTMLImageElement).src =
                    "src/assetsgit init/wj-removebg-preview.png")
                }
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-black mb-2 text-slate-900 tracking-tighter">
                Wafaa JEMEL
              </h1>
              <p className="text-sm font-bold text-blue-600 mb-6 uppercase tracking-[0.3em]">
                BI Data Analyst | Power BI
              </p>
              <p className="text-slate-500 mb-8 leading-relaxed text-sm md:text-base max-w-lg mx-auto md:mx-0">
                Analyste de données spécialisée en informatique décisionnelle
                avec plus de 3 ans d'expérience sur Power BI, SQL et la
                modélisation décisionnelle.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <a
                  href="mailto:wafaa.jemel1805@gmail.com"
                  className="bg-slate-900 text-white px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2"
                >
                  <Mail size={14} /> Me contacter
                </a>
                <button
                  onClick={handleDownloadCV}
                  className="border border-slate-200 px-5 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download size={14} /> Télécharger CV
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section: Compétences */}
        <section id="skills" className="py-24 border-t border-slate-50">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-[2px] bg-blue-600"></div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
              Compétences
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Database,
                name: "Bases de données",
                desc: "SQL Server, PostgreSQL, Modélisation.",
              },
              {
                icon: BarChart,
                name: "BI & Visualization",
                desc: "Power BI (DAX, PowerQuery), Qlik Sense.",
              },
              {
                icon: FileSpreadsheet,
                name: "Data Engineering",
                desc: "ETL (SSIS), DataWarehouse, Excel VBA.",
              },
            ].map((skill) => (
              <div
                key={skill.name}
                className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center text-center"
              >
                <skill.icon className="text-blue-600 mb-6" size={32} />
                <h3 className="font-bold text-lg mb-3">{skill.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Section: Expérience */}
        <section id="experience" className="py-24 border-t border-slate-50">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-[2px] bg-blue-600"></div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
              Expérience Professionnelle
            </h2>
          </div>
          <div className="space-y-12">
            {[
              {
                title: "Consultant Télécom",
                company: "Orange, Lyon",
                desc: "Conception d’un système décisionnel pour le suivi du trafic réseaux. Flux ETL (extraction, nettoyage, transformation), SQL complexe et création de dashboards Power BI interactifs.",
              },
              {
                title: "Data Analyst Transport",
                company: "ONCF, Casablanca",
                desc: "Suivi d'activité et pilotage de performance. Conception de dashboards (Qlik Sense & SSRS) et supervision des flux ETL.",
              },
              {
                title: "Consultant Data / Full Stack",
                company: "Cdiscount, Maroc",
                desc: "Analyse e-commerce (trafic, conversion, ventes) et mise en place de reportings décisionnels pour le suivi de performance.",
              },
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-l-2 border-slate-50 pl-8 pb-4"
              >
                <h4 className="font-bold text-lg text-slate-900">
                  {exp.title}
                </h4>
                <p className="text-[11px] font-bold text-blue-600 uppercase mb-4 tracking-wider">
                  {exp.company}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-2xl">
                  {exp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section: Formation */}
        <section id="formation" className="py-24 border-t border-slate-50">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-8 h-[2px] bg-blue-600"></div>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">
              Diplômes et Formations
            </h2>
          </div>
          <div className="space-y-12">
            {[
              {
                title: "Certification Power BI Data Analyst Associate (PL-300)",
                school: "Microsoft",
                desc: "Validation des compétences en préparation, modélisation, visualisation et analyse des données avec Power BI.",
              },
              {
                title: "Diplôme d'Ingénieur Informatique",
                school: "EMSI Casablanca",
                desc: "Option MIAGE - Spécialisation en gestion de données et informatique décisionnelle.",
              },
              {
                title: "Diplôme de Technicien Spécialisé",
                school: "ISTA Casablanca",
                desc: "Développement Informatique.",
              },
              {
                title: "Baccalauréat Scientifique",
                school: "Lycée Abderrahmane Belkorchi",
                desc: "Option SVT.",
              },
            ].map((form, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="border-l-2 border-slate-50 pl-8 pb-4"
              >
                <h4 className="font-bold text-lg text-slate-900">
                  {form.title}
                </h4>
                <p className="text-[11px] font-bold text-blue-600 uppercase mb-4 tracking-wider">
                  {form.school}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {form.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section: Contact */}
        <section
          id="contact"
          className="py-24 border-t border-slate-50 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black mb-4">
              Discutons de vos projets.
            </h2>
            <p className="text-slate-500 mb-10 text-sm">
              "Passionnée par les données et toujours prête à relever de
              nouveaux défis. Échangeons sur vos futurs projets !"
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-12 font-bold text-xs uppercase tracking-widest text-slate-400">
              <a
                href="mailto:wafaa.jemel1805@gmail.com"
                className="flex items-center justify-center gap-2 text-slate-900 hover:text-blue-600 transition-colors"
              >
                <Mail size={16} /> Email Pro
              </a>
              <a
                href="https://www.linkedin.com/in/wafaa-jemel-316440142/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-slate-900 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 border-t border-slate-50 text-center bg-slate-50/50">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
          © 2026 Wafaa Jemel — BI Data Analyst
        </p>
      </footer>

      {/* Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center text-white px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-light mb-4 tracking-tighter">
              Wafaa Jemel
            </h1>
            <p className="text-blue-400 font-mono text-sm mb-12 uppercase tracking-widest">
              BI Data Analyst Portfolio
            </p>
            <button
              onClick={startApp}
              className="bg-white text-slate-900 px-12 py-4 rounded-full font-bold uppercase text-xs tracking-[0.3em] hover:bg-blue-500 hover:text-white transition-all duration-500 shadow-2xl ring-8 ring-white/10"
            >
              Entrer
            </button>
          </motion.div>
        </div>
      )}

      {/* Music Player */}
      <div className="fixed bottom-6 right-6 z-50">
        <audio
          ref={audioRef}
          src="https://www.mfiles.co.uk/mp3-downloads/debussy-clair-de-lune.mp3"
          loop
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="bg-white/80 backdrop-blur-md p-4 rounded-full shadow-2xl border border-slate-100 ring-4 ring-blue-50 hover:bg-white transition-all group"
          title={
            isMusicPlaying
              ? "Couper la musique"
              : "Jouer une musique d'ambiance (Piano)"
          }
        >
          {isMusicPlaying ? (
            <Volume2 size={24} className="text-blue-600 animate-pulse" />
          ) : (
            <VolumeX
              size={24}
              className="text-slate-400 group-hover:text-blue-600"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}
