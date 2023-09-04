import React, { FC, memo, ReactNode } from "react";
import clsx from "clsx";
import { Collapse } from "antd";

/**
 * Передаваемые параметры для сворачиваемого компонента настройки
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
  className: string;
  onChange?: (values: string | string[]) => void;
}

/**
 * Сворачиваемый компонент настройки
 * @category Components
 */
const CollapseComponent: FC<CollapseComponentProps> = ({
  icon,
  title,
  isDark,
  children,
  className,
  onChange = () => {}
}) => {
  const { Panel } = Collapse;

  return (
    <Collapse
      accordion={true}
      bordered={false}
      expandIconPosition="end"
      onChange={onChange}
    >
      <Panel
        className={clsx(className, { dark: isDark })}
        header={
          <div className={clsx(`${className}-header`, { dark: isDark })}>
            <>{icon}</>
            <span>{title}</span>
          </div>
        }
        key={title}
      >
        <div className={clsx(`${className}-content`, { dark: isDark })}>
          {children}
        </div>
      </Panel>
    </Collapse>
  );
};

export default memo(CollapseComponent);
