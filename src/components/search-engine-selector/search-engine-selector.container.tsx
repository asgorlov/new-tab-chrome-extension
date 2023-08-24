import React, { FC, MouseEvent, useCallback, useContext } from "react";
import SearchEngineSelectorComponent from "./search-engine-selector.component";
import {
  setSearchEngine,
  setSearchEngines
} from "../../store/new-tab/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { TourContext } from "../../contexts/tour.context";
import {
  selectCurrentLanguage,
  selectSearchEngine,
  selectSearchEngines
} from "../../store/new-tab/new-tab.selectors";

const SearchEngineSelectorContainer: FC = () => {
  const dispatch = useDispatch();
  const tourCtx = useContext(TourContext);
  const searchEngine = useSelector(selectSearchEngine);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const searchEngineNames = useSelector(selectSearchEngines);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const element = e.currentTarget as HTMLDivElement;
      const id = element.dataset.rbdDraggableId;

      if (id) {
        dispatch(setSearchEngine(id));
      }
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
        tourCtx={tourCtx}
        onClick={handleClick}
      />
    </DragDropContext>
  );
};

export default SearchEngineSelectorContainer;
