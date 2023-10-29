import {
  ChangeEvent,
  FC,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef
} from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsDark } from "../../../store/new-tab/new-tab.selectors";
import { ReactComponent as SearchIcon } from "../../../static/svgs/menu-settings/settings-search-icon.svg";
import { ReactComponent as CloseIcon } from "../../../static/svgs/menu-settings/settings-search-close-icon.svg";
import { ReactComponent as LoadingIcon } from "../../../static/svgs/menu-settings/settings-search-loading.svg";

// toDo: добавить описание пропертей
export interface SettingsHeaderComponentProps {
  isExpanded: boolean;
  searchQuery: string;
  foundElements: Element[];
  setIsExpanded: (value: boolean) => void;
  isSearchLoading: boolean;
  currentFoundElement: number;
  onChangeSearchQuery: (value: ChangeEvent<HTMLInputElement>) => void;
  onClickSearchButton: () => void;
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
    foundElements,
    setIsExpanded,
    isSearchLoading,
    currentFoundElement,
    onChangeSearchQuery,
    onClickSearchButton,
    onClickSearchNavigation
  }) => {
    const { t } = useTranslation();
    const isDark = useSelector(selectIsDark);

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
      handleListener("click", handleClickOutside);
    }, [isExpanded, searchQuery, handleClickOutside]);

    return (
      <div className={clsx("new-tab__settings-menu-header", { dark: isDark })}>
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
          />
          <div
            className={clsx("new-tab__settings-menu-header__search-counter", {
              expanded: searchQuery && currentFoundElement >= 0
            })}
          >
            {isSearchLoading ? (
              <div className="new-tab__settings-menu-header__search-counter-icon">
                <LoadingIcon />
              </div>
            ) : (
              <div className="new-tab__settings-menu-header__search-counter-value">
                {currentFoundElement >= 0 && (
                  <>{`${currentFoundElement}/${foundElements.length}`}</>
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
          <div>
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
