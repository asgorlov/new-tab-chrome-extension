import React, { FC } from "react";
import DroppableAriaContainer from "./droppable-aria/droppable-aria.container";

/**
 * Передаваемые параметры для компонента выбора поисковой системы
 * @property searchEngineNames - Список выбранных поисковых систем для переключения
 * @interface
 */
export interface SearchSelectedComponentProps {
  searchEngineNames: string[];
}

/**
 * Компонент выбора поисковой системы
 * @category Components
 */
const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
  searchEngineNames
}) => {
  return (
    <div className="new-tab__search-engine-selector">
      <DroppableAriaContainer visibleSearchEngines={searchEngineNames} />
    </div>
  );
};

export default SearchEngineSelectorComponent;
