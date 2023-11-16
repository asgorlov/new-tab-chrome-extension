import { FC, memo, ReactNode } from "react";
import { Checkbox, CheckboxProps } from "antd";
import clsx from "clsx";

/**
 * Передаваемые параметры для компонента чекбокса
 * @property children - Компоненты-потомки
 * @interface
 */
export interface CheckboxComponentProps extends CheckboxProps {
  children?: ReactNode;
}

/**
 * Компонент чекбокса
 * @category Components
 */
const CheckboxComponent: FC<CheckboxComponentProps> = memo(
  ({ children, className = "", ...rest }) => {
    return (
      <Checkbox
        children={children}
        className={clsx("new-tab__checkbox", className)}
        {...rest}
      />
    );
  }
);

export default CheckboxComponent;
