export function salary(type) {
  switch (type) {
    case 1:
      return "کمتر از 1 میلیون تومان";

    case 2:
      return "بین 1 تا 2.5 میلیون تومان";

    case 3:
      return "بین 2.5 تا 3.5 میلیون تومان";

    case 4:
      return "بین 3.5 تا 5 میلیون تومان";

    case 5:
      return "بین 5 تا 8 میلیون تومان";

    case 6:
      return "بیشتر از 8 میلیون تومان";

    case 7:
      return "بصورت توافقی";

    case 8:
      return "قانون کار";
  }
}
