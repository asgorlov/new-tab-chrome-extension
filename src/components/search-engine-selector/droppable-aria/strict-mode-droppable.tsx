import { FC, useEffect, useState } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

// ToDo: this workaround is used to make "react-beautiful-dnd" work in react v18 with strict mode.
//  Remove when issue will be fixed in react-beautiful-dnd.
const StrictModeDroppable: FC<DroppableProps> = ({ children, ...rest }) => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  return enabled ? <Droppable children={children} {...rest} /> : null;
};

export default StrictModeDroppable;
