import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useToken } from "antd/es/theme/internal";

/**
 * Компонент выбора поисковой системы
 * @category Components
 */
const SearchEngineSelectorComponent = () => {
  const dispatch = useDispatch();
  const token = useToken();
  const tourCtx = useTourStepTwoContext();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isDragged, setIsDragged] = useState(false);
  const [isLeftButtonActive, setIsLeftButtonActive] = useState(false);
  const [isRightButtonActive, setIsRightButtonActive] = useState(false);

  const searchEngine = useSelector(selectSearchEngine);
  const searchEngines = useSelector(selectSearchEngines);

  const getVisibleSearchEngines = (): string[] =>
    searchEngines.length <= MAX_ELEMENTS_LENGTH
      ? [...searchEngines]
      : searchEngines.slice(0, MAX_ELEMENTS_LENGTH);

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
      let newSearchEngines;
      // Если поворот налево
      if (distance > 0) {
        if (searchEngines[0] === searchEngine) {
          newSearchEngines = [searchEngines[0]];
          newSearchEngines.push(...searchEngines.slice(2), searchEngines[1]);
        } else {
          newSearchEngines = searchEngines.slice(1);
          newSearchEngines.push(searchEngines[0]);
        }
      } else {
        const secondToLastVisibleIndex = MAX_ELEMENTS_LENGTH - 2;
        const lastVisibleIndex = MAX_ELEMENTS_LENGTH - 1;
        const lastIndex = searchEngines.length - 1;
        newSearchEngines = [searchEngines[lastIndex]];

        if (searchEngines[lastVisibleIndex] === searchEngine) {
          newSearchEngines.push(
            ...searchEngines.slice(0, secondToLastVisibleIndex),
            searchEngines[lastVisibleIndex],
            searchEngines[secondToLastVisibleIndex],
            ...searchEngines.slice(MAX_ELEMENTS_LENGTH, lastIndex)
          );
        } else {
          newSearchEngines.push(...searchEngines.slice(0, lastIndex));
        }
      }

      dispatch(setSearchEngines(newSearchEngines));
    },
    [searchEngine, searchEngines, dispatch]
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
      style={getSearchEngineSelectorStyle(
        token[1].colorPrimary,
        !searchEngines.length
      )}
    >
      <button
        className="new-tab__search-engine-selector-left-button"
        children={<LeftOutlined />}
        onClick={() => handleClickMoving(DELTA_Y)}
        onMouseUp={() => setIsLeftButtonActive(false)}
        onMouseMove={() => setIsLeftButtonActive(false)}
        onMouseDown={() => setIsLeftButtonActive(true)}
        style={getScrollSearchEngineButtonStyle(
          token[1].colorPrimary,
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
          visibleSearchEngines={getVisibleSearchEngines()}
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
          token[1].colorPrimary,
          searchEngines.length <= MAX_ELEMENTS_LENGTH,
          isRightButtonActive
        )}
      />
    </div>
  );
};

export default SearchEngineSelectorComponent;
