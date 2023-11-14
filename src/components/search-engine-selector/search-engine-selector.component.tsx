import React, { FC, memo, RefObject, useState } from "react";
import DroppableAriaContainer from "./droppable-aria/droppable-aria.container";
import clsx from "clsx";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { DELTA_Y } from "../../constants/search-engine-selector.constants";
import {
  getScrollSearchEngineButtonStyle,
  getSearchEngineSelectorStyle
} from "../../utils/search-engine.utils";
import { useTourStepTwoContext } from "../../contexts/tour.context";

/**
 * Передаваемые параметры для компонента выбора поисковой системы
 * @property isDark - Флаг темной темы
 * @property scrollRef - Ref элемента селектора со скроллом
 * @property searchEngine - Выбранная поисковая система
 * @property searchEngines - Список выбранных поисковых систем для переключения
 * @property onDragged - Функция установки флага, что элемента захвачен для переноса(dnd)
 * @property onClickMoving - Функция движения объектов в элементе со скроллом
 * @interface
 */
export interface SearchSelectedComponentProps {
  isDark: boolean;
  scrollRef: RefObject<HTMLDivElement>;
  searchEngine: string;
  searchEngines: string[];
  onDragged: (v: boolean) => void;
  onClickMoving: (distance: number) => void;
}

/**
 * Компонент выбора поисковой системы
 * @category Components
 */
const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = memo(
  ({
    isDark,
    scrollRef,
    searchEngine,
    searchEngines,
    onDragged,
    onClickMoving
  }) => {
    const tourCtx = useTourStepTwoContext();
    const [isLeftButtonActive, setIsLeftButtonActive] = useState(false);
    const [isRightButtonActive, setIsRightButtonActive] = useState(false);

    return (
      <div
        ref={tourCtx}
        className="new-tab__search-engine-selector"
        style={getSearchEngineSelectorStyle(
          searchEngine,
          !searchEngines.length
        )}
      >
        <button
          className="new-tab__search-engine-selector-left-button"
          children={<LeftOutlined />}
          onClick={() => onClickMoving(DELTA_Y)}
          onMouseUp={() => setIsLeftButtonActive(false)}
          onMouseMove={() => setIsLeftButtonActive(false)}
          onMouseDown={() => setIsLeftButtonActive(true)}
          style={getScrollSearchEngineButtonStyle(
            searchEngine,
            searchEngines.length < 11,
            isLeftButtonActive
          )}
        />
        <div
          ref={scrollRef}
          className={clsx("new-tab__search-engine-selector-scrollable", {
            dark: isDark
          })}
        >
          <DroppableAriaContainer onDragged={onDragged} />
        </div>
        <button
          className="new-tab__search-engine-selector-right-button"
          children={<RightOutlined />}
          onClick={() => onClickMoving(-DELTA_Y)}
          onMouseUp={() => setIsRightButtonActive(false)}
          onMouseMove={() => setIsRightButtonActive(false)}
          onMouseDown={() => setIsRightButtonActive(true)}
          style={getScrollSearchEngineButtonStyle(
            searchEngine,
            searchEngines.length < 11,
            isRightButtonActive
          )}
        />
      </div>
    );
  }
);

export default SearchEngineSelectorComponent;
