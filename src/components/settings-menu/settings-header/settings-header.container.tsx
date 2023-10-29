import { ChangeEvent, FC, MouseEvent, useCallback, useState } from "react";
import SettingsHeaderComponent from "./settings-header.component";
import { useDebounceEffect } from "ahooks";
import {
  getMatchedElements,
  getNextElementIndex,
  scrollToSelectedElement
} from "../../../utils/settings-header.utils";

const SettingsHeaderContainer: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundElements, setFoundElements] = useState<Element[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [currentFoundElement, setCurrentFoundElement] = useState<number>(-1);

  const handleChangeSearchQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      setSearchQuery(event.target.value),
    []
  );

  const handleClickSearchButton = useCallback(() => {
    if (searchQuery) {
      setSearchQuery("");
      setFoundElements([]);
    } else {
      setIsExpanded(!isExpanded);
    }
  }, [searchQuery, isExpanded]);

  const handleClickSearchNavigation = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (foundElements.length > 1) {
        const nextElementIndex = getNextElementIndex(
          event.currentTarget.name,
          currentFoundElement,
          foundElements
        );

        setCurrentFoundElement(nextElementIndex + 1);
        scrollToSelectedElement(nextElementIndex, foundElements);
      }
    },
    [foundElements, currentFoundElement]
  );

  useDebounceEffect(
    () => {
      if (isExpanded) {
        const query = searchQuery.trim();
        const matchedElements: Element[] = getMatchedElements(query);
        let currentElementNumber = -1;

        if (query) {
          setIsSearchLoading(true);
          currentElementNumber = matchedElements.length ? 1 : 0;
        }

        setFoundElements(matchedElements);
        setCurrentFoundElement(currentElementNumber);
        setTimeout(() => {
          setIsSearchLoading(false);
          scrollToSelectedElement(0, matchedElements);
        }, 1000);
      }
    },
    [isExpanded, searchQuery, scrollToSelectedElement],
    { wait: 500 }
  );

  return (
    <SettingsHeaderComponent
      isExpanded={isExpanded}
      searchQuery={searchQuery}
      foundElements={foundElements}
      setIsExpanded={setIsExpanded}
      isSearchLoading={isSearchLoading}
      currentFoundElement={currentFoundElement}
      onChangeSearchQuery={handleChangeSearchQuery}
      onClickSearchButton={handleClickSearchButton}
      onClickSearchNavigation={handleClickSearchNavigation}
    />
  );
};

export default SettingsHeaderContainer;
