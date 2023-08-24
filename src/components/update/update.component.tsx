import { FC, MouseEvent } from "react";
import Link from "antd/lib/typography/Link";
import { getDownloadLink } from "../../utils/update.utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button } from "antd/lib";
import clsx from "clsx";
import { ReactComponent as InfoIcon } from "../../static/svgs/info-icon.svg";
import { ReactComponent as CloseIcon } from "../../static/svgs/close-icon.svg";
import {
  selectIsDark,
  selectLastVersion,
  selectSearchEngine
} from "../../store/new-tab/new-tab.selectors";

/**
 * Передаваемые параметры для компонента обновлений приложения
 * @property open - Флаг появления нотификации об обновлении
 * @property onClose - Функция закрытия нотификации
 * @property onMouseDown - Функция клика по ссылке скачивания обновлений
 * @interface
 */
export interface UpdateComponentProps {
  open: boolean;
  onClose: () => void;
  onMouseDown: (e: MouseEvent) => void;
}

/**
 * Компонент обновлений приложения
 * @category Components
 */
const UpdateComponent: FC<UpdateComponentProps> = ({
  open,
  onClose,
  onMouseDown
}) => {
  const { t } = useTranslation();
  const isDark = useSelector(selectIsDark);
  const lastVersion = useSelector(selectLastVersion);
  const searchEngine = useSelector(selectSearchEngine);

  return (
    <div
      className={clsx("new-tab__update", {
        dark: isDark,
        _open: open
      })}
    >
      <InfoIcon className={clsx("new-tab__update-info-icon", searchEngine)} />
      <div className="new-tab__update-header">{t("update.info.message")}</div>
      <div className="new-tab__update-content">
        <span>{t("update.info.description", { lastVersion })}</span>
        <Link
          target="_blank"
          href={getDownloadLink(lastVersion)}
          onMouseDown={onMouseDown}
        >
          {t("update.info.download")}
        </Link>
      </div>
      <Button
        className="new-tab__update-close-btn"
        type="text"
        icon={<CloseIcon />}
        onClick={onClose}
      />
    </div>
  );
};

export default UpdateComponent;
