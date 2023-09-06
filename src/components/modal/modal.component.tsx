import { FC, memo, ReactNode } from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/es/modal/interface";
import clsx from "clsx";

/**
 * Передаваемые параметры для компонента модального окна
 * @property isDark - Флаг темной темы
 * @property children - Компоненты-потомки
 * @interface
 */
export interface ModalComponentProps extends ModalProps {
  isDark?: boolean;
  children?: ReactNode;
}

/**
 * Компонент модального окна
 * @category Components
 */
const ModalComponent: FC<ModalComponentProps> = memo(
  ({ width = "400px", isDark, children, className = "", ...rest }) => {
    return (
      <Modal
        width="400px"
        className={clsx("new-tab__modal", { dark: isDark }, className)}
        children={children}
        {...rest}
      />
    );
  }
);

export default ModalComponent;
