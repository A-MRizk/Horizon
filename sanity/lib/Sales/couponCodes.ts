export const COUPON_CODES = {
  BFRIDAY: "BFRIDAY",
  CMAS2021: "CMAS2021",
  NY2022: "NY2022",
} as const;
export type CouponCode = keyof typeof COUPON_CODES;
