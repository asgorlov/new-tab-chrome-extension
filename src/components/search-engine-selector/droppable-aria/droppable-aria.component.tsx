import React, { FC, memo, ReactElement } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided
} from "react-beautiful-dnd";
import StrictModeDroppable from "./strict-mode-droppable";

/**
 * Передаваемые параметры для drag and drop компонента
 * @property getDraggableElement - Функция, возвращающая иконку поисковой системы
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @interface
 */
export interface DroppableAriaComponentProps {
  getDraggableElement: (
    provided: DraggableProvided,
    snapshot: DraggableStateSnapshot
  ) => ReactElement<HTMLElement>;
  searchEngines: string[];
}

/**
 * Drag and drop компонент
 * @category Components
 */
const DroppableAriaComponent: FC<DroppableAriaComponentProps> = memo(
  ({ getDraggableElement, searchEngines }) => {
    return (
      <StrictModeDroppable
        droppableId="search-engine-selector"
        direction="horizontal"
      >
        {(dropProvided: DroppableProvided) => (
          <div
            className="new-tab__search-engine-selector-droppable-aria"
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {searchEngines.map((name: string, index: number) => (
              <Draggable
                key={name}
                draggableId={name}
                index={index}
                children={getDraggableElement}
              />
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    );
  }
);

export default DroppableAriaComponent;
