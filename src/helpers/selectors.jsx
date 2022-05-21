export const getAppointmentsForDay = (state, day) => {
  const daysObj = state.days.filter((item) => item.name === day);
  const newArr = [];
  if (daysObj.length > 0) {
    daysObj[0].appointments.map((id) => {
      newArr.push(state.appointments[id]);
    });
  }
  return newArr;
};

export const getInterview = (state, interview) => {
  if (!interview) return null;
  const newObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return newObj;
};

export const getInterviewersForDay = (state, day) => {
  const daysObj = state.days.filter((item) => item.name === day);
  const newArr = [];
  if (daysObj.length > 0) {
    daysObj[0].interviewers.map((id) => {
      newArr.push(state.interviewers[id]);
    });
  }
  return newArr;
};
