import React, { FC, useMemo } from "react";
import { ReactComponent as LanguageIcon } from "../../../static/svgs/menu-settings/language-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../../localizations/i18n";
import { useTranslation } from "react-i18next";
import { selectCurrentLanguage } from "../../../store/new-tab/new-tab.selectors";
import { changeLanguage } from "../../../store/new-tab/new-tab.thunks";
import { AppDispatch } from "../../../store/store";
import SelectComponent from "../../common/select/select.component";
import { useSettingRefsContext } from "../../../contexts/setting-refs.context";
import { MenuSetting } from "../../../constants/settings-menu.constants";

/**
 * Компонент настройки языка
 * @category Components
 */
const LanguageSettingComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const settingsSearchCtx = useSettingRefsContext();

  const currentLanguage = useSelector(selectCurrentLanguage);

  const options = useMemo(() => {
    return i18n.languages.map(lng => {
      return {
        className: "new-tab__settings-menu_language-dropdown-item",
        value: lng,
        label: t(`language.${lng}`),
        key: lng
      };
    });
  }, [t]);

  return (
    <div
      ref={settingsSearchCtx[MenuSetting.LANGUAGE]}
      className="new-tab__settings-menu_language"
    >
      <div className="new-tab__settings-menu_language-header">
        <LanguageIcon />
        <span>{t("language.title")}</span>
      </div>
      <SelectComponent
        className="new-tab__settings-menu_language-selector"
        dropdownStyle={{ minWidth: "max-content" }}
        size="small"
        bordered={false}
        suffixIcon={null}
        value={currentLanguage}
        onChange={v => dispatch(changeLanguage(v))}
        placement="bottomRight"
        optionLabelProp="label"
        options={options}
      />
    </div>
  );
};

export default LanguageSettingComponent;
