import React from "react";
import "../../styles/Appointment.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";

const Appointment = (props) => {
  const { time, interview } = props;
  return (
    <article className="appointment">
      {time && <Header time={time} />}
      {interview ? <Show {...props.interview} /> : <Empty />}
    </article>
  );
};

export default Appointment;
