import { FC, memo, ReactNode } from "react";
import { Checkbox, CheckboxProps } from "antd";
import clsx from "clsx";

/**
 * Передаваемые параметры для компонента чекбокса
 * @property isDark - Флаг темной темы
 * @property children - Компоненты-потомки
 * @interface
 */
export interface CheckboxComponentProps extends CheckboxProps {
  isDark?: boolean;
  children?: ReactNode;
}

/**
 * Компонент чекбокса
 * @category Components
 */
const CheckboxComponent: FC<CheckboxComponentProps> = ({
  isDark = false,
  children,
  className = "",
  ...rest
}) => {
  return (
    <Checkbox
      children={children}
      className={clsx("new-tab__checkbox", { dark: isDark }, className)}
      {...rest}
    />
  );
};

export default memo(CheckboxComponent);
