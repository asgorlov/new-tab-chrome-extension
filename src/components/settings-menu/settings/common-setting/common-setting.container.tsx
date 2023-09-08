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
import { downloadFile } from "../../../../utils/common-setting.utils";
import { getInitStateFromChrome } from "../../../../utils/chrome.utils";
import { UploadChangeParam, UploadFile } from "antd/es/upload/interface";
import {
  DONE_STATUS,
  ERROR_STATUS
} from "../../../../constants/wallpaper.constants";
import { RadioChangeEvent } from "antd/es/radio/interface";

const CommonSettingContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [radioOption, setRadioOption] = useState(DEVICE_OPTION);
  const [selectedOption, setSelectedOption] = useState("");
  const [uploadingError, setUploadingError] = useState("");
  const [settingFileList, setSettingFileList] = useState<UploadFile[]>([]);
  const [uploadedSettings, setUploadedSettings] = useState(null);

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
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const json = event.target?.result?.toString();
        if (json) {
          setUploadingError("");
          setUploadedSettings(JSON.parse(json));
        }
      };
      reader.readAsText(info.file.originFileObj as Blob);
    } else if (file.status === ERROR_STATUS) {
      setUploadingError(file.error.message);
    }

    setSettingFileList(info.fileList);
  }, []);

  const validateUploading = useCallback(
    (file: File): string =>
      file.type !== SETTINGS_FILE_TYPE ? "commonSetting.import.typeError" : "",
    []
  );

  const handleConfirm = useCallback(
    async (event: MouseEvent) => {
      event.preventDefault();

      switch (selectedOption) {
        case BUTTON_NAMES.reset:
          dispatch(applySettings());
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
          break;
      }

      handleCancel();
    },
    [uploadedSettings, selectedOption, handleCancel, dispatch]
  );

  return (
    <CommonSettingComponent
      disableOk={
        selectedOption === BUTTON_NAMES.import &&
        (!uploadedSettings || uploadingError)
      }
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
