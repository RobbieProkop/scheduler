import React from "react";
import "../styles/InterviewerListItem.scss";
import classNames from "classnames";

const InterviewerListItem = (props) => {
  const { id, name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li
      selected={selected}
      onClick={() => setInterviewer(id)}
      className={interviewerClass}
    >
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
