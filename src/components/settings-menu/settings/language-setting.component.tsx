import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as LanguageIcon } from "../../../static/svgs/menu-settings/language-icon.svg";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../../localizations/i18n";
import { useTranslation } from "react-i18next";
import {
  selectCurrentLanguage,
  selectIsDark
} from "../../../store/new-tab/new-tab.selectors";
import { changeLanguage } from "../../../store/new-tab/new-tab.thunks";
import { AppDispatch } from "../../../store/store";

/**
 * Компонент настройки языка
 * @category Components
 */
const LanguageSettingComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useSelector(selectIsDark);
  const currentLanguage = useSelector(selectCurrentLanguage);

  return (
    <div className={clsx("new-tab__settings-menu_language", { dark: isDark })}>
      <div className="new-tab__settings-menu_language-header">
        <LanguageIcon />
        <span>{t("language.title")}</span>
      </div>
      <Select
        className="new-tab__settings-menu_language-selector"
        popupClassName={clsx("new-tab__settings-menu_language-dropdown", {
          dark: isDark
        })}
        dropdownStyle={{ minWidth: "max-content" }}
        size="small"
        bordered={false}
        showArrow={false}
        value={currentLanguage}
        onChange={v => dispatch(changeLanguage(v))}
        placement="bottomRight"
        optionLabelProp="label"
        options={i18n.languages.map(lng => {
          return {
            className: clsx("new-tab__settings-menu_language-dropdown-item", {
              dark: isDark
            }),
            value: lng,
            label: t(`language.${lng}`),
            key: lng
          };
        })}
      />
    </div>
  );
};

export default LanguageSettingComponent;
