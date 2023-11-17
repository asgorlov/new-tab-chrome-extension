import {
  createContext,
  createRef,
  FC,
  MutableRefObject,
  ReactNode,
  useContext
} from "react";

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
export type TourStepContext = MutableRefObject<HTMLDivElement | null>;

const searchEngineRef = createRef<HTMLDivElement>();
const settingsMenuContentRef = createRef<HTMLDivElement>();
const searchEngineSelectorRef = createRef<HTMLDivElement>();

const TourStepOneContext = createContext<TourStepContext>(searchEngineRef);
const TourStepTwoContext = createContext<TourStepContext>(
  searchEngineSelectorRef
);
const TourStepThreeContext = createContext<TourStepContext>(
  settingsMenuContentRef
);
/**
 * Хук получения контекста для 1 шага ознакомительного тура
 * @category Hooks - Tour
 */
export const useTourStepOneContext = (): TourStepContext =>
  useContext(TourStepOneContext);
/**
 * Хук получения контекста для 2 шага ознакомительного тура
 * @category Hooks - Tour
 */
export const useTourStepTwoContext = (): TourStepContext =>
  useContext(TourStepTwoContext);
/**
 * Хук получения контекста для 3 шага ознакомительного тура
 * @category Hooks - Tour
 */
export const useTourStepThreeContext = (): TourStepContext =>
  useContext(TourStepThreeContext);

/**
 * Компонент провайдеров контекста шагов ознакомительного тура
 * @category Contexts - Tour
 */
const TourContextProvider: FC<TourContextProviderProps> = ({ children }) => {
  return (
    <TourStepOneContext.Provider value={searchEngineRef}>
      <TourStepTwoContext.Provider value={searchEngineSelectorRef}>
        <TourStepThreeContext.Provider
          value={settingsMenuContentRef}
          children={children}
        />
      </TourStepTwoContext.Provider>
    </TourStepOneContext.Provider>
  );
};

export default TourContextProvider;
