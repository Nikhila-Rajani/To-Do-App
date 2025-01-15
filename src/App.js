import React, { useState, useRef } from "react";
import './App.css'; // Import the CSS file

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const totalTodosRef = useRef(0);

  // Add or edit todo
  const handleAddOrEdit = () => {
    if (input.trim() === "") {
      alert("Todo cannot be empty!");
      return;
    }

    if (todos.some((todo) => todo.text === input.trim() && todo.id !== editId)) {
      alert("Todo already exists!");
      return;
    }

    if (editId) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: input, completed: false },
      ]);
    }

    setInput("");
    totalTodosRef.current++;
  };

  // Mark todo as completed
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    totalTodosRef.current--;
  };

  // Set todo for editing
  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInput(todoToEdit.text);
    setEditId(id);
  };

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your task"
        />
        <button onClick={handleAddOrEdit}>
          {editId ? "Update Todo" : "Add Todo"}
        </button>
      </div>
      <h3>Total Todos: {totalTodosRef.current}</h3>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              className={`todo-text ${
                todo.completed ? "completed" : ""
              }`}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => handleEdit(todo.id)} className="edit-btn">
              Edit
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
