export function calculateRatios(waifu) {
  return ~~(10 - 5 * (waifu.trash / waifu.likes)) > 0
    ? ~~(10 - 5 * (waifu.trash / waifu.likes))
    : 0;
}
