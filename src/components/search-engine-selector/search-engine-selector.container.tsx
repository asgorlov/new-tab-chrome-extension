import React, { FC, useCallback, useEffect, useRef } from "react";
import SearchEngineSelectorComponent from "./search-engine-selector.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsDark,
  selectSearchEngine,
  selectSearchEngines
} from "../../store/new-tab/new-tab.selectors";
import { DELTA_Y } from "../../constants/search-engine-selector.constants";
import { setSearchEngines } from "../../store/new-tab/new-tab.slice";

const SearchEngineSelectorContainer: FC = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(selectIsDark);
  const searchEngine = useSelector(selectSearchEngine);
  const searchEngines = useSelector(selectSearchEngines);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleClickMoving = useCallback(
    (distance: number) => {
      const element = scrollRef.current;

      if (element) {
        const { scrollLeft, scrollWidth, clientWidth } = element;

        // Если поворот налево
        if (distance > 0) {
          if (scrollLeft === scrollWidth - clientWidth) {
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
          handleClickMoving(e.deltaY > 0 ? DELTA_Y : -DELTA_Y);
        }
      };

      element.addEventListener("wheel", onWheel);

      return () => element.removeEventListener("wheel", onWheel);
    }
  }, [handleClickMoving]);

  return (
    <SearchEngineSelectorComponent
      isDark={isDark}
      scrollRef={scrollRef}
      searchEngine={searchEngine}
      searchEngines={searchEngines}
      onClickMoving={handleClickMoving}
    />
  );
};

export default SearchEngineSelectorContainer;
