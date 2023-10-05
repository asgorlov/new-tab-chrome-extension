import { FC, memo, ReactNode } from "react";
import { Drawer, DrawerProps } from "antd";
import clsx from "clsx";
import { GetContainer } from "@rc-component/portal/es/Portal";
import {
  DARK_THEME,
  LIGHT_THEME
} from "../../../constants/search-engine.constants";

/**
 * Передаваемые параметры для компонента меню
 * @property isDark - Флаг темной темы
 * @property children - Компоненты-потомки
 * @property menuClassName - Название класса стилей для меню настроек
 * @interface
 */
export interface DrawerComponentProps extends DrawerProps {
  isDark?: boolean;
  children?: ReactNode;
  menuClassName?: string;
}

/**
 * Компонент меню
 * @category Components
 */
const DrawerComponent: FC<DrawerComponentProps> = memo(
  ({
    isDark = false,
    children,
    closable = false,
    className,
    placement = "right",
    bodyStyle = {},
    drawerStyle = {},
    getContainer,
    menuClassName,
    contentWrapperStyle = {},
    ...rest
  }) => {
    const containerGetFunction = (): GetContainer | undefined => {
      if (getContainer) {
        return getContainer;
      }

      if (menuClassName) {
        const menuElement = document.querySelector(`.${menuClassName}`);

        if (menuElement) {
          return () => menuElement;
        }
      }
    };

    return (
      <Drawer
        className={clsx("new-tab__drawer", { dark: isDark }, className)}
        contentWrapperStyle={Object.assign(
          { width: "300px" },
          contentWrapperStyle
        )}
        drawerStyle={Object.assign(
          { background: isDark ? DARK_THEME : LIGHT_THEME },
          drawerStyle
        )}
        bodyStyle={Object.assign({ padding: "0" }, bodyStyle)}
        getContainer={containerGetFunction()}
        placement={placement}
        closable={closable}
        children={children}
        {...rest}
      />
    );
  }
);

export default DrawerComponent;
