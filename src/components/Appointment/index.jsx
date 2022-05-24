import React from "react";
import "../../styles/Appointment.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

//setting up an appointment
const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  // upon clicking the save button on the form, transition to SHOW interview
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer: interviewer.id,
    };

    transition(SAVING);

    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  //delete the appointment from confirm page
  const deleteInterview = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      {time && <Header time={time} />}

      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}

      {mode === CREATE && (
        <Form onSave={save} interviewers={interviewers} onCancel={back} />
      )}

      {mode === SAVING && <Status message="Saving" />}

      {mode === SHOW && (
        <Show
          {...interview}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {/* edit an appointment */}
      {mode === EDIT && (
        <Form
          onSave={save}
          interviewers={interviewers}
          interviewer={interview.interviewer}
          student={interview.student}
          onCancel={back}
        />
      )}

      {/* delete appointment */}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete?"
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}

      {mode === DELETING && <Status message="Deleting" />}

      {mode === ERROR_SAVE && (
        <Error message="Error while saving" onClose={back} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Error while deleting" onClose={back} />
      )}
    </article>
  );
};

export default Appointment;
