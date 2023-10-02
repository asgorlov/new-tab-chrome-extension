import { FC, memo, ReactNode } from "react";
import { Drawer, DrawerProps } from "antd";
import clsx from "clsx";
import { GetContainer } from "@rc-component/portal/es/Portal";
import constants from "../../../static/styles/modules/constants.module.scss";

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
          { background: isDark ? constants.darkColor : constants.lightColor },
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
