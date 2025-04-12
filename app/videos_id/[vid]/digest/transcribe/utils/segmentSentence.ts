import { KnowledgeDataProps, SentenceProps, SentenceSegmentProps } from '../types';

// 该函数在一句话的基础上进一步分割（知识卡片）
const segmentSentence = (sentence: SentenceProps) => {
  // 将一句话进行分割后的结果
  const segments: Array<SentenceSegmentProps> = [];
  // 将句子中的知识卡片数据反序列化
  const terms: Array<KnowledgeDataProps> = sentence.card && JSON.parse(sentence.card).terms;

  // 如果card是一个空数组，就不用进行分割，直接返回原始句子
  /* if (!terms.length) {
      return [{ text: sentence.text, isTerm: false, segmentId: `sentence-${sentence.id}-no-card` }];
    } */

  // const parsedText = JSON.parse(sentence.text);
  const parsedText = sentence.text;

  let plainTextStartIndex = 0;
  // 对知识卡片数组进行遍历
  terms.forEach((term: KnowledgeDataProps, index) => {
    if (!term.positions.length) {
      const segmentId = `sentence-${sentence.index}-invalid-term-segment-${index}`;
      segments.push({
        text: term.term,
        isTerm: false,
        segmentId,
      });
      return;
    }

    const [termTextStartIndex, termTextEndIndex] = term.positions[0];

    // 1. 先把当前知识卡片之前的普通文本push到切片数组中
    // 如果两个term不是连在一起的，才用对plainText进行切割
    if (plainTextStartIndex !== termTextStartIndex) {
      const plainText = parsedText.slice(plainTextStartIndex, termTextStartIndex);
      const segmentId = `sentence-${sentence.index}-segment-${index}-plain-${plainTextStartIndex}`;
      segments.push({
        text: plainText,
        isTerm: false,
        segmentId,
      });
    }

    // 2. 再将当前遍历到的知识卡片push到切片数组中
    const segmentId = `sentence-${sentence.index}-segment-${index}-term`;
    segments.push({
      text: term.term,
      isTerm: true,
      explanation: term.explanation,
      segmentId,
    });

    // 更新普通文本的起始index
    plainTextStartIndex = termTextEndIndex + 1;
  });

  // 如果最后一张知识卡片不是位于一句话的末尾，要将最后一张知识卡片之后的普通文本进行切片，并push到切片数组中
  if (plainTextStartIndex < parsedText.length) {
    const remainingText = parsedText.slice(plainTextStartIndex);
    const segmentId = `sentence-${sentence.index}-segment-last-text`;
    segments.push({
      text: remainingText,
      isTerm: false,
      segmentId,
    });
  }

  return segments;
};

export default segmentSentence;
