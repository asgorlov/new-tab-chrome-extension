import React, { FC, MouseEvent, ReactNode } from "react";
import { Button } from "antd";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { selectSearchEngines } from "../../store/new-tab.slice";

interface SearchSelectedComponentProps {
  searchEngine: string;
  onClick: (event: MouseEvent) => void;
  getIcon: (name: string) => ReactNode;
}

const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
  searchEngine,
  onClick,
  getIcon
}) => {
  const searchEngineNames = useSelector(selectSearchEngines);

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
