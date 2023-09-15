import { FC, memo, ReactNode } from "react";
import { Popover } from "antd";
import { PopoverProps } from "antd/es/popover";
import clsx from "clsx";

/**
 * Передаваемые параметры для компонента меню
 * @property isDark - Флаг темной темы
 * @property children - Компоненты-потомки
 * @interface
 */
export interface PopoverComponentProps extends PopoverProps {
  isDark?: boolean;
  children?: ReactNode;
}

/**
 * Компонент всплывающего окна
 * @category Components
 */
const PopoverComponent: FC<PopoverComponentProps> = memo(
  ({
    isDark = false,
    trigger = "click",
    children,
    className,
    placement = "bottom",
    rootClassName,
    overlayStyle = {},
    destroyTooltipOnHide = true,
    ...rest
  }) => {
    return (
      <Popover
        className={className ? clsx(className, { dark: isDark }) : ""}
        rootClassName={clsx(
          "new-tab__popover",
          { dark: isDark },
          rootClassName
        )}
        destroyTooltipOnHide={destroyTooltipOnHide}
        overlayStyle={Object.assign({ width: "200px" }, overlayStyle)}
        children={children}
        {...rest}
      />
    );
  }
);

export default PopoverComponent;
