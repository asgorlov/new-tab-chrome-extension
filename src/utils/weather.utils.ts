import {
  AverageTempTextByTimeOfDay,
  HourlyWeatherParamsViewModel,
  HourlyWeatherDataForDay,
  WeatherData
} from "../models/weather.model";
import i18n from "../localizations/i18n";
import { NightPeriod } from "../models/night-period.model";

/**
 * Функция проверки загрузки данных для виджета погоды
 * @category Utilities - Weather
 * @param weather - Объект с данными погоды
 * @returns - <b>True</b>, если необходима загрузка данных
 */
export const shouldBeWeatherDataLoaded = (weather: WeatherData): boolean => {
  if (!weather.lastApiCall) {
    return true;
  }

  return weather.data.length
    ? !weather.lastApiCall.isSameWithoutTime(new Date())
    : weather.lastApiCall.isBefore(new Date());
};

/**
 * Функция проверки условия, что сейчас день или ночь
 * @category Utilities - Weather
 * @param nightPeriod - Ночной период текущего дня
 * @returns - <b>True</b>, если сейчас день
 */
export const isDayNow = (nightPeriod: NightPeriod): boolean => {
  const now = new Date();

  return nightPeriod.sunset &&
    nightPeriod.sunrise &&
    nightPeriod.sunrise.isSameWithoutTime(now)
    ? now.isSameOrAfter(nightPeriod.sunrise) && now.isBefore(nightPeriod.sunset)
    : now.getHours() >= 8 && now.getHours() < 20;
};

/**
 * Функция получения средней температуры за каждые 6 часов суток(ночь, утро, день, вечер)
 * @category Utilities - Weather
 * @param data - Почасовые данные погоды
 * @returns - Массив с усредненной температурой, разбитый на 4 периода по 6 часов
 */
export const getAverageTempTextByTimeOfDay = (
  data: HourlyWeatherDataForDay[]
): AverageTempTextByTimeOfDay => {
  if (data.length) {
    let nightTemp: number = 0;
    let morningTemp: number = 0;
    let dayTemp: number = 0;
    let eveningTemp: number = 0;

    data.forEach(d => {
      const hours = d.time.getHours();

      if (hours < 6) {
        nightTemp += Number(d.temp);
      } else if (hours < 12) {
        morningTemp += Number(d.temp);
      } else if (hours < 18) {
        dayTemp += Number(d.temp);
      } else {
        eveningTemp += Number(d.temp);
      }
    });

    nightTemp /= 6;
    morningTemp /= 6;
    dayTemp /= 6;
    eveningTemp /= 6;

    return {
      night: getRoundedValue(nightTemp),
      morning: getRoundedValue(morningTemp),
      day: getRoundedValue(dayTemp),
      evening: getRoundedValue(eveningTemp)
    };
  }

  return {
    night: "-",
    morning: "-",
    day: "-",
    evening: "-"
  };
};

/**
 * Функция получения локализованных значений параметров погоды
 * @category Utilities - Weather
 * @param data - Почасовые данные погоды
 * @returns - Объект с локализованными параметрами {@link HourlyWeatherParamsViewModel}
 */
export const getCurrentHourWeatherParams = (
  data: HourlyWeatherDataForDay[]
): HourlyWeatherParamsViewModel => {
  const now = new Date();
  const currentHourParams = data.find(
    d => d.time.getHours() === now.getHours()
  );
  if (currentHourParams) {
    const wind = getLocalizedWindText(
      currentHourParams.windSpeed,
      currentHourParams.windDirection
    );
    const humidity = `${currentHourParams.humidity}%`;
    const pressure = getLocalizedPressureText(currentHourParams.pressure);
    const code = currentHourParams.weatherCode;
    const temp = getTempText(currentHourParams.temp);

    return { wind, humidity, pressure, code, temp };
  }

  return {
    wind: "-",
    humidity: "-",
    pressure: "-",
    code: -1,
    temp: "-"
  };
};

const getLocalizedWindText = (speed: number, degrees: number): string => {
  return (
    getRoundedValue(speed) +
    ` ${i18n.t("weather.windSpeedUnit")}` +
    ` ${getLocalizedWindDirectionText(degrees)}`
  );
};

const getLocalizedWindDirectionText = (degrees: number): string => {
  if (degrees > 360 || degrees < 0) {
    return "";
  }

  let key;
  if (degrees > 350 || degrees <= 20) {
    key = "north";
  } else if (degrees > 20 && degrees <= 60) {
    key = "northEast";
  } else if (degrees > 60 && degrees <= 110) {
    key = "east";
  } else if (degrees > 110 && degrees <= 150) {
    key = "southEast";
  } else if (degrees > 150 && degrees <= 200) {
    key = "south";
  } else if (degrees > 200 && degrees <= 240) {
    key = "southWest";
  } else if (degrees > 240 && degrees <= 290) {
    key = "west";
  } else {
    key = "northWest";
  }

  return i18n.t(`weather.windDirection.${key}`);
};

const getLocalizedPressureText = (pressure: number): string => {
  // 1hPa = 0.7506 mmHg
  const convertedPressure = getRoundedValue(pressure * 0.7506);
  return `${convertedPressure} ${i18n.t("weather.pressureUnit")}`;
};

const getTempText = (temp: number): string => {
  const value = getRoundedValue(temp);
  if (value <= "0") {
    return value;
  }

  return `+${value}`;
};

const getRoundedValue = (temp: number): string => Math.round(temp).toString();
