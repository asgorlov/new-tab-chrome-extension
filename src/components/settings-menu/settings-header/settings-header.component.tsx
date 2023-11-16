import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef
} from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ReactComponent as SearchIcon } from "../../../static/svgs/menu-settings/settings-search-icon.svg";
import { ReactComponent as CloseIcon } from "../../../static/svgs/menu-settings/settings-search-close-icon.svg";
import { ReactComponent as LoadingIcon } from "../../../static/svgs/menu-settings/settings-search-loading.svg";
import { MatchedElement } from "../../../models/settings-search.model";

/**
 * Передаваемые параметры для компонента хэдэра меню настроек с поиском
 * @property isExpanded - Флаг разворота поля ввода для поиска
 * @property searchQuery - Поисковый запрос
 * @property setIsExpanded - Функция для установки флага разворота поля ввода для поиска
 * @property isSearchLoading - Флаг, показывающий, что совершается поиск по настройкам
 * @property matchedElements - Элементы, удовлетворяющие поиску
 * @property onKeyDownSearch - Функция, срабатывающая на при нажатии клавиши Enter
 * @property onChangeSearchQuery - Функция, меняющая значение поля ввода поискового запроса
 * @property onClickSearchButton - Функция, которая срабатывает по клику кнопки открытия или очищения поля ввода
 * @property currentMatchedElement - Номер текущего элемента поиска
 * @property onClickSearchNavigation - Функция навигации по найденным элементам
 * @interface
 */
export interface SettingsHeaderComponentProps {
  isExpanded: boolean;
  searchQuery: string;
  setIsExpanded: (value: boolean) => void;
  isSearchLoading: boolean;
  matchedElements: MatchedElement[];
  onKeyDownSearch: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChangeSearchQuery: (value: ChangeEvent<HTMLInputElement>) => void;
  onClickSearchButton: () => void;
  currentMatchedElement: number;
  onClickSearchNavigation: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Компонент хэдера меню настроек с поиском
 * @category Components
 */
const SettingsHeaderComponent: FC<SettingsHeaderComponentProps> = memo(
  ({
    isExpanded,
    searchQuery,
    setIsExpanded,
    isSearchLoading,
    matchedElements,
    onKeyDownSearch,
    onChangeSearchQuery,
    onClickSearchButton,
    currentMatchedElement,
    onClickSearchNavigation
  }) => {
    const { t } = useTranslation();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const searchRef = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = useCallback(
      (event: Event) => {
        const isClickOutside = !searchRef.current?.contains(
          event.target as Node
        );
        if (isClickOutside) {
          setIsExpanded(false);
        }
      },
      [searchRef, setIsExpanded]
    );

    const onClickButton = () => {
      inputRef.current?.focus();
      onClickSearchButton();
    };

    useEffect(() => {
      const handleListener =
        isExpanded && !searchQuery
          ? document.addEventListener
          : document.removeEventListener;
      handleListener("mousedown", handleClickOutside);
    }, [isExpanded, searchQuery, handleClickOutside]);

    return (
      <div className="new-tab__settings-menu-header">
        <span className="new-tab__settings-menu-header__title">
          {t("settingsTitle")}
        </span>
        <div
          ref={searchRef}
          className={clsx("new-tab__settings-menu-header__search", {
            expanded: isExpanded
          })}
        >
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={onChangeSearchQuery}
            className="new-tab__settings-menu-header__search-input"
            placeholder={t("searchBySettings")}
            onKeyDown={onKeyDownSearch}
          />
          <div
            className={clsx("new-tab__settings-menu-header__search-counter", {
              expanded:
                (searchQuery && currentMatchedElement >= 0) || isSearchLoading
            })}
          >
            {isSearchLoading ? (
              <div className="new-tab__settings-menu-header__search-counter-icon">
                <LoadingIcon />
              </div>
            ) : (
              <div className="new-tab__settings-menu-header__search-counter-value">
                {currentMatchedElement >= 0 && (
                  <>{`${currentMatchedElement}/${matchedElements.length}`}</>
                )}
              </div>
            )}
          </div>
          <div
            className={clsx("new-tab__settings-menu-header__search-controls", {
              expanded: searchQuery
            })}
          >
            <div />
            <button name="up" onClick={onClickSearchNavigation}>
              {"<"}
            </button>
            <button name="down" onClick={onClickSearchNavigation}>
              {">"}
            </button>
          </div>
          <div style={{ minWidth: "24px" }}>
            <button
              onClick={onClickButton}
              className="new-tab__settings-menu-header__search-button"
            >
              <SearchIcon
                className={clsx("setting-search-icon", { hidden: searchQuery })}
              />
              <CloseIcon
                className={clsx("setting-close-icon", { hidden: !searchQuery })}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default SettingsHeaderComponent;
