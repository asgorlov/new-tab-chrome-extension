import React, { FC, Fragment, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrencyLoading } from "../../../store/new-tab/new-tab.selectors";
import { ReactComponent as GearIcon } from "../../../static/svgs/widgets/currency/gear.svg";
import { ReactComponent as UpdateIcon } from "../../../static/svgs/widgets/weather/update-weather.svg";
import clsx from "clsx";
import { Currency } from "../../../models/currency.model";
import { useTranslation } from "react-i18next";
import {
  calculateExchangeRate,
  getCountryFlagSvgUrl
} from "../../../utils/currency.utils";
import TooltipComponent from "../../common/tooltip/tooltip.component";
import { useToken } from "antd/es/theme/internal";
import CurrencySelectComponent from "./currency-select/currency-select.component";

export interface CurrencyComponentProps {
  lastCallApi?: Date;
  selectedCurrencies: Currency[];
  allCurrenciesCodes: string[];
  mainCurrency: string;
}

const CurrencyComponent: FC<CurrencyComponentProps> = memo(
  ({ lastCallApi, selectedCurrencies, allCurrenciesCodes, mainCurrency }) => {
    const { t } = useTranslation();
    const token = useToken();
    const updateBtnRef = useRef<HTMLButtonElement>(null);
    const loading = useSelector(selectCurrencyLoading);

    const currencyOptions = allCurrenciesCodes.includes(mainCurrency)
      ? allCurrenciesCodes
      : [...allCurrenciesCodes, mainCurrency];

    const [main, setMain] = useState(mainCurrency);
    const [selected, setSelected] = useState(selectedCurrencies);
    const [isClickedAnimationOn, setIsClickedAnimationOn] = useState(false);
    const [openSettings, setOpenSettings] = useState(false);

    const handleClickUpdate = () => {
      if (!loading) {
        setIsClickedAnimationOn(true);
        // onClickUpdate();
      }
    };

    const handleClickSettings = () => {
      const isOpened = !openSettings;
      if (!isOpened) {
        setSelected(selectedCurrencies);
        setMain(mainCurrency);
      }

      setOpenSettings(isOpened);
    };

    const handleChangeSelectedCurrency = (code: string, index: number) => {
      if (selected[index].code !== code) {
        const newSelected = [...selected];
        newSelected[index] = { code };
        setSelected(newSelected);
      }
    };

    useEffect(() => {
      const button = updateBtnRef.current;
      if (button) {
        const callback = () => setIsClickedAnimationOn(false);
        button.addEventListener("animationend", callback);

        return () => button.removeEventListener("animationend", callback);
      }
    }, []);

    return (
      <div className="new-tab__currency">
        <div className="new-tab__currency-header">
          <div className="new-tab__currency-header__currency">
            <img alt={main} src={getCountryFlagSvgUrl(main)} />
            <span>{t(`currency.codes.${main}`)}</span>
          </div>
          <div className="new-tab__currency-header__btn-group">
            <button
              className={clsx("new-tab__currency-header__update-btn", {
                clicked: isClickedAnimationOn
              })}
              disabled={loading && !isClickedAnimationOn}
              onClick={handleClickUpdate}
              ref={updateBtnRef}
            >
              <UpdateIcon />
            </button>
            <button
              className={clsx("new-tab__currency-header__settings-btn", {
                opened: openSettings
              })}
              onClick={handleClickSettings}
            >
              <GearIcon />
            </button>
          </div>
        </div>
        <div className="new-tab__currency-content">
          <div
            className={clsx("new-tab__currency-content__settings", {
              opened: openSettings
            })}
            style={{ backgroundColor: token[1].colorPrimary }}
          >
            <div className="new-tab__currency-content__settings__wrapper">
              <CurrencySelectComponent
                value={main}
                codeOptions={currencyOptions}
                onChange={code => setMain(code)}
              />
              {selected.map((s: Currency, i: number) => {
                return (
                  <CurrencySelectComponent
                    value={s.code}
                    codeOptions={currencyOptions}
                    onChange={code => handleChangeSelectedCurrency(code, i)}
                  />
                );
              })}
              <div className="new-tab__currency-content__settings__btn-group">
                <button></button>
                <button></button>
              </div>
            </div>
          </div>
          <div className="new-tab__currency-content__table">
            {selected.map(c => {
              const name = t(`currency.codes.${c.code}`);
              const isMain = main === c.code;

              return (
                <Fragment key={c.code}>
                  <img
                    className="new-tab__currency-content__table__flag"
                    alt={c.code}
                    src={getCountryFlagSvgUrl(c.code)}
                  />
                  <TooltipComponent
                    title={name}
                    placement="bottomLeft"
                    mouseEnterDelay={0.5}
                    overlayClassName="new-tab__currency-content__table__name__popup"
                  >
                    <span className="new-tab__currency-content__table__name">
                      {name}
                    </span>
                  </TooltipComponent>
                  <span className="new-tab__currency-content__table__code">
                    {c.code}
                  </span>
                  <span className="new-tab__currency-content__table__rate">
                    {calculateExchangeRate(isMain ? 1 : c.rate)}
                  </span>
                </Fragment>
              );
            })}
          </div>
          {lastCallApi && (
            <div className="new-tab__currency-content__date">
              {t(`currency.lastCallDate`, { lastCallApi })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default CurrencyComponent;
