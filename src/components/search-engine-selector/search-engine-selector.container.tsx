import React, { FC, MouseEvent, useCallback } from "react";
import SearchEngineSelectorComponent from "./search-engine-selector.component";
import {
  selectCurrentLanguage,
  selectSearchEngine,
  selectSearchEngines,
  setSearchEngine,
  setSearchEngines
} from "../../store/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const SearchEngineSelectorContainer: FC = () => {
  const dispatch = useDispatch();
  const searchEngine = useSelector(selectSearchEngine);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const searchEngineNames = useSelector(selectSearchEngines);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const element = e.currentTarget as HTMLDivElement;
      dispatch(setSearchEngine(element.dataset.rbdDraggableId));
    },
    [dispatch]
  );

  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      const endIndex = result.destination.index;
      const startIndex = result.source.index;
      const newSearchEngineNames = Array.from(searchEngineNames);
      const [removed] = newSearchEngineNames.splice(startIndex, 1);
      newSearchEngineNames.splice(endIndex, 0, removed);

      dispatch(setSearchEngines(newSearchEngineNames));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <SearchEngineSelectorComponent
        searchEngineNames={searchEngineNames}
        currentLanguage={currentLanguage}
        searchEngine={searchEngine}
        onClick={handleClick}
      />
    </DragDropContext>
  );
};

export default SearchEngineSelectorContainer;
