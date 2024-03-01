import React, { FC, useMemo } from "react";
import WeatherComponent from "./weather.component";
import { useSelector } from "react-redux";
import { selectNightPeriod } from "../../../store/new-tab/new-tab.selectors";
import { ReactComponent as MorningIcon } from "../../../static/svgs/widgets/weather/tod-morning.svg";
import { ReactComponent as DayIcon } from "../../../static/svgs/widgets/weather/tod-day.svg";
import { ReactComponent as EveningIcon } from "../../../static/svgs/widgets/weather/tod-evening.svg";
import { ReactComponent as NightIcon } from "../../../static/svgs/widgets/weather/tod-night.svg";
import {
  TempByTimeOfDay,
  TimeOfDayType,
  WeatherParam
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

  const tempByTimesOfDay = useMemo((): TempByTimeOfDay[] => {
    return [
      {
        timeOfDay: "morning",
        icon: <MorningIcon />,
        temp: "-10"
      },
      {
        timeOfDay: "day",
        icon: <DayIcon />,
        temp: "0"
      },
      {
        timeOfDay: "evening",
        icon: <EveningIcon />,
        temp: "+10"
      },
      {
        timeOfDay: "night",
        icon: <NightIcon />,
        temp: "-25"
      }
    ];
  }, []);

  const weatherParams = useMemo((): WeatherParam[] => {
    return [
      {
        name: "wind",
        value: "10 м/с ЮЗ"
      },
      {
        name: "humidity",
        value: "80%"
      },
      {
        name: "pressure",
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
