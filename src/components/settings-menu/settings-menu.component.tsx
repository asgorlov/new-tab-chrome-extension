import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Drawer } from "antd";
import { ReactComponent as MenuIcon } from "../../static/svgs/menu-settings/menu-icon.svg";
import clsx from "clsx";
import { CustomWallpaper } from "../../models/custom-wallpaper.model";
import SearchEngineSettingComponent from "./settings/search-engine-setting.component";
import DarkModeSettingComponent from "./settings/dark-mode-setting.component";
import LanguageSettingComponent from "./settings/language-setting.component";
import ResetSettingComponent from "./settings/reset-setting.component";
import WallpaperSettingContainer from "./settings/wallpaper-setting/wallpaper-setting.container";
import UpdateSettingContainer from "./settings/update-setting/update-setting.container";
import { TourContextModel } from "../../models/tour-context.model";

/**
 * Передаваемые параметры для компонента меню настроек
 * @property isDark - Флаг темной темы
 * @property tourCtx - Модель контекста ознакомительно тура
 * @property darkMode - Режимы включения темной темы
 * @property checkMode - Режимы запуска проверки обновлений
 * @property wallpaper - Название фона приложения
 * @property isOpenMenu - Флаг открытия меню настроек
 * @property lastVersion - Последняя версия приложения
 * @property checkLoading - Флаг запуска проверки обновлений
 * @property searchEngine - Выбранная поисковая система
 * @property customWallpaper - Пользовательские фоны
 * @property searchEngineNames - Список выбранных поисковых систем для переключения
 * @property setWallpaper - Функция изменения название фона приложения
 * @property setIsOpenMenu - Функция изменения флага открытия меню настроек
 * @property onClickUpdates - Функция, вызываемая при клике по кнопке запуска обновлений
 * @property onClickSwitcher - Функция переключения темной темы
 * @property onChangeDarkMode - Функция, вызываемая при изменении режима включения темной темы
 * @property onChangeLanguage - Функция, вызываемая при смене языка
 * @property setCustomWallpaper - Функция изменения пользовательских фонов
 * @property onChangeSearchEngines - Функция, вызываемая при изменении списка выбранных поисковых систем
 * @property onChangeCheckForUpdates - Функция, вызываемая при изменении режима запуска проверки обновлений
 * @property onChangeDarkModeCollapse - Функция вызывается при нажатии на сворачиваемый компонент
 * @interface
 */
export interface SettingsMenuComponentProps {
  isDark: boolean;
  tourCtx?: TourContextModel;
  darkMode: string;
  checkMode: string;
  wallpaper: string;
  isOpenMenu: boolean;
  lastVersion: string;
  checkLoading: boolean;
  searchEngine: string;
  customWallpaper: CustomWallpaper | null;
  searchEngineNames: string[];
  setWallpaper: (value: string) => void;
  setIsOpenMenu: (value: boolean) => void;
  onClickUpdates: () => void;
  onClickSwitcher: () => void;
  onChangeDarkMode: (value: string) => void;
  onChangeLanguage: (value: string) => void;
  setCustomWallpaper: (value: CustomWallpaper | null) => void;
  onChangeSearchEngines: (values: string[]) => void;
  onChangeCheckForUpdates: (value: string) => void;
  onChangeDarkModeCollapse: (values: string | string[]) => void;
}

/**
 * Компонент меню настроек
 * @category Components
 */
const SettingsMenuComponent: FC<SettingsMenuComponentProps> = ({
  isDark,
  tourCtx,
  darkMode,
  checkMode,
  wallpaper,
  isOpenMenu,
  lastVersion,
  checkLoading,
  searchEngine,
  customWallpaper,
  searchEngineNames,
  setWallpaper,
  setIsOpenMenu,
  onClickUpdates,
  onClickSwitcher,
  onChangeDarkMode,
  onChangeLanguage,
  setCustomWallpaper,
  onChangeSearchEngines,
  onChangeCheckForUpdates,
  onChangeDarkModeCollapse
}) => {
  const { t } = useTranslation();
  const menuClass = "new-tab__settings-menu";
  const menuContainerClass = "new-tab__settings-menu-container";

  useEffect(() => {
    if (tourCtx) {
      tourCtx.settingsMenuContainerClass = `.${menuContainerClass}`;
    }
  }, [tourCtx]);

  return (
    <div className={menuClass}>
      <Button
        className="new-tab__settings-menu-button"
        type="text"
        onClick={() => setIsOpenMenu(true)}
      >
        <MenuIcon className={`new-tab__settings-menu-icon-${searchEngine}`} />
      </Button>
      <Drawer
        className={clsx(menuContainerClass, { dark: isDark })}
        contentWrapperStyle={{ width: "300px" }}
        drawerStyle={{ background: isDark ? "#292c35" : "#fff" }}
        bodyStyle={{ padding: "0" }}
        title={t("settingsTitle")}
        getContainer={() =>
          document.querySelector(`.${menuClass}`) as HTMLDivElement
        }
        footer={<ResetSettingComponent isDark={isDark} />}
        placement="right"
        open={isOpenMenu}
        closable={false}
        onClose={() => setIsOpenMenu(false)}
      >
        <SearchEngineSettingComponent
          isDark={isDark}
          searchEngineNames={searchEngineNames}
          onChangeSearchEngines={onChangeSearchEngines}
        />
        <DarkModeSettingComponent
          isDark={isDark}
          darkMode={darkMode}
          onClickSwitcher={onClickSwitcher}
          onChangeDarkMode={onChangeDarkMode}
          onChangeDarkModeCollapse={onChangeDarkModeCollapse}
        />
        <WallpaperSettingContainer
          isDark={isDark}
          wallpaper={wallpaper}
          customWallpaper={customWallpaper}
          searchEngine={searchEngine}
          setWallpaper={setWallpaper}
          setCustomWallpaper={setCustomWallpaper}
        />
        <UpdateSettingContainer
          isDark={isDark}
          loading={checkLoading}
          checkMode={checkMode}
          lastVersion={lastVersion}
          onClickUpdates={onClickUpdates}
          onChangeCheckMode={onChangeCheckForUpdates}
        />
        <LanguageSettingComponent
          isDark={isDark}
          onChangeLanguage={onChangeLanguage}
        />
      </Drawer>
    </div>
  );
};

export default SettingsMenuComponent;
