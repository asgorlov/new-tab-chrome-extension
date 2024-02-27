import React, { FC, useCallback, useId, useMemo } from "react";
import { CollapsedMenuSetting } from "../../../constants/settings-menu.constants";
import {
  CollapseComponent,
  selectWidgets,
  selectIsWidgetsOnRight
} from "../../../typedoc";
import { useTranslation } from "react-i18next";
import { ReactComponent as WidgetIcon } from "../../../static/svgs/menu-settings/widget-icon.svg";
import SelectComponent from "../../common/select/select.component";
import { WidgetName } from "../../../constants/widget.constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsWidgetsOnRight,
  setWidgets
} from "../../../store/new-tab/new-tab.slice";
import CheckboxComponent from "../../common/checkbox/checkbox.component";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Switch } from "antd";

/**
 * Компонент настройки виджетов
 * @category Components
 */
const WidgetsSettingComponent: FC = () => {
  const { t } = useTranslation();
  const id = useId();
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);
  const isWidgetsOnRight = useSelector(selectIsWidgetsOnRight);

  const options = useMemo(() => {
    return Object.values(WidgetName).map(name => {
      return {
        value: name,
        label: t(`widgets.${name}`),
        key: name
      };
    });
  }, [t]);

  const handleChangeAddAll = useCallback(
    (event: CheckboxChangeEvent) => {
      if (event.target.checked) {
        const allWidgets = Object.values(WidgetName);
        dispatch(setWidgets(allWidgets));
      }
    },
    [widgets, dispatch]
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
            checked={widgets.length === options.length}
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
          options={options}
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
      </div>
    </CollapseComponent>
  );
};

export default WidgetsSettingComponent;
