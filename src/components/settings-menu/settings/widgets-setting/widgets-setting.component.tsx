import React, {
  FC,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState
} from "react";
import { CollapsedMenuSetting } from "../../../../constants/settings-menu.constants";
import { useTranslation } from "react-i18next";
import { ReactComponent as WidgetIcon } from "../../../../static/svgs/menu-settings/widget-icon.svg";
import SelectComponent from "../../../common/select/select.component";
import { WidgetName } from "../../../../constants/widget.constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsWidgetsOnRight,
  setWidgets
} from "../../../../store/new-tab/new-tab.slice";
import CheckboxComponent from "../../../common/checkbox/checkbox.component";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Button, Switch } from "antd";
import {
  selectIsWidgetsOnRight,
  selectWidgets
} from "../../../../store/new-tab/new-tab.selectors";
import CollapseComponent from "../../../common/collapse/collapse.component";
import { AppDispatch } from "../../../../store/store";
import CurrencyWidgetSettingComponent from "./currency-widget-setting.component";
import { VoidFunc } from "../../../../models/common.model";
import { NOOP } from "../../../../constants/common.constants";
import TimeWidgetSettingComponent from "./time-widget-setting.component";
import WeatherWidgetSettingComponent from "./weather-widget-setting.component";

/**
 * Компонент настройки виджетов
 * @category Components
 */
const WidgetsSettingComponent: FC = () => {
  const { t } = useTranslation();
  const id = useId();
  const dispatch = useDispatch<AppDispatch>();
  const widgetSettingRefs = useRef(new Map<string, VoidFunc>());

  const widgets = useSelector(selectWidgets);
  const isWidgetsOnRight = useSelector(selectIsWidgetsOnRight);

  const initialWidgetChanges = widgets
    .map(w => ({ [w]: false }))
    .reduce((acc, entry) => Object.assign(acc, entry), {});
  const [widgetChanges, setWidgetChanges] = useState(initialWidgetChanges);

  const widgetOptions = useMemo(() => {
    return Object.values(WidgetName).map(name => {
      return {
        value: name,
        label: t(`widgets.${name}`),
        key: name
      };
    });
  }, [t]);
  const disableSaveBtn = Object.values(widgetChanges).every(
    isChanged => !isChanged
  );

  const setIsSavedChanges = (name: WidgetName, isChanged: boolean) => {
    setWidgetChanges(prevState => {
      return prevState[name] !== isChanged
        ? { ...prevState, [name]: isChanged }
        : prevState;
    });
  };

  const onSaveSettings = useCallback(() => {
    Object.entries(widgetChanges)
      .filter(e => e[1])
      .map(e => e[0])
      .forEach(w => widgetSettingRefs.current.get(w)?.());
  }, [widgetChanges, widgetSettingRefs]);

  const handleChangeAddAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        const allWidgets = Object.values(WidgetName);
        dispatch(setWidgets(allWidgets));
      }
    },
    [dispatch]
  );

  const handleChangeRemoveAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        dispatch(setWidgets([]));
        dispatch(setIsWidgetsOnRight(false));
      }
    },
    [dispatch]
  );

  return (
    <CollapseComponent
      icon={<WidgetIcon />}
      type={CollapsedMenuSetting.WIDGETS}
      title={t("widgets.title")}
      className="new-tab__settings-menu_widgets"
    >
      <div className="new-tab__settings-menu_widgets-content">
        <div className="new-tab__settings-menu_widgets-content-checkbox-group">
          <CheckboxComponent
            checked={widgets.length === widgetOptions.length}
            onChange={handleChangeAddAll}
            children={t("widgets.selectAll")}
          />
          <CheckboxComponent
            checked={widgets.length === 0}
            onChange={handleChangeRemoveAll}
            children={t("widgets.removeAll")}
          />
        </div>
        <SelectComponent
          className="new-tab__settings-menu_widgets-content-selector"
          mode="multiple"
          maxTagCount="responsive"
          value={widgets}
          onChange={v => dispatch(setWidgets(v))}
          options={widgetOptions}
        />
        <div className="new-tab__settings-menu_widgets-content-switcher">
          <label htmlFor={id}>{t("widgets.switcherTitle")}</label>
          <Switch
            id={id}
            checkedChildren={t("widgets.right")}
            unCheckedChildren={t("widgets.left")}
            checked={isWidgetsOnRight}
            disabled={widgets.length === 0}
            onClick={() => dispatch(setIsWidgetsOnRight(!isWidgetsOnRight))}
          />
        </div>
        {widgets.map(w => {
          switch (w) {
            case WidgetName.WEATHER:
              return (
                <WeatherWidgetSettingComponent
                  key={w}
                  ref={ref => widgetSettingRefs.current.set(w, ref ?? NOOP)}
                  setIsSavedChanges={v => setIsSavedChanges(w, v)}
                />
              );
            case WidgetName.CURRENCY:
              return (
                <CurrencyWidgetSettingComponent
                  key={w}
                  ref={ref => widgetSettingRefs.current.set(w, ref ?? NOOP)}
                  setIsSavedChanges={v => setIsSavedChanges(w, v)}
                />
              );
            case WidgetName.TIME:
              return (
                <TimeWidgetSettingComponent
                  key={w}
                  ref={ref => widgetSettingRefs.current.set(w, ref ?? NOOP)}
                  setIsSavedChanges={v => setIsSavedChanges(w, v)}
                />
              );
            default:
              return null;
          }
        })}
        {widgets.length > 0 && (
          <div className="new-tab__settings-menu_widgets-content__save-btn-wrapper">
            <Button
              className="new-tab__settings-menu_widgets-content__save-btn"
              size="small"
              disabled={disableSaveBtn}
              onClick={onSaveSettings}
              children={t("widgets.saveButton")}
            />
          </div>
        )}
      </div>
    </CollapseComponent>
  );
};

export default WidgetsSettingComponent;
