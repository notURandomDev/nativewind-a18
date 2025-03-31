export const TEST_DATA_REFERENCE: import('./messageTypes').AgentResponseProps = {
  type: 'reference',
  timestamp: 1743174269356,
  _final: false,
  data: {
    message_id: '7634640000004581',
    timestamp: 0,
    reference: [
      {
        meetingId: '2',
        title: '人工智能与安全分论坛',
        location: '杭州国际博览中心-202B',
        description: '探讨人工智能在安全领域的应用与挑战',
        startTime: '2025-04-15T13:00:00',
        endTime: '2025-04-15T16:00:00',
      },
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

export const TEST_DATA_ANSWER = {
  type: 'answer',
  data: {
    text: '技术展示与演示将于2025年4月15日14:00开始。',
    message_id: '7427092700001401',
    timestamp: 0,
  },
  timestamp: 1743174269356,
  _final: false,
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
