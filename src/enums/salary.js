export function salary(type) {
  switch (type) {
    case 1:
      return "کمتر از 1 میلیون تومان";
      break;

    case 2:
      return "بین 1 تا 2.5 میلیون تومان";
      break;

    case 3:
      return "بین 2.5 تا 3.5 میلیون تومان";
      break;

    case 4:
      return "بین 3.5 تا 5 میلیون تومان";
      break;

    case 5:
      return "بین 5 تا 8 میلیون تومان";
      break;

    case 6:
      return "بیشتر از یک میلیون تومان";
      break;
  }
}
