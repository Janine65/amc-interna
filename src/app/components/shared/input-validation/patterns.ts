export const InputPatterns = new Map<string, any>([
  ['phone', '[+\\d\\s]*'],
  ['password', '[\\S]{8,}'],
  ['positiveNumber', /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/],
  ['url', '^(http|https)://[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?$'],
  ['image', '.+\\.{1}(jpg|png|gif|bmp)$'],
  ['email', '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'],
]);
