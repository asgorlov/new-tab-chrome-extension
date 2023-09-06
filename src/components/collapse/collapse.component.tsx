import React, { FC, memo, ReactNode } from "react";
import clsx from "clsx";
import { Collapse } from "antd";

/**
 * Передаваемые параметры для сворачиваемого компонента
 * @property icon - Иконка в хедере перед текстом
 * @property title - Название в хедере
 * @property isDark - Флаг темного режима
 * @property children - Компоненты-потомки
 * @property className - Название класса компонента
 * @property onChange - Функция передает имя сворачиваемого компонента при нажатии на него
 * @interface
 */
export interface CollapseComponentProps {
  icon: ReactNode;
  title: string;
  isDark: boolean;
  children?: ReactNode;
  className?: string;
  onChange?: (values: string | string[]) => void;
}

/**
 * Сворачиваемый компонент
 * @category Components
 */
const CollapseComponent: FC<CollapseComponentProps> = memo(
  ({ icon, title, isDark, children, className = "", onChange = () => {} }) => {
    const { Panel } = Collapse;
    const panelClassName = clsx(
      "new-tab__collapse",
      { dark: isDark },
      className
    );

    return (
      <Collapse
        accordion
        bordered={false}
        expandIconPosition="end"
        onChange={onChange}
      >
        <Panel
          className={panelClassName}
          children={children}
          header={
            <div className="new-tab__collapse-header">
              <>{icon}</>
              <span>{title}</span>
            </div>
          }
          key={title}
        />
      </Collapse>
    );
  }
);

export default CollapseComponent;
