import { MutableRefObject } from "react";

/**
 * Интерфейс контекста для ознакомительного тура
 * @interface TourContextModel
 */
export interface TourContextModel {
  /**
   * Ref компонента поисковой системы
   */
  searchEngineRef: MutableRefObject<HTMLDivElement | null | undefined>;
  /**
   * Ref компонента переключения поисковых систем
   */
  searchEngineSelectorRef: MutableRefObject<HTMLDivElement | null | undefined>;
  /**
   * Класс меню настроек
   */
  settingsMenuContainerClass: string;
}
