import { ReactNode } from "react";

/**
 * Тип возможного времени суток
 * @interface
 */
export type TimeOfDayType = "morning" | "day" | "evening" | "night";

/**
 * Интерфейс температуры в определенное время суток
 * @property timeOfDay - Время суток
 * @property icon - Иконка
 * @property temp - Значение температуры
 * @interface
 */
export interface TempByTimeOfDay {
  timeOfDay: TimeOfDayType;
  icon: ReactNode;
  temp: string;
}

/**
 * Тип возможных параметров погоды
 * @interface
 */
export type WeatherParamNameType = "wind" | "humidity" | "pressure";

/**
 * Интерфейс параметров погоды
 * @property name - Название параметра
 * @property value - Значение параметра
 * @interface
 */
export interface WeatherParam {
  name: WeatherParamNameType;
  value: string;
}

/**
 * Тип возможных WMO-кодов погоды
 * @interface
 */
export type WMOCodeType =
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
