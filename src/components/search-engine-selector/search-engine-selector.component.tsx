import React, { useCallback, useEffect, useRef, useState } from "react";
import DroppableAriaContainer from "./droppable-aria/droppable-aria.container";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { DELTA_Y } from "../../constants/search-engine-selector.constants";
import {
  getScrollSearchEngineButtonStyle,
  getSearchEngineSelectorStyle
} from "../../utils/search-engine.utils";
import { useTourStepTwoContext } from "../../contexts/tour.context";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchEngine,
  selectSearchEngines
} from "../../store/new-tab/new-tab.selectors";
import { setSearchEngines } from "../../store/new-tab/new-tab.slice";

/**
 * Компонент выбора поисковой системы
 * @category Components
 */
const SearchEngineSelectorComponent = () => {
  const dispatch = useDispatch();
  const tourCtx = useTourStepTwoContext();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isDragged, setIsDragged] = useState(false);
  const [isLeftButtonActive, setIsLeftButtonActive] = useState(false);
  const [isRightButtonActive, setIsRightButtonActive] = useState(false);

  const searchEngine = useSelector(selectSearchEngine);
  const searchEngines = useSelector(selectSearchEngines);

  const handleClickMoving = useCallback(
    (distance: number) => {
      const element = scrollRef.current;

      if (element) {
        const { scrollLeft, scrollWidth, clientWidth } = element;

        // Если поворот налево
        if (distance > 0) {
          const isScrollLeftEnd =
            Math.round((scrollWidth - clientWidth) / scrollLeft) === 1;

          if (isScrollLeftEnd) {
            const newSearchEngines = [...searchEngines];
            const firstElement = newSearchEngines.shift();

            if (firstElement) {
              newSearchEngines.push(firstElement);
              dispatch(setSearchEngines(newSearchEngines));
            }
          }
        } else if (scrollLeft === 0) {
          const newSearchEngines = [...searchEngines];
          const lastElement = newSearchEngines.pop();

          if (lastElement) {
            newSearchEngines.unshift(lastElement);
            dispatch(setSearchEngines(newSearchEngines));
          }
        }
      }

      scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
    },
    [dispatch, searchEngines]
  );

  useEffect(() => {
    const element = scrollRef.current;

    if (element) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          e.preventDefault();

          if (!isDragged) {
            handleClickMoving(e.deltaY > 0 ? DELTA_Y : -DELTA_Y);
          }
        }
      };

      element.addEventListener("wheel", onWheel);

      return () => element.removeEventListener("wheel", onWheel);
    }
  }, [handleClickMoving, isDragged]);

  return (
    <div
      ref={tourCtx}
      className="new-tab__search-engine-selector"
      style={getSearchEngineSelectorStyle(searchEngine, !searchEngines.length)}
    >
      <button
        className="new-tab__search-engine-selector-left-button"
        children={<LeftOutlined />}
        onClick={() => handleClickMoving(DELTA_Y)}
        onMouseUp={() => setIsLeftButtonActive(false)}
        onMouseMove={() => setIsLeftButtonActive(false)}
        onMouseDown={() => setIsLeftButtonActive(true)}
        style={getScrollSearchEngineButtonStyle(
          searchEngine,
          searchEngines.length < 11,
          isLeftButtonActive
        )}
      />
      <div
        ref={scrollRef}
        className="new-tab__search-engine-selector-scrollable"
      >
        <DroppableAriaContainer onDragged={setIsDragged} />
      </div>
      <button
        className="new-tab__search-engine-selector-right-button"
        children={<RightOutlined />}
        onClick={() => handleClickMoving(-DELTA_Y)}
        onMouseUp={() => setIsRightButtonActive(false)}
        onMouseMove={() => setIsRightButtonActive(false)}
        onMouseDown={() => setIsRightButtonActive(true)}
        style={getScrollSearchEngineButtonStyle(
          searchEngine,
          searchEngines.length < 11,
          isRightButtonActive
        )}
      />
    </div>
  );
};

export default SearchEngineSelectorComponent;
