import React, { FC, RefObject } from "react";
import DroppableAriaContainer from "./droppable-aria/droppable-aria.container";
import clsx from "clsx";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { DELTA_Y } from "../../constants/search-engine-selector.constants";

/**
 * Передаваемые параметры для компонента выбора поисковой системы
 * @property isDark - Флаг темной темы
 * @property scrollRef - Ref элемента селектора со скроллом
 * @property searchEngine - Выбранная поисковая система
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @property onClickMoving - Функция движения объектов в элементе со скроллом
 * @interface
 */
export interface SearchSelectedComponentProps {
  isDark: boolean;
  scrollRef: RefObject<HTMLDivElement>;
  searchEngine: string;
  searchEngines: string[];
  onClickMoving: (distance: number) => void;
}

/**
 * Компонент выбора поисковой системы
 * @category Components
 */
const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
  isDark,
  scrollRef,
  searchEngine,
  searchEngines,
  onClickMoving
}) => {
  return (
    <div
      className={clsx("new-tab__search-engine-selector", searchEngine, {
        _hidden: !searchEngines.length
      })}
    >
      <button
        className={clsx("new-tab__search-engine-selector-left-button", {
          _hidden: searchEngines.length < 11
        })}
        children={<LeftOutlined />}
        onClick={() => onClickMoving(DELTA_Y)}
      />
      <div
        ref={scrollRef}
        className={clsx("new-tab__search-engine-selector-scrollable", {
          dark: isDark
        })}
      >
        <DroppableAriaContainer visibleSearchEngines={searchEngines} />
      </div>
      <button
        className={clsx("new-tab__search-engine-selector-right-button", {
          _hidden: searchEngines.length < 11
        })}
        children={<RightOutlined />}
        onClick={() => onClickMoving(-DELTA_Y)}
      />
    </div>
  );
};

export default SearchEngineSelectorComponent;
