import React from "react";
import "../styles/DayListItem.scss";
import classNames from "classnames";

const formatSpots = (spots) => {
  if (spots === 1) {
    return `1 spot`;
  }
  return `${spots > 1 ? spots : "no"} spots`;
};

const DayListItem = (props) => {
  const { name, selected, spots, setDay } = props;
  const dayClass = classNames(
    "day-list__item",
    { "day-list__item--selected": selected },
    { "day-list__item--full": spots === 0 }
  );

  return (
    <li
      className={dayClass}
      data-testid="day"
      onClick={() => setDay(name)}
      selected={selected}
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)} remaining</h3>
    </li>
  );
};

export default DayListItem;
