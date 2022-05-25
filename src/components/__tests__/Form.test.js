import React from "react";

import { render, cleanup, getByPlaceholderText } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];
  test("render without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form />);
    // getByPlaceholderText("Enter Student Name");
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  //can use it or test
  it("renders with initial student name", () => {
    //should keep selectors consistent, but just to show different options, here is a different one
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  // test("", () => {});
});
