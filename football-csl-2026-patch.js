(function applyCsl2026Patch() {
  const slug = (value) => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

  const countryTrait = (country) => {
    const aliases = { HKG: "hkg", TPE: "tpe", ROU: "romania", FRA: "france", BEL: "belgium", CMR: "cameroon", BRA: "brazil", SWE: "sweden", CGO: "congo", JPN: "japan" };
    return `country_${aliases[country] || slug(country)}`;
  };

  const player = (club, name, chineseName, position, country, extraTraits = []) => {
    const roleTraits = position === "goalkeeper"
      ? ["goalkeeper"]
      : position === "defender"
        ? ["defender", "position_outfield", "defensive_half"]
        : position === "midfielder"
          ? ["midfielder", "position_outfield", "attacking_half"]
          : ["forward", "position_outfield", "attacking_half"];
    return {
      id: `csl26_${slug(club)}_${slug(name)}`,
      name,
      title: `${club} · ${position}`,
      bio: `${chineseName}，${country === "China" ? "中国" : country}球员，2026赛季效力${club}。`,
      traits: [
        `club_${slug(club)}`,
        "scope_chinese_super_league",
        "league_asia",
        countryTrait(country),
        ...roleTraits,
        ...extraTraits,
      ],
      tags: [chineseName, club, "中超", position],
      aliases: [name, chineseName],
      meta: {
        club,
        clubs: [club],
        position,
        age: null,
        country,
        scope: "Chinese Super League",
        retired: false,
        appearanceShare: 0.58,
      },
    };
  };

  const promotedPlayers = [
    player("Chongqing Tonglianglong", "Yao Haoyang", "姚浩洋", "goalkeeper", "China"),
    player("Chongqing Tonglianglong", "Zhang Yingkai", "张英凯", "defender", "China"),
    player("Chongqing Tonglianglong", "Yue Ruijie", "岳瑞杰", "defender", "China"),
    player("Chongqing Tonglianglong", "Huang Xuheng", "黄旭恒", "defender", "China"),
    player("Chongqing Tonglianglong", "Jin Pengxiang", "晋鹏翔", "defender", "China", ["pos_center_back"]),
    player("Chongqing Tonglianglong", "Xiang Yuwang", "向余望", "forward", "China", ["pos_striker"]),
    player("Chongqing Tonglianglong", "Li Zhenquan", "李镇全", "midfielder", "China", ["pos_central_mid"]),
    player("Chongqing Tonglianglong", "Alexandru Cîmpanu", "亚历山德鲁·坎帕努", "forward", "Romania", ["pos_winger"]),
    player("Chongqing Tonglianglong", "Ibrahim Amadou", "易卜拉欣·阿马杜", "midfielder", "France", ["pos_defensive_mid", "defensive_half"]),
    player("Chongqing Tonglianglong", "Landry Dimata", "兰德里·迪马塔", "forward", "Belgium", ["pos_striker"]),
    player("Chongqing Tonglianglong", "Chen Chunxin", "陈春新", "midfielder", "China"),
    player("Chongqing Tonglianglong", "Zhang Zhixiong", "张志雄", "midfielder", "China"),
    player("Chongqing Tonglianglong", "Ng Yu Hei", "吴宇曦", "forward", "HKG", ["pos_winger"]),
    player("Chongqing Tonglianglong", "Liang Weipeng", "梁伟棚", "forward", "China"),
    player("Chongqing Tonglianglong", "Du Yuezheng", "杜月徵", "forward", "China", ["pos_striker"]),
    player("Chongqing Tonglianglong", "Yao Jiale", "姚嘉乐", "forward", "China"),
    player("Chongqing Tonglianglong", "Ma Yujun", "马钰钧", "midfielder", "China"),
    player("Chongqing Tonglianglong", "Zhang Haixuan", "张海轩", "goalkeeper", "China"),
    player("Chongqing Tonglianglong", "Liu Mingshi", "刘明仕", "defender", "China"),
    player("Chongqing Tonglianglong", "Yerjet Yerzat", "叶尔杰提·叶尔扎提", "goalkeeper", "China"),
    player("Chongqing Tonglianglong", "He Xiaoqiang", "何小强", "defender", "China", ["pos_fullback"]),
    player("Chongqing Tonglianglong", "Wu Yongqiang", "吴永强", "midfielder", "China"),
    player("Chongqing Tonglianglong", "Wang Haowen", "王浩文", "defender", "China"),
    player("Chongqing Tonglianglong", "Bai Yutao", "白余涛", "midfielder", "China"),
    player("Chongqing Tonglianglong", "Wu Zitong", "吴梓桐", "goalkeeper", "China"),
    player("Chongqing Tonglianglong", "Michael Ngadeu-Ngadjui", "迈克尔·恩加德乌-恩加德久", "defender", "Cameroon", ["pos_center_back"]),
    player("Chongqing Tonglianglong", "Lucão", "卢康", "defender", "Brazil", ["pos_center_back"]),
    player("Chongqing Tonglianglong", "Wei Suowei", "魏所为", "defender", "China"),
    player("Chongqing Tonglianglong", "Ruan Qilong", "阮奇龙", "defender", "China"),

    player("Liaoning Tieren", "Kudirat Ablet", "库迪热提·阿布来提", "goalkeeper", "China"),
    player("Liaoning Tieren", "Pan Ximing", "潘喜明", "defender", "China", ["pos_center_back"]),
    player("Liaoning Tieren", "Tian Ziyi", "田子羿", "defender", "China"),
    player("Liaoning Tieren", "Dilmurat Mawlanyaz", "迪力穆拉提·毛拉尼牙孜", "defender", "China", ["pos_fullback"]),
    player("Liaoning Tieren", "Pavle Vagić", "帕夫莱·瓦吉奇", "defender", "Sweden", ["pos_center_back"]),
    player("Liaoning Tieren", "Ange Kouamé", "安以恩", "forward", "TPE", ["pos_winger", "pos_striker"]),
    player("Liaoning Tieren", "Yan Dinghao", "严鼎皓", "midfielder", "China", ["pos_central_mid"]),
    player("Liaoning Tieren", "Guy Mbenza", "盖伊·姆本扎", "forward", "Congo", ["pos_striker"]),
    player("Liaoning Tieren", "Takahiro Kunimoto", "邦本宜裕", "midfielder", "Japan", ["pos_attacking_mid"]),
    player("Liaoning Tieren", "Chen Binbin", "陈彬彬", "forward", "China", ["pos_winger"]),
    player("Liaoning Tieren", "Zang Yifeng", "臧一锋", "forward", "China", ["pos_winger"]),
    player("Liaoning Tieren", "Felipe", "费利佩", "defender", "Brazil", ["pos_center_back"]),
    player("Liaoning Tieren", "Wang Tianai", "王天爱", "goalkeeper", "China"),
    player("Liaoning Tieren", "Tian Yuda", "田玉达", "forward", "China", ["pos_striker"]),
    player("Liaoning Tieren", "Li Tixiang", "李提香", "midfielder", "China", ["pos_central_mid"]),
    player("Liaoning Tieren", "Gui Zihan", "桂子涵", "midfielder", "China"),
    player("Liaoning Tieren", "Han Rongze", "韩镕泽", "goalkeeper", "China"),
    player("Liaoning Tieren", "Yuan Mincheng", "元敏诚", "defender", "China", ["pos_center_back"]),
    player("Liaoning Tieren", "Gao Jiarun", "高嘉润", "defender", "China"),
    player("Liaoning Tieren", "Xu Dong", "徐东", "defender", "China", ["pos_fullback"]),
    player("Liaoning Tieren", "Zhang Yan", "张岩", "goalkeeper", "China"),
    player("Liaoning Tieren", "Pang Shenghan", "庞升翰", "defender", "China"),
    player("Liaoning Tieren", "Zhang Hanbo", "张晗博", "goalkeeper", "China"),
    player("Liaoning Tieren", "Tian Yinong", "田依浓", "midfielder", "China", ["pos_defensive_mid", "defensive_half"]),
    player("Liaoning Tieren", "Zhang Hongfu", "张宏福", "defender", "China"),
    player("Liaoning Tieren", "Li Haoran", "李浩然", "defender", "China"),
    player("Liaoning Tieren", "Tian De'ao", "田德奥", "defender", "China"),
    player("Liaoning Tieren", "Zheng Jiacheng", "郑嘉成", "midfielder", "Belgium"),
    player("Liaoning Tieren", "Li Shiqi", "李世奇", "defender", "China"),
    player("Liaoning Tieren", "Jeffinho", "热菲尼奥", "forward", "Brazil", ["pos_winger"]),

    player("Tianjin Jinmen Tiger", "Wang Zhenghao", "王政豪", "defender", "China", ["pos_fullback"]),
    player("Tianjin Jinmen Tiger", "Yang Fan", "杨帆", "defender", "China", ["pos_center_back"]),
    player("Tianjin Jinmen Tiger", "Jaume Grau", "豪梅·格劳", "midfielder", "Spain", ["pos_defensive_mid", "defensive_half"]),
    player("Tianjin Jinmen Tiger", "Wang Xianjun", "王献钧", "defender", "China", ["pos_center_back"]),
    player("Tianjin Jinmen Tiger", "Guilherme Schettine", "吉列尔梅·斯凯蒂内", "forward", "Brazil", ["pos_striker"]),
    player("Tianjin Jinmen Tiger", "Xadas", "哈达斯", "midfielder", "Portugal", ["pos_attacking_mid"]),
    player("Tianjin Jinmen Tiger", "Alberto Quiles", "阿尔韦托·基莱斯", "forward", "Spain", ["pos_striker"]),
    player("Tianjin Jinmen Tiger", "Xie Weijun", "谢维军", "forward", "China", ["pos_striker"]),
    player("Tianjin Jinmen Tiger", "Huang Jiahui", "黄嘉辉", "defender", "China", ["pos_center_back", "pos_defensive_mid"]),
    player("Tianjin Jinmen Tiger", "Liu Shuai", "刘帅", "defender", "China"),
    player("Tianjin Jinmen Tiger", "Wu Xinghan", "吴兴涵", "forward", "China", ["pos_winger"]),
    player("Tianjin Jinmen Tiger", "Aitor Córdoba", "艾托尔·科尔多瓦", "defender", "Spain", ["pos_center_back"]),
    player("Tianjin Jinmen Tiger", "Liu Junxian", "刘俊贤", "forward", "China", ["pos_striker"]),
    player("Tianjin Jinmen Tiger", "Ji Shengpan", "季胜攀", "forward", "China", ["pos_winger"]),
    player("Tianjin Jinmen Tiger", "Qi Yuxi", "齐雨熙", "goalkeeper", "China"),
    player("Tianjin Jinmen Tiger", "Li Yongjia", "李永佳", "midfielder", "China"),
    player("Tianjin Jinmen Tiger", "Chen Zhexuan", "陈哲宣", "midfielder", "China"),
    player("Tianjin Jinmen Tiger", "Yan Bingliang", "闫炳良", "goalkeeper", "China"),
    player("Tianjin Jinmen Tiger", "Zhang Haoran", "张皓然", "defender", "China"),
    player("Tianjin Jinmen Tiger", "Li Siyong", "李嗣镕", "defender", "China", ["pos_fullback"]),
    player("Tianjin Jinmen Tiger", "Guo Hao", "郭皓", "midfielder", "China", ["pos_defensive_mid", "defensive_half"]),
    player("Tianjin Jinmen Tiger", "Ba Dun", "巴顿", "forward", "China", ["pos_winger"]),
    player("Tianjin Jinmen Tiger", "Wang Qiuming", "王秋明", "midfielder", "China", ["pos_central_mid"]),
    player("Tianjin Jinmen Tiger", "Sun Ming Him", "孙铭谦", "defender", "HKG", ["pos_fullback"]),
    player("Tianjin Jinmen Tiger", "Naiboninglin", "乃博宁林", "goalkeeper", "China"),
    player("Tianjin Jinmen Tiger", "Li Shuaiqi", "李帅琪", "defender", "China"),
    player("Tianjin Jinmen Tiger", "Cai Chengjun", "蔡承峻", "midfielder", "China"),
    player("Tianjin Jinmen Tiger", "Shi Yan", "石炎", "forward", "China", ["pos_winger"]),
  ];

  if (Array.isArray(window.FOOTBALL_PLAYERS)) {
    const patchedNames = new Set(promotedPlayers.map((entry) => slug(entry.name)));
    window.FOOTBALL_PLAYERS = window.FOOTBALL_PLAYERS.filter((entry) => !patchedNames.has(slug(entry.name)));
    window.FOOTBALL_PLAYERS.push(...promotedPlayers);
  }

  if (Array.isArray(window.FOOTBALL_DYNAMIC_QUESTIONS)) {
    const additions = [
      ["Chongqing Tonglianglong", "重庆铜梁龙"],
      ["Liaoning Tieren", "辽宁铁人"],
      ["Tianjin Jinmen Tiger", "天津津门虎"],
    ];
    additions.forEach(([club, chinese]) => {
      const id = `club_${slug(club)}`;
      window.FOOTBALL_DYNAMIC_QUESTIONS = window.FOOTBALL_DYNAMIC_QUESTIONS.filter((question) => question.id !== id);
      window.FOOTBALL_DYNAMIC_QUESTIONS.push({
        id,
        text: `TA 当前效力 ${club} 吗？`,
        chip: club,
        weight: 1.52,
        family: "club",
        meta: { club, currentClub: true, chinese },
      });
    });
  }

  window.FOOTBALL_ZH_ALIASES = Object.assign(window.FOOTBALL_ZH_ALIASES || {}, {
    "Zhang Yuan": "张源",

    "Jean Claude Aziangbe": "让-克洛德·阿齐昂贝",
    "Mateus Vital": "马特乌斯·维塔尔",
    "Gabrielzinho": "加布里埃尔",
    "Matt Orr": "安永佳",
    "Prince Ampem": "普林斯·安培",
    "Alex Yang": "杨希",
    "Leonardo": "莱昂纳多",

    "Nico Yennaris": "李可",
    "Rafael Ratão": "拉唐",
    "João Carlos Teixeira": "若昂·卡洛斯·特谢拉",
    "Saulo Mineiro": "绍洛·米内罗",
    "Wilson Manafá": "威尔逊·马纳法",
    "Shinichi Chan": "陈晋一",
    "Makhtar Gueye": "马赫塔尔·盖伊",

    "Guilherme Madruga": "吉列尔梅·马德鲁加",
    "Cryzan": "克雷桑",
    "Valeri Qazaishvili": "瓦列里·卡扎伊什维利",
    "Raphaël Merkies": "李小恒",
    "Zeca": "泽卡",
    "Pedro Delgado": "德尔加多",
    "Pedro Álvaro": "佩德罗·阿尔瓦罗",

    "Mamadou Traoré": "马马杜·特拉奥雷",
    "Isnik Alimi": "伊斯尼克·阿利米",
    "Nicolae Stanciu": "尼古拉·斯坦丘",
    "Cephas Malele": "塞法斯·马莱莱",
    "Frank Acheampong": "弗兰克·阿奇姆彭",

    "Guilherme Ramos": "吉列尔梅·拉莫斯",
    "Boubacar Konté": "布巴卡尔·孔特",
    "Béni Nkololo": "贝尼·恩科洛洛",
    "Yue Tze Nam": "茹子楠",
    "Dawhan": "达万",
    "Fábio Abreu": "法比奥·阿布雷乌",

    ...Object.fromEntries(promotedPlayers.map((entry) => [entry.name, entry.aliases[1]])),
  });

  if (window.FOOTBALL_DATA_SOURCE) {
    const sourcePages = Array.isArray(window.FOOTBALL_DATA_SOURCE.sourcePages)
      ? window.FOOTBALL_DATA_SOURCE.sourcePages
      : [];
    [
      ["2026 Chinese Super League squads", "https://zh.wikipedia.org/wiki/2026%E5%B9%B4%E4%B8%AD%E5%9B%BD%E8%B6%B3%E7%90%83%E8%B6%85%E7%BA%A7%E8%81%94%E8%B5%9B"],
      ["Chongqing Tonglianglong 2026 squad", "https://en.wikipedia.org/wiki/Chongqing_Tonglianglong_F.C."],
      ["Liaoning Tieren 2026 squad", "https://en.wikipedia.org/wiki/Liaoning_Tieren_F.C."],
      ["Chinese Football League official", "https://www.cfl-china.cn/"],
      ["Dongqiudi squad cross-check", "https://www.dongqiudi.com/"],
    ].forEach(([name, url]) => {
      if (!sourcePages.some((source) => source.url === url)) {
        sourcePages.push({ name, url, category: "Chinese Super League" });
      }
    });
    window.FOOTBALL_DATA_SOURCE.sourcePages = sourcePages;
    window.FOOTBALL_DATA_SOURCE.notes =
      `${window.FOOTBALL_DATA_SOURCE.notes || ""} 2026 CSL promoted clubs and simplified-Chinese foreign-player aliases patched on 2026-06-19.`;
  }
})();
