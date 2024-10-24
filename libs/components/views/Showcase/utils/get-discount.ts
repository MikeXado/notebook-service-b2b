export function getDiscount(amount: number, percent: number) {
  const onePercent = amount / 100
  return Math.floor(amount - percent * onePercent)
}
