import { useState } from "react";

export const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newValue, replace) => {
    setMode(newValue);
    setHistory((prev) => [...(replace ? prev.slice(0, -1) : prev), newValue]);
  };

  const back = () => {
    if (history.length <= 1) return;
    setMode(history[history.length - 2]);
    setHistory((prev) => {
      const historyCopy = [...prev];
      historyCopy.pop();
      return historyCopy;
    });
  };

  return { mode, transition, back };
};

// const transition = (newValue, replace) => {
//   setMode(newValue);
// if (replace) {
//   return setHistory((prev) => {
//     const historyCopy = [...prev].slice(0, -1);
//     historyCopy.push(newValue);
//     return historyCopy;
//   });
// }
// setHistory((prev) => [...prev, newValue]);
// };
