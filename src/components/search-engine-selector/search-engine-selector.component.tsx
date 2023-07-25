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

interface SearchSelectedComponentProps {
  searchEngineNames: string[];
  currentLanguage: string;
  searchEngine: string;
  onClick: (event: MouseEvent) => void;
}

const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
  searchEngineNames,
  currentLanguage,
  searchEngine,
  onClick
}) => {
  const { t } = useTranslation();
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
          ref={dropProvided.innerRef}
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
