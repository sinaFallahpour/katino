export function adverStatus(type) {
  switch (type) {
    case 1:
      return "فعال";

    case 2:
      return "پیش نویس";

    case 3:
      return "آرشیو";

    case 4:
      return "پایان یافته";

    case 5:
      return "غیر فعال";

    case 6:
      return "منقضی شده";
  }
}
