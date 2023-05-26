import React, { FC, useMemo } from "react";
import SearchEngineComponent from "./search-engine.component";
import {
  AOL,
  BING,
  BRAVE,
  DUCK,
  GIBIRU,
  GOOGLE,
  SWISSCOWS,
  YAHOO,
  YANDEX,
  YOUCOM
} from "../../constants/search-engine.constants";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ReactComponent as GoogleSearchIcon } from "../../static/svgs/google/google-search-icon.svg";
import { ReactComponent as YuoComSearchIcon } from "../../static/svgs/youcom/you-com-search-icon.svg";
import { ReactComponent as GibiruSearchIcon } from "../../static/svgs/gibiru/gibiru-search-icon.svg";
import { ReactComponent as YahooSearchIcon } from "../../static/svgs/yahoo/yahoo-search-icon.svg";
import { ReactComponent as BraveSearchIcon } from "../../static/svgs/brave/brave-search-icon.svg";
import { ReactComponent as BingSearchIcon } from "../../static/svgs/bing/bing-search-icon.svg";
import { ReactComponent as SwisscowsSearchIcon } from "../../static/svgs/swisscows/swisscows-search-icon.svg";
import { useSelector } from "react-redux";
import { selectIsDark, selectSearchEngine } from "../../store/new-tab.slice";

const SearchEngineContainer: FC = () => {
  const { t } = useTranslation();
  const isDark = useSelector(selectIsDark);
  const searchEngine = useSelector(selectSearchEngine);

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
      case BRAVE:
        return <BraveSearchIcon />;
      case SWISSCOWS:
        return <SwisscowsSearchIcon />;
      case AOL:
        return (
          <div className="mag-glass">
            <div className="lens"></div>
            <div className="handle"></div>
          </div>
        );
      case YOUCOM:
        return <YuoComSearchIcon />;
      case GIBIRU:
        return <GibiruSearchIcon />;
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
