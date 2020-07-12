/***    a React To-Do App with functional component and React-Hooks   ***/
import React, { useState, useEffect } from 'react';
import './App.css';
import './Rwd.css';
import { MdDone, MdDeleteForever } from 'react-icons/md';
import { Helmet } from 'react-helmet'; // a library that allows setting elements inside the <head> tag


function TodoList({ todo, index, complete, remove }) {
  return (
    // div-todo-text show the “text” part of the todo => {todo.text} 
    <div className="todo">
      <div className="todo-text"

        // give the textDecoration styling and cross-out the item when button is clicked
        style={{
          textDecoration: todo.isCompleted ? "line-through" : "",
          color: todo.isCompleted ? "green" : "#61DAFB"
        }}>
        {todo.text}
      </div>
      {!todo.isCompleted ?
        <button className="done" onClick={() => complete(index)}><MdDone /></button> : <MdDone className="checked" />}
      <button className="delete" onClick={() => remove(index)}><MdDeleteForever /></button>
    </div>
  );
}

function Form({ addTodo }) {
  // set empty state for the Form-Input
  const [value, updateValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault(); // prevent page reload

    if (!value) return; // abort if no value
    addTodo(value);
    updateValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-input"
        placeholder="Add item(max 15 chars)"
        minLength={1}
        maxLength={15}
        value={value}
        onChange={e => updateValue(e.target.value)} />
      <input type="submit"
        className="add"
        value="+" />
    </form>
  );
}

function App() {

  // Add some items to beginning-state.
  const [todos, updateTodos] = useState([
    { text: "My Todo-list", isCompleted: false },
    { text: "My React-app", isCompleted: false },
    { text: "Keep it simple", isCompleted: false }
  ]);

  // persist state to LocalStorage
  // get all todos after loading the page
  useEffect(() => {
    const data = localStorage.getItem("avvys-todo-list");
    if (data) {
      updateTodos(JSON.parse(data));
    }
  }, []);

  // save all todos in localStorage
  useEffect(() => {
    localStorage.setItem("avvys-todo-list", JSON.stringify(todos));
  }, [todos]);

  // grab the existing list of items, add on the new item, and display that new list.
  const newTodo = text => {
    const newTodos = [...todos, { text }];
    updateTodos(newTodos);
  }

  // changing the isCompleted status to true
  const complete = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    updateTodos(newTodos);
  };

  // grab the current list and splice the chosen index off of the array of items
  const remove = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    updateTodos(newTodos);
  };

  return (
    <div className="App">
      <header>
        <h1 className="title">Avvys To-Do App</h1>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Avvys To-Do App</title>
        </Helmet>
      </header>
      <main className="todo-list">
        <Form addTodo={newTodo} />
        {todos.map((todo, index) => (
          // JavaScript method, map() => create a new array of items
          <TodoList
            key={index}
            index={index}
            todo={todo}
            complete={complete}
            remove={remove}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
