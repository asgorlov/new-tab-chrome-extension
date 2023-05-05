import React, { FC, MouseEvent, ReactNode } from "react";
import { Button } from "antd";
import clsx from "clsx";

interface SearchSelectedComponentProps {
  searchEngineNames: string[];
  searchEngine: string;
  onClick: (event: MouseEvent) => void;
  getIcon: (name: string) => ReactNode;
}

const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
  searchEngineNames,
  searchEngine,
  onClick,
  getIcon
}) => {
  return (
    <div className="new-tab__search-engine-selector">
      {searchEngineNames.map(name => (
        <Button
          className={clsx(`new-tab__search-engine-selector_${name}`, {
            grey: searchEngine !== name
          })}
          onClick={onClick}
          value={name}
          icon={getIcon(name)}
          key={name}
        />
      ))}
    </div>
  );
};

export default SearchEngineSelectorComponent;
