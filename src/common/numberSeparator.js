export function numberSeparator(x) {
  const toRial = x * 10;
  return toRial?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
