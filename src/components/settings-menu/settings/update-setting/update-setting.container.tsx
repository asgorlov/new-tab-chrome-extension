import { FC, useCallback, useState } from "react";
import UpdateSettingComponent from "./update-setting.component";
import { CURRENT_EXT_VERSION } from "../../../../constants/update.constants";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCheckForUpdates,
  selectCheckLoading,
  selectIsDark,
  selectLastVersion
} from "../../../../store/new-tab/new-tab.selectors";
import { checkUpdates } from "../../../../store/new-tab/new-tab.thunks";
import { AppDispatch } from "../../../../store/store";
import { setCheckForUpdates } from "../../../../store/new-tab/new-tab.slice";

const UpdateSettingContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDark = useSelector(selectIsDark);
  const checkMode = useSelector(selectCheckForUpdates);
  const lastVersion = useSelector(selectLastVersion);
  const checkLoading = useSelector(selectCheckLoading);

  const [isClicked, setIsClicked] = useState(false);

  const handleOpenChange = (visible: boolean) => {
    if (!visible) {
      setIsClicked(false);
    }
  };
  const handleClickUpdates = useCallback(() => {
    dispatch(checkUpdates());
    setIsClicked(true);
  }, [dispatch]);

  return (
    <UpdateSettingComponent
      isDark={isDark}
      loading={checkLoading}
      checkMode={checkMode}
      isPopoverOpen={
        isClicked && !checkLoading && lastVersion === CURRENT_EXT_VERSION
      }
      onClickUpdates={handleClickUpdates}
      onChangeCheckMode={v => dispatch(setCheckForUpdates(v))}
      onOpenPopoverChange={handleOpenChange}
    />
  );
};

export default UpdateSettingContainer;
