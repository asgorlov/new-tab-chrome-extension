import { WMOCodeType } from "../models/weather.model";

/**
 * Словарь с расшифровкой кодов WMO
 * @category Constants - Widget - Weather
 */
export const WMOCodes: Readonly<Record<WMOCodeType, string>> = {
  [-1]: "noData",
  [0]: "clearSky",
  [1]: "mainlyClear",
  [2]: "partlyCloudy",
  [3]: "overcast",
  [45]: "fog",
  [48]: "depositingRimeFog",
  [51]: "lightDrizzle",
  [53]: "moderateDrizzle",
  [55]: "denseDrizzle",
  [56]: "lightFreezingDrizzle",
  [57]: "denseFreezingDrizzle",
  [61]: "slightRain",
  [63]: "moderateRain",
  [65]: "heavyRain",
  [66]: "lightFreezingRain",
  [67]: "heavyFreezingRain",
  [71]: "slightSnowFall",
  [73]: "moderateSnowFall",
  [75]: "heavySnowFall",
  [77]: "snowGrains",
  [80]: "slightRainShowers",
  [81]: "moderateRainShowers",
  [82]: "violentRainShowers",
  [85]: "slightSnowShowers",
  [86]: "heavySnowShowers",
  [95]: "thunderstorm",
  [96]: "thunderstormWithSlightHail",
  [99]: "thunderstormWithHeavyHail"
};
