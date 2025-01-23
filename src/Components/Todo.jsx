import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Todo.css";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [addTodo, setAddTodo] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    const handleAddOrUpdate = () => {
        if (!addTodo.trim()) {
            alert("Please add a valid task");
            return;
        }

        if (editIndex !== null) {
            const updatedTodos = todos.map((e, i) =>
                i === editIndex ? addTodo : e
            );
            setTodos(updatedTodos);
            setEditIndex(null);
        } else {
            setTodos([...todos, addTodo]);
        }
        setAddTodo("");
    };

    const deleteTodo = (e) => {
        const updatedTodos = todos.filter((_, i) => i !== e);
        setTodos(updatedTodos);
    };

    const editTodo = (e) => {
        setAddTodo(todos[e]);
        setEditIndex(e);
    };

    const clearTodo = () => {
        setTodos([]);
    };

    return (
        <div className="todo-container">
            <h1 className="title">Todo App</h1>
            <div className="todo-input-group">
                <input
                    value={addTodo}
                    placeholder="Enter your task..."
                    onChange={(e) => setAddTodo(e.target.value)}
                    type="text"
                    className="todo-input"
                />
                <button onClick={handleAddOrUpdate} className="todo-button">
                    {editIndex !== null ? "Update Task" : "Add Task"}
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((e, i) => (
                    <div key={i} className="todo-item-container">
                        <li className="todo-item">{e}</li>
                        <div className="todo-actions">
                            <button
                                onClick={() => editTodo(i)}
                                className="action-button edit-button"
                                title="Edit"
                            >
                                <MdEdit />
                            </button>
                            <button
                                onClick={() => deleteTodo(i)}
                                className="action-button delete-button"
                                title="Delete"
                            >
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
            <div className="todo-footer">
                <p className="task-count">Total Tasks: {todos.length}</p>
                <button onClick={clearTodo} className="clear-button">
                    Clear All
                </button>
            </div>
        </div>
    );
};

export default Todo;
