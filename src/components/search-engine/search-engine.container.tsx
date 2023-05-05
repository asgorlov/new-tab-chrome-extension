import React, { FC, useMemo } from "react";
import SearchEngineComponent from "./search-engine.component";
import {
  BING,
  DUCK,
  GOOGLE,
  YAHOO,
  YANDEX
} from "../../constants/search-engine.constants";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ReactComponent as GoogleSearchIcon } from "../../static/svgs/google/google-search-icon.svg";
import { ReactComponent as YahooSearchIcon } from "../../static/svgs/yahoo/yahoo-search-icon.svg";
import { ReactComponent as BingSearchIcon } from "../../static/svgs/bing/bing-search-icon.svg";

interface SearchEngineContainerProps {
  searchEngine: string;
  isDark: boolean;
}

const SearchEngineContainer: FC<SearchEngineContainerProps> = ({
  searchEngine,
  isDark
}) => {
  const { t } = useTranslation();

  const buttonLabel = useMemo(() => {
    switch (searchEngine) {
      case YANDEX:
        return <span>{t("searchButton")}</span>;
      case GOOGLE:
        return <GoogleSearchIcon />;
      case DUCK:
        return <span>{"S"}</span>;
      case BING:
        return (
          <label className={clsx({ dark: isDark })} aria-label={t("webSearch")}>
            <BingSearchIcon />
          </label>
        );
      case YAHOO:
        return <YahooSearchIcon />;
      default:
        return <></>;
    }
  }, [searchEngine, isDark, t]);

  return (
    <SearchEngineComponent
      searchEngine={searchEngine}
      buttonLabel={buttonLabel}
      isDark={isDark}
    />
  );
};

export default SearchEngineContainer;
