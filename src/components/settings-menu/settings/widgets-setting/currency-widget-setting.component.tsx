import React, {
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from "react";
import { WidgetName } from "../../../../constants/widget.constants";
import SelectComponent from "../../../common/select/select.component";
import { CURRENCY_RATIO_OPTIONS } from "../../../../constants/currency.constants";
import { Currency } from "../../../../models/currency.model";
import { ReactComponent as CurrencyIcon } from "../../../../static/svgs/menu-settings/currency-icon.svg";
import { useTranslation } from "react-i18next";
import { getCountryFlagSvgUrl } from "../../../../utils/currency.utils";
import TooltipComponent from "../../../common/tooltip/tooltip.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConvertibleCurrencies,
  selectMainCurrency
} from "../../../../store/new-tab/new-tab.selectors";
import {
  setCurrencyRatio,
  setSelectedMainCurrency,
  setSelectedCurrencies
} from "../../../../store/new-tab/new-tab.slice";
import { getExchangeRate } from "../../../../store/new-tab/new-tab.thunks";
import { AppDispatch } from "../../../../store/store";
import { VoidFunc } from "../../../../models/common.model";

/**
 * Передаваемые параметры компонента настройки виджета валют
 * @property setIsSavedChanges - Функция для установки флага сохранения настроек
 * @interface
 */
export interface CurrencyWidgetSettingComponentProps {
  setIsSavedChanges: (value: boolean) => void;
}

/**
 * Компонент настройки виджета валют
 * @category Components
 */
const CurrencyWidgetSettingComponent: ForwardRefExoticComponent<
  PropsWithoutRef<CurrencyWidgetSettingComponentProps> & RefAttributes<VoidFunc>
> = forwardRef<VoidFunc, CurrencyWidgetSettingComponentProps>(
  ({ setIsSavedChanges }, ref) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const mainCurrency = useSelector(selectMainCurrency);
    const convertibleCurrencies = useSelector(selectConvertibleCurrencies);
    const initialMainCurrency = mainCurrency.selected ?? mainCurrency.default;
    const availableCurrencies = convertibleCurrencies.available;

    const [main, setMain] = useState(initialMainCurrency);
    const [ratio, setRatio] = useState(mainCurrency.ratio);
    const [selected, setSelected] = useState(convertibleCurrencies.selected);

    const currencyOptions = useMemo(() => {
      const fullAvailableCurrencies = availableCurrencies.includes(main)
        ? availableCurrencies
        : [...availableCurrencies, main];

      return fullAvailableCurrencies
        .map(code => {
          const src = getCountryFlagSvgUrl(code);
          const title = t(`currency.codes.${code}`);
          return { code, src, title };
        })
        .sort((c1, c2) => c1.title.localeCompare(c2.title))
        .map(c => {
          const { code, src, title } = c;
          const description = `${title} [${code}]`;

          return {
            value: code,
            label: (
              <div
                key={code}
                className="new-tab__settings-menu_widgets-content__item_select-option"
              >
                <img alt={code} src={src} />
                <TooltipComponent
                  title={description}
                  placement="bottomLeft"
                  mouseEnterDelay={0.8}
                >
                  <span>{description}</span>
                </TooltipComponent>
              </div>
            )
          };
        });
    }, [availableCurrencies, main, t]);

    const handleSelectCurrency = useCallback(
      (value: string, index?: number) => {
        if (index === undefined) {
          setMain(value);
        } else {
          const newSelected = [...selected];
          newSelected[index] = { code: value };
          setSelected(newSelected);
        }
      },
      [selected]
    );

    const onSave = () => {
      dispatch(
        setSelectedMainCurrency(main !== mainCurrency.default ? main : null)
      );
      dispatch(setCurrencyRatio(ratio));
      dispatch(setSelectedCurrencies(selected));
      const shouldBeLoaded =
        ![mainCurrency.selected, mainCurrency.default].includes(main) ||
        convertibleCurrencies.selected.some(
          (c: Currency, i: number) => selected[i].code === c.code
        );

      if (shouldBeLoaded) {
        dispatch(
          getExchangeRate({
            mainCurrency: { code: main },
            selectedCurrencies: selected
          })
        );
      }
    };

    useImperativeHandle(ref, (): VoidFunc => onSave);

    useEffect(() => {
      const isMainChanged = mainCurrency.selected
        ? mainCurrency.selected !== main
        : mainCurrency.default !== main;
      const isRatioChanged = ratio !== mainCurrency.ratio;
      const isSelectedChanged = convertibleCurrencies.selected.some(
        (c: Currency, i: number) => selected[i].code !== c.code
      );

      setIsSavedChanges(isMainChanged || isRatioChanged || isSelectedChanged);
    }, [
      main,
      mainCurrency,
      ratio,
      selected,
      convertibleCurrencies.selected,
      setIsSavedChanges
    ]);

    return (
      <div className="new-tab__settings-menu_widgets-content__item">
        <div className="new-tab__settings-menu_widgets-content__item-title">
          <CurrencyIcon />
          {t(`widgets.${WidgetName.CURRENCY}`)}
        </div>
        <label>{t("currency.selectors.main")}</label>
        <SelectComponent
          value={main}
          options={currencyOptions}
          onSelect={v => handleSelectCurrency(v)}
          className="new-tab__settings-menu_widgets-content__item-select"
        />
        <label>{t("currency.selectors.ratio")}</label>
        <SelectComponent
          value={ratio}
          options={CURRENCY_RATIO_OPTIONS}
          onSelect={v => {
            setRatio(v);
          }}
          className="new-tab__settings-menu_widgets-content__item-select"
        />
        {selected.length > 0 && (
          <>
            <label>{t(`currency.selectors.converted`)}</label>
            {selected.map((c: Currency, i: number) => {
              return (
                <SelectComponent
                  key={i}
                  value={c.code}
                  options={currencyOptions}
                  onSelect={v => handleSelectCurrency(v, i)}
                  className="new-tab__settings-menu_widgets-content__item-select"
                />
              );
            })}
          </>
        )}
      </div>
    );
  }
);

export default CurrencyWidgetSettingComponent;
