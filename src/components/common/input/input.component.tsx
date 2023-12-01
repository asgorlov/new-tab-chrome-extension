import React, { FC, memo, ReactNode } from "react";
import { Input } from "antd";
import { InputProps } from "rc-input";
import clsx from "clsx";

export interface InputComponentProps extends InputProps {
  children?: ReactNode;
}

const InputComponent: FC<InputComponentProps> = memo(
  ({ className, children, ...rest }) => {
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
