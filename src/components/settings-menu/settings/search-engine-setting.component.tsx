import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as SearchEngineIcon } from "../../../static/svgs/menu-settings/search-engine-icon.svg";
import { Checkbox, Select } from "antd";
import { SEARCH_ENGINE_NAMES } from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import { SelectOption } from "../../../models/select-option.model";
import CollapseComponent from "./collapse.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsDark,
  selectSearchEngines
} from "../../../store/new-tab/new-tab.selectors";
import { AppDispatch } from "../../../store/store";
import { setSearchEngines } from "../../../store/new-tab/new-tab.slice";

/**
 * Компонент настройки выбора поисковых систем
 * @category Components
 */
const SearchEngineSettingComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useSelector(selectIsDark);
  const searchEngines = useSelector(selectSearchEngines);

  const getOption = (name: string): SelectOption => {
    return {
      className: clsx(
        "new-tab__settings-menu_search-engine-content-dropdown-item",
        {
          dark: isDark
        }
      ),
      value: name,
      label: t(`searchEngine.${name}`),
      key: name
    };
  };

  return (
    <CollapseComponent
      icon={<SearchEngineIcon />}
      title={t("searchEngine.title")}
      isDark={isDark}
      className="new-tab__settings-menu_search-engine"
    >
      <div className="new-tab__settings-menu_search-engine-content-checkbox-group">
        <Checkbox
          checked={searchEngines.length === SEARCH_ENGINE_NAMES.length}
          onChange={e => {
            if (e.target.checked) {
              const allSearchEngines = searchEngines.concat(
                SEARCH_ENGINE_NAMES.filter(
                  name => !searchEngines.includes(name)
                )
              );
              dispatch(setSearchEngines(allSearchEngines));
            }
          }}
        >
          {t("searchEngine.selectAll")}
        </Checkbox>
        <Checkbox
          checked={searchEngines.length === 0}
          onChange={e => {
            if (e.target.checked) {
              dispatch(setSearchEngines([]));
            }
          }}
        >
          {t("searchEngine.removeAll")}
        </Checkbox>
      </div>
      <Select
        className="new-tab__settings-menu_search-engine-content-selector"
        popupClassName={clsx(
          "new-tab__settings-menu_search-engine-content-dropdown",
          { dark: isDark }
        )}
        mode="multiple"
        maxTagCount="responsive"
        value={searchEngines}
        onChange={v => dispatch(setSearchEngines(v))}
        options={SEARCH_ENGINE_NAMES.map(name => getOption(name))}
      />
    </CollapseComponent>
  );
};

export default SearchEngineSettingComponent;
