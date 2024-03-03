import React, { FC, useMemo } from "react";
import WeatherComponent from "./weather.component";
import { useSelector } from "react-redux";
import { selectNightPeriod } from "../../../store/new-tab/new-tab.selectors";
import { ReactComponent as MorningIcon } from "../../../static/svgs/widgets/weather/tod-morning.svg";
import { ReactComponent as DayIcon } from "../../../static/svgs/widgets/weather/tod-day.svg";
import { ReactComponent as EveningIcon } from "../../../static/svgs/widgets/weather/tod-evening.svg";
import { ReactComponent as NightIcon } from "../../../static/svgs/widgets/weather/tod-night.svg";
import { ReactComponent as WindIcon } from "../../../static/svgs/widgets/weather/wp_wind.svg";
import { ReactComponent as PressureIcon } from "../../../static/svgs/widgets/weather/wp_pressure.svg";
import { ReactComponent as HumidityIcon } from "../../../static/svgs/widgets/weather/wp_humidity.svg";
import {
  TimeOfDayType,
  WeatherParamViewModel
} from "../../../models/weather.model";

const WeatherContainer: FC = () => {
  const nightPeriod = useSelector(selectNightPeriod);

  // toDo: временные констаны
  const timeOfDay = useMemo((): TimeOfDayType => {
    const now = new Date();
    const isDay =
      nightPeriod.sunset &&
      nightPeriod.sunrise &&
      nightPeriod.sunrise.isSameWithoutTime(now)
        ? now.isSameOrAfter(nightPeriod.sunrise) &&
          now.isBefore(nightPeriod.sunset)
        : now.getHours() >= 8 && now.getHours() < 20;

    return isDay ? "day" : "night";
  }, [nightPeriod]);

  const tempByTimesOfDay = useMemo((): WeatherParamViewModel[] => {
    return [
      {
        name: "morning",
        icon: <MorningIcon />,
        value: "-10"
      },
      {
        name: "day",
        icon: <DayIcon />,
        value: "0"
      },
      {
        name: "evening",
        icon: <EveningIcon />,
        value: "+10"
      },
      {
        name: "night",
        icon: <NightIcon />,
        value: "-25"
      }
    ];
  }, []);

  const weatherParams = useMemo((): WeatherParamViewModel[] => {
    return [
      {
        name: "wind",
        icon: <WindIcon />,
        value: "10 м/с ЮЗ"
      },
      {
        name: "humidity",
        icon: <HumidityIcon />,
        value: "80%"
      },
      {
        name: "pressure",
        icon: <PressureIcon />,
        value: "760 мм.рт.ст"
      }
    ];
  }, []);

  return (
    <WeatherComponent
      timeOfDay={timeOfDay}
      tempByTimeOfDay={tempByTimesOfDay}
      weatherParams={weatherParams}
      weatherCode={85}
      currentTemp={"+40"}
    />
  );
};

export default WeatherContainer;
