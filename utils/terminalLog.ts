const LOG_PREFIX = 'ASYNC-STOARGE';

export const Terminal = (prefix: string) => ({
  success: (content: string) => console.log(prefix + 'Success ' + content),
  error: (content: string, err: any) => console.log(prefix + 'Error ' + content),
});
