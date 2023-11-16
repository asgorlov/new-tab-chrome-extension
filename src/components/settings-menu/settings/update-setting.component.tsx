import React, { FC, useMemo } from "react";
import { ReactComponent as UpdateIcon } from "../../../static/svgs/menu-settings/update-icon.svg";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { checkForUpdates } from "../../../constants/update.constants";
import CollapseComponent from "../../common/collapse/collapse.component";
import SelectComponent from "../../common/select/select.component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  selectCheckForUpdates,
  selectCheckLoading
} from "../../../store/new-tab/new-tab.selectors";
import { checkUpdates } from "../../../store/new-tab/new-tab.thunks";
import { setCheckForUpdates } from "../../../store/new-tab/new-tab.slice";
import { CollapsedMenuSetting } from "../../../constants/settings-menu.constants";

/**
 * Компонент настройки обновлений
 * @category Components
 */
const UpdateSettingComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const options = useMemo(
    () =>
      Object.values(checkForUpdates).map(value => ({
        value: value,
        label: t(`update.${value}`),
        key: value
      })),
    [t]
  );

  const loading = useSelector(selectCheckLoading);
  const checkMode = useSelector(selectCheckForUpdates);

  const onClickUpdates = () => dispatch(checkUpdates());
  const onChangeCheckMode = (v: string) => dispatch(setCheckForUpdates(v));

  return (
    <CollapseComponent
      icon={<UpdateIcon />}
      type={CollapsedMenuSetting.UPDATE}
      title={t("update.title")}
      className="new-tab__settings-menu_update"
    >
      <div className="new-tab__settings-menu_update-content">
        <SelectComponent
          dropdownStyle={{ minWidth: "max-content" }}
          size="small"
          value={checkMode}
          onChange={onChangeCheckMode}
          options={options}
        />
        <Button
          className="new-tab__settings-menu_update-content-check-button"
          icon={<CloudDownloadOutlined />}
          loading={loading}
          disabled={checkMode !== checkForUpdates.MANUAL}
          size="small"
          onClick={onClickUpdates}
          children={t("update.check")}
        />
      </div>
    </CollapseComponent>
  );
};

export default UpdateSettingComponent;
