import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../redux/taskSlice";
import { useParams, useNavigate } from "react-router-dom";

const DeleteTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) => state.tasks.tasks.find((t) => t.id === id));

  const handleDelete = () => {
    dispatch(deleteTask(id));
    navigate("/");
  };

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div>
      <h2>Are you sure you want to delete this task?</h2>
      <p><strong>Task Name:</strong> {task.name}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
};

export default DeleteTask;
