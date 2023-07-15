import React, { FC, ReactNode } from "react";
import clsx from "clsx";
import { Collapse } from "antd";

interface CollapseComponentProps {
  icon: ReactNode;
  title: string;
  isDark: boolean;
  children?: ReactNode;
  className: string;
  onChange?: (values: string | string[]) => void;
}

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

export default CollapseComponent;
