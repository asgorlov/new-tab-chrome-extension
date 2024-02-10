import {
  createContext,
  createRef,
  FC,
  MutableRefObject,
  ReactNode,
  useContext
} from "react";
import { InputRef } from "antd";

/**
 * Интерфейс провайдера контекста ознакомительного тура
 * @param children - Потомки, которым передается контекст
 * @interface
 */
export interface TourContextProviderProps {
  children: ReactNode;
}
/**
 * Тип контекста для шага ознакомительного тура
 * @property current - Ref элемента
 * @interface
 */
export type TourStepContext<T> = MutableRefObject<T | null>;

const searchEngineRef = createRef<HTMLDivElement>();
const searXngUrlInputRef = createRef<InputRef>();
const settingsMenuContentRef = createRef<HTMLDivElement>();
const searchEngineSelectorRef = createRef<HTMLDivElement>();

const TourStepOneContext =
  createContext<TourStepContext<HTMLDivElement>>(searchEngineRef);
const TourStepTwoContext = createContext<TourStepContext<HTMLDivElement>>(
  searchEngineSelectorRef
);
const TourStepThreeContext = createContext<TourStepContext<HTMLDivElement>>(
  settingsMenuContentRef
);
const TourStepFourContext =
  createContext<TourStepContext<InputRef>>(searXngUrlInputRef);
/**
 * Хук получения контекста для 1 шага ознакомительного тура
 * @category Hooks - Tour
 */
export const useTourStepOneContext = (): TourStepContext<HTMLDivElement> =>
  useContext(TourStepOneContext);
/**
 * Хук получения контекста для 2 шага ознакомительного тура
 * @category Hooks - Tour
 */
export const useTourStepTwoContext = (): TourStepContext<HTMLDivElement> =>
  useContext(TourStepTwoContext);
/**
 * Хук получения контекста для 3 шага ознакомительного тура
 * @category Hooks - Tour
 */
export const useTourStepThreeContext = (): TourStepContext<HTMLDivElement> =>
  useContext(TourStepThreeContext);
/**
 * Хук получения контекста для 4 шага ознакомительного тура
 * @category Hooks - Tour
 */
export const useTourStepFourContext = (): TourStepContext<InputRef> =>
  useContext(TourStepFourContext);

/**
 * Компонент провайдеров контекста шагов ознакомительного тура
 * @category Contexts - Tour
 */
const TourContextProvider: FC<TourContextProviderProps> = ({ children }) => {
  return (
    <TourStepOneContext.Provider value={searchEngineRef}>
      <TourStepTwoContext.Provider value={searchEngineSelectorRef}>
        <TourStepThreeContext.Provider value={settingsMenuContentRef}>
          <TourStepFourContext.Provider
            value={searXngUrlInputRef}
            children={children}
          />
        </TourStepThreeContext.Provider>
      </TourStepTwoContext.Provider>
    </TourStepOneContext.Provider>
  );
};

export default TourContextProvider;
