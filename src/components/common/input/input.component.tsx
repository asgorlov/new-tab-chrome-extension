import React, { forwardRef, memo, ReactNode } from "react";
import { Input, InputRef } from "antd";
import clsx from "clsx";
import { InputProps } from "antd/es/input/Input";

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
const InputComponent = memo(
  forwardRef<InputRef, InputComponentProps>(
    ({ children, className, ...rest }, ref) => {
      return (
        <Input
          className={clsx("new-tab__input", className)}
          children={children}
          ref={ref}
          {...rest}
        />
      );
    }
  )
);

export default InputComponent;
