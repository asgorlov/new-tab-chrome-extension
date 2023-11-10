import {
  createContext,
  createRef,
  FC,
  MutableRefObject,
  ReactNode,
  useContext,
  useMemo
} from "react";
import { SettingsStorage } from "../models/settings-search.model";
import {
  CollapsedMenuSetting,
  MenuSetting
} from "../constants/settings-menu.constants";

/**
 * Интерфейс провайдера контекста настроек меню
 * @param children - Потомки, куда передается контекст
 * @interface
 */
export interface SettingRefsContextProviderProps {
  children: ReactNode;
}

const SettingRefsContext = createContext<
  SettingsStorage<MutableRefObject<HTMLDivElement | null>>
>({});

/**
 * Хук получения контекста настроек меню
 * @category Hooks - Settings menu
 */
export const useSettingRefsContext = (): SettingsStorage<
  MutableRefObject<HTMLDivElement | null>
> => useContext(SettingRefsContext);

/**
 * Компонент провайдера контекста настроек меню
 * @category Contexts - Settings menu
 */
const SettingRefsContextProvider: FC<SettingRefsContextProviderProps> = ({
  children
}) => {
  const refsStorage = useMemo(() => {
    const storage = {};

    Object.values({ ...CollapsedMenuSetting, ...MenuSetting }).forEach(s => {
      Object.assign(storage, { [s]: createRef<HTMLDivElement>() });
    });

    return storage;
  }, []);

  return (
    <SettingRefsContext.Provider value={refsStorage} children={children} />
  );
};

export default SettingRefsContextProvider;
