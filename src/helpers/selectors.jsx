import React from "react";

const getAppointmentsForDay = (state, day) => {
  const daysObj = state.days.filter((item) => item.name === day);
  const newArr = [];
  if (daysObj.length > 0) {
    daysObj[0].appointments.map((id) => {
      newArr.push(state.appointments[id]);
    });
  }
  return newArr;
};

export { getAppointmentsForDay };
