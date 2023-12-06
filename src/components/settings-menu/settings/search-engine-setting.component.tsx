import React, { ChangeEvent, FC, useCallback, useMemo, useState } from "react";
import { ReactComponent as SearchEngineIcon } from "../../../static/svgs/menu-settings/search-engine-icon.svg";
import {
  SEARCH_ENGINE_NAMES,
  SEARXNG
} from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import CollapseComponent from "../../common/collapse/collapse.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchEngine,
  selectSearchEngines
} from "../../../store/new-tab/new-tab.selectors";
import { AppDispatch } from "../../../store/store";
import { setSearchEngines } from "../../../store/new-tab/new-tab.slice";
import CheckboxComponent from "../../common/checkbox/checkbox.component";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import SelectComponent from "../../common/select/select.component";
import { CollapsedMenuSetting } from "../../../constants/settings-menu.constants";
import InputComponent from "../../common/input/input.component";
import clsx from "clsx";

/**
 * Компонент настройки выбора поисковых систем
 * @category Components
 */
const SearchEngineSettingComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const searchEngine = useSelector(selectSearchEngine);
  const searchEngines = useSelector(selectSearchEngines);

  const [isLabelOnTop, setIsLabelOnTop] = useState(false);
  const [searXngUrl, setSearXngUrl] = useState("");

  const options = useMemo(() => {
    return SEARCH_ENGINE_NAMES.map(name => {
      return {
        value: name,
        label: t(`searchEngine.${name}`),
        key: name
      };
    });
  }, [t]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value) {
      setIsLabelOnTop(true);
    }

    setSearXngUrl(e.currentTarget.value);
  }, []);

  const handleFocus = useCallback(() => {
    if (!searXngUrl) {
      setIsLabelOnTop(true);
    }
  }, [searXngUrl]);

  const handleBlur = useCallback(() => {
    if (!searXngUrl) {
      setIsLabelOnTop(false);
    }
  }, [searXngUrl]);

  const handleChangeAddAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        const allSearchEngines = searchEngines.concat(
          SEARCH_ENGINE_NAMES.filter(name => !searchEngines.includes(name))
        );
        dispatch(setSearchEngines(allSearchEngines));
      }
    },
    [searchEngines]
  );

  const handleChangeRemoveAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        dispatch(setSearchEngines([]));
      }
    },
    [dispatch]
  );

  return (
    <CollapseComponent
      icon={<SearchEngineIcon />}
      type={CollapsedMenuSetting.SEARCH_ENGINE}
      title={t("searchEngine.title")}
      className="new-tab__settings-menu_search-engine"
    >
      <div className="new-tab__settings-menu_search-engine-content-checkbox-group">
        <CheckboxComponent
          checked={searchEngines.length === SEARCH_ENGINE_NAMES.length}
          onChange={handleChangeAddAll}
        >
          {t("searchEngine.selectAll")}
        </CheckboxComponent>
        <CheckboxComponent
          checked={searchEngines.length === 0}
          onChange={handleChangeRemoveAll}
        >
          {t("searchEngine.removeAll")}
        </CheckboxComponent>
      </div>
      <SelectComponent
        className="new-tab__settings-menu_search-engine-content-selector"
        mode="multiple"
        maxTagCount="responsive"
        value={searchEngines}
        onChange={v => dispatch(setSearchEngines(v))}
        options={options}
      />
      <div className="new-tab__settings-menu_search-engine-content-searxng-url">
        <label
          className={clsx(
            "new-tab__settings-menu_search-engine-content-searxng-url_label",
            { _focused: isLabelOnTop }
          )}
        >
          {t("searchEngine.searXNGURL")}
        </label>
        <InputComponent
          className="new-tab__settings-menu_search-engine-content-searxng-url_input"
          disabled={searchEngine !== SEARXNG}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searXngUrl}
        />
      </div>
    </CollapseComponent>
  );
};

export default SearchEngineSettingComponent;
