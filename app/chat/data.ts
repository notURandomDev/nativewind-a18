export const TEST_DATA_REF_MEETING: import('./messageTypes').AgentResponseProps = {
  type: 'reference',
  timestamp: 1743174269356,
  _final: false,
  data: {
    message_id: '7634640000004581',
    timestamp: 0,
    references: [
      {
        meetingId: '5',
        title: '技术展示与演示',
        location: '杭州国际博览中心-505E',
        description: '展示最新的数字安全技术与产品',
        startTime: '2025-04-15T14:00:00',
        endTime: '2025-04-15T17:00:00',
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
    text: '会议中提到的防火墙创新主要包括：\n\n1. 与AI技术的融合，通过小模型加协同的方式在设备侧实现安全功能；\n\n2. 引入了两个AI小助手，小恒和小安，以自然语言接口提供个性化配置指南和帮助，简化了客户的操作\n\n3. 实现了防火墙与平台及周边产品的良好联动与对接，打通了数据日志分析和处置的整个流程；\n\n4. 提供了防火墙一体化的MS云托管服务，支持客户在节假日将防火墙托管到云端，由专人帮助运营。',
    // text: '技术展示与演示将于2025年4月15日14:00开始。此信息基于当前安排，如有变动，请以官方最新通知为准。',
    message_id: '7427092700001401',
    timestamp: 0,
  },
  timestamp: 1743174269356,
  _final: false,
};

export const TRANSCRIPTION_THUMBNAILS = new Map([
  [10, require('../../assets/imgs/thumbnails/02-51.png')],
  [32, require('../../assets/imgs/thumbnails/08-53.png')],
  [36, require('../../assets/imgs/thumbnails/10-03.png')],
  [38, require('../../assets/imgs/thumbnails/10-31.png')],
  [39, require('../../assets/imgs/thumbnails/10-52.png')],
]);

export const TEST_DATA_REF_TRANSCRIPTION = {
  type: 'reference',
  timestamp: 1743174269375,
  _final: false,
  data: {
    message_id: '7634640000004581',
    timestamp: 0,
    reference: [
      {
        sentenceId: 10,
        startTime: 171050,
        endTime: 184230,
        text: '下面我向大家汇报我们在防火墙和AI融合方面增强的一些发布的功能。我们知道防火墙实际上是一个历史非常长的产品。',
      },
      {
        sentenceId: 32,
        startTime: 533780,
        endTime: 551050,
        text: '最后一部分，我简单介绍一下防火墙安全运营方面的增强。我们引入了阿凡达，在大模型框架加持下，给防火墙内置了两个AI小助手，小恒和小安。注意，此处将“阿凡提”修正为更符合语境的“阿凡达”。',
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
  answer: '技术展示与演示将于2025年4月15日14:00开始。',
  reference: [
    {
      meetingId: '5',
      title: '技术展示与演示',
      location: '杭州国际博览中心-505E',
      description: '展示最新的数字安全技术与产品',
      startTime: '2025-04-15T14:00:00',
      endTime: '2025-04-15T17:00:00',
    },
  ],
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
