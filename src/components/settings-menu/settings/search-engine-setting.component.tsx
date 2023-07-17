import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as SearchEngineIcon } from "../../../static/svgs/menu-settings/search-engine-icon.svg";
import { Checkbox, Select } from "antd";
import { SEARCH_ENGINE_NAMES } from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import { SelectOption } from "../../../models/select-option.model";
import CollapseComponent from "./collapse.component";

interface SearchEngineSettingProps {
  isDark: boolean;
  searchEngineNames: string[];
  onChangeSearchEngines: (values: string[]) => void;
}

const SearchEngineSettingComponent: FC<SearchEngineSettingProps> = ({
  isDark,
  searchEngineNames,
  onChangeSearchEngines
}) => {
  const { t } = useTranslation();
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
          checked={searchEngineNames.length === SEARCH_ENGINE_NAMES.length}
          onChange={e => {
            if (e.target.checked) {
              const allSearchEngines = searchEngineNames.concat(
                SEARCH_ENGINE_NAMES.filter(
                  name => !searchEngineNames.includes(name)
                )
              );
              onChangeSearchEngines(allSearchEngines);
            }
          }}
        >
          {t("searchEngine.selectAll")}
        </Checkbox>
        <Checkbox
          checked={searchEngineNames.length === 0}
          onChange={e => {
            if (e.target.checked) {
              onChangeSearchEngines([]);
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
        value={searchEngineNames}
        onChange={onChangeSearchEngines}
        options={SEARCH_ENGINE_NAMES.map(name => getOption(name))}
      />
    </CollapseComponent>
  );
};

export default SearchEngineSettingComponent;
