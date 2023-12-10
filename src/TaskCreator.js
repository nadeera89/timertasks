import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addingTask } from "./reducers/reducers";

const TaskCreator = () => {
  const [timer, setTimer] = useState(0);
  const [taskName, setTaskName] = useState("");
  const ref = useRef(null);

  const state = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const startTimer = () => {
    if (ref.current) clearInterval(ref.current);

    ref.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timer) {
      dispatch(
        addingTask({
          ID: state.length + 1,
          name: taskName,
          time: timer,
        })
      );
    }

    if (ref.current) clearInterval(ref.current);

    setTimer(0);
    setTaskName("");
  };

  const pauseTimer = () => {
    if (ref.current) {
      clearInterval(ref.current);
      ref.current = 0;
    }
  };

  const resumeTimer = () => {
    if (!ref.current)
      ref.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
  };

  return (
    <div>
      <span>Task name</span>
      <input
        id="taskName"
        type="text"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
        }}
      ></input>
      <span>Time elapsed</span>
      <input
        id="timeField"
        type="text"
        value={timer}
        onFocus={() => {
          pauseTimer();
        }}
        onBlur={() => {
          resumeTimer();
        }}
        onChange={(e) => {
          setTimer(parseInt(e.target.value));
        }}
      ></input>
      <button id="start" onClick={() => startTimer()}>
        START
      </button>
      <button id="stop" onClick={() => stopTimer()}>
        STOP
      </button>
    </div>
  );
};

export default TaskCreator;
