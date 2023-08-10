import { FC } from "react";
import { Button, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import clsx from "clsx";
import { resetSettings } from "../../../store/new-tab/new-tab.thunks";

interface ResetSettingProps {
  isDark: boolean;
}

const ResetSettingComponent: FC<ResetSettingProps> = ({ isDark }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="new-tab__settings-menu_reset">
      <Popconfirm
        rootClassName={clsx("new-tab__settings-menu_reset-popconfirm", {
          dark: isDark
        })}
        title={t("resetSettings.title")}
        description={() => <>{t("resetSettings.message")}</>}
        okText={t("resetSettings.ok")}
        onConfirm={() => dispatch(resetSettings())}
        cancelText={t("resetSettings.cancel")}
      >
        <Button
          className={clsx("new-tab__settings-menu_reset-btn", { dark: isDark })}
        >
          {t("resetSettings.byDefault")}
        </Button>
      </Popconfirm>
    </div>
  );
};

export default ResetSettingComponent;
