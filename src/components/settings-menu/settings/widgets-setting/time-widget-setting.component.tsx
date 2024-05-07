import React, {
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import { VoidFunc } from "../../../../models/common.model";
import { useTranslation } from "react-i18next";
import { WidgetName } from "../../../../constants/widget.constants";
import { ReactComponent as TimeIcon } from "../../../../static/svgs/menu-settings/time-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectTimeSettings } from "../../../../store/new-tab/new-tab.selectors";
import CheckboxComponent from "../../../common/checkbox/checkbox.component";
import { AppDispatch } from "../../../../store/store";
import { setTimeSettings } from "../../../../store/new-tab/new-tab.slice";

/**
 * Передаваемые параметры компонента настройки виджета часов
 * @property setIsSavedChanges - Функция для установки флага сохранения настроек
 * @interface
 */
export interface TimeWidgetSettingComponentProps {
  setIsSavedChanges: (value: boolean) => void;
}

/**
 * Компонент настройки виджета часов
 * @category Components
 */
const TimeWidgetSettingComponent: ForwardRefExoticComponent<
  PropsWithoutRef<TimeWidgetSettingComponentProps> & RefAttributes<VoidFunc>
> = forwardRef<VoidFunc, TimeWidgetSettingComponentProps>(
  ({ setIsSavedChanges }, ref) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const timeSettings = useSelector(selectTimeSettings);

    const [showSeconds, setShowSeconds] = useState(timeSettings.showSeconds);
    const [showFlashing, setShowFlashing] = useState(timeSettings.showFlashing);
    const [isCompact, setIsCompact] = useState(timeSettings.isCompact);

    const onSave = () => {
      dispatch(setTimeSettings({ showSeconds, showFlashing, isCompact }));
    };

    useImperativeHandle(ref, (): VoidFunc => onSave);

    useEffect(() => {
      const isShowSecondsChanged = timeSettings.showSeconds !== showSeconds;
      const isShowFlashingChanged = timeSettings.showFlashing !== showFlashing;
      const isCompactChanged = timeSettings.isCompact !== isCompact;

      setIsSavedChanges(
        isShowSecondsChanged || isShowFlashingChanged || isCompactChanged
      );
    }, [timeSettings, showSeconds, showFlashing, isCompact, setIsSavedChanges]);

    return (
      <div className="new-tab__settings-menu_widgets-content__item">
        <div className="new-tab__settings-menu_widgets-content__item-title">
          <TimeIcon />
          {t(`widgets.${WidgetName.TIME}`)}
        </div>
        <CheckboxComponent
          checked={showSeconds}
          onChange={e => setShowSeconds(e.target.checked)}
        >
          {t("time.settings.showSeconds")}
        </CheckboxComponent>
        <CheckboxComponent
          checked={showFlashing}
          onChange={e => setShowFlashing(e.target.checked)}
        >
          {t("time.settings.showFlashing")}
        </CheckboxComponent>
        <CheckboxComponent
          checked={isCompact}
          onChange={e => setIsCompact(e.target.checked)}
        >
          {t("time.settings.isCompact")}
        </CheckboxComponent>
      </div>
    );
  }
);

export default TimeWidgetSettingComponent;
