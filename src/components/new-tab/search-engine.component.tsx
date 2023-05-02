import React, { FC } from "react";
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
import { ReactComponent as SearchIcon } from "../../static/svgs/search.svg";
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

  return (
    <div className="new-tab__search-engine">
      <Link
        className={clsx(
          "new-tab__search-engine_logo",
          searchEngine,
          { en: searchEngine === YANDEX && !i18n.language.includes("ru") },
          { dark: searchEngine !== GOOGLE && isDark }
        )}
        href={SEARCH_ENGINE_LINKS[searchEngine]}
      />
      <form
        className={clsx("new-tab__search-engine_form", searchEngine)}
        action={SEARCH_QUERY_LINKS[searchEngine]}
      >
        <Input
          className={clsx("new-tab__search-engine_input", searchEngine)}
          placeholder={t("searchQuery")}
          tabIndex={1}
          autoComplete="off"
          maxLength={400}
          name={searchEngine === YANDEX ? "text" : "q"}
        />
        <Button
          className={clsx("new-tab__search-engine_button", searchEngine)}
          htmlType="submit"
          type="text"
          tabIndex={2}
          children={
            (searchEngine === YANDEX && <span>{t("searchButton")}</span>) ||
            (searchEngine === GOOGLE && <SearchIcon />) ||
            (searchEngine === DUCK && <span>{"S"}</span>)
          }
        />
      </form>
    </div>
  );
};

export default SearchEngineComponent;
