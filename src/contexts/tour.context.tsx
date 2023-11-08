import { createContext, FC, ReactNode, useContext, useRef } from "react";
import { TourContextModel } from "../models/tour-context.model";

/**
 * Интерфейс провайдера контекста ознакомительного тура
 * @param children - Потомки, куда передается контекст
 * @interface
 */
export interface TourContextProviderProps {
  children: ReactNode;
}

const TourContext = createContext<TourContextModel | null>(null);

/**
 * Хук получения контекста ознакомительного тура
 * @category Hooks - Tour
 */
export const useTourContext = () => useContext(TourContext);

/**
 * Компонент провайдера контекста ознакомительного тура
 * @category Contexts - Tour
 */
const TourContextProvider: FC<TourContextProviderProps> = ({ children }) => {
  const tourContext: TourContextModel = {
    searchEngineRef: useRef<HTMLDivElement>(),
    searchEngineSelectorRef: useRef<HTMLDivElement>(),
    settingsMenuContentClass: ""
  };

  return <TourContext.Provider value={tourContext} children={children} />;
};

export default TourContextProvider;
