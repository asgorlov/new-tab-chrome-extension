import React, { FC } from "react";
import SearchEngineSelectorComponent from "./search-engine-selector.component";
import { useSelector } from "react-redux";
import { selectSearchEngines } from "../../store/new-tab/new-tab.selectors";

const SearchEngineSelectorContainer: FC = () => {
  const searchEngineNames = useSelector(selectSearchEngines);

  return (
    <SearchEngineSelectorComponent searchEngineNames={searchEngineNames} />
  );
};

export default SearchEngineSelectorContainer;
