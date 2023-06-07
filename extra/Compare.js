export const Compare = (title, text, keyword) => {
  return (
    title.trim().toLowerCase().includes(keyword.trim().toLowerCase()) ||
    text.trim().toLowerCase().includes(keyword.trim().toLowerCase())
  );
};
