import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useState
} from "react";
import SettingsHeaderComponent from "./settings-header.component";
import { useDebounceEffect } from "ahooks";
import {
  matchElements,
  getNextMatchedElementIndex,
  scrollToSelectedMatchedElement,
  resetMatchedElements
} from "../../../utils/settings-header.utils";
import { MatchedElement } from "../../../models/settings-search.model";
import { useSettingRefsContext } from "../../../contexts/setting-refs.context";
import { useDispatch, useSelector } from "react-redux";
import { selectAllSettingsActiveKeys } from "../../../store/new-tab/new-tab.selectors";
import { setSettingsActiveKeys } from "../../../store/new-tab/new-tab.slice";

const SettingsHeaderContainer: FC = () => {
  const settingsActiveKeys = useSelector(selectAllSettingsActiveKeys);
  const settingsSearchCtx = useSettingRefsContext();
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [matchedElements, setMatchedElements] = useState<MatchedElement[]>([]);
  const [currentMatchedElement, setCurrentMatchedElement] =
    useState<number>(-1);

  const scrollToElement = useCallback(
    (
      elements: MatchedElement[],
      nextIndex: number,
      currentIndex: number = nextIndex
    ) => {
      const storage = {};
      Array.from(new Set(elements.map(e => e.type))).forEach(t => {
        if (!settingsActiveKeys[t].length) {
          Object.assign(storage, { [t]: [t] });
        }
      });
      if (Object.keys(storage).length) {
        dispatch(setSettingsActiveKeys(storage));
      }

      scrollToSelectedMatchedElement(elements, nextIndex, currentIndex);
    },
    [settingsActiveKeys, dispatch]
  );

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

  const navigateToNextMatchedElement = useCallback(
    (movement: string) => {
      if (matchedElements.length > 1) {
        const currentElementIndex = currentMatchedElement - 1;
        const nextElementIndex = getNextMatchedElementIndex(
          matchedElements,
          currentElementIndex,
          movement
        );

        setCurrentMatchedElement(nextElementIndex + 1);
        scrollToElement(matchedElements, nextElementIndex, currentElementIndex);
      }
    },
    [currentMatchedElement, matchedElements, scrollToElement]
  );

  const handleClickSearchNavigation = useCallback(
    (event: MouseEvent<HTMLButtonElement>) =>
      navigateToNextMatchedElement(event.currentTarget.name),
    [navigateToNextMatchedElement]
  );

  const handleKeyDownSearch = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && currentMatchedElement >= 0) {
        navigateToNextMatchedElement("down");
      }
    },
    [navigateToNextMatchedElement, currentMatchedElement]
  );

  useDebounceEffect(
    () => {
      if (isExpanded) {
        const query = searchQuery.trim();
        const timeout = setTimeout(
          () => {
            resetMatchedElements(matchedElements);

            if (query) {
              const elements = matchElements(query, settingsSearchCtx);
              setCurrentMatchedElement(elements.length ? 1 : 0);
              setMatchedElements(elements);

              scrollToElement(elements, 0);
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
    [isExpanded, searchQuery, settingsSearchCtx],
    { wait: 500 }
  );

  return (
    <SettingsHeaderComponent
      isExpanded={isExpanded}
      searchQuery={searchQuery}
      setIsExpanded={setIsExpanded}
      isSearchLoading={Boolean(searchTimeout)}
      matchedElements={matchedElements}
      onKeyDownSearch={handleKeyDownSearch}
      onChangeSearchQuery={handleChangeSearchQuery}
      onClickSearchButton={handleClickSearchButton}
      currentMatchedElement={currentMatchedElement}
      onClickSearchNavigation={handleClickSearchNavigation}
    />
  );
};

export default SettingsHeaderContainer;
