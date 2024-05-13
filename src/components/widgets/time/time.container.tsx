import React, { FC, useEffect, useState } from "react";
import TimeComponent from "./time.component";

const TimeContainer: FC = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(
      () => setDate(prevState => new Date(prevState).add(1, "s")),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);

  return <TimeComponent date={date} />;
};

export default TimeContainer;
