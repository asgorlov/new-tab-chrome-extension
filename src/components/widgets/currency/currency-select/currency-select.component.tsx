import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCountryFlagSvgUrl } from "../../../../utils/currency.utils";
import { ReactComponent as ArrowIcon } from "../../../../static/svgs/widgets/currency/arrow.svg";
import { useToken } from "antd/es/theme/internal";
import TooltipComponent from "../../../common/tooltip/tooltip.component";

export interface CurrencySelectComponentProps {
  codeOptions: string[];
  onChange: (value: string) => void;
  value: string;
}

const CurrencySelectComponent: FC<CurrencySelectComponentProps> = ({
  codeOptions,
  onChange,
  value
}) => {
  const { t } = useTranslation();
  const token = useToken();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const options = codeOptions
    .map(o => ({
      src: getCountryFlagSvgUrl(o),
      title: t(`currency.codes.${o}`),
      code: o
    }))
    .sort((o1, o2) => o1.title.localeCompare(o2.title));
  const selectedIndex = options.findIndex(o => o.code === value);

  const handleOptionClick = (index: number) => {
    const option = options[index];
    onChange(option.code);
    setIsOpen(false);
  };

  const getOptionStyle = (index: number) => {
    return selectedIndex === index
      ? {
          backgroundColor: `color-mix(in srgb, ${token[1].colorPrimary} 25%, transparent)`
        }
      : {};
  };

  const renderOptions = (): ReactNode => {
    return options.map((o, i) => {
      return (
        <div
          key={o.code}
          style={getOptionStyle(i)}
          onClick={() => handleOptionClick(i)}
          className="new-tab__currency-select__option-wrapper"
        >
          <div className="new-tab__currency-select__option">
            <img alt={o.code} src={o.src} />
            <TooltipComponent
              title={o.title}
              placement="bottomLeft"
              mouseEnterDelay={0.5}
              overlayClassName="new-tab__currency-select__option__popup"
            >
              <span>{`${o.title} [${o.code}]`}</span>
            </TooltipComponent>
          </div>
        </div>
      );
    });
  };

  const renderSelectedValue = (): ReactNode => {
    if (selectedIndex >= 0) {
      const option = options[selectedIndex];
      return (
        <div className="new-tab__currency-select__option">
          <img alt={option.code} src={option.src} />
          <span>{`${option.title} [${option.code}]`}</span>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const root = rootRef.current;
    if (root) {
      const handleClick = (event: MouseEvent) => {
        const target = event.target;
        if (target instanceof Node && !root.contains(target)) {
          setIsOpen(false);
        }
      };

      window.addEventListener("click", handleClick);

      return () => window.removeEventListener("click", handleClick);
    }
  }, []);

  return (
    <div ref={rootRef} className="new-tab__currency-select">
      <button
        className="new-tab__currency-select__placeholder"
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        {renderSelectedValue()}
        <div
          data-open={isOpen}
          className="new-tab__currency-select__arrow"
          children={<ArrowIcon />}
        />
      </button>
      <div data-open={isOpen} className="new-tab__currency-select__dropdown">
        <div
          className="new-tab__currency-select__dropdown-list"
          children={renderOptions()}
        />
      </div>
    </div>
  );
};

export default CurrencySelectComponent;
