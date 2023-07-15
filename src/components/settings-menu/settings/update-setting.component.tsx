import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as UpdateIcon } from "../../../static/svgs/menu-settings/update-icon.svg";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectCheckForUpdates } from "../../../store/new-tab.slice";
import { checkForUpdates } from "../../../constants/check-for-updates.constants";

interface UpdateSettingComponentProps {
  isDark: boolean;
  onChangeCheckMode: (value: string) => void;
}

const UpdateSettingComponent: FC<UpdateSettingComponentProps> = ({
  isDark,
  onChangeCheckMode
}) => {
  const { t } = useTranslation();
  const checkMode = useSelector(selectCheckForUpdates);

  return (
    <div className={clsx("new-tab__settings-menu_update", { dark: isDark })}>
      <div className="new-tab__settings-menu_update-header">
        <div className="new-tab__settings-menu_update-header-icon">
          <UpdateIcon />
        </div>
        <span>{t("update.title")}</span>
      </div>
      <Select
        className="new-tab__settings-menu_update-selector"
        popupClassName={clsx("new-tab__settings-menu_update-dropdown", {
          dark: isDark
        })}
        dropdownStyle={{ minWidth: "max-content" }}
        size="small"
        bordered={false}
        showArrow={false}
        value={checkMode}
        onChange={onChangeCheckMode}
        placement="bottomRight"
        optionLabelProp="label"
        options={Object.values(checkForUpdates).map(value => {
          return {
            className: clsx("new-tab__settings-menu_update-dropdown-item", {
              dark: isDark
            }),
            value: value,
            label: t(`update.${value}`),
            key: value
          };
        })}
      />
    </div>
  );
};

export default UpdateSettingComponent;
