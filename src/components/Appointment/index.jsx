import React from "react";
import "../../styles/Appointment.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import { getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = ({ time, interview, interviewers }) => {
  // const { time, interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  console.log("props.interview", interview);

  return (
    <article className="appointment">
      {time && <Header time={time} />}
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            console.log("Clicked onAdd");
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && <Show {...interview} />}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={back} />}
    </article>
  );
};

export default Appointment;
