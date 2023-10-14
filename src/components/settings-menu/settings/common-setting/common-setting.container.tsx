import { FC, MouseEvent, useCallback, useState } from "react";
import CommonSettingComponent from "./common-setting.component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { applySettings } from "../../../../store/new-tab/new-tab.thunks";
import {
  BUTTON_NAMES,
  DEVICE_OPTION,
  SETTINGS_FILE_NAME,
  SETTINGS_FILE_TYPE
} from "../../../../constants/common-setting.constants";
import {
  downloadFile,
  getSettingsAdaptedToCurrentVersion,
  getSettingsUploadingErrorKey
} from "../../../../utils/common-setting.utils";
import { getInitStateFromChrome } from "../../../../utils/chrome.utils";
import {
  RcFile,
  UploadChangeParam,
  UploadFile
} from "antd/es/upload/interface";
import {
  DONE_STATUS,
  ERROR_STATUS
} from "../../../../constants/wallpaper.constants";
import { RadioChangeEvent } from "antd/es/radio/interface";
import { useTranslation } from "react-i18next";
import { UploadRequestOption as RcCustomRequestOptions } from "rc-upload/lib/interface";
import { NewTabStateBase } from "../../../../models/new-tab-state.model";

const CommonSettingContainer: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [radioOption, setRadioOption] = useState(DEVICE_OPTION);
  const [selectedOption, setSelectedOption] = useState("");
  const [uploadingError, setUploadingError] = useState("");
  const [settingFileList, setSettingFileList] = useState<UploadFile[]>([]);
  const [uploadedSettings, setUploadedSettings] =
    useState<NewTabStateBase | null>(null);

  const handleResetImportSettings = useCallback(() => {
    if (selectedOption === BUTTON_NAMES.import) {
      setUploadingError("");
      setSettingFileList([]);
      setUploadedSettings(null);
    }
  }, [selectedOption]);

  const handleChangeRadioOption = useCallback(
    (event: RadioChangeEvent) => {
      setRadioOption(event.target.value);
      handleResetImportSettings();
    },
    [handleResetImportSettings]
  );

  const handleClickOpenModal = useCallback(
    (e: MouseEvent<HTMLButtonElement>) =>
      setSelectedOption(e.currentTarget.name),
    []
  );

  const handleCancel = useCallback(() => {
    setSelectedOption("");
    handleResetImportSettings();
  }, [handleResetImportSettings]);

  const handleChange = useCallback((info: UploadChangeParam) => {
    const file = info.file as UploadFile;

    if (file.status === DONE_STATUS) {
      const reader = new FileReader();
      reader.onloadend = (event: ProgressEvent<FileReader>) => {
        const json = event.target?.result?.toString();

        if (json) {
          const settings = getSettingsAdaptedToCurrentVersion(json);
          setUploadedSettings(settings);
          setUploadingError("");
        }
      };
      reader.readAsText(info.file.originFileObj as Blob);
    } else if (file.status === ERROR_STATUS) {
      setUploadingError(file.error.message);
    }

    setSettingFileList(info.fileList);
  }, []);

  const validateUploading = useCallback(
    async (options: RcCustomRequestOptions): Promise<void> => {
      const file = options.file as RcFile;
      const errorKey = await getSettingsUploadingErrorKey(file);

      if (errorKey) {
        options.onError?.(new Error(t(errorKey)));
      } else {
        options.onSuccess?.(file);
      }
    },
    [t]
  );

  const handleConfirm = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault();

      switch (selectedOption) {
        case BUTTON_NAMES.reset:
          dispatch(applySettings(null));
          break;
        case BUTTON_NAMES.export:
          const settings = await getInitStateFromChrome();
          downloadFile(
            JSON.stringify(settings),
            SETTINGS_FILE_NAME,
            SETTINGS_FILE_TYPE
          );
          break;
        case BUTTON_NAMES.import:
          if (uploadedSettings) {
            dispatch(applySettings(uploadedSettings));
          }
      }

      handleCancel();
    },
    [uploadedSettings, selectedOption, handleCancel, dispatch]
  );

  return (
    <CommonSettingComponent
      disableOk={Boolean(
        selectedOption === BUTTON_NAMES.import &&
          (!uploadedSettings || uploadingError)
      )}
      radioOption={radioOption}
      uploadingError={uploadingError}
      selectedOption={selectedOption}
      settingFileList={settingFileList}
      onOk={handleConfirm}
      onCancel={handleCancel}
      onChange={handleChange}
      onRemove={handleResetImportSettings}
      onClickOpenModal={handleClickOpenModal}
      validateUploading={validateUploading}
      onChangeRadioOption={handleChangeRadioOption}
    />
  );
};

export default CommonSettingContainer;
