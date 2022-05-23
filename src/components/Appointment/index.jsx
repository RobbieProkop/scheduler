import React from "react";
import "../../styles/Appointment.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

const Appointment = ({ time, interview, interviewers }) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    console.log("interview", interview);
  };

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
      {mode === CREATE && (
        <Form onSave={save} interviewers={interviewers} onCancel={back} />
      )}
    </article>
  );
};

export default Appointment;
