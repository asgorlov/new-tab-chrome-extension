import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Input, InputRef } from "antd";
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
    const [isLabelOnTop, setIsLabelOnTop] = useState(false);
    const [inputValue, setInputValue] = useState<ValueType>(defaultValue);
    const inputRef = useRef<InputRef>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    const handleFocus = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (label && !inputValue) {
          setIsLabelOnTop(true);
        }

        if (onFocus) {
          onFocus(e);
        }
      },
      [onFocus, label, inputValue]
    );

    const handleBlur = useCallback(
      (e: FocusEvent<HTMLInputElement>) => {
        if (label && !inputValue) {
          setIsLabelOnTop(false);
        }

        if (onBlur) {
          onBlur(e);
        }
      },
      [onBlur, label, inputValue]
    );

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);

        if (label && e.currentTarget.value) {
          setIsLabelOnTop(true);
        }

        if (onChange) {
          onChange(e);
        }
      },
      [onChange, label]
    );

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value);

        if (label && value) {
          setIsLabelOnTop(true);
        }
      }
    }, [value, label]);

    useEffect(() => {
      if (label) {
        const inputElement = inputRef.current?.input;
        const labelElement = labelRef.current;

        if (inputElement && labelElement) {
          const regExp = /[^0-9.]/g;
          const labelStyles = getComputedStyle(labelElement);
          const inputStyles = getComputedStyle(inputElement);
          const inputPaddingLeft = Number(
            inputStyles.paddingLeft.replace(regExp, "")
          );
          const labelPaddingLeft = Number(
            labelStyles.paddingLeft.replace(regExp, "")
          );
          const labelHeight = labelElement.offsetHeight;

          let scale;
          let translateY;
          let translateX;
          if (isLabelOnTop) {
            const inputBorderWidth = Number(
              inputStyles.borderWidth.replace(regExp, "")
            );
            const labelPaddingRight = Number(
              labelStyles.paddingRight.replace(regExp, "")
            );

            scale = 0.8;
            translateY =
              (1 - scale) * inputPaddingLeft -
              (labelPaddingLeft + labelPaddingRight);
            translateX = (-labelHeight - 2 * inputBorderWidth) / 2;
          } else {
            const inputHeight = inputElement.offsetHeight;

            scale = 1;
            translateY = inputPaddingLeft - labelPaddingLeft;
            translateX = (inputHeight - labelHeight) / 2;
          }

          labelElement.style.transform = `translate(${translateY}px, ${translateX}px) scale(${scale})`;
        }
      }
    }, [label, isLabelOnTop]);

    return (
      <div className="new-tab__input">
        {label && (
          <label
            className={clsx("new-tab__input_label", { _focused: isLabelOnTop })}
            children={label}
            ref={labelRef}
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
          ref={inputRef}
          {...rest}
        />
      </div>
    );
  }
);

export default InputComponent;
