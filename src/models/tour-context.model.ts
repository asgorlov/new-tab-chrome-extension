import { MutableRefObject } from "react";

/**
 * Интерфейс контекста для ознакомительного тура
 * @property searchEngineRef - Ref компонента поисковой системы
 * @property searchEngineSelectorRef - Ref компонента переключения поисковых систем
 * @property settingsMenuContentClass - Класс меню настроек
 * @interface
 */
export interface TourContextModel {
  searchEngineRef: MutableRefObject<HTMLDivElement | null | undefined>;
  searchEngineSelectorRef: MutableRefObject<HTMLDivElement | null | undefined>;
  settingsMenuContentClass: string;
}
