import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as LanguageIcon } from "../../../static/svgs/language-icon.svg";
import { Select } from "antd";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../../store/new-tab.slice";
import i18n from "../../../localizations/i18n";
import { useTranslation } from "react-i18next";

interface LanguageSettingProps {
  isDark: boolean;
  onChangeLanguage: (value: string) => void;
}

const LanguageSettingComponent: FC<LanguageSettingProps> = ({
  isDark,
  onChangeLanguage
}) => {
  const { t } = useTranslation();
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
        onChange={onChangeLanguage}
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
