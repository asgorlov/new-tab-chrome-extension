import { RefObject, useEffect, useRef } from "react";

/**
 * Хук горизонтального скроллинга элемента
 * @category Hooks
 * @returns ref элемента
 */
export const useHorizontalScroll = <T>(
  delta: number = 0,
  initValue: T | null = null
): RefObject<T> => {
  const elementRef = useRef<T>(initValue);

  useEffect(() => {
    const element: any = elementRef.current;

    if (element) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY !== 0) {
          const customDelta =
            delta === 0 ? e.deltaY : e.deltaY > 0 ? delta : -delta;
          e.preventDefault();

          element.scrollTo({
            left: element.scrollLeft + customDelta,
            behavior: "smooth"
          });
        }
      };

      element.addEventListener("wheel", onWheel);

      return () => element.removeEventListener("wheel", onWheel);
    }
  }, [delta]);

  return elementRef;
};
