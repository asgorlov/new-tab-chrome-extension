import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as SearchEngineIcon } from "../../../static/svgs/search-engine-icon.svg";
import { Checkbox, Collapse, Select } from "antd";
import { SEARCH_ENGINE_NAMES } from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";

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
  const { Panel } = Collapse;

  return (
    <Collapse accordion={true} bordered={false} expandIconPosition="end">
      <Panel
        className={clsx("new-tab__settings-menu_search-engine", {
          dark: isDark
        })}
        header={
          <div
            className={clsx("new-tab__settings-menu_search-engine-header", {
              dark: isDark
            })}
          >
            <SearchEngineIcon />
            <span>{t("searchEngine.title")}</span>
          </div>
        }
        key={t("searchEngine.title")}
      >
        <div
          className={clsx("new-tab__settings-menu_search-engine-content", {
            dark: isDark
          })}
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
            options={SEARCH_ENGINE_NAMES.map(name => {
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
            })}
          />
        </div>
      </Panel>
    </Collapse>
  );
};

export default SearchEngineSettingComponent;
