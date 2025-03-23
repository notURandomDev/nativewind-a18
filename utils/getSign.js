import { HmacSHA256, enc } from 'crypto-js';

export const getSign = (key, secret) => {
  // 生成毫秒级时间戳
  const timestamp = Date.now();

  // 拼接数据：timestamp + secret + key（用换行符分隔）
  const data = `${timestamp}\n${secret}\n${key}`;

  // 计算 HMAC-SHA256 签名
  const hmac = HmacSHA256(data, secret);

  // 将签名转为 Base64 字符串
  const signBase64 = enc.Base64.stringify(hmac);

  // 拼接时间戳和签名
  return `${timestamp}${signBase64}`;
};
