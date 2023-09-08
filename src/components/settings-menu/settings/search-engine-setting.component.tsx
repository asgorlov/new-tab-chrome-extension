import React, { FC, useMemo } from "react";
import { ReactComponent as SearchEngineIcon } from "../../../static/svgs/menu-settings/search-engine-icon.svg";
import { SEARCH_ENGINE_NAMES } from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import CollapseComponent from "../../common/collapse/collapse.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsDark,
  selectSearchEngines
} from "../../../store/new-tab/new-tab.selectors";
import { AppDispatch } from "../../../store/store";
import { setSearchEngines } from "../../../store/new-tab/new-tab.slice";
import CheckboxComponent from "../../common/checkbox/checkbox.component";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import SelectComponent from "../../common/select/select.component";

/**
 * Компонент настройки выбора поисковых систем
 * @category Components
 */
const SearchEngineSettingComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useSelector(selectIsDark);
  const searchEngines = useSelector(selectSearchEngines);

  const options = useMemo(() => {
    return SEARCH_ENGINE_NAMES.map(name => {
      return {
        value: name,
        label: t(`searchEngine.${name}`),
        key: name
      };
    });
  }, [t]);

  const handleChangeAddAll = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      const allSearchEngines = searchEngines.concat(
        SEARCH_ENGINE_NAMES.filter(name => !searchEngines.includes(name))
      );
      dispatch(setSearchEngines(allSearchEngines));
    }
  };
  const handleChangeRemoveAll = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      dispatch(setSearchEngines([]));
    }
  };

  return (
    <CollapseComponent
      icon={<SearchEngineIcon />}
      title={t("searchEngine.title")}
      isDark={isDark}
      className="new-tab__settings-menu_search-engine"
    >
      <div className="new-tab__settings-menu_search-engine-content-checkbox-group">
        <CheckboxComponent
          isDark={isDark}
          checked={searchEngines.length === SEARCH_ENGINE_NAMES.length}
          onChange={handleChangeAddAll}
        >
          {t("searchEngine.selectAll")}
        </CheckboxComponent>
        <CheckboxComponent
          isDark={isDark}
          checked={searchEngines.length === 0}
          onChange={handleChangeRemoveAll}
        >
          {t("searchEngine.removeAll")}
        </CheckboxComponent>
      </div>
      <SelectComponent
        isDark={isDark}
        className="new-tab__settings-menu_search-engine-content-selector"
        mode="multiple"
        maxTagCount="responsive"
        value={searchEngines}
        onChange={v => dispatch(setSearchEngines(v))}
        options={options}
      />
    </CollapseComponent>
  );
};

export default SearchEngineSettingComponent;
