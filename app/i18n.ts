"use client";

import { useLang } from "./prefs";

const en = {
  controls: {
    language: "Language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  nav: {
    links: ["Platform", "Why NetPlus", "Vision", "Modules", "Roles"],
    cta: "Early access",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    tagline: ["SMARTER", "SAFER", "MORE CONNECTED"],
    sub: "AVIATION OPERATIONS PLATFORM",
    eyebrow: "A NEW ERA OF AVIATION OPERATIONS",
    title: "NetPlus — Intelligence beyond operations",
    // Rotating hero slogans; the middle headline line is set in gold.
    slogans: [
      {
        headline: ["Intelligence", "Beyond", "Operations."],
        body: "An integrated platform combining aviation expertise and artificial intelligence to connect people, data and operations — for a smarter, safer and more efficient aviation.",
      },
      {
        headline: ["Intelligence", "Connects", "Everything."],
        body: "An integrated platform combining aviation expertise and artificial intelligence to connect people, aircraft, data and operations — for a smarter, safer and more efficient aviation.",
      },
    ],
    comingSoon: "COMING SOON",
    capabilities: ["Real-time data", "AI insights", "Global connectivity", "Operational control", "Seamless collaboration"],
    modulesLabel: "Platform modules",
    modules: [
      ["Flight", "Operations"],
      ["Crew", "Management"],
      ["Maintenance", "& CAMO"],
      ["Safety management", "System"],
      ["Sales"],
      ["Intelligence", "& Analytics"],
      ["Integrated", "Ecosystem"],
    ],
  },
  form: {
    lead: "Be the first to know",
    label: "Email address",
    placeholder: "Your email address",
    submit: "Notify me",
    confidential: "Your information remains confidential",
    success: "Thank you — we'll be in touch soon.",
    invalid: "Please enter a valid email address.",
  },
  intro: {
    eyebrow: "Your Trusted Partner in",
    title: "Aviation Operations",
    body: "NetPlus brings flight operations, crew, maintenance, safety and sales together in one intelligent platform — built with aviation professionals, powered by AI, and designed so every team shares the same live picture of the operation.",
    explore: "Explore the platform",
    demo: "Request a demo",
  },
  dashboard: {
    eyebrow: "Operations control",
    title: "Network overview",
    live: "Live",
    sample: "Sample data",
    kpis: ["Flights today", "On-time performance", "Crew on duty", "Aircraft serviceable"],
    timeline: "Flight timeline",
    today: "Today · UTC+1",
    network: "Live network",
    insightTitle: "AI insight",
    insight: "Possible crew duty-time conflict on NP-214 after the FCO delay. Two recovery options are ready to review.",
    airborne: "Flights airborne",
    roster: "Roster optimised",
    trend: "Trend detected",
    days: ["M", "T", "W", "T", "F", "S", "S"],
  },
  expertise: {
    title: ["Where Expertise", "Meets Intelligence"],
    body: "Decades of operational know-how, encoded into software that thinks ahead — so your teams spend less time chasing information and more time making the right call.",
    emblem: "NetPlus emblem",
    statLabel: "Operational visibility",
    statBody: "From the flight deck to the hangar to the boardroom — one shared, real-time view of everything that moves your operation.",
    features: [
      { title: "Maintenance & Regulatory Oversight", text: "CAMO workflows, airworthiness tracking and audit-ready records in one place." },
      { title: "Flight & Crew Coordination", text: "Schedules, rosters and duty limits that stay in sync as the day changes." },
      { title: "Safety Management", text: "Report, assess and close hazards through a complete, traceable SMS cycle." },
      { title: "Operational Support", text: "Aviation specialists at your side, from onboarding to everyday operations." },
    ],
    worldA: "Step into a World of",
    worldB: "Intelligent Operations",
    p1: "Every module in NetPlus speaks the same language. A delay in operations instantly informs crew planning; a deferred defect flows straight to maintenance control; safety reports link to the flights, people and aircraft they concern.",
    p2: "The result is an operation that stays coordinated under pressure — with AI quietly connecting the dots, highlighting risks early and proposing the next best action.",
  },
  learnMore: "Learn more",
  vision: {
    statement: "Because every flight deserves *precision, *safety and *clarity — and that's what we deliver, from the ground to *40,000 *feet.",
    pillars: [
      { a: "Heritage of", b: "Expertise", text: "Designed with aviation professionals who live the realities of daily operations." },
      { a: "Tailored", b: "Solutions", text: "Modules that adapt to your fleet, your processes and your regulatory framework." },
      { a: "Uncompromised", b: "Safety", text: "The highest safety and compliance standards, built into every workflow." },
      { a: "Global", b: "Reach", text: "Cloud-native and connected, wherever your aircraft and teams operate." },
    ],
  },
  showcase: {
    a: "Refined Operations,",
    b: "Elevated Decisions",
    body: "Seven integrated modules — flight operations, crew, maintenance & CAMO, safety, sales, analytics and an open ecosystem — working as one platform instead of a patchwork of tools.",
    cards: [
      { title: ["Flight Operations,", "Orchestrated in Real Time"], text: "Track every movement, anticipate disruption and re-plan in minutes with a live operational picture." },
      { title: ["Crew & Maintenance,", "Perfectly in Sync"], text: "Rosters, qualifications and maintenance slots planned together, so aircraft and people are ready at the same time." },
      { title: ["Intelligence That Turns", "Data into Decisions"], text: "AI-driven insights surface risks, trends and opportunities before they reach the flight line." },
    ],
  },
  roles: {
    a: "Built for",
    b: "Every Role",
    items: [
      { role: "Operations Control", team: "OCC", text: "One live view of every flight, crew and aircraft — disruptions surface early, with recovery options ready." },
      { role: "Crew Planning", team: "Crew Management", text: "Rosters that respect duty limits and qualifications automatically, and adapt as the schedule moves." },
      { role: "Continuing Airworthiness", team: "Maintenance & CAMO", text: "Tasks, deferrals and records connected to the operation, so every aircraft is released with confidence." },
      { role: "Accountable Manager", team: "Leadership", text: "Safety, compliance and performance indicators in one place — clear enough to act on, every day." },
    ],
  },
  contact: {
    title: "Ready to Take Off?",
    lead: "Experience the next generation of aviation operations with NetPlus.",
    body: "NetPlus is launching soon. Leave your email and our team will reach out with early access and a personal walkthrough of the platform.",
    windowAlt: "Golden sky above the clouds, seen through an aircraft window",
  },
  footer: {
    blurb: "An integrated aviation operations platform connecting people, data and operations — for a smarter, safer and more connected aviation.",
    motto: "Smarter · Safer · More connected",
    platform: "Platform",
    platformLinks: ["Flight Operations", "Crew Management", "Maintenance & CAMO", "Safety Management", "Intelligence & Analytics"],
    company: "Company",
    companyLinks: ["Why NetPlus", "Our vision", "Who it's for"],
    contact: "Get in touch",
    contactLinks: ["Early access", "Request a demo"],
    rights: "All rights reserved.",
    top: "Back to top",
  },
};

export type Dict = typeof en;

const fr: Dict = {
  controls: {
    language: "Langue",
    toLight: "Passer en mode clair",
    toDark: "Passer en mode sombre",
  },
  nav: {
    links: ["Plateforme", "Pourquoi NetPlus", "Vision", "Modules", "Métiers"],
    cta: "Accès anticipé",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  hero: {
    tagline: ["PLUS INTELLIGENT", "PLUS SÛR", "PLUS CONNECTÉ"],
    sub: "PLATEFORME D'OPÉRATIONS AÉRIENNES",
    eyebrow: "UNE NOUVELLE ÈRE POUR LES OPÉRATIONS AÉRIENNES",
    title: "NetPlus — L'intelligence au-delà des opérations",
    slogans: [
      {
        headline: ["L'intelligence", "au-delà des", "opérations."],
        body: "Une plateforme intégrée qui associe l'expertise aéronautique et l'intelligence artificielle pour connecter les équipes, les données et les opérations — pour une aviation plus intelligente, plus sûre et plus efficace.",
      },
      {
        headline: ["L'intelligence", "qui connecte", "tout."],
        body: "Une plateforme intégrée qui associe l'expertise aéronautique et l'intelligence artificielle pour connecter les équipes, les aéronefs, les données et les opérations — pour une aviation plus intelligente, plus sûre et plus efficace.",
      },
    ],
    comingSoon: "BIENTÔT DISPONIBLE",
    capabilities: ["Données en temps réel", "Analyses par l'IA", "Connectivité mondiale", "Contrôle opérationnel", "Collaboration fluide"],
    modulesLabel: "Modules de la plateforme",
    modules: [
      ["Opérations", "aériennes"],
      ["Gestion", "des équipages"],
      ["Maintenance", "& CAMO"],
      ["Système de gestion", "de la sécurité"],
      ["Ventes"],
      ["Intelligence", "& Analytique"],
      ["Écosystème", "intégré"],
    ],
  },
  form: {
    lead: "Soyez les premiers informés",
    label: "Adresse e-mail",
    placeholder: "Votre adresse e-mail",
    submit: "M'avertir",
    confidential: "Vos informations restent confidentielles",
    success: "Merci — nous revenons vers vous très bientôt.",
    invalid: "Veuillez saisir une adresse e-mail valide.",
  },
  intro: {
    eyebrow: "Votre partenaire de confiance en",
    title: "Opérations aériennes",
    body: "NetPlus réunit les opérations aériennes, les équipages, la maintenance, la sécurité et les ventes dans une seule plateforme intelligente — conçue avec des professionnels de l'aviation, propulsée par l'IA, pour que chaque équipe partage la même vision en temps réel de l'exploitation.",
    explore: "Découvrir la plateforme",
    demo: "Demander une démo",
  },
  dashboard: {
    eyebrow: "Contrôle des opérations",
    title: "Vue d'ensemble du réseau",
    live: "En direct",
    sample: "Données d'exemple",
    kpis: ["Vols du jour", "Ponctualité", "Équipages en service", "Avions disponibles"],
    timeline: "Chronologie des vols",
    today: "Aujourd'hui · UTC+1",
    network: "Réseau en direct",
    insightTitle: "Analyse IA",
    insight: "Risque de dépassement du temps de service équipage sur NP-214 après le retard à FCO. Deux solutions de reprise sont prêtes à être examinées.",
    airborne: "Vols en cours",
    roster: "Planning optimisé",
    trend: "Tendance détectée",
    days: ["L", "M", "M", "J", "V", "S", "D"],
  },
  expertise: {
    title: ["Là où l'expertise", "rencontre l'intelligence"],
    body: "Des décennies de savoir-faire opérationnel, intégrées dans un logiciel qui anticipe — pour que vos équipes passent moins de temps à chercher l'information et plus de temps à prendre les bonnes décisions.",
    emblem: "Emblème NetPlus",
    statLabel: "Visibilité opérationnelle",
    statBody: "Du poste de pilotage au hangar jusqu'à la direction — une vision unique, partagée et en temps réel de tout ce qui fait avancer votre exploitation.",
    features: [
      { title: "Maintenance et conformité réglementaire", text: "Processus CAMO, suivi de navigabilité et dossiers prêts pour l'audit, au même endroit." },
      { title: "Coordination vols et équipages", text: "Programmes, plannings et limitations de service qui restent synchronisés au fil de la journée." },
      { title: "Gestion de la sécurité", text: "Signalez, évaluez et clôturez les dangers grâce à un cycle SGS complet et traçable." },
      { title: "Support opérationnel", text: "Des spécialistes de l'aviation à vos côtés, de la mise en service aux opérations quotidiennes." },
    ],
    worldA: "Entrez dans l'univers des",
    worldB: "opérations intelligentes",
    p1: "Chaque module de NetPlus parle le même langage. Un retard en exploitation informe instantanément la planification des équipages ; un défaut différé remonte directement au contrôle maintenance ; les rapports de sécurité sont liés aux vols, aux personnes et aux avions concernés.",
    p2: "Résultat : une exploitation qui reste coordonnée sous pression — avec une IA qui relie discrètement les points, signale les risques au plus tôt et propose la meilleure action suivante.",
  },
  learnMore: "En savoir plus",
  vision: {
    statement: "Parce que chaque vol mérite *précision, *sécurité et *clarté — et c'est ce que nous offrons, du sol jusqu'à *40 *000 *pieds.",
    pillars: [
      { a: "Héritage", b: "d'expertise", text: "Conçue avec des professionnels de l'aviation qui vivent au quotidien la réalité des opérations." },
      { a: "Solutions", b: "sur mesure", text: "Des modules qui s'adaptent à votre flotte, à vos processus et à votre cadre réglementaire." },
      { a: "Sécurité", b: "sans compromis", text: "Les plus hautes exigences de sécurité et de conformité, intégrées à chaque processus." },
      { a: "Portée", b: "mondiale", text: "Native cloud et connectée, partout où opèrent vos avions et vos équipes." },
    ],
  },
  showcase: {
    a: "Des opérations raffinées,",
    b: "des décisions éclairées",
    body: "Sept modules intégrés — opérations aériennes, équipages, maintenance & CAMO, sécurité, ventes, analytique et un écosystème ouvert — qui fonctionnent comme une seule plateforme plutôt qu'une mosaïque d'outils.",
    cards: [
      { title: ["Opérations aériennes,", "orchestrées en temps réel"], text: "Suivez chaque mouvement, anticipez les perturbations et replanifiez en quelques minutes grâce à une vision opérationnelle en direct." },
      { title: ["Équipages et maintenance,", "parfaitement synchronisés"], text: "Plannings, qualifications et créneaux de maintenance planifiés ensemble, pour que les avions et les équipes soient prêts au même moment." },
      { title: ["Une intelligence qui transforme", "les données en décisions"], text: "Des analyses pilotées par l'IA révèlent les risques, les tendances et les opportunités avant qu'ils n'atteignent la piste." },
    ],
  },
  roles: {
    a: "Conçu pour",
    b: "chaque métier",
    items: [
      { role: "Contrôle des opérations", team: "OCC", text: "Une vue en direct de chaque vol, équipage et avion — les perturbations apparaissent tôt, avec des options de reprise prêtes." },
      { role: "Planification des équipages", team: "Gestion des équipages", text: "Des plannings qui respectent automatiquement les limitations de service et les qualifications, et s'adaptent aux changements de programme." },
      { role: "Maintien de la navigabilité", team: "Maintenance & CAMO", text: "Tâches, reports et dossiers connectés à l'exploitation, pour que chaque avion soit remis en service en toute confiance." },
      { role: "Dirigeant responsable", team: "Direction", text: "Indicateurs de sécurité, de conformité et de performance réunis au même endroit — assez clairs pour agir, chaque jour." },
    ],
  },
  contact: {
    title: "Prêt à décoller ?",
    lead: "Découvrez la nouvelle génération des opérations aériennes avec NetPlus.",
    body: "NetPlus arrive bientôt. Laissez votre adresse e-mail : notre équipe vous contactera pour un accès anticipé et une présentation personnalisée de la plateforme.",
    windowAlt: "Ciel doré au-dessus des nuages, vu à travers un hublot",
  },
  footer: {
    blurb: "Une plateforme intégrée d'opérations aériennes qui connecte les équipes, les données et les opérations — pour une aviation plus intelligente, plus sûre et plus connectée.",
    motto: "Plus intelligent · Plus sûr · Plus connecté",
    platform: "Plateforme",
    platformLinks: ["Opérations aériennes", "Gestion des équipages", "Maintenance & CAMO", "Gestion de la sécurité", "Intelligence & Analytique"],
    company: "Entreprise",
    companyLinks: ["Pourquoi NetPlus", "Notre vision", "Pour qui"],
    contact: "Nous contacter",
    contactLinks: ["Accès anticipé", "Demander une démo"],
    rights: "Tous droits réservés.",
    top: "Retour en haut",
  },
};

const dictionaries: Record<"en" | "fr", Dict> = { en, fr };

export function useT(): Dict {
  return dictionaries[useLang()];
}
