import React, { FC, memo } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { WMOCodes } from "../../../constants/weather.constants";
import TooltipComponent from "../../common/tooltip/tooltip.component";
import {
  TimeOfDayType,
  HourlyWeatherParamsViewModel,
  AverageTempTextByTimeOfDay
} from "../../../models/weather.model";
import { selectWeatherLoading } from "../../../store/new-tab/new-tab.selectors";
import { useSelector } from "react-redux";
import { ReactComponent as WindIcon } from "../../../static/svgs/widgets/weather/wp_wind.svg";
import { ReactComponent as PressureIcon } from "../../../static/svgs/widgets/weather/wp_pressure.svg";
import { ReactComponent as HumidityIcon } from "../../../static/svgs/widgets/weather/wp_humidity.svg";
import SkeletonNode from "antd/es/skeleton/Node";

/**
 * Передаваемые параметры компонента виджета погоды
 * @property timeOfDay - Время суток (день или ночь)
 * @property tempByTimeOfDay - Температура в разное время суток
 * @property weatherParams - Параметры погоды (ветер, влажность и т.д.)
 * @interface
 */
export interface WeatherComponentProps {
  timeOfDay: TimeOfDayType;
  tempByTimeOfDay: AverageTempTextByTimeOfDay;
  weatherParams: HourlyWeatherParamsViewModel;
}

/**
 * Компонент виджета погоды
 * @category Components
 */
const WeatherComponent: FC<WeatherComponentProps> = memo(
  ({ timeOfDay, tempByTimeOfDay, weatherParams }) => {
    const { t } = useTranslation();
    const loading = useSelector(selectWeatherLoading);

    const wmoName = WMOCodes[weatherParams.code];
    const paramViewModels = [
      {
        name: "pressure",
        icon: <PressureIcon />,
        value: weatherParams.pressure
      },
      {
        name: "humidity",
        icon: <HumidityIcon />,
        value: weatherParams.humidity
      },
      {
        name: "wind",
        icon: <WindIcon />,
        value: weatherParams.wind
      }
    ];
    const tempByTimeOfDayViewModels = [
      {
        name: "night",
        value: `${tempByTimeOfDay.night}°`
      },
      {
        name: "morning",
        value: `${tempByTimeOfDay.morning}°`
      },
      {
        name: "day",
        value: `${tempByTimeOfDay.day}°`
      },
      {
        name: "evening",
        value: `${tempByTimeOfDay.evening}°`
      }
    ];

    return (
      <div className="new-tab__weather" data-time-of-day={timeOfDay}>
        <div className="new-tab__weather-temp">
          <TooltipComponent
            open={loading ? false : undefined}
            mouseEnterDelay={0.5}
            overlayClassName="new-tab__weather-temp__now__popup"
            title={t(`weather.types.${wmoName}`)}
          >
            {loading ? (
              <div className="new-tab__weather-temp__now">
                <SkeletonNode
                  className="new-tab__weather-temp__now__skeleton"
                  children={<div />}
                  active
                />
                <SkeletonNode
                  className="new-tab__weather-temp__now__skeleton"
                  children={<div />}
                  active
                />
              </div>
            ) : (
              <div className="new-tab__weather-temp__now">
                <div
                  className={clsx("new-tab__weather-temp__now_icon", wmoName)}
                />
                <div className="new-tab__weather-temp__now_value">
                  {weatherParams.temp}
                </div>
              </div>
            )}
          </TooltipComponent>
          <ul className="new-tab__weather-temp__times-of-day">
            {tempByTimeOfDayViewModels.map(item => {
              return (
                <li
                  key={item.name}
                  className="new-tab__weather-temp__times-of-day_item"
                >
                  <span>{t(`weather.timesOfDay.${item.name}`)}</span>
                  {loading ? (
                    <SkeletonNode
                      className="new-tab__weather-temp__times-of-day_item__skeleton"
                      children={<div />}
                      active
                    />
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <hr className="new-tab__weather-delimiter" />
        <ul className="new-tab__weather-params">
          {paramViewModels.map(item => {
            return (
              <li key={item.name} className="new-tab__weather-params_item">
                {item.icon}
                <span className="new-tab__weather-params_item-value">
                  {": "}
                  {loading ? (
                    <SkeletonNode
                      className="new-tab__weather-params_item-value__skeleton"
                      children={<div />}
                      active
                    />
                  ) : (
                    <>{item.value}</>
                  )}
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
