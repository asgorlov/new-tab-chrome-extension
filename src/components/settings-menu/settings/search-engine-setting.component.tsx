import React, { ChangeEvent, FC, useCallback, useMemo, useState } from "react";
import { ReactComponent as SearchEngineIcon } from "../../../static/svgs/menu-settings/search-engine-icon.svg";
import {
  SEARCH_ENGINE_LINKS,
  SEARCH_ENGINE_NAMES,
  SEARXNG
} from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import CollapseComponent from "../../common/collapse/collapse.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchEngine,
  selectSearchEngines,
  selectSearXngUrl
} from "../../../store/new-tab/new-tab.selectors";
import { AppDispatch } from "../../../store/store";
import {
  setSearchEngines,
  setSearXngUrl
} from "../../../store/new-tab/new-tab.slice";
import CheckboxComponent from "../../common/checkbox/checkbox.component";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import SelectComponent from "../../common/select/select.component";
import { CollapsedMenuSetting } from "../../../constants/settings-menu.constants";
import InputComponent from "../../common/input/input.component";
import clsx from "clsx";
import { useDebounceEffect } from "ahooks";
import { InputStatus } from "antd/es/_util/statusUtils";
import {
  ERROR_INPUT_STATUS,
  LAST_SPEC_CHAR_REG_EXP,
  PROTOCOL_REG_EXP,
  URL_REG_EXP
} from "../../../constants/search-engine-setting.constants";
import TooltipComponent from "../../common/tooltip/tooltip.component";
import { useTourStepFourContext } from "../../../contexts/tour.context";

/**
 * Компонент настройки выбора поисковых систем
 * @category Components
 */
const SearchEngineSettingComponent: FC = () => {
  const { t } = useTranslation();
  const tourCtx = useTourStepFourContext();
  const dispatch = useDispatch<AppDispatch>();

  const searXngUrl = useSelector(selectSearXngUrl);
  const searchEngine = useSelector(selectSearchEngine);
  const searchEngines = useSelector(selectSearchEngines);

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [inputStatus, setInputStatus] = useState<InputStatus>("");
  const [inputValue, setInputValue] = useState(searXngUrl);

  const options = useMemo(() => {
    return SEARCH_ENGINE_NAMES.map(name => {
      return {
        value: name,
        label: t(`searchEngine.${name}`),
        key: name
      };
    });
  }, [t]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value),
    []
  );

  const handleFocus = useCallback(() => setIsInputFocused(true), []);

  const handleBlur = useCallback(() => setIsInputFocused(false), []);

  const handleChangeAddAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        dispatch(setSearchEngines(SEARCH_ENGINE_NAMES));
      }
    },
    [dispatch]
  );

  const handleChangeRemoveAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        dispatch(setSearchEngines([]));
      }
    },
    [dispatch]
  );

  useDebounceEffect(
    () => {
      const isValidUrl = !inputValue || URL_REG_EXP.test(inputValue);

      if (isValidUrl) {
        const value = inputValue
          .replaceAll("\\", "/")
          .replace(LAST_SPEC_CHAR_REG_EXP, "");
        let url = "";

        if (value) {
          const isDefaultSearXNG =
            value.replace(PROTOCOL_REG_EXP, "") ===
            SEARCH_ENGINE_LINKS.searxng.replace(PROTOCOL_REG_EXP, "");
          if (!isDefaultSearXNG) {
            url = value;
          }
        }

        setInputValue(value);
        setInputStatus("");
        dispatch(setSearXngUrl(url));
      } else {
        setInputStatus(ERROR_INPUT_STATUS);
      }
    },
    [dispatch, inputValue],
    { wait: 400 }
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
      <div
        className="new-tab__settings-menu_search-engine-content-searxng-url"
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
      >
        <TooltipComponent
          overlayClassName="new-tab__settings-menu_search-engine-content-searxng-url_tooltip"
          open={tooltipOpen && !isInputFocused}
          title={t(
            `searchEngine.searXNGInput.${
              searchEngine === SEARXNG ? "tooltip" : "disabledTooltip"
            }`
          )}
          placement="bottomLeft"
        >
          <label
            className={clsx(
              "new-tab__settings-menu_search-engine-content-searxng-url_label",
              { _focused: inputValue || isInputFocused }
            )}
            children={t("searchEngine.searXNGInput.url")}
          />
          <InputComponent
            placeholder={SEARCH_ENGINE_LINKS.searxng}
            className="new-tab__settings-menu_search-engine-content-searxng-url_input"
            disabled={searchEngine !== SEARXNG}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            status={inputStatus}
            value={inputValue}
            ref={tourCtx}
          />
          <div
            className={clsx(
              "new-tab__settings-menu_search-engine-content-searxng-url_error",
              { _visible: inputStatus === ERROR_INPUT_STATUS }
            )}
            children={t("searchEngine.searXNGInput.invalidURL")}
          />
        </TooltipComponent>
      </div>
    </CollapseComponent>
  );
};

export default SearchEngineSettingComponent;
