import React, { FC, Fragment, memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrencyLoading } from "../../../store/new-tab/new-tab.selectors";
import { ReactComponent as UpdateIcon } from "../../../static/svgs/widgets/weather/update-weather.svg";
import clsx from "clsx";
import { Currency } from "../../../models/currency.model";
import { useTranslation } from "react-i18next";
import {
  calculateExchangeRate,
  getCountryFlagSvgUrl
} from "../../../utils/currency.utils";
import TooltipComponent from "../../common/tooltip/tooltip.component";
import { CURRENCY_RATIO_OPTIONS } from "../../../constants/currency.constants";
import SkeletonNode from "antd/es/skeleton/Node";

/**
 * Передаваемые параметры компонента виджета валют
 * @property lastCallApi - Дата последнего обновления
 * @property selectedCurrencies - Список выбранных для конвертации валют
 * @property mainCurrency - Выбранная основная валюта
 * @interface
 */
export interface CurrencyComponentProps {
  lastCallApi?: Date;
  selectedCurrencies: Currency[];
  mainCurrency: string;
  ratio: number;
  onClickUpdate: () => void;
}

/**
 * Компонент виджета валют
 * @category Components
 */
const CurrencyComponent: FC<CurrencyComponentProps> = memo(
  ({ lastCallApi, selectedCurrencies, mainCurrency, ratio, onClickUpdate }) => {
    const { t } = useTranslation();
    const updateBtnRef = useRef<HTMLButtonElement>(null);
    const loading = useSelector(selectCurrencyLoading);
    const ratioTitle = CURRENCY_RATIO_OPTIONS.find(
      o => o.value === ratio
    )?.label;

    const [isClickedAnimationOn, setIsClickedAnimationOn] = useState(false);

    const handleClickUpdate = () => {
      if (!loading) {
        onClickUpdate();
        setIsClickedAnimationOn(true);
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
            <img alt={mainCurrency} src={getCountryFlagSvgUrl(mainCurrency)} />
            <span>{t(`currency.codes.${mainCurrency}`)}</span>
            {ratioTitle && <span>{ratioTitle}</span>}
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
          </div>
        </div>
        <div className="new-tab__currency-content">
          <div className="new-tab__currency-content__table">
            {selectedCurrencies.map(c => {
              const name = t(`currency.codes.${c.code}`);
              const isMain = mainCurrency === c.code;

              return loading ? (
                <Fragment key={c.code}>
                  <SkeletonNode
                    className="new-tab__currency-content__skeleton-flag"
                    children={<div />}
                    active
                  />
                  <SkeletonNode
                    className="new-tab__currency-content__skeleton-name"
                    children={<div />}
                    active
                  />
                  <SkeletonNode
                    className="new-tab__currency-content__skeleton-code"
                    children={<div />}
                    active
                  />
                  <SkeletonNode
                    className="new-tab__currency-content__skeleton-rate"
                    children={<div />}
                    active
                  />
                </Fragment>
              ) : (
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
                    {calculateExchangeRate(isMain ? 1 : c.rate, ratio)}
                  </span>
                </Fragment>
              );
            })}
          </div>
          {lastCallApi && (
            <div className="new-tab__currency-content__date">
              {loading ? (
                <SkeletonNode
                  className="new-tab__currency-content__skeleton-date"
                  children={<div />}
                  active
                />
              ) : (
                <>
                  {t(`currency.lastCallDate`, {
                    lastCallApi: lastCallApi.toLocaleDateString()
                  })}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default CurrencyComponent;
