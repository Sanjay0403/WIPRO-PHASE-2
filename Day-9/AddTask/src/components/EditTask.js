import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../redux/taskSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingTask = useSelector((state) => state.tasks.tasks.find((task) => task.id === id));

  const [task, setTask] = useState(existingTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask(task));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={task.name} onChange={(e) => setTask({ ...task, name: e.target.value })} required />
      <input type="text" value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} required />
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
