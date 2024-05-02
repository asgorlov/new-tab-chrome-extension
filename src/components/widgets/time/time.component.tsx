import React, { FC, ReactNode } from "react";
import {
  convertToFixedString,
  getFormattedDateStringForTimeWidget
} from "../../../utils/time.utils";

/**
 * Передаваемые параметры компонента виджета времени
 * @property date - Текущая дата
 * @interface
 */
export interface TimeComponentProps {
  date: Date;
}

/**
 * Компонент виджета времени
 * @category Components
 */
const TimeComponent: FC<TimeComponentProps> = ({ date }) => {
  const renderClockNumberValue = (value: number): ReactNode =>
    convertToFixedString(value).map((n: string, i: number) => {
      return (
        <span key={i} className="new-tab__time_clock-value">
          {n}
        </span>
      );
    });

  return (
    <div className="new-tab__time">
      <div className="new-tab__time_clock">
        {renderClockNumberValue(date.getHours())}
        <span className="new-tab__time_clock-colon">:</span>
        {renderClockNumberValue(date.getMinutes())}
        <span className="new-tab__time_clock-colon">:</span>
        {renderClockNumberValue(date.getSeconds())}
      </div>
      <hr />
      <div className="new-tab__time_day">
        {getFormattedDateStringForTimeWidget(date)}
      </div>
    </div>
  );
};

export default TimeComponent;
