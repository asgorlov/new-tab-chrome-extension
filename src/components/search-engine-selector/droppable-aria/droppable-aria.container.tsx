import { FC, memo, MouseEvent, useCallback } from "react";
import DroppableAriaComponent from "./droppable-aria.component";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchEngines } from "../../../store/new-tab/new-tab.selectors";
import {
  setSearchEngine,
  setSearchEngines
} from "../../../store/new-tab/new-tab.slice";

export interface DroppableAriaContainerProps {
  onDragged: (v: boolean) => void;
}

const DroppableAriaContainer: FC<DroppableAriaContainerProps> = ({
  onDragged
}) => {
  const dispatch = useDispatch();
  const searchEngines = useSelector(selectSearchEngines);

  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      const endIndex = result.destination.index;
      const startIndex = result.source.index;
      const newSearchEngines = Array.from(searchEngines);
      const [removed] = newSearchEngines.splice(startIndex, 1);
      newSearchEngines.splice(endIndex, 0, removed);

      dispatch(setSearchEngines(newSearchEngines));
    }

    onDragged(false);
  };

  const handleSearchEngineClick = useCallback(
    (e: MouseEvent) => {
      const element = e.currentTarget as HTMLDivElement;
      const name = element.dataset.rbdDraggableId;

      if (name) {
        dispatch(setSearchEngine(name));
      }
    },
    [dispatch]
  );

  return (
    <DragDropContext
      onDragStart={() => onDragged(true)}
      onDragEnd={handleDragEnd}
    >
      <DroppableAriaComponent
        onSearchEngineClick={handleSearchEngineClick}
        searchEngines={searchEngines}
      />
    </DragDropContext>
  );
};

export default memo(DroppableAriaContainer);
