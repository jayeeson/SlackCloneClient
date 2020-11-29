const validateWidth = (width: number | string | null, minWidth?: number, maxWidth?: number) => {
  if (!width) {
    return null;
  }
  const num = typeof width === 'string' ? parseInt(width, 10) : width;
  if (minWidth && num < minWidth) {
    return minWidth;
  }
  if (num < 0) {
    return minWidth || 150;
  }
  if (maxWidth && num > maxWidth) {
    return maxWidth;
  }
  return num;
};

export default validateWidth;
