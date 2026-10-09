"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "fr";

const en = {
  banner: {
    line: "An open-source civic project. Not affiliated with the Government of Canada or the U.S. Census Bureau.",
    badge: "Open source",
  },
  nav: { chart: "The chart", sectors: "Sectors", showcase: "Showcase", caveats: "Caveats", methodology: "Methodology", developers: "Developers", data: "Data", back: "All projects" },
  hero: {
    kicker: "Nshipyard Canada · The Adoption Inversion",
    title: "On the one AI question both countries asked, Canada was ahead.",
    sub: "Statistics Canada asked businesses whether they used AI to produce goods or deliver services. The U.S. Census Bureau asked businesses nearly the same question. In 2025 the answers were 12.2% in Canada and 10.0% in the United States. This page charts the two official series, documents exactly how they were harmonized, and marks where the comparison stops being honest.",
    cta1: "See the chart",
    cta2: "Read the methodology",
  },
  stats: [
    { value: "12.2%", label: "of Canadian businesses used AI to produce goods or deliver services, Q2 2025 (StatCan), up from 6.1% a year earlier" },
    { value: "10.0%", label: "of U.S. businesses used AI in producing goods or services, September 2025 (Census BTOS, legacy wording)" },
    { value: "19.2%", label: "Canada's latest reading, Q2 2026, the most recent StatCan release at the time this page was built" },
    { value: "Nov 2025", label: "the U.S. Census changed the question to broader wording; everything after that date is a different series and is not charted here" },
  ],
  chart: {
    kicker: "The chart",
    title: "Same question, two governments.",
    sub: "Share of businesses using AI, Canada (red) vs United States (grey). Canada's points come from the Canadian Survey on Business Conditions, asked once a year. The U.S. line is the Census Bureau's Business Trends and Outlook Survey legacy question, asked every two weeks from September 2023 to November 2025.",
    annotation: "Same question, both governments. Canada was ahead.",
    breakLabel: "U.S. changed the question; the series after this date is not comparable",
    canadaLabel: "Canada (StatCan)",
    usLabel: "United States (Census, legacy wording)",
    note: "Canada's points are annual (Q2 2024, Q2 2025, Q2 2026). The U.S. series is biweekly; the labeled points are the September fortnights.",
  },
  sectors: {
    kicker: "Sectors",
    title: "Where the lead is widest.",
    sub: "2025, same three sectors on both sides of the border. Canada's figures are Q2 2025; the U.S. figures are the September 2025 fortnight of the legacy series.",
    rows: [
      { name: "Information and cultural industries / Information", ca: 35.6, us: 29.3, note: "StatCan groups cultural industries with information; the U.S. NAICS 51 is information only." },
      { name: "Professional, scientific and technical services", ca: 31.7, us: 23.9, note: "" },
      { name: "Finance and insurance", ca: 30.6, us: 17.1, note: "" },
    ],
    canadaCol: "Canada",
    usCol: "United States",
    footnote: "Sector mapping is documented in the methodology. No adjustment was made for the grouping difference.",
  },
  firmsize: {
    kicker: "Firm size",
    title: "Adoption by firm size, U.S. only.",
    sub: "September 2025 fortnight, Census BTOS legacy question. Adoption is U-shaped: the smallest and the largest firms report the most AI use.",
    usOnly: "U.S. only. Statistics Canada publishes firm-size cuts in Table 33-10-1005, which was not retrievable when this page was built; the Canadian panel will be added in the next update.",
    bands: ["1-4", "5-9", "10-19", "20-49", "50-99", "100-249", "250+"],
  },
  caveats: {
    kicker: "Caveats",
    title: "What this does not show.",
    items: [
      "The reference windows differ. Statistics Canada asks about AI use over the 12 months preceding the survey; the Census Bureau asks about the last two weeks. A 12-month window mechanically raises the share answering yes, so part of Canada's lead reflects the window, not just adoption. This is the largest honest discount on the headline.",
      "The U.S. changed the question on November 17, 2025, from 'in producing goods or services' to 'in any of its business functions'. The Census Bureau started a new time series on December 4, 2025. Only the pre-break fortnights are charted here; nothing after the break is comparable.",
      "U.S. readings published after the question change, including figures circulating in curated datasets, were not verified against Census files at build time and are not charted. Do not splice them onto this line.",
      "Both surveys weight by firm count, not by employment. In Canada, small and medium businesses employ about 64% of private-sector workers (ISED, Key Small Business Statistics 2024). Economies with more small firms mechanically show lower firm-count-weighted adoption at identical per-worker use.",
      "The curated dataset that first popularized the U.S. series explicitly warns its headline figures are not comparable across its own cuts and does not cover Canada. Its numbers were not used here; every U.S. figure on this page comes from the Census Bureau's own files.",
      "Canada's firm-size cuts (StatCan Table 33-10-1005) could not be retrieved at build time, so the firm-size panel is U.S.-only. The sector panel uses the three sectors published on both sides.",
    ],
  },
  rebuttal: {
    kicker: "Why this exists",
    title: "The claim being rebutted.",
    body: "Through 2026, commentary has repeated that Canadian businesses trail U.S. businesses in AI adoption, including a Macdonald-Laurier Institute piece in October 2026 and widely shared KPMG-sourced claims of 72% U.S. versus 35% Canadian large-firm use. Those comparisons mix different questions, different reference windows, and different firm-size cuts. On the one question both governments asked in nearly identical words, the official numbers say the opposite. That is the entire argument of this page, and the caveats above are part of it.",
  },
  showcase: {
    kicker: "Showcase",
    title: "Questions you couldn't ask before.",
    body: "Three questions this page answers for the first time, each with its number and its source.",
    source: "Sources",
    items: [
      {
        q: "Was Canada really behind the US in AI adoption?",
        answer: "No. On the nearly identically worded survey question, 12.2% of Canadian businesses used AI in Q2 2025, against 10.0% of US businesses in September 2025. The 'Canada lags' narrative rests on mismatched numbers.",
        sources: "Statistics Canada, Canadian Survey on Business Conditions; U.S. Census Bureau, Business Trends and Outlook Survey",
      },
      {
        q: "Which Canadian sectors lead AI adoption?",
        answer: "Information and cultural industries at 35.6%, professional, scientific and technical services at 31.7%, and finance and insurance at 30.6%, all in Q2 2025.",
        sources: "Statistics Canada, Canadian Survey on Business Conditions, Q2 2025",
      },
      {
        q: "What happened when the US changed its survey question?",
        answer: "In November 2025 the Census Bureau changed the wording to 'in any of its business functions' and the US reading jumped to 17.3%. That is a methodology break, not real adoption growth, which is why this page uses only the pre-break series.",
        sources: "U.S. Census Bureau, Business Trends and Outlook Survey",
      },
    ],
  },
  methodology: {
    kicker: "Methodology",
    title: "How the comparison was built, and where it is weak.",
    items: [
      "Canada: Canadian Survey on Business Conditions, Q2 2025. 12.2% of businesses reported using AI to produce goods or deliver services over the 12 months preceding the survey, up from 6.1% in Q2 2024. Source: Statistics Canada analytical publication 11-621-m2025008, released 2025-06-16, which cites CSBC Table 33-10-1004-01. Q2 2026: 19.2% (publication 11-621-m2026010). Sample: 21,357 businesses invited, 9,103 respondents. Collection: April 1 to May 5, 2025.",
      "United States: Census Bureau Business Trends and Outlook Survey, legacy question 'In the last two weeks, did this business use Artificial Intelligence (AI) in producing goods or services?' National 'Yes' shares from the Census Bureau's own AI Core Questions file (original wording series), pulled 2026-10-09. September reference points: 3.7% (Sept 2023), 6.0% (Sept 2024), 10.0% (Sept 2025). The full biweekly series of 54 fortnights is charted and downloadable.",
      "Question wording is nearly identical in verbs and scope; the reference window is not (12 months vs two weeks). The window difference is disclosed as the largest caveat, not adjusted away.",
      "Wording break: the Census Bureau changed the question on November 17, 2025 and began a new time series with data released December 4, 2025 (Census notice, December 3, 2025). Only fortnights before the break are used. Post-break values are not charted because they were not verified against Census files.",
      "Sector mapping: StatCan 'information and cultural industries' to BTOS NAICS 51 (Information); 'finance and insurance' to NAICS 52; 'professional, scientific and technical services' to NAICS 54. StatCan's grouping includes cultural industries alongside information; the U.S. 51 is information only. Documented, not adjusted.",
      "Table-number note: the StatCan publication cites Table 33-10-1004-01. The StatCan bulk CSV download served stale content for this cube at build time, so headline and sector figures are transcribed from the publication text, which is the primary source. The transcription was checked twice against the publication.",
      "Quarterly update procedure: each quarter, re-pull the CSBC AI analysis (catalogue 11-621-m) and the Census BTOS AI Core Questions file; append the new headline point and September-equivalent U.S. point; re-verify the September labels against the file; if the Census changes wording again, freeze the series and draw a new break line.",
    ],
  },
  developers: {
    kicker: "For developers",
    title: "Query it from code, or from an agent.",
    body: "Three consumption paths, same canonical data. REST for applications, OpenAPI for integration, MCP tools over streamable HTTP for AI agents.",
    endpoints: "Endpoints",
    tryIt: "Try it",
    openapi: "OpenAPI spec",
    mcpTitle: "MCP server",
    mcpBody: "One streamable-HTTP endpoint. Tools: series_lookup, sector_comparison, firmsize_us, coverage.",
  },
  mcp: {
    kicker: "Connect your agent",
    title: "Put this data to work inside your AI tools.",
    body: "Pick your harness, copy the prompt, send it to your agent. Your agent runs the setup itself.",
    tabs: { chatgpt: "ChatGPT", claude: "Claude", claudecode: "Claude Code", cli: "CLI", other: "Other" },
    cardTitle: "Copy and send this to {tab}",
    copy: "Copy",
    copied: "Copied",
    chatgptNote: "ChatGPT connects through the documented REST API rather than MCP directly.",
    pChatgpt:
      "I want to use the {displayName} through its API.\n- OpenAPI spec: {origin}/api/openapi.json\n- REST base: {origin}/api/v1\nFirst tell me in two sentences what this API offers, then {exampleLower}, and show me the result.",
    pClaude:
      "In Claude (claude.ai), open Settings, then Connectors, and add a custom connector:\n- Name: {displayName}\n- URL: {origin}/mcp\nThen list the available tools, {exampleLower}, and show me the result.",
    pClaudeCode:
      "Set up the {displayName} MCP server so I can query it from here.\n1. Run: claude mcp add --transport http {slug} {origin}/mcp\n2. Run `claude mcp list` to confirm it connected.\n3. {example}, and show me the result.",
    pCli:
      "# MCP endpoint (streamable HTTP)\n{origin}/mcp\n\n# List the available tools\ncurl -s -X POST {origin}/mcp -H 'Content-Type: application/json' \\\n  -d '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}'",
    otherTitle: "Everything else",
    otherBody: "Any harness that speaks MCP over streamable HTTP, or plain REST.",
    mcpEndpoint: "MCP endpoint",
    openapiSpec: "OpenAPI spec",
    restBase: "REST base",
  },
  downloads: {
    kicker: "Data",
    title: "Take the files.",
    body: "The harmonized series, sector and firm-size cuts, and the build metadata, MIT licensed, as JSON and CSV.",
    files: [
      { name: "us_legacy_series.json", desc: "Full U.S. biweekly legacy series plus September points, sectors, firm sizes" },
      { name: "canada.json", desc: "StatCan headline points, sector cuts, and source citations" },
      { name: "us_fortnightly.csv", desc: "U.S. fortnightly Yes shares with collection and reference dates" },
      { name: "canada_headline.csv", desc: "Canada headline points with collection windows and sources" },
      { name: "us_sectors_sept2025.csv", desc: "U.S. sector Yes shares, September 2025 fortnight" },
      { name: "canada_sectors_q2_2025.csv", desc: "Canada sector Yes shares, Q2 2025" },
      { name: "us_firmsize_sept2025.csv", desc: "U.S. firm-size Yes shares, September 2025 fortnight" },
      { name: "meta.json", desc: "Headline comparison, key caveat, sources, pull date" },
    ],
    download: "Download",
  },
  footer: {
    line: "An open-source civic project. Not affiliated with the Government of Canada or the U.S. Census Bureau.",
    sources: "Canada: Statistics Canada, Canadian Survey on Business Conditions (11-621-m2025008, 11-621-m2026010). United States: U.S. Census Bureau, Business Trends and Outlook Survey, AI Core Questions file (legacy wording series). SME employment share: ISED, Key Small Business Statistics 2024.",
  },
};

export type Dict = typeof en;

const fr: Dict = {
  banner: {
    line: "Un projet civique à code source ouvert. Sans affiliation avec le gouvernement du Canada ni le Bureau du recensement des États-Unis.",
    badge: "Code source ouvert",
  },
  nav: { chart: "Le graphique", sectors: "Secteurs", showcase: "Vitrine", caveats: "Réserves", methodology: "Méthodologie", developers: "Développeurs", data: "Données", back: "Tous les projets" },
  hero: {
    kicker: "Nshipyard Canada · L'inversion de l'adoption",
    title: "Sur la seule question d'IA posée par les deux pays, le Canada était en tête.",
    sub: "Statistique Canada a demandé aux entreprises si elles utilisaient l'IA pour produire des biens ou fournir des services. Le Bureau du recensement des États-Unis a posé aux entreprises presque la même question. En 2025, les réponses étaient de 12,2 % au Canada et de 10,0 % aux États-Unis. Cette page trace les deux séries officielles, documente exactement comment elles ont été harmonisées, et marque où la comparaison cesse d'être honnête.",
    cta1: "Voir le graphique",
    cta2: "Lire la méthodologie",
  },
  stats: [
    { value: "12,2 %", label: "des entreprises canadiennes utilisaient l'IA pour produire des biens ou fournir des services, T2 2025 (StatCan), contre 6,1 % un an plus tôt" },
    { value: "10,0 %", label: "des entreprises américaines utilisaient l'IA pour produire des biens ou services, septembre 2025 (BTOS du recensement, libellé d'origine)" },
    { value: "19,2 %", label: "dernière mesure du Canada, T2 2026, la plus récente publication de StatCan au moment de la création de cette page" },
    { value: "Nov 2025", label: "le recensement américain a changé le libellé de la question; tout ce qui suit est une autre série et n'est pas tracé ici" },
  ],
  chart: {
    kicker: "Le graphique",
    title: "Même question, deux gouvernements.",
    sub: "Part des entreprises utilisant l'IA, Canada (rouge) contre États-Unis (gris). Les points du Canada viennent de l'Enquête canadienne sur la situation des entreprises, posée une fois par an. La ligne américaine est la question d'origine de l'enquête Business Trends and Outlook Survey du Bureau du recensement, posée toutes les deux semaines de septembre 2023 à novembre 2025.",
    annotation: "Même question, deux gouvernements. Le Canada était en tête.",
    breakLabel: "Les É.-U. ont changé la question; la série après cette date n'est pas comparable",
    canadaLabel: "Canada (StatCan)",
    usLabel: "États-Unis (recensement, libellé d'origine)",
    note: "Les points du Canada sont annuels (T2 2024, T2 2025, T2 2026). La série américaine est bimensuelle; les points étiquetés sont les quinzaines de septembre.",
  },
  sectors: {
    kicker: "Secteurs",
    title: "Où l'avance est la plus nette.",
    sub: "2025, les trois mêmes secteurs des deux côtés de la frontière. Chiffres du Canada au T2 2025; chiffres américains de la quinzaine de septembre 2025 de la série d'origine.",
    rows: [
      { name: "Industries de l'information et industries culturelles / Information", ca: 35.6, us: 29.3, note: "StatCan regroupe les industries culturelles avec l'information; le SCIAN 51 américain est l'information seulement." },
      { name: "Services professionnels, scientifiques et techniques", ca: 31.7, us: 23.9, note: "" },
      { name: "Finance et assurances", ca: 30.6, us: 17.1, note: "" },
    ],
    canadaCol: "Canada",
    usCol: "États-Unis",
    footnote: "La correspondance des secteurs est documentée dans la méthodologie. Aucun ajustement n'a été appliqué pour la différence de regroupement.",
  },
  firmsize: {
    kicker: "Taille des entreprises",
    title: "Adoption par taille d'entreprise, É.-U. seulement.",
    sub: "Quinzaine de septembre 2025, question d'origine du BTOS du recensement. L'adoption est en U : les plus petites et les plus grandes entreprises déclarent le plus d'usage de l'IA.",
    usOnly: "États-Unis seulement. Statistique Canada publie les tranches de taille dans le tableau 33-10-1005, qui n'était pas récupérable lors de la création de cette page; le panneau canadien sera ajouté à la prochaine mise à jour.",
    bands: ["1-4", "5-9", "10-19", "20-49", "50-99", "100-249", "250+"],
  },
  caveats: {
    kicker: "Réserves",
    title: "Ce que ceci ne montre pas.",
    items: [
      "Les fenêtres de référence diffèrent. Statistique Canada demande l'usage de l'IA au cours des 12 mois précédant l'enquête; le Bureau du recensement demande les deux dernières semaines. Une fenêtre de 12 mois augmente mécaniquement la part de oui, donc une partie de l'avance du Canada reflète la fenêtre, pas seulement l'adoption. C'est la plus grande décote honnête sur le titre.",
      "Les États-Unis ont changé la question le 17 novembre 2025, de « pour produire des biens ou des services » à « dans l'une ou l'autre de ses fonctions d'affaires ». Le Bureau du recensement a commencé une nouvelle série chronologique le 4 décembre 2025. Seules les quinzaines d'avant la rupture sont tracées ici; rien après la rupture n'est comparable.",
      "Les mesures américaines publiées après le changement de question, y compris des chiffres circulant dans des jeux de données organisés par des tiers, n'ont pas été vérifiées contre les fichiers du recensement au moment de la création et ne sont pas tracées. Ne les raccordez pas à cette ligne.",
      "Les deux enquêtes pondèrent par nombre d'entreprises, pas par emploi. Au Canada, les petites et moyennes entreprises emploient environ 64 % des travailleurs du secteur privé (ISDE, Principales statistiques relatives aux petites entreprises 2024). Les économies comptant plus de petites entreprises affichent mécaniquement une adoption plus faible à usage par travailleur égal.",
      "Le jeu de données organisé qui a d'abord popularisé la série américaine avertit explicitement que ses chiffres titres ne sont pas comparables entre ses propres tranches et ne couvre pas le Canada. Ses chiffres n'ont pas été utilisés ici; chaque chiffre américain de cette page vient des fichiers du Bureau du recensement.",
      "Les tranches de taille du Canada (tableau 33-10-1005 de StatCan) n'ont pas pu être récupérées au moment de la création, donc le panneau par taille est américain seulement. Le panneau sectoriel utilise les trois secteurs publiés des deux côtés.",
    ],
  },
  rebuttal: {
    kicker: "Pourquoi ceci existe",
    title: "L'affirmation réfutée.",
    body: "En 2026, des commentaires ont répété que les entreprises canadiennes accusent un retard sur les américaines en adoption de l'IA, dont un texte de l'Institut Macdonald-Laurier en octobre 2026 et des affirmations largement partagées attribuées à KPMG (72 % aux É.-U. contre 35 % au Canada pour les grandes entreprises). Ces comparaisons mélangent des questions différentes, des fenêtres de référence différentes et des tranches de taille différentes. Sur la seule question posée en termes presque identiques par les deux gouvernements, les chiffres officiels disent le contraire. C'est tout l'argument de cette page, et les réserves ci-dessus en font partie.",
  },
  showcase: {
    kicker: "Vitrine",
    title: "Des questions qu'on ne pouvait pas poser avant.",
    body: "Trois questions auxquelles cette page répond pour la première fois, chacune avec son chiffre et sa source.",
    source: "Sources",
    items: [
      {
        q: "Le Canada était-il vraiment en retard sur les États-Unis en adoption de l'IA ?",
        answer: "Non. Sur la question posée en termes presque identiques, 12,2 % des entreprises canadiennes utilisaient l'IA au T2 2025, contre 10,0 % des entreprises américaines en septembre 2025. Le récit du « retard canadien » repose sur des chiffres incomparables.",
        sources: "Statistique Canada, Enquête canadienne sur la situation des entreprises; Bureau du recensement des États-Unis, Business Trends and Outlook Survey",
      },
      {
        q: "Quels secteurs canadiens mènent l'adoption de l'IA ?",
        answer: "Les industries de l'information et culturelles à 35,6 %, les services professionnels, scientifiques et techniques à 31,7 %, et la finance et les assurances à 30,6 %, tous au T2 2025.",
        sources: "Statistique Canada, Enquête canadienne sur la situation des entreprises, T2 2025",
      },
      {
        q: "Que s'est-il passé quand les États-Unis ont changé leur question ?",
        answer: "En novembre 2025, le Bureau du recensement a changé le libellé pour « dans l'une ou l'autre de ses fonctions d'affaires » et la mesure américaine a bondi à 17,3 %. C'est une rupture méthodologique, pas une croissance réelle de l'adoption, et c'est pourquoi cette page n'utilise que la série d'avant la rupture.",
        sources: "Bureau du recensement des États-Unis, Business Trends and Outlook Survey",
      },
    ],
  },
  methodology: {
    kicker: "Méthodologie",
    title: "Comment la comparaison a été construite, et où elle est faible.",
    items: [
      "Canada : Enquête canadienne sur la situation des entreprises, T2 2025. 12,2 % des entreprises ont déclaré avoir utilisé l'IA pour produire des biens ou fournir des services au cours des 12 mois précédant l'enquête, contre 6,1 % au T2 2024. Source : publication analytique 11-621-m2025008 de Statistique Canada, diffusée le 2025-06-16, qui cite le tableau 33-10-1004-01 de l'ECSE. T2 2026 : 19,2 % (publication 11-621-m2026010). Échantillon : 21 357 entreprises invitées, 9 103 répondantes. Collecte : du 1er avril au 5 mai 2025.",
      "États-Unis : enquête Business Trends and Outlook Survey du Bureau du recensement, question d'origine « Au cours des deux dernières semaines, cette entreprise a-t-elle utilisé l'intelligence artificielle (IA) pour produire des biens ou des services? » Parts nationales de « oui » tirées du fichier AI Core Questions du Bureau du recensement (série au libellé d'origine), récupéré le 2026-10-09. Points de septembre : 3,7 % (sept. 2023), 6,0 % (sept. 2024), 10,0 % (sept. 2025). La série bimensuelle complète de 54 quinzaines est tracée et téléchargeable.",
      "Le libellé des questions est presque identique dans les verbes et la portée; la fenêtre de référence ne l'est pas (12 mois contre deux semaines). La différence de fenêtre est divulguée comme la plus grande réserve, pas ajustée.",
      "Rupture de libellé : le Bureau du recensement a changé la question le 17 novembre 2025 et a commencé une nouvelle série avec les données diffusées le 4 décembre 2025 (avis du recensement, 3 décembre 2025). Seules les quinzaines d'avant la rupture sont utilisées. Les valeurs d'après la rupture ne sont pas tracées car non vérifiées contre les fichiers du recensement.",
      "Correspondance des secteurs : « industries de l'information et industries culturelles » de StatCan vers le SCIAN 51 (Information) du BTOS; « finance et assurances » vers le SCIAN 52; « services professionnels, scientifiques et techniques » vers le SCIAN 54. Le regroupement de StatCan inclut les industries culturelles avec l'information; le 51 américain est l'information seulement. Documenté, non ajusté.",
      "Note sur le numéro de tableau : la publication de StatCan cite le tableau 33-10-1004-01. Le téléchargement CSV en vrac de StatCan servait un contenu périmé pour ce cube au moment de la création, donc les chiffres titres et sectoriels sont transcrits du texte de la publication, qui est la source primaire. La transcription a été vérifiée deux fois contre la publication.",
      "Procédure de mise à jour trimestrielle : chaque trimestre, récupérer à nouveau l'analyse IA de l'ECSE (catalogue 11-621-m) et le fichier AI Core Questions du BTOS; ajouter le nouveau point titre et le point américain équivalent de septembre; revérifier les étiquettes de septembre contre le fichier; si le recensement change à nouveau le libellé, geler la série et tracer une nouvelle ligne de rupture.",
    ],
  },
  developers: {
    kicker: "Pour les développeurs",
    title: "Interrogez-la depuis du code, ou depuis un agent.",
    body: "Trois façons de consommer les mêmes données canoniques. REST pour les applications, OpenAPI pour l'intégration, outils MCP en HTTP continu pour les agents IA.",
    endpoints: "Points de terminaison",
    tryIt: "Essayer",
    openapi: "Spécification OpenAPI",
    mcpTitle: "Serveur MCP",
    mcpBody: "Un point de terminaison HTTP continu. Outils : series_lookup, sector_comparison, firmsize_us, coverage.",
  },
  mcp: {
    kicker: "Connectez votre agent",
    title: "Exploitez ces données dans vos outils d'IA.",
    body: "Choisissez votre plateforme, copiez l'invite, envoyez-la à votre agent. Votre agent exécute la configuration lui-même.",
    tabs: { chatgpt: "ChatGPT", claude: "Claude", claudecode: "Claude Code", cli: "CLI", other: "Autre" },
    cardTitle: "Copiez et envoyez ceci à {tab}",
    copy: "Copier",
    copied: "Copié",
    chatgptNote: "ChatGPT se connecte via l'API REST documentée plutôt que directement en MCP.",
    pChatgpt:
      "Je veux utiliser {displayName} via son API.\n- Spécification OpenAPI : {origin}/api/openapi.json\n- Base REST : {origin}/api/v1\nD'abord, dis-moi en deux phrases ce que cette API offre, puis {exampleLower}, et montre-moi le résultat.",
    pClaude:
      "Dans Claude (claude.ai), ouvre les paramètres, puis Connecteurs, et ajoute un connecteur personnalisé :\n- Nom : {displayName}\n- URL : {origin}/mcp\nEnsuite, liste les outils disponibles, {exampleLower}, et montre-moi le résultat.",
    pClaudeCode:
      "Configure le serveur MCP {displayName} pour que je puisse l'interroger d'ici.\n1. Exécute : claude mcp add --transport http {slug} {origin}/mcp\n2. Exécute `claude mcp list` pour confirmer la connexion.\n3. {example}, et montre-moi le résultat.",
    pCli:
      "# Point de terminaison MCP (HTTP continu)\n{origin}/mcp\n\n# Lister les outils disponibles\ncurl -s -X POST {origin}/mcp -H 'Content-Type: application/json' \\\n  -d '{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"tools/list\"}'",
    otherTitle: "Tout le reste",
    otherBody: "Toute plateforme qui parle MCP en HTTP continu, ou REST tout court.",
    mcpEndpoint: "Point de terminaison MCP",
    openapiSpec: "Spécification OpenAPI",
    restBase: "Base REST",
  },
  downloads: {
    kicker: "Données",
    title: "Prenez les fichiers.",
    body: "La série harmonisée, les tranches sectorielles et par taille, et les métadonnées de construction, sous licence MIT, en JSON et CSV.",
    files: [
      { name: "us_legacy_series.json", desc: "Série américaine bimensuelle d'origine complète, points de septembre, secteurs, tailles" },
      { name: "canada.json", desc: "Points titres de StatCan, tranches sectorielles et citations de sources" },
      { name: "us_fortnightly.csv", desc: "Parts de oui américaines par quinzaine avec dates de collecte et de référence" },
      { name: "canada_headline.csv", desc: "Points titres du Canada avec fenêtres de collecte et sources" },
      { name: "us_sectors_sept2025.csv", desc: "Parts de oui par secteur aux É.-U., quinzaine de septembre 2025" },
      { name: "canada_sectors_q2_2025.csv", desc: "Parts de oui par secteur au Canada, T2 2025" },
      { name: "us_firmsize_sept2025.csv", desc: "Parts de oui par taille d'entreprise aux É.-U., quinzaine de septembre 2025" },
      { name: "meta.json", desc: "Comparaison titre, réserve principale, sources, date de récupération" },
    ],
    download: "Télécharger",
  },
  footer: {
    line: "Un projet civique à code source ouvert. Sans affiliation avec le gouvernement du Canada ni le Bureau du recensement des États-Unis.",
    sources: "Canada : Statistique Canada, Enquête canadienne sur la situation des entreprises (11-621-m2025008, 11-621-m2026010). États-Unis : Bureau du recensement des États-Unis, Business Trends and Outlook Survey, fichier AI Core Questions (série au libellé d'origine). Part d'emploi des PME : ISDE, Principales statistiques relatives aux petites entreprises 2024.",
  },
};

const dicts: Record<Lang, Dict> = { en, fr };

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangCtx.Provider value={{ lang, setLang, t: dicts[lang] }}>{children}</LangCtx.Provider>;
}

export function useLang() {
  return useContext(LangCtx);
}
