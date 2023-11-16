import { FC, useState } from "react";
import { TourStepProps } from "antd/es/tour/interface";
import { useTranslation } from "react-i18next";
import {
  useTourStepOneContext,
  useTourStepThreeContext,
  useTourStepTwoContext
} from "../../contexts/tour.context";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenMenu, setShowTour } from "../../store/new-tab/new-tab.slice";
import { Tour } from "antd";
import { selectShowTour } from "../../store/new-tab/new-tab.selectors";

/**
 * Компонент ознакомительного тура
 * @category Components
 */
const TourComponent: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchEngineRef = useTourStepOneContext();
  const settingsMenuContentRef = useTourStepThreeContext();
  const searchEngineSelectorRef = useTourStepTwoContext();

  const showTour = useSelector(selectShowTour);

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
      prevButtonProps: {
        onClick: () => dispatch(setIsOpenMenu(false)),
        children: t("tour.button.previous")
      },
      nextButtonProps: {
        onClick: () => dispatch(setIsOpenMenu(false)),
        children: t("tour.button.finish")
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
