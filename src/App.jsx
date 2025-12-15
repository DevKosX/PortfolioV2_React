import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// --- TOUTES LES ICÔNES RASSEMBLÉES ICI ---
import { 
  ShieldCheck, Box, GraduationCap, Github, Linkedin, Code2, Terminal, Database, Cpu, 
  Globe, Calculator, Layers, Server, Gamepad2, Plane, Trophy, 
  Briefcase, Users, FileCode, Star, Mail, Send, MapPin, 
  Tv, HeartPulse, Menu, X, GitCommit, Sun, Moon,
  CheckCircle2, ArrowRight, Lock, Smartphone, Waves,
  Sparkles, Layout, GitBranch, Cloud, Calendar,
  Utensils, Activity, Signal, FileJson, Braces, HardDrive, Monitor, Wrench, Settings,
  BrainCircuit, Rocket, SunMedium // J'ai ajouté ces deux-là qui manquaient pour la section À Propos
} from 'lucide-react';


// --- COMPOSANT COMPTEUR ANIMÉ ---
const AnimatedCounter = ({ value, duration = 2 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);
    
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

// --- COMPOSANT WRAPPER DE SECTION ---
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

// --- COMPOSANT TYPEWRITER ---
const Typewriter = ({ text, delay = 100, infinite = true }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      // Optional: Add logic to reset and loop if needed
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span>{currentText}</span>;
};

const App = () => {
  // --- STATE PRINCIPAL ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTrip, setActiveTrip] = useState(null); 
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // State pour le formulaire
  const [formStatus, setFormStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Développement Site Web',
    message: ''
  });

  const [ping, setPing] = useState(34); 

  // Simulation Ping Réseau Live
  useEffect(() => {
    const interval = setInterval(() => {
      const newPing = Math.floor(Math.random() * (80 - 20 + 1)) + 20;
      setPing(newPing);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- GESTION ENVOI EMAIL ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      // Ton ID est inséré ici 👇
      const response = await fetch("https://formspree.io/f/xqaroebl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: 'Développement Site Web',
          message: ''
        });
      } else {
        console.error("Erreur Formspree");
        setFormStatus('idle');
        alert("Une erreur est survenue. Merci de réessayer.");
      }
    } catch (error) {
      console.error(error);
      setFormStatus('idle');
      alert("Erreur de connexion.");
    }
  };

  // --- DONNÉES VOYAGES ---
  const tripDetails = {
    egypt: {
      title: "L'Égypte",
      subtitle: "Mes Racines, Ma Terre",
      color: "from-yellow-600 to-amber-900",
      accent: "text-amber-500",
      bgImage: "/images/passions/jardin.jpg",
      locations: [
        { name: "Le Caire (La capitale)", desc: "Une métropole bouillonnante qui ne dort jamais. Le bruit incessant, les lumières, les Pyramides de Gizeh à l'horizon et une énergie urbaine incroyable. C'est le cœur battant de l'Égypte moderne.", icon: <Users className="w-5 h-5" />, img: "/images/passions/lecaire.png" },
        { name: "Alexandrie (La nocturne)", desc: "Une ville côtière inexplicable. Ici, la vie commence vraiment à 22h. Une vibe particulière face à la mer qui ne s'explique pas, elle se vit.", icon: <Moon className="w-5 h-5" />, img: "/images/passions/alex.jpg" },
        { name: "El Sahel (Le paradis moderne)", desc: "La nouvelle ville extraordinaire. Eau turquoise paradisiaque, Jet Ski, buildings modernes. Le luxe au bord de la Méditerranée.", icon: <Sun className="w-5 h-5" />, img: "/images/passions/sahel.jpg" }
      ]
    },
    morocco: {
      title: "Le Maroc",
      subtitle: "L'Ancrage Maternel",
      color: "from-red-600 to-red-900",
      accent: "text-red-500",
      bgImage: "/images/passions/hassan2.jpg",
      locations: [
        { name: "Casablanca (La Douceur)", desc: "La maison spacieuse de mon oncle. Ce qui marque ici, c'est le calme. Les goûters en famille, le thé, la paix familiale.", icon: <Utensils className="w-5 h-5" />, img: "/images/passions/casa.png" },
        { name: "Marrakech (L'Aventure)", desc: "L'hôtel, la piscine, les toboggans et l'effervescence unique de la place Jamaa el-Fna le soir.", icon: <Sun className="w-5 h-5" />, img: "/images/passions/agadir.png" },
        { name: "Nador (Nature & Racines)", desc: "Les racines de ma mère. La belle Méditerranée sauvage. La forêt, la nature brute. Le ressourcement total.", icon: <Waves className="w-5 h-5" />, img: "/images/passions/nador.png" }
      ]
    }
  };

  // --- STATS ---
  const stats = [
    { label: "Projets", value: "15+", icon: <Briefcase className="w-5 h-5 text-teal-500"/> },
    { label: "Clients", value: "5", icon: <Users className="w-5 h-5 text-cyan-500"/> },
    { label: "Années Exp.", value: "3", icon: <Star className="w-5 h-5 text-yellow-400"/> },
    { label: "Lignes de Code", value: "45k", icon: <FileCode className="w-5 h-5 text-emerald-500"/> },
    { label: "Technologies", value: "20+", icon: <Layers className="w-5 h-5 text-blue-400"/> },
    { label: "Commits Git", value: "350+", icon: <GitCommit className="w-5 h-5 text-pink-400"/> },
  ];

// --- STACK TECHNIQUE (COMPLÈTE & CLASSÉE) ---
  const techStackStructured = {
    "Langages & Fondamentaux": [
      { name: "HTML / CSS", projects: "12+", icon: <Layout />, color: "text-orange-400", gradient: "from-orange-400 to-red-500" },
      { name: "JavaScript", projects: 6, icon: <FileCode />, color: "text-yellow-400", gradient: "from-yellow-400 to-orange-500" },
      { name: "Java", projects: 5, icon: <Code2 />, color: "text-orange-500", gradient: "from-orange-500 to-red-600" },
      { name: "SQL", projects: 5, icon: <Database />, color: "text-pink-400", gradient: "from-pink-400 to-rose-600" },
      { name: "PHP", projects: 4, icon: <Terminal />, color: "text-indigo-400", gradient: "from-indigo-400 to-purple-600" },
      { name: "Python", projects: 3, icon: <Code2 />, color: "text-emerald-400", gradient: "from-emerald-400 to-green-600" },
      { name: "Bash", projects: 3, icon: <Terminal />, color: "text-gray-400", gradient: "from-gray-400 to-gray-600" },
      { name: "Dart", projects: 2, icon: <Smartphone />, color: "text-cyan-400", gradient: "from-cyan-400 to-blue-500" },
      { name: "TypeScript", projects: 1, icon: <FileCode />, color: "text-blue-400", gradient: "from-blue-400 to-cyan-500" },
      { name: "C++", projects: 1, icon: <Braces />, color: "text-blue-600", gradient: "from-blue-600 to-indigo-700" },
    ],
    "Frameworks & Web": [
      { name: "AJAX / JSON", projects: 6, icon: <FileJson />, color: "text-gray-400", gradient: "from-gray-400 to-gray-600" },
      { name: "Bootstrap", projects: 4, icon: <Layout />, color: "text-purple-500", gradient: "from-purple-500 to-indigo-600" },
      { name: "Tailwind CSS", projects: 3, icon: <Layout />, color: "text-cyan-400", gradient: "from-cyan-400 to-teal-500" },
      { name: "API REST", projects: 3, icon: <Globe />, color: "text-green-400", gradient: "from-green-400 to-teal-500" },
      { name: "Laravel", projects: 2, icon: <Layers />, color: "text-red-500", gradient: "from-red-500 to-rose-600" },
      { name: "React", projects: 2, icon: <Globe />, color: "text-cyan-400", gradient: "from-cyan-400 to-blue-500" },
      { name: "Flutter", projects: 2, icon: <Smartphone />, color: "text-sky-400", gradient: "from-sky-400 to-blue-600" },
      { name: "Node.js", projects: 2, icon: <Server />, color: "text-green-500", gradient: "from-green-500 to-emerald-600" },
      { name: "Blade", projects: 2, icon: <FileCode />, color: "text-red-400", gradient: "from-red-400 to-orange-500" },
      { name: "Spring Boot", projects: 1, icon: <Server />, color: "text-green-500", gradient: "from-green-500 to-emerald-700" },
      { name: "Flask", projects: 1, icon: <Server />, color: "text-gray-300", gradient: "from-gray-300 to-gray-500" },
      { name: "JWT", projects: 1, icon: <Lock />, color: "text-yellow-500", gradient: "from-yellow-500 to-amber-600" },
      { name: "jQuery", projects: 1, icon: <FileJson />, color: "text-blue-600", gradient: "from-blue-600 to-indigo-500" },
    ],
    "Architecture & Conception": [
      { name: "UML", projects: 8, icon: <Activity />, color: "text-yellow-600", gradient: "from-yellow-600 to-amber-700" },
      { name: "MVC", projects: "5+", icon: <Layers />, color: "text-indigo-500", gradient: "from-indigo-500 to-purple-600" },
      { name: "SOLID", projects: 5, icon: <ShieldCheck />, color: "text-blue-500", gradient: "from-blue-500 to-cyan-600" },
      { name: "MVVM", projects: "4+", icon: <Smartphone />, color: "text-rose-500", gradient: "from-rose-500 to-pink-600" },
      { name: "Clean Code", projects: 3, icon: <Sparkles />, color: "text-teal-500", gradient: "from-teal-500 to-emerald-600" },
      { name: "TDD", projects: 2, icon: <CheckCircle2 />, color: "text-green-500", gradient: "from-green-500 to-emerald-600" },
    ],
    "Données & Stockage": [
      { name: "MySQL", projects: 6, icon: <Database />, color: "text-blue-500", gradient: "from-blue-500 to-cyan-600" },
      { name: "phpMyAdmin", projects: 4, icon: <Settings />, color: "text-orange-300", gradient: "from-orange-300 to-yellow-500" },
      { name: "PostgreSQL", projects: 3, icon: <Database />, color: "text-indigo-400", gradient: "from-indigo-400 to-blue-500" },
      { name: "SQLite", projects: 2, icon: <HardDrive />, color: "text-sky-400", gradient: "from-sky-400 to-blue-500" },
      { name: "Firebase", projects: 2, icon: <Cloud />, color: "text-yellow-500", gradient: "from-yellow-500 to-orange-600" },
      { name: "MongoDB", projects: 1, icon: <Database />, color: "text-green-500", gradient: "from-green-500 to-emerald-600" },
      { name: "Redis", projects: 1, icon: <Database />, color: "text-red-500", gradient: "from-red-500 to-rose-600" },
    ],
    "DevOps, Outils & Serveurs": [
      { name: "Git / GitHub", projects: 12, icon: <GitBranch />, color: "text-orange-600", gradient: "from-orange-600 to-red-600" },
      { name: "Linux", projects: 8, icon: <Terminal />, color: "text-yellow-300", gradient: "from-yellow-300 to-amber-500" },
      { name: "Maven", projects: 4, icon: <Wrench />, color: "text-red-500", gradient: "from-red-500 to-rose-600" },
      { name: "Jira / Freedcamp", projects: 3, icon: <Layout />, color: "text-blue-500", gradient: "from-blue-500 to-cyan-600" },
      { name: "VirtualBox", projects: 3, icon: <Box />, color: "text-blue-300", gradient: "from-blue-300 to-indigo-400" },
      { name: "GitLab", projects: 2, icon: <GitBranch />, color: "text-orange-500", gradient: "from-orange-500 to-red-500" },
      { name: "Docker", projects: 2, icon: <Box />, color: "text-blue-500", gradient: "from-blue-500 to-indigo-600" },
      { name: "Composer", projects: 2, icon: <Box />, color: "text-amber-600", gradient: "from-amber-600 to-orange-700" },
      { name: "Postman", projects: 2, icon: <Send />, color: "text-orange-500", gradient: "from-orange-500 to-red-500" },
      { name: "Vagrant", projects: 2, icon: <Box />, color: "text-blue-400", gradient: "from-blue-400 to-cyan-500" },
      { name: "Figma / Readdy", projects: 2, icon: <Layout />, color: "text-purple-400", gradient: "from-purple-400 to-pink-500" },
      { name: "Jenkins", projects: 1, icon: <Settings />, color: "text-red-300", gradient: "from-red-300 to-orange-400" },
      { name: "Nginx", projects: 1, icon: <Server />, color: "text-green-400", gradient: "from-green-400 to-emerald-500" },
      { name: "Apache Tomcat", projects: 1, icon: <Server />, color: "text-yellow-600", gradient: "from-yellow-600 to-orange-700" },
    ],
    "IDE & Productivité": [
      { name: "VS Code", projects: 12, icon: <Monitor />, color: "text-blue-500", gradient: "from-blue-500 to-cyan-500" },
      { name: "IntelliJ IDEA", projects: 10, icon: <Monitor />, color: "text-purple-500", gradient: "from-purple-500 to-pink-600" },
      { name: "Prompt IA", projects: 7, icon: <Sparkles />, color: "text-fuchsia-400", gradient: "from-fuchsia-400 to-purple-600" },
      { name: "NetBeans", projects: 2, icon: <Layout />, color: "text-teal-400", gradient: "from-teal-400 to-green-500" },
      { name: "Xcode", projects: 1, icon: <Monitor />, color: "text-blue-300", gradient: "from-blue-300 to-sky-400" },
    ]
  };

  // --- PROJETS ---
  const projects = [
    {
      id: 1,
      title: "Frigo Recette",
      desc: "Application intelligente qui génère des recettes basées sur le contenu de votre frigo.",
      longDesc: "Face au gaspillage alimentaire, j'ai conçu cette solution mobile en Dart/Flutter. L'application croise votre stock réel avec une base de données culinaire. Le défi technique résidait dans l'optimisation des requêtes SQLite locales pour garantir une fluidité parfaite hors ligne.",
      features: ["Algorithme anti-gaspillage", "Mode Hors-ligne (SQLite)", "UX optimisée mobile", "Scan d'ingrédients"],
      tags: ["Dart", "Flutter", "SQLite", "MVVM"],
      image: "/images/frigo.webp",
      github: "https://github.com/DevKosX/S501_Developpement",
      icon: <Database className="w-10 h-10 text-teal-400" />
    },
    {
      id: 2,
      title: "Find My Word",
      desc: "Jeu interactif de devinette de mots en temps réel.",
      longDesc: "Projet Swing/Java démontrant une robustesse logicielle via une approche TDD stricte avec JUnit. Chaque interaction est testée pour garantir zéro bug. Un code ludique mais industriel.",
      features: ["Architecture modulaire", "Tests > 90%", "Algo de dictionnaire", "Swing GUI"],
      tags: ["Java", "JUnit", "Swing", "TDD"],
      image: "/images/find.jpg",
      github: "https://github.com/bouchaiblemaire/r5a8_junit_tests",
      icon: <Terminal className="w-10 h-10 text-teal-400" />
    },
    {
      id: 3,
      title: "POC Redis VS Mongo",
      desc: "Comparaison de performance NoSQL sur une simulation type 'Uber Eats'.",
      longDesc: "Benchmark technique pour départager Redis et MongoDB sur du tracking GPS temps réel. Simulation de milliers d'écritures pour analyser latence et débit.",
      features: ["Benchmark performance", "Analyse chiffrée", "Docker Microservices", "Charge lourde"],
      tags: ["Mongo", "Redis", "NoSQL", "Big Data"],
      image: "/images/uber.webp",
      github: "https://github.com/DevKosX/Projet-UberEats-BDD_Version2",
      icon: <Server className="w-10 h-10 text-teal-400" />
    },
    {
      id: 4,
      title: "France Academy",
      desc: "Plateforme de gestion des formations et utilisateurs.",
      longDesc: "App web d'envergure sous Laravel. Gestion de rôles complexes (Admin, Prof, Élève) et relations de données imbriquées. Architecture MVC stricte et sécurisée.",
      features: ["Sécurité & ACL", "MVC scalable", "Base de données complexe", "Responsive"],
      tags: ["Laravel", "PHP", "Ajax", "MySQL"],
      image: "/images/france-academy.png",
      github: "https://github.com/DevKosX/FranceAcademy",
      icon: <Globe className="w-10 h-10 text-teal-400" />
    },
    {
      id: 5,
      title: "Stagelys",
      desc: "ERP de gestion des stages universitaires.",
      longDesc: "Digitalisation complète du processus de stage : conventions, signatures, rapports. Analyse fine des processus métiers de l'université.",
      features: ["Digitalisation métier", "PDF dynamique", "Notifications", "Dashboard stats"],
      tags: ["PHP", "HTML/CSS", "JS", "MVC"],
      image: "/images/stago.jpg",
      github: "https://github.com/DevKosX/GestionDesStagesProject",
      icon: <Database className="w-10 h-10 text-teal-400" />
    },
    {
      id: 6,
      title: "Site 24H de l'Info",
      desc: "Site vitrine interactif pour l'événement national IUT.",
      longDesc: "Site officiel immersif pour les '24h de l'Info'. Présentation du programme, défis temps réel et partenaires avec une identité visuelle forte.",
      features: ["UI/UX immersif", "Communication", "Multimédia", "Responsive"],
      tags: ["Web Design", "Wix", "Event"],
      image: "/images//passions/24Info.png",
      website: "https://akd9380devlg.wixsite.com/24h-de-l",
      github: null,
      icon: <Layout className="w-10 h-10 text-teal-400" />
    },
    {
      id: 7,
      title: "Calculatrice Objet",
      desc: "Calculatrice architecturée en Pattern Command (POO).",
      longDesc: "Étude de cas POO. Utilisation du pattern Command pour encapsuler les opérations, rendant le code extensible sans toucher au cœur.",
      features: ["Pattern Command", "Découplage", "Gestion erreurs", "Extensible"],
      tags: ["Java", "POO", "Patterns", "UML"],
      image: "/images/calculatrice.png",
      github: "https://github.com/DevKosX/CalculatriceJavaV2",
      icon: <Calculator className="w-10 h-10 text-teal-400" />
    },
    {
      id: 8,
      title: "Jeu du Fakir",
      desc: "Simulation Planche de Galton (Hackathon).",
      longDesc: "Projet Hackathon 24h. Simulation visuelle de probabilités mathématiques. Travail d'équipe sous haute pression.",
      features: ["Développement Agile", "Travail d'équipe", "Visualisation Données"],
      tags: ["Java", "Hackathon", "Agile"],
      image: "/images/fakir.jpg",
      github: null,
      icon: <Code2 className="w-10 h-10 text-teal-400" />
    },
    {
      id: 9,
      title: "Observatoire Juvisy",
      desc: "Recueil de besoins et analyse technique.",
      longDesc: "Mission de consulting. Traduction des besoins opérationnels en spécifications techniques (UML, User Stories) pour la refonte du SI.",
      features: ["Ingénierie exigences", "UML avancé", "Interviews", "Maquettage"],
      tags: ["Analyse", "UML", "Figma", "Doc"],
      image: "/images/recueil-besoin.jpg",
      github: "https://github.com/DevKosX/ObservatoireDeJuvisy",
      icon: <Terminal className="w-10 h-10 text-teal-400" />
    },
    {
      id: 10,
      title: "Bootage RPi SSD",
      desc: "Config bas niveau Raspberry Pi sur SSD.",
      longDesc: "Administration système. Contournement des limitations carte SD pour boot sur SSD. Maîtrise kernel Linux, fstab et permissions.",
      features: ["SysAdmin Linux", "Hardware", "Bash", "Storage"],
      tags: ["Linux", "Bash", "Hardware"],
      image: "/images/raspberry-boot.jpg",
      github: null,
      icon: <Cpu className="w-10 h-10 text-teal-400" />
    },
    {
      id: 11,
      title: "BDD Freedom",
      desc: "Conception Base de Données Merise & SQL.",
      longDesc: "Conception de A à Z d'une BDD complexe. Méthode Merise pour l'intégrité. Implémentation PostgreSQL avec procédures stockées.",
      features: ["MCD/MLD", "SQL Avancé", "Intégrité", "Procédures"],
      tags: ["SQL", "Postgres", "Merise"],
      image: "/images/database-freedom.jpg",
      github: null,
      icon: <Database className="w-10 h-10 text-teal-400" />
    },
    {
      id: 12,
      title: "Santa Claus Algo",
      desc: "Optimisation de trajet (Voyageur de Commerce).",
      longDesc: "Défi algorithmique Python. Résolution du problème du voyageur de commerce à grande échelle via heuristiques et théorie des graphes.",
      features: ["Théorie Graphes", "Optimisation", "Data Structures"],
      tags: ["Python", "Algo", "Heuristics"],
      image: "/images/santa-claus.jpg",
      github: null,
      icon: <Code2 className="w-10 h-10 text-teal-400" />
    }
  ];

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#dashboard", label: "Expériences" },
    { href: "#projets", label: "Projets" },
    { href: "#stack", label: "Stack" },
    { href: "#about", label: "À Propos" },
    { href: "#passions", label: "Passions" },
    { href: "#contact", label: "Contact" },
  ];

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // STYLES DYNAMIQUES (FIX LIGHT/DARK)
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
    inputBg: isDarkMode ? "bg-[#1a1a24]" : "bg-white",
    inputBorder: isDarkMode ? "border-white/10" : "border-gray-300",
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} font-sans overflow-x-hidden transition-colors duration-300`}>
        
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 ${themeClasses.navBg} backdrop-blur-md border-b ${themeClasses.navBorder} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold relative z-50">
            <span className={themeClasses.text}>MK</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">.DEV</span>
          </h1>
            
          <div className={`hidden md:flex space-x-6 text-xs md:text-sm font-medium ${themeClasses.textMuted}`}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-teal-500 transition-colors">
                {link.label}
              </a>
            ))}
          </div>
            
          <button 
            onClick={toggleTheme}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-all`}
            title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDarkMode ? <SunMedium className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-teal-600" />}
          </button>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="focus:outline-none">
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-teal-600" />}
            </button>
            <button 
              className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} relative z-50 focus:outline-none`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

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
                  className={`text-2xl font-bold ${themeClasses.text} hover:text-teal-500 transition-colors`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- MODALE --- */}
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
              <button 
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 p-3 rounded-full ${isDarkMode ? 'bg-black/70 text-white hover:bg-black' : 'bg-white/70 text-black hover:bg-white'} transition-all z-50 shadow-lg border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="h-64 sm:h-80 w-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#111]' : 'from-white'} to-transparent z-10`} />
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display='none'; e.target.parentNode.style.backgroundColor = isDarkMode ? '#1a1a1a' : '#f3f4f6'; }}
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

              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <h3 className={`text-lg font-bold ${themeClasses.text} mb-3 flex items-center gap-2`}>
                    <Terminal className="w-5 h-5 text-teal-400" /> À propos du projet
                  </h3>
                  <p className={`${themeClasses.textMuted} leading-relaxed text-lg`}>
                    {selectedProject.longDesc || selectedProject.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className={`text-lg font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
                      <Star className="w-5 h-5 text-yellow-400" /> Fonctionnalités Clés
                    </h3>
                    <ul className="space-y-3">
                      {(selectedProject.features || []).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className={themeClasses.textMuted}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
                      <Layers className="w-5 h-5 text-purple-400" /> Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, idx) => (
                        <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={`pt-6 border-t ${themeClasses.cardBorder} flex flex-wrap gap-4 justify-end`}>
                  {selectedProject.website && (
                    <a href={selectedProject.website} target="_blank" rel="noopener noreferrer" className="p-4 bg-gradient-to-r from-cyan-600 to-teal-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg border border-white/10 group flex items-center gap-2">
                      <Smartphone className="w-8 h-8 group-hover:text-white transition-colors" />
                    </a>
                  )}
                  {selectedProject.github ? (
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-black text-white rounded-full hover:scale-110 transition-transform shadow-lg border border-white/10 group">
                      <Github className="w-8 h-8 group-hover:text-teal-400 transition-colors" />
                    </a>
                  ) : (
                    <div className={`p-4 rounded-full cursor-not-allowed ${isDarkMode ? 'bg-gray-800 text-gray-500' : 'bg-gray-200 text-gray-400'}`}>
                      <Lock className="w-8 h-8" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO --- */}
      <SectionWrapper id="accueil" className="relative min-h-screen flex items-center justify-center pt-20">
        <motion.div 
          className="absolute top-20 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.1, 1], y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { 
                  staggerChildren: 0.2 
                } 
              }
            }}
          >
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-teal-500 font-medium mb-4 tracking-wide">Salut, je suis</motion.p>
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className={themeClasses.text}>Mohamed</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Kosbar</span>
            </motion.h1>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={`${themeClasses.textMuted} text-lg mb-8 max-w-lg leading-relaxed h-12`}>
<Typewriter text={["Conception d'Architectures Web & Mobiles.", " Spécialisé en Java, React & DevOps.", " Disponible pour un stage de 14 semaines."]} />            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-4">
              <a href="#projets" className={`px-8 py-3 font-bold rounded-full transition-colors text-center ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>Voir mes projets</a>
              <div className="flex gap-4 items-center justify-center sm:justify-start px-4">
                <a href="https://github.com/DevKosX" target="_blank"><Github className={`w-6 h-6 ${themeClasses.textMuted} hover:text-teal-500 cursor-pointer transition-colors`} /></a>
                <a href="https://www.linkedin.com/in/mohamed-kosbar-5a57972ba/" target="_blank"><Linkedin className={`w-6 h-6 ${themeClasses.textMuted} hover:text-teal-500 cursor-pointer transition-colors`} /></a>
              </div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center mt-8 lg:mt-0">
            <div className={`w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-teal-500/20 to-cyan-600/20 rounded-full border ${themeClasses.navBorder} backdrop-blur-3xl flex items-center justify-center shadow-2xl shadow-teal-500/10 animate-[spin_10s_linear_infinite]`}>
              <div className={`w-2/3 h-2/3 ${isDarkMode ? 'bg-black/40' : 'bg-white/40'} rounded-full flex items-center justify-center border ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
                <Code2 className="w-20 h-20 text-teal-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* --- DASHBOARD --- */}
      <SectionWrapper id="dashboard" className={`py-32 ${themeClasses.sectionBgAlt} relative overflow-hidden`}>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="text-center mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6">
               <Calendar className="w-4 h-4 text-teal-500" />
               <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Chronologie</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-extrabold mb-16 tracking-tight">
               <span className={themeClasses.text}>Mon</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Parcours</span>
             </h2>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
             <div className="lg:col-span-7 space-y-12">
               {[
                 { title: "Développeur Full-Stack", date: "2022 - Présent", desc: "3 ans d'expérience cumulée (académique & projets).", icon: <Code2 />, color: "text-teal-500" },
                 { title: "Stage Développeur - Devea", date: "Jan 2025 - Mars 2025", desc: "Développement Full-Stack Laravel PHP.", icon: <Briefcase />, color: "text-cyan-500" },
                 { title: "Bénévole 24H de l'Info", date: "Mai 2024 - Juin 2024", desc: "Technique organisation de l'événement.", icon: <Users />, color: "text-yellow-400" },
                 { title: "Coach U11 - ASJA", date: "Oct 2021 - Mai 2022", desc: "Encadrement sportif, pédagogie et gestion d'équipe pour les jeunes (U11).", icon: <Trophy />, color: "text-green-500" },
                 { title: "Stage - OFW Ships", date: "Déc 2019 - Jan 2020", desc: "Découverte IT en entreprise.", icon: <Globe />, color: "text-blue-400" }
               ].map((item, index) => (
                 <motion.div key={index} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: index * 0.1 }} className={`relative group pl-8 lg:pl-0 flex flex-col lg:flex-row gap-6 items-center`}>
                   <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800 lg:hidden" />
                   <div className={`relative z-10 w-16 h-16 rounded-2xl ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} border border-gray-700 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                     <div className={`p-3 rounded-xl bg-opacity-10 bg-current ${item.color}`}><div className={item.color}>{item.icon}</div></div>
                   </div>
                   <div className={`flex-1 w-full ${themeClasses.cardBg} p-6 rounded-2xl border ${themeClasses.cardBorder} hover:border-teal-500/30 transition-all shadow-lg group-hover:shadow-teal-500/5`}>
                     <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                       <h4 className={`text-xl font-bold ${themeClasses.text}`}>{item.title}</h4>
                       <span className="text-xs font-mono py-1 px-2 rounded bg-gray-800 text-gray-400 border border-gray-700 mt-2 sm:mt-0 w-fit">{item.date}</span>
                     </div>
                     <p className={themeClasses.textMuted}>{item.desc}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
             <div className="lg:col-span-5 lg:sticky lg:top-32">
                <div className="grid grid-cols-2 gap-4">
                   {stats.map((stat, idx) => (
                     <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors aspect-square shadow-xl backdrop-blur-sm`}>
                       <div className={`mb-3 ${stat.icon.props.className.includes('text-') ? stat.icon.props.className : 'text-gray-400'}`}>{stat.icon}</div>
                       <h4 className={`text-3xl lg:text-4xl font-black ${themeClasses.text} mb-1`}><AnimatedCounter value={stat.value} /></h4>
                       <p className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted}`}>{stat.label}</p>
                     </motion.div>
                   ))}
                </div>
             </div>
           </div>
         </div>
      </SectionWrapper>

      {/* --- PROJETS --- */}
      <SectionWrapper id="projets" className={`py-32 ${isDarkMode ? 'bg-[#080808]' : 'bg-gray-100'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
             <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
               <span className={themeClasses.text}>Projets</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Réalisés</span>
             </h2>
             <p className={`${themeClasses.textMuted} text-center max-w-xl`}>Une galerie de mes réalisations, alliant technique et créativité.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((item) => (
              <div key={item.id} className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/5" onClick={() => setSelectedProject(item)}>
                <div className="absolute inset-0 bg-gray-900">
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:blur-[2px]" onError={(e) => {e.target.style.display='none';}} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {item.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-medium text-white bg-white/20 backdrop-blur-md rounded-full border border-white/10">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-teal-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">Découvrir <ArrowRight className="w-4 h-4" /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* --- STACK TECHNIQUE --- */}
      <SectionWrapper id="stack" className={`py-32 ${themeClasses.sectionBgDarker} transition-colors duration-300 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="space-y-20">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                 <span className={themeClasses.text}>Arsenal</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Détaillé</span>
               </h2>
               <p className={themeClasses.textMuted}>Exploration par domaine de compétence.</p>
            </div>
            {Object.entries(techStackStructured).map(([category, techs]) => (
              <div key={category} className="relative">
                <div className="flex items-center gap-6 mb-10">
                  <div className={`h-px flex-1 ${isDarkMode ? 'bg-gradient-to-r from-transparent to-gray-800' : 'bg-gray-300'}`} />
                  <span className={`text-2xl font-black uppercase tracking-widest ${themeClasses.text} border-2 border-dashed border-gray-700 px-6 py-2 rounded-lg`}>{category}</span>
                  <div className={`h-px flex-1 ${isDarkMode ? 'bg-gradient-to-l from-transparent to-gray-800' : 'bg-gray-300'}`} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {techs.map((tech) => (
                    <div key={tech.name} className={`group relative ${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-6 hover:border-transparent transition-all overflow-hidden`}>
                      <div className={`absolute inset-0 bg-gradient-to-r ${tech.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} style={{ padding: '1px', borderRadius: '1rem' }}><div className={`w-full h-full ${themeClasses.cardBg} rounded-2xl`} /></div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-white/5 ${tech.color} group-hover:scale-110 transition-transform`}>{tech.icon}</div>
                      </div>
                      <h4 className={`text-lg font-bold ${themeClasses.text} mb-2`}>{tech.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <div className={`w-1.5 h-1.5 rounded-full bg-current ${tech.color}`} />
                        <span>Utilisé dans {tech.projects} projets</span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-800">
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

      {/* --- A PROPOS --- */}
      <SectionWrapper id="about" className={`min-h-screen flex items-center py-24 ${themeClasses.sectionBgAlt} transition-colors duration-300 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className={themeClasses.text}>Identité</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Détectée</span>
            </h2>
            <p className={`${themeClasses.textMuted} text-lg`}>Initialisation du profil développeur...</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div initial={{ x: -50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className={`relative h-full ${isDarkMode ? 'bg-[#0a0a0a]/90' : 'bg-white/90'} backdrop-blur-xl p-8 rounded-3xl border ${themeClasses.cardBorder} flex flex-col items-center text-center`}>
                <div className="relative w-48 h-48 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-full border-2 border-teal-500/30 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 rounded-full border-2 border-cyan-500/30 animate-[spin_15s_linear_infinite_reverse]" />
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl relative">
                    <img src="/images/tiit.jpg" alt="Avatar" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.parentNode.style.backgroundColor='#1a1a1a'; }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-lg">LVL. 3</div>
                </div>
                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1`}>Mohamed Kosbar</h3>
                <p className="text-teal-500 font-mono text-sm mb-6">Développeur Full-Stack</p>
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} border ${themeClasses.cardBorder}`}>
                    <div className="text-xs text-gray-500 uppercase font-bold">XP</div><div className={`text-lg font-bold ${themeClasses.text}`}>3 Ans</div>
                  </div>
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} border ${themeClasses.cardBorder}`}>
                    <div className="text-xs text-gray-500 uppercase font-bold">Status</div><div className="text-lg font-bold text-green-500">Online</div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1"><span>Motivation</span><span>100%</span></div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-teal-500 to-cyan-600 w-full" /></div>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 space-y-6">
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className={`p-6 rounded-2xl border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-[#0a0a0a]/60' : 'bg-white/60'} backdrop-blur-md hover:border-teal-500/30 transition-colors group`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors"><GraduationCap className="w-6 h-6" /></div>
                  <div>
                    <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>Formation Académique</h4>
                    <p className={`${themeClasses.textMuted} leading-relaxed`}>Actuellement en <span className="text-teal-500 font-bold">3ème année de BUT Informatique</span>. Mon parcours académique m'a permis de construire des fondations solides en architecture logicielle, algorithmique complexe et gestion de bases de données.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className={`p-6 rounded-2xl border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-[#0a0a0a]/60' : 'bg-white/60'} backdrop-blur-md hover:border-purple-500/30 transition-colors group`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors"><BrainCircuit className="w-6 h-6" /></div>
                  <div>
                    <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>Vision & Approche</h4>
                    <p className={`${themeClasses.textMuted} leading-relaxed`}>Je navigue avec aisance entre le Backend (Java, PHP, Postgres) et le Frontend (React, Tailwind). Mon approche est centrée sur la qualité (Clean Code, SOLID) et l'expérience utilisateur.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className={`p-6 rounded-2xl border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-gradient-to-r from-teal-900/10 to-cyan-900/10' : 'bg-blue-50'} backdrop-blur-md border-teal-500/20 hover:border-teal-500/50 transition-colors group relative overflow-hidden`}>
                <div className="absolute top-0 right-0 p-4 opacity-10"><Rocket className="w-24 h-24 text-teal-500 rotate-45" /></div>
                <div className="flex items-start gap-4 relative z-10">
                  <div className="p-3 rounded-xl bg-teal-500/10 text-teal-500 group-hover:bg-teal-500/20 transition-colors animate-pulse"><Rocket className="w-6 h-6" /></div>
                  <div>
                    <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>Mission Actuelle</h4>
                    <p className={`${themeClasses.textMuted} leading-relaxed`}>À la recherche d'un <span className="text-teal-500 font-bold">stage de 14 à 16 semaines</span> pour valider mon année. Je suis prêt à intégrer votre équipe et apporter ma valeur ajoutée.</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-3">
                {["Curiosité", "Travail d'équipe", "Rigueur", "Autonomie", "Leader", "Clean Code", "Adaptabilité"].map((skill, idx) => (
                  <span key={idx} className={`px-4 py-2 rounded-full text-sm font-bold border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'} transition-colors cursor-default flex items-center gap-2`}>
                    <Sparkles className="w-3 h-3 text-yellow-500" />{skill}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* --- PASSIONS --- */}
      <SectionWrapper id="passions" className={`py-24 ${themeClasses.sectionBgDarker} relative overflow-hidden transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center">
            <span className={themeClasses.text}>Mes</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Passions</span> & Inspirations
          </h2>

          <div className="mb-24">
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-8 flex items-center gap-3`}><Plane className="w-6 h-6 text-teal-500" /> Odyssée Culturelle</h3>
            {!activeTrip && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-96 transition-all duration-500 ease-in-out">
                <div onClick={() => setActiveTrip('egypt')} className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border border-transparent hover:border-amber-500/50 transition-all duration-300">
                  <img src="/images/passions/jardin.jpg" alt="Egypte" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" onError={(e) => e.target.style.display='none'} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:bg-black/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-amber-400 font-bold tracking-widest text-sm uppercase mb-2 block">Mes origines paternelles</span>
                    <h4 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Égypte</h4>
                    <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">Découvrir Tanta, Alexandrie & Sahel <ArrowRight className="w-4 h-4" /></p>
                  </div>
                </div>
                <div onClick={() => setActiveTrip('morocco')} className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border border-transparent hover:border-red-500/50 transition-all duration-300">
                  <img src="/images/passions/hassan2.jpg" alt="Maroc" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" onError={(e) => e.target.style.display='none'} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:bg-black/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-red-400 font-bold tracking-widest text-sm uppercase mb-2 block">Mes origines maternelles</span>
                    <h4 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Maroc</h4>
                    <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">Découvrir Casa, Marrakech & Nador <ArrowRight className="w-4 h-4" /></p>
                  </div>
                </div>
              </div>
            )}
            {activeTrip && (
              <div className={`relative w-full bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border ${themeClasses.cardBorder} animate-in fade-in slide-in-from-bottom-10 duration-500`}>
                <div className={`relative h-48 md:h-64 overflow-hidden`}>
                  <img src={tripDetails[activeTrip].bgImage} className="w-full h-full object-cover opacity-40 blur-sm" onError={(e) => e.target.style.display='none'} />
                  <div className={`absolute inset-0 bg-gradient-to-b ${tripDetails[activeTrip].color} opacity-60 mix-blend-multiply`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <h3 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight drop-shadow-lg">{tripDetails[activeTrip].title}</h3>
                      <p className="text-xl text-white/90 font-light italic">{tripDetails[activeTrip].subtitle}</p>
                  </div>
                  <button onClick={() => setActiveTrip(null)} className="absolute top-4 right-4 bg-black/50 hover:bg-white/20 p-2 rounded-full text-white transition-all backdrop-blur-md z-20"><X className="w-6 h-6" /></button>
                </div>
                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tripDetails[activeTrip].locations.map((loc, idx) => (
                      <div key={idx} className="group bg-slate-900/50 rounded-xl p-4 hover:bg-slate-900 transition-colors duration-300 border border-transparent hover:border-gray-700">
                        <div className="h-40 w-full rounded-lg overflow-hidden mb-4 relative">
                            <img src={loc.img} alt={loc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => e.target.style.display='none'} />
                            <div className={`absolute top-2 right-2 bg-black/70 p-1.5 rounded-lg text-white`}>{loc.icon}</div>
                        </div>
                        <h5 className={`text-xl font-bold ${tripDetails[activeTrip].accent} mb-2`}>{loc.name}</h5>
                        <p className={`${themeClasses.textMuted} text-sm leading-relaxed`}>{loc.desc}</p>
                      </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className={`md:col-span-2 ${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-8 relative overflow-hidden group hover:border-green-500/30 transition-all shadow-md`}>
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Trophy className="w-48 h-48 text-green-500" /></div>
               <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}><HeartPulse className="w-6 h-6 text-green-500" /> Le Football, une école de vie</h3>
               <div className={`space-y-4 ${themeClasses.textMuted} relative z-10 leading-relaxed`}>
                 <p>Le football est bien plus qu'un sport pour moi. J'ai eu la chance d'atteindre un excellent niveau en évoluant en <span className={`${themeClasses.text} font-bold`}>U17 Nationaux avec Aubervilliers (Génération 2005)</span>. C'était l'école de la rigueur, de la tactique et du dépassement de soi.</p>
                 <p>Malheureusement, une blessure (la maladie d'Osgood-Schlatter) a freiné cette ascension. Mais cette épreuve m'a appris la résilience. J'ai transféré cette compétitivité et cette soif d'apprendre dans mes études et le développement informatique. Aujourd'hui, je code avec la même intensité que je jouais sur le terrain.</p>
               </div>
            </div>
            <div className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-8 flex flex-col justify-center hover:border-red-500/30 transition-all shadow-md`}>
               <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}><Tv className="w-6 h-6 text-red-500" /> Cinéphile</h3>
               <div className="space-y-6">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0"><img src="/images/passions/st.jpg" alt="Stranger Things" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} /></div>
                    <div><h4 className={`${themeClasses.text} font-bold group-hover:text-red-500 transition-colors`}>Stranger Things</h4><p className={`text-xs ${themeClasses.textMuted}`}>Mystère & Années 80</p></div>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0"><img src="/images/passions/echo.webp" alt="Echoes of the Past" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} /></div>
                    <div><h4 className={`${themeClasses.text} font-bold group-hover:text-yellow-500 transition-colors`}>Echoes of the Past</h4><p className={`text-xs ${themeClasses.textMuted}`}>Drame Égyptien</p></div>
                 </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`md:col-span-2 ${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-8 relative overflow-hidden group hover:border-teal-500/30 transition-all shadow-md`}>
               <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity"><Waves className="w-48 h-48 text-teal-500" /></div>
               <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}><Waves className="w-6 h-6 text-teal-500" /> La Natation, mon second souffle</h3>
               <div className={`space-y-4 ${themeClasses.textMuted} relative z-10 leading-relaxed`}>
                 <p>De très nul à médaillé, j’ai relevé un défi : apprendre à nager. Après une formation de deux semaines que j’ai beaucoup appréciée, j’ai poursuivi deux ans de natation pour obtenir mon diplôme, suivis d’une année de compétition. Cette discipline m’a apporté gainage et agilité, des atouts majeurs pour mon jeu au football et c'est devenu une passion.</p>
                 <p>Aujourd'hui, je nage partout : de l'Atlantique (Agadir, Deauville) à la Mer Rouge (Hurghada), en passant par le Nil. J'aime perfectionner mes plongeons et battre mes records d'apnée.</p>
               </div>
            </div>
            <div className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} rounded-2xl p-8 flex flex-col justify-center hover:border-purple-500/30 transition-all shadow-md`}>
               <h3 className={`text-2xl font-bold ${themeClasses.text} mb-6 flex items-center gap-3`}><Gamepad2 className="w-6 h-6 text-purple-500" /> Gamer</h3>
               <div className="space-y-6">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0"><img src="/images/fm.avif" alt="Football Manager" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} /></div>
                    <div><h4 className={`${themeClasses.text} font-bold group-hover:text-purple-500 transition-colors`}>Football Manager</h4><p className={`text-xs ${themeClasses.textMuted}`}>Stratégie & Gestion</p></div>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-16 h-20 bg-gray-800 rounded-lg overflow-hidden shrink-0"><img src="/images/last.jpg" alt="The Last of Us" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" onError={(e) => e.target.style.display='none'} /></div>
                    <div><h4 className={`${themeClasses.text} font-bold group-hover:text-green-500 transition-colors`}>The Last of Us</h4><p className={`text-xs ${themeClasses.textMuted}`}>Narratif & Émotion</p></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* --- CONTACT --- */}
      <SectionWrapper id="contact" className={`py-32 ${themeClasses.sectionBgAlt} relative overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              <span className={themeClasses.text}>Contactez</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Moi</span>
            </h2>
            <p className={`${themeClasses.textMuted} text-xl max-w-2xl mx-auto`}>Vous avez un projet de site web ou d'application mobile ? Discutons-en et construisons quelque chose d'exceptionnel.</p>
          </div>

          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 rounded-3xl overflow-hidden border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-white'} shadow-2xl`}>
            <div className={`p-10 flex flex-col justify-between ${isDarkMode ? 'bg-[#111]' : 'bg-gray-50'}`}>
               <div>
                  <h3 className={`text-2xl font-bold ${themeClasses.text} mb-8`}>Informations</h3>
                  <div className="space-y-8">
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-teal-500/10 rounded-lg text-teal-500 mt-1"><Mail className="w-6 h-6" /></div>
                        <div><p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">Email</p><a href="mailto:kosbarmohamed.31@gmail.com" className={`text-xl font-medium ${themeClasses.text} hover:text-teal-500 transition-colors`}>kosbarmohamed.31@gmail.com</a><p className="text-sm text-gray-500 mt-1">Réponse sous 24h</p></div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500 mt-1"><MapPin className="w-6 h-6" /></div>
                        <div><p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">Localisation</p><p className={`text-xl font-medium ${themeClasses.text}`}>Paris, France</p><p className="text-sm text-gray-500 mt-1">Disponible en télétravail</p></div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 mt-1"><Briefcase className="w-6 h-6" /></div>
                        <div><p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">Statut Actuel</p><div className="flex items-center gap-2"><span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span></span><p className={`text-xl font-medium ${themeClasses.text}`}>En recherche de stage</p></div></div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500 mt-1"><Activity className="w-6 h-6" /></div>
                        <div><p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">Réseau Live</p><div className="flex items-center gap-2"><Signal className={`w-4 h-4 ${ping < 50 ? 'text-green-500' : 'text-yellow-500'}`} /><p className={`text-xl font-medium ${themeClasses.text} font-mono`}>{ping} ms</p></div></div>
                     </div>
                  </div>
               </div>
               <div className="mt-12">
                  <p className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Réseaux Sociaux</p>
                  <div className="flex gap-4">
                     <a href="https://github.com/DevKosX" target="_blank" className={`p-4 rounded-xl ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'} ${themeClasses.text} transition-all hover:scale-110`}><Github className="w-6 h-6" /></a>
                     <a href="https://linkedin.com" target="_blank" className="p-4 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-[#0077b5] transition-all hover:scale-110"><Linkedin className="w-6 h-6" /></a>
                  </div>
               </div>
            </div>

            <div className="p-10 relative">
               {formStatus === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                     <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50"><CheckCircle2 className="w-12 h-12 text-green-500" /></div>
                     <div><h3 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>Message Prêt !</h3><p className="text-gray-400 text-lg">Votre client mail va s'ouvrir pour finaliser l'envoi.</p></div>
                     <button onClick={() => setFormStatus('idle')} className="text-teal-500 font-bold hover:underline mt-4">Envoyer un autre message</button>
                  </div>
               ) : (
                  <form onSubmit={handleSendMessage} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-bold uppercase tracking-wide text-gray-500">Nom Complet</label>
                           <input 
                             type="text" 
                             name="name"
                             value={formData.name}
                             onChange={handleInputChange}
                             required 
                             placeholder="Votre nom" 
                             className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} focus:border-teal-500 rounded-xl px-4 py-4 ${themeClasses.text} placeholder-gray-500 outline-none transition-colors`} 
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-sm font-bold uppercase tracking-wide text-gray-500">Email</label>
                           <input 
                             type="email" 
                             name="email"
                             value={formData.email}
                             onChange={handleInputChange}
                             required 
                             placeholder="votre@email.com" 
                             className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} focus:border-teal-500 rounded-xl px-4 py-4 ${themeClasses.text} placeholder-gray-500 outline-none transition-colors`} 
                           />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-gray-500">Sujet de Discussion</label>
                        <select 
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} focus:border-teal-500 rounded-xl px-4 py-4 ${themeClasses.text} outline-none transition-colors appearance-none`}
                        >
                           <option>Développement Site Web</option>
                           <option>Application Mobile</option>
                           <option>Proposition de Stage / Emploi</option>
                           <option>Discussion Technique</option>
                           <option>Autre demande</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold uppercase tracking-wide text-gray-500">Message</label>
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows="5" 
                          required 
                          placeholder="Parlez-moi de votre projet..." 
                          className={`w-full ${themeClasses.inputBg} border ${themeClasses.inputBorder} focus:border-teal-500 rounded-xl px-4 py-4 ${themeClasses.text} placeholder-gray-500 outline-none resize-none transition-colors`}
                        ></textarea>
                     </div>
                    <button type="submit" disabled={formStatus === 'sending'} className="group relative w-full py-5 rounded-xl overflow-hidden border border-teal-500/50 text-teal-600 font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] hover:border-teal-400">
                      <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-teal-500 to-cyan-600 transition-transform duration-500 ease-out" />
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">{formStatus === 'sending' ? 'Préparation...' : 'Envoyer le message'}</span>
                    </button>
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