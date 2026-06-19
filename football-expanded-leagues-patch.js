(function applyExpandedLeaguesPatch() {
  const data = window.FOOTBALL_EXPANDED_LEAGUES_2026;
  if (!data || !Array.isArray(data.players) || !Array.isArray(window.FOOTBALL_PLAYERS)) return;

  const slug = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const translations = window.FOOTBALL_EXPANDED_LEAGUE_ZH || {};
  window.FOOTBALL_ZH_ALIASES = Object.assign(
    window.FOOTBALL_ZH_ALIASES || {},
    translations,
  );

  const countryNames = {
    "Bosnia-Herzegovina": "Bosnia and Herzegovina",
    "Korea, South": "South Korea",
    "The Gambia": "Gambia",
    "Türkiye": "Turkey",
    "St. Vincent & Grenadinen": "Saint Vincent and the Grenadines",
  };
  data.players.forEach((entry) => {
    const originalName = entry.name;
    const translated = translations[originalName];
    entry.aliases = [...new Set([...(entry.aliases || []), translated].filter(Boolean))];
    if (originalName === "Heung-min Son") {
      entry.name = "Son Heung-min";
      entry.aliases.push("Heung-min Son");
    }
    if (entry.meta && countryNames[entry.meta.country]) {
      entry.meta.country = countryNames[entry.meta.country];
    }
  });

  window.FOOTBALL_PLAYERS.push(...data.players);

  const leagueQuestions = [
    {
      id: "league_primeira_liga",
      text: "TA 现在在葡超踢球吗？",
      chip: "葡超",
      weight: 1.48,
      family: "scope",
      meta: { currentLeague: true, league: "Portuguese Primeira Liga" },
    },
    {
      id: "league_super_lig",
      text: "TA 现在在土超踢球吗？",
      chip: "土超",
      weight: 1.48,
      family: "scope",
      meta: { currentLeague: true, league: "Turkish Super Lig" },
    },
    {
      id: "league_eredivisie",
      text: "TA 现在在荷甲踢球吗？",
      chip: "荷甲",
      weight: 1.48,
      family: "scope",
      meta: { currentLeague: true, league: "Dutch Eredivisie" },
    },
    {
      id: "league_mls",
      text: "TA 现在在美职联踢球吗？",
      chip: "美职联",
      weight: 1.48,
      family: "scope",
      meta: { currentLeague: true, league: "Major League Soccer" },
    },
  ];

  if (!Array.isArray(window.FOOTBALL_DYNAMIC_QUESTIONS)) {
    window.FOOTBALL_DYNAMIC_QUESTIONS = [];
  }
  const replacedIds = new Set(leagueQuestions.map((question) => question.id));
  data.clubs.forEach((entry) => replacedIds.add(`club_${slug(entry.club)}`));
  window.FOOTBALL_DYNAMIC_QUESTIONS = window.FOOTBALL_DYNAMIC_QUESTIONS.filter(
    (question) => !replacedIds.has(question.id),
  );
  window.FOOTBALL_DYNAMIC_QUESTIONS.push(...leagueQuestions);
  data.clubs.forEach((entry) => {
    window.FOOTBALL_DYNAMIC_QUESTIONS.push({
      id: `club_${slug(entry.club)}`,
      text: `TA 当前效力 ${entry.club} 吗？`,
      chip: entry.club,
      weight: 1.52,
      family: "club",
      meta: {
        club: entry.club,
        currentClub: true,
        league: entry.leagueName,
      },
    });
  });

  if (window.FOOTBALL_DATA_SOURCE) {
    const sourcePages = Array.isArray(window.FOOTBALL_DATA_SOURCE.sourcePages)
      ? window.FOOTBALL_DATA_SOURCE.sourcePages
      : [];
    [
      ["Liga Portugal official", "https://www.ligaportugal.pt/"],
      ["Turkish Football Federation", "https://www.tff.org/"],
      ["Eredivisie official", "https://eredivisie.nl/"],
      ["Major League Soccer official", "https://www.mlssoccer.com/"],
      ["Transfermarkt squad cross-check", "https://www.transfermarkt.com/"],
      ["Wikipedia season cross-check", "https://en.wikipedia.org/"],
      ["Dongqiudi player-name cross-check", "https://www.dongqiudi.com/"],
    ].forEach(([name, url]) => {
      if (!sourcePages.some((source) => source.url === url)) {
        sourcePages.push({ name, url, category: "Expanded leagues" });
      }
    });
    window.FOOTBALL_DATA_SOURCE.sourcePages = sourcePages;
    window.FOOTBALL_DATA_SOURCE.notes =
      `${window.FOOTBALL_DATA_SOURCE.notes || ""} Complete 2025/26 Primeira Liga, Süper Lig and Eredivisie squads plus the current 30-club MLS roster set were added on 2026-06-19; existing players are merged by normalized name and country.`;
  }
})();
