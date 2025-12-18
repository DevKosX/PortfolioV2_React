import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

// --- TOUTES LES ICÔNES ---
import { 
  ShieldCheck, Box, GraduationCap, Github, Linkedin, Code2, Terminal, Database, Cpu, 
  Globe, Calculator, Layers, Server, Gamepad2, Plane, Trophy, 
  Briefcase, Users, FileCode, Star, Mail, Send, MapPin, 
  Tv, HeartPulse, Menu, X, GitCommit, Sun, Moon,
  CheckCircle2, ArrowRight, Lock, Smartphone, Waves,
  Sparkles, Layout, GitBranch, Cloud, Calendar,
  Utensils, Activity, Signal, FileJson, Braces, HardDrive, Monitor, Wrench, Settings,
  BrainCircuit, Rocket, SunMedium, Eye, ZoomIn, ScanLine, Fingerprint, Crosshair, Check,
  Workflow, TestTube // Icônes pour le dashboard technique
} from 'lucide-react';

// --- 1. COMPOSANT CANVAS PARTICLES (HERO BACKGROUND) ---
const ParticleBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    let particles = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      const numberOfParticles = width > 768 ? 100 : 50;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isDarkMode ? 'rgba(20, 184, 166, 0.5)' : 'rgba(13, 148, 136, 0.5)';
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Liaisons
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = isDarkMode 
              ? `rgba(20, 184, 166, ${0.2 - distance / 150})` 
              : `rgba(13, 148, 136, ${0.2 - distance / 150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    draw();

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
};

// --- 2. COMPOSANT TILT CARD (EFFET 3D) ---
const TiltCard = ({ children, className }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

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
const Typewriter = ({ text, delay = 50, infinite = true }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeStringIndex, setActiveStringIndex] = useState(0);

  const strings = Array.isArray(text) ? text : [text];

  useEffect(() => {
    let timeout;
    const currentString = strings[activeStringIndex];

    if (currentIndex < currentString.length) {
      timeout = setTimeout(() => {
        setCurrentText(prev => prev + currentString[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
    } else if (infinite && strings.length > 1) {
       timeout = setTimeout(() => {
         setCurrentText('');
         setCurrentIndex(0);
         setActiveStringIndex(prev => (prev + 1) % strings.length);
       }, 2000); 
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, strings, activeStringIndex]);

  return <span>{currentText}</span>;
};

const App = () => {
  // --- STATE PRINCIPAL ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null); 
  const [activeTrip, setActiveTrip] = useState(null); 
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // State pour l'animation "Scanner" de la section About
  const [scanComplete, setScanComplete] = useState(false);
   
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
    if (selectedProject || selectedExperience) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject, selectedExperience]);

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

  // --- DONNÉES PARCOURS (DÉTAILLÉES) ---
  const experiencesData = [
    { 
        id: 1,
        title: "Stage Développement Web", 
        company: "Devea SAS",
        date: "Jan 2025 - Mars 2025", 
        desc: "Développement Full-Stack Laravel PHP & France Academy.", 
        fullDesc: "J'ai effectué un stage intensif au sein de l'entreprise Devea, intégré à l'équipe de développement. Ce stage a été une véritable immersion professionnelle, centrée sur le développement d’un ERP interne et la participation au projet France Academy. J'ai travaillé principalement avec le framework Laravel (PHP) sur des modules métiers (gestion utilisateurs, formations, tableaux de bord). Cette expérience a renforcé mes compétences back-end et ma compréhension de l'architecture d'entreprise.",
        skills: ["Laravel (PHP)", "MySQL", "Architecture MVC", "Méthode Agile SCRUM", "Git/GitLab"],
        realizations: [
            "Participation au développement de l’ERP interne (modules utilisateurs, gestion des droits).",
            "Implémentation de fonctionnalités pour le projet France Academy.",
            "Écriture de requêtes optimisées et contrôleurs Laravel.",
            "Tests fonctionnels et corrections de bugs."
        ],
        images: ["/images/DEVEA.jpg", "/images/france-academy.png"],
        icon: <Briefcase />, 
        color: "text-cyan-500" 
    },
    { 
        id: 2,
        title: "Staff Technique & Organisation", 
        company: "24H de l'Info - IUT Villetaneuse",
        date: "Mai 2024 - Juin 2024", 
        desc: "Organisation complète de l'événement et support technique.", 
        fullDesc: "J’ai participé activement à l'organisation complète de l’événement '24H de l'Info'. Impliqué dans la planification logistique, la coordination des équipes, la gestion du matériel informatique et l'accueil. J’ai assuré la mise en place des espaces de travail, la communication avec les intervenants et l'encadrement des équipes. J'ai également créé un site pour recueillir les avis.",
        skills: ["Gestion de projet", "Support Réseau", "Communication", "Wix", "Logistique"],
        realizations: [
            "Organisation complète et accueil des participants.",
            "Préparation logistique des salles et postes informatiques.",
            "Coordination avec les équipes techniques et pédagogiques.",
            "Création du site de feedback (Wix)."
        ],
        images: ["/images/passions/24Info.png"],
        icon: <Users />, 
        color: "text-yellow-400" 
    },
    { 
              id: 4,
        title: "Développeur Full-Stack (BUT)", 
        company: "Projets Académiques & Personnels",
        date: "2023 - Présent", 
        desc: "3 ans d'apprentissage intensif et de projets concrets.", 
        fullDesc: "Depuis mon entrée en BUT Informatique, j'ai réalisé énormément de projets académiques et personnels. J'ai conçu des architectures mobiles et web complexes, en essayant toujours de réfléchir comme un développeur Full Stack confirmé. J'ai fait preuve d'une grande autonomie pour apprendre de nouvelles technologies (Flutter, React, Spring) en dehors du cursus classique.",
        skills: ["Autonomie", "Architecture Logicielle", "Full Stack (Java/JS)", "Mobile (Flutter)", "Auto-formation"],
        realizations: [
            "Développement d'applications mobiles complètes.",
            "Conception d'architectures Back-end robustes.",
            "Veille technologique constante."
        ],
        images: ["/images/frigo.webp", "/images/find.jpg"],
        icon: <Code2 />, 
        color: "text-teal-500" 
    },
    {   
               
        id: 3,
        title: "Assistant Coach U11", 
        company: "ASJA (Aubervilliers)",
        date: "Oct 2021 - Mai 2022", 
        desc: "Encadrement sportif et gestion tactique.", 
        fullDesc: "En tant que jeune assistant coach, j'ai aidé l'entraîneur principal à composer ses entraînements et à développer les jeunes joueurs de ma ville. Mon rôle impliquait de réfléchir aux tactiques en fonction des adversaires et d'assurer la cohésion du groupe. J'étais présent aux entraînements et aux matchs bénévolement. Nous avons réalisé une super saison, finissant à la 2ème place avec les benjamins d'Aubervilliers.",
        skills: ["Leadership", "Gestion de conflits", "Pédagogie", "Stratégie Tactique", "Travail d'équipe"],
        realizations: [
            "Vice-champion de la saison avec les Benjamins.",
            "Développement technique et tactique des jeunes.",
            "Gestion de la cohésion de groupe."
        ],
        images: ["/images/passions/st.jpg"], 
        icon: <Trophy />, 
        color: "text-green-500" 

    },
    { 
        id: 5,
        title: "Stage Découverte Maritime", 
        company: "OFW Ships",
        date: "Déc 2019 - Jan 2020", 
        desc: "Expérience immersive en Norvège.", 
        fullDesc: "Une expérience humaine et professionnelle inoubliable au sein d'OFW Ships (pêche en eaux salées). La première semaine dans les bureaux pour découvrir la logistique maritime. La seconde semaine, j’ai embarqué avec l’équipe sur un navire de pêche en Norvège. Une immersion totale qui m'a appris l'adaptabilité, le travail d'équipe en conditions difficiles et le fonctionnement de l'industrie.",
        skills: ["Adaptabilité", "Travail en conditions difficiles", "Logistique", "Communication internationale"],
        realizations: [
            "Immersion sur un navire en Norvège.",
            "Observation des opérations logistiques.",
            "Intégration dans un équipage professionnel."
        ],
        images: ["/images/ofw.jpg"],
        icon: <Globe />, 
        color: "text-blue-400" 
    }
  ];

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
      title: "Jeu du Fakir",
      desc: "Simulation Planche de Galton (Hackathon).",
      longDesc: "Projet Hackathon 24h. Simulation visuelle de probabilités mathématiques. Travail d'équipe sous haute pression. Visualisation des distributions normales.",
      features: ["Développement Agile", "Travail d'équipe", "Visualisation Données", "Algorithmes Probabilistes"],
      tags: ["Java", "Hackathon", "Agile"],
      image: "/images/fakir.jpg",
      github: null,
      icon: <Code2 className="w-10 h-10 text-teal-400" />
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
    { href: "#about", label: "À Propos" },
    { href: "#dashboard", label: "Expériences" },
    { href: "#projets", label: "Projets" },
    { href: "#stack", label: "Stack" },
    { href: "#passions", label: "Passions" },
    { href: "#contact", label: "Contact" },
  ];

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // STYLES DYNAMIQUES
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

  // --- DONNÉES VOYAGES & STACK ---
  const tripDetails = {
    egypt: {
      title: "L'Égypte",
      subtitle: "Mes Racines, Ma Terre",
      color: "from-yellow-600 to-amber-900",
      accent: "text-amber-500",
      bgImage: "/images/passions/jardin.jpg",
      locations: [
        { name: "Le Caire (La civilisation)", desc: "Une métropole bouillonnante et historique qui ne dort jamais. Les lumières, les Pyramides de Gizeh à l'horizon et une énergie urbaine incroyable.", icon: <Users className="w-5 h-5" />, img: "/images/passions/lecaire.png" },
        { name: "Alexandrie (La nocturne)", desc: "Une ville côtière inexplicable. Ici, la vie commence vraiment à 22h. Une vibe particulière face à la mer qui ne s'explique pas, elle se vit.", icon: <Moon className="w-5 h-5" />, img: "/images/passions/alexa.png" },
        { name: "Marassi (Le paradis moderne)", desc: "La nouvelle ville extraordinaire. Eau turquoise paradisiaque, Jet Ski, buildings modernes. Le luxe au bord de la Méditerranée.", icon: <Sun className="w-5 h-5" />, img: "/images/passions/sahel.jpg" }
      ]
    },
    morocco: {
      title: "Le Maroc",
      subtitle: "L'Ancrage Maternel",
      color: "from-red-600 to-red-900",
      accent: "text-red-500",
      bgImage: "/images/passions/casa.png",
      locations: [
        { name: "Casablanca (La Douceur)", desc: "La maison spacieuse de mon oncle. Ce qui marque ici, c'est le calme. Les goûters en famille, le thé, la paix familiale.", icon: <Utensils className="w-5 h-5" />, img: "/images/passions/hassan2.jpg" },
        { name: "Marrakech (L'Aventure)", desc: "L'hôtel, la piscine, les toboggans et l'effervescence unique de la place Jamaa el-Fna le soir.", icon: <Sun className="w-5 h-5" />, img: "/images/passions/mamara.png" },
        { name: "Nador (Nature & Racines)", desc: "Les racines de ma mère. La belle Méditerranée sauvage. La forêt, la nature brute. Le ressourcement total.", icon: <Waves className="w-5 h-5" />, img: "/images/passions/nador.png" }
      ]
    }
  };

  
  // --- STATS TECHNIQUES "HARD SKILLS" (8 items) ---
  const stats = [ 
    { label: "Projets", value: "15+", icon: <Briefcase className="w-5 h-5 text-teal-500"/> }, 
    { label: "Architecture MVC/MVVM", value: "80%", icon: <Workflow className="w-5 h-5 text-orange-400"/> },
    { label: "Années Exp.", value: "3", icon: <Star className="w-5 h-5 text-yellow-400"/> }, 
    { label: "Lignes de Code", value: "45k", icon: <FileCode className="w-5 h-5 text-emerald-500"/> }, 
    { label: "Technologies", value: "20+", icon: <Layers className="w-5 h-5 text-blue-400"/> }, 
    { label: "Commits Git", value: "350+", icon: <GitCommit className="w-5 h-5 text-pink-400"/> }, 
    // NOUVELLES STATS TECHNIQUES
    { label: "Code Coverage", value: "85%", icon: <TestTube className="w-5 h-5 text-purple-400"/> },
    { label: "Clients", value: "5", icon: <Users className="w-5 h-5 text-cyan-500"/> }, 

  ];

  const techStackStructured = { "Langages & Fondamentaux": [ { name: "HTML / CSS", projects: "12+", icon: <Layout />, color: "text-orange-400", gradient: "from-orange-400 to-red-500" }, { name: "JavaScript", projects: 6, icon: <FileCode />, color: "text-yellow-400", gradient: "from-yellow-400 to-orange-500" }, { name: "Java", projects: 5, icon: <Code2 />, color: "text-orange-500", gradient: "from-orange-500 to-red-600" }, { name: "SQL", projects: 5, icon: <Database />, color: "text-pink-400", gradient: "from-pink-400 to-rose-600" }, { name: "PHP", projects: 4, icon: <Terminal />, color: "text-indigo-400", gradient: "from-indigo-400 to-purple-600" }, { name: "Python", projects: 3, icon: <Code2 />, color: "text-emerald-400", gradient: "from-emerald-400 to-green-600" }, { name: "Bash", projects: 3, icon: <Terminal />, color: "text-gray-400", gradient: "from-gray-400 to-gray-600" }, { name: "Dart", projects: 2, icon: <Smartphone />, color: "text-cyan-400", gradient: "from-cyan-400 to-blue-500" }, { name: "TypeScript", projects: 1, icon: <FileCode />, color: "text-blue-400", gradient: "from-blue-400 to-cyan-500" }, { name: "C++", projects: 1, icon: <Braces />, color: "text-blue-600", gradient: "from-blue-600 to-indigo-700" }, ], "Frameworks & Web": [ { name: "AJAX / JSON", projects: 6, icon: <FileJson />, color: "text-gray-400", gradient: "from-gray-400 to-gray-600" }, { name: "Bootstrap", projects: 4, icon: <Layout />, color: "text-purple-500", gradient: "from-purple-500 to-indigo-600" }, { name: "Tailwind CSS", projects: 3, icon: <Layout />, color: "text-cyan-400", gradient: "from-cyan-400 to-teal-500" }, { name: "API REST", projects: 3, icon: <Globe />, color: "text-green-400", gradient: "from-green-400 to-teal-500" }, { name: "Laravel", projects: 2, icon: <Layers />, color: "text-red-500", gradient: "from-red-500 to-rose-600" }, { name: "React", projects: 2, icon: <Globe />, color: "text-cyan-400", gradient: "from-cyan-400 to-blue-500" }, { name: "Flutter", projects: 2, icon: <Smartphone />, color: "text-sky-400", gradient: "from-sky-400 to-blue-600" }, { name: "Node.js", projects: 2, icon: <Server />, color: "text-green-500", gradient: "from-green-500 to-emerald-600" }, { name: "Blade", projects: 2, icon: <FileCode />, color: "text-red-400", gradient: "from-red-400 to-orange-500" }, { name: "Spring Boot", projects: 1, icon: <Server />, color: "text-green-500", gradient: "from-green-500 to-emerald-700" }, { name: "Flask", projects: 1, icon: <Server />, color: "text-gray-300", gradient: "from-gray-300 to-gray-500" }, { name: "JWT", projects: 1, icon: <Lock />, color: "text-yellow-500", gradient: "from-yellow-500 to-amber-600" }, { name: "jQuery", projects: 1, icon: <FileJson />, color: "text-blue-600", gradient: "from-blue-600 to-indigo-500" }, ], "Architecture & Conception": [ { name: "UML", projects: 8, icon: <Activity />, color: "text-yellow-600", gradient: "from-yellow-600 to-amber-700" }, { name: "MVC", projects: "5+", icon: <Layers />, color: "text-indigo-500", gradient: "from-indigo-500 to-purple-600" }, { name: "SOLID", projects: 5, icon: <ShieldCheck />, color: "text-blue-500", gradient: "from-blue-500 to-cyan-600" }, { name: "MVVM", projects: "4+", icon: <Smartphone />, color: "text-rose-500", gradient: "from-rose-500 to-pink-600" }, { name: "Clean Code", projects: 3, icon: <Sparkles />, color: "text-teal-500", gradient: "from-teal-500 to-emerald-600" }, { name: "TDD", projects: 2, icon: <CheckCircle2 />, color: "text-green-500", gradient: "from-green-500 to-emerald-600" }, ], "Données & Stockage": [ { name: "MySQL", projects: 6, icon: <Database />, color: "text-blue-500", gradient: "from-blue-500 to-cyan-600" }, { name: "phpMyAdmin", projects: 4, icon: <Settings />, color: "text-orange-300", gradient: "from-orange-300 to-yellow-500" }, { name: "PostgreSQL", projects: 3, icon: <Database />, color: "text-indigo-400", gradient: "from-indigo-400 to-blue-500" }, { name: "SQLite", projects: 2, icon: <HardDrive />, color: "text-sky-400", gradient: "from-sky-400 to-blue-500" }, { name: "Firebase", projects: 2, icon: <Cloud />, color: "text-yellow-500", gradient: "from-yellow-500 to-orange-600" }, { name: "MongoDB", projects: 1, icon: <Database />, color: "text-green-500", gradient: "from-green-500 to-emerald-600" }, { name: "Redis", projects: 1, icon: <Database />, color: "text-red-500", gradient: "from-red-500 to-rose-600" }, ], "DevOps, Outils & Serveurs": [ { name: "Git / GitHub", projects: 12, icon: <GitBranch />, color: "text-orange-600", gradient: "from-orange-600 to-red-600" }, { name: "Linux", projects: 8, icon: <Terminal />, color: "text-yellow-300", gradient: "from-yellow-300 to-amber-500" }, { name: "Maven", projects: 4, icon: <Wrench />, color: "text-red-500", gradient: "from-red-500 to-rose-600" }, { name: "Jira / Freedcamp", projects: 3, icon: <Layout />, color: "text-blue-500", gradient: "from-blue-500 to-cyan-600" }, { name: "VirtualBox", projects: 3, icon: <Box />, color: "text-blue-300", gradient: "from-blue-300 to-indigo-400" }, { name: "GitLab", projects: 2, icon: <GitBranch />, color: "text-orange-500", gradient: "from-orange-500 to-red-500" }, { name: "Docker", projects: 2, icon: <Box />, color: "text-blue-500", gradient: "from-blue-500 to-indigo-600" }, { name: "Composer", projects: 2, icon: <Box />, color: "text-amber-600", gradient: "from-amber-600 to-orange-700" }, { name: "Postman", projects: 2, icon: <Send />, color: "text-orange-500", gradient: "from-orange-500 to-red-500" }, { name: "Vagrant", projects: 2, icon: <Box />, color: "text-blue-400", gradient: "from-blue-400 to-cyan-500" }, { name: "Figma / Readdy", projects: 2, icon: <Layout />, color: "text-purple-400", gradient: "from-purple-400 to-pink-500" }, { name: "Jenkins", projects: 1, icon: <Settings />, color: "text-red-300", gradient: "from-red-300 to-orange-400" }, { name: "Nginx", projects: 1, icon: <Server />, color: "text-green-400", gradient: "from-green-400 to-emerald-500" }, { name: "Apache Tomcat", projects: 1, icon: <Server />, color: "text-yellow-600", gradient: "from-yellow-600 to-orange-700" }, ], "IDE & Productivité": [ { name: "VS Code", projects: 12, icon: <Monitor />, color: "text-blue-500", gradient: "from-blue-500 to-cyan-500" }, { name: "IntelliJ IDEA", projects: 10, icon: <Monitor />, color: "text-purple-500", gradient: "from-purple-500 to-pink-600" }, { name: "Prompt IA", projects: 7, icon: <Sparkles />, color: "text-fuchsia-400", gradient: "from-fuchsia-400 to-purple-600" }, { name: "NetBeans", projects: 2, icon: <Layout />, color: "text-teal-400", gradient: "from-teal-400 to-green-500" }, { name: "Xcode", projects: 1, icon: <Monitor />, color: "text-blue-300", gradient: "from-blue-300 to-sky-400" }, ] };

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.text} font-sans overflow-x-hidden transition-colors duration-300 selection:bg-teal-500/30 selection:text-teal-200`}>
        
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 w-full z-50 ${themeClasses.navBg} backdrop-blur-md border-b ${themeClasses.navBorder} transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold relative z-50 group cursor-pointer">
            <span className={`${themeClasses.text} group-hover:text-teal-400 transition-colors`}>MK</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">.DEV</span>
          </h1>
            
          <div className={`hidden md:flex space-x-6 text-xs md:text-sm font-medium ${themeClasses.textMuted}`}>
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-teal-500 transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-500 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
            
          <button 
            onClick={toggleTheme}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-200 hover:bg-gray-300'} transition-all hover:rotate-180 duration-500`}
            title={isDarkMode ? "Passer en mode clair" : "Passer en mode sombre"}
          >
            {isDarkMode ? <SunMedium className="w-5 h-5 text-teal-400" /> : <Moon className="w-5 h-5 text-teal-600" />}
          </button>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleTheme} className="focus:outline-none">
                {isDarkMode ? <Sun className="w-6 h-6 text-teal-400" /> : <Moon className="w-6 h-6 text-teal-600" />}
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

      {/* --- HERO SECTION --- */}
      <SectionWrapper id="accueil" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <ParticleBackground isDarkMode={isDarkMode} />
        <motion.div className="absolute top-20 right-0 w-96 h-96 bg-teal-600/20 rounded-full blur-[120px]" animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" animate={{ scale: [1, 1.5, 1], y: [0, -50, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <TiltCard className="p-4">
            <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } } }}>
              <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-teal-500 font-bold mb-4 tracking-widest uppercase text-sm border-l-4 border-teal-500 pl-3">
                Portfolio 2025
              </motion.p>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">
                <span className={themeClasses.text}>Mohamed</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 animate-gradient-x">Kosbar</span>
              </motion.h1>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className={`${themeClasses.textMuted} text-xl mb-8 max-w-lg leading-relaxed h-16 font-light`}>
                 <Typewriter text={["Conception d'Architectures Web & Mobiles.", "Spécialisé en Java, React & DevOps.", "Disponible pour un stage de 14 semaines."]} />             
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col sm:flex-row gap-6">
                <a href="#projets" className={`px-8 py-4 font-bold rounded-full transition-all text-center flex items-center justify-center gap-2 hover:scale-105 active:scale-95 shadow-xl shadow-teal-500/20 ${isDarkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
                    Explorer <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex gap-4 items-center justify-center sm:justify-start px-4">
                  <a href="https://github.com/DevKosX" target="_blank" className="hover:scale-125 transition-transform"><Github className={`w-6 h-6 ${themeClasses.textMuted} hover:text-teal-500 cursor-pointer transition-colors`} /></a>
                  <a href="https://www.linkedin.com/in/mohamed-kosbar-5a57972ba/" target="_blank" className="hover:scale-125 transition-transform"><Linkedin className={`w-6 h-6 ${themeClasses.textMuted} hover:text-teal-500 cursor-pointer transition-colors`} /></a>
                </div>
              </motion.div>
            </motion.div>
          </TiltCard>

          <TiltCard className="relative flex justify-center mt-8 lg:mt-0">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className={`w-64 h-64 md:w-96 md:h-96 rounded-full border border-teal-500/30 border-dashed absolute`} />
             <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className={`w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-cyan-500/20 absolute`} />
            <div className={`w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-teal-500/20 to-cyan-600/20 rounded-full border ${themeClasses.navBorder} backdrop-blur-3xl flex items-center justify-center shadow-2xl shadow-teal-500/20 relative z-10`}>
              <div className={`w-2/3 h-2/3 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'} rounded-full flex items-center justify-center border ${isDarkMode ? 'border-white/5' : 'border-black/5'} relative`}>
                <Code2 className="w-20 h-20 text-teal-500" />
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-2 rounded-full border border-teal-500"><Database className="w-4 h-4 text-teal-500"/></div>
                </motion.div>
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute inset-4">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black p-2 rounded-full border border-purple-500"><Cpu className="w-4 h-4 text-purple-500"/></div>
                </motion.div>
              </div>
            </div>
          </TiltCard>
        </div>
      </SectionWrapper>

      {/* --- A PROPOS --- */}
      <SectionWrapper id="about" className={`min-h-screen flex items-center py-24 ${themeClasses.sectionBgAlt} transition-colors duration-300 relative overflow-hidden`}>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 relative">
            <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} className="absolute -top-10 left-1/2 -translate-x-1/2 text-teal-500/20"><ScanLine className="w-32 h-32" /></motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 relative z-10">
              <span className={themeClasses.text}>Identité</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Détectée</span>
            </h2>
            <div className={`flex items-center justify-center gap-2 ${scanComplete ? 'text-green-500' : 'text-teal-500'} font-mono text-sm`}>
                <span className={!scanComplete ? "animate-pulse" : ""}>●</span> {scanComplete ? "IDENTITÉ CONFIRMÉ" : "SCAN EN COURS..."}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <TiltCard className="relative group">
              <motion.div 
                onViewportEnter={() => setTimeout(() => setScanComplete(true), 2500)} 
                className={`relative h-full ${isDarkMode ? 'bg-[#0a0a0a]/90' : 'bg-white/90'} backdrop-blur-xl p-8 rounded-3xl border flex flex-col items-center text-center overflow-hidden transition-colors duration-700`}
                style={{ borderColor: scanComplete ? 'rgba(34, 197, 94, 0.5)' : 'rgba(20, 184, 166, 0.2)' }}
              >
                <div className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 ${scanComplete ? 'border-green-500' : 'border-teal-500'} transition-colors duration-700`} />
                <div className={`absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 ${scanComplete ? 'border-green-500' : 'border-teal-500'} transition-colors duration-700`} />
                <div className={`absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 ${scanComplete ? 'border-green-500' : 'border-teal-500'} transition-colors duration-700`} />
                <div className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 ${scanComplete ? 'border-green-500' : 'border-teal-500'} transition-colors duration-700`} />

                <div className="relative w-48 h-48 mb-6">
                  {!scanComplete && (
                    <>
                      <div className="absolute inset-0 rounded-full border-2 border-teal-500/30 animate-[spin_10s_linear_infinite]" />
                      <div className="absolute inset-2 rounded-full border-2 border-cyan-500/30 animate-[spin_15s_linear_infinite_reverse]" />
                    </>
                  )}
                  {scanComplete && (
                      <motion.div initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-0 rounded-full border-4 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)] z-20" />
                  )}
                  
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl relative">
                    <img 
                        src="/images/tiit.jpg" 
                        alt="Avatar" 
                        className={`w-full h-full object-cover transition-all duration-1000 ${scanComplete ? 'grayscale-0' : 'grayscale'}`} 
                        onError={(e) => { e.target.style.display='none'; e.target.parentNode.style.backgroundColor='#1a1a1a'; }} 
                    />
                    
                    {!scanComplete && (
                        <motion.div 
                            className="absolute w-full h-1 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)]"
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                        />
                    )}
                  </div>
                  
                  {scanComplete && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full z-30 shadow-lg border-2 border-black">
                          <Check className="w-4 h-4" />
                      </motion.div>
                  )}
                </div>

                <h3 className={`text-2xl font-bold ${themeClasses.text} mb-1 tracking-wide`}>Mohamed Kosbar</h3>
                <p className={`${scanComplete ? 'text-green-500' : 'text-teal-500'} font-mono text-sm mb-6 flex items-center gap-2 transition-colors duration-500`}>
                    <Fingerprint className="w-4 h-4" /> Développeur Full-Stack
                </p>
                
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} border border-white/10`}>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Experience</div>
                    <div className={`text-xl font-bold ${themeClasses.text}`}>3 Ans</div>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'} border border-white/10`}>
                    <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Status</div>
                    <div className="text-xl font-bold text-green-500 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Online
                    </div>
                  </div>
                </div>

                <div className="w-full text-left">
                  <div className={`flex items-center justify-between text-xs ${scanComplete ? 'text-green-500' : 'text-teal-500'} mb-1 font-mono transition-colors duration-500`}>
                      <span>INTÉGRÉ AU SYSTÈME</span><span>100%</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${scanComplete ? 'from-green-600 to-green-400' : 'from-teal-500 to-cyan-400'} w-full transition-colors duration-500`} />
                  </div>
                </div>
              </motion.div>
            </TiltCard>

            <div className="lg:col-span-2 space-y-6">
              {[
                  { icon: <GraduationCap />, title: "Formation Académique", text: "Actuellement en 3ème année de BUT Informatique. Parcours axé sur l'architecture logicielle, l'algorithmique complexe et les bases de données." },
                  { icon: <BrainCircuit />, title: "Vision & Approche", text: "Polyvalence Backend (Java, PHP, Postgres) & Frontend (React, Tailwind). Approche centrée sur la qualité (Clean Code, SOLID) et l'UX." },
                  { icon: <Rocket />, title: "Mission Actuelle", text: "À la recherche d'un stage de 14 à 16 semaines. Prêt à intégrer une équipe et apporter une valeur ajoutée immédiate." }
              ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: 50, opacity: 0 }} 
                    whileInView={{ x: 0, opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: idx * 0.15 }} 
                    className={`relative p-6 rounded-2xl border ${themeClasses.cardBorder} ${isDarkMode ? 'bg-[#0a0a0a]/60' : 'bg-white/60'} backdrop-blur-md hover:border-teal-500/50 transition-all group overflow-hidden`}
                  >
                    <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-150 duration-500">{item.icon}</div>
                    <div className="flex items-start gap-4 relative z-10">
                        <div className="p-3 rounded-xl bg-teal-500/10 text-teal-500 group-hover:bg-teal-500/20 transition-colors">{item.icon}</div>
                        <div>
                            <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>{item.title}</h4>
                            <p className={`${themeClasses.textMuted} leading-relaxed text-justify`}>{item.text}</p>
                        </div>
                    </div>
                  </motion.div>
              ))}

              <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-3 pt-2">
                {["Curiosité", "Travail d'équipe", "Rigueur", "Autonomie", "Leader", "Clean Code", "Adaptabilité", "Documentation", "Gestion de projet"].map((skill, idx) => (
                  <span key={idx} className={`px-4 py-2 rounded-full text-xs font-bold font-mono border ${isDarkMode ? 'bg-teal-900/20 border-teal-500/30 text-teal-300 hover:bg-teal-900/40' : 'bg-teal-50 border-teal-200 text-teal-700'} transition-all cursor-crosshair flex items-center gap-2 hover:scale-105`}>
                    <Crosshair className="w-3 h-3" />{skill}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* --- DASHBOARD (PARCOURS) --- */}
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
             <div className="lg:col-span-7 space-y-8">
               {experiencesData.map((item, index) => (
                 <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -50 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    viewport={{ once: true, margin: "-50px" }} 
                    transition={{ duration: 0.5, delay: index * 0.1 }} 
                    className={`relative group pl-8 lg:pl-0 flex flex-col lg:flex-row gap-6 items-center cursor-pointer`}
                    onClick={() => setSelectedExperience(item)} 
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-800 lg:hidden" />
                    {/* Interactive Dot */}
                    <div className={`relative z-10 w-16 h-16 rounded-2xl ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'} border border-gray-700 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-teal-500 transition-all duration-300`}>
                      <div className={`p-3 rounded-xl bg-opacity-10 bg-current ${item.color}`}><div className={item.color}>{item.icon}</div></div>
                      <div className="absolute inset-0 rounded-2xl border border-teal-500/0 group-hover:border-teal-500/50 group-hover:animate-ping opacity-20"></div>
                    </div>
                    
                    <div className={`flex-1 w-full ${themeClasses.cardBg} p-6 rounded-2xl border ${themeClasses.cardBorder} hover:border-teal-500/30 transition-all shadow-lg group-hover:shadow-teal-500/10 group-hover:-translate-y-1`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <h4 className={`text-xl font-bold ${themeClasses.text} group-hover:text-teal-400 transition-colors`}>{item.title}</h4>
                        <span className="text-xs font-mono py-1 px-2 rounded bg-gray-800 text-gray-400 border border-gray-700 mt-2 sm:mt-0 w-fit">{item.date}</span>
                      </div>
                      <p className={`${themeClasses.text} text-sm font-semibold mb-2`}>{item.company}</p>
                      <p className={`${themeClasses.textMuted} text-justify`}>{item.desc}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs font-bold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Voir les détails <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </motion.div>
               ))}
             </div>
             
             {/* Stats Sticky */}
             <div className="lg:col-span-5 lg:sticky lg:top-32">
                <div className="grid grid-cols-2 gap-4">
                   {stats.map((stat, idx) => (
                     <motion.div key={idx} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`${themeClasses.cardBg} border ${themeClasses.cardBorder} p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-white/5 transition-colors aspect-square shadow-xl backdrop-blur-sm group hover:border-teal-500/20`}>
                       <div className={`mb-3 ${stat.icon.props.className.includes('text-') ? stat.icon.props.className : 'text-gray-400'} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
                       <h4 className={`text-3xl lg:text-4xl font-black ${themeClasses.text} mb-1`}><AnimatedCounter value={stat.value} /></h4>
                       <p className={`text-xs font-bold uppercase tracking-wider ${themeClasses.textMuted}`}>{stat.label}</p>
                     </motion.div>
                   ))}
                </div>
             </div>
           </div>
         </div>
      </SectionWrapper>

      {/* --- MODALE EXPÉRIENCE (POPUP) --- */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`w-full max-w-3xl max-h-[90vh] overflow-y-auto ${themeClasses.cardBg} rounded-2xl border ${themeClasses.cardBorder} shadow-2xl relative`}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedExperience(null)}
                className={`absolute top-4 right-4 p-3 rounded-full ${isDarkMode ? 'bg-black/70 text-white hover:bg-black' : 'bg-white/70 text-black hover:bg-white'} transition-all z-50 shadow-lg border ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}
              >
                <X className="w-6 h-6" />
              </button>

              {/* IMAGE EN HAUT DU MODAL */}
              <div className="h-64 sm:h-80 w-full relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#111]' : 'from-white'} to-transparent z-10`} />
                <img 
                  src={selectedExperience.images && selectedExperience.images[0] ? selectedExperience.images[0] : ""} 
                  alt={selectedExperience.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                      e.target.style.display='none'; 
                      e.target.parentNode.style.background = isDarkMode ? 'linear-gradient(to bottom right, #1f2937, #111827)' : 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)'; 
                  }}
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 backdrop-blur-md' : 'bg-black/10 backdrop-blur-md'}`}>
                      <div className={selectedExperience.color}>{selectedExperience.icon}</div>
                    </div>
                  </div>
                  <h2 className={`text-3xl font-bold ${themeClasses.text} mb-1`}>{selectedExperience.title}</h2>
                  <p className="text-teal-400 font-bold text-lg">{selectedExperience.company}</p>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-lg font-bold ${themeClasses.text} flex items-center gap-2`}>
                        <Eye className="w-5 h-5 text-purple-400" /> Détails de l'expérience
                      </h3>
                      <span className="text-xs font-mono py-1 px-2 rounded bg-teal-500/10 text-teal-500 border border-teal-500/20">{selectedExperience.date}</span>
                  </div>
                  <p className={`${themeClasses.textMuted} leading-relaxed text-lg text-justify`}>
                    {selectedExperience.fullDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {selectedExperience.realizations && (
                        <div>
                            <h3 className={`text-lg font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
                                <CheckCircle2 className="w-5 h-5 text-green-500" /> Réalisations Clés
                            </h3>
                            <ul className="space-y-3">
                                {selectedExperience.realizations.map((real, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 shrink-0" />
                                        <span className={`${themeClasses.textMuted} text-justify`}>{real}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div>
                        <h3 className={`text-lg font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
                            <Sparkles className="w-5 h-5 text-yellow-400" /> Compétences
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedExperience.skills.map((skill, idx) => (
                                <span key={idx} className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODALE PROJETS (POPUP) --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
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

              <div className="h-64 sm:h-80 w-full relative overflow-hidden group">
                <div className={`absolute inset-0 bg-gradient-to-t ${isDarkMode ? 'from-[#111]' : 'from-white'} to-transparent z-10`} />
                <motion.img 
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
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
                  <p className={`${themeClasses.textMuted} leading-relaxed text-lg text-justify`}>
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

      {/* --- PASSIONS (AVEC IMAGES CINÉMATIQUES) --- */}
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
                    <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-2">Découvrir Le Caire, Alexandrie & Marassi <ArrowRight className="w-4 h-4" /></p>
                  </div>
                </div>
                <div onClick={() => setActiveTrip('morocco')} className="relative rounded-3xl overflow-hidden cursor-pointer group shadow-2xl border border-transparent hover:border-red-500/50 transition-all duration-300">
                  <img src="/images/passions/casa.png" alt="Maroc" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" onError={(e) => e.target.style.display='none'} />
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
                        <p className={`${themeClasses.textMuted} text-sm leading-relaxed text-justify`}>{loc.desc}</p>
                      </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* CARTE FOOTBALL - IMAGE BACKGROUND */}
            <div className={`md:col-span-2 relative overflow-hidden rounded-2xl border ${themeClasses.cardBorder} p-8 group hover:border-green-500/50 transition-all shadow-2xl`}>
               {/* Background Image with Overlay */}
               <img src="/images/passions/football.jpg" alt="Football" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 ease-in-out" onError={(e) => {e.target.style.display='none'; e.target.parentNode.style.backgroundColor='#064e3b';}} />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent opacity-90 z-0 pointer-events-none" />
               
               <div className="relative z-10">
                   <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Trophy className="w-48 h-48 text-green-500" /></div>
                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><HeartPulse className="w-6 h-6 text-green-500" /> Le Football, une école de vie</h3>
                   <div className="space-y-4 text-gray-300 leading-relaxed text-justify">
                     <p>Le football est bien plus qu'un sport pour moi. J'ai eu la chance d'atteindre un excellent niveau en évoluant en <span className="text-green-400 font-bold">U17 Nationaux avec Aubervilliers (Génération 2005)</span>. C'était l'école de la rigueur, de la tactique et du dépassement de soi.</p>
                     <p>Malheureusement, une blessure (la maladie d'Osgood-Schlatter) a freiné cette ascension. Mais cette épreuve m'a appris la résilience. J'ai transféré cette compétitivité et cette soif d'apprendre dans mes études et le développement informatique. Aujourd'hui, je code avec la même intensité que je jouais sur le terrain.</p>
                   </div>
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
            {/* CARTE NATATION - IMAGE BACKGROUND */}
            <div className={`md:col-span-2 relative overflow-hidden rounded-2xl border ${themeClasses.cardBorder} p-8 group hover:border-teal-500/50 transition-all shadow-2xl`}>
               <img src="/images/passions/natation.jpg" alt="Natation" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-700 ease-in-out" onError={(e) => {e.target.style.display='none'; e.target.parentNode.style.backgroundColor='#115e59';}} />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent opacity-90 z-0 pointer-events-none" />

               <div className="relative z-10">
                   <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity"><Waves className="w-48 h-48 text-teal-500" /></div>
                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3"><Waves className="w-6 h-6 text-teal-500" /> La Natation, mon second souffle</h3>
                   <div className="space-y-4 text-gray-300 leading-relaxed text-justify">
                     <p>De très nul à médaillé, j’ai relevé un défi : apprendre à nager. Après une formation de deux semaines que j’ai beaucoup appréciée, j’ai poursuivi deux ans de natation pour obtenir mon diplôme, suivis d’une année de compétition. Cette discipline m’a apporté gainage et agilité, des atouts majeurs pour mon jeu au football et c'est devenu une passion.</p>
                     <p>Aujourd'hui, je nage partout : de l'Atlantique (Agadir, Deauville) à la Mer Rouge (Hurghada), en passant par le Nil. J'aime perfectionner mes plongeons et battre mes records d'apnée.</p>
                   </div>
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
                     <div><h3 className={`text-3xl font-bold ${themeClasses.text} mb-2`}>Message Prêt !</h3><p className="text-gray-400 text-lg">Votre message a bien été envoyé.</p></div>
                     <button onClick={() => setFormStatus('idle')} className="text-teal-500 font-bold hover:underline mt-4">Envoyer un autre message</button>
                  </div>
               ) : (
                  <form onSubmit={handleSendMessage} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-sm font-bold uppercase tracking-wide text-gray-500">Nom Complet <span className="text-red-500">*</span></label>
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
                           <label className="text-sm font-bold uppercase tracking-wide text-gray-500">Email <span className="text-red-500">*</span></label>
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
                        <label className="text-sm font-bold uppercase tracking-wide text-gray-500">Message <span className="text-red-500">*</span></label>
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