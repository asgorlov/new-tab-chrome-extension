import React, { FC, JSX, ReactNode } from "react";
import {
  convertToFixedString,
  getFormattedDateStringForTimeWidget
} from "../../../utils/time.utils";
import { useSelector } from "react-redux";
import { selectTimeSettings } from "../../../store/new-tab/new-tab.selectors";
import clsx from "clsx";

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
  const timeSettings = useSelector(selectTimeSettings);

  const renderClockNumberValue = (value: number): ReactNode =>
    convertToFixedString(value).map((n: string, i: number) => {
      return (
        <span key={i} className="new-tab__time_clock-value">
          {n}
        </span>
      );
    });
  const Colon = (): JSX.Element => (
    <span
      className={clsx("new-tab__time_clock-colon", {
        _animation: timeSettings.showFlashing
      })}
      children=":"
    />
  );

  return (
    <div className="new-tab__time">
      <div
        className={clsx("new-tab__time_clock", {
          _compact: timeSettings.isCompact
        })}
      >
        {renderClockNumberValue(date.getHours())}
        <Colon />
        {renderClockNumberValue(date.getMinutes())}
        {timeSettings.showSeconds && (
          <>
            <Colon />
            {renderClockNumberValue(date.getSeconds())}
          </>
        )}
      </div>
      <hr />
      <div
        className={clsx("new-tab__time_day", {
          _compact: timeSettings.isCompact
        })}
      >
        {getFormattedDateStringForTimeWidget(date)}
      </div>
    </div>
  );
};

export default TimeComponent;
