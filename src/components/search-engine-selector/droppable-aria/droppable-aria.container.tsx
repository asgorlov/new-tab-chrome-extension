import React, { FC, memo, ReactElement, useCallback } from "react";
import DroppableAriaComponent from "./droppable-aria.component";
import {
  DragDropContext,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentLanguage,
  selectSearchEngine,
  selectSearchEngines
} from "../../../store/new-tab/new-tab.selectors";
import {
  setSearchEngine,
  setSearchEngines
} from "../../../store/new-tab/new-tab.slice";
import { ReactComponent as AolIcon } from "../../../static/svgs/aol/aol-icon.svg";
import { ReactComponent as AskIcon } from "../../../static/svgs/ask/ask-icon.svg";
import { ReactComponent as BingIcon } from "../../../static/svgs/bing/bing-icon.svg";
import { ReactComponent as BoardreaderIcon } from "../../../static/svgs/boardreader/boardreader-icon.svg";
import { ReactComponent as BraveIcon } from "../../../static/svgs/brave/brave-icon.svg";
import { ReactComponent as DuckDuckGoIcon } from "../../../static/svgs/duckduckgo/duckduckgo-icon.svg";
import { ReactComponent as EcosiaIcon } from "../../../static/svgs/ecosia/ecosia-icon.svg";
import { ReactComponent as GibiruIcon } from "../../../static/svgs/gibiru/gibiru-icon.svg";
import { ReactComponent as GoogleIcon } from "../../../static/svgs/google/google-icon.svg";
import { ReactComponent as LycosIcon } from "../../../static/svgs/lycos/lycos-icon.svg";
import { ReactComponent as MetagerIcon } from "../../../static/svgs/metager/metager-icon.svg";
import { ReactComponent as NigmaIcon } from "../../../static/svgs/nigma/nigma-icon.svg";
import { ReactComponent as SearchchIcon } from "../../../static/svgs/searchch/searchch-icon.svg";
import { ReactComponent as SearchcryptIcon } from "../../../static/svgs/searchcrypt/searchcrypt-icon.svg";
import { ReactComponent as SwisscowsIcon } from "../../../static/svgs/swisscows/swisscows-icon.svg";
import { ReactComponent as YahooIcon } from "../../../static/svgs/yahoo/yahoo-icon.svg";
import { ReactComponent as YandexIcon } from "../../../static/svgs/yandex/ya-icon.svg";
import { ReactComponent as YandexEnIcon } from "../../../static/svgs/yandex/ya-icon-en.svg";
import { ReactComponent as YoucomIcon } from "../../../static/svgs/youcom/youcom-icon.svg";
import { ReactComponent as ZapmetaIcon } from "../../../static/svgs/zapmeta/zapmeta-icon.svg";
import {
  AOL,
  ASK,
  BING,
  BOARDREADER,
  BRAVE,
  DUCK,
  ECOSIA,
  GIBIRU,
  GOOGLE,
  LYCOS,
  METAGER,
  NIGMA,
  SEARCHCH,
  SEARCHCRYPT,
  SWISSCOWS,
  YAHOO,
  YANDEX,
  YOUCOM,
  ZAPMETA
} from "../../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export interface DroppableAriaContainerProps {
  onDragged: (v: boolean) => void;
}

const DroppableAriaContainer: FC<DroppableAriaContainerProps> = ({
  onDragged
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchEngine = useSelector(selectSearchEngine);
  const searchEngines = useSelector(selectSearchEngines);
  const currentLanguage = useSelector(selectCurrentLanguage);

  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      const endIndex = result.destination.index;
      const startIndex = result.source.index;
      const newSearchEngines = Array.from(searchEngines);
      const [removed] = newSearchEngines.splice(startIndex, 1);
      newSearchEngines.splice(endIndex, 0, removed);

      dispatch(setSearchEngines(newSearchEngines));
    }

    onDragged(false);
  };

  const getDraggableElement = useCallback(
    (
      provided: DraggableProvided,
      snapshot: DraggableStateSnapshot
    ): ReactElement<HTMLDivElement> => {
      const draggableId = provided.draggableProps["data-rbd-draggable-id"];
      const getIcon = (): ReactElement<SVGElement> => {
        switch (draggableId) {
          case YANDEX:
            return currentLanguage !== "ru" ? <YandexEnIcon /> : <YandexIcon />;
          case GOOGLE:
            return <GoogleIcon />;
          case DUCK:
            return <DuckDuckGoIcon />;
          case BING:
            return <BingIcon />;
          case BRAVE:
            return <BraveIcon />;
          case AOL:
            return <AolIcon />;
          case YOUCOM:
            return <YoucomIcon />;
          case NIGMA:
            return <NigmaIcon />;
          case ECOSIA:
            return <EcosiaIcon />;
          case SEARCHCRYPT:
            return <SearchcryptIcon />;
          case METAGER:
            return <MetagerIcon />;
          case ZAPMETA:
            return <ZapmetaIcon />;
          case SWISSCOWS:
            return <SwisscowsIcon />;
          case GIBIRU:
            return <GibiruIcon />;
          case LYCOS:
            return <LycosIcon />;
          case YAHOO:
            return <YahooIcon />;
          case ASK:
            return <AskIcon />;
          case BOARDREADER:
            return <BoardreaderIcon />;
          case SEARCHCH:
            return <SearchchIcon />;
          default:
            return <></>;
        }
      };
      const onClick = () => {
        if (draggableId) {
          dispatch(setSearchEngine(draggableId));
        }
      };
      const getClassName = (): string => {
        return clsx(
          "new-tab__search-engine-selector-item",
          draggableId,
          { _selected: draggableId === searchEngine },
          { _dragging: snapshot.isDragging }
        );
      };

      return (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          title={t(`searchEngine.${draggableId}`)}
          onClick={onClick}
          children={getIcon()}
          className={getClassName()}
        />
      );
    },
    [currentLanguage, searchEngine, dispatch, t]
  );

  return (
    <DragDropContext
      onDragStart={() => onDragged(true)}
      onDragEnd={handleDragEnd}
    >
      <DroppableAriaComponent
        getDraggableElement={getDraggableElement}
        searchEngines={searchEngines}
      />
    </DragDropContext>
  );
};

export default memo(DroppableAriaContainer);
