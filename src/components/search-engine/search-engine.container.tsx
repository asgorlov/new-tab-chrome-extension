import React, { FC, FormEvent, useCallback, useContext, useMemo } from "react";
import SearchEngineComponent from "./search-engine.component";
import {
  AOL,
  ASK,
  BING,
  BOARDREADER,
  BRAVE,
  DUCK,
  ECOSIA,
  GIBIRU,
  GOOGLE,
  LYCOS,
  METAGER,
  NIGMA,
  SEARCH_INPUT_NAMES,
  SEARCHCRYPT,
  SWISSCOWS,
  YAHOO,
  YANDEX,
  YOUCOM,
  ZAPMETA
} from "../../constants/search-engine.constants";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { ReactComponent as EcosiaSearchIcon } from "../../static/svgs/ecosia/ecosia-search-icon.svg";
import { ReactComponent as LycosSearchIcon } from "../../static/svgs/lycos/lycos-search-icon.svg";
import { ReactComponent as GoogleSearchIcon } from "../../static/svgs/google/google-search-icon.svg";
import { ReactComponent as YuoComSearchIcon } from "../../static/svgs/youcom/youcom-search-icon.svg";
import { ReactComponent as GibiruSearchIcon } from "../../static/svgs/gibiru/gibiru-search-icon.svg";
import { ReactComponent as YahooSearchIcon } from "../../static/svgs/yahoo/yahoo-search-icon.svg";
import { ReactComponent as BraveSearchIcon } from "../../static/svgs/brave/brave-search-icon.svg";
import { ReactComponent as BingSearchIcon } from "../../static/svgs/bing/bing-search-icon.svg";
import { ReactComponent as SwisscowsSearchIcon } from "../../static/svgs/swisscows/swisscows-search-icon.svg";
import { ReactComponent as MetagerSearchIcon } from "../../static/svgs/metager/metager-search-icon.svg";
import { ReactComponent as AskSearchIcon } from "../../static/svgs/ask/ask-search-icon.svg";
import { useSelector } from "react-redux";
import { TourContext } from "../../contexts/tour.context";
import {
  selectCurrentLanguage,
  selectIsDark,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";

const SearchEngineContainer: FC = () => {
  const { t } = useTranslation();
  const isDark = useSelector(selectIsDark);
  const tourCtx = useContext(TourContext);
  const searchEngine = useSelector(selectSearchEngine);
  const currentLanguage = useSelector(selectCurrentLanguage);

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
      case LYCOS:
        return <LycosSearchIcon />;
      case NIGMA:
        return <span>{t("searchButton") + "!"}</span>;
      case ECOSIA:
        return <EcosiaSearchIcon />;
      case SEARCHCRYPT:
      case BOARDREADER:
      case ZAPMETA:
        return <span />;
      case METAGER:
        return <MetagerSearchIcon />;
      case ASK:
        return <AskSearchIcon />;
      default:
        return <></>;
    }
  }, [searchEngine, isDark, t]);

  const setContainerRef = useCallback(
    (ref: HTMLDivElement | null) => {
      if (tourCtx) {
        tourCtx.searchEngineRef.current = ref;
      }
    },
    [tourCtx]
  );

  const onSubmitForm = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      if (searchEngine === BOARDREADER) {
        event.preventDefault();

        const form = event.currentTarget;
        const input = form.elements.namedItem(
          SEARCH_INPUT_NAMES[1]
        ) as HTMLInputElement;

        window.location.href = `${form.action}/${input.value}.html`;
      }
    },
    [searchEngine]
  );

  return (
    <SearchEngineComponent
      setContainerRef={setContainerRef}
      currentLanguage={currentLanguage}
      onSubmitForm={onSubmitForm}
      searchEngine={searchEngine}
      buttonLabel={buttonLabel}
      isDark={isDark}
    />
  );
};

export default SearchEngineContainer;
