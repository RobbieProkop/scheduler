import React, { useState } from "react";
import "../../styles/Appointment.scss";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    return setStudent(""), setInterviewer(null), onCancel();
  };

  const [error, setError] = useState("");
  const save = () => {
    if (!student) return setError("Student name cannot be blank");
    if (!interviewer) return setError("Please select an interviewer");
    onSave(student, interviewer);
  };

  // const validate = () => {
  //   if (!interviewer) return setError("Please select an interviewer");
  //   if (!student) return setError("Student name cannot be blank");

  //   onSave(student, interviewer);
  // };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            // onSave(student, interviewer);
          }}
        >
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            onCancel={onCancel}
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          value={interviewer && interviewer.id}
          onChange={setInterviewer}
          interviewers={interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>
            Cancel
          </Button>
          <Button confirm onClick={() => save()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
