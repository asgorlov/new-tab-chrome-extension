import React, { FC, ReactNode } from "react";
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
import { getInputName } from "../../utils/search-engine.utils";
import { TourContextModel } from "../../models/tour-context.model";

/**
 * Передаваемые параметры для компонента поисковой системы с полем ввода с логотипом
 * @property currentLanguage - Текущий язык
 * @property searchEngine - Выбранная поисковая система
 * @property buttonLabel - Содержимое внутри кнопки
 * @property tourCtx - Модель контекста ознакомительно тура
 * @property isDark - Флаг темной темы
 * @interface
 */
export interface SearchEngineProps {
  currentLanguage: string;
  searchEngine: string;
  buttonLabel: ReactNode;
  tourCtx?: TourContextModel;
  isDark: boolean;
}

/**
 * Компонент поисковой системы с полем ввода с логотипом
 * @category Components
 */
const SearchEngineComponent: FC<SearchEngineProps> = ({
  currentLanguage,
  searchEngine,
  buttonLabel,
  tourCtx,
  isDark
}) => {
  const { t } = useTranslation();

  const setRef = (ref: HTMLDivElement | null) => {
    if (tourCtx) {
      tourCtx.searchEngineRef.current = ref;
    }
  };

  return (
    <div className="new-tab__search-engine">
      <div className="new-tab__search-engine-container" ref={setRef}>
        <Link
          className={clsx(
            "new-tab__search-engine_logo",
            searchEngine,
            { en: searchEngine === YANDEX && currentLanguage !== "ru" },
            { dark: isDark }
          )}
          href={SEARCH_ENGINE_LINKS[searchEngine]}
        />
        <div
          className={clsx(
            "new-tab__search-engine_form-background",
            searchEngine,
            { dark: isDark }
          )}
        >
          <div
            className={clsx(
              "new-tab__search-engine_form-background-text-group",
              {
                dark: isDark
              }
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
};

export default SearchEngineComponent;
