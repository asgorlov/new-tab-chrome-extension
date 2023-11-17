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
import { useDispatch } from "react-redux";
import { setSettingsActiveKeys } from "../../../store/new-tab/new-tab.slice";
import { CollapsedMenuSetting } from "../../../constants/settings-menu.constants";

const SettingsHeaderContainer: FC = () => {
  const settingsSearchCtx = useSettingRefsContext();
  const dispatch = useDispatch();
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
        scrollToSelectedMatchedElement(
          matchedElements,
          nextElementIndex,
          currentElementIndex
        );
      } else {
        scrollToSelectedMatchedElement(matchedElements, 0);
      }
    },
    [currentMatchedElement, matchedElements]
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
      if (isExpanded && searchQuery.trim()) {
        const storage = {};
        Object.values(CollapsedMenuSetting).forEach(s =>
          Object.assign(storage, { [s]: [s] })
        );
        dispatch(setSettingsActiveKeys(storage));
      }
    },
    [isExpanded, searchQuery, dispatch],
    { wait: 500 }
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

              scrollToSelectedMatchedElement(elements, 0);
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
