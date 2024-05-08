import { Location } from "./location.model";

/**
 * Тип времени суток
 * @interface
 */
export type TimeOfDayType = "morning" | "day" | "evening" | "night";

/**
 * Тип возможных WMO-кодов погоды
 * @interface
 */
export type WMOCodeType =
  | -1
  | 0
  | 1
  | 2
  | 3
  | 45
  | 48
  | 51
  | 53
  | 55
  | 56
  | 57
  | 61
  | 63
  | 65
  | 66
  | 67
  | 71
  | 73
  | 75
  | 77
  | 80
  | 81
  | 82
  | 85
  | 86
  | 95
  | 96
  | 99;

/**
 * Интерфейс данных за один час дня, которые были получены с сервера
 * @property time - Время
 * @property temp - Температура
 * @property humidity - Влажность
 * @property weatherCode - Код погоды для иконок
 * @property pressure - Давление
 * @property windSpeed - Скорость ветра
 * @property windDirection - Направление ветра
 * @interface
 */
export interface HourlyWeatherDataForDay {
  time: Date;
  temp: number;
  humidity: number;
  weatherCode: WMOCodeType;
  pressure: number;
  windSpeed: number;
  windDirection: number;
}

/**
 * Интерфейс данных погоды
 * @property data - Данные погоды
 * @property lastApiCallDate - Дата последнего запроса погоды
 * @property lastApiCallLocation - Местоположение, для которого был последний запрос погоды
 * @interface
 */
export interface WeatherData {
  data: HourlyWeatherDataForDay[];
  lastApiCallDate: Date | null;
  lastApiCallLocation: Location | null;
}

/**
 * Интерфейс с параметрами погоды за час для отображения
 * @property wind - Ветер
 * @property humidity - Влажность
 * @property pressure - Давление
 * @property temp - Температра
 * @property code - Код погоды для иконки
 * @interface
 */
export interface HourlyWeatherParamsViewModel {
  wind: string;
  humidity: string;
  pressure: string;
  temp: string;
  code: WMOCodeType;
}

/**
 * Интерфейс с усредненной температурой для 6-часового отрезка времени суток
 * @property night - Ночь
 * @property morning - Утро
 * @property day - День
 * @property evening - Вечер
 * @interface
 */
export interface AverageTempTextByTimeOfDay {
  night: string;
  morning: string;
  day: string;
  evening: string;
}

/**
 * Интерфейс настроек виджета погоды
 * @property location - Выбранное или текущее местоположение для запроса погоды
 * @interface
 */
export interface WeatherSettings {
  location: Location | null;
}
