import { Tooltip } from "antd";
import { FC, memo, ReactNode } from "react";
import { TooltipPropsWithTitle } from "antd/es/tooltip";
import clsx from "clsx";

/**
 * Передаваемые параметры для компонента тултип
 * @property isDark - Флаг темной темы
 * @property children - Компоненты-потомки
 * @interface
 */
export interface TooltipComponentProps extends TooltipPropsWithTitle {
  isDark?: boolean;
  children?: ReactNode;
}

/**
 * Компонент тултипа
 * @category Components
 */
const TooltipComponent: FC<TooltipComponentProps> = memo(
  ({
    isDark = false,
    children,
    placement = "top",
    overlayClassName = "",
    ...rest
  }) => {
    return (
      <Tooltip
        {...rest}
        children={children}
        placement={placement}
        overlayClassName={clsx(
          "new-tab__tooltip",
          { dark: isDark },
          overlayClassName
        )}
      />
    );
  }
);

export default TooltipComponent;
