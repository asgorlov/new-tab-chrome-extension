import { ChangeEvent, FC, MouseEvent, useCallback, useState } from "react";
import SettingsHeaderComponent from "./settings-header.component";
import { useDebounceEffect } from "ahooks";
import {
  matchElements,
  getNextMatchedElementIndex,
  getSettingsMenuContainer,
  scrollToSelectedMatchedElement,
  resetMatchedElements
} from "../../../utils/settings-header.utils";
import { MatchedElement } from "../../../models/settings-search.model";

const SettingsHeaderContainer: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [matchedElements, setMatchedElements] = useState<MatchedElement[]>([]);
  const [currentMatchedElement, setCurrentMatchedElement] =
    useState<number>(-1);

  const removeSearchLoading = useCallback(() => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
      setSearchTimeout(undefined);
    }
  }, [searchTimeout]);

  const handleChangeSearchQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      removeSearchLoading();

      setSearchQuery(event.target.value);
    },
    [removeSearchLoading]
  );

  const handleClickSearchButton = useCallback(() => {
    removeSearchLoading();

    if (searchQuery) {
      resetMatchedElements(matchedElements);

      setSearchQuery("");
      setMatchedElements([]);
    } else {
      setIsExpanded(!isExpanded);
    }
  }, [searchQuery, isExpanded, removeSearchLoading, matchedElements]);

  const handleClickSearchNavigation = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (matchedElements.length > 1) {
        const buttonName = event.currentTarget.name;
        const currentElementIndex = currentMatchedElement - 1;
        const nextElementIndex = getNextMatchedElementIndex(
          matchedElements,
          currentElementIndex,
          buttonName
        );

        setCurrentMatchedElement(nextElementIndex + 1);
        scrollToSelectedMatchedElement(
          matchedElements,
          nextElementIndex,
          currentElementIndex
        );
      }
    },
    [matchedElements, currentMatchedElement]
  );

  useDebounceEffect(
    () => {
      if (isExpanded) {
        const query = searchQuery.trim();
        const timeout = setTimeout(
          () => {
            resetMatchedElements(matchedElements);

            if (query) {
              const menuContainer = getSettingsMenuContainer();
              if (menuContainer) {
                const elements = matchElements(query, menuContainer);
                setCurrentMatchedElement(elements.length ? 1 : 0);
                setMatchedElements(elements);

                scrollToSelectedMatchedElement(elements, 0);
              }
            } else {
              setMatchedElements([]);
              setCurrentMatchedElement(-1);
            }

            setSearchTimeout(undefined);
          },
          query ? 500 : 0
        );

        setSearchTimeout(timeout);
      }
    },
    [isExpanded, searchQuery],
    { wait: 500 }
  );

  return (
    <SettingsHeaderComponent
      isExpanded={isExpanded}
      searchQuery={searchQuery}
      setIsExpanded={setIsExpanded}
      isSearchLoading={Boolean(searchTimeout)}
      matchedElements={matchedElements}
      currentMatchedElement={currentMatchedElement}
      onChangeSearchQuery={handleChangeSearchQuery}
      onClickSearchButton={handleClickSearchButton}
      onClickSearchNavigation={handleClickSearchNavigation}
    />
  );
};

export default SettingsHeaderContainer;
