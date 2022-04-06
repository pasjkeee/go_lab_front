export type BaseOptions = "numeric" | "2-digit" | undefined;
export type MonthOptions = BaseOptions | "long" | "short" | "narrow";

export const dateOptions = {
  day: "numeric" as BaseOptions,
  month: "numeric" as MonthOptions,
  year: "numeric" as BaseOptions,
  hour: "2-digit" as BaseOptions,
  minute: "2-digit" as BaseOptions,
  second: "2-digit" as BaseOptions,
};
