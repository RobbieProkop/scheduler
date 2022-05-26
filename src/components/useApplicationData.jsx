import axios from "axios";
import { useState, useEffect } from "react";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //count null interviews on a specific day using the appointment key
  //dynamically update the spots remaining in the sidebar
  const updateSpots = (state, appointments) => {
    const dayObj = state.days.find((day) => day.name === state.day);
    const spots = dayObj.appointments.filter(
      (id) => !appointments[id].interview
    ).length;
    const days = state.days.map((d) =>
      d.name === state.day ? { ...dayObj, spots } : d
    );
    return days;
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
      const days = updateSpots({ ...state }, appointments);
      setState({
        ...state,
        days,
        appointments,
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
      const days = updateSpots({ ...state }, appointments);
      setState({
        ...state,
        days,
        appointments,
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
    updateSpots,
  };
};

export default useApplicationData;
