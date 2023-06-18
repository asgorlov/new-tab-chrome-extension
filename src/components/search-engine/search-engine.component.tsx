import React, { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  NIGMA,
  SEARCH_ENGINE_LINKS,
  SEARCH_QUERY_LINKS,
  YAHOO,
  YANDEX
} from "../../constants/search-engine.constants";
import clsx from "clsx";
import Link from "antd/lib/typography/Link";
import { Button, Input } from "antd";
import { ReactComponent as NoTrackingIcon } from "../../static/svgs/swisscows/swisscows-no-tracking.svg";
import { ReactComponent as AnonymousIcon } from "../../static/svgs/swisscows/swisscows-anonym-icon.svg";
import { ReactComponent as ForFamilyIcon } from "../../static/svgs/swisscows/swisscows-for-family-icon.svg";
import {
  getInputName,
  getSearchEngineClass
} from "../../utils/search-engine.utils";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../store/new-tab.slice";

interface SearchEngineProps {
  onMouseOverOrOut: () => void;
  nigmaLogoVariant: number;
  searchEngine: string;
  buttonLabel: ReactNode;
  isDark: boolean;
}

const SearchEngineComponent: FC<SearchEngineProps> = ({
  onMouseOverOrOut,
  nigmaLogoVariant,
  searchEngine,
  buttonLabel,
  isDark
}) => {
  const { t } = useTranslation();
  const currentLanguage = useSelector(selectCurrentLanguage);

  return (
    <div className="new-tab__search-engine">
      <Link
        onMouseOver={onMouseOverOrOut}
        onMouseOut={onMouseOverOrOut}
        className={clsx(
          "new-tab__search-engine_logo",
          getSearchEngineClass(searchEngine, nigmaLogoVariant),
          { en: searchEngine === YANDEX && currentLanguage !== "ru" },
          { dark: isDark }
        )}
        href={SEARCH_ENGINE_LINKS[searchEngine]}
      />
      <div
        className={clsx("new-tab__search-engine_form-background", searchEngine)}
      >
        <div
          className={clsx("new-tab__search-engine_form-background-text-group", {
            dark: isDark
          })}
        >
          <div className="new-tab__search-engine_form-background-text-item">
            <NoTrackingIcon />
            {t("noTracking")}
          </div>
          <div className="new-tab__search-engine_form-background-text-item">
            <AnonymousIcon />
            {t("anonymous")}
          </div>
          <div className="new-tab__search-engine_form-background-text-item">
            <ForFamilyIcon />
            {t("familyFriendly")}
          </div>
        </div>
      </div>
      <form
        className={clsx("new-tab__search-engine_form", searchEngine, {
          dark: isDark
        })}
        action={SEARCH_QUERY_LINKS[searchEngine]}
      >
        <Input
          className={clsx("new-tab__search-engine_input", searchEngine, {
            dark: isDark && (searchEngine === YAHOO || searchEngine === NIGMA)
          })}
          placeholder={t("searchQuery")}
          tabIndex={1}
          autoComplete="off"
          maxLength={400}
          name={getInputName(searchEngine)}
        />
        <Button
          className={clsx("new-tab__search-engine_button", searchEngine)}
          htmlType="submit"
          type="text"
          tabIndex={2}
          children={buttonLabel}
        />
      </form>
    </div>
  );
};

export default SearchEngineComponent;
