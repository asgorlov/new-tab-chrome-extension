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
import {
  getInitialFileList,
  getInitialOneToBoth
} from "../../../../utils/wallpaper.utils";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomWallpaper,
  selectSearchEngine,
  selectWallpaper
} from "../../../../store/new-tab/new-tab.selectors";
import {
  setCustomWallpaper,
  setWallpaper
} from "../../../../store/new-tab/new-tab.slice";
import { AppDispatch } from "../../../../store/store";

const WallpaperSettingContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const wallpaper = useSelector(selectWallpaper);
  const searchEngine = useSelector(selectSearchEngine);
  const customWallpaper = useSelector(selectCustomWallpaper);

  const [open, setOpen] = useState(false);
  const [oneToBoth, setOneToBoth] = useState(
    getInitialOneToBoth(customWallpaper)
  );
  const [darkFileList, setDarkFileList] = useState(
    getInitialFileList(customWallpaper?.darkTheme)
  );
  const [lightFileList, setLightFileList] = useState(
    getInitialFileList(customWallpaper?.lightTheme)
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
          setUploadingErrors([]);
          break;
        case LIGHT_INPUT_NAME:
          setLightFileList([]);
          setUploadedWallpaper({ ...uploadedWallpaper, lightTheme: undefined });
          uploadingErrors[0] = null;
          setUploadingErrors([...uploadingErrors]);
          break;
        case DARK_INPUT_NAME:
          setDarkFileList([]);
          setUploadedWallpaper({ ...uploadedWallpaper, darkTheme: undefined });
          uploadingErrors[1] = null;
          setUploadingErrors([...uploadingErrors]);
      }
    },
    [uploadedWallpaper, uploadingErrors]
  );

  const handleChangeUpload = useCallback(
    async (info: UploadChangeParam, inputName: string) => {
      const file = info.file as UploadFile;

      if (file.status === DONE_STATUS) {
        const errorIndex = inputName === DARK_INPUT_NAME ? 1 : 0;

        if (uploadingErrors[errorIndex]) {
          uploadingErrors[errorIndex] = null;
          setUploadingErrors([...uploadingErrors]);
        }

        switch (inputName) {
          case BOTH_INPUT_NAME:
            setUploadedWallpaper({
              lightTheme: file.response
            });
            break;
          case LIGHT_INPUT_NAME:
            setUploadedWallpaper(
              uploadedWallpaper?.darkTheme
                ? { ...uploadedWallpaper, lightTheme: file.response }
                : { lightTheme: file.response }
            );
            break;
          case DARK_INPUT_NAME:
            setUploadedWallpaper(
              uploadedWallpaper?.lightTheme
                ? { ...uploadedWallpaper, darkTheme: file.response }
                : { darkTheme: file.response }
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
      lightFileList={lightFileList}
      darkFileList={darkFileList}
      searchEngine={searchEngine}
      disabledOk={disabledOk}
      wallpaper={wallpaper}
      oneToBoth={oneToBoth}
      onCancel={handleCancel}
      onOk={handleOk}
      open={open}
    />
  );
};

export default WallpaperSettingContainer;
