import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "../styles/InterviewerList.scss";

const InterviewerList = (props) => {
  console.log(props);
  const { interviewers, setInterviewer } = props;

  const interviewerArr = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={(e) => setInterviewer(interviewer.id)}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerArr}</ul>
    </section>
  );
};

export default InterviewerList;
