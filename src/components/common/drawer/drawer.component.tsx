import { FC, memo, ReactNode } from "react";
import { Drawer, DrawerProps } from "antd";
import clsx from "clsx";
import { GetContainer } from "@rc-component/portal/es/Portal";

export interface DrawerComponentProps extends DrawerProps {
  isDark?: boolean;
  children?: ReactNode;
  menuClassName?: string;
}

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
          { background: isDark ? "#292c35" : "#fff" },
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
