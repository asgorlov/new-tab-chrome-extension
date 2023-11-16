import { Tooltip } from "antd";
import { FC, memo, ReactNode } from "react";
import { TooltipPropsWithTitle } from "antd/es/tooltip";
import clsx from "clsx";

/**
 * Передаваемые параметры для компонента тултип
 * @property children - Компоненты-потомки
 * @interface
 */
export interface TooltipComponentProps extends TooltipPropsWithTitle {
  children?: ReactNode;
}

/**
 * Компонент тултипа
 * @category Components
 */
const TooltipComponent: FC<TooltipComponentProps> = memo(
  ({ children, placement = "top", overlayClassName = "", ...rest }) => {
    return (
      <Tooltip
        {...rest}
        children={children}
        placement={placement}
        overlayClassName={clsx("new-tab__tooltip", overlayClassName)}
      />
    );
  }
);

export default TooltipComponent;
