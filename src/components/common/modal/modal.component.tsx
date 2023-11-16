import { FC, memo, ReactNode } from "react";
import { Modal } from "antd";
import { ModalProps } from "antd/es/modal/interface";
import clsx from "clsx";

/**
 * Передаваемые параметры для компонента модального окна
 * @property children - Компоненты-потомки
 * @interface
 */
export interface ModalComponentProps extends ModalProps {
  children?: ReactNode;
}

/**
 * Компонент модального окна
 * @category Components
 */
const ModalComponent: FC<ModalComponentProps> = memo(
  ({ width = "400px", children, className = "", ...rest }) => {
    return (
      <Modal
        width="400px"
        className={clsx("new-tab__modal", className)}
        children={children}
        {...rest}
      />
    );
  }
);

export default ModalComponent;
