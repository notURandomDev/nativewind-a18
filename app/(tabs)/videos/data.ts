import { ImageSourcePropType } from 'react-native';
import { ReplayCardProps, TrailerProps } from './types';

export const REPLAY_RECOMMENDATIONS: ReplayCardProps[] = [
  {
    title: '企业数字化与数据出海流通专项会议',
    datetime: '2025年5月17日10:00-13:45',
    venue: '杭州国际博览中心·103A',
    tag: '主论坛',
    views: 13950,
    imgsrc: require('../../../assets/imgs/replay-1.jpg'),
  },
  {
    title: '数据安全创新实践案例集发布活动',
    datetime: '2025年5月17日13:00-15:45',
    venue: '杭州国际博览中心·102B',
    tag: '主论坛',
    views: 12110,
    imgsrc: require('../../../assets/imgs/replay-2.jpg'),
  },
  {
    title: '智能安全运营专家交流会',
    datetime: '2025年5月17日13:00-14:45',
    venue: '杭州国际博览中心·101A',
    tag: '平行会议',
    views: 10950,
    imgsrc: require('../../../assets/imgs/replay-3.jpg'),
  },
  {
    title: 'AI引领数字安全新浪潮专题会议',
    datetime: '2025年5月17日14:00-17:45',
    venue: '杭州国际博览中心·103A',
    views: 8930,
    tag: '生态合作论坛',
    imgsrc: require('../../../assets/imgs/replay-4.jpg'),
  },
];

export const TRAILERS: TrailerProps[] = [
  {
    title: '数据安全创新实践案例集发布',
    datetime: '2025年5月19日9:30-12:20',
    venue: '杭州国际博览中心·103',
    imgsrc: require('../../../assets/imgs/trailer-1.png'),
  },
  {
    title: '数据安全创新实践案例集发布',
    datetime: '2025年5月19日14:30-17:20',
    venue: '杭州国际博览中心·101',
    imgsrc: require('../../../assets/imgs/trailer-2.png'),
  },
  {
    title: '数据安全创新实践案例集发布',
    datetime: '2025年5月19日14:30-17:20',
    venue: '杭州国际博览中心·102',
    imgsrc: require('../../../assets/imgs/trailer-3.png'),
  },
];
