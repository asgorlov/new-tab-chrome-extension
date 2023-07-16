import { FC, useCallback, useState } from "react";
import UpdateSettingComponent from "./update-setting.component";

interface UpdateSettingContainerProps {
  isDark: boolean;
  loading: boolean;
  checkMode: string;
  showMessage: boolean;
  lastVersion: string;
  onClickUpdates: () => void;
  onChangeCheckMode: (value: string) => void;
}

const UpdateSettingContainer: FC<UpdateSettingContainerProps> = ({
  isDark,
  loading,
  checkMode,
  showMessage,
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
      lastVersion={lastVersion}
      isPopoverOpen={isClicked && !loading && !showMessage}
      onClickUpdates={handleClickUpdates}
      onChangeCheckMode={onChangeCheckMode}
      onOpenPopoverChange={handleOpenChange}
    />
  );
};

export default UpdateSettingContainer;
