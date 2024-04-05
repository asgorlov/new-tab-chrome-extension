import React, { FC } from "react";
import CurrencyComponent from "./currency.component";
import { useSelector } from "react-redux";
import {
  selectConvertibleCurrencies,
  selectMainCurrency
} from "../../../store/new-tab/new-tab.selectors";

const CurrencyContainer: FC = () => {
  const mainCurrency = useSelector(selectMainCurrency);
  const convertibleCurrencies = useSelector(selectConvertibleCurrencies);

  return (
    <CurrencyComponent
      lastCallApi={convertibleCurrencies.lastCallApi}
      selectedCurrencies={convertibleCurrencies.selected}
      mainCurrency={mainCurrency.selected ?? mainCurrency.default}
    />
  );
};

export default CurrencyContainer;
