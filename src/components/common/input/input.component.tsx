import React, { FC, memo, ReactNode } from "react";
import { Input } from "antd";
import { InputProps } from "rc-input";
import clsx from "clsx";

/**
 * Передаваемые параметры для компонента меню
 * @property children - Компоненты-потомки
 * @interface
 */
export interface InputComponentProps extends InputProps {
  children?: ReactNode;
}

/**
 * Компонент поля ввода
 * @category Components
 */
const InputComponent: FC<InputComponentProps> = memo(
  ({ children, className, ...rest }) => {
    return (
      <Input
        className={clsx("new-tab__input", className)}
        children={children}
        {...rest}
      />
    );
  }
);

export default InputComponent;
