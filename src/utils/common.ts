export const isClient = typeof window !== "undefined";

export const isEmpty = (content: string) => {
  const hasNoContent = !content.trim();
  const isEmptyParagraph = /<p>\s*<\/p>/.test(content);
  const isLineBreakOnly = /<br\s*\/?>/.test(content);

  return hasNoContent || isEmptyParagraph || isLineBreakOnly;
};
