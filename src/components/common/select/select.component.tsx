import { FC, memo, ReactNode, useMemo } from "react";
import { Select } from "antd";
import { SelectProps } from "antd/es/select";
import clsx from "clsx";
import { DefaultOptionType } from "rc-select/lib/Select";

export interface SelectComponentProps extends SelectProps {
  isDark?: boolean;
  options?: DefaultOptionType[];
  children?: ReactNode;
}

const SelectComponent: FC<SelectComponentProps> = memo(
  ({
    isDark = false,
    options = [],
    children,
    className = "",
    popupClassName = "",
    ...rest
  }) => {
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

    return (
      <Select
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
    );
  }
);

export default SelectComponent;
