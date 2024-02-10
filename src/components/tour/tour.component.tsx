import { FC, useRef, useState } from "react";
import { TourStepProps } from "antd/es/tour/interface";
import { useTranslation } from "react-i18next";
import {
  useTourStepFourContext,
  useTourStepOneContext,
  useTourStepThreeContext,
  useTourStepTwoContext
} from "../../contexts/tour.context";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpenMenu,
  setSearchEngine,
  setSettingsActiveKeys,
  setShowTour
} from "../../store/new-tab/new-tab.slice";
import { Tour } from "antd";
import {
  selectSearchEngine,
  selectShowTour
} from "../../store/new-tab/new-tab.selectors";
import { CollapsedMenuSetting } from "../../constants/settings-menu.constants";
import { SEARXNG } from "../../constants/search-engine.constants";

/**
 * Компонент ознакомительного тура
 * @category Components
 */
const TourComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchEngineRef = useTourStepOneContext();
  const searXngUrlInputRef = useTourStepFourContext();
  const settingsMenuContentRef = useTourStepThreeContext();
  const searchEngineSelectorRef = useTourStepTwoContext();

  const showTour = useSelector(selectShowTour);
  const searchEngine = useSelector(selectSearchEngine);
  const prevSearchEngine = useRef(searchEngine);

  const [open, setOpen] = useState(showTour);

  const handleTourClose = () => {
    setOpen(false);
    dispatch(setShowTour(false));
    dispatch(setIsOpenMenu(false));
  };

  const steps = [
    {
      title: t("tour.step1.title"),
      description: t("tour.step1.description"),
      placement: "bottom",
      target: searchEngineRef.current,
      nextButtonProps: {
        children: t("tour.button.next")
      }
    },
    {
      title: t("tour.step2.title"),
      description: t("tour.step2.description"),
      placement: "top",
      target: searchEngineSelectorRef.current,
      nextButtonProps: {
        onClick: () => dispatch(setIsOpenMenu(true)),
        children: t("tour.button.next")
      },
      prevButtonProps: {
        children: t("tour.button.previous")
      }
    },
    {
      title: t("tour.step3.title"),
      description: t("tour.step3.description"),
      placement: "left",
      target: () => settingsMenuContentRef.current,
      nextButtonProps: {
        onClick: () => {
          dispatch(setSearchEngine(SEARXNG));
          dispatch(
            setSettingsActiveKeys({
              [CollapsedMenuSetting.SEARCH_ENGINE]: [
                CollapsedMenuSetting.SEARCH_ENGINE
              ]
            })
          );
        },
        children: t("tour.button.next")
      },
      prevButtonProps: {
        onClick: () => dispatch(setIsOpenMenu(false)),
        children: t("tour.button.previous")
      }
    },
    {
      title: t("tour.step4.title"),
      description: t("tour.step4.description"),
      placement: "left",
      target: () => {
        if (searXngUrlInputRef.current) {
          searXngUrlInputRef.current.focus();
          return searXngUrlInputRef.current.input;
        }

        return null;
      },
      nextButtonProps: {
        onClick: () => {
          dispatch(setIsOpenMenu(false));
          dispatch(setSearchEngine(prevSearchEngine.current));
          dispatch(
            setSettingsActiveKeys({ [CollapsedMenuSetting.SEARCH_ENGINE]: [] })
          );
        },
        children: t("tour.button.finish")
      },
      prevButtonProps: {
        onClick: () => dispatch(setSearchEngine(prevSearchEngine.current)),
        children: t("tour.button.previous")
      }
    }
  ] as TourStepProps[];

  return (
    <Tour
      prefixCls="new-tab__tour"
      open={open}
      steps={steps}
      onClose={handleTourClose}
    />
  );
};

export default TourComponent;
