import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../redux/taskSlice";

const Home = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <div className="container">
      <h2>Task List</h2>
      <Link to="/add-task" className="add-task-btn">➕ Add New Task</Link>

      {tasks.length === 0 ? (
        <p>Add a new task!</p>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.date}</td>
                <td>{task.createdBy}</td>
                <td>
                  <Link to={`/edit-task/${task.id}`} className="edit-btn">✏️ Edit</Link> |{" "}
                  <button onClick={() => handleDelete(task.id)} className="delete-btn">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
