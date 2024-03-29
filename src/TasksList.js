import { useSelector } from "react-redux";

const TasksList = () => {
  const state = useSelector((state) => state.tasks);

  let taskGroup = state
    ?.reduce((allTasks, task) => {
      const taskIndex = allTasks?.findIndex((el) => {
        return el.name === task.name;
      });

      if (taskIndex === -1) {
        return [...allTasks, task];
      }

      allTasks[taskIndex] = {
        ...allTasks[taskIndex],
        time: allTasks[taskIndex].time + task.time,
      };

      return allTasks;
    }, [])
    ?.sort((a, b) => b.ID - a.ID);

  const totalTime =
    taskGroup?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.time;
    }, 0) || 0;

  return (
    <div style={{ marginTop: "1rem" }}>
      {taskGroup.length > 0 && (
        <span>{`Task ID, Task Name, Task Elapsed Time (number only)`}</span>
      )}
      <ul
        id="tasks"
        style={{ listStyle: "none", paddingLeft: "0", marginTop: "0" }}
      >
        {taskGroup &&
          taskGroup.map((el) => {
            return (
              <li key={el.ID} className="task">
                <span className="id">{el.ID}, </span>
                <span className="name">{el.name}, </span>
                <span className="time">{el.time}</span>
              </li>
            );
          })}
      </ul>
      <div id="total">{totalTime}</div>
    </div>
  );
};

export default TasksList;
