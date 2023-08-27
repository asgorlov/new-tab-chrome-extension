import { FC, useCallback, useState } from "react";
import WallpaperSettingComponent from "./wallpaper-setting.component";
import {
  BOTH_INPUT_NAME,
  CUSTOM_WALLPAPER,
  DARK_INPUT_NAME,
  DONE_STATUS,
  ERROR_STATUS,
  LIGHT_INPUT_NAME
} from "../../../../constants/wallpaper.constants";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import { useTranslation } from "react-i18next";
import {
  convertImgToBase64,
  getInitialFileList,
  getInitialOneToBoth,
  getUploadingErrorKey
} from "../../../../utils/wallpaper.utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomWallpaper,
  selectIsDark,
  selectSearchEngine,
  selectWallpaper
} from "../../../../store/new-tab/new-tab.selectors";
import {
  setCustomWallpaper,
  setWallpaper
} from "../../../../store/new-tab/new-tab.slice";
import { AppDispatch } from "../../../../store/store";

const WallpaperSettingContainer: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const isDark = useSelector(selectIsDark);
  const wallpaper = useSelector(selectWallpaper);
  const searchEngine = useSelector(selectSearchEngine);
  const customWallpaper = useSelector(selectCustomWallpaper);

  const [open, setOpen] = useState(false);
  const [oneToBoth, setOneToBoth] = useState(
    getInitialOneToBoth(customWallpaper)
  );
  const [darkFileList, setDarkFileList] = useState(
    getInitialFileList(customWallpaper?.darkTheme, DARK_INPUT_NAME)
  );
  const [lightFileList, setLightFileList] = useState(
    getInitialFileList(customWallpaper?.lightTheme, LIGHT_INPUT_NAME)
  );
  const [uploadingErrors, setUploadingErrors] = useState(Array(2));
  const [uploadedWallpaper, setUploadedWallpaper] = useState(customWallpaper);

  const disabledOk =
    uploadingErrors.filter(e => e).length > 0 ||
    !uploadedWallpaper ||
    (oneToBoth
      ? !uploadedWallpaper.lightTheme
      : !uploadedWallpaper.lightTheme || !uploadedWallpaper.darkTheme);

  const handleClickWallpaper = useCallback(
    (name: string) => {
      if (name === CUSTOM_WALLPAPER) {
        setOpen(true);
      } else {
        dispatch(setCustomWallpaper(null));
        setUploadedWallpaper(null);
        setDarkFileList([]);
        setLightFileList([]);
        setOneToBoth(true);
      }

      dispatch(setWallpaper(name));
    },
    [dispatch]
  );
  const handleClickCheckbox = useCallback(
    () => setOneToBoth(!oneToBoth),
    [oneToBoth]
  );
  const handleRemoveUpload = useCallback(
    (inputName: string) => {
      switch (inputName) {
        case BOTH_INPUT_NAME:
          setLightFileList([]);
          setUploadedWallpaper(null);
          break;
        case LIGHT_INPUT_NAME:
          setLightFileList([]);
          setUploadedWallpaper({ ...uploadedWallpaper, lightTheme: undefined });
          break;
        case DARK_INPUT_NAME:
          setDarkFileList([]);
          setUploadedWallpaper({ ...uploadedWallpaper, darkTheme: undefined });
      }
    },
    [uploadedWallpaper]
  );
  const handleChangeUpload = useCallback(
    async (info: UploadChangeParam, inputName: string) => {
      const file = info.file as UploadFile;

      if (file.status === DONE_STATUS) {
        const thumbUrl =
          file.thumbUrl ?? (await convertImgToBase64(info.file.response));
        const errorIndex = inputName === DARK_INPUT_NAME ? 1 : 0;

        if (uploadingErrors[errorIndex]) {
          uploadingErrors[errorIndex] = null;
          setUploadingErrors([...uploadingErrors]);
        }

        switch (inputName) {
          case BOTH_INPUT_NAME:
            setUploadedWallpaper({
              lightTheme: thumbUrl
            });

            break;
          case LIGHT_INPUT_NAME:
            setUploadedWallpaper(
              uploadedWallpaper?.darkTheme
                ? { ...uploadedWallpaper, lightTheme: thumbUrl }
                : { lightTheme: thumbUrl }
            );

            break;
          case DARK_INPUT_NAME:
            setUploadedWallpaper(
              uploadedWallpaper?.lightTheme
                ? { ...uploadedWallpaper, darkTheme: thumbUrl }
                : { darkTheme: thumbUrl }
            );
        }
      } else if (file.status === ERROR_STATUS) {
        const errorIndex = inputName === DARK_INPUT_NAME ? 1 : 0;
        uploadingErrors[errorIndex] = file.error.message;
        setUploadingErrors([...uploadingErrors]);
      }

      if (inputName === DARK_INPUT_NAME) {
        setDarkFileList(info.fileList);
      } else {
        setLightFileList(info.fileList);
      }
    },
    [uploadedWallpaper, uploadingErrors]
  );
  const handleUpload = useCallback(
    (options: any) => {
      const errorKey = getUploadingErrorKey(options.file);
      if (errorKey) {
        options.onError(new Error(t(errorKey)));
      } else {
        options.onSuccess(options.file);
      }
    },
    [t]
  );
  const handleCancel = useCallback(() => setOpen(false), []);
  const handleOk = useCallback(() => {
    if (uploadedWallpaper) {
      dispatch(setCustomWallpaper(uploadedWallpaper));
    }

    handleCancel();
  }, [handleCancel, uploadedWallpaper, dispatch]);

  return (
    <WallpaperSettingComponent
      onClickWallpaper={handleClickWallpaper}
      onClickCheckbox={handleClickCheckbox}
      onChangeUpload={handleChangeUpload}
      onRemoveUpload={handleRemoveUpload}
      uploadingErrors={uploadingErrors}
      customRequest={handleUpload}
      lightFileList={lightFileList}
      darkFileList={darkFileList}
      searchEngine={searchEngine}
      disabledOk={disabledOk}
      wallpaper={wallpaper}
      oneToBoth={oneToBoth}
      onCancel={handleCancel}
      isDark={isDark}
      onOk={handleOk}
      open={open}
    />
  );
};

export default WallpaperSettingContainer;
