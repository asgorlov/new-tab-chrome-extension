import React, { FC, MouseEvent } from "react";
import clsx from "clsx";
import {
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot
} from "react-beautiful-dnd";
import { YANDEX } from "../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import StrictModeDroppable from "../../utils/strict-mode-droppable";
import { TourContextModel } from "../../models/tour-context.model";

interface SearchSelectedComponentProps {
  searchEngineNames: string[];
  currentLanguage: string;
  searchEngine: string;
  tourCtx?: TourContextModel;
  onClick: (event: MouseEvent) => void;
}

const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
  searchEngineNames,
  currentLanguage,
  searchEngine,
  tourCtx,
  onClick
}) => {
  const { t } = useTranslation();

  const setRef = (ref: HTMLDivElement | null, provided: DroppableProvided) => {
    if (tourCtx) {
      tourCtx.searchEngineSelectorRef.current = ref;
    }

    provided.innerRef(ref);
  };
  const getItemClassName = (itemName: string): string => {
    return clsx(
      "new-tab__search-engine-selector-item",
      itemName === YANDEX && currentLanguage !== "ru"
        ? itemName + "-en"
        : itemName,
      { selected: searchEngine === itemName }
    );
  };

  return (
    <StrictModeDroppable
      droppableId="search-engine-selector"
      direction="horizontal"
    >
      {(dropProvided: DroppableProvided) => (
        <div
          className="new-tab__search-engine-selector"
          ref={ref => setRef(ref, dropProvided)}
          {...dropProvided.droppableProps}
        >
          {searchEngineNames.map((name: string, index: number) => (
            <Draggable key={name} draggableId={name} index={index}>
              {(
                dragProvided: DraggableProvided,
                dragSnapshot: DraggableStateSnapshot
              ) => (
                <div
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                  className={getItemClassName(name)}
                  style={{
                    ...dragProvided.draggableProps.style,
                    cursor: dragSnapshot.isDragging ? "grabbing" : "pointer"
                  }}
                  title={t(`searchEngine.${name}`)}
                  onClick={onClick}
                />
              )}
            </Draggable>
          ))}
          {dropProvided.placeholder}
        </div>
      )}
    </StrictModeDroppable>
  );
};

export default SearchEngineSelectorComponent;
