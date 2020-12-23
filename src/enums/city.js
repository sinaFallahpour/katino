import { cities } from "./cities";

export const findCities = (cityId) => {
  let typeOfParam = parseInt(cityId);

  if (typeOfParam) {
    const findedCity = cities.filter(
      (item) => item.cityDivisionCode === parseInt(cityId)
    );

    return findedCity[0]?.cityName ? findedCity[0]?.cityName : "نامشخص";
  } else {
    return cityId;
  }
};
