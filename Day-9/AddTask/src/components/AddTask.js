import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";
import './AddTask.css';

const AddTask = () => {
const [task, setTask] = useState({ id: "", name: "", description: "", date: "", createdBy: "" });
const dispatch = useDispatch();
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    navigate("/");
};

return (
    <div className="add-task-form">
    <h2>Add Task</h2>
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Task ID"
        onChange={(e) => setTask({ ...task, id: e.target.value })}
        required
        />
        <input
        type="text"
        placeholder="Task Name"
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        required
        />
        <input
        type="text"
        placeholder="Description"
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        required
        />
        <input
        type="date"
        onChange={(e) => setTask({ ...task, date: e.target.value })}
        required
        />
        <input
        type="text"
        placeholder="Created By"
        onChange={(e) => setTask({ ...task, createdBy: e.target.value })}
        required
        />
        <button type="submit">Add</button>
    </form>
    </div>
);
};

export default AddTask;
