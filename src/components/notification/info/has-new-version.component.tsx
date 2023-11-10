import { FC, MouseEvent } from "react";
import Link from "antd/lib/typography/Link";
import { getDownloadLink } from "../../../utils/update.utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectLastVersion } from "../../../store/new-tab/new-tab.selectors";

/**
 * Компонент контента информационной нотификации о новой версии обновления
 * @category Components
 */
const HasNewVersionComponent: FC = () => {
  const { t } = useTranslation();
  const lastVersion = useSelector(selectLastVersion);

  const onMouseDown = (e: MouseEvent<HTMLLinkElement>) => {
    if (e.button === 0 || e.button === 1) {
      window.open(e.currentTarget.href);
    }
  };

  return (
    <div className="new-tab__notification_has-new-version-content">
      <span>
        {t("notification.info.hasNewVersion.description", { lastVersion })}
      </span>
      <Link
        target="_blank"
        href={getDownloadLink(lastVersion)}
        onMouseDown={onMouseDown}
      >
        {t("notification.info.hasNewVersion.download")}
      </Link>
    </div>
  );
};

export default HasNewVersionComponent;
