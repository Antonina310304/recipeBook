export const fastRandString: (count: number) => string = (count) => {
  return new Array(count)
    .fill("")
    .map(() => (~~(Math.random() * 36)).toString(36))
    .join("");
};
