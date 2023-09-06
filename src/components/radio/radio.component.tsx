import { FC, memo, ReactNode } from "react";
import clsx from "clsx";
import { Radio, RadioProps } from "antd";

/**
 * Передаваемые параметры для компонента переключателя
 * @property isDark - Флаг темной темы
 * @property children - Компоненты-потомки
 * @interface
 */
export interface RadioComponentProps extends RadioProps {
  isDark?: boolean;
  children?: ReactNode;
}

/**
 * Компонент переключателя
 * @category Components
 */
const RadioComponent: FC<RadioComponentProps> = ({
  isDark = false,
  children,
  className = "",
  ...rest
}) => {
  return (
    <Radio
      children={children}
      className={clsx("new-tab__radio", { dark: isDark }, className)}
      {...rest}
    />
  );
};

export default memo(RadioComponent);
