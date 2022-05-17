import React from "react";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = "button";
  props.confirm
    ? (buttonClass += " button--confirm")
    : (buttonClass = "button");

  return <button className={buttonClass}>{props.children}</button>;
}
