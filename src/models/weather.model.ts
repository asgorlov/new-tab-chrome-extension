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
 * @interface
 */
export interface WeatherData {
  data: HourlyWeatherDataForDay[];
  lastApiCall: Date | null;
}

/**
 * Интерфейс с параметрами погоды за час для отображения
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
 * @interface
 */
export interface AverageTempTextByTimeOfDay {
  night: string;
  morning: string;
  day: string;
  evening: string;
}
