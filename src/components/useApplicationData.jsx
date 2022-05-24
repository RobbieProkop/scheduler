// need to bring in:
// State
// setDay
// bookInterview
// cancelInterview
import axios from "axios";
import React, { useState, useEffect } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //count null interviews on a specific day using the appointment key
  // need to change the appointments in the day obj

  const countSpots = (state) => {
    //finding the current
    const currentDay = state.days.find((day) => day.name === state.day);
    //appointments
    const aptId = currentDay.appointments;

    const spots = aptId.filter(
      (id) => !state.appointments[id].interview
    ).length;
    console.log("spots", spots);

    return spots;
  };

  const updateSpots = (state) => {
    //create a copy of the current state
    const updatedState = { ...state };
    //create a copy of the current state.days in order to find each day. THIS IS AN ARRAY!
    const updatedDays = [...state.days];
    //match the day with the state day
    const updatedDay = { ...state.days.find((day) => day.name === state.day) };
    //the spots from countSpots
    const spots = countSpots(state);
    //set the spots of a specific day to the spots set in countSpots
    updatedDay.spots = spots;

    //find the index of each day
    const updatedDayIndex = state.days.findIndex(
      (day) => day.name === state.day
    );

    //new days array with updated day
    updatedDays[updatedDayIndex] = updatedDay;

    updatedState.days = updatedDays;
    // console.log("updated days", updatedDays);

    return updatedState;
  };

  //Book an Interview

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const newState = updateSpots({ ...state, appointments });
      setState({
        ...newState,
      });
    });
  };

  //Delete an interview

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const newState = updateSpots({ ...state, appointments });
      setState({
        ...newState,
      });
    });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((error) => console.log(error));
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    countSpots,
    updateSpots,
  };
};

export default useApplicationData;
