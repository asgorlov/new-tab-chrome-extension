import { FC, useState } from "react";
import { Button, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { resetSettings } from "../../../store/new-tab.slice";
import { AppDispatch } from "../../../store/store";

interface ResetSettingProps {}

const ResetSettingComponent: FC<ResetSettingProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);

  return (
    <div className="new-tab__settings-menu_reset">
      <Button onClick={() => setOpen(true)}>
        {t("resetSettings.byDefault")}
      </Button>
      <Modal
        centered={true}
        width={"max-content"}
        title={t("resetSettings.title")}
        open={open}
        okText={t("resetSettings.ok")}
        onOk={() => {
          setOpen(false);
          dispatch(resetSettings());
        }}
        cancelText={t("resetSettings.cancel")}
        onCancel={() => setOpen(false)}
      >
        {t("resetSettings.message")}
      </Modal>
    </div>
  );
};

export default ResetSettingComponent;
