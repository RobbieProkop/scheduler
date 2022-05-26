import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "../styles/InterviewerList.scss";
import PropTypes from "prop-types";

const InterviewerList = (props) => {
  const { interviewers, onChange, value } = props;
  console.log("interviewers", interviewers);
  const interviewerArr = interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === value}
      setInterviewer={() => onChange(interviewer)}
    />
  ));
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerArr}</ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};

export default InterviewerList;
