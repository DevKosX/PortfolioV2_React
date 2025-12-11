import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  Github, Linkedin, ExternalLink, Code2, Terminal, Database, Cpu, 
  Globe, Calculator, Layers, Server, Gamepad2, Plane, Trophy, 
  Briefcase, Users, FileCode, Star, Mail, Send, Twitter, MapPin, 
  Tv, HeartPulse, Phone, MessageSquare, Menu, X, GitCommit, Sun, Moon,
  Play, Minus, Square, CheckCircle2, ArrowRight, Lock, Smartphone, Waves,
  Clock, Wifi, ShieldCheck, Loader2, GraduationCap, BrainCircuit, Rocket, Sparkles,
  Dribbble, Frame, Box, Layout, GitBranch, Cloud, Command, Zap, Hexagon, Calendar,
  Utensils
} from 'lucide-react';

// --- COMPOSANT COMPTEUR ANIMÉ (POUR LE DASHBOARD) ---
const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
   
  // Extraction du nombre (ex: "12+" -> 12)
  const number = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = number;
      const totalFrames = Math.round(duration * 60);
      const counterIncrement = end / totalFrames;

      const timer = setInterval(() => {
        start += counterIncrement;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [inView, number, duration]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
};

// --- COMPOSANT WRAPPER DE SECTION (TRANSITIONS FORMIDABLES) ---
const SectionWrapper = ({ children, id, className }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const App = () => {
   
  // --- STATE PRINCIPAL ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
   
  // --- STATE POUR PASSIONS (Voyages Immersifs) ---
  const [activeTrip, setActiveTrip] = useState(null); // 'egypt', 'morocco', or null

  // --- STATE POUR CONTACT ---
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formStatus, setFormStatus] = useState('idle');

  // --- STATE POUR LE STACK ---
  const [hoveredTech, setHoveredTech] = useState(null);

  // Empêcher le scroll quand la modale est ouverte
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  // Horloge temps réel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };

  // --- DONNÉES VOYAGES IMMERSIFS ---
  const tripDetails = {
    egypt: {
      title: "L'Égypte",
      subtitle: "Mes Racines, Ma Terre",
      color: "from-yellow-600 to-amber-900",
      accent: "text-amber-500",
      bgImage: "public/images/passions/pyramids.jpg",
      locations: [
        {
          name: "Mit Yazid (Le Village)",
          desc: "Là où tout commence. La maison de mon grand-père, mes racines profondes. C'est la vie agricole, la connexion à la terre pour comprendre ma culture. Mais c'est surtout les cousins, les 'grailles' inoubliables, et les tournois de FIFA et Five endiablés. Le cœur de mon identité.",
          icon: <Users className="w-5 h-5" />,
          img: "public/images/passions/village.jpg"
        },
        {
          name: "Alexandrie (La Nocturne)",
          desc: "Une ville côtière inexplicable. Ici, la vie commence vraiment à 22h. Les restaurants ouverts tard, cette ambiance unique où l'on respire mieux naturellement. Une vibe particulière face à la mer qui ne s'explique pas, elle se vit.",
          icon: <Moon className="w-5 h-5" />,
          img: "public/images/passions/alexandria.jpg"
        },
        {
          name: "El Sahel (Le Paradis Moderne)",
          desc: "La nouvelle ville extraordinaire. Eau turquoise paradisiaque, Jet Ski, buildings modernes et centres commerciaux. Une semaine de vue exceptionnelle et de luxe au bord de la Méditerranée.",
          icon: <Sun className="w-5 h-5" />,
          img: "public/images/passions/sahel.jpg"
        }
      ]
    },
    morocco: {
      title: "Le Maroc",
      subtitle: "L'Ancrage Maternel",
      color: "from-red-600 to-red-900",
      accent: "text-red-500",
      bgImage: "public/images/passions/morocco_arch.jpg",
      locations: [
        {
          name: "Casablanca (La Douceur)",
          desc: "La maison spacieuse de mon oncle, à 2 min de la mer. Ce qui marque ici, c'est le calme. Les goûters en famille, le thé, les gâteaux, la bonne nourriture marocaine et les sorties au Souk. La paix familiale.",
          icon: <Utensils className="w-5 h-5" />,
          img: "public/images/passions/casa.jpg"
        },
        {
          name: "Marrakech (L'Aventure)",
          desc: "L'hôtel, la piscine, les toboggans et les buffets à volonté pendant 4 jours. C'est le fun pur : parc aquatique et l'effervescence unique de la place Jamaa el-Fna le soir.",
          icon: <Sun className="w-5 h-5" />,
          img: "public/images/passions/marrakech.jpg"
        },
        {
          name: "Nador (Nature & Racines)",
          desc: "Les racines de ma mère. Le calme à son maximum. La belle Méditerranée sauvage où l'on est seul au monde. La forêt, la nature brute et ses espèces (serpents) qu'on observe. Le ressourcement total.",
          icon: <Waves className="w-5 h-5" />,
          img: "public/images/passions/nador.jpg"
        }
      ]
    }
  };

  // --- DONNÉES STATS (Avec valeurs pour animation) ---
  const stats = [
    { label: "Projets", value: "12+", icon: <Briefcase className="w-5 h-5 text-purple-400"/> },
    { label: "Clients", value: "5", icon: <Users className="w-5 h-5 text-cyan-400"/> },
    { label: "Années Exp.", value: "3", icon: <Star className="w-5 h-5 text-yellow-400"/> },
    { label: "Lignes de Code", value: "45k", icon: <FileCode className="w-5 h-5 text-green-400"/> },
    { label: "Technologies", value: "15+", icon: <Layers className="w-5 h-5 text-blue-400"/> },
    { label: "Commits Git", value: "350+", icon: <GitCommit className="w-5 h-5 text-pink-400"/> },
  ];

  // --- DONNÉES STACK TECHNIQUE STRUCTURÉE ---
  const techStackStructured = {
    "Langages & Cœur": [
      { name: "Java", level: 90, projects: 5, icon: <Code2 />, color: "text-orange-500", gradient: "from-orange-500 to-red-600" },
      { name: "PHP",  projects: 4, icon: <Terminal />, color: "text-indigo-400", gradient: "from-indigo-400 to-purple-600" },
      { name: "JavaScript", level: 80, projects: 6, icon: <FileCode />, color: "text-yellow-400", gradient: "from-yellow-400 to-orange-500" },
      { name: "SQL", level: 85, projects: 5, icon: <Database />, color: "text-blue-400", gradient: "from-blue-400 to-cyan-500" },
      { name: "Python", level: 75, projects: 2, icon: <Code2 />, color: "text-emerald-400", gradient: "from-emerald-400 to-green-600" },
    ],
    "Frameworks & Ecosystème": [
      { name: "Laravel", level: 85, projects: 2, icon: <Layers />, color: "text-rose-500", gradient: "from-rose-500 to-red-600" },
      { name: "React", level: 80, projects: 2, icon: <Globe />, color: "text-cyan-400", gradient: "from-cyan-400 to-blue-500" },
      { name: "Spring Boot", level: 75, projects: 1, icon: <Server />, color: "text-green-500", gradient: "from-green-500 to-emerald-700" },
      { name: "Flutter", level: 70, projects: 1, icon: <Smartphone />, color: "text-sky-400", gradient: "from-sky-400 to-blue-600" },
    ],
    "Outils & DevOps": [
      { name: "Git / GitHub", level: 90, projects: 12, icon: <GitBranch />, color: "text-orange-600", gradient: "from-orange-600 to-red-600" },
      { name: "Docker", level: 65, projects: 2, icon: <Box />, color: "text-blue-500", gradient: "from-blue-500 to-indigo-600" },
      { name: "PostgreSQL", level: 80, projects: 3, icon: <Database />, color: "text-indigo-300", gradient: "from-indigo-300 to-blue-500" },
    ]
  };

  // --- DONNÉES PROJETS (MODIFIÉES) ---
  const projects = [
    {
      id: 1,
      title: "Frigo Recette",
      desc: "Application intelligente qui génère des recettes basées sur le contenu de votre frigo.",
      longDesc: "Face au gaspillage alimentaire grandissant, j'ai conçu cette solution mobile en Dart/Flutter. L'application ne se contente pas de lister des recettes : elle utilise un algorithme intelligent pour croiser votre stock réel avec une base de données culinaire. Le défi technique résidait dans l'optimisation des requêtes SQLite locales pour garantir une fluidité parfaite, même sans connexion internet.",
      features: ["Algorithme anti-gaspillage", "Mode Hors-ligne (SQLite)", "UX optimisée pour mobile", "Scan d'ingrédients"],
      tags: ["Full Stack", "Dart", "Flutter", "SQLite", "MVVM"],
      image: "public/images/frigo.webp",
      github: "https://github.com/DevKosX/S501_Developpement",
      icon: <Database className="w-10 h-10 text-cyan-400" />
    },
    {
      id: 2,
      title: "Find My Word",
      desc: "Jeu interactif de devinette de mots en temps réel.",
      longDesc: "Au-delà du simple jeu, ce projet est une démonstration de robustesse logicielle. Développé en Java, j'ai adopté une approche TDD (Test Driven Development) stricte avec JUnit. Chaque méthode, chaque interaction utilisateur a été testée pour garantir zéro bug. C'est la preuve qu'un code ludique peut aussi être un code industriel et maintenable.",
      features: ["Architecture modulaire", "Couverture de tests > 90%", "Algorithme de dictionnaire", "Interface console robuste"],
      tags: ["Full Stack", "Java", "Test Unitaires", "JUnit", "Swing", "TDD"],
      image: "public/images/find.jpg",
      github: "https://github.com/bouchaiblemaire/r5a8_junit_tests",
      icon: <Terminal className="w-10 h-10 text-purple-400" />
    },
    {
      id: 3,
      title: "POC Redis VS Mongo",
      desc: "Comparaison de performance NoSQL sur une simulation type 'Uber Eats'.",
      longDesc: "Dans un contexte Big Data, le choix de la base de données est critique. J'ai réalisé ce Proof of Concept (POC) pour départager Redis et MongoDB sur un cas concret : le tracking GPS temps réel d'une flotte de livreurs. J'ai simulé des milliers d'écritures simultanées pour analyser la latence et le débit, démontrant ma capacité à prendre des décisions architecturales basées sur des métriques réelles.",
      features: ["Benchmark haute performance", "Analyse comparative chiffrée", "Architecture Docker Microservices", "Simulation de charge"],
      tags: ["Mongo", "Redis", "POC", "NoSQL", "Big Data", "Performance"],
      image: "public/images/uber.webp",
      github: "https://github.com/DevKosX/Projet-UberEats-BDD_Version2",
      icon: <Server className="w-10 h-10 text-pink-400" />
    },
    {
      id: 4,
      title: "France Academy",
      desc: "Plateforme de gestion des formations et utilisateurs.",
      longDesc: "Une application web d'envergure développée sous Laravel pour digitaliser la gestion d'un centre de formation. Le défi était de gérer des rôles complexes (Admin, Prof, Élève) et des relations de données imbriquées tout en gardant une interface simple. J'ai mis en place une architecture MVC stricte et sécurisée, prouvant ma maîtrise des frameworks PHP modernes.",
      features: ["Sécurité & Rôles (ACL)", "Architecture MVC scalable", "Gestion de base de données complexe", "Interface responsive"],
      tags: ["Full Stack", "Laravel", "PHP", "Ajax", "Vagrant", "Multi-tenancy", "MVVM"],
      image: "public/images/france-academy.png",
      github: "https://github.com/DevKosX/FranceAcademy",
      icon: <Globe className="w-10 h-10 text-blue-400" />
    },
    {
      id: 5,
      title: "Stagelys",
      desc: "Application web de gestion des stages pour étudiants et professeurs.",
      longDesc: "Pour résoudre le casse-tête administratif des stages universitaires, j'ai co-développé cet ERP sur mesure. Il centralise tout : conventions, signatures, rapports et notations. Ce projet a nécessité une analyse fine des processus métiers de l'université pour traduire des besoins bureaucratiques en une expérience utilisateur fluide et efficace.",
      features: ["Digitalisation de processus métier", "Génération de PDF dynamique", "Notifications automatiques", "Tableaux de bord statistiques"],
      tags: ["Full Stack", "ERP", "PHP", "HTML", "CSS", "JavaScript", "MVC"],
      image: "public/images/stagelys.png",
      github: "https://github.com/DevKosX/GestionDesStagesProject",
      icon: <Database className="w-10 h-10 text-green-400" />
    },
    {
      id: 6,
      title: "Site Web 24H de l'Info",
      desc: "Site vitrine interactif pour promouvoir l'événement national des IUT Informatique.",
      longDesc: "J'ai conçu et réalisé le site officiel pour l'événement 'Les 24h de l'Info'. L'objectif était de créer une interface immersive et informative pour les participants et les partenaires. Le site présente le programme, les défis en temps réel et les partenaires, avec une identité visuelle forte qui reflète le dynamisme de ce hackathon.",
      features: ["Design UI/UX immersif", "Présentation événementielle", "Intégration multimédia", "Responsive Design"],
      tags: ["Web Design", "Wix", "Event", "Communication"],
      image: "public/images/world-cup.jpg",
      website: "https://akd9380devlg.wixsite.com/24h-de-l",
      github: null,
      icon: <Layout className="w-10 h-10 text-orange-400" />
    },
    {
      id: 7,
      title: "Calculatrice Objet",
      desc: "Une calculatrice simple et intuitive développée en Java (POO).",
      longDesc: "Plus qu'une calculatrice, c'est une étude de cas sur la Programmation Orientée Objet. J'ai utilisé le pattern Command pour encapsuler chaque opération, rendant le code extensible à l'infini (ajout de fonctions scientifiques sans toucher au cœur). Une démonstration de ma compréhension des Design Patterns.",
      features: ["Pattern Command / Strategy", "Interface découplée de la logique", "Gestion d'erreurs robuste", "Extensibilité du code"],
      tags: ["Back-end", "Java", "POO", "UML", "Design Patterns"],
      image: "public/images/calculatrice.png",
      github: "https://github.com/DevKosX/CalculatriceJavaV2",
      icon: <Calculator className="w-10 h-10 text-yellow-400" />
    },
    {
      id: 8,
      title: "Jeu du Fakir Objet",
      desc: "Projet développé lors des 24H de l'Info à Villetaneuse.",
      longDesc: "Réalisé lors d'un Hackathon intense de 24h, ce projet simule une planche de Galton. Il a fallu coder vite et bien, en équipe, pour modéliser des probabilités mathématiques sous forme visuelle. Ce projet témoigne de ma capacité à délivrer un produit fonctionnel sous une contrainte de temps extrême.",
      features: ["Développement Agile / Hackathon", "Organisation flexible", "Travail d'équipe sous pression", "Visualisation de données"],
      tags: ["Java", "Hackathon", "Game", "Agile", "Teamwork"],
      image: "public/images/fakir.jpg",
      github: null,
      icon: <Code2 className="w-10 h-10 text-red-400" />
    },
    {
      id: 9,
      title: "Recueil de Besoin - Observatoire",
      desc: "Analyse des besoins pour un observatoire astronomique local.",
      longDesc: "Avant de coder, il faut comprendre. J'ai mené une mission de consulting pour l'Observatoire de Juvisy, traduisant leurs problèmes opérationnels en spécifications techniques précises. J'ai produit un dossier d'analyse complet (UML, Maquettes, User Stories) qui a servi de fondation pour la refonte de leur SI.",
      features: ["Ingénierie des exigences", "Modélisation UML avancée", "Interviews clients", "Maquettage UI/UX"],
      tags: ["Front-end", "HTML", "CSS", "JS", "Figma", "Analyse", "Documentation", "Client"],
      image: "public/images/recueil-besoin.jpg",
      github: "https://github.com/DevKosX/ObservatoireDeJuvisy",
      icon: <Terminal className="w-10 h-10 text-gray-400" />
    },
    {
      id: 10,
      title: "Bootage Disque Dur",
      desc: "Configuration Raspberry PI : boot sur disque externe et droits d'écriture.",
      longDesc: "Un plongeon dans le bas niveau et l'administration système. J'ai transformé un Raspberry Pi standard en serveur de stockage performant en contournant les limitations de la carte SD pour booter directement sur SSD. Cela a nécessité une maîtrise fine du kernel Linux, du fstab et des permissions Unix.",
      features: ["Administration Système Linux", "Optimisation Hardware", "Scripting Bash", "Gestion de stockage"],
      tags: ["Hardware", "Linux", "Raspberry Pi", "Bash", "SysAdmin"],
      image: "public/images/raspberry-boot.jpg",
      github: null,
      icon: <Cpu className="w-10 h-10 text-green-600" />
    },
    {
      id: 11,
      title: "Base de Données Freedom",
      desc: "Base de données Postgres SQL complexe avec modélisation Merise.",
      longDesc: "L'épine dorsale de toute application. J'ai conçu de A à Z une base de données d'entreprise complexe, appliquant la méthode Merise pour garantir l'intégrité des données. J'ai ensuite implémenté ce modèle sous PostgreSQL avec des vues et des procédures stockées pour optimiser les performances des requêtes analytiques.",
      features: ["Conception MCD/MLD", "SQL Avancé & Optimisation", "Intégrité des données", "Procédures stockées"],
      tags: ["Backend", "SQL", "Postgres", "Merise", "MCD/MLD", "Optimization"],
      image: "public/images/database-freedom.jpg",
      github: null,
      icon: <Database className="w-10 h-10 text-blue-600" />
    },
    {
      id: 12,
      title: "Santa Claus Python",
      desc: "Algorithme Python pour optimiser les courses du Père Noël en France.",
      longDesc: "Un défi algorithmique pur : résoudre le problème du voyageur de commerce (TSP) à grande échelle. En utilisant Python, j'ai implémenté des heuristiques pour calculer le trajet optimal visitant des milliers de points en un temps record. Une application concrète de la théorie des graphes et de l'optimisation combinatoire.",
      features: ["Théorie des Graphes", "Optimisation Algorithmique", "Python & Data Structures", "Résolution de problèmes complexes"],
      tags: ["Python", "Algo", "Logique", "Graphes", "Heuristics"],
      image: "public/images/santa-claus.jpg",
      github: null,
      icon: <Code2 className="w-10 h-10 text-yellow-300" />
    }
  ];

  // Liens de navigation
  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#dashboard", label: "Expériences" },
    { href: "#projets", label: "Projets" },
    { href: "#stack", label: "Stack" },
    { href: "#about", label: "À Propos" },
    { href: "#passions", label: "Passions" },
    { href: "#contact", label: "Contact" },
  ];

  // Fonction pour basculer le thème
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Styles dynamiques basés sur le thème
  const themeClasses = {
    bg: isDarkMode ? "bg-[#0a0a0a]" : "bg-gray-50",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-600",
    cardBg: isDarkMode ? "bg-[#111]" : "bg-white",
    cardBorder: isDarkMode ? "border-white/5" : "border-gray-200",
    navBg: isDarkMode ? "bg-[#0a0a0a]/80" : "bg-white/80",
    navBorder: isDarkMode ? "border-white/10" : "border-gray-200",
    sectionBgAlt: isDarkMode ? "bg-[#080808]" : "bg-gray-100",
    sectionBgDarker: isDarkMode ? "bg-[#050505]" : "bg-gray-50",
    inputBg: isDarkMode ? "bg-[#1a1a24]" : "bg-gray-50",
    inputBorder: isDarkMode ? "border-white/10" : "border-gray-300",
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} font-sans overflow-x-hidden transition-colors duration-300`}>
       
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 ${themeClasses.navBg} backdrop-blur-md border-b ${themeClasses.navBorder} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent relative z-50">
            MK.DEV
          </h1>
           
          {/* Menu Desktop */}
          <div className={`hidden md:flex space-x-6 text-xs md:text-sm font-medium ${themeClasses.textMuted}`}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-cyan-400 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
           
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}
            title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
          </button>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="focus:outline-none">
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-purple-600" />}
            </button>
            <button 
              className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} relative z-50 focus:outline-none`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* --- MENU MOBILE OVERLAY --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-0 left-0 w-full h-screen ${themeClasses.bg} flex flex-col items-center justify-center space-y-8 z-40 md:hidden`}
            >
              {navLinks.map((link) => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className={`text-2xl font-bold ${themeClasses.text} hover:text-cyan-400 transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MODALE DÉTAILS PROJET --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto ${themeClasses.cardBg} rounded-2xl border ${themeClasses.cardBorder} shadow-2xl relative`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton Fermer */}
              <button 
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 p-3 rounded-full ${isDarkMode ? 'bg-black/70 text-white hover:bg-black' : 'bg-white/70 text-black hover:bg-white'} transition-all z-50 shadow-lg border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
                title="Fermer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Header */}
              <div className="h-64 sm:h-80 w-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#111]' : 'from-white'} to-transparent z-10`} />
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display='none';
                    e.target.parentNode.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#f3f4f6';
                  }}
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 backdrop-blur-md' : 'bg-black/10 backdrop-blur-md'}`}>
                      {selectedProject.icon}
                    </div>
                    <h2 className={`text-3xl font-bold ${themeClasses.text}`}>{selectedProject.title}</h2>
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6 sm:p-8 space-y-8">
                 
                {/* Description */}
                <div>
                  <h3 className={`text-lg font-bold ${themeClasses.text} mb-3 flex items-center gap-2`}>
                    <Terminal className="w-5 h-5 text-cyan-400" /> À propos du projet
                  </h3>
                  <p className={`${themeClasses.textMuted} leading-relaxed text-lg`}>
                    {selectedProject.longDesc || selectedProject.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Fonctionnalités */}
                  <div>
                    <h3 className={`text-lg font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
                      <Star className="w-5 h-5 text-yellow-400" /> Fonctionnalités Clés
                    </h3>
                    <ul className="space-y-3">
                      {(selectedProject.features || ["Architecture optimisée", "Interface réactive", "Code propre et documenté"]).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className={themeClasses.textMuted}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack Technique */}
                  <div>
                    <h3 className={`text-lg font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
                      <Layers className="w-5 h-5 text-purple-400" /> Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className={`pt-6 border-t ${themeClasses.cardBorder} flex flex-wrap gap-4 justify-end`}>
                   
                  {/* Lien Site Web (pour Recueil de Besoin par exemple) */}
                  {selectedProject.website && (
                    <a 
                      href={selectedProject.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg shadow-cyan-500/20 border border-white/10 group flex items-center gap-2"
                      title="Voir le site en live"
                    >
                      <Smartphone className="w-8 h-8 group-hover:text-white transition-colors" />
                    </a>
                  )}

                  {/* Lien GitHub */}
                  {selectedProject.github ? (
                    <a 
                      href={selectedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg shadow-gray-900/20 border border-white/10 group"
                      title="Voir le code sur GitHub"
                    >
                      <Github className="w-8 h-8 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ) : (
                    <div 
                      className={`p-4 rounded-full cursor-not-allowed ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-400'}`}
                      title="Code Privé / Non disponible"
                    >
                      <Lock className="w-8 h-8" />
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            <p className={`${themeClasses.textMuted} text-lg mb-8 max-w-lg leading-relaxed`}>
              Développeur Full-Stack <span className={`${isDarkMode ? 'text-white' : 'text-black'} font-semibold`}>Junior</span>.
              Je crée des expériences numériques modernes, performantes et bien pensées.
            </p>
             
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#projets" className={`px-8 py-3 font-bold rounded-full transition-colors text-center ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                Voir mes projets
              </a>
              <div className="flex gap-4 items-center justify-center sm:justify-start px-4">
                <a href="https://github.com/DevKosX" target="_blank" rel="noopener noreferrer">
                  <Github className={`w-6 h-6 ${themeClasses.textMuted} hover:text-cyan-400 cursor-pointer transition-colors`} />
                </a>
                <a href="https://www.linkedin.com/in/mohamed-kosbar-5a57972ba/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className={`w-6 h-6 ${themeClasses.textMuted} hover:text-cyan-400 cursor-pointer transition-colors`} />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center mt-8 lg:mt-0"
          >
            <div className={`w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 rounded-full border ${themeClasses.navBorder} backdrop-blur-3xl flex items-center justify-center shadow-2xl shadow-purple-500/10 animate-[spin_10s_linear_infinite]`}>
              <div className={`w-2/3 h-2/3 ${isDarkMode ? 'bg-black/40' : 'bg-white/40'} rounded-full flex items-center justify-center border ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <Code2 className="w-20 h-20 text-cyan-400" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 2. DASHBOARD: EXPÉRIENCES (AMÉLIORÉ) --- */}
      <SectionWrapper id="dashboard" className={`py-32 ${themeClasses.sectionBgAlt} relative overflow-hidden`}>
         {/* Background Elements */}
         <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent hidden lg:block opacity-30" />
         <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px]" />
         <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px]" />

         <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="text-center mb-24">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
               <Calendar className="w-4 h-4 text-cyan-400" />
               <span className="text-xs font-bold text-cyan-300 uppercase tracking-widest">Chronologie</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
               Mon <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Parcours</span>
             </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
             
             {/* GAUCHE: TIMELINE (7 cols) */}
             <div className="lg:col-span-7 space-y-12">
               {[
                 { title: "Développeur Full-Stack", date: "2022 - Présent", desc: "3 ans d'expérience cumulée (académique & projets).", icon: <Code2 />, color: "text-cyan-400" },
                 { title: "Stage Développeur - Devea", date: "Jan 2025 - Mars 2025", desc: "Développement Full-Stack Laravel PHP.", icon: <Briefcase />, color: "text-purple-400" },
                 { title: "Bénévole 24H de l'Info", date: "Mai 2024 - Juin 2024", desc: "Technique organisation de l'événement, logistique.", icon: <Users />, color: "text-yellow-400" },
                 { title: "Stage - OFW Ships", date: "Déc 2019 - Jan 2020", desc: "Découverte IT en entreprise.", icon: <Globe />, color: "text-blue-400" }
               ].map((item, index) => (
                 <motion.div 
                   key={index}
                   initial={{ opacity: 0, x: -50 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-50px" }}
                   transition={{ duration: 0.5, delay: index * 0.1 }}
                   className={`relative group pl-8 lg:pl-0 flex flex-col lg:flex-row gap-6 items-center`}
                 >
                   {/* Mobile Line Connector */}
                   <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800 lg:hidden" />
                   
                   {/* Icon Bubble */}
                   <div className={`relative z-10 w-16 h-16 rounded-2xl ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} border border-gray-700 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                     <div className={`p-3 rounded-xl bg-opacity-10 bg-current ${item.color}`}>
                        <div className={item.color}>{item.icon}</div>
                     </div>
                   </div>

                   {/* Card */}
                   <div className={`flex-1 w-full ${themeClasses.cardBg} p-6 rounded-2xl border ${themeClasses.cardBorder} hover:border-cyan-500/30 transition-all shadow-lg group-hover:shadow-cyan-500/5`}>
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                       <h4 className={`text-xl font-bold ${themeClasses.text}`}>{item.title}</h4>
                       <span className="text-xs font-mono py-1 px-2 rounded bg-gray-800 text-gray-400 border border-gray-700 mt-2 sm:mt-0 w-fit">{item.date}</span>
                     </div>
                     <p className={themeClasses.textMuted}>{item.desc}</p>
                   </div>
                 </motion.div>
               ))}
             </div>

             {/* DROITE: STATS GRID STICKY (5 cols) */}
             <div className="lg:col-span-5 lg:sticky lg:top-32">
                <div className="grid grid-cols-2 gap-4">
                   {stats.map((stat, idx) => (
                     <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors aspect-square shadow-xl backdrop-blur-sm`}
                     >
                       <div className={`mb-3 ${stat.icon.props.className.includes('text-') ? stat.icon.props.className : 'text-gray-400'}`}>{stat.icon}</div>
                       <h4 className={`text-3xl lg:text-4xl font-black ${themeClasses.text} mb-1`}>
                         <AnimatedCounter value={stat.value} />
                       </h4>
                       <p className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted}`}>{stat.label}</p>
                     </motion.div>
                   ))}
                </div>
             </div>

           </div>
         </div>
      </SectionWrapper>

      {/* --- 3. PROJETS SECTION "CINÉMATIQUE" --- */}
      <SectionWrapper id="projets" className={`py-32 ${isDarkMode ? 'bg-[#080808]' : 'bg-gray-100'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-20">
             <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
               Projets Réalisés
             </h2>
             <p className={`${themeClasses.textMuted} text-center max-w-xl`}>
               Une galerie de mes réalisations, alliant technique et créativité.
             </p>
          </div>
           
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((item) => (
              <div 
                key={item.id} 
                className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/5"
                onClick={() => setSelectedProject(item)}
              >
                {/* Image de fond (Full Cover) */}
                <div className="absolute inset-0 bg-gray-900">
                   <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                      onError={(e) => {e.target.style.display='none';}} 
                   />
                   {/* Overlay Gradient par défaut */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* Contenu - Toujours visible mais s'anime au survol */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  {/* Icon flottante en haut à droite */}
                  <div className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-white">
                      {item.icon}
                    </div>
                  </div>

                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {item.desc}
                    </p>
                     
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {item.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-md rounded-full border border-white/10">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      Découvrir <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* --- 4. STACK TECHNIQUE "PODS" (TABLEAU DE CATÉGORIES REVISITÉ) --- */}
      <SectionWrapper id="stack" className={`py-32 ${themeClasses.sectionBgDarker} transition-colors duration-300 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
           
          {/* Section du Bas: Categories Pods (Nouveau Design) */}
          <div className="space-y-20">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-5xl font-bold mb-4">Arsenal <span className="text-purple-400">Détaillé</span></h2>
               <p className={themeClasses.textMuted}>Exploration par domaine de compétence.</p>
            </div>
             
            {Object.entries(techStackStructured).map(([category, techs], catIndex) => (
              <div key={category} className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-6 mb-10">
                  <div className={`h-px flex-1 ${isDarkMode ? 'bg-gradient-to-r from-transparent to-gray-800' : 'bg-gray-300'}`} />
                  <span className={`text-2xl font-black uppercase tracking-widest ${themeClasses.text} border-2 border-dashed border-gray-700 px-6 py-2 rounded-lg`}>{category}</span>
                  <div className={`h-px flex-1 ${isDarkMode ? 'bg-gradient-to-l from-transparent to-gray-800' : 'bg-gray-300'}`} />
                </div>

                {/* Tech Grid for this Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {techs.map((tech, index) => (
                    <div 
                      key={tech.name}
                      className={`group relative ${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-6 hover:border-transparent transition-all overflow-hidden`}
                    >
                      {/* Hover Border Gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} style={{ padding: '1px', borderRadius: '1rem' }}>
                          <div className={`w-full h-full ${themeClasses.cardBg} rounded-2xl`} />
                      </div>
                       
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-white/5 ${tech.color} group-hover:scale-110 transition-transform`}>
                          {tech.icon}
                        </div>
                      </div>
                       
                      <h4 className={`text-lg font-bold ${themeClasses.text} mb-2`}>{tech.name}</h4>
                       
                      {/* Mini Project Indicator */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <div className={`w-1.5 h-1.5 rounded-full bg-current ${tech.color}`} />
                        <span>Utilisé dans {tech.projects} projets</span>
                      </div>

                      {/* Bottom Glow Bar */}
                      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-800">
                        {/* MODIFICATION ICI: width forcée à 100% visuellement, mais le level reste utilisé dans le texte au dessus */}
                        <div className={`h-full bg-gradient-to-r ${tech.gradient}`} style={{ width: '100%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* --- 5. À PROPOS (VERSION CLASSIQUE RESTAURÉE) --- */}
      <section id="about" className={`min-h-screen flex items-center py-24 ${themeClasses.sectionBgAlt} transition-colors duration-300 relative overflow-hidden`}>
        {/* Background FX */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Identité Détectée
            </h2>
            <p className={`${themeClasses.textMuted} text-lg`}>
              Initialisation du profil développeur...
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
            {/* COLONNE GAUCHE : CARTE DE PROFIL FUTURISTE */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className={`relative h-full ${isDarkMode ? 'bg-[#0a0a0a]/90' : 'bg-white/90'} backdrop-blur-xl p-8 rounded-3xl border ${themeClasses.cardBorder} flex flex-col items-center text-center`}>
                 
                {/* Photo avec effet de scan */}
                <div className="relative w-48 h-48 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border-2 border-purple-500/30 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl relative">
                    <img 
                      src="public/images/tiit.jpg" 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display='none';
                        e.target.parentNode.style.backgroundColor='#1a1a1a';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* Badge Level */}
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg">
                    LVL. 3
                  </div>
                </div>

                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>Mohamed Kosbar</h3>
                <p className="text-cyan-400 font-mono text-sm mb-6">Développeur Full-Stack</p>

                {/* Mini Stats */}
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} border ${themeClasses.cardBorder}`}>
                    <div className="text-xs text-gray-500 uppercase font-bold">XP</div>
                    <div className={`text-lg font-bold ${themeClasses.text}`}>3 Ans</div>
                  </div>
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} border ${themeClasses.cardBorder}`}>
                    <div className="text-xs text-gray-500 uppercase font-bold">Status</div>
                    <div className="text-lg font-bold text-green-500">Online</div>
                  </div>
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Motivation</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 w-full" />
                  </div>
                </div>

              </div>
            </motion.div>

            {/* COLONNE DROITE : MODULES D'INFORMATION */}
            <div className="lg:col-span-2 space-y-6">
               
              {/* Module 1: Formation */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`p-6 rounded-2xl border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-[#0a0a0a]/60' : 'bg-white/60'} backdrop-blur-md hover:border-cyan-500/30 transition-colors group`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>Formation Académique</h4>
                    <p className={`${themeClasses.textMuted} leading-relaxed`}>
                      Actuellement en <span className="text-cyan-400 font-bold">3ème année de BUT Informatique</span>. Mon parcours académique m'a permis de construire des fondations solides en architecture logicielle, algorithmique complexe et gestion de bases de données. Je ne me contente pas de coder, je conçois des solutions pérennes.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Module 2: Vision */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className={`p-6 rounded-2xl border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-[#0a0a0a]/60' : 'bg-white/60'} backdrop-blur-md hover:border-purple-500/30 transition-colors group`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>Vision & Approche</h4>
                    <p className={`${themeClasses.textMuted} leading-relaxed`}>
                      Je navigue avec aisance entre le Backend (Java, PHP, Postgres) et le Frontend (React, Tailwind). Mon approche est centrée sur la qualité (Clean Code, SOLID) et l'expérience utilisateur. Je suis un développeur curieux, proactif et toujours prêt à apprendre de nouvelles technologies.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Module 3: Objectif (Recherche Stage) */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className={`p-6 rounded-2xl border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-gradient-to-r from-cyan-900/10 to-blue-900/10' : 'bg-blue-50'} backdrop-blur-md border-cyan-500/20 hover:border-cyan-500/50 transition-colors group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Rocket className="w-24 h-24 text-cyan-500 rotate-45" />
                </div>
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors animate-pulse">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>Mission Actuelle</h4>
                    <p className={`${themeClasses.textMuted} leading-relaxed`}>
                      À la recherche d'un <span className="text-cyan-400 font-bold">stage de 14 à 16 semaines</span> pour valider mon année. Je suis prêt à intégrer votre équipe, apporter ma valeur ajoutée et transformer vos défis techniques en réussites.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Module 4: Soft Skills (Tags) */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {["Curiosité", "Travail d'équipe", "Rigueur", "Autonomie", "Proactif", "Clean Code"].map((skill, idx) => (
                  <span 
                    key={idx} 
                    className={`px-4 py-2 rounded-full text-sm font-bold border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'} transition-colors cursor-default flex items-center gap-2`}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-500" />
                    {skill}
                  </span>
                ))}
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* --- 6. PASSIONS & INSPIRATIONS (VERSION IMMERSIVE INTÉGRÉE) --- */}
      <SectionWrapper id="passions" className={`py-24 ${themeClasses.sectionBgDarker} relative overflow-hidden transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Mes <span className="text-purple-500">Passions</span> & Inspirations</h2>

          {/* --- VOYAGES : MODE GALERIE IMMERSIVE (INTÉGRÉ) --- */}
          <div className="mb-24">
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-8 flex items-center gap-3`}>
              <Plane className="w-6 h-6 text-cyan-400" /> Odyssée Culturelle
            </h3>

            {/* Si aucun voyage sélectionné : Affichage Cartes Géantes */}
            {!activeTrip && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-96 transition-all duration-500 ease-in-out">
                {/* CARTE EGYPTE */}
                <div 
                  onClick={() => setActiveTrip('egypt')}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border border-transparent hover:border-amber-500/50 transition-all duration-300"
                >
                  <img src="public/images/passions/jardin.jpg" alt="Egypte" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" onError={(e) => e.target.style.display='none'} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:bg-black/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-amber-400 font-bold tracking-widest text-sm uppercase mb-2 block">Mes origines paternelles</span>
                    <h4 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Égypte</h4>
                    <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                      Découvrir Tanta, Alexandrie & Sahel <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </div>

                {/* CARTE MAROC */}
                <div 
                  onClick={() => setActiveTrip('morocco')}
                  className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border border-transparent hover:border-red-500/50 transition-all duration-300"
                >
                  <img src="public/images/passions/hassan2.jpg" alt="Maroc" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" onError={(e) => e.target.style.display='none'} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:bg-black/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-red-400 font-bold tracking-widest text-sm uppercase mb-2 block">Mes origines maternelles</span>
                    <h4 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Maroc</h4>
                    <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                      Découvrir Casa, Marrakech & Nador <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VUE DÉTAILLÉE (OVERLAY) */}
            {activeTrip && (
              <div className={`relative w-full bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border ${themeClasses.cardBorder} animate-in fade-in slide-in-from-bottom-10 duration-500`}>
                {/* Header avec bouton fermer */}
                <div className={`relative h-48 md:h-64 overflow-hidden`}>
                  <img src={tripDetails[activeTrip].bgImage} className="w-full h-full object-cover opacity-40 blur-sm" onError={(e) => e.target.style.display='none'} />
                  <div className={`absolute inset-0 bg-gradient-to-b ${tripDetails[activeTrip].color} opacity-60 mix-blend-multiply`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <h3 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight drop-shadow-lg">{tripDetails[activeTrip].title}</h3>
                      <p className="text-xl text-white/90 font-light italic">{tripDetails[activeTrip].subtitle}</p>
                  </div>
                  <button 
                      onClick={() => setActiveTrip(null)}
                      className="absolute top-4 right-4 bg-black/50 hover:bg-white/20 p-2 rounded-full text-white transition-all backdrop-blur-md z-20"
                  >
                      <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Contenu Grid (Les 3 Villes) */}
                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tripDetails[activeTrip].locations.map((loc, idx) => (
                      <div key={idx} className="group bg-slate-900/50 rounded-xl p-4 hover:bg-slate-900 transition-colors duration-300 border border-transparent hover:border-gray-700">
                        <div className="h-40 w-full rounded-lg overflow-hidden mb-4 relative">
                            <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => e.target.style.display='none'} />
                            <div className={`absolute top-2 right-2 bg-black/70 p-1.5 rounded-lg text-white`}>
                              {loc.icon}
                            </div>
                        </div>
                        <h5 className={`text-xl font-bold ${tripDetails[activeTrip].accent} mb-2`}>{loc.name}</h5>
                        <p className={`${themeClasses.textMuted} text-sm leading-relaxed`}>
                          {loc.desc}
                        </p>
                      </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SÉRIES & FOOTBALL (Grid asymétrique) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            
            {/* FOOTBALL - Grande Carte (2 colonnes) */}
            <div className={`md:col-span-2 ${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-8 relative overflow-hidden group hover:border-green-500/30 transition-all shadow-md`}>
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Trophy className="w-48 h-48 text-green-500" />
               </div>
               <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}>
                 <HeartPulse className="w-6 h-6 text-green-500" /> Le Football, une école de vie
               </h3>
               <div className={`space-y-4 ${themeClasses.textMuted} relative z-10 leading-relaxed`}>
                 <p>
                   Le football est bien plus qu'un sport pour moi. J'ai eu la chance d'atteindre un excellent niveau en évoluant en <span className={`${themeClasses.text} font-bold`}>U17 Nationaux avec Aubervilliers (Génération 2005)</span>. C'était l'école de la rigueur, de la tactique et du dépassement de soi.
                 </p>
                 <p>
                   Malheureusement, une blessure (la maladie d'Osgood-Schlatter) a freiné cette ascension. Mais cette épreuve m'a appris la résilience. J'ai transféré cette compétitivité et cette soif d'apprendre dans mes études et le développement informatique. Aujourd'hui, je code avec la même intensité que je jouais sur le terrain.
                 </p>
               </div>
            </div>

            {/* SÉRIES - Colonne droite */}
            <div className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-8 flex flex-col justify-center hover:border-red-500/30 transition-all shadow-md`}>
               <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}>
                 <Tv className="w-6 h-6 text-red-500" /> Cinéphile
               </h3>
               <div className="space-y-6">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                       <img src="public/images/passions/st.jpg" alt="Stranger Things" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div>
                      <h4 className={`${themeClasses.text} font-bold group-hover:text-red-500 transition-colors`}>Stranger Things</h4>
                      <p className={`text-xs ${themeClasses.textMuted}`}>Mystère & Années 80</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                       <img src="public/images/passions/echo.webp" alt="Echoes of the Past" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div>
                      <h4 className={`${themeClasses.text} font-bold group-hover:text-yellow-500 transition-colors`}>Echoes of the Past</h4>
                      <p className={`text-xs ${themeClasses.textMuted}`}>Drame Égyptien</p>
                    </div>
                 </div>
               </div>
            </div>

          </div>

          {/* --- NOUVELLE LIGNE : NATATION & JEUX VIDÉO --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* NATATION - Grande Carte (2 colonnes) */}
            <div className={`md:col-span-2 ${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-8 relative overflow-hidden group hover:border-cyan-500/30 transition-all shadow-md`}>
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Waves className="w-48 h-48 text-cyan-500" />
               </div>
               <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}>
                 <Waves className="w-6 h-6 text-cyan-500" /> La Natation, mon second souffle
               </h3>
               <div className={`space-y-4 ${themeClasses.textMuted} relative z-10 leading-relaxed`}>
                 <p>
                  De très nul à médaillé, j’ai relevé un défi : apprendre à nager. Après une formation de deux semaines que j’ai beaucoup appréciée, j’ai poursuivi deux ans de natation pour obtenir mon diplôme, suivis d’une année de compétition. Cette discipline m’a apporté gainage et agilité, des atouts majeurs pour mon jeu au football et c'est devenu une passion.                  </p>
                 <p>
                   Aujourd'hui, je nage partout : de l'Atlantique (Agadir, Deauville) à la Mer Rouge (Hurghada), en passant par le Nil. J'aime perfectionner mes plongeons et battre mes records d'apnée.
                 </p>
               </div>
            </div>

            {/* JEUX VIDÉO - Colonne droite */}
            <div className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-8 flex flex-col justify-center hover:border-purple-500/30 transition-all shadow-md`}>
               <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}>
                 <Gamepad2 className="w-6 h-6 text-purple-500" /> Gamer
               </h3>
               <div className="space-y-6">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                       <img src="public/images/fm.avif" alt="Football Manager" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div>
                      <h4 className={`${themeClasses.text} font-bold group-hover:text-purple-500 transition-colors`}>Football Manager</h4>
                      <p className={`text-xs ${themeClasses.textMuted}`}>Stratégie & Gestion</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                       <img src="public/images/last.jpg" alt="The Last of Us" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} />
                    </div>
                    <div>
                      <h4 className={`${themeClasses.text} font-bold group-hover:text-green-500 transition-colors`}>The Last of Us</h4>
                      <p className={`text-xs ${themeClasses.textMuted}`}>Narratif & Émotion</p>
                    </div>
                 </div>
               </div>
            </div>

          </div>

        </div>
      </SectionWrapper>

      {/* --- 7. CONTACT SECTION (VERSION PREMIUM "COMMUNICATION HUB") --- */}
      <SectionWrapper id="contact" className={`py-24 ${isDarkMode ? 'bg-[#050505]' : 'bg-gray-100'} overflow-hidden relative transition-colors duration-300`}>
        {/* Background Elements */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-50" />
        <div className={`absolute inset-0 opacity-[0.03] ${isDarkMode ? 'bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]' : ''}`} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
              Initialiser la communication
            </h2>
            <p className={`${themeClasses.textMuted} text-lg max-w-2xl mx-auto`}>
              Une idée, un projet ou simplement envie d'échanger ? Connectons-nous.
            </p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-3xl overflow-hidden border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-[#0a0a0a]/80' : 'bg-white/80'} backdrop-blur-xl shadow-2xl`}>
             
            {/* GAUCHE: STATUS DASHBOARD (4 cols) */}
            <div className={`lg:col-span-4 p-8 flex flex-col justify-between relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-[#111] to-[#0a0a0a]' : 'bg-gray-50'}`}>
              <div className="space-y-8 relative z-10">
                 
                {/* Status Indicator */}
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className={`font-mono text-sm font-bold tracking-widest ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>SYSTÈME EN LIGNE</span>
                </div>

                {/* Clock & Location */}
                <div className="space-y-6">
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted} mb-2`}>Heure Locale (Paris)</p>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-cyan-400" />
                      <span className={`text-3xl font-mono ${themeClasses.text}`}>
                        {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                   
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted} mb-2`}>Localisation</p>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      <span className={`text-lg ${themeClasses.text}`}>Paris, France</span>
                    </div>
                  </div>

                  <div>
                    <p className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted} mb-2`}>Latence Réseau</p>
                    <div className="flex items-center gap-3">
                      <Wifi className="w-5 h-5 text-emerald-400" />
                      <span className={`text-lg ${themeClasses.text} font-mono`}>24ms <span className="text-xs text-emerald-500 ml-1">EXCELLENT</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials Bottom */}
              <div className="mt-12">
                <p className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted} mb-4`}>Canaux Sécurisés</p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "https://github.com/DevKosX", color: "hover:text-white hover:bg-black" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-kosbar-5a57972ba/", color: "hover:text-white hover:bg-[#0077b5]" }
                  ].map((Social, index) => (
                    <a 
                      key={index}
                      href={Social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg flex items-center justify-center border ${themeClasses.cardBorder} ${themeClasses.textMuted} transition-all duration-300 ${Social.color} hover:border-transparent`}
                    >
                      <Social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Decorative Map Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                 <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                 </svg>
                 {/* Abstract dots can be added here with CSS or SVG */}
              </div>
            </div>

            {/* DROITE: FORMULAIRE INTERACTIF (8 cols) */}
            <div className="lg:col-span-8 p-8 relative">
               
              {formStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50">
                    <ShieldCheck className="w-10 h-10 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Transmission Réussie</h3>
                    <p className={themeClasses.textMuted}>Données reçues. Analyse en cours. Réponse sous 24h.</p>
                  </div>
                  <button onClick={() => setFormStatus('idle')} className="text-cyan-400 hover:text-cyan-300 text-sm font-bold underline decoration-dotted underline-offset-4">
                    Envoyer une autre transmission
                  </button>
                </div>
              ) : formStatus === 'sending' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${themeClasses.text} mb-1`}>Établissement de la liaison...</h3>
                    <p className={`text-sm ${themeClasses.textMuted} font-mono`}>Cryptage des données : 2048-bit SSL</p>
                  </div>
                  {/* Fake Terminal Log */}
                  <div className={`text-left text-xs font-mono p-4 rounded bg-black/50 border border-white/5 w-64 space-y-1 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    <p>{'>'} Initiating handshake...</p>
                    <p>{'>'} Resolving host...</p>
                    <p>{'>'} Uploading payload...</p>
                    <p className="animate-pulse">{'>'} Waiting for server...</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-6 h-full flex flex-col justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <label className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted} group-focus-within:text-cyan-400 transition-colors`}>Identifiant (Nom)</label>
                      <input 
                        type="text" 
                        required
                        className={`w-full bg-transparent border-b-2 ${isDarkMode ? 'border-gray-800' : 'border-gray-300'} focus:border-cyan-500 outline-none py-3 ${themeClasses.text} text-lg transition-colors placeholder-gray-600`}
                        placeholder="Ex: John Doe"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted} group-focus-within:text-cyan-400 transition-colors`}>Point de Contact (Email)</label>
                      <input 
                        type="email" 
                        required
                        className={`w-full bg-transparent border-b-2 ${isDarkMode ? 'border-gray-800' : 'border-gray-300'} focus:border-cyan-500 outline-none py-3 ${themeClasses.text} text-lg transition-colors placeholder-gray-600`}
                        placeholder="Ex: contact@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted} group-focus-within:text-cyan-400 transition-colors`}>Paramètres de Mission (Message)</label>
                    <textarea 
                      rows="4" 
                      required
                      className={`w-full bg-transparent border-b-2 ${isDarkMode ? 'border-gray-800' : 'border-gray-300'} focus:border-cyan-500 outline-none py-3 ${themeClasses.text} text-lg resize-none transition-colors placeholder-gray-600`}
                      placeholder="Décrivez votre projet..."
                    ></textarea>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button type="submit" className="relative group overflow-hidden bg-cyan-600 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                      <span className="relative z-10">Initialiser l'Envoi</span>
                      <Send className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                      {/* Shine Effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <footer className={`py-8 border-t ${themeClasses.inputBorder} text-center ${themeClasses.textMuted} text-sm ${themeClasses.sectionBgAlt}`}>
        <p>© 2025 Mohamed Kosbar. Tous droits réservés.</p>
        <p className="text-xs mt-1">Code source protégé par le droit d'auteur.</p>
      </footer>
    </div>
  );
};

export default App;