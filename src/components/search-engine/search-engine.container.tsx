import React, { FC, FormEvent, useCallback, useMemo } from "react";
import SearchEngineComponent from "./search-engine.component";
import {
  ALEXANDRIA,
  AOL,
  ASK,
  BING,
  BOARDREADER,
  BRAVE,
  DUCK,
  ECOSIA,
  ENTIREWEB,
  EXACTSEEK,
  GIBIRU,
  HOTBOT,
  IZITO,
  LYCOS,
  METAGER,
  MOJEEK,
  NIGMA,
  PRESEARCH,
  RAMBLER,
  SEARCH_INPUT_NAMES,
  SEARCHCH,
  SEARCHCRYPT,
  SWISSCOWS,
  YAHOO,
  YANDEX,
  YEP,
  YOUCOM,
  ZAPMETA
} from "../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import { ReactComponent as EcosiaSearchIcon } from "../../static/svgs/ecosia/ecosia-search-icon.svg";
import { ReactComponent as LycosSearchIcon } from "../../static/svgs/lycos/lycos-search-icon.svg";
import { ReactComponent as YuoComSearchIcon } from "../../static/svgs/youcom/youcom-search-icon.svg";
import { ReactComponent as GibiruSearchIcon } from "../../static/svgs/gibiru/gibiru-search-icon.svg";
import { ReactComponent as YahooSearchIcon } from "../../static/svgs/yahoo/yahoo-search-icon.svg";
import { ReactComponent as BraveSearchIcon } from "../../static/svgs/brave/brave-search-icon.svg";
import { ReactComponent as BingSearchIcon } from "../../static/svgs/bing/bing-search-icon.svg";
import { ReactComponent as SwisscowsSearchIcon } from "../../static/svgs/swisscows/swisscows-search-icon.svg";
import { ReactComponent as MetagerSearchIcon } from "../../static/svgs/metager/metager-search-icon.svg";
import { ReactComponent as AskSearchIcon } from "../../static/svgs/ask/ask-search-icon.svg";
import { ReactComponent as MojeekSearchIcon } from "../../static/svgs/mojeek/mojeek-search-icon.svg";
import { ReactComponent as YepSearchIcon } from "../../static/svgs/yep/yep-search-icon.svg";
import { ReactComponent as PresearchSearchIcon } from "../../static/svgs/presearch/presearch-search-icon.svg";
import { ReactComponent as HotBotSearchIcon } from "../../static/svgs/hotbot/hotbot-search-icon.svg";
import { ReactComponent as RamblerSearchIcon } from "../../static/svgs/rambler/rambler-search-icon.svg";
import { useSelector } from "react-redux";
import {
  selectCurrentLanguage,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";

const SearchEngineContainer: FC = () => {
  const { t } = useTranslation();

  const searchEngine = useSelector(selectSearchEngine);
  const currentLanguage = useSelector(selectCurrentLanguage);

  const buttonLabel = useMemo(() => {
    switch (searchEngine) {
      case YANDEX:
      case SEARCHCH:
      case ALEXANDRIA:
      case EXACTSEEK:
        return <span>{t("searchButton")}</span>;
      case DUCK:
        return <span>{"S"}</span>;
      case BING:
        return (
          <label aria-label={t("webSearch")}>
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
      case IZITO:
      case ENTIREWEB:
        return <span />;
      case METAGER:
        return <MetagerSearchIcon />;
      case ASK:
        return <AskSearchIcon />;
      case MOJEEK:
        return <MojeekSearchIcon />;
      case YEP:
        return <YepSearchIcon />;
      case PRESEARCH:
        return <PresearchSearchIcon />;
      case HOTBOT:
        return <HotBotSearchIcon />;
      case RAMBLER:
        return <RamblerSearchIcon />;
      default:
        return <></>;
    }
  }, [searchEngine, t]);

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
      currentLanguage={currentLanguage}
      onSubmitForm={onSubmitForm}
      searchEngine={searchEngine}
      buttonLabel={buttonLabel}
    />
  );
};

export default SearchEngineContainer;
