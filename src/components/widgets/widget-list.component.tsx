import React, { FC, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsWidgetsOnRight,
  selectWidgets
} from "../../store/new-tab/new-tab.selectors";
import { MAX_WIDGET_NUM, WidgetName } from "../../constants/widget.constants";
import clsx from "clsx";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DropResult
} from "react-beautiful-dnd";
import StrictModeDroppable from "../search-engine-selector/droppable-aria/strict-mode-droppable";
import { setWidgets } from "../../store/new-tab/new-tab.slice";
import WeatherContainer from "./weather/weather.container";

/**
 * Передаваемые параметры компонента виджетов на экране
 * @property isRightPlacement - Флаг расположения виджетов относительно центра экрана
 * @interface
 */
export interface WidgetListComponentProps {
  isRightPlacement?: boolean;
}

/**
 * Компонент виджетов на экране
 * @category Components
 */
const WidgetListComponent: FC<WidgetListComponentProps> = memo(
  ({ isRightPlacement = false }) => {
    const dispatch = useDispatch();
    const selectedWidgets = useSelector(selectWidgets);
    const isWidgetsOnRight = useSelector(selectIsWidgetsOnRight);

    const showWidgets =
      selectedWidgets.length > 0 && isWidgetsOnRight === isRightPlacement;

    const handleWidgetListRef = (
      ref: HTMLElement | null,
      handleRef: (element: HTMLElement | null) => void
    ) => {
      handleRef(ref);

      if (ref) {
        const itemHeightInPercentages = `${100 / MAX_WIDGET_NUM}%`;
        ref.style.gridTemplateRows = selectedWidgets
          .map(() => itemHeightInPercentages)
          .join(" ");
      }
    };

    const handleDragEnd = useCallback(
      (result: DropResult) => {
        if (result.destination) {
          const endIndex = result.destination.index;
          const startIndex = result.source.index;
          const newSelectedWidgets = Array.from(selectedWidgets);
          const [removed] = newSelectedWidgets.splice(startIndex, 1);
          newSelectedWidgets.splice(endIndex, 0, removed);
          dispatch(setWidgets(newSelectedWidgets));
        }
      },
      [selectedWidgets, dispatch]
    );

    const getDraggableElement = useCallback(
      (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        const itemClassName = clsx("new-tab__widget-list_item", {
          _dragging: snapshot.isDragging
        });
        const widgetName = provided.draggableProps["data-rbd-draggable-id"];

        let widgetComponent;
        switch (widgetName) {
          case WidgetName.WEATHER:
            widgetComponent = <WeatherContainer />;
            break;
          default:
            widgetComponent = <></>;
        }

        return (
          <div
            ref={provided.innerRef}
            className={itemClassName}
            children={widgetComponent}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          />
        );
      },
      []
    );

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <StrictModeDroppable
          droppableId="widget-list"
          isDropDisabled={selectedWidgets.length < 2}
        >
          {(dropProvided: DroppableProvided) => (
            <div
              className="new-tab__widget-list"
              ref={ref => handleWidgetListRef(ref, dropProvided.innerRef)}
              {...dropProvided.droppableProps}
            >
              {showWidgets &&
                selectedWidgets.map((name: WidgetName, index: number) => (
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
      </DragDropContext>
    );
  }
);

export default WidgetListComponent;
