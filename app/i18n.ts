"use client";

import { useLang } from "./prefs";

/** Screens captured from the NetPlus 2026 brochure, stored in /public/screens. */
export type ScreenId =
  | "feasibility"
  | "flight-analysis"
  | "fuel-stop"
  | "flight-planning"
  | "timeline"
  | "dispatch"
  | "crew-scheduling"
  | "roster"
  | "irops"
  | "flight-watch"
  | "lvp"
  | "vigil"
  | "camo-manager"
  | "sms"
  | "reports";

type TourItem = {
  screen: ScreenId;
  /** Index into `tour.stages`. */
  stage: number;
  module: string;
  title: [string, string];
  text: string;
  bullets: string[];
  alt: string;
};

const en = {
  controls: {
    language: "Language",
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  nav: {
    links: ["Platform", "Why NetPlus", "Data", "Modules", "Roles"],
    cta: "Early access",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  hero: {
    tagline: ["TRACEABLE", "CONNECTED", "REAL-TIME"],
    sub: "SMARTER AVIATION SOLUTIONS",
    eyebrow: "OPERATIONS CONTROL FOR AIRLINES & BUSINESS AVIATION",
    title: "NetPlus — One operational layer for the whole airline",
    // Rotating hero slogans; the middle headline line is set in gold.
    slogans: [
      {
        headline: ["One layer", "for the whole", "airline."],
        body: "NetPlus carries every flight from the commercial request to its closure: feasibility, permits and traffic rights, dispatch, crew rostering, flight watch, airworthiness and safety — in one application with its own aviation data and rule engines.",
      },
      {
        headline: ["Ten tools", "per flight?", "One is enough."],
        body: "Each value is entered once, traced to its source and shared by every team in real time — then turned into prioritised alerts, actions and decisions for the OCC.",
      },
    ],
    comingSoon: "COMING SOON",
    capabilities: ["Built-in aviation data", "Rules, not guesses", "VIGIL intelligence", "Live OCC picture", "Web or offline"],
    modulesLabel: "Platform modules",
    modules: [
      ["OCC", "& Dispatch"],
      ["Crew", "& Roster"],
      ["CAMO", "& Tech Log"],
      ["Permits", "& Trip Support"],
      ["Sales", "& Reports"],
      ["VIGIL", "Intelligence"],
      ["Safety", "SMS & ERP"],
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
    eyebrow: "The operator's",
    title: "Digital Cockpit",
    body: "NetPlus is an operations control platform for airlines and business-aviation operators. Each value is entered once, traced to its source and shared between teams, then turned into prioritised alerts, actions and decisions — from the commercial request to the closure of the flight.",
    explore: "Explore the platform",
    demo: "Request a demo",
    screenAlt: "NetPlus OCC dashboard: global fleet watch, key indicators and operational status board",
    caption: "OCC Dashboard — the whole operation on one screen. Every tile is computed from the other modules, in UTC, and opens the screen that settles it.",
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
    title: ["Five to ten tools per flight.", "One is enough."],
    body: "An operator typically prepares each flight across messaging, spreadsheets, permit portals, a weather and NOTAM provider, CAMO software and roster sheets — re-typing the same data at every step while the OCC rebuilds the situation by hand.",
    emblem: "NetPlus emblem",
    statLabel: "Integrated modules",
    statBody: "From the commercial request to the closure of the flight — one application, one source of truth, shared by every team.",
    features: [
      { title: "Airworthiness, across every stage", text: "CAMO, tech log and MEL/CDL. A deferred defect or an AOG reaches dispatch and the timeline at once." },
      { title: "Safety, across every stage", text: "A safety management system and emergency response plan fed by live operations." },
      { title: "The right to fly it", text: "Traffic rights, permits, conflict zones and a valid route, in the same view as crew, aircraft and fuel." },
      { title: "Rules, not guesses", text: "FTL, rostering, aerodrome accessibility, low-visibility minima, NOTAM and risk scoring are computed, not estimated." },
    ],
    worldA: "General suites manage the flight.",
    worldB: "NetPlus also manages the right to fly it.",
    p1: "A change in CAMO, crew or dispatch propagates to every view that depends on it: timeline, dashboard, dispatch file and alerts. Every figure on screen comes from a versioned reference, a timestamped entry or a deterministic engine.",
    p2: "And when data is missing, NetPlus says so. No weather, no NOTAM coverage: the file says \"not assessed\" and asks for a check — it never assumes a gap is fine.",
  },
  data: {
    eyebrow: "Built-in aviation data",
    title: ["Reference data", "an OCC can defend."],
    body: "Air services agreements, an Airport Directory with its suppliers, AIRAC navigation data, aircraft performance and operator codes — built into NetPlus, versioned and traced to their source.",
    stats: [
      { value: 3924, label: "Air services agreements on file" },
      { value: 193, label: "States covered" },
      { value: 9583, label: "Airports with ICAO / IATA reference data" },
      { value: 10678, label: "Suppliers in the Airport Directory" },
      { value: 121908, label: "Navigation points per AIRAC cycle" },
      { value: 340, label: "Aircraft types with performance" },
    ],
    screenAlt: "NetPlus Airports Data page for Dubai International (OMDB)",
    caption: "Airports Data — one page per aerodrome: timezone, operating hours, fuel, slots, security level, fire category, services on site, contacts, frequencies and runways.",
    note: "Figures read from the application: air services agreements database of 14 Aug 2026, AIRAC cycle 2609.",
  },
  learnMore: "Learn more",
  vision: {
    statement: "From the *commercial *request to the *closure of the flight — every value entered *once, traced to its *source and shared by *every *team.",
    pillars: [
      { a: "Every value", b: "has a source", text: "Each figure comes from a versioned reference, a timestamped entry or a deterministic engine. Nothing is invented to fill a gap." },
      { a: "One source", b: "of truth", text: "A change in CAMO, crew or dispatch reaches the timeline, dashboard, dispatch file and alerts that depend on it." },
      { a: "Modules", b: "on demand", text: "The application shell opens first; each module and its datasets load only when you open them." },
      { a: "Web", b: "or offline", text: "Runs as a web application or as a single offline file for the OCC. API keys never reach the browser." },
    ],
  },
  tour: {
    a: "From Request",
    b: "to Closure",
    body: "Follow one flight through NetPlus — from the broker's request to the last report. Every screen below is taken from the application.",
    stages: ["Request", "Authorize", "Prepare", "Execute & watch", "Across every stage", "Close"],
    stageLabel: "Stage",
    note: "Screens shown with demonstration data (The Network Plan Airlines, demo operator).",
    previous: "Previous screen",
    next: "Next screen",
    items: [
      {
        screen: "feasibility",
        stage: 0,
        module: "Sales & CRM · Feasibility",
        title: ["Know it can fly", "before you quote it."],
        text: "A broker asks for Tunis to Nice at 08:00 in a Falcon 2000. The pre-check answers in seconds, with the same data the OCC works from.",
        bullets: [
          "Route, block time, aircraft availability, aerodromes and crew duty checked against FTL",
          "A verdict with its reasons: feasible, feasible with reservations, or not feasible",
          "One click sends the request to the OCC; a confirmed quote becomes a flight on the timeline",
        ],
        alt: "Feasibility pre-check for Tunis to Nice",
      },
      {
        screen: "flight-analysis",
        stage: 1,
        module: "NetPlus Services · Flight analysis",
        title: ["Permits, rights and route,", "checked before you file."],
        text: "Enter DTTA → OMDB and a tail number. NetPlus lists every FIR and country crossed, what each one requires, and answers each question on its own.",
        bullets: [
          "Overflight and landing permits, PPR and slots, with their lead time",
          "Traffic rights from 3,924 air services agreements across 193 states",
          "NOTAMs on the route FIRs and aerodromes analysed for the flight window",
        ],
        alt: "Permit and authorization analysis from Tunis to Dubai",
      },
      {
        screen: "fuel-stop",
        stage: 1,
        module: "NetPlus Services · Fuel stop",
        title: ["Out of range?", "The fuel stop, found and checked."],
        text: "When the direct leg is beyond the aircraft's range, NetPlus searches the aerodromes along the way and plans both legs through each one.",
        bullets: [
          "Distance, flight time and trip fuel for both legs of every candidate",
          "Runway length, RFF category, fuel type and opening hours ticked or flagged",
          "Recommended, to review or rejected — each with its reason; one click applies it",
        ],
        alt: "Fuel stop analysis with three recommended aerodromes",
      },
      {
        screen: "flight-planning",
        stage: 2,
        module: "Flight planning · Performance",
        title: ["Plan, compare and optimise", "before you fly."],
        text: "Flight Planning builds several routes on the current AIRAC cycle, scores them, and lets you compare, edit or paste your own.",
        bullets: [
          "Optimum, fuel-efficient, shortest and fewest-airway-change options, sorted by total cost",
          "Blocked FIRs, conflict zones and restricted areas drawn on every option",
          "Vertical profile and payload-range envelope from the variant's performance tables",
        ],
        alt: "Flight planning map with route options from Tunis to Dubai",
      },
      {
        screen: "timeline",
        stage: 2,
        module: "Flight timeline · Real-time Gantt",
        title: ["The day of operations,", "tail by tail."],
        text: "One line per aircraft, one bar per flight, in UTC — with AOG and maintenance bands published by the CAMO and a red line for now.",
        bullets: [
          "Active flights, delays, AOG, on-time performance and block hours for the day",
          "Retime, swap or move a flight; every change is undoable and journaled",
          "Click a bar to open the eight-tab flight file",
        ],
        alt: "Flight timeline Gantt by fleet and tail",
      },
      {
        screen: "dispatch",
        stage: 2,
        module: "Dispatch · Central desk",
        title: ["Every flight of the day,", "ready or not."],
        text: "The dispatcher's desk: one row per flight, coloured by readiness, and every action one click away.",
        bullets: [
          "Services ready or pending, permits outstanding, crew unassigned, delays and AOG",
          "Risk index, ETD/ETA, CTOT, services and crew FTL flag on each row",
          "MVT messages composed in IATA format and sent from the desk",
        ],
        alt: "Dispatch desk with indicators and flight list",
      },
      {
        screen: "crew-scheduling",
        stage: 2,
        module: "Crew scheduling · FTL",
        title: ["Only current, legal crew", "reach the flight."],
        text: "Every assignment goes through the flight time limitations engine before it is saved, and the reason for each empty seat is shown.",
        bullets: [
          "EASA ORO.FTL or EU-OPS Subpart Q, chosen per fleet",
          "Licences, medicals, type ratings and recurrent training tracked, with alerts 60 days before expiry",
          "An expired mandatory item makes the member not current — the generator never assigns them",
        ],
        alt: "Crew scheduling week with flight duty period detail",
      },
      {
        screen: "roster",
        stage: 2,
        module: "Automatic roster · Optimisation",
        title: ["A legal month,", "generated, improved, published."],
        text: "Generate builds the month, Optimise improves it, Launch publishes it to the timeline, dispatch and flight following.",
        bullets: [
          "Every rotation seat filled with legal crew only — demo month: 90% of 881 seats, 0 FTL infractions",
          "Legality is a hard gate, never a weight; the result is never worse and can be undone",
          "Before publishing, every cell the FTL gate blocked is listed with its reason",
        ],
        alt: "Published monthly crew roster",
      },
      {
        screen: "irops",
        stage: 3,
        module: "IROPS · Irregular operations",
        title: ["When the day goes wrong,", "recovery options first."],
        text: "Active disruptions, affected flights, aircraft, crew issues and potential cancellations in one strip, with disruption layers on the map.",
        bullets: [
          "Root cause, operational impact, delay exposure and cascading impact for each event",
          "Recovery actions, each with its target, feasibility and reason",
          "The OCC reviews, accepts or dismisses — nothing changes without a decision",
        ],
        alt: "IROPS control center map with active events",
      },
      {
        screen: "flight-watch",
        stage: 3,
        module: "Flight following · Flight watch",
        title: ["Every flight on one map,", "ranked by risk."],
        text: "Satellite, dark-ops or street basemap with routes, airports, FIR/UIR, weather radar and live ADS-B traffic on demand.",
        bullets: [
          "Flight list ranked by the SMS proactive risk overview, with MEL items flagged",
          "Route, level, ground speed and progress against schedule; alternates from the OM-C",
          "The emergency response plan opens straight from the top bar",
        ],
        alt: "Flight watch map with active flights",
      },
      {
        screen: "lvp",
        stage: 3,
        module: "Low visibility · LVP",
        title: ["Minima and visibility,", "decided on numbers."],
        text: "Low visibility is evaluated flight by flight against operator minima, on a live weather map with a 12-hour timeline.",
        bullets: [
          "METAR and TAF decoded; RVR by runway at touchdown, mid and end",
          "Take-off and approach assessed against operator minima and SPA.LVO approvals",
          "LVP status is declared by the OCC, timestamped and sourced — never inferred",
        ],
        alt: "Low visibility procedures screen in training-scenario mode",
      },
      {
        screen: "vigil",
        stage: 3,
        module: "VIGIL · Operational intelligence",
        title: ["Six layers of analysis", "on every flight."],
        text: "VIGIL detects, predicts, prioritises, recommends and explains. It never changes an aircraft, a crew, a route or a release — the OCC decides.",
        bullets: [
          "Data, rules, learning, risk, alerts and advice, layered on every flight",
          "One explainable 0–100 risk score per flight, with its contributors",
          "Ask VIGIL: current situation, flights at risk, next 12 hours, handover check",
        ],
        alt: "VIGIL analysis of flight TNP182 with a 76/100 risk score",
      },
      {
        screen: "camo-manager",
        stage: 4,
        module: "CAMO · Tech log · MEL",
        title: ["The authority", "on aircraft status."],
        text: "When the CAMO declares a tail AOG or not airworthy, the timeline, dispatch, IROPS and VIGIL know at once.",
        bullets: [
          "ARC, next check, open AD/SB and life-limited parts per aircraft",
          "Defects deferred under the MEL with their category and rectification interval",
          "Every figure recomputed from the audited record set — never typed in",
        ],
        alt: "CAMO manager dashboard with fleet status",
      },
      {
        screen: "sms",
        stage: 4,
        module: "SMS · ICAO Annex 19 · ERP",
        title: ["A safety system built", "into every module."],
        text: "The SMS reads CAMO, tech log, crew, training, roster, dispatch and flight following, and its risk engine scores every flight.",
        bullets: [
          "Occurrences, risk register, investigations, SPIs, audits and management of change",
          "Ten safety report types for all staff, confidential or anonymous",
          "An emergency response plan armed at all times, activated with two signatures",
        ],
        alt: "Safety manager overview",
      },
      {
        screen: "reports",
        stage: 5,
        module: "Closure · Reports & analytics",
        title: ["From the last movement", "to the last report."],
        text: "Commercial, operations and management read the same flights, so the numbers in the report are the numbers of the day.",
        bullets: [
          "MVT from the flight; the trip folder lists what still blocks the closure",
          "28 built-in reports exported to PDF, CSV, Excel or JSON",
          "A six-hourly VIGIL report with what changed since the last one",
        ],
        alt: "Reports and analytics: block time by month",
      },
    ] as TourItem[],
  },
  roles: {
    a: "Built for",
    b: "Every Role",
    items: [
      { role: "Operations Control", team: "OCC", text: "The whole operation on one screen — fleet watch, IROPS, low visibility and VIGIL alerts, each tile opening the screen that settles it." },
      { role: "Crew Planning", team: "Crew & Roster", text: "A legal month generated, optimised and published, with every assignment checked by the FTL engine before it is saved." },
      { role: "Continuing Airworthiness", team: "CAMO", text: "Fleet status, AD/SB, life-limited parts and MEL deferrals — the status set here reaches every module at once." },
      { role: "Safety & Accountable Manager", team: "SMS · ERP", text: "Occurrences, risk register, SPIs and audits, plus an emergency response plan that is armed at all times." },
    ],
  },
  contact: {
    title: "Ready to Take Off?",
    lead: "One operational layer for the whole airline — NetPlus.",
    body: "NetPlus is launching soon. Leave your email and our team will reach out with early access and a personal walkthrough of the platform on demonstration data.",
    windowAlt: "Golden sky above the clouds, seen through an aircraft window",
  },
  footer: {
    blurb: "Dispatch, trip support, flight watch, crew, CAMO, safety and sales — for operators that run their own OCC.",
    motto: "Smarter Aviation Solutions",
    platform: "Platform",
    platformLinks: ["Sales & Feasibility", "Permits & Trip Support", "Dispatch & Flight Watch", "Crew & Roster", "CAMO & Safety"],
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
    links: ["Plateforme", "Pourquoi NetPlus", "Données", "Modules", "Métiers"],
    cta: "Accès anticipé",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  hero: {
    tagline: ["TRAÇABLE", "CONNECTÉ", "TEMPS RÉEL"],
    sub: "SMARTER AVIATION SOLUTIONS",
    eyebrow: "CONTRÔLE DES OPÉRATIONS POUR COMPAGNIES ET AVIATION D'AFFAIRES",
    title: "NetPlus — Une seule couche opérationnelle pour toute la compagnie",
    slogans: [
      {
        headline: ["Une couche", "pour toute", "la compagnie."],
        body: "NetPlus accompagne chaque vol de la demande commerciale à sa clôture : faisabilité, autorisations et droits de trafic, dispatch, planning équipages, suivi des vols, navigabilité et sécurité — dans une seule application, avec ses propres données aéronautiques et moteurs de règles.",
      },
      {
        headline: ["Dix outils", "par vol ?", "Un seul suffit."],
        body: "Chaque donnée est saisie une seule fois, tracée jusqu'à sa source et partagée en temps réel par toutes les équipes — puis transformée en alertes, actions et décisions priorisées pour l'OCC.",
      },
    ],
    comingSoon: "BIENTÔT DISPONIBLE",
    capabilities: ["Données aéronautiques intégrées", "Des règles, pas des suppositions", "Intelligence VIGIL", "Vision OCC en direct", "Web ou hors ligne"],
    modulesLabel: "Modules de la plateforme",
    modules: [
      ["OCC", "& Dispatch"],
      ["Équipages", "& Planning"],
      ["CAMO", "& Tech Log"],
      ["Autorisations", "& Trip Support"],
      ["Ventes", "& Rapports"],
      ["Intelligence", "VIGIL"],
      ["Sécurité", "SGS & ERP"],
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
    eyebrow: "Le cockpit numérique",
    title: "de l'exploitant",
    body: "NetPlus est une plateforme de contrôle des opérations pour les compagnies aériennes et les exploitants d'aviation d'affaires. Chaque donnée est saisie une seule fois, tracée jusqu'à sa source et partagée entre les équipes, puis transformée en alertes, actions et décisions priorisées — de la demande commerciale à la clôture du vol.",
    explore: "Découvrir la plateforme",
    demo: "Demander une démo",
    screenAlt: "Tableau de bord OCC de NetPlus : suivi mondial de la flotte, indicateurs clés et tableau de statut opérationnel",
    caption: "Tableau de bord OCC — toute l'exploitation sur un seul écran. Chaque tuile est calculée à partir des autres modules, en UTC, et ouvre l'écran qui permet d'agir.",
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
    title: ["Cinq à dix outils par vol.", "Un seul suffit."],
    body: "Un exploitant prépare généralement chaque vol entre messageries, tableurs, portails d'autorisations, un fournisseur météo et NOTAM, un logiciel CAMO et des plannings — en ressaisissant les mêmes données à chaque étape pendant que l'OCC reconstitue la situation à la main.",
    emblem: "Emblème NetPlus",
    statLabel: "Modules intégrés",
    statBody: "De la demande commerciale à la clôture du vol — une seule application, une seule source de vérité, partagée par toutes les équipes.",
    features: [
      { title: "La navigabilité, à chaque étape", text: "CAMO, tech log et MEL/CDL. Un défaut différé ou un AOG remonte immédiatement au dispatch et à la chronologie." },
      { title: "La sécurité, à chaque étape", text: "Un système de gestion de la sécurité et un plan d'urgence alimentés par les opérations en direct." },
      { title: "Le droit de voler", text: "Droits de trafic, autorisations, zones de conflit et route valide, dans la même vue que l'équipage, l'avion et le carburant." },
      { title: "Des règles, pas des suppositions", text: "FTL, planning, accessibilité des aérodromes, minima basse visibilité, NOTAM et score de risque sont calculés, pas estimés." },
    ],
    worldA: "Les suites généralistes gèrent le vol.",
    worldB: "NetPlus gère aussi le droit de le faire voler.",
    p1: "Une modification en CAMO, équipages ou dispatch se propage à toutes les vues qui en dépendent : chronologie, tableau de bord, dossier de vol et alertes. Chaque valeur affichée provient d'une référence versionnée, d'une saisie horodatée ou d'un moteur déterministe.",
    p2: "Et quand une donnée manque, NetPlus le dit. Pas de météo, pas de couverture NOTAM : le dossier indique « non évalué » et demande une vérification — il ne suppose jamais qu'un manque est sans conséquence.",
  },
  data: {
    eyebrow: "Données aéronautiques intégrées",
    title: ["Des données de référence", "qu'un OCC peut défendre."],
    body: "Accords de services aériens, un annuaire des aéroports et de leurs fournisseurs, données de navigation AIRAC, performances avions et codes exploitants — intégrés à NetPlus, versionnés et tracés jusqu'à leur source.",
    stats: [
      { value: 3924, label: "Accords de services aériens enregistrés" },
      { value: 193, label: "États couverts" },
      { value: 9583, label: "Aéroports avec données de référence OACI / IATA" },
      { value: 10678, label: "Fournisseurs dans l'annuaire des aéroports" },
      { value: 121908, label: "Points de navigation par cycle AIRAC" },
      { value: 340, label: "Types d'avions avec performances" },
    ],
    screenAlt: "Fiche Airports Data de NetPlus pour Dubaï International (OMDB)",
    caption: "Airports Data — une page par aérodrome : fuseau horaire, horaires d'ouverture, carburant, créneaux, niveau de sûreté, catégorie incendie, services sur place, contacts, fréquences et pistes.",
    note: "Chiffres relevés dans l'application : base des accords de services aériens du 14 août 2026, cycle AIRAC 2609.",
  },
  learnMore: "En savoir plus",
  vision: {
    statement: "De la *demande *commerciale à la *clôture du vol — chaque donnée saisie *une *fois, tracée jusqu'à sa *source et partagée par *toutes les *équipes.",
    pillars: [
      { a: "Chaque valeur", b: "a une source", text: "Chaque chiffre provient d'une référence versionnée, d'une saisie horodatée ou d'un moteur déterministe. Rien n'est inventé pour combler un manque." },
      { a: "Une source", b: "de vérité", text: "Une modification en CAMO, équipages ou dispatch atteint la chronologie, le tableau de bord, le dossier de vol et les alertes qui en dépendent." },
      { a: "Modules", b: "à la demande", text: "L'application s'ouvre d'abord ; chaque module et ses données ne se chargent que lorsque vous l'ouvrez." },
      { a: "Web", b: "ou hors ligne", text: "En application web ou en fichier unique hors ligne pour l'OCC. Les clés d'API n'atteignent jamais le navigateur." },
    ],
  },
  tour: {
    a: "De la demande",
    b: "à la clôture",
    body: "Suivez un vol dans NetPlus — de la demande du courtier au dernier rapport. Chaque écran ci-dessous est issu de l'application.",
    stages: ["Demande", "Autorisation", "Préparation", "Exécution & suivi", "À chaque étape", "Clôture"],
    stageLabel: "Étape",
    note: "Écrans présentés avec des données de démonstration (The Network Plan Airlines, exploitant de démonstration).",
    previous: "Écran précédent",
    next: "Écran suivant",
    items: [
      {
        screen: "feasibility",
        stage: 0,
        module: "Ventes & CRM · Faisabilité",
        title: ["Sachez qu'il peut voler", "avant de le chiffrer."],
        text: "Un courtier demande Tunis–Nice à 08:00 en Falcon 2000. La pré-vérification répond en quelques secondes, avec les mêmes données que l'OCC.",
        bullets: [
          "Route, temps bloc, disponibilité avion, aérodromes et temps de service équipage vérifiés selon les FTL",
          "Un verdict motivé : faisable, faisable avec réserves ou non faisable",
          "Un clic envoie la demande à l'OCC ; un devis confirmé devient un vol sur la chronologie",
        ],
        alt: "Pré-vérification de faisabilité Tunis–Nice",
      },
      {
        screen: "flight-analysis",
        stage: 1,
        module: "NetPlus Services · Analyse de vol",
        title: ["Autorisations, droits et route,", "vérifiés avant le dépôt."],
        text: "Saisissez DTTA → OMDB et une immatriculation. NetPlus liste chaque FIR et pays traversé, ce que chacun exige, et répond à chaque question séparément.",
        bullets: [
          "Autorisations de survol et d'atterrissage, PPR et créneaux, avec leurs délais",
          "Droits de trafic issus de 3 924 accords de services aériens dans 193 États",
          "NOTAM des FIR et aérodromes de la route analysés sur la fenêtre du vol",
        ],
        alt: "Analyse des autorisations de Tunis à Dubaï",
      },
      {
        screen: "fuel-stop",
        stage: 1,
        module: "NetPlus Services · Escale technique",
        title: ["Hors rayon d'action ?", "L'escale trouvée et vérifiée."],
        text: "Quand l'étape directe dépasse le rayon d'action de l'avion, NetPlus cherche les aérodromes en route et planifie les deux étapes via chacun d'eux.",
        bullets: [
          "Distance, temps de vol et carburant d'étape pour les deux tronçons de chaque candidat",
          "Longueur de piste, catégorie RFF, type de carburant et horaires validés ou signalés",
          "Recommandé, à revoir ou rejeté — chacun avec sa raison ; un clic l'applique",
        ],
        alt: "Analyse d'escale technique avec trois aérodromes recommandés",
      },
      {
        screen: "flight-planning",
        stage: 2,
        module: "Préparation des vols · Performances",
        title: ["Planifier, comparer, optimiser", "avant de voler."],
        text: "Flight Planning construit plusieurs routes sur le cycle AIRAC en vigueur, les évalue et vous permet de les comparer, de les modifier ou de coller la vôtre.",
        bullets: [
          "Options optimum, économie de carburant, plus courte et moins de changements d'airways, triées par coût total",
          "FIR fermées, zones de conflit et zones réglementées tracées sur chaque option",
          "Profil vertical et enveloppe charge-distance issus des tables de performances",
        ],
        alt: "Carte de préparation des vols avec options de route de Tunis à Dubaï",
      },
      {
        screen: "timeline",
        stage: 2,
        module: "Chronologie des vols · Gantt temps réel",
        title: ["La journée d'exploitation,", "avion par avion."],
        text: "Une ligne par avion, une barre par vol, en UTC — avec les plages AOG et maintenance publiées par la CAMO et une ligne rouge pour l'instant présent.",
        bullets: [
          "Vols actifs, retards, AOG, ponctualité et heures bloc de la journée",
          "Décaler, échanger ou déplacer un vol ; chaque modification est annulable et journalisée",
          "Un clic sur une barre ouvre le dossier de vol en huit onglets",
        ],
        alt: "Diagramme de Gantt des vols par flotte et par avion",
      },
      {
        screen: "dispatch",
        stage: 2,
        module: "Dispatch · Bureau central",
        title: ["Chaque vol de la journée,", "prêt ou non."],
        text: "Le bureau du dispatcher : une ligne par vol, colorée selon son état de préparation, et chaque action à un clic.",
        bullets: [
          "Services prêts ou en attente, autorisations manquantes, équipage non affecté, retards et AOG",
          "Indice de risque, ETD/ETA, CTOT, services et alerte FTL sur chaque ligne",
          "Messages MVT rédigés au format IATA et envoyés depuis le bureau",
        ],
        alt: "Bureau de dispatch avec indicateurs et liste des vols",
      },
      {
        screen: "crew-scheduling",
        stage: 2,
        module: "Programmation équipages · FTL",
        title: ["Seuls des équipages à jour et légaux", "rejoignent le vol."],
        text: "Chaque affectation passe par le moteur de limitations des temps de vol avant d'être enregistrée, et la raison de chaque siège vide est affichée.",
        bullets: [
          "EASA ORO.FTL ou EU-OPS sous-partie Q, choisi par flotte",
          "Licences, visites médicales, qualifications de type et formations récurrentes suivies, avec alerte 60 jours avant échéance",
          "Un élément obligatoire expiré rend le navigant non à jour — le générateur ne l'affecte jamais",
        ],
        alt: "Semaine de programmation équipages avec détail de la période de service",
      },
      {
        screen: "roster",
        stage: 2,
        module: "Planning automatique · Optimisation",
        title: ["Un mois légal,", "généré, amélioré, publié."],
        text: "Generate construit le mois, Optimise l'améliore, Launch le publie vers la chronologie, le dispatch et le suivi des vols.",
        bullets: [
          "Chaque siège de rotation pourvu uniquement par des équipages légaux — mois de démonstration : 90 % de 881 sièges, 0 infraction FTL",
          "La légalité est une condition stricte, jamais une pondération ; le résultat n'est jamais moins bon et reste annulable",
          "Avant publication, chaque case bloquée par le contrôle FTL est listée avec sa raison",
        ],
        alt: "Planning mensuel publié des équipages",
      },
      {
        screen: "irops",
        stage: 3,
        module: "IROPS · Opérations irrégulières",
        title: ["Quand la journée dérape,", "les options de reprise d'abord."],
        text: "Perturbations actives, vols, avions et équipages concernés et annulations potentielles sur un seul bandeau, avec des couches de perturbation sur la carte.",
        bullets: [
          "Cause, impact opérationnel, exposition aux retards et effet en cascade pour chaque événement",
          "Actions de reprise, chacune avec sa cible, sa faisabilité et sa raison",
          "L'OCC examine, accepte ou rejette — rien ne change sans décision",
        ],
        alt: "Carte du centre de contrôle IROPS avec événements actifs",
      },
      {
        screen: "flight-watch",
        stage: 3,
        module: "Suivi des vols · Flight watch",
        title: ["Chaque vol sur une carte,", "classé par risque."],
        text: "Fond satellite, sombre ou plan, avec routes, aéroports, FIR/UIR, radar météo et trafic ADS-B en direct à la demande.",
        bullets: [
          "Liste des vols classée selon l'aperçu proactif des risques du SGS, avec les éléments MEL signalés",
          "Route, niveau, vitesse sol et progression par rapport au programme ; dégagements issus de l'OM-C",
          "Le plan d'intervention d'urgence s'ouvre directement depuis la barre supérieure",
        ],
        alt: "Carte de suivi des vols actifs",
      },
      {
        screen: "lvp",
        stage: 3,
        module: "Basse visibilité · LVP",
        title: ["Minima et visibilité,", "décidés sur des chiffres."],
        text: "La basse visibilité est évaluée vol par vol selon les minima de l'exploitant, sur une carte météo en direct avec une chronologie de 12 heures.",
        bullets: [
          "METAR et TAF décodés ; RVR par piste au toucher, à mi-piste et en fin de piste",
          "Décollage et approche évalués selon les minima de l'exploitant et les approbations SPA.LVO",
          "Le statut LVP est déclaré par l'OCC, horodaté et sourcé — jamais déduit",
        ],
        alt: "Écran des procédures basse visibilité en mode scénario d'entraînement",
      },
      {
        screen: "vigil",
        stage: 3,
        module: "VIGIL · Intelligence opérationnelle",
        title: ["Six niveaux d'analyse", "sur chaque vol."],
        text: "VIGIL détecte, prédit, priorise, recommande et explique. Il ne modifie jamais un avion, un équipage, une route ou une remise en service — l'OCC décide.",
        bullets: [
          "Données, règles, apprentissage, risque, alertes et conseils, sur chaque vol",
          "Un score de risque explicable de 0 à 100 par vol, avec ses contributeurs",
          "Demandez à VIGIL : situation actuelle, vols à risque, 12 prochaines heures, relève",
        ],
        alt: "Analyse VIGIL du vol TNP182 avec un score de risque de 76/100",
      },
      {
        screen: "camo-manager",
        stage: 4,
        module: "CAMO · Tech log · MEL",
        title: ["L'autorité sur", "l'état des avions."],
        text: "Quand la CAMO déclare un avion AOG ou non navigable, la chronologie, le dispatch, l'IROPS et VIGIL le savent immédiatement.",
        bullets: [
          "ARC, prochaine visite, AD/SB ouvertes et pièces à durée de vie limitée par avion",
          "Défauts différés selon la MEL avec leur catégorie et leur délai de rectification",
          "Chaque chiffre recalculé à partir des enregistrements audités — jamais ressaisi",
        ],
        alt: "Tableau de bord CAMO avec l'état de la flotte",
      },
      {
        screen: "sms",
        stage: 4,
        module: "SGS · Annexe 19 OACI · ERP",
        title: ["Un système de sécurité intégré", "à chaque module."],
        text: "Le SGS lit la CAMO, le tech log, les équipages, la formation, le planning, le dispatch et le suivi des vols, et son moteur de risque évalue chaque vol.",
        bullets: [
          "Événements, registre des risques, enquêtes, SPI, audits et gestion du changement",
          "Dix types de rapports de sécurité pour tout le personnel, confidentiels ou anonymes",
          "Un plan d'intervention d'urgence armé en permanence, activé par deux signatures",
        ],
        alt: "Vue d'ensemble du gestionnaire de sécurité",
      },
      {
        screen: "reports",
        stage: 5,
        module: "Clôture · Rapports & analytique",
        title: ["Du dernier mouvement", "au dernier rapport."],
        text: "Commercial, opérations et direction lisent les mêmes vols : les chiffres du rapport sont ceux de la journée.",
        bullets: [
          "MVT depuis le vol ; le dossier de voyage liste ce qui bloque encore la clôture",
          "28 rapports intégrés exportables en PDF, CSV, Excel ou JSON",
          "Un rapport VIGIL toutes les six heures avec ce qui a changé depuis le précédent",
        ],
        alt: "Rapports et analytique : temps bloc par mois",
      },
    ] as TourItem[],
  },
  roles: {
    a: "Conçu pour",
    b: "chaque métier",
    items: [
      { role: "Contrôle des opérations", team: "OCC", text: "Toute l'exploitation sur un écran — suivi de flotte, IROPS, basse visibilité et alertes VIGIL, chaque tuile ouvrant l'écran qui permet d'agir." },
      { role: "Planification des équipages", team: "Équipages & Planning", text: "Un mois légal généré, optimisé et publié, chaque affectation étant vérifiée par le moteur FTL avant d'être enregistrée." },
      { role: "Maintien de la navigabilité", team: "CAMO", text: "État de la flotte, AD/SB, pièces à durée de vie limitée et reports MEL — le statut défini ici atteint tous les modules à la fois." },
      { role: "Sécurité & dirigeant responsable", team: "SGS · ERP", text: "Événements, registre des risques, SPI et audits, ainsi qu'un plan d'intervention d'urgence armé en permanence." },
    ],
  },
  contact: {
    title: "Prêt à décoller ?",
    lead: "Une seule couche opérationnelle pour toute la compagnie — NetPlus.",
    body: "NetPlus arrive bientôt. Laissez votre adresse e-mail : notre équipe vous contactera pour un accès anticipé et une présentation personnalisée de la plateforme sur données de démonstration.",
    windowAlt: "Ciel doré au-dessus des nuages, vu à travers un hublot",
  },
  footer: {
    blurb: "Dispatch, trip support, suivi des vols, équipages, CAMO, sécurité et ventes — pour les exploitants qui gèrent leur propre OCC.",
    motto: "Smarter Aviation Solutions",
    platform: "Plateforme",
    platformLinks: ["Ventes & faisabilité", "Autorisations & trip support", "Dispatch & suivi des vols", "Équipages & planning", "CAMO & sécurité"],
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
