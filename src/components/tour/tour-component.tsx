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
        target: () => tourCtx?.searchEngineRef.current
      },
      {
        title: t("tour.step2.title"),
        description: t("tour.step2.description"),
        placement: "top",
        target: () => tourCtx?.searchEngineSelectorRef.current,
        nextButtonProps: {
          onClick: () => dispatch(setIsOpenMenu(true))
        }
      },
      {
        title: t("tour.step3.title"),
        description: t("tour.step3.description"),
        placement: "left",
        target: () => {
          return tourCtx?.settingsMenuClass
            ? document.querySelector(tourCtx.settingsMenuClass)
            : null;
        },
        prevButtonProps: {
          onClick: () => dispatch(setIsOpenMenu(false))
        },
        nextButtonProps: {
          onClick: () => dispatch(setIsOpenMenu(false))
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
