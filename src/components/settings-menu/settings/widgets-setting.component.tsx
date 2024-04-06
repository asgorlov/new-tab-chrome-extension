import React, { FC, useCallback, useId, useMemo, useState } from "react";
import { CollapsedMenuSetting } from "../../../constants/settings-menu.constants";
import { useTranslation } from "react-i18next";
import { ReactComponent as WidgetIcon } from "../../../static/svgs/menu-settings/widget-icon.svg";
import { ReactComponent as CurrencyIcon } from "../../../static/svgs/menu-settings/currency-icon.svg";
import SelectComponent from "../../common/select/select.component";
import { WidgetName } from "../../../constants/widget.constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsWidgetsOnRight,
  setMainCurrency,
  setSelectedCurrencies,
  setWidgets
} from "../../../store/new-tab/new-tab.slice";
import CheckboxComponent from "../../common/checkbox/checkbox.component";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Button, Switch } from "antd";
import TooltipComponent from "../../common/tooltip/tooltip.component";
import {
  selectConvertibleCurrencies,
  selectIsWidgetsOnRight,
  selectMainCurrency,
  selectWidgets
} from "../../../store/new-tab/new-tab.selectors";
import { Currency } from "../../../models/currency.model";
import { getCountryFlagSvgUrl } from "../../../utils/currency.utils";
import CollapseComponent from "../../common/collapse/collapse.component";

/**
 * Компонент настройки виджетов
 * @category Components
 */
const WidgetsSettingComponent: FC = () => {
  const { t } = useTranslation();
  const id = useId();
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);
  const isWidgetsOnRight = useSelector(selectIsWidgetsOnRight);
  const mainCurrency = useSelector(selectMainCurrency);
  const convertibleCurrencies = useSelector(selectConvertibleCurrencies);

  const initialMainCurrency = mainCurrency.selected ?? mainCurrency.default;
  const [main, setMain] = useState(initialMainCurrency);

  const availableCurrencies = convertibleCurrencies.available;
  const [selected, setSelected] = useState(convertibleCurrencies.selected);

  const disabledSaveBtn =
    (main === mainCurrency.selected || main === mainCurrency.default) &&
    convertibleCurrencies.selected.every(
      (c: Currency, i: number) => selected[i].code === c.code
    );

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

  const widgetOptions = useMemo(() => {
    return Object.values(WidgetName).map(name => {
      return {
        value: name,
        label: t(`widgets.${name}`),
        key: name
      };
    });
  }, [t]);

  const handleChangeAddAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        const allWidgets = Object.values(WidgetName);
        dispatch(setWidgets(allWidgets));
      }
    },
    [dispatch]
  );

  const handleChangeRemoveAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        dispatch(setWidgets([]));
        dispatch(setIsWidgetsOnRight(false));
      }
    },
    [dispatch]
  );

  const onSaveSettings = useCallback(() => {
    dispatch(setMainCurrency(main));
    dispatch(setSelectedCurrencies(selected));
  }, [dispatch, main, selected]);

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

  return (
    <CollapseComponent
      icon={<WidgetIcon />}
      type={CollapsedMenuSetting.WIDGETS}
      title={t("widgets.title")}
      className="new-tab__settings-menu_widgets"
    >
      <div className="new-tab__settings-menu_widgets-content">
        <div className="new-tab__settings-menu_widgets-content-checkbox-group">
          <CheckboxComponent
            checked={widgets.length === widgetOptions.length}
            onChange={handleChangeAddAll}
            children={t("widgets.selectAll")}
          />
          <CheckboxComponent
            checked={widgets.length === 0}
            onChange={handleChangeRemoveAll}
            children={t("widgets.removeAll")}
          />
        </div>
        <SelectComponent
          className="new-tab__settings-menu_widgets-content-selector"
          mode="multiple"
          maxTagCount="responsive"
          value={widgets}
          onChange={v => dispatch(setWidgets(v))}
          options={widgetOptions}
        />
        <div className="new-tab__settings-menu_widgets-content-switcher">
          <label htmlFor={id}>{t("widgets.switcherTitle")}</label>
          <Switch
            id={id}
            checkedChildren={t("widgets.right")}
            unCheckedChildren={t("widgets.left")}
            checked={isWidgetsOnRight}
            disabled={widgets.length === 0}
            onClick={() => dispatch(setIsWidgetsOnRight(!isWidgetsOnRight))}
          />
        </div>
        {widgets
          .filter(w => w === WidgetName.CURRENCY)
          .map(w => {
            return (
              <div
                key={w}
                className="new-tab__settings-menu_widgets-content__item"
              >
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
          })}
        {widgets.includes(WidgetName.CURRENCY) && (
          <div className="new-tab__settings-menu_widgets-content__save-btn-wrapper">
            <Button
              className="new-tab__settings-menu_widgets-content__save-btn"
              size="small"
              disabled={disabledSaveBtn}
              onClick={onSaveSettings}
              children={t("widgets.saveButton")}
            />
          </div>
        )}
      </div>
    </CollapseComponent>
  );
};

export default WidgetsSettingComponent;
