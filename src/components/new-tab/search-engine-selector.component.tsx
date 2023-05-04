import React, { FC, MouseEvent } from "react";
import clsx from "clsx";
import {
  BING,
  DUCK,
  GOOGLE,
  YANDEX
} from "../../constants/search-engine.constants";
import i18n from "../../localizations/i18n";
import { Button } from "antd";
import { ReactComponent as DuckIcon } from "../../static/svgs/duck-icon.svg";
import { ReactComponent as GoogleIcon } from "../../static/svgs/google-icon.svg";
import { ReactComponent as YaRuIcon } from "../../static/svgs/ya-icon.svg";
import { ReactComponent as YaEnIcon } from "../../static/svgs/ya-icon-en.svg";
import { ReactComponent as BingIcon } from "../../static/svgs/bing-icon.svg";

const ICON_HEIGHT = 32;
const ICON_WIDTH = 32;

interface SearchSelectedComponentProps {
  searchEngine: string;
  onClick: (event: MouseEvent) => void;
}

const SearchEngineSelectorComponent: FC<SearchSelectedComponentProps> = ({
  searchEngine,
  onClick
}) => {
  return (
    <div className="new-tab__search-engine-selector">
      <Button
        className={clsx("new-tab__search-engine-selector_bing", {
          grey: searchEngine !== BING
        })}
        onClick={onClick}
        value={BING}
        icon={<BingIcon height={ICON_HEIGHT} width={ICON_WIDTH} />}
      />
      <Button
        className={clsx("new-tab__search-engine-selector_duck", {
          grey: searchEngine !== DUCK
        })}
        onClick={onClick}
        value={DUCK}
        icon={<DuckIcon height={ICON_HEIGHT} width={ICON_WIDTH} />}
      />
      <Button
        className={clsx("new-tab__search-engine-selector_google", {
          grey: searchEngine !== GOOGLE
        })}
        onClick={onClick}
        value={GOOGLE}
        icon={<GoogleIcon height={ICON_HEIGHT} width={ICON_WIDTH} />}
      />
      <Button
        className={clsx("new-tab__search-engine-selector_yandex", {
          grey: searchEngine !== YANDEX
        })}
        onClick={onClick}
        value={YANDEX}
        icon={
          i18n.language.includes("ru") ? (
            <YaRuIcon height={ICON_HEIGHT} width={ICON_WIDTH} />
          ) : (
            <YaEnIcon height={ICON_HEIGHT} width={ICON_WIDTH} />
          )
        }
      />
    </div>
  );
};

export default SearchEngineSelectorComponent;