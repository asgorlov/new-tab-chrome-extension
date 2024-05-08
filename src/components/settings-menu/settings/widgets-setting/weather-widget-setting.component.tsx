import React, {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import { VoidFunc } from "../../../../models/common.model";
import { ReactComponent as WeatherIcon } from "../../../../static/svgs/menu-settings/weather-icon.svg";
import { WidgetName } from "../../../../constants/widget.constants";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import CheckboxComponent from "../../../common/checkbox/checkbox.component";
import InputComponent from "../../../common/input/input.component";
import {
  selectCurrentLocation,
  selectWeatherSettings
} from "../../../../store/new-tab/new-tab.selectors";
import {
  getCorrectLatitudeValue,
  getCorrectLongitudeValue,
  removeExtraZeros
} from "../../../../utils/weather.utils";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { setWeatherSettings } from "../../../../store/new-tab/new-tab.slice";

/**
 * Передаваемые параметры компонента настройки виджета погоды
 * @property setIsSavedChanges - Функция для установки флага сохранения настроек
 * @interface
 */
export interface WeatherWidgetSettingComponentProps {
  setIsSavedChanges: (value: boolean) => void;
}

/**
 * Компонент настройки виджета погоды
 * @category Components
 */
const WeatherWidgetSettingComponent: ForwardRefExoticComponent<
  PropsWithoutRef<WeatherWidgetSettingComponentProps> & RefAttributes<VoidFunc>
> = forwardRef<VoidFunc, WeatherWidgetSettingComponentProps>(
  ({ setIsSavedChanges }, ref) => {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const currentLocation = useSelector(selectCurrentLocation);
    const weatherSettings = useSelector(selectWeatherSettings);

    const initialCurrentLocationChecked =
      !weatherSettings.location ||
      JSON.stringify(weatherSettings.location) ===
        JSON.stringify(currentLocation);
    const initialLongitude =
      weatherSettings.location?.longitude.toString() ??
      currentLocation?.longitude.toString() ??
      "";
    const initialLatitude =
      weatherSettings.location?.latitude.toString() ??
      currentLocation?.latitude.toString() ??
      "";

    const [currentLocationChecked, setCurrentLocationChecked] = useState(
      initialCurrentLocationChecked
    );
    const [longitude, setLongitude] = useState<string>(initialLongitude);
    const [latitude, setLatitude] = useState<string>(initialLatitude);

    const onCheckboxChange = useCallback(
      (event: CheckboxChangeEvent) => {
        const isChecked = event.target.checked;
        if (isChecked) {
          const currentLtd = currentLocation?.latitude.toString();
          const currentLng = currentLocation?.longitude.toString();
          setLatitude(currentLtd ?? "");
          setLongitude(currentLng ?? "");
        }

        setCurrentLocationChecked(isChecked);
      },
      [currentLocation]
    );

    const onLngChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      const value = getCorrectLongitudeValue(event.target.value);
      setLongitude(value);
    }, []);

    const onLtdChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      const value = getCorrectLatitudeValue(event.target.value);
      setLatitude(value);
    }, []);

    const onLngBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
      const value = removeExtraZeros(event.target.value);
      if (value) {
        setLongitude(value);
      }
    }, []);

    const onLtdBlur = useCallback((event: FocusEvent<HTMLInputElement>) => {
      const value = removeExtraZeros(event.target.value);
      if (value) {
        setLatitude(value);
      }
    }, []);

    const onSave = () => {
      const location = {
        latitude: Number(latitude),
        longitude: Number(longitude)
      };
      dispatch(setWeatherSettings({ ...weatherSettings, location }));
    };

    useImperativeHandle(ref, (): VoidFunc => onSave);

    useEffect(() => {
      const isSelectedLocation = () => {
        const selectedLocation = weatherSettings.location;
        return (
          latitude === selectedLocation?.latitude.toString() &&
          longitude === selectedLocation.longitude.toString()
        );
      };
      const isLocationChanged =
        Boolean(longitude && latitude) && !isSelectedLocation();

      setIsSavedChanges(isLocationChanged);
    }, [longitude, latitude, weatherSettings.location, setIsSavedChanges]);

    return (
      <div className="new-tab__settings-menu_widgets-content__item">
        <div className="new-tab__settings-menu_widgets-content__item-title">
          <WeatherIcon />
          {t(`widgets.${WidgetName.WEATHER}`)}
        </div>
        <CheckboxComponent
          checked={currentLocationChecked}
          onChange={onCheckboxChange}
        >
          {t("weather.settings.currentLocation")}
        </CheckboxComponent>
        {!currentLocationChecked && (
          <div className="new-tab__settings-menu_widgets-content__item_input-group">
            <label>
              <span>{t("weather.settings.lng")}</span>
              <InputComponent
                value={longitude}
                onChange={onLngChange}
                onBlur={onLngBlur}
              />
            </label>
            <label>
              <span>{t("weather.settings.ltd")}</span>
              <InputComponent
                value={latitude}
                onChange={onLtdChange}
                onBlur={onLtdBlur}
              />
            </label>
          </div>
        )}
      </div>
    );
  }
);

export default WeatherWidgetSettingComponent;
