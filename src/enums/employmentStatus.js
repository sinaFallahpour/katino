export function employmentStatus(type) {
  switch (type) {
    case 1:
      return "جویای شغل";
      break;

    case 2:
      return "شاغل";
      break;

    case 3:
      return "به دنبال شغل بهتر";
      break;

    default:
      return "-";
      break;
  }
}
