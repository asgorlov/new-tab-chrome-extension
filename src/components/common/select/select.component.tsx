import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import clsx from "clsx";
import { Select, SelectProps } from "antd";
import { BaseSelectRef } from "rc-select";

/**
 * Передаваемые параметры для компонента селектора
 * @property options - Опции селектора
 * @property children - Компоненты-потомки
 * @interface
 */
export interface SelectComponentProps extends SelectProps {
  children?: ReactNode;
}

/**
 * Компонент селектора
 * @category Components
 */
const SelectComponent: FC<SelectComponentProps> = memo(
  ({
    options = [],
    children,
    className = "",
    popupClassName = "",
    ...rest
  }) => {
    const selectRef = useRef<BaseSelectRef>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const enrichedOptions = useMemo(() => {
      return options.map(option => {
        return {
          ...option,
          className: clsx("new-tab__select-dropdown-item", option.className)
        };
      });
    }, [options]);

    const selectFocus = useCallback(
      (event: Event) => {
        event.stopPropagation();
        selectRef.current && selectRef.current.focus();
      },
      [selectRef]
    );

    useEffect(() => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        wrapper.addEventListener("search", selectFocus);

        return () => wrapper.removeEventListener("search", selectFocus);
      }
    }, [wrapperRef, selectFocus]);

    return (
      <div ref={wrapperRef}>
        <Select
          ref={selectRef}
          options={enrichedOptions}
          children={children}
          className={clsx("new-tab__select", className)}
          popupClassName={clsx("new-tab__select-dropdown", popupClassName)}
          {...rest}
        />
      </div>
    );
  }
);

export default SelectComponent;
