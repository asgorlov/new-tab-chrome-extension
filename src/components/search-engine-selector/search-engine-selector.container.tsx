import React, { FC, MouseEvent, useCallback } from "react";
import SearchEngineSelectorComponent from "./search-engine-selector.component";
import { setSearchEngine } from "../../store/new-tab.slice";
import { useDispatch } from "react-redux";
import {
  BING,
  BRAVE,
  DUCK,
  GOOGLE,
  SWISSCOWS,
  YAHOO,
  YANDEX
} from "../../constants/search-engine.constants";
import i18n from "../../localizations/i18n";
import { ReactComponent as BingIcon } from "../../static/svgs/bing/bing-icon.svg";
import { ReactComponent as DuckIcon } from "../../static/svgs/duck/duck-icon.svg";
import { ReactComponent as GoogleIcon } from "../../static/svgs/google/google-icon.svg";
import { ReactComponent as YaRuIcon } from "../../static/svgs/yandex/ya-icon.svg";
import { ReactComponent as YaEnIcon } from "../../static/svgs/yandex/ya-icon-en.svg";
import { ReactComponent as YahooIcon } from "../../static/svgs/yahoo/yahoo-icon.svg";
import { ReactComponent as BraveIcon } from "../../static/svgs/brave/brave-icon.svg";
import { ReactComponent as SwisscowsIcon } from "../../static/svgs/swisscows/swisscows-icon.svg";

interface SearchSelectedContainerProps {
  searchEngine: string;
}

const SearchEngineSelectorContainer: FC<SearchSelectedContainerProps> = ({
  searchEngine
}) => {
  const dispatch = useDispatch();

  const getIcon = useCallback((name: string) => {
    const iconSize = 32;

    switch (name) {
      case YANDEX:
        return i18n.language.includes("ru") ? (
          <YaRuIcon height={iconSize} width={iconSize} />
        ) : (
          <YaEnIcon height={iconSize} width={iconSize} />
        );
      case GOOGLE:
        return <GoogleIcon height={iconSize} width={iconSize} />;
      case DUCK:
        return <DuckIcon height={iconSize} width={iconSize} />;
      case BING:
        return <BingIcon height={iconSize} width={iconSize} />;
      case YAHOO:
        return <YahooIcon height={iconSize} width={iconSize} />;
      case BRAVE:
        return <BraveIcon height={iconSize} width={iconSize} />;
      case SWISSCOWS:
        return <SwisscowsIcon height={iconSize} width={iconSize} />;
      default:
        return <></>;
    }
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const element = e.currentTarget as HTMLButtonElement;
      dispatch(setSearchEngine(element.value));
    },
    [dispatch]
  );

  return (
    <SearchEngineSelectorComponent
      searchEngine={searchEngine}
      onClick={handleClick}
      getIcon={getIcon}
    />
  );
};

export default SearchEngineSelectorContainer;
