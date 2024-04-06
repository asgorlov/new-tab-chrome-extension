import React, { FC, useCallback, useEffect } from "react";
import CurrencyComponent from "./currency.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectConvertibleCurrencies,
  selectMainCurrency,
  selectWidgets
} from "../../../store/new-tab/new-tab.selectors";
import { shouldCurrenciesBeLoaded } from "../../../utils/currency.utils";
import { getExchangeRate } from "../../../store/new-tab/new-tab.thunks";
import { AppDispatch } from "../../../store/store";

const CurrencyContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const widgets = useSelector(selectWidgets);
  const mainCurrency = useSelector(selectMainCurrency);
  const convertibleCurrencies = useSelector(selectConvertibleCurrencies);

  const handleClickUpdate = useCallback(() => {
    const params = {
      mainCurrency: { code: mainCurrency.selected ?? mainCurrency.default },
      selectedCurrencies: convertibleCurrencies.selected
    };
    dispatch(getExchangeRate(params));
  }, [mainCurrency, convertibleCurrencies, dispatch]);

  useEffect(() => {
    const shouldBeLoaded = shouldCurrenciesBeLoaded(
      widgets,
      convertibleCurrencies.lastCallApi
    );
    if (shouldBeLoaded) {
      handleClickUpdate();
    }
  }, [widgets, convertibleCurrencies, handleClickUpdate]);

  return (
    <CurrencyComponent
      lastCallApi={convertibleCurrencies.lastCallApi}
      selectedCurrencies={convertibleCurrencies.selected}
      mainCurrency={mainCurrency.selected ?? mainCurrency.default}
      onClickUpdate={handleClickUpdate}
    />
  );
};

export default CurrencyContainer;
