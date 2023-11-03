import { createContext, FC, ReactNode, useContext, useRef } from "react";
import { TourContextModel } from "../models/tour-context.model";

interface TourContextProviderProps {
  children: ReactNode;
}

const TourContext = createContext<TourContextModel | null>(null);

const TourContextProvider: FC<TourContextProviderProps> = ({ children }) => {
  const tourContext: TourContextModel = {
    searchEngineRef: useRef<HTMLDivElement>(),
    searchEngineSelectorRef: useRef<HTMLDivElement>(),
    settingsMenuContentClass: ""
  };

  return <TourContext.Provider value={tourContext} children={children} />;
};

export const useTourContext = () => useContext(TourContext);

export default TourContextProvider;
