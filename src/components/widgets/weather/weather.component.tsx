import React, { FC, memo } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { WMOCodes } from "../../../constants/weather.constants";
import TooltipComponent from "../../common/tooltip/tooltip.component";
import {
  TimeOfDayType,
  WeatherParamViewModel,
  WMOCodeType
} from "../../../models/weather.model";

/**
 * Передаваемые параметры компонента виджета погоды
 * @property timeOfDay - Время суток (день или ночь)
 * @property tempByTimeOfDay - Температура в разное время суток
 * @property weatherParams - Параметры погоды (ветер, влажность и т.д.)
 * @property weatherCode - Числовой код текущей погоды (ясно, пасмурно и т.д.)
 * @property currentTemp - Текущая температура
 * @interface
 */
export interface WeatherComponentProps {
  timeOfDay: TimeOfDayType;
  tempByTimeOfDay: WeatherParamViewModel[];
  weatherParams: WeatherParamViewModel[];
  weatherCode: WMOCodeType;
  currentTemp: string;
}

/**
 * Компонент виджета погоды
 * @category Components
 */
const WeatherComponent: FC<WeatherComponentProps> = memo(
  ({ timeOfDay, tempByTimeOfDay, weatherParams, weatherCode, currentTemp }) => {
    const { t } = useTranslation();

    const wmoName = WMOCodes[weatherCode];

    return (
      <div className="new-tab__weather" data-time-of-day={timeOfDay}>
        <div className="new-tab__weather-temp">
          <div className="new-tab__weather-temp__now">
            <div className={clsx("new-tab__weather-temp__now_icon", wmoName)} />
            <div className="new-tab__weather-temp__now_value">
              {currentTemp}
            </div>
          </div>
          <span className="new-tab__weather-temp__description">
            {t(`weather.types.${wmoName}`)}
          </span>
          <ul className="new-tab__weather-temp__times-of-day">
            {tempByTimeOfDay.map(item => {
              return (
                <TooltipComponent
                  mouseEnterDelay={0.5}
                  align={{ offset: [0, "-18%"] }}
                  className="new-tab__weather-temp__times-of-day_item"
                  overlayClassName="new-tab__weather-temp__times-of-day_item__popup"
                  title={t(`weather.timesOfDay.${item.name}`)}
                  key={item.name}
                >
                  <li>
                    <>{item.icon}</>
                    <span>{item.value}</span>
                  </li>
                </TooltipComponent>
              );
            })}
          </ul>
        </div>
        <hr className="new-tab__weather-delimiter" />
        <ul className="new-tab__weather-params">
          {weatherParams.map(item => {
            return (
              <li key={item.name} className="new-tab__weather-params_item">
                {item.icon}
                <span className="new-tab__weather-params_item-value">
                  {": "}
                  {item.value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

export default WeatherComponent;
