import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), done: false },
      ]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDoneTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleEditTodo = (id, text) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const handleArchiveTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    setArchivedTodos([
      ...archivedTodos,
      todos.find((todo) => todo.id === id),
    ]);
  };

  const [archivedTodos, setArchivedTodos] = useState([]);

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="Add a new task..."
        />
        <button type="submit">Add To List</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={handleDeleteTodo}
            onDone={handleDoneTodo}
            onEdit={handleEditTodo}
            onArchive={handleArchiveTodo}
          />
        ))}
      </ul>
      <h2>Archived List</h2>
      <ul>
        {archivedTodos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onDelete, onDone, onEdit, onArchive }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState('');

  const handleDoneClick = () => {
    onDone(todo.id);
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  const handleEditClick = () => {
    setEditing(true);
    setNewText(todo.text);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleSaveClick = () => {
    onEdit(todo.id, newText);
    setEditing(false);
  };

  const handleArchiveClick = () => {
    onArchive(todo.id);
  };

  return (
    <li className={todo.done ? 'done' : ''}>
      {editing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(event) => setNewText(event.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
    </>
  ) : (
    <>
      <span>{todo.text}</span>
      <div className="actions">
        <button onClick={handleDoneClick}>Done</button>
        <button onClick={handleEditClick}>Edit</button>
        <button onClick={handleArchiveClick}>Archive</button>
        <button onClick={handleDeleteClick}>Delete</button>
      </div>
    </>
  )}
</li>
);
}

export default App;