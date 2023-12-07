import React, { FC, FormEvent, memo, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  ECOSIA,
  GOOGLE,
  METAGER,
  RAMBLER,
  SEARCH_ENGINE_LINKS,
  SEARCH_QUERY_LINKS,
  SEARXNG,
  STARTPAGE,
  YANDEX
} from "../../constants/search-engine.constants";
import clsx from "clsx";
import Link from "antd/lib/typography/Link";
import { ReactComponent as NoTrackingIcon } from "../../static/svgs/swisscows/swisscows-no-tracking.svg";
import { ReactComponent as AnonymousIcon } from "../../static/svgs/swisscows/swisscows-anonym-icon.svg";
import { ReactComponent as ForFamilyIcon } from "../../static/svgs/swisscows/swisscows-for-family-icon.svg";
import { getInputName } from "../../utils/search-engine.utils";
import { useTourStepOneContext } from "../../contexts/tour.context";
import { useSelector } from "react-redux";
import { selectSearXngUrl } from "../../store/new-tab/new-tab.selectors";
import { InputComponent } from "../../typedoc";

/**
 * Передаваемые параметры для компонента поисковой системы с полем ввода с логотипом
 * @property currentLanguage - Текущий язык
 * @property onSubmitForm - Функция, вызываемая при сабмите поискового запроса
 * @property searchEngine - Выбранная поисковая система
 * @property buttonLabel - Содержимое внутри кнопки
 * @interface
 */
export interface SearchEngineProps {
  currentLanguage: string;
  onSubmitForm: (event: FormEvent<HTMLFormElement>) => void;
  searchEngine: string;
  buttonLabel: ReactNode;
}

/**
 * Компонент поисковой системы с полем ввода с логотипом
 * @category Components
 */
const SearchEngineComponent: FC<SearchEngineProps> = memo(
  ({ currentLanguage, onSubmitForm, searchEngine, buttonLabel }) => {
    const { t } = useTranslation();
    const tourCtx = useTourStepOneContext();
    const [formFocused, setFormFocused] = React.useState(false);

    const searXngUrl = useSelector(selectSearXngUrl);

    const linkHref =
      searchEngine === SEARXNG && searXngUrl
        ? searXngUrl
        : SEARCH_ENGINE_LINKS[searchEngine];
    const formAction =
      searchEngine === SEARXNG && searXngUrl
        ? searXngUrl + "/search"
        : SEARCH_QUERY_LINKS[searchEngine];
    const inputPrefix =
      searchEngine === METAGER ? (
        <button
          type="button"
          onClick={() =>
            (window.location.href = "https://metager.org/keys/key/enter")
          }
          className={clsx("new-tab__search-engine_input-prefix", searchEngine)}
          data-tooltip={t("withoutAds")}
          children={<span />}
        />
      ) : (
        <button
          type={searchEngine === GOOGLE ? "submit" : "button"}
          className={clsx("new-tab__search-engine_input-prefix", searchEngine)}
          children={<span />}
        />
      );

    const getSearchEngineLogoClass = (): string => {
      const isEn =
        currentLanguage !== "ru" &&
        (searchEngine === YANDEX || searchEngine === RAMBLER);

      return clsx("new-tab__search-engine_logo", searchEngine, { en: isEn });
    };

    const getSearchEngineFormClass = (): string =>
      clsx("new-tab__search-engine_form", searchEngine, {
        _focused: formFocused
      });

    const getSearchEngineInputClass = (): string =>
      clsx("new-tab__search-engine_input", searchEngine);

    const getSearchEngineFormBackgroundClass = (): string =>
      clsx("new-tab__search-engine_form-background", searchEngine);

    return (
      <div className="new-tab__search-engine">
        <div className="new-tab__search-engine-container" ref={tourCtx}>
          <Link className={getSearchEngineLogoClass()} href={linkHref} />
          <div className={getSearchEngineFormBackgroundClass()}>
            <div className="new-tab__search-engine_form-background-text-group">
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
            action={formAction}
            method={searchEngine === STARTPAGE ? "POST" : "GET"}
            onSubmit={onSubmitForm}
            name="search-engine-form"
          >
            <InputComponent
              onFocus={() => setFormFocused(true)}
              onBlur={() => setFormFocused(false)}
              prefix={inputPrefix}
              className={getSearchEngineInputClass()}
              placeholder={t("searchQuery")}
              tabIndex={1}
              autoComplete="off"
              maxLength={400}
              name={getInputName(searchEngine)}
              required={searchEngine === ECOSIA}
            />
            <button
              aria-label={t("searchTheWeb")}
              className={clsx("new-tab__search-engine_button", searchEngine)}
              type="submit"
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
