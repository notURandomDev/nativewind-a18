const agendas = [
  {
    title: '环节一：领导致辞',
    host: { name: '主持人姓名1', corp: '教育部高等学校网络空间安全专业教学指导委员' },
    subagendas: [
      {
        time: '13:30-13:50',
        title: '致辞',
        list: {
          type: '发言嘉宾',
          data: [
            { label: '嘉宾姓名1', sublabel: '工业和信息化部教育与考试中心主任' },
            { label: '嘉宾姓名2', sublabel: '工业和信息化部教育与考试中心主任' },
            { label: '嘉宾姓名3', sublabel: '工业和信息化部教育与考试中心主任' },
            { label: '嘉宾姓名4', sublabel: '工业和信息化部教育与考试中心主任' },
            { label: '嘉宾姓名5', sublabel: '工业和信息化部教育与考试中心主任' },
          ],
        },
      },
    ],
  },
  {
    title: '环节二：共同体工作规划&成果发布',
    host: { name: '主持人姓名1', corp: '教育部高等学校网络空间安全专业教学指导委员' },
    subagendas: [
      {
        time: '13:50-14:20',
        title: '2025共同体工作规划&成果发布',
        list: {
          type: '发言嘉宾',
          data: [{ label: '嘉宾姓名6', sublabel: '工业和信息化部教育与考试中心主任' }],
        },
      },
      {
        time: '14:25-14:30',
        title: '联合签约仪式',
        list: {
          type: '签约院校',
          data: [
            { label: '北京政法职业学院' },
            { label: '浙江建设职业技术学院' },
            { label: '浙江建设职业技术学院' },
            { label: '浙江建设职业技术学院' },
            { label: '浙江建设职业技术学院' },
            { label: '浙江建设职业技术学院' },
          ],
        },
      },
      {
        time: '14:30-14:50',
        title: '西湖论剑，剑指何方',
        list: {
          type: '发言嘉宾',
          data: [{ label: '北京政法职业学院' }],
        },
      },
    ],
  },
];

export default agendas;
