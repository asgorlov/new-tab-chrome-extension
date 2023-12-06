import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState
} from "react";
import { Input } from "antd";
import { InputProps } from "rc-input";
import { ValueType } from "rc-input/lib/interface";
import clsx from "clsx";

export interface InputComponentProps extends Omit<InputProps, "className"> {
  inputClassName?: string;
  children?: ReactNode;
  label?: string;
}

const InputComponent: FC<InputComponentProps> = memo(
  ({
    inputClassName,
    defaultValue = "",
    placeholder,
    children,
    onChange,
    onFocus,
    onBlur,
    value,
    label,
    ...rest
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState<ValueType>(defaultValue);

    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (label) {
          setIsFocused(true);
        }

        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (label) {
          setIsFocused(false);
        }

        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur]
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);

        if (onChange) {
          onChange(e);
        }
      },
      [onChange]
    );

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value);
      }
    }, [value]);

    return (
      <div className="new-tab__input">
        {label && (
          <label
            className={clsx("new-tab__input_label", {
              _focused: isFocused || inputValue
            })}
            children={label}
          />
        )}
        <Input
          placeholder={label ? "" : placeholder}
          className={clsx("new-tab__input_field", inputClassName)}
          children={children}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={inputValue}
          {...rest}
        />
      </div>
    );
  }
);

export default InputComponent;
