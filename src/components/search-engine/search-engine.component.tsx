import React, { FC, memo, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  ECOSIA,
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
import { ReactComponent as KeyIcon } from "../../static/svgs/metager/metager-key-icon.svg";
import { getInputName } from "../../utils/search-engine.utils";

/**
 * Передаваемые параметры для компонента поисковой системы с полем ввода с логотипом
 * @property setContainerRef - Функция для установки рефа контейнера компонента поисковой системы с полем ввода с логотипом
 * @property currentLanguage - Текущий язык
 * @property searchEngine - Выбранная поисковая система
 * @property buttonLabel - Содержимое внутри кнопки
 * @property isDark - Флаг темной темы
 * @interface
 */
export interface SearchEngineProps {
  setContainerRef: (ref: HTMLDivElement | null) => void;
  currentLanguage: string;
  searchEngine: string;
  buttonLabel: ReactNode;
  isDark: boolean;
}

/**
 * Компонент поисковой системы с полем ввода с логотипом
 * @category Components
 */
const SearchEngineComponent: FC<SearchEngineProps> = memo(
  ({ setContainerRef, currentLanguage, searchEngine, buttonLabel, isDark }) => {
    const { t } = useTranslation();

    const getInputPrefix = (): ReactNode => {
      return (
        <a
          href="https://metager.org/keys/key/enter"
          data-tooltip={t("withoutAds")}
          className="new-tab__search-engine_input-prefix"
        >
          <KeyIcon
            className={clsx(
              "new-tab__search-engine_input-prefix-icon",
              searchEngine
            )}
          />
        </a>
      );
    };

    const getSearchEngineLogoClass = (): string =>
      clsx(
        "new-tab__search-engine_logo",
        searchEngine,
        { en: searchEngine === YANDEX && currentLanguage !== "ru" },
        { dark: isDark }
      );

    const getSearchEngineFormClass = (): string =>
      clsx("new-tab__search-engine_form", searchEngine, {
        dark: isDark
      });

    const getSearchEngineInputClass = (): string =>
      clsx("new-tab__search-engine_input", searchEngine, {
        dark: isDark && (searchEngine === YAHOO || searchEngine === NIGMA)
      });

    const getSearchEngineFormBackgroundClass = (): string =>
      clsx("new-tab__search-engine_form-background", searchEngine, {
        dark: isDark
      });

    return (
      <div className="new-tab__search-engine">
        <div className="new-tab__search-engine-container" ref={setContainerRef}>
          <Link
            className={getSearchEngineLogoClass()}
            href={SEARCH_ENGINE_LINKS[searchEngine]}
          />
          <div className={getSearchEngineFormBackgroundClass()}>
            <div
              className={clsx(
                "new-tab__search-engine_form-background-text-group",
                { dark: isDark }
              )}
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
            className={getSearchEngineFormClass()}
            action={SEARCH_QUERY_LINKS[searchEngine]}
          >
            <Input
              prefix={getInputPrefix()}
              className={getSearchEngineInputClass()}
              placeholder={t("searchQuery")}
              tabIndex={1}
              autoComplete="off"
              maxLength={400}
              name={getInputName(searchEngine)}
              required={searchEngine === ECOSIA}
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
      </div>
    );
  }
);

export default SearchEngineComponent;
