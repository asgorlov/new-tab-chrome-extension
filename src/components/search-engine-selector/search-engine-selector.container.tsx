import React, { FC, MouseEvent, useCallback, useState } from "react";
import SearchEngineSelectorComponent from "./search-engine-selector.component";
import {
  selectSearchEngine,
  selectSearchEngines,
  setSearchEngine,
  setSearchEngines
} from "../../store/new-tab.slice";
import { useDispatch, useSelector } from "react-redux";
import { DragAndDropModel } from "../../models/drag-and-drop.model";

const SearchEngineSelectorContainer: FC = () => {
  const dispatch = useDispatch();
  const searchEngine = useSelector(selectSearchEngine);
  const searchEngineNames = useSelector(selectSearchEngines);

  const [draggedItem, setDraggedItem] = useState<DragAndDropModel>({
    draggedFrom: null,
    draggedTo: null,
    updatedOrder: []
  });

  const handleClick = useCallback(
    (e: MouseEvent) => {
      const element = e.currentTarget as HTMLDivElement;
      dispatch(setSearchEngine(element.dataset.name));
    },
    [dispatch]
  );

  const handleDragLeave = useCallback(() => {
    setDraggedItem({
      ...draggedItem,
      draggedTo: null
    });
  }, [draggedItem]);

  const handleDragStart = useCallback(
    (e: MouseEvent) => {
      const element = e.currentTarget as HTMLDivElement;
      setDraggedItem({
        ...draggedItem,
        draggedFrom: Number(element.dataset.position)
      });
    },
    [draggedItem]
  );

  const handleDragOver = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      const draggedFrom = draggedItem.draggedFrom;
      if (draggedFrom != null) {
        const element = e.currentTarget as HTMLDivElement;
        const draggedTo = Number(element.dataset.position);
        if (draggedTo !== draggedItem.draggedTo) {
          const draggedSearchEngine = searchEngineNames[draggedFrom];
          const filteredSearchEngines = searchEngineNames.filter(
            (_: string, index: number) => index !== draggedFrom
          );
          const newList = [
            ...filteredSearchEngines.slice(0, draggedTo),
            draggedSearchEngine,
            ...filteredSearchEngines.slice(draggedTo)
          ];

          setDraggedItem({
            ...draggedItem,
            updatedOrder: newList,
            draggedTo: draggedTo
          });
        }
      }
    },
    [draggedItem, searchEngineNames]
  );

  const handleDrop = useCallback(() => {
    dispatch(setSearchEngines(draggedItem.updatedOrder));

    setDraggedItem({
      ...draggedItem,
      draggedFrom: null,
      draggedTo: null
    });
  }, [draggedItem, dispatch]);

  return (
    <SearchEngineSelectorComponent
      searchEngineNames={searchEngineNames}
      searchEngine={searchEngine}
      draggedItem={draggedItem}
      onDragLeave={handleDragLeave}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onClick={handleClick}
      onDrop={handleDrop}
    />
  );
};

export default SearchEngineSelectorContainer;
