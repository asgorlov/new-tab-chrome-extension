import { createContext, FC, ReactNode, useRef } from "react";
import { TourContextModel } from "../models/tour-context.model";

/**
 * Интерфейс входных параметров контекста ознакомительного тура
 * @interface
 */
interface TourContextProviderProps {
  children: ReactNode | undefined;
}

/**
 * Контекст ознакомительного тура
 */
export const TourContext = createContext<TourContextModel | undefined>(
  undefined
);

/**
 * Провайдер контекста ознакомительного тура
 */
const TourContextProvider: FC<TourContextProviderProps> = ({ children }) => {
  const tourContext: TourContextModel = {
    searchEngineRef: useRef<HTMLDivElement>(),
    searchEngineSelectorRef: useRef<HTMLDivElement>(),
    settingsMenuContainerClass: ""
  };

  return <TourContext.Provider value={tourContext} children={children} />;
};

export default TourContextProvider;
