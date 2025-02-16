import React, { useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Todo.css";
import { collection, addDoc, doc, getDocs, deleteDoc, updateDoc } from "firebase/firestore";
import db from "../FirebaseConfig";

const Todo = () => {
    const [refresh, setRefresh] = useState(false);
    const [todos, setTodos] = useState({ todoss: '' });
    const [editId, setEditId] = useState(null);
    const [todosFrmDatabase, setTodosFrmDatabase] = useState([]);

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

    const handleAddOrUpdate = async () => {

        try {
            if (editId) {
                const todoRef = doc(db, "todos", editId);
                await updateDoc(todoRef, { todoss: todos.todoss });
                setEditId(null);
            } else {
                await addDoc(collection(db, "todos"), todos);
            }
            setTodos({ todoss: '' });
            setRefresh(prev => !prev);
        } catch (e) {
            console.error("Error adding/updating document: ", e);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await deleteDoc(doc(db, "todos", id));
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    };

    const editTodo = (id, text) => {
        setTodos({ todoss: text });
        setEditId(id);
    };

    const clearTodo = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "todos"));
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });
            setRefresh(prev => !prev);
        } catch (error) {
            console.error("Error clearing todos:", error);
        }
    };

    return (
        <div className="todo-container">
            <h1 className="title">Todo App</h1>
            <div className="todo-input-group">
                <input
                    value={todos.todoss}
                    placeholder="Enter your task..."
                    onChange={(e) => setTodos({ todoss: e.target.value })}
                    type="text"
                    className="todo-input"
                />
                <button onClick={handleAddOrUpdate} className="todo-button">
                    {editId ? "Update Task" : "Add Task"}
                </button>
            </div>

            <ul className="todo-list">
                {todosFrmDatabase.map((todo) => (
                    <div key={todo.id} className="todo-item-container">
                        <li className="todo-item">{todo.todoss}</li>
                        <div className="todo-actions">
                            <button
                                onClick={() => editTodo(todo.id, todo.todoss)}
                                className="action-button edit-button"
                                title="Edit"
                            >
                                <MdEdit />
                            </button>
                            <button
                                onClick={() => deleteTodo(todo.id)}
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
                <p className="task-count">Total Tasks: {todosFrmDatabase.length}</p>
                <button onClick={clearTodo} className="clear-button">
                    Clear All
                </button>
            </div>
        </div>
    );
};

export default Todo;
