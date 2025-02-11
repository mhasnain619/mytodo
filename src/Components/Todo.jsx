import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Todo.css";
import { collection, addDoc, doc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

import db from "../FirebaseConfig";

const Todo = () => {
    const [refresh, setRefresh] = useState(false)
    const [todos, setTodos] = useState({ todoss: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [todosFrmDatabase, setTodosFrmDatabase] = useState([])

    const handleAddOrUpdate = async () => {
        try {
            const docRef = await addDoc(collection(db, "todos"), todos);
            setTodos({ todoss: '' })
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    useEffect(() => {
        const getTodos = async () => {
            const querySnapshot = await getDocs(collection(db, "todos"));
            const todosList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                todoss: doc.data().todoss
            }));
            setTodosFrmDatabase(todosList);
        };
        getTodos();
    }, [refresh]);
    console.log(todosFrmDatabase);

    const deleteStudent = async (id) => {
        try {
            await deleteDoc(doc(db, "todos", id));
            setTodosFrmDatabase(prevTodos => prevTodos.filter(todo => todo.id !== id));
            setRefresh(!refresh)
        } catch (error) {
            console.error("Error deleting document:", error);
        }
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
                    value={todos.todoss}
                    placeholder="Enter your task..."
                    onChange={(e) => setTodos({ ...todos, todoss: e.target.value })}
                    type="text"
                    className="todo-input"
                />
                <button onClick={handleAddOrUpdate} className="todo-button">
                    {editIndex !== null ? "Update Task" : "Add Task"}
                </button>
            </div>

            <ul className="todo-list">
                {todosFrmDatabase.map((e, i) => (
                    <div key={i} className="todo-item-container">
                        <li className="todo-item">{e.todoss}</li>
                        <div className="todo-actions">
                            <button
                                onClick={() => editTodo(i)}
                                className="action-button edit-button"
                                title="Edit"
                            >
                                <MdEdit />
                            </button>
                            <button
                                onClick={() => deleteStudent(e.id)}
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
