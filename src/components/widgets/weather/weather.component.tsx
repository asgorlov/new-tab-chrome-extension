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
import { ReactComponent as MorningIcon } from "../../../static/svgs/widgets/weather/tod-morning.svg";
import { ReactComponent as DayIcon } from "../../../static/svgs/widgets/weather/tod-day.svg";
import { ReactComponent as EveningIcon } from "../../../static/svgs/widgets/weather/tod-evening.svg";
import { ReactComponent as NightIcon } from "../../../static/svgs/widgets/weather/tod-night.svg";
import { ReactComponent as WindIcon } from "../../../static/svgs/widgets/weather/wp_wind.svg";
import { ReactComponent as PressureIcon } from "../../../static/svgs/widgets/weather/wp_pressure.svg";
import { ReactComponent as HumidityIcon } from "../../../static/svgs/widgets/weather/wp_humidity.svg";

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
        name: "wind",
        icon: <WindIcon />,
        value: weatherParams.wind
      },
      {
        name: "humidity",
        icon: <HumidityIcon />,
        value: weatherParams.humidity
      },
      {
        name: "pressure",
        icon: <PressureIcon />,
        value: weatherParams.pressure
      }
    ];
    const tempByTimeOfDayViewModels = [
      {
        name: "night",
        icon: <NightIcon />,
        value: tempByTimeOfDay.night
      },
      {
        name: "morning",
        icon: <MorningIcon />,
        value: tempByTimeOfDay.morning
      },
      {
        name: "day",
        icon: <DayIcon />,
        value: tempByTimeOfDay.day
      },
      {
        name: "evening",
        icon: <EveningIcon />,
        value: tempByTimeOfDay.evening
      }
    ];

    return (
      <div className="new-tab__weather" data-time-of-day={timeOfDay}>
        <div className="new-tab__weather-temp">
          <div className="new-tab__weather-temp__now">
            <div className={clsx("new-tab__weather-temp__now_icon", wmoName)} />
            <div className="new-tab__weather-temp__now_value">
              {weatherParams.temp}
            </div>
          </div>
          <span className="new-tab__weather-temp__description">
            {t(`weather.types.${wmoName}`)}
          </span>
          <ul className="new-tab__weather-temp__times-of-day">
            {tempByTimeOfDayViewModels.map(item => {
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
          {paramViewModels.map(item => {
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
