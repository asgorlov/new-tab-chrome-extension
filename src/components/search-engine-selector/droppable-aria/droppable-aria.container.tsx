import { FC, MouseEvent, useCallback, useContext } from "react";
import DroppableAriaComponent from "./droppable-aria.component";
import {
  DragDropContext,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";
import clsx from "clsx";
import { YANDEX } from "../../../constants/search-engine.constants";
import { useDispatch, useSelector } from "react-redux";
import { TourContext } from "../../../contexts/tour.context";
import {
  selectCurrentLanguage,
  selectSearchEngine
} from "../../../store/new-tab/new-tab.selectors";
import {
  setSearchEngine,
  setSearchEngines
} from "../../../store/new-tab/new-tab.slice";

export interface DroppableAriaContainerProps {
  visibleSearchEngines: string[];
}

const DroppableAriaContainer: FC<DroppableAriaContainerProps> = ({
  visibleSearchEngines
}) => {
  const dispatch = useDispatch();
  const tourCtx = useContext(TourContext);
  const searchEngine = useSelector(selectSearchEngine);
  const currentLanguage = useSelector(selectCurrentLanguage);

  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      const endIndex = result.destination.index;
      const startIndex = result.source.index;
      const newSearchEngineNames = Array.from(visibleSearchEngines);
      const [removed] = newSearchEngineNames.splice(startIndex, 1);
      newSearchEngineNames.splice(endIndex, 0, removed);

      dispatch(setSearchEngines(newSearchEngineNames));
    }
  };

  const getItemClassName = useCallback(
    (itemName: string): string => {
      return clsx(
        "new-tab__search-engine-selector-item",
        itemName === YANDEX && currentLanguage !== "ru"
          ? itemName + "-en"
          : itemName,
        { selected: searchEngine === itemName }
      );
    },
    [currentLanguage, searchEngine]
  );
  const setDroppableAriaRef = useCallback(
    (ref: HTMLDivElement | null, provided: DroppableProvided) => {
      if (tourCtx) {
        tourCtx.searchEngineSelectorRef.current = ref;
      }

      provided.innerRef(ref);
    },
    [tourCtx]
  );
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <DroppableAriaComponent
        getItemClassName={getItemClassName}
        onSearchEngineClick={handleSearchEngineClick}
        setDroppableAreaRef={setDroppableAriaRef}
        visibleSearchEngines={visibleSearchEngines}
      />
    </DragDropContext>
  );
};

export default DroppableAriaContainer;
