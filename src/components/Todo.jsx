import React from "react";
import TodoItem from "./TodoItem";
import "./Todo.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          value: "Learn React",
          isDone: false,
          isEditing: false, // New state to handle editing
        },
        {
          id: 2,
          value: "Learn JS",
          isDone: false,
          isEditing: false, // New state to handle editing
        },
      ],
      currentInput: "",
      error: "",
    };
  }

  handleOnInputChange = (e) => {
    this.setState({ currentInput: e.target.value });
  };

  handleOnButtonClick = () => {
    const { currentInput, todos } = this.state;

    if (currentInput.trim() !== "") {
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

      const newTodo = {
        id: newId,
        value: currentInput,
        isDone: false,
        isEditing: false, // New task is not in editing mode
      };

      const isExistingTodo = todos.some((todo) => todo.value === newTodo.value);

      if (!isExistingTodo) {
        this.setState((prevState) => ({
          todos: [...prevState.todos, newTodo],
          currentInput: "",
          error: "",
        }));
      } else {
        this.setState({ error: "Task already exists!" });
      }
    } else {
      this.setState({ error: "Task cannot be empty!" });
    }
  };

  handleOnDelete = (id) => {
    const newTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({ todos: newTodos });
  };

  handleDoneToggle = (id) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    this.setState({ todos: updatedTodos });
  };

  handleEditToggle = (id) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    this.setState({ todos: updatedTodos });
  };

  handleEditSave = (id, newValue) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, value: newValue, isEditing: false } : todo
    );
    this.setState({ todos: updatedTodos });
  };

  moveTaskUp = (id) => {
    const index = this.state.todos.findIndex((todo) => todo.id === id);
    if (index > 0) {
      const updatedTodos = [...this.state.todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index - 1];
      updatedTodos[index - 1] = temp;
      this.setState({ todos: updatedTodos });
    }
  };

  moveTaskDown = (id) => {
    const index = this.state.todos.findIndex((todo) => todo.id === id);
    if (index < this.state.todos.length - 1) {
      const updatedTodos = [...this.state.todos];
      const temp = updatedTodos[index];
      updatedTodos[index] = updatedTodos[index + 1];
      updatedTodos[index + 1] = temp;
      this.setState({ todos: updatedTodos });
    }
  };

  render() {
    return (
      <div>
        <div>
          <h1>Input here</h1>
          <input
            placeholder="Input task"
            onChange={this.handleOnInputChange}
            value={this.state.currentInput}
          />
          <button onClick={this.handleOnButtonClick}>
            Add task to todo list
          </button>
          <span style={{ color: "red" }}>{this.state.error}</span>
        </div>

        <div>
          <label>List of tasks:</label>
          <ul>
            {this.state.todos.map(({ id, value, isDone, isEditing }) => (
              <div key={id}>
                {isEditing ? (
                  <input
                    placeholder={value}
                    onBlur={(e) => this.handleEditSave(id, e.target.value)}
                    autoFocus
                  />
                ) : (
                  <TodoItem onClick={() => this.handleEditToggle(id)}>
                    {isDone ? <strike>{value}</strike> : value}
                  </TodoItem>
                )}
                <button onClick={() => this.handleOnDelete(id)}>
                  Delete task
                </button>
                <button onClick={() => this.handleEditToggle(id)}>
                  {isEditing ? "Cancel" : "Edit task"}
                </button>
                <button onClick={() => this.handleDoneToggle(id)}>
                  {isDone ? "Mark as not done" : "Mark as done"}
                </button>
                <button onClick={() => this.moveTaskUp(id)}>Move Up</button>
                <button onClick={() => this.moveTaskDown(id)}>Move Down</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export { Todo };
