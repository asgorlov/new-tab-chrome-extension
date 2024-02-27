import React, { FC, memo } from "react";

export interface WeatherComponentProps {}

/**
 * Компонент виджета погоды
 * @category Components
 */
const WeatherComponent: FC<WeatherComponentProps> = memo(() => {
  return <div className="new-tab__weather"></div>;
});

export default WeatherComponent;
