import { ReactNode } from "react";

/**
 * Тип возможного времени суток
 * @interface
 */
export type TimeOfDayType = "morning" | "day" | "evening" | "night";

/**
 * Интерфейс параметров погоды
 * @property name - Название параметра
 * @property value - Значение параметра
 * @interface
 */
export interface WeatherParamViewModel {
  name: string;
  icon: ReactNode;
  value: string;
}

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
