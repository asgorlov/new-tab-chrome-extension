import React, { FC, memo, useMemo } from "react";
import { ReactComponent as UpdateIcon } from "../../../../static/svgs/menu-settings/update-icon.svg";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { CloudDownloadOutlined } from "@ant-design/icons";
import {
  checkForUpdates,
  CURRENT_EXT_VERSION
} from "../../../../constants/update.constants";
import CollapseComponent from "../../../common/collapse/collapse.component";
import SelectComponent from "../../../common/select/select.component";
import PopoverComponent from "../../../common/popover/popover.component";

/**
 * Передаваемые параметры для компонента настройки обновлений
 * @property isDark - Флаг темной темы
 * @property loading - Флаг загрузки обновлений
 * @property checkMode - Режимы запуска проверки обновлений
 * @property isPopoverOpen - Флаг открытия поповера рядом с кнопкой
 * @property onClickUpdates - Функция, вызываемая при клике по кнопке запуска обновлений
 * @property onChangeCheckMode - Функция, вызываемая при изменении режима запуска проверки обновлений
 * @property onOpenPopoverChange - Функция, вызываемая при клике по поповеру для скрытия
 * @interface
 */
export interface UpdateSettingComponentProps {
  isDark: boolean;
  loading: boolean;
  checkMode: string;
  isPopoverOpen: boolean;
  onClickUpdates: () => void;
  onChangeCheckMode: (value: string) => void;
  onOpenPopoverChange: (value: boolean) => void;
}

/**
 * Компонент настройки обновлений
 * @category Components
 */
const UpdateSettingComponent: FC<UpdateSettingComponentProps> = memo(
  ({
    isDark,
    loading,
    checkMode,
    isPopoverOpen,
    onClickUpdates,
    onChangeCheckMode,
    onOpenPopoverChange
  }) => {
    const { t } = useTranslation();

    const options = useMemo(() => {
      return Object.values(checkForUpdates).map(value => {
        return {
          value: value,
          label: t(`update.${value}`),
          key: value
        };
      });
    }, [t]);

    return (
      <CollapseComponent
        icon={<UpdateIcon />}
        title={t("update.title")}
        isDark={isDark}
        className="new-tab__settings-menu_update"
      >
        <div className="new-tab__settings-menu_update-content">
          <SelectComponent
            isDark={isDark}
            dropdownStyle={{ minWidth: "max-content" }}
            size="small"
            value={checkMode}
            onChange={onChangeCheckMode}
            options={options}
          />
          <PopoverComponent
            open={isPopoverOpen}
            isDark={isDark}
            title={t("update.info.notFound")}
            content={t("update.info.actualVersion", {
              actualVersion: CURRENT_EXT_VERSION
            })}
            onOpenChange={onOpenPopoverChange}
            className={"new-tab__settings-menu_update-content-check-button"}
          >
            <Button
              icon={<CloudDownloadOutlined />}
              loading={loading}
              disabled={checkMode !== checkForUpdates.MANUAL}
              size="small"
              onClick={onClickUpdates}
              children={t("update.check")}
            />
          </PopoverComponent>
        </div>
      </CollapseComponent>
    );
  }
);

export default UpdateSettingComponent;
