export const repeatAction = (
  action: (...args: any[]) => void,
  repetitions: number
) => {
  for (let i = 0; i < repetitions; i++) action();
};
