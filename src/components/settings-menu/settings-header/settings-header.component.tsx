import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectIsDark } from "../../../store/new-tab/new-tab.selectors";
import { ReactComponent as SearchIcon } from "../../../static/svgs/menu-settings/settings-search-icon.svg";
import { ReactComponent as CloseIcon } from "../../../static/svgs/menu-settings/settings-search-close-icon.svg";

export interface SettingsHeaderComponentProps {}

const SettingsHeaderComponent: FC<SettingsHeaderComponentProps> = () => {
  const { t } = useTranslation();
  const isDark = useSelector(selectIsDark);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const clickCallback = useMemo(() => {
    return (event: Event) => {
      const isClickOutside = !searchRef.current?.contains(event.target as Node);
      if (isClickOutside) {
        setIsExpanded(false);
      }
    };
  }, [searchRef]);

  const onClickButton = () => {
    inputRef.current?.focus();

    if (searchQuery) {
      setSearchQuery("");
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  useEffect(() => {
    const handleListener =
      isExpanded && !searchQuery
        ? document.addEventListener
        : document.removeEventListener;
    handleListener("click", clickCallback);
  }, [isExpanded, searchQuery, clickCallback]);

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
          onChange={e => setSearchQuery(e.target.value)}
          className="new-tab__settings-menu-header__search-input"
          placeholder={t("searchBySettings")}
        />
        <div
          className={clsx("new-tab__settings-menu-header__search-controls", {
            expanded: searchQuery
          })}
        >
          <div />
          <button>{"<"}</button>
          <button>{">"}</button>
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
};

export default SettingsHeaderComponent;
