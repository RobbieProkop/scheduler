import React from "react";
import "../../styles/Appointment.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

//setting up an appointment
const Appointment = ({ id, time, interview, interviewers, bookInterview }) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // upon clicking the save button, transition to SHOW interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => console.log(error));
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
      {mode === SAVING && <Status />}
      {mode === CREATE && (
        <Form onSave={save} interviewers={interviewers} onCancel={back} />
      )}
    </article>
  );
};

export default Appointment;
