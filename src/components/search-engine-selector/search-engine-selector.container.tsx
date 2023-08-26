import React, { FC, useCallback } from "react";
import SearchEngineSelectorComponent from "./search-engine-selector.component";
import { useSelector } from "react-redux";
import {
  selectIsDark,
  selectSearchEngine,
  selectSearchEngines
} from "../../store/new-tab/new-tab.selectors";
import { useHorizontalScroll } from "../../hooks/use-horizontal-scroll";
import { DELTA_Y } from "../../constants/search-engine-selector.constants";

const SearchEngineSelectorContainer: FC = () => {
  const isDark = useSelector(selectIsDark);
  const searchEngine = useSelector(selectSearchEngine);
  const searchEngineNames = useSelector(selectSearchEngines);

  const scrollRef = useHorizontalScroll<HTMLDivElement>(DELTA_Y);

  const handleClickMoving = useCallback(
    (distance: number) => {
      scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
    },
    [scrollRef]
  );

  return (
    <SearchEngineSelectorComponent
      isDark={isDark}
      scrollRef={scrollRef}
      searchEngine={searchEngine}
      searchEngineNames={searchEngineNames}
      onClickMoving={handleClickMoving}
    />
  );
};

export default SearchEngineSelectorContainer;
