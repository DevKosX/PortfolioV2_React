import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, ExternalLink, Code2, Terminal, Database, Cpu, 
  Globe, Calculator, Layers, Server, Gamepad2, Plane, Trophy, 
  Briefcase, Users, FileCode, Star, Mail, Send, Twitter, MapPin, Tv, HeartPulse
} from 'lucide-react';

const App = () => {
  
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("Langages");

  // --- DONNÉES STATS ---
  const stats = [
    { label: "Projets", value: "12+", icon: <Briefcase className="w-5 h-5 text-purple-400"/> },
    { label: "Clients", value: "5", icon: <Users className="w-5 h-5 text-cyan-400"/> },
    { label: "Années Exp.", value: "3", icon: <Star className="w-5 h-5 text-yellow-400"/> },
    { label: "Lignes de Code", value: "45k", icon: <FileCode className="w-5 h-5 text-green-400"/> },
  ];

  // --- DONNÉES PROGRESS BARS (Niveau global) ---
  const globalSkills = [
    { name: "React / Node.js", pct: 85, color: "bg-cyan-500" },
    { name: "Java (Software)", pct: 80, color: "bg-orange-500" },
    { name: "PHP / Laravel", pct: 75, color: "bg-purple-500" },
    { name: "Python", pct: 70, color: "bg-yellow-500" },
    { name: "Flutter (Mobile)", pct: 60, color: "bg-blue-400" }, 
  ];

  // --- DONNÉES COMPÉTENCES DÉTAILLÉES (Onglets) ---
  const skillsCategories = {
    "Langages": [
      "PHP", "Java", "SQL", "JavaScript", "Dart (Flutter)", "Python", "C++", "Bash", "TypeScript"
    ],
    "Web": [
      "HTML", "CSS", "AJAX", "Blade", "Bootstrap", "JSON/XML", "API REST", "JWT"
    ],
    "Bases de données": [
      "MySQL", "PostgreSQL", "phpMyAdmin", "MongoDB", "Redis", "SQLite"
    ],
    "Frameworks & Serveurs": [
      "Laravel", "Spring Boot", "Flask", "Apache Tomcat", "Nginx", "Maven"
    ],
    "DevOps & Versioning": [
      "Git", "GitLab", "GitHub", "Jenkins", "Docker", "Vagrant", "Linux"
    ],
    "Méthodologies": [
      "SOLID", "Clean Code", "Jira", "Scrum", "Kanban", "TDD", "Code Review"
    ]
  };

  // --- DONNÉES PROJETS ---
  const projects = [
    {
      id: 1,
      title: "Frigo Recette",
      desc: "Application intelligente qui génère des recettes basées sur le contenu de votre frigo.",
      tags: ["Full Stack", "Dart", "Flutter"],
      image: "/images/frigo.jpg",
      link: "#",
      icon: <Database className="w-10 h-10 text-cyan-400" />
    },
    {
      id: 2,
      title: "Find My Word",
      desc: "Jeu interactif de devinette de mots en temps réel.",
      tags: ["Full Stack", "Java", "Test Unitaires"],
      image: "/images/findmyword.jpg",
      link: "#",
      icon: <Terminal className="w-10 h-10 text-purple-400" />
    },
    {
      id: 3,
      title: "Portfolio de ma Sœur",
      desc: "Site vitrine moderne et esthétique pour présenter un parcours professionnel.",
      tags: ["Frontend", "JavaScript", "Design"],
      image: "/images/portfolio-soeur.jpg",
      link: "#",
      icon: <Globe className="w-10 h-10 text-pink-400" />
    },
    {
      id: 4,
      title: "France Academy",
      desc: "Plateforme de gestion des formations et utilisateurs pour un organisme fictif.",
      tags: ["Full Stack", "Laravel", "PHP"],
      image: "/images/france-academy.png",
      link: "#",
      icon: <Globe className="w-10 h-10 text-blue-400" />
    },
    {
      id: 5,
      title: "Stagelys",
      desc: "Application web de gestion des stages pour étudiants et professeurs.",
      tags: ["Full Stack", "ERP", "PHP"],
      image: "/images/stagelys.png",
      link: "#",
      icon: <Database className="w-10 h-10 text-green-400" />
    },
    {
      id: 6,
      title: "World Cup Strike 2025",
      desc: "Jeu complet de tirs aux buts conçu en Java (phase de test).",
      tags: ["Software", "Java", "Game"],
      image: "/images/world-cup.jpg",
      link: "#",
      icon: <Cpu className="w-10 h-10 text-orange-400" />
    },
    {
      id: 7,
      title: "Calculatrice Objet",
      desc: "Une calculatrice simple et intuitive développée en Java (POO).",
      tags: ["Java", "POO", "UML"],
      image: "/images/calculatrice.png",
      link: "#",
      icon: <Calculator className="w-10 h-10 text-yellow-400" />
    },
    {
      id: 8,
      title: "Jeu du Fakir Objet",
      desc: "Projet développé lors des 24H de l'Info à Villetaneuse.",
      tags: ["Java", "Hackathon", "Game"],
      image: "/images/fakir.jpg",
      link: "#",
      icon: <Code2 className="w-10 h-10 text-red-400" />
    },
    {
      id: 9,
      title: "Recueil de Besoin",
      desc: "Analyse des besoins pour un observatoire astronomique local.",
      tags: ["Analyse", "UML", "Documentation"],
      image: "/images/recueil-besoin.jpg",
      link: "#",
      icon: <Terminal className="w-10 h-10 text-gray-400" />
    },
    {
      id: 10,
      title: "Bootage Disque Dur",
      desc: "Configuration Raspberry PI : boot sur disque externe et droits d'écriture.",
      tags: ["Hardware", "Linux", "Raspberry Pi"],
      image: "/images/raspberry-boot.jpg",
      link: "#",
      icon: <Cpu className="w-10 h-10 text-green-600" />
    },
    {
      id: 11,
      title: "Base de Données Freedom",
      desc: "Base de données Postgres SQL complexe avec modélisation Merise.",
      tags: ["Backend", "SQL", "Postgres"],
      image: "/images/database-freedom.jpg",
      link: "#",
      icon: <Database className="w-10 h-10 text-blue-600" />
    },
    {
      id: 12,
      title: "Santa Claus Python",
      desc: "Algorithme Python pour optimiser les courses du Père Noël en France.",
      tags: ["Python", "Algo", "Logique"],
      image: "/images/santa-claus.jpg",
      link: "#",
      icon: <Code2 className="w-10 h-10 text-yellow-300" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            MK.DEV
          </h1>
          <div className="hidden md:flex space-x-6 text-xs md:text-sm font-medium text-gray-300">
            <a href="#accueil" className="hover:text-cyan-400 transition-colors">Accueil</a>
            <a href="#dashboard" className="hover:text-cyan-400 transition-colors">Expériences</a>
            <a href="#projets" className="hover:text-cyan-400 transition-colors">Projets</a>
            <a href="#stack" className="hover:text-cyan-400 transition-colors">Stack</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">À Propos</a>
            <a href="#passions" className="hover:text-cyan-400 transition-colors">Passions</a>
          </div>
          <a href="#contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 rounded-full font-bold text-sm shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform hidden md:block">
            Contact
          </a>
        </div>
      </nav>

      {/* --- 1. HERO SECTION --- */}
      <section id="accueil" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cyan-400 font-medium mb-4 tracking-wide">Salut, je suis</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Mohamed <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                Kosbar
              </span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
              Développeur Full-Stack <span className="text-white font-semibold">New Gen</span>.
              Je crée des expériences numériques modernes, performantes et bien pensées.
            </p>
            
            <div className="flex gap-4">
              <a href="#projets" className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
                Voir mes projets
              </a>
              <div className="flex gap-4 items-center px-4">
                <a href="https://github.com/DevKosX" target="_blank" rel="noopener noreferrer">
                  <Github className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/mohamed-kosbar-5a57972ba/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full border border-white/10 backdrop-blur-3xl flex items-center justify-center shadow-2xl shadow-purple-500/10 animate-[spin_10s_linear_infinite]">
              <div className="w-2/3 h-2/3 bg-black/40 rounded-full flex items-center justify-center border border-white/5">
                <Code2 className="w-20 h-20 text-cyan-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. DASHBOARD: EXPÉRIENCES --- */}
      <section id="dashboard" className="py-24 bg-[#080808] relative overflow-hidden">
         <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />

         <div className="max-w-6xl mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Parcours & <span className="text-cyan-400">Chiffres</span></h2>
             <p className="text-gray-400">Mon évolution professionnelle.</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             
             {/* GAUCHE: TIMELINE */}
             <div>
               <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                 <Briefcase className="w-6 h-6 text-purple-400" /> Parcours Professionnel
               </h3>
               
               <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
                 
                 {/* Item 1 */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#111] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Code2 className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111] p-4 rounded-xl border border-white/5 shadow-lg">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-white">Développeur Full-Stack</div>
                        <time className="font-caveat font-medium text-cyan-400 text-sm">2022 - Présent</time>
                      </div>
                      <div className="text-gray-400 text-sm">3 ans d'expérience cumulée (académique & projets).</div>
                    </div>
                 </div>

                 {/* Item 2 */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#111] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Briefcase className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111] p-4 rounded-xl border border-white/5 shadow-lg">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-white">Stage Web - Devea</div>
                        <time className="font-medium text-gray-500 text-sm">8 Semaines</time>
                      </div>
                      <div className="text-gray-400 text-sm">Développement web et maintenance.</div>
                    </div>
                 </div>

                 {/* Item 3 */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#111] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Users className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111] p-4 rounded-xl border border-white/5 shadow-lg">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-white">Bénévole 24H de l'Info</div>
                        <time className="font-medium text-gray-500 text-sm">1 mois</time>
                      </div>
                      <div className="text-gray-400 text-sm">Organisation événementielle.</div>
                    </div>
                 </div>

                 {/* Item 4 */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-[#111] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111] p-4 rounded-xl border border-white/5 shadow-lg">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-white">Stage - OFW Ships</div>
                        <time className="font-medium text-gray-500 text-sm">2 Semaines</time>
                      </div>
                      <div className="text-gray-400 text-sm">Découverte IT en entreprise.</div>
                    </div>
                 </div>

               </div>
             </div>

             {/* DROITE: STATS GRID */}
             <div className="grid grid-cols-2 gap-4 h-full content-center">
                 {stats.map((stat, idx) => (
                   <motion.div 
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-[#111] border border-white/5 p-8 rounded-2xl flex flex-col items-center justify-center text-center hover:border-cyan-500/30 transition-colors aspect-square"
                   >
                     <div className="mb-4 p-4 bg-white/5 rounded-full">{stat.icon}</div>
                     <h4 className="text-3xl font-bold text-white mb-2">{stat.value}</h4>
                     <p className="text-gray-500">{stat.label}</p>
                   </motion.div>
                 ))}
             </div>

           </div>
         </div>
      </section>

      {/* --- 3. PROJETS SECTION --- */}
      <section id="projets" className="py-24 bg-black/50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Mes <span className="text-purple-500">Projets</span></h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Une sélection de mes travaux scolaires et personnels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((item) => (
              <div key={item.id} className="group bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all hover:-translate-y-2 duration-300">
                <div className="h-48 overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                   <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='flex';}} 
                   />
                   <div className="absolute inset-0 hidden items-center justify-center -z-10 bg-gray-900">
                      {item.icon}
                   </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, index) => (
                       <span key={index} className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                         {tag}
                       </span>
                    ))}
                  </div>
                  <a href={item.link} className="inline-flex items-center text-sm font-bold text-cyan-400 hover:text-cyan-300 gap-2">
                    Voir les détails <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 4. SECTION STACK TECHNIQUE (Global + Onglets) --- */}
      <section id="stack" className="py-24 bg-[#050505]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Stack <span className="text-cyan-400">Technique</span></h2>

          {/* 1. Barres de Progression (Vue Globale) */}
          <div className="max-w-3xl mx-auto mb-16 space-y-6 bg-[#0a0a0a] p-8 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> Niveaux de Maîtrise
            </h3>
            {globalSkills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-gray-500 font-bold">{skill.pct}%</span>
                </div>
                <div className="h-2 w-full bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.pct}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${skill.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 2. Onglets Détaillés */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(skillsCategories).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all ${
                  activeTab === cat 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20 scale-105' 
                    : 'bg-[#111] text-gray-400 border border-white/10 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grille de contenu Onglets */}
          <motion.div 
            key={activeTab} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
          >
            {skillsCategories[activeTab].map((skill, index) => (
              <div key={index} className="bg-[#111] border border-white/5 p-4 rounded-xl flex items-center justify-center text-center hover:border-cyan-500/30 transition-colors group">
                 <span className="font-medium text-gray-300 group-hover:text-white transition-colors">{skill}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* --- 5. À PROPOS (QUI SUIS-JE ?) --- */}
      <section id="about" className="min-h-screen flex items-center py-24 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Qui <span className="text-cyan-400">suis-je ?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
             
             {/* IMAGE DE PROFIL RONDE */}
             <div className="order-2 md:order-1 flex justify-center md:justify-start">
                <div className="relative w-48 h-48 rounded-full border-4 border-[#1a1a1a] shadow-2xl overflow-hidden">
                    <img 
                      src="/images/profil.png" 
                      alt="Mohamed Kosbar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display='none';
                        e.target.parentNode.style.backgroundColor='#222';
                      }}
                    />
                </div>
             </div>

             <div className="order-1 md:order-2 space-y-6 text-gray-300 leading-relaxed text-lg text-justify">
              <p>
                <span className="text-white font-bold text-xl">Étudiant en 3ème année de BUT Informatique</span>, je suis un développeur passionné en pleine ascension. Ces trois années académiques ont été une véritable transformation.
              </p>
              <p>
                Mon cursus m'a permis de bâtir des fondations solides : logique de programmation en <span className="text-white font-bold">Java</span>, développement web avancé avec <span className="text-white font-bold">PHP/Laravel</span> et <span className="text-white font-bold">React</span>, et gestion de bases de données <span className="text-white font-bold">PostgreSQL</span>. J'ai appris à travailler en équipe agile, à utiliser <span className="text-white font-bold">Git</span> au quotidien.
              </p>
              <p>
                Aujourd'hui opérationnel et polyvalent, je suis activement à la recherche d'un <span className="text-white font-bold">stage de 3 semaines</span> pour valider mon année.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. PASSIONS (NOUVEAU - GRANDE BIOGRAPHIE) --- */}
      <section id="passions" className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Mes <span className="text-purple-500">Passions</span> & Inspirations</h2>

          {/* VOYAGES */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Plane className="w-6 h-6 text-cyan-400" /> Évasion & Racines
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Carte EGYPTE */}
              <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all group">
                 <div className="h-64 overflow-hidden relative">
                    <img src="/images/passions/jardin.jpg" alt="Palais Montazah" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" onError={(e) => e.target.style.display='none'} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <h4 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Égypte, Terre des Pharaons</h4>
                 </div>
                 <div className="p-6 space-y-4 text-gray-400">
                    <p>
                      C'est là que je me ressource. J'aime flâner dans les jardins du <span className="text-white font-bold">Palais de Montazah</span> à Alexandrie, ancienne résidence d'été des rois, un joyau architectural face à la Méditerranée.
                    </p>
                    <p>
                      Je suis fasciné par l'immensité des <span className="text-white font-bold">Pyramides de Gizeh</span>, témoins éternels de l'histoire, et par la beauté paradisiaque des plages d'<span className="text-white font-bold">Hurghada</span> sur la Mer Rouge.
                    </p>
                 </div>
              </div>

              {/* Carte MAROC */}
              <div className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all group">
                 <div className="h-64 overflow-hidden relative">
                    <img src="/images/passions/hassan2.jpg" alt="Mosquée Hassan II" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" onError={(e) => e.target.style.display='none'} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <h4 className="absolute bottom-4 left-4 text-2xl font-bold text-white">Maroc, Entre Tradition et Modernité</h4>
                 </div>
                 <div className="p-6 space-y-4 text-gray-400">
                    <p>
                      Le Maroc est mon autre ancrage. J'aime la beauté brute de <span className="text-white font-bold">Nador</span> et l'effervescence de la place <span className="text-white font-bold">Jamaa el-Fna</span> à Marrakech.
                    </p>
                    <p>
                      L'architecture grandiose de la <span className="text-white font-bold">Mosquée Hassan II</span> à Casablanca me rappelle toujours que la grandeur réside dans les détails et la persévérance, des valeurs que j'applique dans mon code.
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* SÉRIES & FOOTBALL (Grid asymétrique) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* FOOTBALL - Grande Carte (2 colonnes) */}
            <div className="md:col-span-2 bg-[#111] border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-green-500/30 transition-all">
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy className="w-48 h-48 text-green-500" />
               </div>
               <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                 <HeartPulse className="w-6 h-6 text-green-500" /> Le Football, une école de vie
               </h3>
               <div className="space-y-4 text-gray-300 relative z-10 leading-relaxed">
                 <p>
                   Le football est bien plus qu'un sport pour moi. J'ai eu la chance d'atteindre un excellent niveau en évoluant en <span className="text-white font-bold">U17 Nationaux avec Aubervilliers (Génération 2005)</span>. C'était l'école de la rigueur, de la tactique et du dépassement de soi.
                 </p>
                 <p>
                   Malheureusement, une blessure (la maladie d'Osgood-Schlatter) a freiné cette ascension. Mais cette épreuve m'a appris la résilience. J'ai transféré cette compétitivité et cette soif d'apprendre dans mes études et le développement informatique. Aujourd'hui, je code avec la même intensité que je jouais sur le terrain.
                 </p>
               </div>
            </div>

            {/* SÉRIES - Colonne droite */}
            <div className="bg-[#111] border border-white/5 rounded-2xl p-8 flex flex-col justify-center hover:border-red-500/30 transition-all">
               <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                 <Tv className="w-6 h-6 text-red-500" /> Cinéphile
               </h3>
               <div className="space-y-6">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                       <img src="/images/passions/st.jpg" alt="Stranger Things" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold group-hover:text-red-500 transition-colors">Stranger Things</h4>
                      <p className="text-xs text-gray-500">Mystère & Années 80</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                       <img src="/images/passions/echo.webp" alt="Echoes of the Past" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold group-hover:text-yellow-500 transition-colors">Echoes of the Past</h4>
                      <p className="text-xs text-gray-500">Drame Égyptien</p>
                    </div>
                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 7. CONTACT SECTION --- */}
      <section id="contact" className="py-24 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Me <span className="text-cyan-400">Contacter</span></h2>
          <p className="text-gray-400 mb-12">
            Un projet en tête ou simplement envie d'échanger ? N'hésitez pas à me contacter via email ou sur mes réseaux.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Email Card */}
            <a href="mailto:ton.email@exemple.com" className="bg-[#111] border border-white/5 p-8 rounded-2xl flex flex-col items-center hover:border-cyan-500/50 transition-all group">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Email</h3>
              <p className="text-gray-400">mohamed.kosbar@exemple.com</p>
            </a>

            {/* Twitter/X Card */}
            <a href="https://twitter.com/DevKosX" target="_blank" rel="noreferrer" className="bg-[#111] border border-white/5 p-8 rounded-2xl flex flex-col items-center hover:border-purple-500/50 transition-all group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Twitter className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Twitter / X</h3>
              <p className="text-gray-400">@DevKosX</p>
            </a>

          </div>

          <form className="mt-16 text-left max-w-2xl mx-auto space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Nom" className="bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors w-full" />
              <input type="email" placeholder="Email" className="bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors w-full" />
            </div>
            <textarea rows="5" placeholder="Votre message..." className="bg-[#111] border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-500 transition-colors w-full"></textarea>
            <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-3 rounded-lg font-bold text-white shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
              Envoyer <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </section>

      <footer className="py-8 border-t border-white/5 text-center text-gray-600 text-sm bg-black">
        <p>© 2025 Mohamed Kosbar. Tous droits réservés.</p>
        <p className="text-xs mt-1 text-gray-800">Code source protégé par le droit d'auteur.</p>
      </footer>
    </div>
  );
};

export default App;