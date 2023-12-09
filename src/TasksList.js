import { useSelector } from "react-redux";

const TasksList = () => {
  const state = useSelector((state) => state.tasks);

  let taskGroup = state?.reduce((allTasks, task) => {
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
  }, []);

  const totalTime =
    taskGroup?.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.time;
    }, 0) || 0;

  return (
    <div>
      <ul style={{ listStyle: "none", paddingLeft: "0" }}>
        <li>
          <span>{`Task ID, Task Name, Task Elapsed Time (number only)`}</span>
        </li>
        {taskGroup &&
          taskGroup.reverse().map((el) => {
            return (
              <li key={el.ID} class="task">
                <span class="id">{el.ID}, </span>
                <span class="name">{el.name}, </span>
                <span class="time">{el.time}</span>
              </li>
            );
          })}
      </ul>
      <div id="total">{totalTime}</div>
    </div>
  );
};

export default TasksList;
