import React, { FC } from "react";
import clsx from "clsx";
import { ReactComponent as UpdateIcon } from "../../../../static/svgs/menu-settings/update-icon.svg";
import { Button, Popover, Select } from "antd";
import { useTranslation } from "react-i18next";
import { CloudDownloadOutlined } from "@ant-design/icons";
import {
  checkForUpdates,
  CURRENT_EXT_VERSION
} from "../../../../constants/update.constants";
import CollapseComponent from "../collapse.component";
import { SelectOption } from "../../../../models/select-option.model";

interface UpdateSettingComponentProps {
  isDark: boolean;
  loading: boolean;
  checkMode: string;
  isPopoverOpen: boolean;
  onClickUpdates: () => void;
  onChangeCheckMode: (value: string) => void;
  onOpenPopoverChange: (value: boolean) => void;
}

const UpdateSettingComponent: FC<UpdateSettingComponentProps> = ({
  isDark,
  loading,
  checkMode,
  isPopoverOpen,
  onClickUpdates,
  onChangeCheckMode,
  onOpenPopoverChange
}) => {
  const { t } = useTranslation();
  const getOption = (value: string): SelectOption => {
    return {
      className: clsx("new-tab__settings-menu_update-content-dropdown-item", {
        dark: isDark
      }),
      value: value,
      label: t(`update.${value}`),
      key: value
    };
  };

  return (
    <CollapseComponent
      icon={<UpdateIcon />}
      title={t("update.title")}
      isDark={isDark}
      className="new-tab__settings-menu_update"
    >
      <Select
        className="new-tab__settings-menu_update-content-selector"
        popupClassName={clsx("new-tab__settings-menu_update-content-dropdown", {
          dark: isDark
        })}
        dropdownStyle={{ minWidth: "max-content" }}
        size="small"
        value={checkMode}
        onChange={onChangeCheckMode}
        options={Object.values(checkForUpdates).map(value => getOption(value))}
      />
      <Popover
        placement="bottom"
        open={isPopoverOpen}
        destroyTooltipOnHide={true}
        overlayStyle={{ width: "200px" }}
        title={t("update.info.notFound")}
        content={t("update.info.actualVersion", {
          actualVersion: CURRENT_EXT_VERSION
        })}
        trigger="click"
        onOpenChange={onOpenPopoverChange}
        getPopupContainer={() =>
          document.querySelector(
            ".new-tab__settings-menu_update-content"
          ) as HTMLElement
        }
      >
        <Button
          className={clsx(
            "new-tab__settings-menu_update-content-check-button",
            { dark: isDark }
          )}
          icon={<CloudDownloadOutlined />}
          loading={loading}
          disabled={checkMode !== checkForUpdates.MANUAL}
          size="small"
          onClick={onClickUpdates}
          children={t("update.check")}
        />
      </Popover>
    </CollapseComponent>
  );
};

export default UpdateSettingComponent;
