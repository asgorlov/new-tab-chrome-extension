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
import { MenuSetting } from "../constants/settings-menu.constants";

interface SettingRefsContextProviderProps {
  children: ReactNode;
}

const SettingRefsContext = createContext<
  SettingsStorage<MutableRefObject<HTMLDivElement | null>>
>({});

const SettingRefsContextProvider: FC<SettingRefsContextProviderProps> = ({
  children
}) => {
  const refsStorage = useMemo(() => {
    const storage = {};

    Object.values(MenuSetting).forEach(s => {
      Object.assign(storage, { [s]: createRef<HTMLDivElement>() });
    });

    return storage;
  }, []);

  return (
    <SettingRefsContext.Provider value={refsStorage} children={children} />
  );
};

export const useSettingRefsContext = (): SettingsStorage<
  MutableRefObject<HTMLDivElement | null>
> => useContext(SettingRefsContext);

export default SettingRefsContextProvider;
