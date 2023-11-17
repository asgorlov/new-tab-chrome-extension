import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import DroppableAriaContainer from "./droppable-aria/droppable-aria.container";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import {
  DELTA_Y,
  MAX_ELEMENTS_LENGTH
} from "../../constants/search-engine-selector.constants";
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

  const visibleSearchEngines = useMemo(
    () =>
      searchEngines.length <= MAX_ELEMENTS_LENGTH
        ? [...searchEngines]
        : searchEngines.slice(0, MAX_ELEMENTS_LENGTH),
    [searchEngines]
  );

  const setVisibleSearchEngines = useCallback(
    (visibleEngines: string[]) => {
      const newSearchEngines =
        searchEngines.length <= MAX_ELEMENTS_LENGTH
          ? visibleEngines
          : visibleEngines.concat(
              searchEngines.slice(MAX_ELEMENTS_LENGTH, searchEngines.length)
            );

      dispatch(setSearchEngines(newSearchEngines));
    },
    [dispatch, searchEngines]
  );

  const handleClickMoving = useCallback(
    (distance: number) => {
      const newSearchEngines = Array.from(visibleSearchEngines);

      // Если поворот налево
      if (distance > 0) {
        const firstElement = newSearchEngines.shift();

        if (firstElement) {
          if (firstElement === searchEngine) {
            const secondElement = newSearchEngines.shift();

            if (secondElement) {
              newSearchEngines.push(secondElement);
            }

            newSearchEngines.unshift(firstElement);
          } else {
            newSearchEngines.push(firstElement);
          }

          setVisibleSearchEngines(newSearchEngines);
        }
      } else {
        const lastElement = newSearchEngines.pop();

        if (lastElement) {
          if (lastElement === searchEngine) {
            const secondToLastElement = newSearchEngines.pop();

            if (secondToLastElement) {
              newSearchEngines.unshift(secondToLastElement);
            }

            newSearchEngines.push(lastElement);
          } else {
            newSearchEngines.unshift(lastElement);
          }

          setVisibleSearchEngines(newSearchEngines);
        }
      }
    },
    [searchEngine, visibleSearchEngines, setVisibleSearchEngines]
  );

  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();

        if (!isDragged) {
          handleClickMoving(e.deltaY > 0 ? DELTA_Y : -DELTA_Y);
        }
      }
    },
    [handleClickMoving, isDragged]
  );

  useEffect(() => {
    if (searchEngines.length > MAX_ELEMENTS_LENGTH) {
      const element = scrollRef.current;

      if (element) {
        element.addEventListener("wheel", onWheel);

        return () => element.removeEventListener("wheel", onWheel);
      }
    }
  }, [scrollRef, onWheel, searchEngines]);

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
          searchEngines.length <= MAX_ELEMENTS_LENGTH,
          isLeftButtonActive
        )}
      />
      <div
        ref={scrollRef}
        className="new-tab__search-engine-selector-scrollable"
      >
        <DroppableAriaContainer
          onDragged={setIsDragged}
          visibleSearchEngines={visibleSearchEngines}
          setVisibleSearchEngines={setVisibleSearchEngines}
        />
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
          searchEngines.length <= MAX_ELEMENTS_LENGTH,
          isRightButtonActive
        )}
      />
    </div>
  );
};

export default SearchEngineSelectorComponent;
