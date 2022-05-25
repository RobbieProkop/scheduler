import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  test("render without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    // getByPlaceholderText("Enter Student Name");
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  //can use it or test
  test("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    //should keep selectors consistent, but just to show different options, here is a different one
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  test("validates that the student name is not blank", () => {
    //create mock onSave function
    const onSave = jest.fn();
    //render the form with interviewers, student, onSave
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    //click the save button
    fireEvent.click(getByText("Save"));
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  test("validates that the interviewer cannot be null", () => {
    const onSave = jest.fn();
    const { getByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
        onSave={onSave}
      />
    );
    fireEvent.click(getByText("Save"));

    /* 3. validation is shown */
    expect(getByText(/please select an interviewer/i)).toBeInTheDocument();

    /* 4. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  test("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        interviewer={interviewers[0]}
        onSave={onSave}
      />
    );

    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByText("Save"));

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewers[0]);
  });

  // test("calls onSave function when the name is defined", () => {
  //   const onSave = jest.fn();
  //   const { getByText, queryByText } = render(
  //     <Form
  //       interviewers={interviewers}
  //       interviewer={interviewers[0].id}
  //       student="Lydia Miller-Jones"
  //       onSave={onSave}
  //     />
  //   );
  //   fireEvent.click(getByText("Save"));

  //   /* 5. validation is not shown */
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  //   expect(queryByText(/please select an interviewer/i)).toBeNull();

  //   /* 6. onSave is called once*/
  //   expect(onSave).toHaveBeenCalledTimes(1);

  //   /* 7. onSave is called with the correct arguments */
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", 1);
  // });

  // test("submits the name entered by the user", () => {
  //   const onSave = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form
  //       interviewers={interviewers}
  //       interviewer={interviewers[0]}
  //       onSave={onSave}
  //     />
  //   );

  //   const input = getByPlaceholderText("Enter Student Name");

  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  //   fireEvent.click(getByText("Save"));

  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", interviewers[0]);
  // });
});
