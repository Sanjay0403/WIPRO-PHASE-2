import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/actions";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <li>
      {task.text}
      <button onClick={() => dispatch(deleteTask(task.id))} style={{ background: "red" }}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
