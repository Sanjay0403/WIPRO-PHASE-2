import { useDispatch } from "react-redux";
import { addTask } from "../redux/actions";
import { useState } from "react";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter a task..."
      />
      <button onClick={() => dispatch(addTask(taskText))}>Add Task</button>
      <TaskList />
    </div>
  );
};

export default Dashboard;
