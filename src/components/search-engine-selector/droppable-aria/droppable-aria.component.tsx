import React, { FC, memo, MouseEvent } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided
} from "react-beautiful-dnd";
import StrictModeDroppable from "./strict-mode-droppable";
import { useTranslation } from "react-i18next";

/**
 * Передаваемые параметры для drag and drop компонента
 * @property getItemClassName - Функция для получения класса каждого элемента списка поисковых систем
 * @property onSearchEngineClick - Функция, вызываемая при выборе поисковой системы
 * @property setDroppableAreaRef - Функция, устанавливающая ref области куда можно перетаскивать элементы
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @interface
 */
export interface DroppableAriaComponentProps {
  getItemClassName: (value: string) => string;
  onSearchEngineClick: (event: MouseEvent) => void;
  setDroppableAreaRef: (
    ref: HTMLDivElement | null,
    dropProvided: DroppableProvided
  ) => void;
  searchEngines: string[];
}

/**
 * Drag and drop компонент
 * @category Components
 */
const DroppableAriaComponent: FC<DroppableAriaComponentProps> = memo(
  ({
    getItemClassName,
    onSearchEngineClick,
    setDroppableAreaRef,
    searchEngines
  }) => {
    const { t } = useTranslation();

    return (
      <StrictModeDroppable
        droppableId="search-engine-selector"
        direction="horizontal"
      >
        {(dropProvided: DroppableProvided) => (
          <div
            className="new-tab__search-engine-selector-droppable-aria"
            ref={ref => setDroppableAreaRef(ref, dropProvided)}
            {...dropProvided.droppableProps}
          >
            {searchEngines.map((name: string, index: number) => (
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
                    onClick={onSearchEngineClick}
                  />
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </StrictModeDroppable>
    );
  }
);

export default DroppableAriaComponent;
