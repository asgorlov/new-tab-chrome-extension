import { FC, memo, ReactNode } from "react";
import clsx from "clsx";
import { Radio, RadioProps } from "antd";

/**
 * Передаваемые параметры для компонента переключателя
 * @property children - Компоненты-потомки
 * @interface
 */
export interface RadioComponentProps extends RadioProps {
  children?: ReactNode;
}

/**
 * Компонент переключателя
 * @category Components
 */
const RadioComponent: FC<RadioComponentProps> = memo(
  ({ children, className = "", ...rest }) => {
    return (
      <Radio
        children={children}
        className={clsx("new-tab__radio", className)}
        {...rest}
      />
    );
  }
);

export default RadioComponent;
