import { MutableRefObject } from "react";

export interface TourContextModel {
  searchEngineRef: MutableRefObject<HTMLDivElement | null | undefined>;
  searchEngineSelectorRef: MutableRefObject<HTMLDivElement | null | undefined>;
  settingsMenuContainerClass: string;
}
