import React, { FC, ReactNode, useEffect, useRef } from "react";
import { Notification } from "../../constants/notification.constants";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { resetNotifications } from "../../store/new-tab/new-tab.slice";
import {
  selectIsDark,
  selectNotifications
} from "../../store/new-tab/new-tab.selectors";
import clsx from "clsx";
import HasNewVersionComponent from "./info/has-new-version.component";
import { CURRENT_EXT_VERSION } from "../../constants/update.constants";

/**
 * Компонент информационных нотификаций
 * @category Components
 */
const NotificationComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const notificationRef = useRef(null);

  const isDark = useSelector(selectIsDark);
  const notifications = useSelector(selectNotifications);

  const [api, contextHolder] = notification.useNotification({
    getContainer: () => notificationRef.current ?? document.body
  });

  useEffect(() => {
    if (notifications.length) {
      const showError = (key: Notification) => {
        api.error({
          duration: 30,
          message: t("notification.error.title"),
          description: t(`notification.error.${key}`)
        });
      };
      const showInfo = (key: Notification, description: ReactNode) => {
        api.info({
          duration: 0,
          message: t(`notification.info.${key}.title`),
          description
        });
      };

      notifications.forEach(n => {
        switch (n) {
          case Notification.HasNewVersion:
            showInfo(n, <HasNewVersionComponent />);
            break;
          case Notification.NoNewVersion:
            showInfo(
              n,
              t(`notification.info.${n}.description`, {
                actualVersion: CURRENT_EXT_VERSION
              })
            );
            break;
          case Notification.CanNotGetNightPeriod:
          case Notification.CanNotGetUpdateManifest:
            showError(n);
        }
      });

      dispatch(resetNotifications());
    }
  }, [api, t, notifications, dispatch]);

  return (
    <div
      className={clsx("new-tab__notification", { dark: isDark })}
      ref={notificationRef}
    >
      {contextHolder}
    </div>
  );
};

export default NotificationComponent;
