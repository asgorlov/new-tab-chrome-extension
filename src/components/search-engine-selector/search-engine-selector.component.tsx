import React, { FC, MouseEvent } from "react";
import clsx from "clsx";
import { DragAndDropModel } from "../../models/drag-and-drop.model";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../store/new-tab.slice";
import { YANDEX } from "../../constants/search-engine.constants";
import { useTranslation } from "react-i18next";

interface SearchSelectedComponentProps {
  searchEngineNames: string[];
  searchEngine: string;
  draggedItem: DragAndDropModel;
  onDragLeave: () => void;
  onDragStart: (event: MouseEvent) => void;
  onDragOver: (event: MouseEvent) => void;
  onClick: (event: MouseEvent) => void;
  onDrop: () => void;
}

const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
  searchEngineNames,
  searchEngine,
  draggedItem,
  onDragLeave,
  onDragStart,
  onDragOver,
  onClick,
  onDrop
}) => {
  const { t } = useTranslation();
  const currentLanguage = useSelector(selectCurrentLanguage);

  return (
    <div className="new-tab__search-engine-selector">
      {searchEngineNames.map((name: string, index: number) => (
        <div
          data-name={name}
          data-position={index}
          draggable={true}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDragLeave={onDragLeave}
          className={clsx(
            "new-tab__search-engine-selector-item",
            searchEngine === YANDEX && currentLanguage !== "ru"
              ? name + "-en"
              : name,
            { selected: searchEngine === name },
            {
              dragged:
                draggedItem.draggedTo != null && draggedItem.draggedTo === index
            }
          )}
          onClick={onClick}
          title={t(`searchEngine.${name}`)}
          key={name}
        />
      ))}
    </div>
  );
};

export default SearchEngineSelectorComponent;
