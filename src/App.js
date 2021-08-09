import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoItem = ({todo, index, completeTodo, removeTodo}) => {
  return (
    <Card>
      <Card.Body>
        <div className="todo">
          <span style={{ textDecoration : todo.isDone ? "line-through" : ""}}>{todo.text}</span>
          <div>
            <Button variant={ todo.isDone ? "outline-warning" : "outline-success"} onClick={() => completeTodo(index)}>
              { todo.isDone ? "Mark As Not Completed" : "Mark As Completed"}
            </Button>
            {' '}
            <Button variant="outline-danger" onClick={() => removeTodo(index)}>
              Remove
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const NewTodoForm = ({ addTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const newTodo = () => {
    console.log("newTodo : " + inputValue);
    if (!inputValue) {
      return;
    }
    addTodo(inputValue);
    setInputValue("");
  };

  return (
      <div className="new-todo">
        <input type="text"
          className="todo-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new Todo here" />
        <div>
          <Button onClick={() => newTodo()}>
            Add
          </Button>
        </div>
      </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState([
  ]);

  const addTodo = (text) => {
    const newTodo = {
      text: text,
      isDone: false,
    };
    const updatedTodos = [...todos, newTodo];
    console.log(updatedTodos);
    setTodos(updatedTodos);
  };

  const completeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isDone = !updatedTodos[index].isDone;
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <NewTodoForm addTodo={addTodo}></NewTodoForm>
        <div>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              index={index}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
