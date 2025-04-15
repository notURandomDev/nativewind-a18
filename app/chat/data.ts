export const TEST_DATA_REF_MEETING: import('./messageTypes').AgentResponseProps = {
  type: 'reference',
  timestamp: 1743174269356,
  _final: false,
  data: {
    message_id: '7634640000004581',
    timestamp: 0,
    references: [
      /*  {
        description: '探讨人工智能如何推动教育创新和变革及面临的安全问题',
        location: '杭州国际博览中心 - 505O',
        meetingId: '14',
        startTime: '2025-04-17T14:00:00',
        endTime: '2025-04-17T17:00:00',
        title: '人工智能与教育融合分论坛',
      },
      {
        description: '聚焦人工智能的前沿发展趋势和未来的发展方向',
        location: '杭州国际博览中心 - 303M',
        meetingId: '12',
        startTime: '2025-04-18T09:00:00',
        endTime: '2025-04-18T12:00:00',
        title: '主论坛：人工智能发展趋势与未来展望',
      },
      {
        description: '研究人工智能算法的安全性、鲁棒性及防范措施',
        location: '杭州国际博览中心 - 404N',
        meetingId: '13',
        startTime: '2025-04-18T13:00:00',
        endTime: '2025-04-18T16:00:00',
        title: '人工智能算法安全分论坛',
      },
      {
        description: '行业专家共同探讨人工智能带来的社会影响及安全方面的挑战',
        location: '杭州国际博览中心 - 606P',
        meetingId: '15',
        startTime: '2025-04-18T14:00:00',
        endTime: '2025-04-18T16:00:00',
        title: '圆桌论坛：人工智能的社会影响与安全挑战',
      }, */
      /* {
        description: '探讨智慧城市建设中的网络安全挑战',
        location: '杭州国际博览中心-010J',
        meetingId: '10',
        startTime: '2025-04-16T11:00:00',
        endTime: '2025-04-16T14:00:00',
        title: '智慧城市安全分论坛',
      },
      {
        description: '探索人工智能在医疗行业的应用前景及安全保障措施',
        location: '杭州国际博览中心 - 202L',
        meetingId: '11',
        startTime: '2025-04-17T13:00:00',
        endTime: '2025-04-17T16:00:00',
        title: '人工智能在医疗领域的应用与安全分论坛',
      }, */
      {
        description: '展示最新的数字安全技术与产品',
        location: '杭州国际博览中心-505E',
        meetingId: '5',
        startTime: '2025-04-15T14:00:00',
        endTime: '2025-04-15T17:00:00',
        title: '技术展示与演示',
      },
    ],
  },
};

export const TEST_TRANSCRIPTION_RAW = {
  _final: false,
  data: {
    beginTime: 634600,
    index: 37,
    taskKey: 'ed1d9bd8-f206-46e8-819f-1e0b8f503aeb',
    text: '我们的防火墙目前应该是走在路上的这个阶段，我们实现了跟这个平台和周边产品的联动。跟很好的对接。通过这样的一些协同，我们能够',
  },
  timestamp: 1743511045671,
  type: 'raw',
};

export const TEST_DATA_PHASE = {
  type: 'stage',
  data: { phaseCode: 4 },
  timestamp: 1744093344048,
  _final: true,
};
export const TEST_DATA_ANSWER = {
  type: 'answer',
  data: {
    text: '▎智能筛选结果\n当前匹配到1个相关会议：\n【1】技术展示与演示（技术）\n⏰ 2025-04-15 14:00 - 17:00 | 📍 杭州国际博览中心-505E\n🔍 展示最新的数字安全技术与产品\n▎技术展示与演示将于2025年4月15日14:00 - 17:00在杭州国际博览中心-505E举行。',
    // text: '当前匹配到2个相关会议：\n\n【1】物联网安全分论坛\n⏰ 2025-04-16 13:00 - 16:00 | 📍 杭州国际博览中心-404D\n🔍 探讨物联网设备的安全防护与隐私保护\n\n【2】技术展示与演示\n⏰ 2025-04-15 14:00 - 17:00 | 📍 杭州国际博览中心-505E\n🔍 展示最新的数字安全技术与产品\n\n',
    // text: '智能筛选结果\n当前匹配到2个相关会议：\n【1】人工智能与安全分论坛\n⏰ 2025-04-15 13:00 - 16:00 | 📍 杭州国际博览中心-202B\n🔍 探讨人工智能在安全领域的应用与挑战\n【2】人工智能在医疗领域的应用与安全分论坛\n⏰ 2025-04-17 13:00 - 16:00 | 📍 杭州国际博览中心 - 202L\n🔍 探索人工智能在医疗行业的应用前景及安全保障措施\n▎当前涵盖2个领域（安全、医疗）。您对哪一类会议更感兴趣，我可以为您进一步筛选。',
    // text: '你好，这个问题我暂时无法回答，让我们换个换题再聊聊吧。',
    // text: '在会议中，与会者讨论了数字安全的解决方案，特别强调了区块链技术的去中心化和不可篡改特性，这为保护数字信息提供了创新的方法。但值得注意的是，任何技术都有其适用范围和潜在风险，区块链技术也不例外其在提供安全解决方案的同时，也可能面临新的挑战和问题。',
    // text: '以下是几个与人工智能相关的会议，供您参考：\n1. 人工智能算法安全分论坛，地点：杭州国际博览中心 - 404N，时间：2025年4月18日13:00-16:00，研究人工智能算法的安全性、鲁棒性及防范措施。\n2. 人工智能与教育融合分论坛，地点：杭州国际博览中心 - 505O，时间：2025年4月17日14:00-17:00，探讨人工智能如何推动教育创新和变革及面临的安全问题。\n3. 圆桌论坛：人工智能的社会影响与安全挑战，地点：杭州国际博览中心 - 606P，时间：2025年4月18日14:00-16:00，行业专家共同探讨人工智能带来的社会影响及安全方面的挑战。\n4. 主论坛：人工智能发展趋势与未来展望，地点：杭州国际博览中心 - 303M，时间：2025年4月18日09:00-12:00，聚焦人工智能的前沿发展趋势和未来的发展方向。\n\n请注意，以上信息仅供参考，具体安排请以官方发布为准。',
    // text: '技术展示与演示将于2025年4月15日14:00开始。此信息基于当前安排，如有变动，请以官方最新通知为准。',
    message_id: '7427092700001401',
    timestamp: 0,
  },
  timestamp: 1743174269356,
  _final: false,
};

export const TRANSCRIPTION_THUMBNAILS = new Map([
  [14, require('../../assets/imgs/thumbnails/02-51.png')],
  [16, require('../../assets/imgs/thumbnails/08-53.png')],
  [33, require('../../assets/imgs/thumbnails/10-03.png')],
  [20, require('../../assets/imgs/thumbnails/10-31.png')],
  [38, require('../../assets/imgs/thumbnails/10-52.png')],
]);

export const TEST_DATA_REF_TRANSCRIPTION = {
  type: 'reference',
  timestamp: 1743174269375,
  _final: false,
  data: {
    message_id: '7634640000004581',
    timestamp: 0,
    references: [
      {
        sentenceId: 10,
        startTime: 171050,
        endTime: 184230,
        // text: '下面我向大家汇报我们在防火墙和AI融合方面增强的一些发布的功能。我们知道防火墙实际上是一个历史非常长的产品。',
        text: '接下来我将介绍区块链安全审计的核心技术。区块链作为分布式账本，其不可篡改性依赖于密码学算法和共识机制。我们新研发的智能合约漏洞扫描引擎能检测重入攻击等32类安全风险。',
      },
      {
        sentenceId: 32,
        startTime: 533780,
        endTime: 551050,
        // text: '最后一部分，我简单介绍一下防火墙安全运营方面的增强。我们引入了阿凡达，在大模型框架加持下，给防火墙内置了两个AI小助手，小恒和小安。注意，此处将“阿凡提”修正为更符合语境的“阿凡达”。',
        text: '在数字资产托管方面，我们创新性地采用了多重签名和冷热钱包分离架构。通过硬件加密模块实现私钥的物理隔离，同时支持TEE可信执行环境下的链上交易审批。',
      },
    ],
  },
};

// 会议内问答返回的格式（转录数据）
const SSE_REFERENCE_RES_INSIDE = {
  type: 'reference',
  data: {
    message_id: '7634640000004581',
    timestamp: 0,
    references: [
      {
        sentenceId: 44,
        startTime: 745380,
        endTime: 761310,
        text: '到了我这一块，我将简短明了地分享汇报内容，不占用大家的午休时间。我的汇报主题是面向大模型训练和推理的数据保护机密计算产品。',
      },
      {
        sentenceId: 42,
        startTime: 698810,
        endTime: 720750,
        text: '为客户解决未来的安全问题，感谢大家，感谢何孔总。去年，我们致力于让安全更智能，让智能更安全。在大数据和AI时代，保护大模型训练和推理过程中的数据安全至关重要。',
      },
      {
        sentenceId: 41,
        startTime: 686990,
        endTime: 698810,
        text: '有一个统一且真正强大的通用安全智能在云端，它能将防火墙、我们的平台和周边产品理解和协同起来，实现真正的运营。',
      },
      {
        sentenceId: 38,
        startTime: 631730,
        endTime: 652930,
        text: '通过这样的协同，我们能够打通数据日志分析和处置的整个流程，并充分发挥安全产品每种类型、每个层次的特点和优势。从而，我们能为用户提供防火墙一体化的MS云托管服务。',
      },
      {
        sentenceId: 36,
        startTime: 603760,
        endTime: 621260,
        text: '从单体角度看，未来的发展空间有限。要进化到下一代真正智能的防火墙，必须在一体化安全运营和体系化的AI体系中发挥作用。',
      },
    ],
  },
  timestamp: 1743176347039,
  _final: true,
};

// 会议外问答返回的格式（会议数据）
const SSE_REFERENCE_RES_OUTSIDE = {
  reference: [
    {
      description: '研究人工智能算法的安全性、鲁棒性及防范措施',
      location: '杭州国际博览中心 - 404N',
      meetingId: '13',
      startTime: '2025-04-18T13:00:00',
      endTime: '2025-04-18T16:00:00',
      title: '人工智能算法安全分论坛',
    },
    {
      description: '探讨人工智能如何推动教育创新和变革及面临的安全问题',
      location: '杭州国际博览中心 - 505O',
      meetingId: '14',
      startTime: '2025-04-17T14:00:00',
      endTime: '2025-04-17T17:00:00',
      title: '人工智能与教育融合分论坛',
    },
    {
      description: '行业专家共同探讨人工智能带来的社会影响及安全方面的挑战',
      location: '杭州国际博览中心 - 606P',
      meetingId: '15',
      startTime: '2025-04-18T14:00:00',
      endTime: '2025-04-18T16:00:00',
      title: '圆桌论坛：人工智能的社会影响与安全挑战',
    },
    {
      description: '聚焦人工智能的前沿发展趋势和未来的发展方向',
      location: '杭州国际博览中心 - 303M',
      meetingId: '12',
      startTime: '2025-04-18T09:00:00',
      endTime: '2025-04-18T12:00:00',
      title: '主论坛：人工智能发展趋势与未来展望',
    },
  ],
  answer:
    '以下是几个与人工智能相关的会议，供您参考：\n1. 人工智能算法安全分论坛，地点：杭州国际博览中心 - 404N，时间：2025年4月18日13:00-16:00，研究人工智能算法的安全性、鲁棒性及防范措施。\n2. 人工智能与教育融合分论坛，地点：杭州国际博览中心 - 505O，时间：2025年4月17日14:00-17:00，探讨人工智能如何推动教育创新和变革及面临的安全问题。\n3. 圆桌论坛：人工智能的社会影响与安全挑战，地点：杭州国际博览中心 - 606P，时间：2025年4月18日14:00-16:00，行业专家共同探讨人工智能带来的社会影响及安全方面的挑战。\n4. 主论坛：人工智能发展趋势与未来展望，地点：杭州国际博览中心 - 303M，时间：2025年4月18日09:00-12:00，聚焦人工智能的前沿发展趋势和未来的发展方向。\n\n请注意，以上信息仅供参考，具体安排请以官方发布为准。',
};

// 平台知识库里的会议数据
const MEETINGS = [
  {
    meetingId: '1',
    title: '主论坛：数字安全行业趋势',
    location: '杭州国际博览中心-101A',
    description: '聚焦数字安全行业趋势与前沿技术',
    startTime: '2025-04-15T09:00:00',
    endTime: '2025-04-15T12:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-01-10T14:30:00',
  },
  {
    meetingId: '2',
    title: '人工智能与安全分论坛',
    location: '杭州国际博览中心-202B',
    description: '探讨人工智能在安全领域的应用与挑战',
    startTime: '2025-04-15T13:00:00',
    endTime: '2025-04-15T16:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-01-15T10:45:00',
  },
  {
    meetingId: '3',
    title: '金融安全分论坛',
    location: '杭州国际博览中心-303C',
    description: '关注金融行业的网络安全与数据隐私保护',
    startTime: '2025-04-16T09:00:00',
    endTime: '2025-04-16T12:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-01-20T11:00:00',
  },
  {
    meetingId: '4',
    title: '物联网安全分论坛',
    location: '杭州国际博览中心-404D',
    description: '探讨物联网设备的安全防护与隐私保护',
    startTime: '2025-04-16T13:00:00',
    endTime: '2025-04-16T16:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-01-25T12:00:00',
  },
  {
    meetingId: '5',
    title: '技术展示与演示',
    location: '杭州国际博览中心-505E',
    description: '展示最新的数字安全技术与产品',
    startTime: '2025-04-15T14:00:00',
    endTime: '2025-04-15T17:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-01-30T13:00:00',
  },
  {
    meetingId: '6',
    title: '圆桌论坛：数字安全热点话题',
    location: '杭州国际博览中心-606F',
    description: '行业专家探讨数字安全热点话题',
    startTime: '2025-04-16T14:00:00',
    endTime: '2025-04-16T16:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-02-10T14:00:00',
  },
  {
    meetingId: '7',
    title: '区块链安全分论坛',
    location: '杭州国际博览中心-707G',
    description: '探讨区块链技术的安全应用与挑战',
    startTime: '2025-04-15T10:00:00',
    endTime: '2025-04-15T12:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-02-15T15:00:00',
  },
  {
    meetingId: '8',
    title: '云安全分论坛',
    location: '杭州国际博览中心-808H',
    description: '聚焦云计算环境下的安全防护',
    startTime: '2025-04-16T10:00:00',
    endTime: '2025-04-16T13:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-02-20T16:00:00',
  },
  {
    meetingId: '9',
    title: '数据隐私与合规分论坛',
    location: '杭州国际博览中心-909I',
    description: '解读数据隐私法规与企业合规建设',
    startTime: '2025-04-15T15:00:00',
    endTime: '2025-04-15T18:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-02-25T17:00:00',
  },
  {
    meetingId: '10',
    title: '智慧城市安全分论坛',
    location: '杭州国际博览中心-010J',
    description: '探讨智慧城市建设中的网络安全挑战',
    startTime: '2025-04-16T11:00:00',
    endTime: '2025-04-16T14:00:00',
    updateTime: '2025-03-17T10:00:00',
    createTime: '2025-03-01T18:00:00',
  },
];

// 中间信息（后端）
const res1 = {
  mode: 'preview',
  name: '智能对话',
  from: 'basic_llm',
  message_id: '7622011300019591',
  type: 'inline',
  content: '防火',
  node_id: 'node8',
  timestamp: '1743176224187',
};
