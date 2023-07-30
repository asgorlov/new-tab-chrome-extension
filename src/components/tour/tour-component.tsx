import { FC, useContext, useMemo, useState } from "react";
import { TourStepProps } from "antd/es/tour/interface";
import { useTranslation } from "react-i18next";
import { TourContext } from "../../contexts/tour.context";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsDark,
  setIsOpenMenu,
  setShowTour
} from "../../store/new-tab.slice";
import { Tour } from "antd";

interface TourComponentProps {
  showTour: boolean;
}

const TourComponent: FC<TourComponentProps> = ({ showTour }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tourCtx = useContext(TourContext);
  const isDark = useSelector(selectIsDark);
  const [open, setOpen] = useState(showTour);

  const handleTourClose = () => {
    setOpen(false);
    dispatch(setShowTour(false));
    dispatch(setIsOpenMenu(false));
  };

  const steps = useMemo(() => {
    return [
      {
        title: t("tour.step1.title"),
        description: t("tour.step1.description"),
        placement: "bottom",
        target: () => tourCtx?.searchEngineRef.current,
        nextButtonProps: {
          children: t("tour.button.next")
        }
      },
      {
        title: t("tour.step2.title"),
        description: t("tour.step2.description"),
        placement: "top",
        target: () => tourCtx?.searchEngineSelectorRef.current,
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
        target: () => {
          return tourCtx?.settingsMenuContainerClass
            ? document.querySelector(tourCtx.settingsMenuContainerClass)
            : null;
        },
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
  }, [tourCtx, t, dispatch]);

  return (
    <Tour
      prefixCls={`new-tab__tour${isDark ? "_dark" : ""}`}
      open={open}
      steps={steps}
      onClose={handleTourClose}
    />
  );
};

export default TourComponent;
