import { FC, useCallback, useState } from "react";
import UpdateSettingComponent from "./update-setting.component";
import { CURRENT_EXT_VERSION } from "../../../../constants/update.constants";

interface UpdateSettingContainerProps {
  isDark: boolean;
  loading: boolean;
  checkMode: string;
  lastVersion: string;
  onClickUpdates: () => void;
  onChangeCheckMode: (value: string) => void;
}

const UpdateSettingContainer: FC<UpdateSettingContainerProps> = ({
  isDark,
  loading,
  checkMode,
  lastVersion,
  onClickUpdates,
  onChangeCheckMode
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleOpenChange = (visible: boolean) => {
    if (!visible) {
      setIsClicked(false);
    }
  };
  const handleClickUpdates = useCallback(() => {
    onClickUpdates();
    setIsClicked(true);
  }, [onClickUpdates]);

  return (
    <UpdateSettingComponent
      isDark={isDark}
      loading={loading}
      checkMode={checkMode}
      isPopoverOpen={
        isClicked && !loading && lastVersion === CURRENT_EXT_VERSION
      }
      onClickUpdates={handleClickUpdates}
      onChangeCheckMode={onChangeCheckMode}
      onOpenPopoverChange={handleOpenChange}
    />
  );
};

export default UpdateSettingContainer;
