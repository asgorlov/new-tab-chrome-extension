import { ChangeEvent, FC, useCallback, useState } from "react";
import SettingsHeaderComponent from "./settings-header.component";
import { useDebounceEffect } from "ahooks";
import { SETTINGS_MENU_CONTENT_CLASS } from "../../../constants/settings-menu.constants";

const SettingsHeaderContainer: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundElements, setFoundElements] = useState<Element[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [currentFoundElement, setCurrentFoundElement] = useState<number>(-1);

  const handleChangeSearchQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
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

  useDebounceEffect(
    () => {
      if (isExpanded) {
        const query = searchQuery.trim();
        const matchedElements: Element[] = [];
        let currentElementNumber = -1;

        if (query) {
          setIsSearchLoading(true);
          const menu = document.querySelector(
            `.${SETTINGS_MENU_CONTENT_CLASS}`
          );

          if (menu) {
            const searchPattern = new RegExp(query, "gi");
            const findByQuery = (element: Element) => {
              if (element.children.length) {
                for (let child of element.children) {
                  findByQuery(child);
                }
              } else if (element.textContent?.match(searchPattern)?.length) {
                matchedElements.push(element);
              }
            };

            for (let child of menu.children) {
              findByQuery(child);
            }
          }

          currentElementNumber = matchedElements.length ? 1 : 0;
        }

        setFoundElements(matchedElements);
        setCurrentFoundElement(currentElementNumber);
        setTimeout(() => setIsSearchLoading(false), 1000);
      }
    },
    [isExpanded, searchQuery],
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
    />
  );
};

export default SettingsHeaderContainer;
