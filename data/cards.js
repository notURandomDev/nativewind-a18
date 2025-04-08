const replayRecommendations = [
  {
    title: '企业数字化与数据出海流通专项会议',
    time: '2025年5月17日 14:30-17:20',
    venue: '杭州国际博览中心·102B/C',
    imgSrc: require('../assets/imgs/rr-1.png'),
    views: 2323,
    duration: '02:15:39',
  },
  {
    title: '数据安全创新实践案例集发布活动',
    time: '2025年5月17日 14:00-17:20',
    venue: '杭州国际博览中心·多功能厅C',
    imgSrc: require('../assets/imgs/rr-2.png'),
    views: 3623,
    duration: '03:15:20',
  },
  {
    title: '2024全国数字安全行业产教融合共同体大会暨西湖论剑·数...',
    time: '2025年5月17日 14:30-17:20',
    venue: '杭州国际博览中心·103B/C',
    imgSrc: require('../assets/imgs/rr-3.png'),
    views: 1923,
    duration: '02:27:20',
  },
];

const committeeCardsData = [
  { title: '邬贺铨', subtitle: '中国工程院院士', img: require('../assets/imgs/guest-p-1.png') },
  { title: '邬江兴', subtitle: '中国工程院院士', img: require('../assets/imgs/guest-p-2.png') },
  { title: '杨小牛', subtitle: '中国工程院院士', img: require('../assets/imgs/guest-p-3.png') },
];

const speechListData = [
  {
    title: '以数据为关键要素的数字经济，亟需数字生态系统底层驱动范...',
    subtitle: '企业数字化与数据出海流通座谈演讲会',
    datetime: '2025年5月17日',
    views: 190,
    stars: 55,
    likes: 60,
    img: {
      title: '邬江兴',
      subtitle: '中国工程院院士',
      src: require('../assets/imgs/guest-s-1.png'),
    },
  },
  {
    title: '迎接人工智能的安全挑战',
    subtitle: '数据安全创新实践案例集发...',
    datetime: '2025年5月17日',
    views: 53,
    stars: 55,
    likes: 58,
    img: {
      title: '吴世忠',
      subtitle: '中国工程院院士',
      src: require('../assets/imgs/guest-s-2.png'),
    },
  },
  {
    title: '大力发展AI，推动绿色化数字化协同转型',
    subtitle: '2024全国数字安全行业产教...',
    datetime: '2025年5月17日',
    views: 29,
    stars: 55,
    likes: 40,
    img: {
      title: '龚克',
      subtitle: '中国新一代人工智...',
      src: require('../assets/imgs/guest-s-3.png'),
    },
  },
  {
    title: '新质生产力与数字经济',
    subtitle: '2024全国数字安全行业产教...',
    datetime: '2025年5月17日',
    views: 190,
    stars: 55,
    likes: 60,
    img: {
      title: '汪玉凯',
      subtitle: '中国工程院院士',
      src: require('../assets/imgs/guest-s-4.png'),
    },
  },
];

const newsFrontierData = [
  {
    title: '西湖论剑演讲实录 | 吴世忠院士:迎接人工智能的安全挑战',
    subtitle:
      '2025年5月17日，以“智绘安全 乘数而上”为主题的2024年第十二届西湖论剑·数字安全大会在杭州国际博览中...',
    views: 190,
    stars: 55,
    likes: 60,
    date: '2025年5月18日',
    img: {
      src: require('../assets/imgs/nf-2.png'),
      label: '中国信息安全',
    },
  },
  {
    title: '四次出席 数次掌声 | 邬江兴院士在西湖论剑作主题演讲',
    subtitle:
      '5月18日，2024西湖论剑·数字安全大会在杭州降重举行。作为西湖论剑的老朋友，中国工程院院士邬江兴...',
    views: 210,
    stars: 55,
    likes: 58,
    date: '2025年5月18日',
    img: {
      src: require('../assets/imgs/nf-1.png'),
      label: '本组委会',
    },
  },
  {
    title: '西湖论剑 | AI引领数字安全新浪潮专题会议亮点速览',
    subtitle:
      '随着人工智能技术的蓬勃发展，一个全新的安全纪元即将到来。5月18日，2024西湖论剑·数字安全大会“AI引领...',
    views: 118,
    stars: 55,
    likes: 47,
    date: '2025年5月9日',
    img: {
      src: require('../assets/imgs/nf-3.png'),
      label: '中国日报网',
    },
  },
];

const videoHighlightsData = [
  {
    title: '新华网记者带你沉浸式探访2024西湖论剑·数字安全大会',
    subtitle: '新华网',
    views: 1118,
    stars: 55,
    likes: 90,
    video: {
      duration: '00:15:39',
      imgSrc: require('../assets/imgs/vh-1.png'),
    },
  },
  {
    title: '四次出席 数次掌声 | 邬江兴院士在西湖论剑作主题演讲',
    subtitle: '思客对话圆桌',
    views: 1031,
    stars: 55,
    likes: 79,
    video: {
      duration: '01:25:37',
      imgSrc: require('../assets/imgs/vh-2.png'),
    },
  },
  {
    title: '四次出席 数次掌声 | 邬江兴院士在西湖论剑作主题演讲',
    subtitle: '2025西湖论剑官方',
    views: 1031,
    stars: 55,
    likes: 79,
    video: {
      duration: '00:45:37',
      imgSrc: require('../assets/imgs/vh-3.png'),
    },
  },
];
const photoHighlightsData = [
  {
    label: '钟振山',
    imgSrc: require('../assets/imgs/ph-1.png'),
  },
  {
    label: '发布仪式',
    imgSrc: require('../assets/imgs/ph-2.png'),
  },
  {
    label: '企业资源入表',
    imgSrc: require('../assets/imgs/ph-2.png'),
  },
  {
    label: '企业资源入表',
    imgSrc: require('../assets/imgs/ph-2.png'),
  },
  {
    label: '企业资源入表',
    imgSrc: require('../assets/imgs/ph-2.png'),
  },
];

const pptGalleryData = [
  {
    title: '主论坛及开幕式PPT合集',
    fileSize: '6.75MB',
    imgSrc: require('../assets/imgs/ppt-2.png'),
  },
  {
    title: '数据安全创新实践案例集发布活动',
    fileSize: '12.75MB',
    imgSrc: require('../assets/imgs/ppt-1.png'),
  },
  {
    title: '企业数字化数据出海流通会议',
    fileSize: '8.75MB',
    imgSrc: require('../assets/imgs/ppt-3.png'),
  },
];
const policyGalleryData = [
  {
    title: '企业数据资源入表白皮书',
    fileSize: '6.75MB',
    imgSrc: require('../assets/imgs/policy-1.png'),
  },
  {
    title: '数据安全典型场景案例',
    fileSize: '12.75MB',
    imgSrc: require('../assets/imgs/policy-2.jpeg'),
  },
  {
    title: '重大活动网络安全保障',
    fileSize: '9.75MB',
    imgSrc: require('../assets/imgs/policy-3.png'),
  },
];
const agendaPosterData = [
  {
    title: '开幕式及主题大会',
    fileSize: '3MB',
    imgSrc: require('../assets/imgs/ap-1.png'),
  },
  {
    title: '2024全国数字安全行',
    fileSize: '3MB',
    imgSrc: require('../assets/imgs/ap-2.png'),
  },
  {
    title: '云网安全·新质',
    fileSize: '3MB',
    imgSrc: require('../assets/imgs/ap-1.png'),
  },
];
const guestsPosterData = [
  {
    title: '王连印/中国网络安全...',
    fileSize: '3MB',
    imgSrc: require('../assets/imgs/gp-1.png'),
  },
  {
    title: '范渊/安恒信息董事长',
    fileSize: '3MB',
    imgSrc: require('../assets/imgs/gp-2.png'),
  },
  {
    title: '范渊/安恒信息董事长',
    fileSize: '3MB',
    imgSrc: require('../assets/imgs/gp-3.png'),
  },
];

const securityBootcampData = [
  {
    title: '【西湖论剑安全特训营】AI新质生产力大模型认知与应用能力提升班',
    time: '2025年5月18日｜9:30-18:00',
    venue: '浙江省嘉兴市乌镇·安恒书院',
    imgSrc: require('../assets/imgs/sb-1.png'),
  },
  {
    title: '【西湖论剑安全特训营】数据要素×高级研修班',
    time: '2025年5月18日｜9:30-18:00',
    venue: '浙江省嘉兴市乌镇·安恒书院',
    imgSrc: require('../assets/imgs/sb-2.png'),
  },
];

export {
  replayRecommendations,
  committeeCardsData,
  speechListData,
  newsFrontierData,
  videoHighlightsData,
  pptGalleryData,
  policyGalleryData,
  agendaPosterData,
  guestsPosterData,
  photoHighlightsData,
  securityBootcampData,
};
