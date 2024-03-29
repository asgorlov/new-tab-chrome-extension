import React, { FC, memo, ReactNode, useCallback } from "react";
import clsx from "clsx";
import { Collapse } from "antd";
import { CollapsedMenuSetting } from "../../../constants/settings-menu.constants";
import { useSettingRefsContext } from "../../../contexts/setting-refs.context";
import { useSettingActiveKeys } from "../../../hooks/use-active-keys.hook";
import { useDispatch } from "react-redux";
import { setSettingsActiveKeys } from "../../../store/new-tab/new-tab.slice";

/**
 * Передаваемые параметры для сворачиваемого компонента
 * @property icon - Иконка в хедере перед текстом
 * @property type - Тип настройки меню
 * @property title - Название в хедере
 * @property children - Компоненты-потомки
 * @property className - Название класса компонента
 * @property onChange - Функция передает имя сворачиваемого компонента при нажатии на него
 * @interface
 */
export interface CollapseComponentProps {
  icon: ReactNode;
  type: CollapsedMenuSetting;
  title: string;
  children?: ReactNode;
  className?: string;
  onChange?: (values: string | string[]) => void;
}

/**
 * Сворачиваемый компонент
 * @category Components
 */
const CollapseComponent: FC<CollapseComponentProps> = memo(
  ({ icon, type, title, children, className = "", onChange = () => {} }) => {
    const dispatch = useDispatch();
    const settingsSearchCtx = useSettingRefsContext();
    const settingActiveKeys = useSettingActiveKeys(type);

    const items = [
      {
        className: clsx("new-tab__collapse", className),
        children,
        label: (
          <div className="new-tab__collapse-header">
            <>{icon}</>
            <span>{title}</span>
          </div>
        ),
        ref: settingsSearchCtx[type],
        key: type
      }
    ];

    const handleChange = useCallback(
      (key: string | string[]) => {
        onChange(key);
        dispatch(setSettingsActiveKeys({ [type]: key }));
      },
      [dispatch, onChange, type]
    );

    return (
      <Collapse
        accordion
        bordered={false}
        activeKey={settingActiveKeys}
        expandIconPosition="end"
        onChange={handleChange}
        items={items}
      />
    );
  }
);

export default CollapseComponent;
