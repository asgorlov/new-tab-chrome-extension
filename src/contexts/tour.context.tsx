import { createContext, FC, ReactNode, useRef } from "react";
import { TourContextModel } from "../models/tour-context.model";

export const TourContext = createContext<TourContextModel | undefined>(
  undefined
);

interface TourContextProviderProps {
  children: ReactNode | undefined;
}

const TourContextProvider: FC<TourContextProviderProps> = ({ children }) => {
  const tourContext: TourContextModel = {
    searchEngineRef: useRef<HTMLDivElement>(),
    searchEngineSelectorRef: useRef<HTMLDivElement>(),
    settingsMenuContainerClass: ""
  };

  return <TourContext.Provider value={tourContext} children={children} />;
};

export default TourContextProvider;
