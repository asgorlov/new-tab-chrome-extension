import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef
} from "react";
import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import clsx from "clsx";
import { DefaultOptionType } from "rc-select/lib/Select";
import { BaseSelectRef } from "rc-select";

/**
 * Передаваемые параметры для компонента селектора
 * @property isDark - Флаг темной темы
 * @property options - Опции селектора
 * @property children - Компоненты-потомки
 * @interface
 */
export interface SelectComponentProps extends SelectProps {
  isDark?: boolean;
  options?: DefaultOptionType[];
  children?: ReactNode;
}

/**
 * Компонент селектора
 * @category Components
 */
const SelectComponent: FC<SelectComponentProps> = memo(
  ({
    isDark = false,
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
          className: clsx(
            "new-tab__select-dropdown-item",
            { dark: isDark },
            option.className
          )
        };
      });
    }, [options, isDark]);

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
          className={clsx("new-tab__select", { dark: isDark }, className)}
          popupClassName={clsx(
            "new-tab__select-dropdown",
            { dark: isDark },
            popupClassName
          )}
          {...rest}
        />
      </div>
    );
  }
);

export default SelectComponent;
