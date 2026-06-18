const ANSWERS = [
  { key: "yes", label: "是", icon: "Y", value: 1 },
  { key: "probably", label: "大概是", icon: "~", value: 0.78 },
  { key: "unknown", label: "不确定", icon: "?", value: 0.5 },
  { key: "probablyNo", label: "大概不是", icon: "-", value: 0.22 },
  { key: "no", label: "不是", icon: "N", value: 0 },
];

let debugQuestionScoring = false;
window.debugQuestionScoring = false;
const FOOTBALL_STAGE_LABELS = {
  1: "国籍 / 地区 / 国家队",
  2: "联赛 / 主要效力地区",
  3: "大类位置",
  4: "俱乐部经历",
  5: "名字字母 / 队友关系",
  6: "年龄 / 惯用脚 / 外貌线索",
};

const DATASETS = {
  general: {
    modeLabel: "通用人物局",
    targetLabel: "人物",
    answerPlaceholder: "输入你想的人物",
    maxQuestions: 15,
    guess: {
      minQuestions: 8,
      ratioQuestions: 10,
      confidence: 0.72,
      ratio: 2.2,
      minRatioConfidence: 0.62,
      softGuessAfter: 12,
      softGuessConfidence: 0.58,
      fallbackGuessAfter: 15,
      fallbackGuessConfidence: 0.5,
      minEffectiveAnswers: 4,
      lowSignalConfidence: 0.42,
      lowSignalAfter: 10,
      wrongCooldown: 3,
      closeCooldown: 2,
      winThreshold: 72,
      minWinAnswers: 4,
    },
    art: "./assets/oracle-panel.svg",
    candidates: [
      person("wukong", "孙悟空", "《西游记》里的齐天大圣", "会七十二变，手持金箍棒，来自中国古典神魔世界。", ["fictional", "china", "asia", "male", "ancient", "literature", "magic", "nonhuman", "martialArts", "iconicCostume"], ["虚构", "中国文化", "神魔"]),
      person("holmes", "福尔摩斯", "贝克街的侦探", "以观察、推理和冷静分析闻名的英国文学角色。", ["fictional", "europe", "male", "literature", "detective"], ["虚构", "侦探", "文学"]),
      person("harry", "哈利·波特", "霍格沃茨学生", "额头有闪电伤疤，故事围绕魔法学校和成长展开。", ["fictional", "europe", "male", "literature", "magic", "young", "iconicCostume"], ["虚构", "魔法", "少年"]),
      person("ironman", "钢铁侠", "穿战甲的超级英雄", "天才、富豪、工程师，用高科技战甲改变战局。", ["fictional", "us", "male", "tech", "superhero", "movie", "iconicCostume"], ["虚构", "科技", "英雄"]),
      person("doraemon", "哆啦A梦", "来自未来的机器猫", "蓝色机器猫，口袋里总能拿出奇妙道具。", ["fictional", "asia", "nonhuman", "tech", "young", "iconicCostume"], ["虚构", "动画", "非人类"]),
      person("mickey", "米老鼠", "经典动画形象", "标志性的圆耳朵和红短裤，是流行文化里的长青符号。", ["fictional", "us", "nonhuman", "movie", "iconicCostume"], ["虚构", "动画", "符号"]),
      person("mario", "马里奥", "任天堂游戏角色", "穿背带裤、留胡子，常在游戏关卡里跳跃冒险。", ["fictional", "europe", "male", "game", "iconicCostume"], ["虚构", "游戏", "冒险"]),
      person("einstein", "爱因斯坦", "理论物理学家", "相对论让他成为现代科学最醒目的名字之一。", ["real", "europe", "male", "deceased", "scientist", "nobel"], ["真实", "科学", "诺奖"]),
      person("curie", "居里夫人", "放射性研究先驱", "两度获得诺贝尔奖，在科学史上极具分量。", ["real", "europe", "female", "deceased", "scientist", "nobel"], ["真实", "科学", "女性"]),
      person("shakespeare", "莎士比亚", "英国戏剧家", "写下众多经典戏剧和诗篇，影响了世界文学。", ["real", "europe", "male", "deceased", "writer", "literature", "ancient"], ["真实", "文学", "欧洲"]),
      person("libai", "李白", "唐代诗人", "诗风豪放浪漫，是中文诗歌传统里的代表人物。", ["real", "china", "asia", "male", "deceased", "writer", "literature", "ancient"], ["真实", "诗人", "中国"]),
      person("chan", "成龙", "动作电影演员", "以动作喜剧、惊险特技和武打风格闻名。", ["real", "china", "asia", "male", "alive", "performer", "movie", "martialArts"], ["真实", "电影", "武打"]),
      person("swift", "Taylor Swift", "唱作歌手", "以流行音乐、叙事歌词和大型巡演闻名。", ["real", "us", "female", "alive", "performer", "music", "writer"], ["真实", "音乐", "美国"]),
      person("mj", "Michael Jackson", "流行音乐标志", "舞台表现力和音乐作品让他成为流行文化代表人物。", ["real", "us", "male", "deceased", "performer", "music", "iconicCostume"], ["真实", "音乐", "舞台"]),
      person("obama", "Barack Obama", "美国政治人物", "曾任美国总统，公众形象与现代政治密切相关。", ["real", "us", "male", "alive", "politics"], ["真实", "政治", "美国"]),
      person("cleopatra", "Cleopatra", "古埃及统治者", "古代地中海世界里极具辨识度的女性统治者。", ["real", "female", "deceased", "ancient", "politics", "ruler"], ["真实", "统治者", "古代"]),
      person("davinci", "Leonardo da Vinci", "文艺复兴巨匠", "兼具艺术、科学与发明想象力的跨界天才。", ["real", "europe", "male", "deceased", "scientist", "visualArt", "inventor", "ancient"], ["真实", "艺术", "发明"]),
      person("jobs", "Steve Jobs", "科技公司创办者", "与个人电脑、智能手机和产品设计文化紧密相连。", ["real", "us", "male", "deceased", "tech", "inventor"], ["真实", "科技", "创业"]),
    ],
    questions: [
      question("fictional", "TA 是虚构角色吗？", "虚构", 1.25, true),
      question("female", "TA 是女性吗？", "女性", 1.08),
      question("alive", "TA 现在还在世吗？", "在世", 0.95),
      question("china", "TA 和中国文化强相关吗？", "中国", 1.06),
      question("us", "TA 和美国流行文化强相关吗？", "美国", 0.96),
      question("europe", "TA 主要来自欧洲语境吗？", "欧洲", 0.96),
      question("ancient", "TA 属于古代或历史久远的形象吗？", "古典", 0.94),
      question("nonhuman", "TA 不是普通人类吗？", "非人类", 1.05),
      question("magic", "TA 有魔法或超能力设定吗？", "魔法", 1.04),
      question("superhero", "TA 是超级英雄吗？", "英雄", 1.12),
      question("game", "TA 首先让人想到电子游戏吗？", "游戏", 1.1),
      question("detective", "TA 与侦探或推理强相关吗？", "侦探", 1.1),
      question("scientist", "TA 和科学发现强相关吗？", "科学", 1.08),
      question("nobel", "TA 获得过诺贝尔奖吗？", "诺奖", 1.08),
      question("writer", "TA 是作家、诗人或重要创作者吗？", "写作", 0.95),
      question("music", "TA 和音乐强相关吗？", "音乐", 1.04),
      question("movie", "TA 和电影或动画强相关吗？", "影视", 0.98),
      question("tech", "TA 和科技、发明或工程强相关吗？", "科技", 0.98),
      question("politics", "TA 是政治领袖或统治者吗？", "政治", 1.05),
      question("martialArts", "TA 以武打或格斗形象著称吗？", "武打", 1.02),
      question("visualArt", "TA 以绘画或视觉艺术闻名吗？", "视觉艺术", 1.03),
      question("iconicCostume", "TA 有非常醒目的造型符号吗？", "造型", 0.78),
    ],
  },
  football: {
    modeLabel: "猜球员挑战",
    targetLabel: "球员",
    answerPlaceholder: "输入你想的球员",
    maxQuestions: 80,
    guess: {
      minQuestions: 20,
      ratioQuestions: 20,
      confidence: 0.66,
      ratio: 1.65,
      minRatioConfidence: 0.58,
      softGuessAfter: 22,
      softGuessConfidence: 0.56,
      fallbackGuessAfter: 28,
      fallbackGuessConfidence: 0.48,
      hardGate: false,
      minEffectiveAnswers: 8,
      lowSignalConfidence: 0.42,
      lowSignalAfter: 35,
      wrongCooldown: 5,
      closeCooldown: 2,
      winThreshold: 70,
      minWinAnswers: 5,
    },
    art: "./assets/stadium-panel.svg",
    candidates: [
      player("messi", "Lionel Messi", "阿根廷前场核心", "左脚、盘带、组织和世界杯冠军，让他成为现代足球的标志人物。", ["forward", "southAmerica", "argentina", "worldCup", "ballonDor", "ucl", "leftFoot", "barcelona", "dribble", "playmaker", "wideForward"], ["阿根廷", "左脚", "金球奖"]),
      player("cristiano", "Cristiano Ronaldo", "葡萄牙前锋", "强大的进球产量、欧冠履历和皇家马德里时期让他辨识度极高。", ["forward", "europe", "portugal", "ballonDor", "ucl", "realMadrid", "premierLeague", "serieA", "centerForward", "speed"], ["葡萄牙", "前锋", "欧冠"]),
      player("mbappe", "Kylian Mbappé", "法国速度型前锋", "世界杯冠军，爆发力和纵深冲击是他的鲜明标签。", ["forward", "europe", "france", "worldCup", "realMadrid", "bornAfter1990", "speed", "wideForward", "centerForward"], ["法国", "速度", "前锋"]),
      player("neymar", "Neymar", "巴西技术型前锋", "花式盘带和创造力突出，巴塞罗那经历让他极易被锁定。", ["forward", "southAmerica", "brazil", "ucl", "barcelona", "bornAfter1990", "dribble", "wideForward"], ["巴西", "盘带", "巴萨"]),
      player("salah", "Mohamed Salah", "埃及边锋", "左脚内切、速度和英超进球效率是他的关键线索。", ["forward", "africa", "egypt", "ucl", "leftFoot", "premierLeague", "bornAfter1990", "speed", "wideForward"], ["埃及", "左脚", "英超"]),
      player("haaland", "Erling Haaland", "挪威中锋", "禁区终结能力强，德甲和英超经历都很醒目。", ["forward", "europe", "norway", "ucl", "premierLeague", "bundesliga", "bornAfter1990", "centerForward"], ["挪威", "中锋", "德甲"]),
      player("bellingham", "Jude Bellingham", "英格兰中场", "年轻中场，皇家马德里经历和大范围覆盖能力很突出。", ["midfielder", "europe", "england", "realMadrid", "bornAfter1990", "playmaker"], ["英格兰", "中场", "皇马"]),
      player("vinicius", "Vinícius Júnior", "巴西边锋", "速度、盘带和皇家马德里的欧冠舞台构成鲜明画像。", ["forward", "southAmerica", "brazil", "ucl", "realMadrid", "bornAfter1990", "speed", "dribble", "wideForward"], ["巴西", "边锋", "皇马"]),
      player("debruyne", "Kevin De Bruyne", "比利时中场", "传球视野和英超、德甲经历让他在组织型球员中很突出。", ["midfielder", "europe", "belgium", "ucl", "premierLeague", "bundesliga", "bornAfter1990", "playmaker"], ["比利时", "组织", "英超"]),
      player("modric", "Luka Modrić", "克罗地亚中场", "金球奖、皇家马德里和中场调度是他的核心线索。", ["midfielder", "europe", "croatia", "ballonDor", "ucl", "realMadrid", "playmaker"], ["克罗地亚", "中场", "金球奖"]),
      player("lewandowski", "Robert Lewandowski", "波兰中锋", "顶级终结能力，德甲、巴塞罗那和欧冠履历鲜明。", ["forward", "europe", "poland", "ucl", "bundesliga", "barcelona", "centerForward"], ["波兰", "中锋", "德甲"]),
      player("kane", "Harry Kane", "英格兰中锋", "英超和德甲经历都存在，射术与回撤策应同样醒目。", ["forward", "europe", "england", "premierLeague", "bundesliga", "bornAfter1990", "centerForward", "playmaker"], ["英格兰", "中锋", "英超"]),
      player("zidane", "Zinedine Zidane", "法国中场大师", "世界杯冠军、金球奖和皇家马德里经典时刻构成他的标识。", ["midfielder", "europe", "france", "worldCup", "ballonDor", "ucl", "realMadrid", "classicEra", "playmaker"], ["法国", "中场", "经典"]),
      player("ronaldinho", "Ronaldinho", "巴西艺术型前场", "盘带、笑容、巴塞罗那和金球奖，让他拥有极强个人风格。", ["forward", "midfielder", "southAmerica", "brazil", "worldCup", "ballonDor", "ucl", "barcelona", "serieA", "classicEra", "dribble", "playmaker"], ["巴西", "盘带", "经典"]),
      player("r9", "Ronaldo Nazário", "巴西现象级中锋", "爆发力、世界杯冠军和多家豪门经历，是九十年代末到本世纪初的巨星。", ["forward", "southAmerica", "brazil", "worldCup", "ballonDor", "realMadrid", "barcelona", "serieA", "classicEra", "centerForward", "speed"], ["巴西", "中锋", "经典"]),
      player("pele", "Pelé", "巴西传奇前锋", "世界杯冠军和历史地位是他最显著的线索。", ["forward", "southAmerica", "brazil", "worldCup", "classicEra", "centerForward"], ["巴西", "世界杯", "传奇"]),
      player("maradona", "Diego Maradona", "阿根廷传奇核心", "左脚、盘带、世界杯和那不勒斯岁月让他极具辨识度。", ["midfielder", "forward", "southAmerica", "argentina", "worldCup", "leftFoot", "serieA", "classicEra", "dribble", "playmaker"], ["阿根廷", "左脚", "经典"]),
      player("buffon", "Gianluigi Buffon", "意大利门将", "世界杯冠军和意甲漫长履历，是门将位置的代表人物。", ["goalkeeper", "europe", "italy", "worldCup", "serieA", "classicEra"], ["意大利", "门将", "世界杯"]),
      player("neuer", "Manuel Neuer", "德国门将", "世界杯冠军、欧冠和德甲经历，让他成为现代门将代表。", ["goalkeeper", "europe", "germany", "worldCup", "ucl", "bundesliga"], ["德国", "门将", "德甲"]),
      player("maldini", "Paolo Maldini", "意大利后卫", "防守、意甲和欧冠荣誉构成他的清晰画像。", ["defender", "europe", "italy", "ucl", "serieA", "classicEra", "defensiveIcon"], ["意大利", "后卫", "经典"]),
      player("ramos", "Sergio Ramos", "西班牙后卫", "世界杯冠军、皇家马德里和欧冠履历使他很容易被辨认。", ["defender", "europe", "spain", "worldCup", "ucl", "realMadrid", "defensiveIcon"], ["西班牙", "后卫", "皇马"]),
      player("xavi", "Xavi", "西班牙组织型中场", "巴塞罗那、世界杯和传控体系是他的关键线索。", ["midfielder", "europe", "spain", "worldCup", "ucl", "barcelona", "classicEra", "playmaker"], ["西班牙", "巴萨", "组织"]),
      player("iniesta", "Andrés Iniesta", "西班牙中场", "世界杯决赛进球、巴塞罗那和细腻控球构成他的标签。", ["midfielder", "europe", "spain", "worldCup", "ucl", "barcelona", "classicEra", "playmaker"], ["西班牙", "中场", "巴萨"]),
    ],
    questions: [
      question("forward", "TA 主要是进攻球员吗？", "进攻", 1.18, true),
      question("midfielder", "TA 主要踢中场吗？", "中场", 1.16),
      question("defender", "TA 主要踢后卫吗？", "后卫", 1.16),
      question("goalkeeper", "TA 是门将吗？", "门将", 1.22),
      question("southAmerica", "TA 来自南美洲吗？", "南美", 1.04),
      question("europe", "TA 来自欧洲吗？", "欧洲", 1.02),
      question("africa", "TA 来自非洲吗？", "非洲", 1.08),
      question("worldCup", "TA 拿过世界杯冠军吗？", "世界杯", 1.08),
      question("ballonDor", "TA 拿过金球奖吗？", "金球奖", 1.08),
      question("ucl", "TA 拿过欧冠冠军吗？", "欧冠", 0.92),
      question("leftFoot", "TA 是左脚特征很明显的球员吗？", "左脚", 1.04),
      question("barcelona", "TA 曾效力巴塞罗那吗？", "巴萨", 1.06),
      question("realMadrid", "TA 曾效力皇家马德里吗？", "皇马", 1.06),
      question("premierLeague", "TA 曾在英超踢球吗？", "英超", 0.92),
      question("bundesliga", "TA 曾在德甲踢球吗？", "德甲", 0.94),
      question("serieA", "TA 曾在意甲踢球吗？", "意甲", 0.94),
      question("bornAfter1990", "TA 是 1990 年以后出生的吗？", "90 后", 0.82),
      question("classicEra", "TA 的代表性巅峰在 2010 年以前吗？", "经典时代", 0.88),
      question("speed", "TA 以速度或爆发力著称吗？", "速度", 0.78),
      question("dribble", "TA 以盘带或花式技术著称吗？", "盘带", 0.82),
      question("playmaker", "TA 以组织或传球著称吗？", "组织", 0.86),
      question("centerForward", "TA 更像传统中锋或终结者吗？", "中锋", 0.92),
      question("wideForward", "TA 更常让人想到边锋或边路前场吗？", "边路", 0.88),
      question("defensiveIcon", "TA 是防守位置的标志性人物吗？", "防守", 0.9),
      question("argentina", "TA 来自阿根廷吗？", "阿根廷", 0.9),
      question("brazil", "TA 来自巴西吗？", "巴西", 0.9),
      question("france", "TA 来自法国吗？", "法国", 0.86),
      question("portugal", "TA 来自葡萄牙吗？", "葡萄牙", 0.86),
      question("spain", "TA 来自西班牙吗？", "西班牙", 0.82),
      question("england", "TA 来自英格兰吗？", "英格兰", 0.82),
      question("italy", "TA 来自意大利吗？", "意大利", 0.82),
      question("germany", "TA 来自德国吗？", "德国", 0.82),
    ],
  },
};

const ALIASES = {
  wukong: ["齐天大圣", "美猴王", "孙行者", "悟空"],
  holmes: ["Sherlock Holmes", "夏洛克福尔摩斯", "夏洛克"],
  harry: ["Harry Potter", "哈利波特"],
  ironman: ["Iron Man", "Tony Stark", "托尼史塔克", "托尼·斯塔克"],
  doraemon: ["机器猫", "多啦A梦", "Doraemon"],
  mickey: ["Mickey Mouse", "米奇", "米奇老鼠"],
  mario: ["Super Mario", "超级马里奥"],
  einstein: ["Albert Einstein", "阿尔伯特爱因斯坦"],
  curie: ["Marie Curie", "玛丽居里"],
  shakespeare: ["William Shakespeare", "威廉莎士比亚"],
  libai: ["李太白", "诗仙"],
  chan: ["Jackie Chan", "陈港生"],
  swift: ["泰勒斯威夫特", "泰勒", "Taylor Alison Swift"],
  mj: ["迈克尔杰克逊", "Michael Joseph Jackson"],
  obama: ["奥巴马", "贝拉克奥巴马"],
  cleopatra: ["克利奥帕特拉", "埃及艳后"],
  davinci: ["达芬奇", "Leonardo da Vinci", "列奥纳多达芬奇"],
  jobs: ["乔布斯", "Steven Jobs"],
  messi: ["梅西", "里奥梅西", "Leo Messi", "Messi"],
  "Théo Hernandez": ["Theo Hernandez", "Theo", "Théo", "特奥", "特奥·埃尔南德斯"],
  "Sergej Milinković-Savić": ["Sergej Milinkovic-Savic", "Milinkovic", "Milinković-Savić", "米林科维奇", "米林科维奇萨维奇"],
  "Konrad Laimer": ["莱默尔", "莱默", "Laimer"],
  "Kylian Mbappé": ["姆巴佩", "Mbappe", "Kylian Mbappe"],
  "Harry Kane": ["凯恩", "Kane"],
  "Crysencio Summerville": ["萨默维尔", "萨默菲尔", "Summerville"],
  "Jan Paul van Hecke": ["范赫克", "范黑克", "Van Hecke"],
  "Patrik Schick": ["希克", "帕特里克希克", "Schick"],
  "Esteban Lepaul": ["勒保罗", "勒保尔", "勒波尔", "Lepaul"],
  "Jarrod Bowen": ["鲍文", "杰罗德鲍文", "Bowen"],
  "Bukayo Saka": ["萨卡", "布卡约萨卡", "Saka"],
  "Harvey Barnes": ["哈维·巴恩斯", "哈维巴恩斯", "Barnes"],
  "Callum Wilson": ["卡勒姆·威尔逊", "卡勒姆威尔逊", "Wilson"],
  "Sandro Tonali": ["托纳利", "Tonali"],
  "Aaron Wan-Bissaka": ["万-比萨卡", "万比萨卡", "Wan-Bissaka"],
  "Declan Rice": ["赖斯", "Rice"],
  "Yan Junling": ["颜骏凌"],
  "Jiang Guangtai": ["蒋光太"],
  "Wang Shenchao": ["王燊超"],
  "Zhang Linpeng": ["张琳芃"],
  "Wu Lei": ["武磊"],
  "Wei Zhen": ["魏震"],
  "Fu Huan": ["傅欢"],
  "Liu Ruofan": ["刘若钒"],
  "Yue Xin": ["岳鑫"],
  "Yang Shiyuan": ["杨世元"],
  "Bao Shimeng": ["鲍世蒙"],
  "Kaoru Mitoma": ["三笘薰", "三苫薰"],
  "Yoon Do-young": ["尹道英"],
  "Park Seung-soo": ["朴胜洙"],
  "Ao Tanaka": ["田中碧"],
  "Daichi Kamada": ["镰田大地"],
  "Hwang Hee-chan": ["黄喜灿"],
  "Tatsuhiro Sakamoto": ["坂元达裕"],
  "Takefusa Kubo": ["久保建英"],
  "Kazunari Kita": ["喜多一成"],
  "Takuma Asano": ["浅野拓磨"],
  "Kim Min-jae": ["金玟哉"],
  "Hiroki Ito": ["伊藤洋辉"],
  "Kōki Machida": ["町田浩树"],
  "Yuito Suzuki": ["铃木唯人"],
  "Kaishū Sano": ["佐野海舟"],
  "Lee Jae-sung": ["李在城"],
  "Sōta Kawasaki": ["川崎飒太"],
  "Jeong Woo-yeong": ["郑优营"],
  "Shūto Machino": ["町野修斗"],
  "Yukinari Sugawara": ["菅原由势"],
  "Zion Suzuki": ["铃木彩艳"],
  "Lee Kang-in": ["李刚仁"],
  "Takumi Minamino": ["南野拓实"],
  "Ayumu Seko": ["濑古步梦"],
  "Park Jin-seob": ["朴镇燮"],
  cristiano: ["C罗", "Cristiano", "Ronaldo", "克里斯蒂亚诺罗纳尔多"],
  mbappe: ["姆巴佩", "Mbappe", "Kylian Mbappe"],
  neymar: ["内马尔", "Neymar Jr", "Neymar Junior"],
  salah: ["萨拉赫", "穆罕默德萨拉赫", "Mo Salah"],
  haaland: ["哈兰德", "Haaland", "Erling Braut Haaland"],
  bellingham: ["贝林厄姆", "Jude", "Bellingham"],
  vinicius: ["维尼修斯", "小熊", "Vini", "Vinicius Junior"],
  debruyne: ["德布劳内", "丁丁", "Kevin De Bruyne"],
  modric: ["莫德里奇", "魔笛", "Luka Modric"],
  lewandowski: ["莱万", "莱万多夫斯基", "Lewandowski"],
  kane: ["凯恩", "Harry Kane"],
  zidane: ["齐达内", "Zidane", "齐祖"],
  ronaldinho: ["罗纳尔迪尼奥", "小罗", "Ronaldinho Gaucho"],
  r9: ["罗纳尔多", "大罗", "R9", "Ronaldo"],
  pele: ["贝利", "Pele"],
  maradona: ["马拉多纳", "Diego Armando Maradona"],
  buffon: ["布冯", "Buffon"],
  neuer: ["诺伊尔", "Neuer"],
  maldini: ["马尔蒂尼", "Maldini"],
  ramos: ["拉莫斯", "Sergio Ramos"],
  xavi: ["哈维", "Xavi Hernandez"],
  iniesta: ["伊涅斯塔", "小白", "Andres Iniesta"],
};

const FOOTBALL_REGION_COUNTRIES = {
  region_europe: [
    "Albania", "ALB", "Armenia", "Austria", "Belgium", "BIH", "Bosnia and Herzegovina",
    "Bulgaria", "BUL", "Croatia", "Czech Republic", "Denmark", "England", "Estonia", "EST",
    "Finland", "FIN", "France", "GEO", "Georgia", "Germany", "Greece", "Hungary", "Iceland",
    "Ireland", "ISL", "Israel", "ISR", "Italy", "Kingdom of Denmark", "KOS", "Kosovo",
    "Lithuania", "LTU", "Luxembourg", "LUX", "MKD", "MNE", "Netherlands", "Northern Ireland",
    "Norway", "Poland", "Portugal", "Romania", "Russia", "Scotland", "Serbia", "Slovakia",
    "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine",
    "Wales",
  ],
  region_south_america: [
    "Argentina", "Brazil", "Chile", "CHI", "Colombia", "ECU", "Ecuador", "Paraguay", "PER",
    "Peru", "Suriname", "SUR", "Uruguay", "VEN", "Venezuela",
  ],
  region_africa: [
    "Algeria", "ANG", "Angola", "BFA", "Burkina Faso", "Cameroon", "Cape Verde", "COM",
    "Cote d'Ivoire", "Côte d'Ivoire", "CPV", "DR Congo", "Egypt", "EQG", "GAB", "Gambia",
    "GAM", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "KEN", "Libya", "Mali", "Morocco",
    "MTN", "NIG", "Nigeria", "Senegal", "Sierra Leone", "SLE", "South Africa", "Togo", "TOG",
    "Tunisia", "TUN", "Zambia", "ZAM", "Zimbabwe", "ZIM",
  ],
  region_asia: [
    "Australia", "China", "HKG", "Hong Kong", "IDN", "Indonesia", "Iran", "Japan", "Jordan",
    "Qatar", "Saudi Arabia", "South Korea",
  ],
  region_north_america: [
    "Canada", "Costa Rica", "CTA", "GLP", "Guadeloupe", "HAI", "Haiti", "Jamaica", "JAM",
    "Mexico", "Panama", "United States",
  ],
};

const FOOTBALL_REGION_COUNTRY_LOOKUP = Object.entries(FOOTBALL_REGION_COUNTRIES).reduce(
  (lookup, [region, countries]) => {
    countries.forEach((country) => {
      lookup.set(normalizeText(country), region);
    });
    return lookup;
  },
  new Map(),
);

const FOOTBALL_WORLD_CUP_2022_COUNTRIES = new Set([
  "Argentina", "Australia", "Belgium", "Brazil", "Cameroon", "Canada", "Costa Rica", "Croatia",
  "Denmark", "ECU", "Ecuador", "England", "France", "Germany", "Ghana", "Iran", "Japan",
  "Mexico", "Morocco", "Netherlands", "Poland", "Portugal", "Qatar", "Saudi Arabia", "Senegal",
  "Serbia", "South Korea", "Spain", "Switzerland", "Tunisia", "TUN", "United States", "Uruguay",
  "Wales",
].map(normalizeText));

const FOOTBALL_WORLD_CUP_NAMES = new Set([
  "Achraf Hakimi", "Adrien Rabiot", "Aleksandar Mitrovic", "Aleksandar Mitrović",
  "Alphonso Davies", "Antoine Griezmann", "Antonio Rudiger", "Antonio Rüdiger", "Aymeric Laporte",
  "Bernardo Silva", "Bruno Fernandes", "Bukayo Saka", "Casemiro", "Christian Pulisic",
  "Cristiano Ronaldo", "Dani Carvajal", "Darwin Nunez", "Darwin Núñez", "Dayot Upamecano",
  "Declan Rice", "Dominik Livakovic", "Dominik Livaković", "Eduardo Camavinga", "Fabinho",
  "Federico Valverde", "Ferran Torres", "Frenkie de Jong", "Gavi", "Gianluigi Donnarumma",
  "Harry Kane", "Heung-min Son", "Hirving Lozano", "Ivan Perisic", "Ivan Perišić",
  "Joao Cancelo", "João Cancelo", "Joshua Kimmich", "Jude Bellingham", "Jules Kounde",
  "Jules Koundé", "Kalidou Koulibaly", "Karim Benzema", "Kingsley Coman", "Kylian Mbappe",
  "Kylian Mbappé", "Lautaro Martinez", "Lautaro Martínez", "Leon Goretzka", "Lionel Messi",
  "Luka Modric", "Luka Modrić", "Marcos Acuna", "Marcos Acuña", "Marquinhos",
  "Mateo Kovacic", "Mateo Kovačić", "Memphis Depay", "N'Golo Kante", "N'Golo Kanté",
  "Neymar", "Neymar Jr", "Nico Williams", "Olivier Giroud", "Pedri", "Raphael Varane",
  "Raphinha", "Robert Lewandowski", "Rodri", "Rodrigo De Paul", "Rodrygo", "Ruben Dias",
  "Rúben Dias", "Ruben Neves", "Rúben Neves", "Sadio Mane", "Sadio Mané",
  "Serge Gnabry", "Sergej Milinkovic-Savic", "Sergej Milinković-Savić", "Son Heung-min",
  "Thibaut Courtois", "Theo Hernandez", "Théo Hernandez", "Vinicius Junior", "Vinícius Júnior",
  "Virgil van Dijk", "Yassine Bounou", "Youssef En-Nesyri",
].map(normalizeText));

const FOOTBALL_UK_COUNTRY_OVERRIDES = new Map(Object.entries({
  "Ben White": "England",
  "Myles Lewis-Skelly": "England",
  "Max Dowman": "England",
  "Marli Salmon": "England",
  "Marcus Bettinelli": "England",
  "Marc Guéhi": "England",
  "Nico O'Reilly": "England",
  "Max Alleyne": "England",
  "Luke Shaw": "England",
  "Ayden Heaven": "England",
  "Morgan Rogers": "England",
  "Bradley Burrowes": "England",
  "Alex Scott": "England",
  "Ben Gannon-Doak": "Scotland",
  "Adam Smith": "England",
  "Marcus Tavernier": "England",
  "Luke O'Nien": "Northern Ireland",
  "Adam Webster": "England",
  "Aaron Hickey": "Scotland",
  "Luke Harris": "Wales",
  "Nick Pope": "England",
  "Anthony Gordon": "England",
  "Mark Gillespie": "England",
  "Alex Murphy": "Scotland",
  "Nathan Patterson": "Scotland",
  "Michael Keane": "England",
  "Lukas Nmecha": "England",
  "Alex Cairns": "England",
  "Nathaniel Clyne": "England",
  "Adam Wharton": "England",
  "Neco Williams": "Wales",
  "Morgan Gibbs-White": "England",
  "Archie Gray": "England",
  "Ben Davies": "Wales",
  "Brandon Austin": "England",
  "Matthew Craig": "Scotland",
  "Lucá Williams-Barnett": "England",
  "Maximilian Kilman": "England",
  "Aaron Wan-Bissaka": "England",
  "Marcus Edwards": "England",
  "Bashir Humphreys": "England",
  "Aaron Ramsey": "Wales",
  "Armando Broja": "England",
  "Ashley Barnes": "England",
  "Adam Armstrong": "Scotland",
  "Bobby Thomas": "England",
  "Ben Wilson": "England",
  "Luke Woolfenden": "England",
  "Matty Jacob": "England",
  "Akin Famewo": "England",
  "Alex Palmer": "England",
  "Ali Al-Hamadi": "England",
  "Ben Johnson": "England",
  "Marcus Rashford": "England",
  "Ademola Lookman": "England",
  "Nathan Tella": "England",
  "Billy Gilmour": "Scotland",
  "Ainsley Maitland-Niles": "England",
  "Mika Biereth": "England",
  "Ben Chilwell": "England",
  "Martial Godo": "England",
  "Mohamed-Ali Cho": "England",
  "Mukhtar Ali": "England",
}).map(([name, country]) => [normalizeText(name), country]));

const CONFIRMED_RETIRED_LEGENDS = new Set([
  "romario",
  "alfredo di stefano",
  "alfredo di stéfano",
  "marco van basten",
].map(normalizeText));

const FOOTBALL_EXTRA_QUESTIONS = [
  { id: "retired", text: "TA 已经退役了吗？", chip: "已退役", weight: 1.08, family: "career" },
  { id: "foot_left", text: "TA 的左脚特征很明显吗？", chip: "左脚", weight: 1.65, family: "detail" },
  { id: "foot_right", text: "TA 更偏右脚球员吗？", chip: "右脚", weight: 1.35, family: "detail" },
  { id: "skin_dark", text: "TA 是深色肤色球员吗？", chip: "深色肤色", weight: 0.72, family: "detail" },
  { id: "skin_light", text: "TA 是浅色肤色球员吗？", chip: "浅色肤色", weight: 0.7, family: "detail" },
  { id: "pos_winger", text: "TA 经常踢边锋或边路前场吗？", chip: "边锋", weight: 1.7, family: "specific_position" },
  { id: "pos_striker", text: "TA 更像中锋或禁区终结者吗？", chip: "中锋", weight: 1.7, family: "specific_position" },
  { id: "pos_attacking_mid", text: "TA 经常踢前腰或进攻型中场吗？", chip: "前腰", weight: 1.62, family: "specific_position" },
  { id: "pos_central_mid", text: "TA 经常踢中前卫或全能中场吗？", chip: "中前卫", weight: 1.62, family: "specific_position" },
  { id: "pos_defensive_mid", text: "TA 更像防守型中场或后腰吗？", chip: "后腰", weight: 1.62, family: "specific_position" },
  { id: "pos_fullback", text: "TA 经常踢边后卫或翼卫吗？", chip: "边后卫", weight: 1.68, family: "specific_position" },
  { id: "pos_center_back", text: "TA 主要踢中后卫吗？", chip: "中后卫", weight: 1.68, family: "specific_position" },
  { id: "club_core", text: "TA 通常是俱乐部主力或核心轮换吗？", chip: "主力顺位", weight: 1.34, family: "status" },
  { id: "club_rotation", text: "TA 更像俱乐部轮换或半主力球员吗？", chip: "轮换顺位", weight: 1.16, family: "status" },
  { id: "league_asia", text: "TA 现在在亚洲联赛踢球吗？", chip: "亚洲联赛", weight: 1.04, family: "scope" },
  { id: "league_england", text: "TA 现在在英格兰联赛体系踢球吗？", chip: "英格兰联赛", weight: 1.42, family: "scope" },
  { id: "league_spain", text: "TA 现在在西班牙联赛体系踢球吗？", chip: "西班牙联赛", weight: 1.42, family: "scope" },
  { id: "league_germany", text: "TA 现在在德国联赛体系踢球吗？", chip: "德国联赛", weight: 1.42, family: "scope" },
  { id: "league_italy", text: "TA 现在在意大利联赛体系踢球吗？", chip: "意大利联赛", weight: 1.42, family: "scope" },
  { id: "league_france", text: "TA 现在在法国联赛体系踢球吗？", chip: "法国联赛", weight: 1.42, family: "scope" },
  { id: "region_europe", text: "TA 的国家队属于欧洲足球圈吗？", chip: "欧洲足球圈", weight: 1.02, family: "region" },
  { id: "region_south_america", text: "TA 的国家队属于南美足球圈吗？", chip: "南美足球圈", weight: 1.04, family: "region" },
  { id: "region_africa", text: "TA 的国家队属于非洲足球圈吗？", chip: "非洲足球圈", weight: 1.04, family: "region" },
  { id: "region_asia", text: "TA 的国家队属于亚洲足球圈吗？", chip: "亚洲足球圈", weight: 1.02, family: "region" },
  { id: "region_north_america", text: "TA 的国家队属于北美或中北美足球圈吗？", chip: "中北美", weight: 0.92, family: "region" },
  { id: "world_cup_2022_country", text: "TA 的国家队参加过 2022 世界杯吗？", chip: "2022世界杯国家队", weight: 0.98, family: "career" },
  { id: "world_cup_participant", text: "TA 本人参加过世界杯正赛吗？", chip: "世界杯正赛", weight: 0.82, family: "career" },
  { id: "world_cup_2026_participant", text: "TA 参加了 2026 年世界杯正赛吗？", chip: "2026世界杯", weight: 1.18, family: "career" },
  { id: "age_under_25", text: "TA 现在还不到 25 岁吗？", chip: "25岁以下", weight: 0.98, family: "age" },
  { id: "age_25_29", text: "TA 现在是 25 到 29 岁吗？（包含 25 岁和 29 岁）", chip: "25-29岁", weight: 1.08, family: "age" },
  { id: "age_30_plus", text: "TA 现在已经 30 岁或更大吗？", chip: "30岁以上", weight: 0.98, family: "age" },
  { id: "position_outfield", text: "TA 是非门将球员吗？", chip: "非门将", weight: 0.84, family: "position" },
  { id: "attacking_half", text: "TA 更偏中前场职责吗？", chip: "中前场", weight: 0.92, family: "position" },
  { id: "defensive_half", text: "TA 更偏防守或门将职责吗？", chip: "防守职责", weight: 0.9, family: "position" },
];

const KNOWN_PLAYER_TRAITS = new Map(Object.entries({
  "Kylian Mbappé": ["pos_winger", "pos_striker", "foot_right"],
  "Harry Kane": ["pos_striker", "foot_right"],
  "Konrad Laimer": ["pos_central_mid", "pos_defensive_mid", "pos_fullback", "foot_right"],
  "Lionel Messi": ["pos_winger", "pos_attacking_mid", "foot_left"],
  "Cristiano Ronaldo": ["pos_winger", "pos_striker", "foot_right"],
  "Neymar": ["pos_winger", "pos_attacking_mid", "foot_right"],
  "Son Heung-min": ["pos_winger", "pos_striker", "foot_right"],
  "Erling Haaland": ["pos_striker", "foot_left"],
  "Jude Bellingham": ["pos_central_mid", "pos_attacking_mid", "foot_right"],
  "Tijjani Reijnders": ["pos_central_mid", "foot_right"],
  "Théo Hernandez": ["pos_fullback", "foot_left"],
  "Sergej Milinković-Savić": ["pos_central_mid", "foot_right"],
  "Crysencio Summerville": ["pos_winger", "foot_right", "skin_dark"],
  "Jan Paul van Hecke": ["pos_center_back", "foot_right", "skin_light"],
  "Patrik Schick": ["pos_striker", "foot_left", "skin_light"],
  "Esteban Lepaul": ["pos_striker", "foot_right", "skin_light"],
  "Jarrod Bowen": ["pos_winger", "pos_striker", "foot_left", "skin_light"],
  "Bukayo Saka": ["pos_winger", "foot_left", "skin_dark"],
  "Harvey Barnes": ["pos_winger", "foot_right", "skin_light"],
  "Callum Wilson": ["pos_striker", "foot_right", "skin_dark"],
  "Sandro Tonali": ["pos_defensive_mid", "pos_central_mid", "foot_right", "skin_light"],
  "Michael Olise": ["pos_winger", "foot_left", "skin_dark"],
  "Florian Wirtz": ["pos_attacking_mid", "foot_right", "skin_light"],
  "Jamal Musiala": ["pos_attacking_mid", "pos_winger", "foot_right", "skin_dark"],
  "Bukayo Saka": ["pos_winger", "foot_left", "skin_dark"],
  "Phil Foden": ["pos_winger", "pos_attacking_mid", "foot_left", "skin_light"],
  "Rodri": ["pos_defensive_mid", "foot_right", "skin_light"],
  "Declan Rice": ["pos_defensive_mid", "pos_central_mid", "foot_right", "skin_light"],
  "Virgil van Dijk": ["pos_center_back", "foot_right", "skin_dark"],
  "William Saliba": ["pos_center_back", "foot_right", "skin_dark"],
  "Gabriel Magalhães": ["pos_center_back", "foot_left", "skin_light"],
  "Achraf Hakimi": ["pos_fullback", "foot_right", "skin_dark"],
  "Trent Alexander-Arnold": ["pos_fullback", "foot_right", "skin_dark"],
  "Alphonso Davies": ["pos_fullback", "foot_left", "skin_dark"],
  "Jérémy Doku": ["pos_winger", "foot_right", "skin_dark"],
  "Raphinha": ["pos_winger", "foot_left", "skin_light"],
  "Lamine Yamal": ["pos_winger", "foot_left", "skin_dark"],
  "Pedri": ["pos_central_mid", "foot_right", "skin_light"],
  "Frenkie de Jong": ["pos_central_mid", "foot_right", "skin_light"],
  "Robert Lewandowski": ["pos_striker", "foot_right", "skin_light"],
  "Lautaro Martínez": ["pos_striker", "foot_right", "skin_light"],
  "Marcus Thuram": ["pos_striker", "foot_right", "skin_dark"],
  "Federico Dimarco": ["pos_fullback", "foot_left", "skin_light"],
  "Nicolò Barella": ["pos_central_mid", "foot_right", "skin_light"],
  "Jonathan David": ["pos_striker", "foot_right", "skin_dark"],
  "Khvicha Kvaratskhelia": ["pos_winger", "foot_right", "skin_light"],
  "Victor Osimhen": ["pos_striker", "foot_right", "skin_dark"],
  "Rafael Leão": ["pos_winger", "foot_right", "skin_dark"],
  "Christian Pulisic": ["pos_winger", "foot_right", "skin_light"],
  "Kaoru Mitoma": ["pos_winger", "foot_right", "skin_light"],
  "Takefusa Kubo": ["pos_winger", "pos_attacking_mid", "foot_left", "skin_light"],
  "Daichi Kamada": ["pos_attacking_mid", "pos_central_mid", "foot_right", "skin_light"],
  "Hwang Hee-chan": ["pos_winger", "pos_striker", "foot_right", "skin_light"],
  "Kim Min-jae": ["pos_center_back", "foot_right", "skin_light"],
  "Hiroki Ito": ["pos_center_back", "pos_fullback", "foot_left", "skin_light"],
  "Lee Kang-in": ["pos_attacking_mid", "pos_winger", "foot_left", "skin_light"],
  "Takumi Minamino": ["pos_attacking_mid", "pos_winger", "foot_right", "skin_light"],
  "Ao Tanaka": ["pos_central_mid", "pos_defensive_mid", "foot_right", "skin_light"],
  "Yukinari Sugawara": ["pos_fullback", "foot_right", "skin_light"],
  "Zion Suzuki": ["foot_right", "skin_light"],
  "Yuito Suzuki": ["pos_attacking_mid", "pos_winger", "foot_right", "skin_light"],
  "Lee Jae-sung": ["pos_central_mid", "pos_attacking_mid", "foot_left", "skin_light"],
  "Ronaldo Nazário": ["pos_striker", "foot_right"],
  "Ronaldinho": ["pos_winger", "pos_attacking_mid", "foot_right"],
  "Zlatan Ibrahimović": ["pos_striker", "foot_right"],
  "Franz Beckenbauer": ["pos_center_back", "foot_right"],
  "Pelé": ["pos_striker", "pos_attacking_mid", "foot_right"],
  "Diego Maradona": ["pos_attacking_mid", "foot_left"],
}));

const SUPPLEMENTAL_FOOTBALL_SQUADS = [
  supplementalPlayer("Alisson Becker", "阿利松", "goalkeeper", "Brazil", 33, "right", 0.9),
  supplementalPlayer("Giorgi Mamardashvili", "马马尔达什维利", "goalkeeper", "Georgia", 25, "left", 0.72),
  supplementalPlayer("Freddie Woodman", "弗雷迪·伍德曼", "goalkeeper", "England", 29, "right", 0.48),
  supplementalPlayer("Ármin Pécsi", "佩奇", "goalkeeper", "Hungary", 21, "right", 0.42),
  supplementalPlayer("Kornel Misciur", "米休尔", "goalkeeper", "Poland", 21, "right", 0.38),
  supplementalPlayer("Harvey Davies", "哈维·戴维斯", "goalkeeper", "England", 22, "right", 0.38),
  supplementalPlayer("Joe Gomez", "乔·戈麦斯", "defender", "England", 29, "right", 0.7, ["pos_center_back", "pos_fullback"]),
  supplementalPlayer("Virgil van Dijk", "范戴克", "defender", "Netherlands", 34, "right", 0.97, ["pos_center_back", "skin_dark"]),
  supplementalPlayer("Ibrahima Konaté", "科纳特", "defender", "France", 27, "right", 0.9, ["pos_center_back", "skin_dark"]),
  supplementalPlayer("Milos Kerkez", "科尔克兹", "defender", "Hungary", 22, "left", 0.86, ["pos_fullback"]),
  supplementalPlayer("Conor Bradley", "康纳·布拉德利", "defender", "Northern Ireland", 22, "right", 0.72, ["pos_fullback"]),
  supplementalPlayer("Giovanni Leoni", "乔瓦尼·莱奥尼", "defender", "Italy", 19, "right", 0.58, ["pos_center_back"]),
  supplementalPlayer("Andy Robertson", "安迪·罗伯逊", "defender", "Scotland", 32, "left", 0.72, ["pos_fullback"]),
  supplementalPlayer("Jeremie Frimpong", "弗林蓬", "defender", "Netherlands", 25, "right", 0.84, ["pos_fullback", "pos_winger", "skin_dark"]),
  supplementalPlayer("Rhys Williams", "里斯·威廉姆斯", "defender", "England", 25, "right", 0.42, ["pos_center_back"]),
  supplementalPlayer("Calvin Ramsay", "卡尔文·拉姆齐", "defender", "Scotland", 22, "right", 0.42, ["pos_fullback"]),
  supplementalPlayer("Carter Pinnington", "卡特·平宁顿", "defender", "England", 19, "right", 0.36, ["pos_center_back"]),
  supplementalPlayer("Amara Nallo", "阿马拉·纳洛", "defender", "England", 19, "right", 0.4, ["pos_center_back", "skin_dark"]),
  supplementalPlayer("Talla Ndiaye", "塔拉·恩迪亚耶", "defender", "Senegal", null, null, 0.34, ["pos_center_back", "skin_dark"]),
  supplementalPlayer("Wellity Lucky", "韦利蒂·拉基", "defender", "Spain", 20, "right", 0.36, ["pos_center_back", "skin_dark"]),
  supplementalPlayer("Wataru Endo", "远藤航", "midfielder", "Japan", 33, "right", 0.68, ["pos_defensive_mid"]),
  supplementalPlayer("Florian Wirtz", "维尔茨", "midfielder", "Germany", 23, "right", 0.94, ["pos_attacking_mid", "pos_winger"]),
  supplementalPlayer("Dominik Szoboszlai", "索博斯洛伊", "midfielder", "Hungary", 25, "right", 0.92, ["pos_central_mid", "pos_attacking_mid"]),
  supplementalPlayer("Alexis Mac Allister", "麦卡利斯特", "midfielder", "Argentina", 27, "right", 0.92, ["pos_central_mid", "pos_defensive_mid"]),
  supplementalPlayer("Curtis Jones", "柯蒂斯·琼斯", "midfielder", "England", 25, "right", 0.76, ["pos_central_mid"]),
  supplementalPlayer("Ryan Gravenberch", "赫拉芬贝赫", "midfielder", "Netherlands", 24, "right", 0.9, ["pos_central_mid", "pos_defensive_mid", "skin_dark"]),
  supplementalPlayer("Trey Nyoni", "特雷·尼奥尼", "midfielder", "England", 18, "right", 0.5, ["pos_central_mid", "skin_dark"]),
  supplementalPlayer("Stefan Bajcetic", "巴伊切蒂奇", "midfielder", "Spain", 21, "right", 0.58, ["pos_defensive_mid", "pos_central_mid"]),
  supplementalPlayer("James McConnell", "詹姆斯·麦康奈尔", "midfielder", "England", 21, "right", 0.48, ["pos_defensive_mid", "pos_central_mid"]),
  supplementalPlayer("Kieran Morrison", "基兰·莫里森", "midfielder", "Northern Ireland", 19, "left", 0.36, ["pos_attacking_mid"]),
  supplementalPlayer("Tommy Pilling", "汤米·皮林", "midfielder", "England", 18, "right", 0.34, ["pos_central_mid"]),
  supplementalPlayer("Michael Laffey", "迈克尔·拉菲", "midfielder", "England", null, null, 0.32, ["pos_central_mid"]),
  supplementalPlayer("Alexander Isak", "伊萨克", "forward", "Sweden", 26, "right", 0.94, ["pos_striker", "skin_dark"]),
  supplementalPlayer("Mohamed Salah", "萨拉赫", "forward", "Egypt", 34, "left", 0.98, ["pos_winger", "skin_dark"]),
  supplementalPlayer("Federico Chiesa", "费德里科·基耶萨", "forward", "Italy", 28, "right", 0.68, ["pos_winger"]),
  supplementalPlayer("Cody Gakpo", "加克波", "forward", "Netherlands", 27, "right", 0.86, ["pos_winger", "pos_striker", "skin_dark"]),
  supplementalPlayer("Hugo Ekitiké", "埃基蒂克", "forward", "France", 24, "right", 0.88, ["pos_striker", "skin_dark"]),
  supplementalPlayer("Kaide Gordon", "凯德·戈登", "forward", "England", 21, "left", 0.42, ["pos_winger"]),
  supplementalPlayer("Keyrol Figueroa", "凯罗尔·菲格罗亚", "forward", "Honduras", 19, "right", 0.36, ["pos_striker", "skin_dark"]),
  supplementalPlayer("Rio Ngumoha", "里奥·恩古莫哈", "forward", "England", 17, "right", 0.52, ["pos_winger", "skin_dark"]),
  supplementalPlayer("Jayden Danns", "杰登·丹斯", "forward", "England", 20, "right", 0.48, ["pos_striker", "skin_dark"]),
  supplementalPlayer("Will Wright", "威尔·赖特", "forward", "England", 18, "right", 0.34, ["pos_striker"]),
  clubPlayer("Eintracht Frankfurt", "Michael Zetterer", "泽特雷尔", "goalkeeper", "Germany", 30, "right", 0.84),
  clubPlayer("Eintracht Frankfurt", "Jens Grahl", "延斯·格拉尔", "goalkeeper", "Germany", 37, "right", 0.42),
  clubPlayer("Eintracht Frankfurt", "Amil Siljevic", "阿米尔·西列维奇", "goalkeeper", "Bosnia and Herzegovina", 18, "right", 0.34),
  clubPlayer("Eintracht Frankfurt", "Kaua Santos", "卡欧阿·桑托斯", "goalkeeper", "Brazil", 23, "right", 0.72),
  clubPlayer("Eintracht Frankfurt", "Elias Baum", "埃利亚斯·鲍姆", "defender", "Germany", 20, "right", 0.72, ["pos_fullback"]),
  clubPlayer("Eintracht Frankfurt", "Arthur Theate", "阿蒂尔·泰特", "defender", "Belgium", 26, "left", 0.92, ["pos_center_back", "pos_fullback"]),
  clubPlayer("Eintracht Frankfurt", "Robin Koch", "罗宾·科赫", "defender", "Germany", 29, "right", 0.94, ["pos_center_back"]),
  clubPlayer("Eintracht Frankfurt", "Aurèle Amenda", "阿门达", "defender", "Switzerland", 22, "right", 0.68, ["pos_center_back", "skin_dark"]),
  clubPlayer("Eintracht Frankfurt", "Rasmus Kristensen", "拉斯穆斯·克里斯滕森", "defender", "Denmark", 28, "right", 0.9, ["pos_fullback"]),
  clubPlayer("Eintracht Frankfurt", "Nathaniel Brown", "纳撒尼尔·布朗", "defender", "Germany", 23, "left", 0.86, ["pos_fullback", "skin_dark"]),
  clubPlayer("Eintracht Frankfurt", "Timothy Chandler", "蒂莫西·钱德勒", "defender", "United States", 36, "right", 0.38, ["pos_fullback"]),
  clubPlayer("Eintracht Frankfurt", "Keita Kosugi", "小杉启太", "defender", "Japan", 20, "left", 0.56, ["pos_fullback"]),
  clubPlayer("Eintracht Frankfurt", "Nnamdi Collins", "纳姆迪·科林斯", "defender", "Germany", 22, "right", 0.82, ["pos_center_back", "pos_fullback", "skin_dark"]),
  clubPlayer("Eintracht Frankfurt", "Oscar Højlund", "奥斯卡·霍伊伦", "midfielder", "Denmark", 21, "right", 0.7, ["pos_central_mid", "pos_defensive_mid"]),
  clubPlayer("Eintracht Frankfurt", "Farès Chaïbi", "沙伊比", "midfielder", "Algeria", 23, "right", 0.76, ["pos_attacking_mid", "pos_central_mid"]),
  clubPlayer("Eintracht Frankfurt", "Ellyes Skhiri", "斯希里", "midfielder", "Tunisia", 31, "right", 0.82, ["pos_defensive_mid", "pos_central_mid"]),
  clubPlayer("Eintracht Frankfurt", "Hugo Larsson", "雨果·拉尔松", "midfielder", "Sweden", 21, "right", 0.9, ["pos_central_mid", "pos_defensive_mid"]),
  clubPlayer("Eintracht Frankfurt", "Mo Dahoud", "达胡德", "midfielder", "Syria", 30, "right", 0.62, ["pos_central_mid", "pos_defensive_mid"]),
  clubPlayer("Eintracht Frankfurt", "Mario Götze", "格策", "midfielder", "Germany", 34, "right", 0.76, ["pos_attacking_mid", "pos_central_mid"]),
  clubPlayer("Eintracht Frankfurt", "Love Arrhov", "洛夫·阿尔霍夫", "midfielder", "Sweden", 18, null, 0.34, ["pos_central_mid"]),
  clubPlayer("Eintracht Frankfurt", "Ansgar Knauff", "克瑙夫", "forward", "Germany", 24, "right", 0.82, ["pos_winger"]),
  clubPlayer("Eintracht Frankfurt", "Jonathan Burkardt", "布尔卡特", "forward", "Germany", 25, "right", 0.92, ["pos_striker"]),
  clubPlayer("Eintracht Frankfurt", "Younes Ebnoutalib", "埃布努塔利布", "forward", "Morocco", 22, "right", 0.62, ["pos_striker"]),
  clubPlayer("Eintracht Frankfurt", "Jean-Mattéo Bahoya", "巴霍亚", "forward", "France", 21, "right", 0.78, ["pos_winger", "skin_dark"]),
  clubPlayer("Eintracht Frankfurt", "Ritsu Doan", "堂安律", "forward", "Japan", 28, "left", 0.92, ["pos_winger", "pos_attacking_mid"]),
  clubPlayer("Eintracht Frankfurt", "Arnaud Kalimuendo", "卡利穆恩多", "forward", "France", 24, "right", 0.78, ["pos_striker", "skin_dark"]),
  clubPlayer("Eintracht Frankfurt", "Ayoube Amaimouni-Echghouyab", "阿尤布·阿迈穆尼", "forward", "Morocco", 21, "right", 0.46, ["pos_winger"]),
  clubPlayer("Eintracht Frankfurt", "Michy Batshuayi", "巴舒亚伊", "forward", "Belgium", 32, "right", 0.64, ["pos_striker", "skin_dark"]),
  clubPlayer("Eintracht Frankfurt", "Can Uzun", "詹·乌尊", "forward", "Turkey", 20, "right", 0.8, ["pos_attacking_mid", "pos_striker"]),
  clubPlayer("RC Lens", "Régis Gurtner", "雷吉斯·居尔特内", "goalkeeper", "France", 39, "right", 0.46),
  clubPlayer("RC Lens", "Robin Risser", "罗宾·里瑟", "goalkeeper", "France", 21, "right", 0.88),
  clubPlayer("RC Lens", "Ilan Jourdren", "伊兰·茹尔德朗", "goalkeeper", "France", 17, "right", 0.34),
  clubPlayer("RC Lens", "Mathieu Gorgelin", "马蒂厄·戈尔热兰", "goalkeeper", "France", 35, "right", 0.42),
  clubPlayer("RC Lens", "Ruben Aguilar", "鲁本·阿吉拉尔", "defender", "France", 33, "right", 0.72, ["pos_fullback"]),
  clubPlayer("RC Lens", "Nidal Čelik", "尼达尔·切利克", "defender", "Bosnia and Herzegovina", 19, "right", 0.56, ["pos_center_back"]),
  clubPlayer("RC Lens", "Samson Baidoo", "萨姆松·拜杜", "defender", "Austria", 22, "right", 0.84, ["pos_center_back", "skin_dark"]),
  clubPlayer("RC Lens", "Matthieu Udol", "马蒂厄·乌多尔", "defender", "France", 30, "left", 0.9, ["pos_fullback", "pos_center_back"]),
  clubPlayer("RC Lens", "Malang Sarr", "马朗·萨尔", "defender", "France", 27, "left", 0.82, ["pos_center_back", "skin_dark"]),
  clubPlayer("RC Lens", "Saud Abdulhamid", "沙特·阿卜杜勒哈米德", "defender", "Saudi Arabia", 26, "right", 0.76, ["pos_fullback", "skin_dark"]),
  clubPlayer("RC Lens", "Jonathan Gradit", "若纳唐·格拉迪", "defender", "France", 33, "right", 0.84, ["pos_center_back"]),
  clubPlayer("RC Lens", "Ismaëlo Ganiou", "伊斯梅洛·加尼乌", "defender", "France", 21, "right", 0.52, ["pos_center_back", "skin_dark"]),
  clubPlayer("RC Lens", "Kyllian Antonio", "基利安·安东尼奥", "defender", "France", 18, "right", 0.36, ["pos_center_back", "skin_dark"]),
  clubPlayer("RC Lens", "Arthur Masuaku", "马苏亚库", "defender", "DR Congo", 32, "left", 0.66, ["pos_fullback", "skin_dark"]),
  clubPlayer("RC Lens", "Andrija Bulatović", "安德里亚·布拉托维奇", "midfielder", "Montenegro", 19, "right", 0.58, ["pos_central_mid", "pos_defensive_mid"]),
  clubPlayer("RC Lens", "Mamadou Sangaré", "马马杜·桑加雷", "midfielder", "Mali", 23, "left", 0.88, ["pos_central_mid", "pos_defensive_mid", "skin_dark"]),
  clubPlayer("RC Lens", "Adrien Thomasson", "托马松", "midfielder", "France", 32, "right", 0.9, ["pos_central_mid", "pos_attacking_mid"]),
  clubPlayer("RC Lens", "Alpha Diallo", "阿尔法·迪亚洛", "midfielder", "France", 20, "right", 0.42, ["pos_central_mid", "skin_dark"]),
  clubPlayer("RC Lens", "Fodé Sylla", "福代·西拉", "midfielder", "France", 20, "right", 0.52, ["pos_defensive_mid", "skin_dark"]),
  clubPlayer("RC Lens", "Amadou Haidara", "阿马杜·海达拉", "midfielder", "Mali", 28, "right", 0.82, ["pos_central_mid", "pos_defensive_mid", "skin_dark"]),
  clubPlayer("RC Lens", "Florian Sotoca", "弗洛里安·索托卡", "forward", "France", 35, "right", 0.74, ["pos_striker", "pos_winger"]),
  clubPlayer("RC Lens", "Florian Thauvin", "托万", "forward", "France", 33, "left", 0.94, ["pos_winger", "pos_attacking_mid"]),
  clubPlayer("RC Lens", "Odsonne Édouard", "爱德华", "forward", "France", 28, "right", 0.92, ["pos_striker", "skin_dark"]),
  clubPlayer("RC Lens", "Abdallah Sima", "阿卜杜拉·西马", "forward", "Senegal", 25, "right", 0.82, ["pos_winger", "pos_striker", "skin_dark"]),
  clubPlayer("RC Lens", "Wesley Saïd", "韦斯利·赛义德", "forward", "France", 31, "right", 0.7, ["pos_winger", "pos_striker", "skin_dark"]),
  clubPlayer("RC Lens", "Anthony Bermont", "安东尼·贝尔蒙", "forward", "France", 21, "right", 0.54, ["pos_winger"]),
  clubPlayer("RC Lens", "Rayan Fofana", "拉扬·福法纳", "forward", "France", 20, "right", 0.48, ["pos_striker", "skin_dark"]),
  clubPlayer("RC Lens", "Allan Saint-Maximin", "圣马克西曼", "forward", "France", 29, "right", 0.78, ["pos_winger", "skin_dark"]),
  clubPlayer("RC Lens", "Erawan Garnier", "埃拉万·加尼耶", "forward", "France", 20, "right", 0.4, ["pos_winger"]),
];

const MANUAL_FOOTBALL_STARS = [
  footballStar("star_messi", "Lionel Messi", "阿根廷前场核心", "世界杯冠军，长期代表巴塞罗那和阿根廷，是现代足球最具辨识度的球员之一。", ["forward", "midfielder", "country_argentina", "region_south_america", "world_cup_2022_country", "world_cup_participant", "position_outfield", "attacking_half", "foot_left", "skin_light"], ["梅西", "Messi", "Leo Messi"], ["阿根廷", "世界杯", "前场"], { country: "Argentina", position: "forward", age: 39, scope: "Major star", retired: false, appearanceShare: 0.98 }),
  footballStar("star_son", "Son Heung-min", "韩国前锋", "亚洲足球代表人物，速度、射门和英超热刺时期让他极具知名度。", ["forward", "country_south_korea", "region_asia", "world_cup_2022_country", "world_cup_participant", "position_outfield", "attacking_half", "foot_right", "skin_light"], ["孙兴慜", "孙兴民", "Son", "Heung-min Son"], ["韩国", "亚洲", "前锋"], { country: "South Korea", position: "forward", age: 34, scope: "Major star", retired: false, appearanceShare: 0.94 }),
  footballStar("star_laimer", "Konrad Laimer", "奥地利多面中场", "覆盖能力强，可踢中场、防守型中场和边后卫，现役欧洲主流联赛球员。", ["midfielder", "defender", "country_austria", "region_europe", "world_cup_2022_country", "position_outfield", "pos_central_mid", "pos_defensive_mid", "pos_fullback", "foot_right", "skin_light", "scope_big_five"], ["莱默尔", "莱默", "Laimer"], ["奥地利", "中场", "右脚"], { country: "Austria", position: "midfielder", age: 29, scope: "Big Five", retired: false, appearanceShare: 0.82 }),
  footballStar("star_r9", "Ronaldo Nazário", "巴西现象级中锋", "爆发力、世界杯冠军和多家豪门经历，是九十年代末到本世纪初的标志性前锋。", ["retired", "forward", "country_brazil", "region_south_america", "world_cup_participant", "position_outfield", "attacking_half", "foot_right", "skin_dark"], ["大罗", "罗纳尔多", "R9", "Ronaldo"], ["巴西", "中锋", "已退役"], { country: "Brazil", position: "forward", age: 49, scope: "Retired legend", retired: true, clubs: ["Barcelona", "Real Madrid", "Inter Milan", "AC Milan"], appearanceShare: 0.98 }),
  footballStar("star_ronaldinho", "Ronaldinho", "巴西艺术型前场", "盘带、创造力、巴塞罗那和金球奖让他拥有极强个人风格。", ["retired", "forward", "midfielder", "country_brazil", "region_south_america", "world_cup_participant", "position_outfield", "attacking_half", "foot_right", "skin_dark"], ["小罗", "罗纳尔迪尼奥", "Ronaldinho Gaucho"], ["巴西", "盘带", "已退役"], { country: "Brazil", position: "forward", age: 46, scope: "Retired legend", retired: true, clubs: ["Paris Saint-Germain", "Barcelona", "AC Milan"], appearanceShare: 0.98 }),
  footballStar("star_zlatan", "Zlatan Ibrahimović", "瑞典中锋", "身体、技术和鲜明个性兼具，曾效力多家欧洲豪门。", ["retired", "forward", "country_sweden", "region_europe", "world_cup_participant", "position_outfield", "attacking_half", "foot_right", "skin_light"], ["伊布", "伊布拉希莫维奇", "Zlatan", "Ibrahimovic"], ["瑞典", "中锋", "已退役"], { country: "Sweden", position: "forward", age: 44, scope: "Retired legend", retired: true, clubs: ["Ajax", "Juventus", "Inter Milan", "Barcelona", "AC Milan", "Paris Saint-Germain", "Manchester United"], appearanceShare: 0.97 }),
  footballStar("star_beckenbauer", "Franz Beckenbauer", "德国传奇后卫", "清道夫位置的代表人物，球员和教练生涯都极具历史地位。", ["retired", "defender", "country_germany", "region_europe", "world_cup_participant", "position_outfield", "defensive_half", "foot_right", "skin_light"], ["贝肯鲍尔", "足球皇帝", "Beckenbauer"], ["德国", "后卫", "已退役"], { country: "Germany", position: "defender", age: 78, scope: "Retired legend", retired: true, appearanceShare: 0.98 }),
  footballStar("star_pele", "Pelé", "巴西传奇前锋", "三夺世界杯，是足球史上最重要的名字之一。", ["retired", "forward", "country_brazil", "region_south_america", "world_cup_participant", "position_outfield", "attacking_half", "foot_right", "skin_dark"], ["贝利", "Pele"], ["巴西", "世界杯", "已退役"], { country: "Brazil", position: "forward", age: 82, scope: "Retired legend", retired: true, appearanceShare: 0.99 }),
  footballStar("star_maradona", "Diego Maradona", "阿根廷传奇核心", "左脚、盘带、世界杯和那不勒斯岁月让他极具辨识度。", ["retired", "forward", "midfielder", "country_argentina", "region_south_america", "world_cup_participant", "position_outfield", "attacking_half", "foot_left", "skin_light"], ["马拉多纳", "Diego Armando Maradona"], ["阿根廷", "世界杯", "已退役"], { country: "Argentina", position: "midfielder", age: 60, scope: "Retired legend", retired: true, appearanceShare: 0.99 }),
];

mergeSupplementalFootballSquads();
applyExternalFootballData();

for (const group of Object.values(DATASETS)) {
  for (const candidate of group.candidates) {
    const existing = candidate.aliases ? [...candidate.aliases] : [];
    const extra = ALIASES[candidate.id] || ALIASES[candidate.name] || [];
    candidate.aliases = new Set([...existing, ...extra]);
  }
}

const els = {
  body: document.body,
  sceneArt: document.querySelector("#sceneArt"),
  answerGrid: document.querySelector("#answerGrid"),
  questionZone: document.querySelector("#questionZone"),
  questionText: document.querySelector("#questionText"),
  modeLabel: document.querySelector("#modeLabel"),
  roundLabel: document.querySelector("#roundLabel"),
  confidenceLabel: document.querySelector("#confidenceLabel"),
  confidenceFill: document.querySelector("#confidenceFill"),
  poolLabel: document.querySelector("#poolLabel"),
  signalLabel: document.querySelector("#signalLabel"),
  signalList: document.querySelector("#signalList"),
  clueCount: document.querySelector("#clueCount"),
  clueTrail: document.querySelector("#clueTrail"),
  undoTopBtn: document.querySelector("#undoTopBtn"),
  undoBtn: document.querySelector("#undoBtn"),
  skipBtn: document.querySelector("#skipBtn"),
  whyBtn: document.querySelector("#whyBtn"),
  preliminaryGuessBtn: document.querySelector("#preliminaryGuessBtn"),
  restartTop: document.querySelector("#restartTop"),
  resultLayer: document.querySelector("#resultLayer"),
  closeResult: document.querySelector("#closeResult"),
  correctBtn: document.querySelector("#correctBtn"),
  wrongBtn: document.querySelector("#wrongBtn"),
  revealFromResultBtn: document.querySelector("#revealFromResultBtn"),
  revealForm: document.querySelector("#revealForm"),
  revealInput: document.querySelector("#revealInput"),
  revealStatus: document.querySelector("#revealStatus"),
  matchOutput: document.querySelector("#matchOutput"),
  resultKicker: document.querySelector("#resultKicker"),
  resultAvatar: document.querySelector("#resultAvatar"),
  resultName: document.querySelector("#resultName"),
  resultBio: document.querySelector("#resultBio"),
  resultTags: document.querySelector("#resultTags"),
  alternatives: document.querySelector("#alternatives"),
};

let dataset = DATASETS[els.body.dataset.mode] || DATASETS.general;
let state;
let currentQuestion = null;
let latestScores = [];
let dynamicQuestionCache = new Map();

function person(id, name, title, bio, traits, tags) {
  return { id, name, title, bio, traits: new Set(traits), tags };
}

function player(id, name, title, bio, traits, tags) {
  return person(id, name, title, bio, traits, tags);
}

function supplementalPlayer(name, chineseName, position, country, age, foot, appearanceShare, extraTraits = []) {
  return clubPlayer(
    "Liverpool",
    name,
    chineseName,
    position,
    country,
    age,
    foot,
    appearanceShare,
    extraTraits,
  );
}

function clubPlayer(club, name, chineseName, position, country, age, foot, appearanceShare, extraTraits = []) {
  const traits = [
    `club_${slugTrait(club)}`,
    `country_${slugTrait(country)}`,
    position,
    "scope_big_five",
    ...extraTraits,
  ];
  if (foot) traits.push(`foot_${foot}`);
  if (age !== null) {
    if (age < 21) traits.push("age_under_21");
    else if (age <= 24) traits.push("age_21_24");
    else if (age <= 29) traits.push("age_25_29");
    else traits.push("age_30_plus");
  }
  return {
    id: `sq_${slugTrait(club)}_${slugTrait(name)}`,
    name,
    title: `${club} · ${position}`,
    bio: `${country}球员，当前效力${club}。${age === null ? "" : `年龄约${age}岁。`}`,
    traits,
    tags: [club, position, country, ...(age === null ? [] : [`${age}岁`])],
    aliases: [name, chineseName, club, country],
    meta: { club, position, age, country, scope: "Big Five", appearanceShare },
  };
}

function mergeSupplementalFootballSquads() {
  if (!Array.isArray(window.FOOTBALL_PLAYERS)) return;
  const supplementalNames = new Set(
    SUPPLEMENTAL_FOOTBALL_SQUADS.map((entry) => normalizeText(entry.name)),
  );
  window.FOOTBALL_PLAYERS = window.FOOTBALL_PLAYERS.filter(
    (entry) => !supplementalNames.has(normalizeText(entry.name)),
  );
  window.FOOTBALL_PLAYERS.push(...SUPPLEMENTAL_FOOTBALL_SQUADS);

  if (Array.isArray(window.FOOTBALL_DYNAMIC_QUESTIONS)) {
    const supplementalClubs = [...new Set(
      SUPPLEMENTAL_FOOTBALL_SQUADS.map((entry) => entry.meta && entry.meta.club).filter(Boolean),
    )];
    const supplementalClubQuestionIds = new Set(
      supplementalClubs.map((club) => `club_${slugTrait(club)}`),
    );
    window.FOOTBALL_DYNAMIC_QUESTIONS = window.FOOTBALL_DYNAMIC_QUESTIONS.filter(
      (entry) => !supplementalClubQuestionIds.has(entry.id),
    );
    supplementalClubs.forEach((club) => {
      window.FOOTBALL_DYNAMIC_QUESTIONS.push({
        id: `club_${slugTrait(club)}`,
        text: `TA 当前效力 ${club} 吗？`,
        chip: club,
        weight: 1.52,
      });
    });
  }

  if (window.FOOTBALL_DATA_SOURCE) {
    window.FOOTBALL_DATA_SOURCE.generatedAt = "2026-06-18";
    window.FOOTBALL_DATA_SOURCE.playerCount = window.FOOTBALL_PLAYERS.length;
    const sourcePages = Array.isArray(window.FOOTBALL_DATA_SOURCE.sourcePages)
      ? window.FOOTBALL_DATA_SOURCE.sourcePages
      : [];
    const supplementalSources = [
      {
        name: "Liverpool official squad",
        url: "https://www.premierleague.com/en/clubs/14/liverpool/squad",
        category: "Big Five",
      },
      {
        name: "Eintracht Frankfurt official squad",
        url: "https://en.eintracht.de/squad/",
        category: "Big Five",
      },
      {
        name: "RC Lens 2025/26 squad",
        url: "https://en.wikipedia.org/wiki/2025%E2%80%9326_RC_Lens_season",
        category: "Big Five",
      },
    ];
    supplementalSources.forEach((source) => {
      if (!sourcePages.some((entry) => entry.url === source.url)) sourcePages.push(source);
    });
    window.FOOTBALL_DATA_SOURCE.sourcePages = sourcePages;
    window.FOOTBALL_DATA_SOURCE.notes =
      `${window.FOOTBALL_DATA_SOURCE.notes || ""} Liverpool, Eintracht Frankfurt and RC Lens squads supplemented from official club/league season sources.`;
  }
}

function question(id, text, chip, weight = 1, starter = false, family = null) {
  return { id, text, chip, weight, starter, family: family || questionFamilyFromId(id) };
}

function applyExternalFootballData() {
  if (!Array.isArray(window.FOOTBALL_PLAYERS) || !Array.isArray(window.FOOTBALL_DYNAMIC_QUESTIONS)) return;

  const sourcePlayers = [
    ...(window.FOOTBALL_LEGEND_PLAYERS || []),
    ...window.FOOTBALL_PLAYERS,
    ...(window.FOOTBALL_2026_PLAYERS || []),
  ];
  const candidates = sourcePlayers.map((rawEntry) => {
    const entry = prepareFootballEntry(rawEntry);
    const cleanName = sanitizeFootballName(entry.name);
    const translatedName =
      window.FOOTBALL_ZH_ALIASES &&
      (window.FOOTBALL_ZH_ALIASES[cleanName] || window.FOOTBALL_ZH_ALIASES[entry.name]);
    return {
    id: entry.id,
    name: cleanName,
    title: entry.title,
    bio: entry.bio,
    traits: new Set(entry.traits || []),
    tags: entry.tags || [],
    aliases: new Set([
      cleanName,
      ...(entry.aliases || []).map(sanitizeFootballName),
      ...(translatedName ? [translatedName] : []),
    ]),
    meta: entry.meta || {},
    };
  });
  mergeDuplicateFootballCandidates(candidates);
  applyFootballDataCorrections(candidates);
  mergeManualFootballStars(candidates);
  assignAppearanceShares(candidates);
  candidates.forEach(enrichFootballCandidate);

  const questions = new Map();
  for (const entry of window.FOOTBALL_DYNAMIC_QUESTIONS) {
    const q = polishFootballQuestion(entry);
    if (q.id === "country_united_kingdom" || normalizeText(q.chip) === "unitedkingdom") continue;
    if (footballQuestionHasSignal(candidates, q)) questions.set(q.id, q);
  }
  for (const q of historicalClubQuestions(candidates)) {
    if (footballQuestionHasSignal(candidates, q) && !questions.has(q.id)) questions.set(q.id, q);
  }
  for (const q of FOOTBALL_EXTRA_QUESTIONS) {
    if (footballQuestionHasSignal(candidates, q)) questions.set(q.id, q);
  }

  DATASETS.football.candidates = candidates;
  DATASETS.football.questions = [...questions.values()];
  DATASETS.football.maxQuestions = Math.max(80, DATASETS.football.questions.length);
  DATASETS.football.source = window.FOOTBALL_DATA_SOURCE || null;
}

function prepareFootballEntry(entry) {
  const club = sanitizeClubName(entry.meta && entry.meta.club);
  const country = normalizedFootballCountryForEntry(entry);
  const clubs = [...new Set([
    ...((entry.meta && entry.meta.clubs) || []),
    club,
  ].map(sanitizeClubName).filter(Boolean))];
  const replaceClub = (value) => String(value || "").replace(/\s*\([CR]\)(?=\s|[。·]|$)/g, "");
  return {
    ...entry,
    title: replaceClub(entry.title),
    bio: replaceClub(entry.bio),
    traits: normalizeCountryTraits((entry.traits || []).map(normalizeClubTrait), country),
    tags: (entry.tags || [])
      .map((tag) => sanitizeClubName(tag))
      .map((tag) => normalizeText(tag) === "unitedkingdom" ? country : tag),
    aliases: (entry.aliases || []).map((alias) => sanitizeClubName(alias)),
    meta: { ...(entry.meta || {}), club, clubs, country },
  };
}

function normalizedFootballCountryForEntry(entry) {
  const rawCountry = String(entry.meta && entry.meta.country || "").trim();
  const normalized = normalizeText(rawCountry);
  if (normalized === "whales") return "Wales";
  if (normalized !== "unitedkingdom" && normalized !== "uk" && normalized !== "greatbritain") {
    return rawCountry;
  }
  return FOOTBALL_UK_COUNTRY_OVERRIDES.get(normalizeText(sanitizeFootballName(entry.name))) || "England";
}

function normalizeCountryTraits(traits, country) {
  const normalizedCountry = canonicalFootballCountry(country);
  return [...new Set([
    ...traits.filter((trait) => !trait.startsWith("country_")),
    normalizedCountry ? `country_${slugTrait(country)}` : null,
  ].filter(Boolean))];
}

function sanitizeClubName(value) {
  return String(value || "").replace(/\s*\([CR]\)\s*$/g, "").trim();
}

function normalizeClubTrait(trait) {
  return String(trait || "").replace(/^(club_.+?)_(?:c|r)$/i, "$1");
}

function sanitizeFootballName(value) {
  return String(value || "")
    .normalize("NFKC")
    .replace(/\s*[†‡*]+\s*$/g, "")
    .replace(/\s*\((?:footballer|player)[^)]*\)\s*$/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function mergeDuplicateFootballCandidates(candidates) {
  const firstByIdentity = new Map();
  for (let index = candidates.length - 1; index >= 0; index -= 1) {
    const candidate = candidates[index];
    const country = canonicalFootballCountry(candidate.meta && candidate.meta.country);
    const identity = `${normalizeText(candidate.name)}|${country}`;
    const existing = firstByIdentity.get(identity);
    if (!existing) {
      candidate.meta = {
        ...(candidate.meta || {}),
        clubs: [...new Set([candidate.meta && candidate.meta.club].filter(Boolean))],
      };
      firstByIdentity.set(identity, candidate);
      continue;
    }
    const clubs = [
      ...(existing.meta.clubs || []),
      ...(candidate.meta.clubs || []),
      existing.meta.club,
      candidate.meta && candidate.meta.club,
    ].filter(Boolean);
    existing.meta.clubs = [...new Set(clubs)];
    candidate.traits.forEach((trait) => existing.traits.add(trait));
    candidate.aliases.forEach((alias) => existing.aliases.add(alias));
    existing.tags = [...new Set([...(existing.tags || []), ...(candidate.tags || [])])];
    existing.meta.retired = Boolean(existing.meta.retired || candidate.meta.retired);
    existing.meta.worldCup2026 = Boolean(existing.meta.worldCup2026 || candidate.meta.worldCup2026);
    existing.meta.appearanceShare = Math.max(
      Number(existing.meta.appearanceShare || 0),
      Number(candidate.meta.appearanceShare || 0),
    );
    if (existing.meta.age == null && candidate.meta.age != null) existing.meta.age = candidate.meta.age;
    if (
      normalizeText(existing.meta.scope) === "2026worldcup" &&
      candidate.meta.scope &&
      normalizeText(candidate.meta.scope) !== "2026worldcup"
    ) {
      existing.meta.scope = candidate.meta.scope;
    }
    candidates.splice(index, 1);
  }
}

function historicalClubQuestions(candidates) {
  const clubs = new Map();
  for (const candidate of candidates) {
    for (const club of candidate.meta.clubs || []) {
      const clean = sanitizeClubName(club);
      if (!clean || !isRecognizableHistoryClub(clean)) continue;
      clubs.set(clean, (clubs.get(clean) || 0) + 1);
    }
  }
  return [...clubs]
    .filter(([, count]) => count >= 2)
    .map(([club]) => ({
      id: `club_${slugTrait(club)}`,
      text: `TA 曾效力 ${club} 吗？`,
      chip: club,
      weight: 1.38,
      family: "club",
      meta: { club },
    }));
}

function isRecognizableHistoryClub(club) {
  return /Arsenal|Barcelona|Real Madrid|Atl[eé]tico|Manchester|Liverpool|Chelsea|Tottenham|Bayern|Dortmund|Juventus|Inter Milan|AC Milan|Milan|Paris Saint-Germain|PSG|Ajax|Benfica|Porto|Roma|Lazio|Napoli|Valencia|Sevilla|Monaco|Marseille|Lyon|Leverkusen|Fiorentina|Newcastle|Galatasaray|Fenerbah|Sporting CP|PSV|Feyenoord|Al Hilal|Al Nassr|Inter Miami/i.test(club);
}

function applyFootballDataCorrections(candidates) {
  const gordon = candidates.find((candidate) => normalizeText(candidate.name) === "anthonygordon");
  if (gordon) {
    const oldClub = gordon.meta.club;
    gordon.meta = {
      ...gordon.meta,
      club: "Barcelona",
      clubs: [...new Set([...(gordon.meta.clubs || []), oldClub, "Newcastle United", "Barcelona"].filter(Boolean))],
      country: "England",
      position: "forward",
      age: 25,
    };
    gordon.traits.delete("country_united_kingdom");
    gordon.traits.add("country_england");
    gordon.traits.add("region_europe");
    gordon.traits.add("club_newcastle_united");
    gordon.traits.add("club_barcelona");
    gordon.title = "Barcelona · forward";
    gordon.bio = "英格兰边锋，2025/26 赛季效力纽卡斯尔联，2026/27 赛季效力巴塞罗那。";
    gordon.tags = [...new Set(["Barcelona", "Newcastle United", "forward", "England", "25岁", ...gordon.tags])];
    gordon.aliases.add("安东尼·戈登");
  }

  let dubravka = candidates.find((candidate) => normalizeText(candidate.name) === "martindubravka");
  if (!dubravka) {
    dubravka = {
      id: "manual_martin_dubravka",
      name: "Martin Dúbravka",
      title: "Burnley · goalkeeper",
      bio: "斯洛伐克门将，曾长期效力纽卡斯尔联。",
      traits: new Set(["goalkeeper", "country_slovakia", "region_europe", "foot_right", "club_burnley", "club_newcastle_united"]),
      tags: ["斯洛伐克", "门将", "Burnley"],
      aliases: new Set(["Martin Dúbravka", "Dúbravka", "杜布拉夫卡"]),
      meta: {
        club: "Burnley", clubs: ["Burnley", "Newcastle United"], position: "goalkeeper",
        age: 37, country: "Slovakia", scope: "Big Five", appearanceShare: 0.78,
      },
    };
    candidates.push(dubravka);
  }

  correctKnownFootballCandidate(candidates, "Nico O'Reilly", {
    country: "England", position: "defender", appearanceShare: 0.9,
    addTraits: ["country_england", "defender", "midfielder", "position_outfield", "defensive_half", "attacking_half", "pos_fullback", "pos_attacking_mid", "foot_left", "club_core"],
    removeTraits: ["country_united_kingdom"],
    title: "Manchester City · left-back / attacking midfielder",
    bio: "英格兰U21球员，曼城主力之一，可踢左后卫和进攻型中场。",
  });
  correctKnownFootballCandidate(candidates, "Myles Lewis-Skelly", {
    country: "England", position: "defender", appearanceShare: 0.74,
    addTraits: ["country_england", "defender", "midfielder", "position_outfield", "defensive_half", "pos_fullback", "pos_defensive_mid", "foot_left", "club_rotation"],
    removeTraits: ["country_united_kingdom", "world_cup_participant"],
    title: "Arsenal · left-back / midfielder",
    bio: "英格兰球员，阿森纳轮换球员，可踢左后卫和中场；未参加2022世界杯正赛。",
    aliases: ["迈尔斯·刘易斯-斯凯利", "刘易斯-斯凯利"],
  });
  correctKnownFootballCandidate(candidates, "Jurriën Timber", {
    appearanceShare: 0.9,
    addTraits: ["world_cup_participant", "pos_fullback", "pos_center_back", "foot_right", "club_core"],
    bio: "荷兰后卫，参加了2022世界杯，是阿森纳主力，可踢边后卫和中后卫。",
  });
  correctKnownFootballCandidate(candidates, "Hakan Çalhanoğlu", {
    appearanceShare: 0.92,
    addTraits: ["club_core", "attacking_half", "pos_central_mid", "pos_defensive_mid", "pos_attacking_mid", "foot_right"],
    bio: "土耳其中场，国际米兰主力，兼具组织、远射和进攻属性。",
  });
  correctKnownFootballCandidate(candidates, "Antoine Semenyo", {
    position: "forward", appearanceShare: 0.9,
    addTraits: ["forward", "attacking_half", "pos_winger", "club_core", "world_cup_participant", "world_cup_2026_participant"],
    bio: "加纳边锋，曼城主力，参加过2022世界杯和2026世界杯。",
    aliases: ["安托万·塞门约", "安托万·塞梅尼奥"],
  });
}

function correctKnownFootballCandidate(candidates, name, correction) {
  const candidate = candidates.find((item) => normalizeText(item.name) === normalizeText(name));
  if (!candidate) return;
  candidate.meta = {
    ...(candidate.meta || {}),
    ...Object.fromEntries(
      Object.entries(correction).filter(([key]) =>
        ["country", "position", "appearanceShare"].includes(key),
      ),
    ),
  };
  for (const trait of correction.removeTraits || []) candidate.traits.delete(trait);
  for (const trait of correction.addTraits || []) candidate.traits.add(trait);
  for (const alias of correction.aliases || []) candidate.aliases.add(alias);
  if (correction.title) candidate.title = correction.title;
  if (correction.bio) candidate.bio = correction.bio;
}

function questionFamilyFromId(id) {
  if (id.startsWith("club_")) return "club";
  if (id.startsWith("country_")) return "country";
  if (id.startsWith("age_")) return "age";
  if (id.startsWith("scope_") || id.startsWith("league_")) return "scope";
  if (id.startsWith("region_")) return "region";
  if (id.startsWith("world_cup_")) return "career";
  if (id === "retired") return "career";
  if (id.startsWith("foot_") || id.startsWith("skin_")) return "detail";
  if (id.startsWith("pos_")) return "specific_position";
  if (id.startsWith("club_core") || id.startsWith("club_rotation")) return "status";
  if (id.startsWith("name_has_") || id.startsWith("teammate_")) return "dynamic";
  if (["forward", "midfielder", "defender", "goalkeeper", "position_outfield", "attacking_half", "defensive_half"].includes(id)) {
    return "position";
  }
  return "general";
}

function questionStage(q) {
  const family = q.family || questionFamilyFromId(q.id);
  if (family === "country" || family === "region" || q.id.startsWith("world_cup_")) return 1;
  if (family === "scope" || q.id.startsWith("league_")) return 2;
  if (family === "position") return 3;
  if (q.id.startsWith("teammate_")) return 4;
  if (family === "status") return 4;
  if (family === "club" || family === "career" || q.id.startsWith("name_has_")) return 5;
  if (family === "age" || family === "detail" || family === "specific_position") return 6;
  return 4;
}

function polishFootballQuestion(entry) {
  const overrides = {
    scope_big_five: ["TA 现在在欧洲五大联赛体系踢球吗？", "五大联赛"],
    scope_chinese_super_league: ["TA 现在在中超联赛踢球吗？", "中超"],
    scope_saudi_pro_league: ["TA 现在在沙特联赛踢球吗？", "沙特联赛"],
  };
  const normalizedId = normalizeClubTrait(entry.id);
  const [text, rawChip] = overrides[normalizedId] || [entry.text, entry.chip];
  const chip = sanitizeClubName(rawChip);
  const family = entry.family || questionFamilyFromId(normalizedId);
  const currentClub = family === "club" && /当前效力/.test(entry.text || "");
  const currentLeague = family === "scope" && normalizedId.startsWith("league_") && /现在/.test(entry.text || "");
  const polishedText =
    family === "club" && chip
      ? currentClub
        ? `TA 当前效力 ${chip} 吗？`
        : `TA 曾效力 ${chip} 吗？`
      : text;
  return {
    id: normalizedId,
    text: polishedText,
    chip,
    weight: entry.weight || 1,
    starter: Boolean(entry.starter),
    family,
    meta: {
      ...(entry.meta || {}),
      club: sanitizeClubName(entry.meta && entry.meta.club),
      currentClub,
      currentLeague,
    },
  };
}

function enrichFootballCandidate(candidate) {
  const { traits, meta = {} } = candidate;
  const scope = normalizeText(meta.scope || "");
  const position = normalizeText(meta.position || "");
  const region = regionTraitForCountry(meta.country);

  if (region) traits.add(region);
  applyKnownPlayerTraits(candidate);
  const age = knownFootballAge(candidate.meta);
  if (meta.retired === true) traits.add("retired");
  if (scope === "chinesesuperleague" || scope === "saudiproleague") traits.add("league_asia");
  const leagueTrait = footballLeagueTrait(candidate.meta && candidate.meta.club);
  if (leagueTrait) traits.add(leagueTrait);
  if (age !== null) {
    if (age < 25) traits.add("age_under_25");
    if (age >= 25 && age <= 29) traits.add("age_25_29");
    if (age >= 30) traits.add("age_30_plus");
  }
  const share = Number(candidate.meta && candidate.meta.appearanceShare);
  if (Number.isFinite(share)) {
    if (share >= 0.82) traits.add("club_core");
    else if (share >= 0.62) traits.add("club_rotation");
  }
  if (position && position !== "goalkeeper") traits.add("position_outfield");
  if (position === "forward" || position === "midfielder") traits.add("attacking_half");
  if (position === "defender" || position === "goalkeeper") traits.add("defensive_half");
  if (FOOTBALL_WORLD_CUP_2022_COUNTRIES.has(normalizeText(meta.country || ""))) {
    traits.add("world_cup_2022_country");
  }
  if (candidateMatchesNameSet(candidate, FOOTBALL_WORLD_CUP_NAMES)) {
    traits.add("world_cup_participant");
  }
}

function footballLeagueTrait(club) {
  const name = String(club || "");
  if (/Arsenal|Aston Villa|Bournemouth|Brentford|Brighton|Burnley|Chelsea|Crystal Palace|Everton|Fulham|Leeds United|Liverpool|Manchester City|Manchester United|Newcastle United|Nottingham Forest|Sunderland|Tottenham|West Ham|Wolverhampton|Coventry|Hull City|Ipswich|Leicester|Southampton/i.test(name)) return "league_england";
  if (/Athletic Bilbao|Atl[eé]tico Madrid|Barcelona|Celta Vigo|Elche|Espanyol|Getafe|Girona|Levante|Mallorca|Osasuna|Rayo Vallecano|Real Betis|Real Madrid|Real Sociedad|Sevilla|Valencia|Villarreal|Deportivo La Coruña|Racing Santander/i.test(name)) return "league_spain";
  if (/Bayern|Dortmund|Leverkusen|RB Leipzig|Frankfurt|Hoffenheim|Stuttgart|Wolfsburg|Werder Bremen|Mainz|Augsburg|Freiburg|Union Berlin|St. Pauli|Hamburger|Schalke|Paderborn|Elversberg/i.test(name)) return "league_germany";
  if (/Atalanta|Bologna|Cagliari|Como|Cremonese|Fiorentina|Genoa|Inter Milan|Juventus|Lazio|Lecce|AC Milan|Monza|Napoli|Parma|Pisa|Roma|Sassuolo|Torino|Udinese|Venezia|Verona|Frosinone/i.test(name)) return "league_italy";
  if (/Auxerre|Lens|Lille|Lorient|Lyon|Marseille|Metz|Monaco|Nantes|Nice|Paris FC|Paris Saint-Germain|Rennes|Strasbourg|Toulouse|Le Havre|Le Mans/i.test(name)) return "league_france";
  return null;
}

function applyKnownPlayerTraits(candidate) {
  for (const [name, traits] of KNOWN_PLAYER_TRAITS.entries()) {
    if (candidateTerms(candidate).some((term) => normalizeText(term) === normalizeText(name))) {
      traits.forEach((trait) => candidate.traits.add(trait));
      applyKnownPlayerMeta(candidate, name);
    }
  }
}

function applyKnownPlayerMeta(candidate, name) {
  const meta = {
    "Crysencio Summerville": { age: 24, appearanceShare: 0.72 },
    "Jan Paul van Hecke": { age: 26, appearanceShare: 0.9 },
    "Patrik Schick": { age: 30, appearanceShare: 0.86 },
    "Esteban Lepaul": { age: 26, appearanceShare: 0.78 },
    "Jarrod Bowen": { age: 29, appearanceShare: 0.9 },
    "Bukayo Saka": { age: 24, appearanceShare: 0.96 },
    "Harvey Barnes": { age: 28, appearanceShare: 0.72 },
    "Callum Wilson": { age: 34, appearanceShare: 0.68 },
    "Kaoru Mitoma": { age: 29, appearanceShare: 0.88 },
    "Takefusa Kubo": { age: 25, appearanceShare: 0.9 },
    "Daichi Kamada": { age: 30, appearanceShare: 0.76 },
    "Hwang Hee-chan": { age: 30, appearanceShare: 0.74 },
    "Kim Min-jae": { age: 29, appearanceShare: 0.92 },
    "Hiroki Ito": { age: 27, appearanceShare: 0.76 },
    "Lee Kang-in": { age: 25, appearanceShare: 0.82 },
    "Takumi Minamino": { age: 31, appearanceShare: 0.84 },
    "Ao Tanaka": { age: 27, appearanceShare: 0.84 },
    "Yukinari Sugawara": { age: 26, appearanceShare: 0.78 },
    "Zion Suzuki": { age: 24, appearanceShare: 0.86 },
    "Yuito Suzuki": { age: 24, appearanceShare: 0.76 },
    "Lee Jae-sung": { age: 33, appearanceShare: 0.78 },
  }[name];
  if (!meta) return;
  candidate.meta = { ...(candidate.meta || {}), ...meta };
}

function assignAppearanceShares(candidates) {
  const byClub = new Map();
  for (const candidate of candidates) {
    const club = candidate.meta && candidate.meta.club;
    if (!club) continue;
    if (!byClub.has(club)) byClub.set(club, []);
    byClub.get(club).push(candidate);
  }
  for (const group of byClub.values()) {
    group.forEach((candidate, index) => {
      if (candidate.meta.appearanceShare !== undefined) return;
      candidate.meta.appearanceShare = index < 11 ? 0.92 : index < 18 ? 0.72 : 0.48;
    });
  }
  for (const candidate of candidates) {
    if (candidate.meta.appearanceShare === undefined) {
      candidate.meta.appearanceShare = candidate.meta.retired ? 0.96 : 0.58;
    }
  }
}

function footballStar(id, name, title, bio, traits, aliases, tags, meta) {
  return { id, name, title, bio, traits, aliases, tags, meta };
}

function mergeManualFootballStars(candidates) {
  for (const star of MANUAL_FOOTBALL_STARS) {
    const existing = candidates.find((candidate) => sameFootballName(candidate.name, star.name));
    if (existing) {
      star.traits.forEach((trait) => existing.traits.add(trait));
      existing.aliases = new Set([...(existing.aliases || []), ...star.aliases]);
      existing.tags = [...new Set([...(existing.tags || []), ...star.tags])];
      existing.meta = { ...star.meta, ...(existing.meta || {}) };
      existing.meta.clubs = [...new Set([
        ...(star.meta.clubs || []),
        ...(existing.meta.clubs || []),
        existing.meta.club,
      ].filter(Boolean))];
      continue;
    }
    candidates.push({
      id: star.id,
      name: star.name,
      title: star.title,
      bio: star.bio,
      traits: new Set(star.traits),
      tags: star.tags,
      aliases: new Set([star.name, ...star.aliases]),
      meta: star.meta,
    });
  }
}

function sameFootballName(left, right) {
  return normalizeText(left) === normalizeText(right);
}

function slugTrait(value) {
  return normalizeText(value).replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || "item";
}

function findQuestionById(id) {
  return dataset.questions.find((entry) => entry.id === id) || dynamicQuestionFromId(id);
}

function dynamicQuestionFromId(id) {
  if (dynamicQuestionCache.has(id)) return dynamicQuestionCache.get(id);
  if (id.startsWith("name_has_")) {
    const letter = id.replace("name_has_", "");
    return {
      id,
      text: `他的英文名或姓氏里是否包含字母 ${letter.toUpperCase()}？`,
      chip: `名字含${letter.toUpperCase()}`,
      weight: 2.15,
      family: "dynamic",
    };
  }
  return null;
}

function knownFootballAge(meta = {}) {
  if (meta.age === null || meta.age === undefined || meta.age === "") return null;
  const age = Number(meta.age);
  return Number.isFinite(age) ? age : null;
}

function regionTraitForCountry(country) {
  return FOOTBALL_REGION_COUNTRY_LOOKUP.get(normalizeText(country || "")) || null;
}

function candidateMatchesNameSet(candidate, names) {
  return candidateTerms(candidate).some((term) => names.has(normalizeText(term)));
}

function footballQuestionHasSignal(candidates, q) {
  let yes = 0;
  for (const candidate of candidates) {
    if (expectedForQuestion(candidate, q) === 1) yes += 1;
  }
  return yes > 0 && yes < candidates.length;
}

function answerMeta(key) {
  return ANSWERS.find((answer) => answer.key === key) || ANSWERS[2];
}

function newGame() {
  dynamicQuestionCache = new Map();
  state = {
    answers: [],
    eliminated: new Set(),
    history: [],
    resultOpen: false,
    suppressedGuess: false,
    guessCooldownUntil: 0,
    lowSignalNoticeShown: false,
    emergencyMode: false,
    preliminaryPromptShown: false,
    preliminaryUnlocked: false,
    currentCandidateIds: new Set(dataset.candidates.map((candidate) => candidate.id)),
    currentStage: 1,
    lastQuestionReason: "",
  };
  currentQuestion = null;
  hideResult();
  hideLowSignalNotice();
  clearRevealResult();
  ensureGuessHistoryPanel();
  renderGuessHistory();
  render();
}

function pushHistory() {
  state.history.push({
    answers: state.answers.slice(),
    eliminated: [...state.eliminated],
    suppressedGuess: state.suppressedGuess,
    guessCooldownUntil: state.guessCooldownUntil,
    lowSignalNoticeShown: state.lowSignalNoticeShown,
    emergencyMode: state.emergencyMode,
    preliminaryPromptShown: state.preliminaryPromptShown,
    preliminaryUnlocked: state.preliminaryUnlocked,
    currentCandidateIds: [...state.currentCandidateIds],
    currentStage: state.currentStage,
    lastQuestionReason: state.lastQuestionReason,
  });
}

function restoreHistory() {
  const last = state.history.pop();
  if (!last) return;
  state.answers = last.answers;
  state.eliminated = new Set(last.eliminated);
  state.suppressedGuess = last.suppressedGuess;
  state.guessCooldownUntil = last.guessCooldownUntil;
  state.lowSignalNoticeShown = last.lowSignalNoticeShown;
  state.emergencyMode = Boolean(last.emergencyMode);
  state.preliminaryPromptShown = Boolean(last.preliminaryPromptShown || state.preliminaryPromptShown);
  state.preliminaryUnlocked = Boolean(last.preliminaryUnlocked);
  state.currentCandidateIds = new Set(last.currentCandidateIds);
  state.currentStage = last.currentStage;
  state.lastQuestionReason = last.lastQuestionReason;
  hideResult();
  hideLowSignalNotice();
  clearRevealResult();
  render();
}

function scoreCandidates() {
  const scores = dataset.candidates
    .filter(
      (candidate) =>
        !state.eliminated.has(candidate.id) &&
        (!state.currentCandidateIds || state.currentCandidateIds.has(candidate.id)),
    )
    .map((candidate) => {
      let penalty = 0;
      let total = 0;
      let matched = 0;
      let used = 0;
      for (const item of state.answers) {
        const q = findQuestionById(item.questionId);
        if (!q) continue;
        const value = answerMeta(item.answerKey).value;
        if (item.answerKey === "unknown") {
          penalty += q.weight * 0.035;
          continue;
        }
        const expected = expectedForQuestion(candidate, q);
        if (expected === null) {
          penalty += q.weight * 0.012;
          continue;
        }
        const weight = answerWeight(q, item.answerKey, candidate, expected);
        const closeness = answerCloseness(value, expected);
        total += weight;
        matched += closeness * weight;
        used += 1;
        penalty += weight * Math.pow(value - expected, 2) + hardMismatchPenalty(q, item.answerKey, candidate, expected);
      }
      const baseScore = Math.exp(-penalty * 2.35);
      return {
        candidate,
        score: baseScore * appearanceBoost(candidate),
        rawScore: baseScore,
        matchRate: total ? matched / total : 0,
        used,
      };
    })
    .sort((a, b) => b.score - a.score);

  const total = scores.reduce((sum, item) => sum + item.score, 0) || 1;
  return scores.map((item) => ({
    ...item,
    confidence: item.score / total,
  }));
}

function expectedForQuestion(candidate, q) {
  if (!q) return null;
  if (q.family === "age" && candidate.meta && knownFootballAge(candidate.meta) === null) {
    return null;
  }
  if ((q.family || questionFamilyFromId(q.id)) === "age") {
    return expectedAgeRange(candidate, q.id);
  }
  if (q.family === "club" && candidate.meta && !candidate.meta.club && !(candidate.meta.clubs || []).length) return null;
  if (q.family === "country" && candidate.meta && !candidate.meta.country) return null;
  if ((q.family || questionFamilyFromId(q.id)) === "country") {
    const candidateCountry = canonicalFootballCountry(candidate.meta && candidate.meta.country);
    const askedCountry = canonicalFootballCountry(
      q.id.replace(/^country_/, "").replace(/_/g, " "),
    );
    if (!candidateCountry) return null;
    return candidateCountry === askedCountry ? 1 : 0;
  }
  if ((q.family || questionFamilyFromId(q.id)) === "specific_position") {
    return expectedSpecificPosition(candidate, q.id);
  }
  if ((q.family || questionFamilyFromId(q.id)) === "position") {
    const knownBroadPosition = ["forward", "midfielder", "defender", "goalkeeper", "position_outfield", "attacking_half", "defensive_half"]
      .some((trait) => candidate.traits.has(trait));
    if (!knownBroadPosition) return null;
  }
  if (q.id.startsWith("foot_")) {
    if (!candidate.traits.has("foot_left") && !candidate.traits.has("foot_right")) return null;
  }
  if (q.id.startsWith("skin_")) {
    if (!candidate.traits.has("skin_light") && !candidate.traits.has("skin_dark")) return null;
  }
  if (q.id.startsWith("name_has_")) {
    const letter = q.id.replace("name_has_", "");
    return latinNameTerms(candidate).some((term) => normalizeText(term).includes(letter)) ? 1 : 0;
  }
  if (q.id.startsWith("teammate_")) {
    if (isRetiredFootballCandidate(candidate)) return null;
    return q.meta && candidate.meta && candidate.meta.club === q.meta.club ? 1 : 0;
  }
  if ((q.family || questionFamilyFromId(q.id)) === "club") {
    const askedClub = q.meta && q.meta.club ? q.meta.club : q.chip;
    if (q.meta && q.meta.currentClub) {
      if (!candidate.meta.club) return null;
      return normalizeText(candidate.meta.club) === normalizeText(askedClub) ? 1 : 0;
    }
    const clubs = [...(candidate.meta.clubs || []), candidate.meta.club].filter(Boolean);
    if (askedClub && clubs.some((club) => normalizeText(club) === normalizeText(askedClub))) return 1;
  }
  return candidate.traits.has(q.id) ? 1 : 0;
}

function expectedAgeRange(candidate, questionId) {
  const age = knownFootballAge(candidate.meta);
  if (age === null) return null;
  if (questionId === "age_under_21") return age < 21 ? 1 : 0;
  if (questionId === "age_21_24") return age >= 21 && age <= 24 ? 1 : 0;
  if (questionId === "age_under_25") return age < 25 ? 1 : 0;
  if (questionId === "age_25_29") return age >= 25 && age <= 29 ? 1 : 0;
  if (questionId === "age_30_plus") return age >= 30 ? 1 : 0;
  return candidate.traits.has(questionId) ? 1 : 0;
}

function canonicalFootballCountry(value) {
  const country = normalizeText(value || "");
  const aliases = {
    alb: "albania",
    bfa: "burkinafaso",
    bih: "bosniaandherzegovina",
    bul: "bulgaria",
    chi: "chile",
    com: "comoros",
    cpv: "capeverde",
    cta: "centralafricanrepublic",
    ecu: "ecuador",
    eqg: "equatorialguinea",
    est: "estonia",
    fin: "finland",
    gab: "gabon",
    gam: "gambia",
    geo: "georgia",
    glp: "guadeloupe",
    hai: "haiti",
    hkg: "hongkong",
    idn: "indonesia",
    isl: "iceland",
    isr: "israel",
    jam: "jamaica",
    ken: "kenya",
    kos: "kosovo",
    ltu: "lithuania",
    lux: "luxembourg",
    mkd: "northmacedonia",
    mne: "montenegro",
    mtn: "mauritania",
    nig: "niger",
    nzl: "newzealand",
    per: "peru",
    sle: "sierraleone",
    sur: "suriname",
    svn: "slovenia",
    tog: "togo",
    tun: "tunisia",
    ven: "venezuela",
    zam: "zambia",
    zim: "zimbabwe",
    czechia: "czechrepublic",
    ivorycoast: "cotedivoire",
    drcongo: "democraticrepublicofthecongo",
    democraticrepubliccongo: "democraticrepublicofthecongo",
    southkorea: "korearepublic",
    korearepublic: "korearepublic",
    usa: "unitedstates",
    us: "unitedstates",
    uk: "england",
    unitedkingdom: "england",
    greatbritain: "england",
    whales: "wales",
  };
  return aliases[country] || country;
}

function expectedSpecificPosition(candidate, id) {
  if (candidate.traits.has(id)) return 1;
  const known = [...candidate.traits].filter((trait) => trait.startsWith("pos_"));
  if (known.length) {
    return known.some((trait) => positionsAreAdjacent(id, trait)) ? null : 0;
  }
  if (id === "pos_winger") return candidate.traits.has("defender") || candidate.traits.has("goalkeeper") ? 0 : null;
  if (id === "pos_striker") return candidate.traits.has("defender") || candidate.traits.has("goalkeeper") ? 0 : null;
  if (id === "pos_attacking_mid") return candidate.traits.has("defender") || candidate.traits.has("goalkeeper") ? 0 : null;
  if (id === "pos_central_mid") return candidate.traits.has("goalkeeper") ? 0 : null;
  if (id === "pos_defensive_mid") return candidate.traits.has("forward") || candidate.traits.has("goalkeeper") ? 0 : null;
  if (id === "pos_center_back") return candidate.traits.has("forward") || candidate.traits.has("goalkeeper") ? 0 : null;
  if (id === "pos_fullback") return candidate.traits.has("goalkeeper") ? 0 : null;
  return null;
}

function positionsAreAdjacent(a, b) {
  const pairs = [
    ["pos_winger", "pos_attacking_mid"],
    ["pos_defensive_mid", "pos_center_back"],
    ["pos_striker", "pos_attacking_mid"],
    ["pos_winger", "pos_fullback"],
    ["pos_center_back", "pos_fullback"],
    ["pos_central_mid", "pos_defensive_mid"],
    ["pos_central_mid", "pos_attacking_mid"],
  ];
  return pairs.some(([left, right]) => (a === left && b === right) || (a === right && b === left));
}

function answerWeight(q, answerKey, candidate, expected) {
  let weight = q.weight || 1;
  const family = q.family || questionFamilyFromId(q.id);
  if (dataset !== DATASETS.football) return weight;
  if (family === "country") weight *= isPositiveAnswer(answerKey) ? 5.8 : 2.2;
  if (family === "club") weight *= isPositiveAnswer(answerKey) ? 4.4 : 1.7;
  if (family === "scope") weight *= isPositiveAnswer(answerKey) ? 3.4 : 1.5;
  if (family === "age") weight *= isPositiveAnswer(answerKey) ? 3.1 : 1.4;
  if (family === "specific_position") weight *= isPositiveAnswer(answerKey) ? 4.6 : 2.1;
  if (q.id.startsWith("foot_")) weight *= isPositiveAnswer(answerKey) ? 3.8 : 1.7;
  if (family === "position") weight *= isPositiveAnswer(answerKey) ? 3.2 : 1.6;
  if (family === "dynamic") weight *= isPositiveAnswer(answerKey) ? 4.8 : 3.2;
  if (expected === 0 && isPositiveAnswer(answerKey)) weight *= 1.35;
  return weight;
}

function hardMismatchPenalty(q, answerKey, candidate, expected) {
  if (dataset !== DATASETS.football || !isPositiveAnswer(answerKey) || expected !== 0) return 0;
  const family = q.family || questionFamilyFromId(q.id);
  if (family === "country") {
    const askedRegion = regionFromCountryQuestion(q);
    const candidateRegion = regionTraitForCountry(candidate.meta && candidate.meta.country);
    return askedRegion && candidateRegion && askedRegion === candidateRegion ? 3.8 : 8.5;
  }
  if (family === "club") return 6.5;
  if (family === "scope") return 5.5;
  if (family === "age") return 4.2;
  if (family === "specific_position") return distantPositionPenalty(q, candidate);
  if (q.id.startsWith("foot_")) return 4.8;
  if (family === "dynamic") return 6.2;
  return 0;
}

function regionFromCountryQuestion(q) {
  const country = q.id.replace(/^country_/, "").replace(/_/g, " ");
  return regionTraitForCountry(country) || FOOTBALL_REGION_COUNTRY_LOOKUP.get(normalizeText(q.chip || ""));
}

function distantPositionPenalty(q, candidate) {
  if (q.id === "pos_winger" && candidate.traits.has("defender")) return 7.5;
  if (q.id === "pos_fullback" && candidate.traits.has("forward")) return 7.5;
  if (q.id === "pos_center_back" && candidate.traits.has("forward")) return 7.2;
  if (q.id === "pos_striker" && candidate.traits.has("defender")) return 7.2;
  if ((q.id === "pos_attacking_mid" || q.id === "pos_central_mid" || q.id === "pos_defensive_mid") && candidate.traits.has("goalkeeper")) return 8;
  return 5.2;
}

function answerCloseness(value, expected) {
  return Math.max(0, 1 - Math.abs(value - expected));
}

function appearanceBoost(candidate) {
  if (dataset !== DATASETS.football) return 1;
  const share = Number(candidate.meta && candidate.meta.appearanceShare);
  const normalized = Number.isFinite(share) ? Math.max(0.35, Math.min(1, share)) : 0.58;
  return 0.9 + normalized * 0.18;
}

function chooseQuestion(scores) {
  const answered = new Set(state.answers.map((item) => item.questionId));
  const availableQuestions = [
    ...dataset.questions,
    ...dynamicQuestions(scores),
    ...(dataset === DATASETS.football ? emergencyFootballQuestions(scores) : []),
  ];
  const unanswered = availableQuestions.filter((q) => !answered.has(q.id));
  if (!unanswered.length) {
    if (dataset === DATASETS.football) state.emergencyMode = true;
    return null;
  }

  if (dataset !== DATASETS.football) {
    const starter = unanswered.find((q) => q.starter);
    if (state.answers.length === 0 && starter) return starter;
  }

  const questionPool = unanswered.filter((q) => isQuestionAllowedByRhythm(q, scores));
  if (!questionPool.length && dataset !== DATASETS.football) return null;

  if (dataset === DATASETS.football) {
    const selected = chooseFootballQuestion(scores, questionPool.length ? questionPool : unanswered);
    if (selected) return selected;
    state.emergencyMode = true;
    return chooseEmergencyFootballQuestion(scores, unanswered, footballQuestionCandidates(scores));
  }

  const pool = scores.slice(0, Math.min(10, scores.length));
  const poolTotal = pool.reduce((sum, item) => sum + item.score, 0) || 1;
  let best = null;

  for (const q of questionPool) {
    let yesWeight = 0;
    let knownWeight = 0;
    for (const item of pool) {
      const expected = expectedForQuestion(item.candidate, q);
      if (expected === null) continue;
      knownWeight += item.score;
      if (expected === 1) yesWeight += item.score;
    }
    const minCoverage =
      q.family === "specific_position" || q.id.startsWith("foot_")
        ? 0.44
        : q.family === "age"
          ? 0.34
          : 0.16;
    if (knownWeight <= poolTotal * minCoverage) continue;
    const noWeight = knownWeight - yesWeight;
    if (yesWeight <= 0.0001 || noWeight <= 0.0001) continue;
    const balance = 1 - Math.abs(yesWeight - noWeight) / knownWeight;
    const coverage = Math.min(1, knownWeight / poolTotal);
    const freshness = 1 + Math.min(state.answers.length, 8) * 0.025;
    const value = balance * q.weight * freshness * coverage * questionFamilyMultiplier(q) * phaseMultiplier(q);
    if (!best || value > best.value) best = { question: q, value };
  }

  return best ? best.question : questionPool[0];
}

function chooseFootballQuestion(scores, questionPool) {
  const candidates = footballQuestionCandidates(scores);
  if (!candidates.length) return null;

  if (state.emergencyMode) {
    return chooseEmergencyFootballQuestion(scores, questionPool, candidates);
  }

  let currentStage = Math.max(1, Math.min(6, state.currentStage || 1));
  let evaluations = [];
  while (currentStage <= 6) {
    const allowedStages = new Set([currentStage]);
    if (candidates.length <= 40) {
      for (let stage = 4; stage <= 6; stage += 1) allowedStages.add(stage);
    }
    evaluations = questionPool
      .map((q) => scoreFootballQuestion(q, candidates, currentStage))
      .filter((item) => allowedStages.has(item.stage) && item.score > 0)
      .sort((a, b) => b.score - a.score);
    const best = evaluations[0];
    if (best && best.score >= 0.18) break;
    currentStage += 1;
  }

  let selected = evaluations[0];
  let fallbackReason = "";
  if (!selected) {
    evaluations = questionPool
      .map((q) => scoreFootballQuestion(q, candidates, currentStage))
      .filter((item) => item.score > 0 && item.yesCount > 0 && item.noCount > 0)
      .sort((a, b) => b.score - a.score);
    selected = evaluations[0];
    if (selected) {
      fallbackReason = "当前阶段已没有有效分割问题，因此回看尚未使用的前序线索来打破并列。";
    }
  }

  state.currentStage = Math.min(currentStage, 6);
  const slightlyEarlierEmergency =
    state.answers.length >= 24 &&
    selected &&
    selected.score < 0.2;
  if (!selected || slightlyEarlierEmergency) {
    state.emergencyMode = true;
    return chooseEmergencyFootballQuestion(scores, questionPool, candidates);
  }
  state.lastQuestionReason =
    `${fallbackReason || `当前处于第 ${selected.stage} 阶段（${FOOTBALL_STAGE_LABELS[selected.stage]}）。`}` +
    `这个问题在 ${candidates.length} 名候选中可判断 ${selected.knownCount} 人，` +
    `“是” ${selected.yesCount} 人、“否” ${selected.noCount} 人，区分度最高。`;

  if (debugQuestionScoring || window.debugQuestionScoring) {
    console.group(`问题评分 · stage ${state.currentStage} · ${candidates.length} candidates`);
    console.table(
      evaluations.map((item) => ({
        selected: item.question.id === selected.question.id ? "✓" : "",
        stage: item.stage,
        question: item.question.text,
        yesCount: item.yesCount,
        noCount: item.noCount,
        unknownCount: item.unknownCount,
        score: Number(item.score.toFixed(4)),
      })),
    );
    console.info("被选中的原因", state.lastQuestionReason);
    console.groupEnd();
  }
  return selected.question;
}

function footballQuestionCandidates(scores) {
  if (!scores.length) return [];
  const topRate = scores[0].matchRate || 0;
  if (topRate <= 0) return scores.map((item) => item.candidate);

  const ninetyPlus = scores.filter((item) => (item.matchRate || 0) >= 0.9);
  if (ninetyPlus.length >= 2) return ninetyPlus.map((item) => item.candidate);
  const close = scores.filter((item) => (item.matchRate || 0) >= Math.max(0.45, topRate - 0.045));
  if (close.length >= 2 && close.length <= 40) return close.map((item) => item.candidate);
  return scores.slice(0, Math.min(40, scores.length)).map((item) => item.candidate);
}

function chooseEmergencyFootballQuestion(scores, questionPool, candidates) {
  const answered = new Set(state.answers.map((item) => item.questionId));
  const expandedPool = [
    ...questionPool,
    ...emergencyFootballQuestions(scores),
  ].filter((q, index, all) =>
    !answered.has(q.id) && all.findIndex((item) => item.id === q.id) === index,
  );
  const allowed = expandedPool.filter((q) => {
    const family = q.family || questionFamilyFromId(q.id);
    return family === "club" || q.id.startsWith("name_has_") || q.id.startsWith("teammate_");
  });
  const last = state.answers[state.answers.length - 1];
  const lastQuestion = last && findQuestionById(last.questionId);
  const lastKind = emergencyQuestionKind(lastQuestion);
  const pool = allowed.filter((q) => emergencyQuestionKind(q) !== lastKind);
  const evaluations = pool
    .map((q) => scoreFootballQuestion(q, candidates, 6))
    .filter((item) => item.yesCount > 0 && item.noCount > 0 && item.unknownCount === 0)
    .sort((a, b) => b.score - a.score);
  const fallbackEvaluations = pool
    .map((q) => scoreFootballQuestion(q, candidates, 6))
    .filter((item) => item.knownCount === candidates.length && item.yesCount > 0)
    .sort((a, b) => b.score - a.score);
  const selected = evaluations[0] || fallbackEvaluations[0];
  if (!selected) return null;
  state.currentStage = 6;
  state.lastQuestionReason =
    `已进入压箱底区分步骤：只使用球队、名字字母和队友问题，并对明确的“是/否”回答执行绝对排除。` +
    `本题可将 ${candidates.length} 名候选分成 ${selected.yesCount}/${selected.noCount}。`;
  return selected.question;
}

function emergencyFootballQuestions(scores) {
  if (dataset !== DATASETS.football || !scores.length) return [];
  const candidates = footballQuestionCandidates(scores).slice(0, 40);
  if (candidates.length < 2) return [];
  const questions = [
    ...emergencyClubQuestions(candidates),
    ...dynamicLetterQuestions(candidates),
    ...dynamicTeammateQuestions(candidates, 5),
    ...dynamicLegendClubQuestions(candidates),
  ];
  questions.forEach((question) => dynamicQuestionCache.set(question.id, question));
  return questions;
}

function emergencyClubQuestions(candidates) {
  const clubs = new Map();
  for (const candidate of candidates) {
    for (const club of [...(candidate.meta.clubs || []), candidate.meta.club].filter(Boolean)) {
      const clean = sanitizeClubName(club);
      if (!clean) continue;
      clubs.set(clean, (clubs.get(clean) || 0) + 1);
    }
  }
  return [...clubs.entries()]
    .filter(([, count]) => count > 0 && count < candidates.length)
    .map(([club]) => ({
      id: `club_${slugTrait(club)}`,
      text: `TA 现在或曾经效力 ${club} 吗？`,
      chip: club,
      weight: 2.8,
      family: "club",
      meta: { club },
    }));
}

function emergencyQuestionKind(q) {
  if (!q) return "";
  if (q.id.startsWith("name_has_")) return "letter";
  if (q.id.startsWith("teammate_")) return "teammate";
  return (q.family || questionFamilyFromId(q.id)) === "club" ? "club" : "";
}

function scoreFootballQuestion(q, candidates, currentStage) {
  let yesCount = 0;
  let noCount = 0;
  let unknownCount = 0;
  for (const candidate of candidates) {
    const expected = expectedForQuestion(candidate, q);
    if (expected === 1) yesCount += 1;
    else if (expected === 0) noCount += 1;
    else unknownCount += 1;
  }
  const knownCount = yesCount + noCount;
  const stage = questionStage(q);
  if (!knownCount) {
    return { question: q, stage, yesCount, noCount, unknownCount, knownCount, score: 0 };
  }
  const balanceScore = 1 - Math.abs(yesCount - noCount) / knownCount;
  const coverageScore = knownCount / candidates.length;
  const stageBonus = stage === currentStage ? 0.15 : 0;
  let score = balanceScore * 0.65 + coverageScore * 0.25 + stageBonus;
  if (!yesCount || !noCount) score *= 0.2;
  if (unknownCount / candidates.length > 0.35) score *= 0.5;
  score *= recentFamilyAnswerMultiplier(q);
  return { question: q, stage, yesCount, noCount, unknownCount, knownCount, score };
}

function recentFamilyAnswerMultiplier(q) {
  const family = q.family || questionFamilyFromId(q.id);
  const recent = [...state.answers].reverse().find((item) => {
    const answered = findQuestionById(item.questionId);
    return answered && (answered.family || questionFamilyFromId(answered.id)) === family;
  });
  if (!recent) return 1;
  if (recent.skipped) return 0.48;
  if (recent.answerKey === "unknown") return 0.68;
  return 1;
}

function targetedQuestionAfterFifteen(scores, questionPool) {
  if (dataset !== DATASETS.football || state.answers.length < 15) return null;
  const leaders = scores
    .filter((item) => (item.matchRate || 0) >= Math.max(0.52, (scores[0]?.matchRate || 0) - 0.12))
    .slice(0, 7);
  if (leaders.length < 2) return null;
  let best = null;
  for (const q of questionPool) {
    let yes = 0;
    let no = 0;
    for (const item of leaders) {
      const expected = expectedForQuestion(item.candidate, q);
      if (expected === 1) yes += 1;
      if (expected === 0) no += 1;
    }
    if (!yes || !no) continue;
    const split = Math.min(yes, no) / leaders.length;
    const value =
      split *
      q.weight *
      questionFamilyMultiplier(q) *
      (q.family === "detail" ? 1.35 : 1) *
      (q.family === "club" ? 1.25 : 1);
    if (!best || value > best.value) best = { question: q, value };
  }
  return best && best.value > 0.18 ? best.question : null;
}

function dynamicQuestions(scores) {
  if (dataset !== DATASETS.football || !scores.length) return [];
  if (scores.length > 60 && (state.currentStage || 1) < 4) return [];
  const leaders = footballQuestionCandidates(scores).slice(0, 20);
  if (leaders.length < 2) return [];
  const questions = [];
  for (const q of dynamicTeammateQuestions(leaders)) questions.push(q);
  for (const q of dynamicLegendClubQuestions(leaders)) questions.push(q);
  for (const q of dynamicLetterQuestions(leaders)) questions.push(q);
  questions.forEach((question) => dynamicQuestionCache.set(question.id, question));
  return questions;
}

function dynamicLetterQuestions(candidates) {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  return letters
    .map((letter) => {
      const count = candidates.filter((candidate) =>
        latinNameTerms(candidate).some((term) => normalizeText(term).includes(letter)),
      ).length;
      const split = Math.min(count, candidates.length - count);
      return { letter, split };
    })
    .filter((item) => item.split >= Math.max(1, Math.ceil(candidates.length * 0.15)))
    .sort((a, b) => b.split - a.split)
    .slice(0, 26)
    .map((item) => ({
      id: `name_has_${item.letter}`,
      text: `他的英文名或姓氏里是否包含字母 ${item.letter.toUpperCase()}？`,
      chip: `名字含${item.letter.toUpperCase()}`,
      weight: 2.15,
      family: "dynamic",
    }));
}

function latinNameTerms(candidate) {
  const name = sanitizeFootballName(candidate.name);
  return /[a-z]/i.test(name) && !/[\u4e00-\u9fff]/.test(name) ? [name] : [];
}

function dynamicTeammateQuestions(candidates, perClubLimit = 1) {
  const byClub = new Map();
  candidates.forEach((candidate) => {
    const club = candidate.meta && candidate.meta.club;
    if (!club) return;
    if (!byClub.has(club)) byClub.set(club, []);
    byClub.get(club).push(candidate);
  });
  const questions = [];
  for (const [club, group] of byClub.entries()) {
    if (!group.length || group.length === candidates.length) continue;
    const splitScore = 1 - Math.abs(group.length - (candidates.length - group.length)) / candidates.length;
    for (const teammate of notableTeammatesForClub(club, group, perClubLimit)) {
      questions.push({
        id: `teammate_${slugTrait(club)}_${slugTrait(teammate.name)}`,
        text: `他现在和 ${displayName(teammate)} 是俱乐部队友吗？`,
        chip: `${displayName(teammate)}队友`,
        weight: 2.65 + splitScore * 0.35,
        family: "dynamic",
        meta: { club, splitScore, teammateFamiliarity: teammateFamiliarity(teammate) },
      });
    }
  }
  return questions
    .sort(
      (a, b) =>
        b.meta.splitScore - a.meta.splitScore ||
        b.meta.teammateFamiliarity - a.meta.teammateFamiliarity,
    )
    .slice(0, 12);
}

function notableTeammatesForClub(club, group, limit = 1) {
  const pool = dataset.candidates.filter(
    (candidate) =>
      candidate.meta &&
      candidate.meta.club === club &&
      !isRetiredFootballCandidate(candidate) &&
      !String(candidate.id || "").startsWith("legend_"),
  );
  if (pool.length < 2) return [];
  const recognizedScope = pool.some((candidate) =>
    ["bigfive", "chinesesuperleague", "saudiproleague"].includes(normalizeText(candidate.meta && candidate.meta.scope)),
  );
  if (!recognizedScope && !isRecognizableHistoryClub(club)) return [];
  const outsideGroup = pool.filter((candidate) => !group.some((item) => item.id === candidate.id));
  return outsideGroup
    .sort((a, b) => teammateFamiliarity(b) - teammateFamiliarity(a))
    .slice(0, limit);
}

function dynamicLegendClubQuestions(candidates) {
  const retiredLegends = dataset.candidates.filter(
    (candidate) =>
      candidate.meta &&
      isRetiredFootballCandidate(candidate) &&
      (candidate.meta.clubs || []).some(isRecognizableHistoryClub),
  );
  const questions = [];
  for (const legend of retiredLegends) {
    const clubs = (legend.meta.clubs || []).filter(isRecognizableHistoryClub);
    const matchingClub = clubs.find((club) =>
      candidates.some((candidate) =>
        [...(candidate.meta.clubs || []), candidate.meta.club]
          .filter(Boolean)
          .some((candidateClub) => normalizeText(candidateClub) === normalizeText(club)),
      ),
    );
    if (!matchingClub) continue;
    const yesCount = candidates.filter((candidate) =>
      [...(candidate.meta.clubs || []), candidate.meta.club]
        .filter(Boolean)
        .some((club) => normalizeText(club) === normalizeText(matchingClub)),
    ).length;
    if (!yesCount || yesCount === candidates.length) continue;
    questions.push({
      id: `legend_club_${slugTrait(legend.name)}_${slugTrait(matchingClub)}`,
      text: `TA 是否效力过 ${displayName(legend)} 效力过的一家知名球队（${matchingClub}）？`,
      chip: `${displayName(legend)}效力过的${matchingClub}`,
      weight: 2.75,
      family: "club",
      meta: { club: matchingClub, legendId: legend.id },
    });
  }
  return questions.slice(0, 12);
}

function isRetiredFootballCandidate(candidate) {
  if (!candidate) return false;
  return (
    candidate.meta && candidate.meta.retired === true ||
    candidate.traits && candidate.traits.has("retired") ||
    CONFIRMED_RETIRED_LEGENDS.has(normalizeText(candidate.name))
  );
}

function teammateFamiliarity(candidate) {
  const starBonus =
    /Saka|Rice|Haaland|Salah|Mbapp|Vinícius|Yamal|Palmer|Wirtz|Isak|Guimarães|Kvaratskhelia|Osimhen|Schick|Tonali|Delap/i.test(
      candidate.name,
    )
      ? 2
      : 0;
  const translated = [...(candidate.aliases || [])].some((alias) => /[\u4e00-\u9fff]/.test(alias)) ? 0.35 : 0;
  return starBonus + translated + Number(candidate.meta && candidate.meta.appearanceShare || 0);
}

function phaseMultiplier(q) {
  if (dataset !== DATASETS.football) return 1;
  const family = q.family || questionFamilyFromId(q.id);
  const n = state.answers.length;
  const lateDetail = family === "age" || q.id.startsWith("foot_") || q.id.startsWith("skin_");
  const hardHistory = family === "club";
  if (n < 8) return ["country", "scope", "position", "region"].includes(family) ? 1.35 : lateDetail ? 0.03 : hardHistory ? 0.05 : 0.45;
  if (n < 15) return q.id.startsWith("teammate_") || ["specific_position", "status"].includes(family) ? 1.24 : lateDetail ? 0.08 : hardHistory ? 0.45 : family === "position" ? 1.1 : 0.85;
  if (n < 22) return lateDetail ? 1.25 : ["dynamic", "club", "specific_position", "status"].includes(family) ? 1.18 : 0.96;
  return 1;
}

function isQuestionAllowedByRhythm(q, scores = latestScores) {
  if (isQuestionLockedByPositive(q)) return false;
  if (!isUsefulClubQuestion(q, scores)) return false;
  if (q.id.startsWith("name_has_") && questionsSincePrefix("name_has_") < 4) return false;
  if (q.id.startsWith("teammate_") && questionsSincePrefix("teammate_") < 3) return false;
  const family = q.family || questionFamilyFromId(q.id);
  const cooldown = questionFamilyCooldown(family);
  return !cooldown || questionsSinceFamily(family) >= cooldown;
}

function questionsSincePrefix(prefix) {
  for (let index = state.answers.length - 1; index >= 0; index -= 1) {
    if (state.answers[index].questionId.startsWith(prefix)) return state.answers.length - 1 - index;
  }
  return Infinity;
}

function isUsefulClubQuestion(q, scores) {
  if ((q.family || questionFamilyFromId(q.id)) !== "club") return true;
  const retiredAnswer = state.answers.find((item) => item.questionId === "retired");
  const retiredLikely = retiredAnswer && isPositiveAnswer(retiredAnswer.answerKey);
  if (!retiredLikely && scores.length > 8) return false;
  if ((state.currentStage || 1) < 5 && !retiredLikely && scores.length > 5) return false;
  const leaders = scores.slice(0, Math.min(20, scores.length));
  if (leaders.length < 2) return false;
  const yes = leaders.filter((item) => expectedForQuestion(item.candidate, q) === 1);
  if (!yes.length || yes.length === leaders.length) return false;
  const clubName = q.chip || "";
  const broadOrLeaderClub = yes.length >= 2 || leaders[0].candidate.traits.has(q.id);
  return broadOrLeaderClub && isRecognizableHistoryClub(clubName);
}

function questionFamilyCooldown(family) {
  if (family === "club") return 4;
  if (family === "country") return 3;
  if (dataset !== DATASETS.football) return 0;
  if (family === "age") return 2;
  if (family === "position") return 1;
  if (family === "region") return 1;
  if (family === "career") return 1;
  if (family === "detail") return 1;
  if (family === "scope") return 1;
  if (family === "status") return 1;
  return 0;
}

function isQuestionLockedByPositive(q) {
  const family = q.family || questionFamilyFromId(q.id);
  const isRepeatDetail =
    q.id.startsWith("teammate_") ||
    q.id.startsWith("foot_") ||
    q.id.startsWith("skin_");
  const lockedFamilies = new Set(["club", "country", "age", "scope", "specific_position"]);
  if (!isRepeatDetail && !lockedFamilies.has(family) && family !== "region") return false;
  return state.answers.some((item) => {
    const answeredQuestion = findQuestionById(item.questionId);
    const answeredFamily = answeredQuestion ? answeredQuestion.family || questionFamilyFromId(answeredQuestion.id) : null;
    if (!isPositiveAnswer(item.answerKey)) return false;
    if (q.id.startsWith("teammate_") && item.questionId.startsWith("teammate_")) return true;
    if (q.id.startsWith("foot_") && answeredQuestion && answeredQuestion.id.startsWith("foot_")) return true;
    if (q.id.startsWith("skin_") && answeredQuestion && answeredQuestion.id.startsWith("skin_")) return true;
    if (answeredFamily === family) return true;
    if (family === "scope" && answeredFamily === "club") return true;
    if (family === "region" && answeredFamily === "country") return true;
    return false;
  });
}

function questionsSinceFamily(family) {
  for (let index = state.answers.length - 1; index >= 0; index -= 1) {
    const q = findQuestionById(state.answers[index].questionId);
    const answeredFamily = q ? q.family || questionFamilyFromId(q.id) : null;
    if (answeredFamily === family) return state.answers.length - 1 - index;
  }
  return Infinity;
}

function isPositiveAnswer(answerKey) {
  return answerKey === "yes" || answerKey === "probably";
}

function questionFamilyMultiplier(q) {
  const family = q.family || questionFamilyFromId(q.id);
  if (dataset !== DATASETS.football) return 1;
  if (family === "club") return 0.36;
  if (family === "country") return 0.56;
  if (family === "age") return 1.2;
  if (family === "region") return 1.12;
  if (family === "scope") return 1.08;
  if (family === "career") return 1.08;
  if (family === "position") return 1.02;
  if (family === "detail") return 1.18;
  if (family === "status") return 1.12;
  return 1;
}

function shouldGuess(scores) {
  if (state.suppressedGuess) return false;
  const settings = dataset.guess;
  if (dataset === DATASETS.football && state.answers.length > 0 && scores.length === 1) return true;
  if (!scores.length || state.answers.length < settings.minQuestions) return false;
  if (state.answers.length < state.guessCooldownUntil) return false;
  const top = scores[0];
  const second = scores[1];
  const ratio = second ? top.score / Math.max(second.score, 0.0001) : 99;
  const noQuestion = chooseQuestion(scores) === null;
  const effective = effectiveAnswerCount();
  const matchRate = top.matchRate || 0;
  const clearLead = hasClearGuessLead(scores);
  const ninetyPlus = scores.filter((item) => (item.matchRate || 0) >= 0.9);
  if (dataset === DATASETS.football && ninetyPlus.length > 1) return false;
  if (isSuppressedEdgeCandidate(top) && state.answers.length < 34) return false;
  if (settings.minEffectiveAnswers && effective < settings.minEffectiveAnswers) return false;
  if (
    settings.lowSignalAfter &&
    state.answers.length >= settings.lowSignalAfter &&
    matchRate < settings.lowSignalConfidence
  ) {
    return false;
  }
  const confident = matchRate >= settings.confidence && clearLead;
  if (settings.hardGate) return state.answers.length >= settings.minQuestions && matchRate > 0.85;
  const separated =
    state.answers.length >= settings.ratioQuestions &&
    matchRate >= settings.minRatioConfidence &&
    ratio >= settings.ratio &&
    clearLead;
  const softLate =
    settings.softGuessAfter &&
    state.answers.length >= settings.softGuessAfter &&
    matchRate >= settings.softGuessConfidence &&
    clearLead;
  const fallbackLate =
    settings.fallbackGuessAfter &&
    state.answers.length >= settings.fallbackGuessAfter &&
    matchRate >= settings.fallbackGuessConfidence &&
    clearLead;
  return confident || separated || softLate || fallbackLate || state.answers.length >= dataset.maxQuestions || (noQuestion && clearLead);
}

function hasClearGuessLead(scores) {
  if (dataset !== DATASETS.football) return true;
  const top = scores[0];
  const second = scores[1];
  const third = scores[2];
  if (!top) return false;
  if (!second) return true;
  const topRate = top.matchRate || 0;
  const secondRate = second.matchRate || 0;
  const thirdRate = third ? third.matchRate || 0 : 0;
  const leadNeed = isSuppressedEdgeCandidate(top) ? 0.14 : 0.08;
  if (topRate - secondRate >= leadNeed) return true;
  if (topRate >= 0.68 && secondRate >= 0.64 && secondRate - thirdRate >= 0.1) return true;
  if (state.answers.length >= dataset.maxQuestions - 2 && topRate - secondRate >= 0.04) return true;
  return false;
}

function isSuppressedEdgeCandidate(item) {
  if (dataset !== DATASETS.football || !item || !item.candidate) return false;
  const candidate = item.candidate;
  if (candidate.id && candidate.id.startsWith("star_")) return false;
  const share = Number(candidate.meta && candidate.meta.appearanceShare);
  const club = String((candidate.meta && candidate.meta.club) || "");
  const captainOrMain = /\(C\)|\(O\)/.test(club) || share >= 0.72;
  const bigClub = /Real Madrid|Barcelona|Manchester City|Manchester United|Liverpool|Arsenal|Chelsea|Bayern|Dortmund|Juventus|Inter Milan|AC Milan|PSG|Paris Saint-Germain|Al-Hilal|Al-Nassr/i.test(club);
  return !captainOrMain && !bigClub;
}

function effectiveAnswerCount() {
  return state.answers.filter((item) => item.answerKey !== "unknown").length;
}

function shouldShowLowSignalNotice(scores) {
  const settings = dataset.guess;
  if (!settings.lowSignalAfter || state.lowSignalNoticeShown) return false;
  if (state.answers.length < settings.lowSignalAfter) return false;
  const top = scores[0];
  if (!top) return false;
  const closeHighCandidates = scores.filter(
    (item) => (item.matchRate || 0) >= Math.max(0.72, (top.matchRate || 0) - 0.035),
  ).length;
  return (
    effectiveAnswerCount() < Math.max(settings.minEffectiveAnswers || 0, 24) ||
    top.matchRate < settings.lowSignalConfidence ||
    closeHighCandidates >= 2
  );
}

function render() {
  dataset = DATASETS[els.body.dataset.mode] || DATASETS.general;
  latestScores = scoreCandidates();
  currentQuestion = chooseQuestion(latestScores);
  const normalGuessReady = shouldGuess(latestScores);

  els.sceneArt.src = dataset.art;
  els.modeLabel.textContent = dataset.modeLabel;
  els.revealInput.placeholder = dataset.answerPlaceholder;
  document.querySelectorAll(".mode-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.tab === els.body.dataset.mode);
  });

  renderAnswers();
  renderStatus();
  renderSignals();
  renderClues();

  if (shouldShowLowSignalNotice(latestScores)) {
    state.lowSignalNoticeShown = true;
    showLowSignalNotice(latestScores[0] ? latestScores[0].matchRate : 0);
  }

  if (normalGuessReady) {
    els.preliminaryGuessBtn.classList.remove("is-visible");
    els.questionText.textContent = "我已经锁定一个答案。";
    els.roundLabel.textContent = `第 ${state.answers.length} 问`;
    setTimeout(() => showResult(latestScores), 180);
    return;
  }

  updatePreliminaryGuessOffer(latestScores, normalGuessReady);

  if (currentQuestion) {
    els.questionText.textContent = currentQuestion.text;
    els.roundLabel.textContent = `第 ${state.answers.length + 1} 问`;
  } else {
    state.emergencyMode = dataset === DATASETS.football;
    if (dataset === DATASETS.football && latestScores.length) {
      els.questionText.textContent = "压箱底区分问题已经问完，我来猜当前最相关的球员。";
      els.roundLabel.textContent = `第 ${state.answers.length} 问`;
      setTimeout(() => showResult(latestScores), 180);
      return;
    }
    els.questionText.textContent = "线索还不够明确，请公布答案计算匹配率。";
  }
}

function updatePreliminaryGuessOffer(scores, normalGuessReady) {
  if (dataset !== DATASETS.football || normalGuessReady || !scores.length) {
    els.preliminaryGuessBtn.classList.remove("is-visible");
    return;
  }
  const highCandidates = scores.filter((item) => (item.matchRate || 0) >= 0.9);
  const lead =
    scores.length > 1
      ? (scores[0].matchRate || 0) - (scores[1].matchRate || 0)
      : 0;
  const newlyEligible = highCandidates.length >= 2 && lead >= 0.04;
  if (newlyEligible) state.preliminaryUnlocked = true;
  els.preliminaryGuessBtn.classList.toggle("is-visible", state.preliminaryUnlocked);
  if (newlyEligible && !state.preliminaryPromptShown && !state.resultOpen) {
    state.preliminaryPromptShown = true;
    window.setTimeout(showPreliminaryGuessChoice, 120);
  }
}

function showPreliminaryGuessChoice() {
  if (!state || state.resultOpen || !latestScores.length) return;
  document.querySelector("#preliminaryGuessNotice")?.remove();
  const layer = document.createElement("div");
  layer.className = "notice-layer";
  layer.id = "preliminaryGuessNotice";
  layer.innerHTML = `
    <section class="notice-sheet" role="dialog" aria-modal="true" aria-labelledby="preliminaryGuessTitle">
      <p class="notice-kicker">初步思路</p>
      <h2 id="preliminaryGuessTitle">我已经有了一个初步答案</h2>
      <p>目前有多名高相关度候选，但其中一名已经稍微领先。你可以让我继续推进问题，也可以现在尝试猜测。</p>
      <div class="notice-actions is-stacked">
        <button class="secondary-action" id="preliminaryContinue" type="button">返回不猜测并推进问题</button>
        <button class="primary-action" id="preliminaryTry" type="button">尝试猜测</button>
      </div>
    </section>
  `;
  document.body.append(layer);
  layer.querySelector("#preliminaryContinue").addEventListener("click", () => layer.remove());
  layer.querySelector("#preliminaryTry").addEventListener("click", () => {
    layer.remove();
    showResult(latestScores);
  });
  layer.querySelector("#preliminaryContinue").focus({ preventScroll: true });
}

function renderAnswers() {
  if (!els.answerGrid.children.length) {
    els.answerGrid.innerHTML = ANSWERS.map(
      (answer) => `
        <button class="answer-button" type="button" data-answer="${answer.key}">
          <span class="answer-icon" aria-hidden="true">${answer.icon}</span>
          <span class="answer-label">${answer.label}</span>
        </button>
      `,
    ).join("");
  }

  els.answerGrid.querySelectorAll("[data-answer]").forEach((button) => {
    button.disabled = !currentQuestion && state.answers.length > 0;
  });
}

function renderStatus() {
  const confidence = latestScores[0] ? Math.round(displayedConfidence(latestScores[0]) * 100) : 0;
  const cooldown = Math.max(0, state.guessCooldownUntil - state.answers.length);
  const questionGap = Math.max(0, dataset.guess.minQuestions - state.answers.length);
  const effectiveGap = Math.max(0, (dataset.guess.minEffectiveAnswers || 0) - effectiveAnswerCount());
  els.confidenceLabel.textContent = `${confidence}%`;
  els.confidenceFill.style.width = `${Math.max(4, confidence)}%`;
  if (dataset.guess.hardGate) {
    const confidenceGap = Math.max(0, 86 - confidence);
    els.poolLabel.textContent = questionGap || confidenceGap
      ? `猜测门槛：还差 ${questionGap} 题 · ${confidenceGap}% 相关度 · ${latestScores.length} 个可能对象`
      : `${latestScores.length} 个可能对象 · 已达猜测门槛`;
  } else {
    if (cooldown) {
      els.poolLabel.textContent = `猜错冷却：至少再问 ${cooldown} 题 · ${latestScores.length} 个可能对象`;
    } else if (questionGap) {
      els.poolLabel.textContent = `再收集 ${questionGap} 题后考虑猜测 · ${latestScores.length} 个可能对象`;
    } else if (effectiveGap) {
      els.poolLabel.textContent = `还需要 ${effectiveGap} 个有效回答 · ${latestScores.length} 个可能对象`;
    } else {
      els.poolLabel.textContent = `${latestScores.length} 个可能对象`;
    }
  }
  els.undoBtn.disabled = state.history.length === 0;
  els.undoTopBtn.disabled = state.history.length === 0;
  els.skipBtn.disabled = !currentQuestion;
}

function renderSignals() {
  const top = latestScores.slice(0, 3);
  const cooldown = Math.max(0, state.guessCooldownUntil - state.answers.length);
  const topRate = top[0] ? displayedConfidence(top[0]) : 0;
  els.signalLabel.textContent = cooldown
    ? "继续收集"
    : topRate > 0.66
      ? "接近锁定"
      : topRate > 0.5
        ? "有方向"
      : "流动中";
  els.signalList.innerHTML = top
    .map((item, index) => {
      const width = Math.max(9, Math.round(displayedConfidence(item) * 100));
      return `
        <div class="signal-item">
          <div class="signal-row">
            <span>候选 ${index + 1}</span>
            <span>${width}%</span>
          </div>
          <div class="signal-bar" aria-hidden="true"><span style="width:${width}%"></span></div>
        </div>
      `;
    })
    .join("");
}

function displayedConfidence(item) {
  if (!item) return 0;
  const progress = Math.min(1, effectiveAnswerCount() / Math.max(1, dataset.guess.minQuestions));
  return (item.matchRate || 0) * (0.28 + progress * 0.72);
}

function renderClues() {
  els.clueCount.textContent = String(state.answers.length);
  if (!state.answers.length) {
    els.clueTrail.innerHTML = `<span class="empty-note">线索槽为空</span>`;
    renderGuessHistory();
    return;
  }

  els.clueTrail.innerHTML = state.answers
    .slice(-8)
    .map((item) => {
      const q = findQuestionById(item.questionId);
      const answer = answerMeta(item.answerKey);
      return `<span class="clue-chip"><strong>${answer.label}</strong> ${q ? q.chip : "线索"}</span>`;
    })
    .join("");
  renderGuessHistory();
}

function ensureGuessHistoryPanel() {
  if (document.querySelector("#guessHistory")) return;
  const trace = document.querySelector(".trace-block");
  if (!trace) return;
  const panel = document.createElement("section");
  panel.className = "history-block";
  panel.id = "guessHistory";
  panel.innerHTML = `<div class="block-title"><span>历史猜测</span><span id="historyCount">0</span></div><div class="history-list" id="historyList"></div>`;
  trace.insertAdjacentElement("afterend", panel);
}

function saveGuessRecord(scoreItem, status) {
  const candidate = scoreItem.candidate;
  const records = guessRecords();
  records.unshift({
    status,
    name: displayName(candidate),
    rate: Math.round((scoreItem.matchRate || 0) * 100),
    count: state.answers.length,
    country: candidate.meta && candidate.meta.country ? candidate.meta.country : "",
    club: candidate.meta && candidate.meta.club ? candidate.meta.club : candidate.meta && candidate.meta.retired ? "已退役" : "",
    age: knownFootballAge(candidate.meta),
    foot: knownPreferredFoot(candidate),
    skin: knownSkinTone(candidate),
    time: new Date().toLocaleString(),
  });
  localStorage.setItem("footballGuessRecords", JSON.stringify(records.slice(0, 100)));
  renderGuessHistory();
}

function guessRecords() {
  try {
    return JSON.parse(localStorage.getItem("footballGuessRecords") || "[]");
  } catch {
    return [];
  }
}

function renderGuessHistory() {
  const list = document.querySelector("#historyList");
  const count = document.querySelector("#historyCount");
  if (!list || !count) return;
  const records = guessRecords();
  count.textContent = String(records.length);
  list.innerHTML = records.length
    ? records.map((item) => `
      <div class="history-item">
        <strong>${item.name}</strong>
        <span>${historyRecordText(item)}</span>
      </div>
    `).join("")
    : `<span class="empty-note">暂无记录</span>`;
}

function historyRecordText(item) {
  return [
    `${item.rate}%`,
    `${item.count}题`,
    item.country || "",
    item.club || "",
    item.age ? `${item.age}岁` : "",
    item.foot || "",
    item.skin || "",
  ].filter(Boolean).join(" · ");
}

function answerQuestion(answerKey, options = {}) {
  if (!currentQuestion) {
    if (!dataset.guess.hardGate) showResult(latestScores);
    return;
  }
  pushHistory();
  state.suppressedGuess = false;
  clearRevealResult();
  els.questionZone.classList.add("is-swapping");
  window.setTimeout(() => {
    const answeredQuestion = currentQuestion;
    const filtered = applyCandidateAnswer(answeredQuestion, answerKey);
    if (!filtered) {
      state.history.pop();
      els.questionZone.classList.remove("is-swapping");
      render();
      showRelaxedConditionNotice(answeredQuestion);
      return;
    }
    state.answers.push({
      questionId: answeredQuestion.id,
      answerKey,
      skipped: Boolean(options.skipped),
    });
    els.questionZone.classList.remove("is-swapping");
    render();
  }, 170);
}

function showQuestionReason() {
  if (!currentQuestion) return;
  document.querySelector("#questionReasonNotice")?.remove();
  const stage = questionStage(currentQuestion);
  const reason =
    state.lastQuestionReason ||
    `当前处于第 ${stage} 阶段（${FOOTBALL_STAGE_LABELS[stage] || "线索细化"}），这个问题用于继续缩小候选范围。`;
  const layer = document.createElement("div");
  layer.className = "notice-layer";
  layer.id = "questionReasonNotice";
  layer.innerHTML = `
    <section class="notice-sheet" role="dialog" aria-modal="true" aria-labelledby="questionReasonTitle">
      <p class="notice-kicker">提问依据</p>
      <h2 id="questionReasonTitle">为什么问这个？</h2>
      <p>${reason}</p>
      <button class="primary-action notice-action" type="button">知道了</button>
    </section>
  `;
  document.body.append(layer);
  layer.querySelector("button").addEventListener("click", () => layer.remove());
}

function applyCandidateAnswer(q, answerKey) {
  if (dataset !== DATASETS.football) return true;
  const isExactAnswer = answerKey === "yes" || answerKey === "no";
  const isPositiveCurrentClub =
    answerKey === "yes" &&
    (q.family || questionFamilyFromId(q.id)) === "club" &&
    q.meta && q.meta.currentClub;
  const isPositiveCurrentLeague =
    answerKey === "yes" &&
    q.id.startsWith("league_") &&
    (/现在/.test(q.text || "") || q.meta && q.meta.currentLeague);
  if (!isExactAnswer || (!state.emergencyMode && !isPositiveCurrentClub && !isPositiveCurrentLeague)) return true;
  const keepExpected = answerKey === "yes" ? 1 : 0;
  const nextIds = new Set(
    dataset.candidates
      .filter((candidate) => state.currentCandidateIds.has(candidate.id))
      .filter((candidate) => {
        const expected = expectedForQuestion(candidate, q);
        return expected === keepExpected;
      })
      .map((candidate) => candidate.id),
  );
  if (!nextIds.size) return false;
  state.currentCandidateIds = nextIds;
  return true;
}

function showRelaxedConditionNotice(q) {
  document.querySelector("#relaxedConditionNotice")?.remove();
  const layer = document.createElement("div");
  layer.className = "notice-layer";
  layer.id = "relaxedConditionNotice";
  layer.innerHTML = `
    <section class="notice-sheet" role="dialog" aria-modal="true" aria-labelledby="relaxedConditionTitle">
      <p class="notice-kicker">已放宽条件</p>
      <h2 id="relaxedConditionTitle">这个回答会让候选变成 0 人</h2>
      <p>我已回退“${q.chip}”这一条件。可能有一条线索并不完全确定，你可以选择“不确定”或跳过。</p>
      <button class="primary-action notice-action" type="button">继续</button>
    </section>
  `;
  document.body.append(layer);
  layer.querySelector("button").addEventListener("click", () => layer.remove());
}

function showResult(scores) {
  if (state.resultOpen || !scores.length) return;
  state.resultOpen = true;
  const [top, ...rest] = scores;
  const candidate = top.candidate;
  const confidence = Math.round((top.matchRate || 0) * 100);

  els.resultKicker.textContent = `我猜是 | ${confidence}% 相关`;
  els.resultAvatar.textContent = initials(displayName(candidate));
  els.resultName.textContent = displayName(candidate);
  els.resultBio.textContent = `${candidate.title}。${candidate.bio}`;
  els.resultTags.innerHTML = candidate.tags.map((tag) => `<span>${tag}</span>`).join("");
  els.alternatives.innerHTML = rest
    .slice(0, 3)
    .map((item) => `<span class="alternative-pill">也可能是 ${displayName(item.candidate)}</span>`)
    .join("");
  els.resultLayer.hidden = false;
  els.correctBtn.focus({ preventScroll: true });
}

function hideResult() {
  state && (state.resultOpen = false);
  els.resultLayer.hidden = true;
}

function showLowSignalNotice(matchRate) {
  hideLowSignalNotice();
  const layer = document.createElement("div");
  const effective = effectiveAnswerCount();
  const needed = dataset.guess.minEffectiveAnswers || 0;
  layer.className = "notice-layer";
  layer.id = "lowSignalNotice";
  layer.innerHTML = `
    <section class="notice-sheet" role="dialog" aria-modal="true" aria-labelledby="noticeTitle">
      <p class="notice-kicker">线索不足</p>
      <h2 id="noticeTitle">这名球员可能比较小众</h2>
      <p>已经问到第 ${state.answers.length} 问，但仍有多名球员非常接近，或有效回答还不够多（当前 ${effective} 个）。接下来请尽量减少“不确定”，尤其留意联赛、球队、名字字母和队友问题。</p>
      <button class="primary-action notice-action" id="noticeContinue" type="button">继续提问</button>
    </section>
  `;
  document.body.append(layer);
  const button = layer.querySelector("#noticeContinue");
  button.addEventListener("click", hideLowSignalNotice);
  button.focus({ preventScroll: true });
}

function hideLowSignalNotice() {
  document.querySelector("#lowSignalNotice")?.remove();
}

function showResultDismissChoice() {
  if (!state || !state.resultOpen) return;
  const guessed = latestScores[0] ? displayName(latestScores[0].candidate) : "这个球员";
  hideResult();
  const layer = document.createElement("div");
  layer.className = "notice-layer";
  layer.id = "dismissChoiceNotice";
  layer.innerHTML = `
    <section class="notice-sheet" role="dialog" aria-modal="true" aria-labelledby="dismissChoiceTitle">
      <p class="notice-kicker">这次猜测怎么处理？</p>
      <h2 id="dismissChoiceTitle">${guessed}</h2>
      <p>关闭猜测前，请选择继续下一个猜测，或回到上一问修正线索。</p>
      <div class="notice-actions">
        <button class="primary-action" id="dismissWrong" type="button">猜错了，继续</button>
        <button class="secondary-action" id="dismissBack" type="button">回到上一问</button>
      </div>
    </section>
  `;
  document.body.append(layer);
  layer.querySelector("#dismissWrong").addEventListener("click", () => {
    layer.remove();
    markWrongGuess();
  });
  layer.querySelector("#dismissBack").addEventListener("click", () => {
    layer.remove();
    restoreHistory();
  });
}

function showReview(scoreItem) {
  const candidate = scoreItem.candidate;
  const layer = document.createElement("div");
  layer.className = "notice-layer";
  layer.id = "reviewNotice";
  layer.innerHTML = `
    <section class="notice-sheet" role="dialog" aria-modal="true" aria-labelledby="reviewTitle">
      <p class="notice-kicker">复盘</p>
      <h2 id="reviewTitle">${displayName(candidate)}</h2>
      <p>匹配度 ${Math.round((scoreItem.matchRate || 0) * 100)}%，共回答 ${state.answers.length} 题。关键线索：${reviewClues(candidate).join("、") || "线索较少"}。</p>
      <button class="primary-action notice-action" id="reviewContinue" type="button">再来一局</button>
    </section>
  `;
  document.body.append(layer);
  layer.querySelector("#reviewContinue").addEventListener("click", () => {
    layer.remove();
    newGame();
  });
}

function reviewClues(candidate) {
  return state.answers
    .filter((item) => item.answerKey !== "unknown")
    .map((item) => {
      const q = findQuestionById(item.questionId);
      if (!q || expectedForQuestion(candidate, q) === null) return null;
      const close = answerCloseness(answerMeta(item.answerKey).value, expectedForQuestion(candidate, q));
      return close > 0.72 ? `${answerMeta(item.answerKey).label}${q.chip}` : null;
    })
    .filter(Boolean)
    .slice(0, 6);
}

function closeResultAndContinue() {
  showResultDismissChoice();
}

function markWrongGuess() {
  if (!latestScores.length) return;
  pushHistory();
  state.suppressedGuess = false;
  state.guessCooldownUntil = Math.max(
    state.guessCooldownUntil,
    state.answers.length + dataset.guess.wrongCooldown,
  );
  state.eliminated.add(latestScores[0].candidate.id);
  const hasRemainingHardCandidate = dataset.candidates.some(
    (candidate) =>
      state.currentCandidateIds.has(candidate.id) &&
      !state.eliminated.has(candidate.id),
  );
  if (!hasRemainingHardCandidate) {
    state.currentCandidateIds = new Set(
      dataset.candidates
        .filter((candidate) => !state.eliminated.has(candidate.id))
        .map((candidate) => candidate.id),
    );
    state.currentStage = Math.min(state.currentStage || 6, 5);
    state.lastQuestionReason =
      "上一次猜测被否定后，严格条件已无候选，因此保留原回答用于评分，并放宽硬筛选继续寻找。";
  }
  hideResult();
  render();
}

function preferredFoot(candidate) {
  return knownPreferredFoot(candidate) || "未知脚";
}

function knownPreferredFoot(candidate) {
  if (candidate.traits.has("foot_left")) return "左脚";
  if (candidate.traits.has("foot_right")) return "右脚";
  return "";
}

function knownSkinTone(candidate) {
  if (candidate.traits.has("skin_dark")) return "深色肤色";
  if (candidate.traits.has("skin_light")) return "浅色肤色";
  return "";
}

function markCorrectGuess() {
  if (!latestScores.length) {
    newGame();
    return;
  }
  saveGuessRecord(latestScores[0], "答对");
  showReview(latestScores[0]);
}

function clearRevealResult() {
  if (!els.matchOutput) return;
  els.matchOutput.hidden = true;
  els.matchOutput.innerHTML = "";
  els.revealStatus.textContent = "待验证";
}

function focusRevealInput() {
  hideResult();
  els.revealInput.focus({ preventScroll: false });
  els.revealInput.select();
}

function handleRevealSubmit(event) {
  event.preventDefault();
  const query = els.revealInput.value.trim();
  if (!query) {
    renderRevealNotice("请输入一个答案。", "待验证");
    return;
  }

  const matches = searchCandidates(query);
  if (!matches.length || matches[0].searchScore < 54) {
    const closest = matches.slice(0, 3).map((item) => item.candidate.name);
    renderRevealNotice(
      closest.length
        ? `没有在当前题库中确认这个${dataset.targetLabel}。接近项：${closest.join("、")}。`
        : `没有在当前题库中找到这个${dataset.targetLabel}。`,
      "未找到",
    );
    return;
  }

  renderMatchResult(matches);
}

function renderRevealNotice(message, status) {
  els.revealStatus.textContent = status;
  els.matchOutput.hidden = false;
  els.matchOutput.innerHTML = `<p class="match-detail">${message}</p>`;
}

function renderMatchResult(matches) {
  const [best, ...rest] = matches;
  const candidate = best.candidate;
  const match = computeAnswerMatch(candidate);
  const settings = dataset.guess;
  const enoughAnswers = match.used >= settings.minWinAnswers;
  const win = enoughAnswers && match.rate >= settings.winThreshold;
  const verdict = win ? "你胜出" : enoughAnswers ? "匹配不足" : "线索不足";
  const closest = rest
    .slice(0, 3)
    .map((item) => `<span class="alternative-pill">${displayName(item.candidate)}</span>`)
    .join("");
  const conflicts = match.conflicts.length
    ? `<div class="conflict-list">${match.conflicts
        .slice(0, 4)
        .map((item) => `<span>${item}</span>`)
        .join("")}</div>`
    : "";

  els.revealStatus.textContent = verdict;
  els.matchOutput.hidden = false;
  els.matchOutput.innerHTML = `
    <div class="match-summary ${win ? "is-win" : ""}">
      <strong>${match.rate}%</strong>
      <span>最终匹配率</span>
    </div>
    <p class="match-detail">搜索到 ${displayName(candidate)}。依据 ${match.used} 个有效回答，胜出线为 ${settings.winThreshold}%。</p>
    <p class="match-verdict">${verdict}</p>
    ${conflicts}
    ${closest ? `<div class="match-candidates">${closest}</div>` : ""}
  `;
}

function computeAnswerMatch(candidate) {
  let total = 0;
  let matched = 0;
  let used = 0;
  const conflicts = [];

  for (const item of state.answers) {
    if (item.answerKey === "unknown") continue;
    const q = findQuestionById(item.questionId);
    if (!q) continue;
    const value = answerMeta(item.answerKey).value;
    const expected = expectedForQuestion(candidate, q);
    if (expected === null) continue;
    const weight = answerWeight(q, item.answerKey, candidate, expected);
    const closeness = answerCloseness(value, expected);
    const extraPenalty = hardMismatchPenalty(q, item.answerKey, candidate, expected);
    total += weight + extraPenalty;
    matched += closeness * weight;
    used += 1;
    if (closeness < 0.45) {
      conflicts.push(`${answerMeta(item.answerKey).label} · ${q.chip}`);
    }
  }

  return {
    conflicts,
    rate: total ? Math.round((matched / total) * 100) : 0,
    used,
  };
}

function searchCandidates(query) {
  const normalized = normalizeText(query);
  if (!normalized) return [];

  return dataset.candidates
    .map((candidate) => {
      const searchScore = candidateTerms(candidate).reduce((best, term) => {
        return Math.max(best, scoreTerm(normalized, normalizeText(term)));
      }, 0);
      return { candidate, searchScore };
    })
    .filter((item) => item.searchScore > 0)
    .sort((a, b) => b.searchScore - a.searchScore);
}

function candidateTerms(candidate) {
  return [
    candidate.name,
    candidate.title,
    ...candidate.tags,
    ...candidate.aliases,
  ];
}

function displayName(candidate) {
  if (!candidate) return "";
  const chinese = [...(candidate.aliases || [])].find((alias) => /[\u4e00-\u9fa5]/.test(alias));
  if (!chinese) return candidate.name;
  const country = normalizeText(candidate.meta && candidate.meta.country);
  if (country === "china" || country === "hkg") return chinese;
  return `${chinese}（${candidate.name}）`;
}

function scoreTerm(query, term) {
  if (!term) return 0;
  if (term === query) return 100;
  if (term.startsWith(query)) return 92;
  if (term.includes(query)) return 84;
  if (query.includes(term) && term.length >= 3) return 72;
  const similarity = editSimilarity(query, term);
  return similarity >= 0.72 ? Math.round(similarity * 70) : 0;
}

function normalizeText(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fa5]/g, "");
}

function editSimilarity(a, b) {
  if (!a || !b || Math.max(a.length, b.length) > 34) return 0;
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = previous[0];
    previous[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const current = previous[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      previous[j] = Math.min(previous[j] + 1, previous[j - 1] + 1, diagonal + cost);
      diagonal = current;
    }
  }
  return 1 - previous[b.length] / Math.max(a.length, b.length);
}

function initials(name) {
  const clean = name.replace(/[·.]/g, " ").trim();
  const parts = clean.split(/\s+/);
  if (/^[A-Za-z]/.test(clean) && parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return clean.slice(0, 2);
}

els.answerGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-answer]");
  if (!button || button.disabled) return;
  answerQuestion(button.dataset.answer);
});

els.skipBtn.addEventListener("click", () => answerQuestion("unknown", { skipped: true }));
els.whyBtn.addEventListener("click", showQuestionReason);
els.preliminaryGuessBtn.addEventListener("click", showPreliminaryGuessChoice);
els.undoBtn.addEventListener("click", restoreHistory);
els.undoTopBtn.addEventListener("click", restoreHistory);
els.restartTop.addEventListener("click", newGame);
els.closeResult.addEventListener("click", closeResultAndContinue);
els.correctBtn.addEventListener("click", markCorrectGuess);
els.wrongBtn.addEventListener("click", markWrongGuess);
els.revealFromResultBtn.addEventListener("click", focusRevealInput);
els.revealForm.addEventListener("submit", handleRevealSubmit);
els.revealInput.addEventListener("input", () => {
  if (!els.revealInput.value.trim()) clearRevealResult();
});

document.addEventListener("keydown", (event) => {
  if (els.resultLayer.hidden === false && event.key === "Escape") {
    closeResultAndContinue();
    return;
  }
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
  const index = Number(event.key) - 1;
  if (index >= 0 && index < ANSWERS.length) answerQuestion(ANSWERS[index].key);
});

newGame();
