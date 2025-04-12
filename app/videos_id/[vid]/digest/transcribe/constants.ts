/* Data for sse.dev Testing */
export const SSE_RES_4_TESTING_NO_CARDS = {
  _final: true,
  data: {
    beginTime: 16600,
    index: 0,
    taskKey: '1743003043014',
    text: '尊敬的各位领导，各位来宾，现场的媒体朋友们，大家上午好。欢迎来到AI引领智取新城西湖论剑及安肯西西年度新品发布会的现场。我是今天发布会的主持人陈',
  },
  timestamp: 1743003061496,
  type: 'raw',
};

export const SSE_RES_4_TESTING_WITH_CARDS = {
  _final: false,
  data: {
    beginTime: 16600,
    index: 0,
    taskKey: '1743003043014',
    text: '"尊敬的各位领导，各位来宾，现场的媒体朋友们，大家上午好。欢迎来到AI引领智取新城西湖论剑及安肯西西年度新品发布会的现场。我是今天发布会的主持人陈"',
    card: '{"terms": [{"term": "西湖论剑", "positions": [[40, 43]], "explanation": "西湖论剑是中国信息安全领域的重要会议之一，通常涉及网络安全、数据保护、隐私安全等议题，是业内专业人士交流和分享最新研究成果和技术趋势的平台。"}, {"term": "安肯西西", "positions": [[45, 48]], "explanation": "安肯西西（Anken Xixi）可能是指某家专注于网络安全或信息安全的公司，其名称在行业内具有一定的知名度，通常参与或举办与网络安全相关的技术交流和产品发布活动。"}]}',
  },
  timestamp: 1743003061496,
  type: 'missedEnhanced',
};

/* URLs */
export const URL_REAL_BACKEND = `http://192.168.184.53:8088/subscribe`;
export const DEFAULT_TASKKEY = 'meeting1';

/* Environment Variables */
const appKey = process.env.EXPO_PUBLIC_APP_KEY;
const appSecret = process.env.EXPO_PUBLIC_APP_SECRET;
