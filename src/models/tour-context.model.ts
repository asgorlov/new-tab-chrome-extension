import { MutableRefObject } from "react";

export interface TourContextModel {
  searchEngineRef: MutableRefObject<HTMLDivElement | null | undefined>;
  settingsMenuClass: string;
  searchEngineSelectorRef: MutableRefObject<HTMLDivElement | null | undefined>;
}
