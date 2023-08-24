import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { FC, MouseEvent, useCallback, useEffect } from "react";
import { setShowUpdateMessage } from "../../store/new-tab/new-tab.slice";
import UpdateComponent from "./update.component";
import { shouldBeCheck } from "../../utils/update.utils";
import {
  selectCheckForUpdates,
  selectLastUpdateDate,
  selectShowUpdateMessage
} from "../../store/new-tab/new-tab.selectors";
import { checkUpdates } from "../../store/new-tab/new-tab.thunks";

const UpdateContainer: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const checkMode = useSelector(selectCheckForUpdates);
  const showMessage = useSelector(selectShowUpdateMessage);
  const lastUpdateDate = useSelector(selectLastUpdateDate);

  const closeHandle = useCallback(() => {
    dispatch(setShowUpdateMessage(false));
  }, [dispatch]);

  const clickDownloadHandle = useCallback(
    (e: MouseEvent) => {
      if (e.button === 0 || e.button === 1) {
        const link = e.target as HTMLLinkElement;
        window.open(link.href);

        dispatch(setShowUpdateMessage(false));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (shouldBeCheck(lastUpdateDate, checkMode)) {
      dispatch(checkUpdates());
    }
  }, [checkMode, lastUpdateDate, dispatch]);

  return (
    <UpdateComponent
      open={showMessage}
      onClose={closeHandle}
      onMouseDown={clickDownloadHandle}
    />
  );
};

export default UpdateContainer;
