import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DUCK,
  GOOGLE,
  SEARCH_ENGINE_LINKS,
  SEARCH_QUERY_LINKS,
  YANDEX
} from "../../constants/search-engine.constants";
import clsx from "clsx";
import Link from "antd/lib/typography/Link";
import i18n from "../../localizations/i18n";
import { ReactComponent as SearchIcon } from "../../svgs/search.svg";
import { ReactComponent as YaRuLogo } from "../../svgs/ya-logo.svg";
import { ReactComponent as YaEnLogo } from "../../svgs/ya-logo-en.svg";
import { ReactComponent as GoogleLogo } from "../../svgs/google-logo.svg";
import { ReactComponent as DuckBlackLogo } from "../../svgs/duckduckgo-logo.svg";
import { Button, Input } from "antd";

interface SearchEngineProps {
  searchEngine: string;
  isDark: boolean;
}

const SearchEngineComponent: FC<SearchEngineProps> = ({
  searchEngine,
  isDark
}) => {
  const { t } = useTranslation();

  const logo = useMemo(() => {
    switch (searchEngine) {
      case YANDEX:
        return i18n.language.includes("ru") ? (
          <YaRuLogo style={{ transform: "scale(1.8)" }} />
        ) : (
          <YaEnLogo style={{ transform: "scale(1.4)" }} />
        );
      case GOOGLE:
        return <GoogleLogo style={{ transform: "scale(2)" }} />;
      case DUCK:
        return <DuckBlackLogo style={{ transform: "scale(2.8)" }} />;
      default:
        return <></>;
    }
  }, [searchEngine]);

  const buttonText = useMemo(() => {
    switch (searchEngine) {
      case YANDEX:
        return t("searchButton");
      case GOOGLE:
        return <SearchIcon />;
      case DUCK:
        return "S";
      default:
        return <></>;
    }
  }, [searchEngine, t]);

  return (
    <div className={`new-tab_${searchEngine}-search-engine`}>
      <Link
        className={clsx(`new-tab_${searchEngine}-search-logo`, {
          dark: isDark
        })}
        href={SEARCH_ENGINE_LINKS[searchEngine]}
        children={logo}
      />
      <form
        className={`new-tab_${searchEngine}-search-form`}
        action={SEARCH_QUERY_LINKS[searchEngine]}
      >
        <Input
          className={`new-tab_${searchEngine}-search-input`}
          placeholder={t("searchQuery")}
          tabIndex={1}
          autoComplete="off"
          maxLength={400}
          name={searchEngine === YANDEX ? "text" : "q"}
        />
        <Button
          className={`new-tab_${searchEngine}-search-button`}
          htmlType="submit"
          type="text"
          tabIndex={2}
          children={buttonText}
        />
      </form>
    </div>
  );
};

export default SearchEngineComponent;
