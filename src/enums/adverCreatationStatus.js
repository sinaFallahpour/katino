export function adverCreatationStatus(type) {
  switch (type) {
    case 1:
      return "درحال بررسی";
      break;

    case 3:
      return "پذیرفته شده";
      break;

    case 2:
      return "رد شده";
      break;

    case 4:
      return "برگشت خورده";
      break;
  }
}
