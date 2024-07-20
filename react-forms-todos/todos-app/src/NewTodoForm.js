import React, { useState } from 'react';

function NewTodoForm({ createTodo }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo({ id: Date.now(), task });
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">New Todo:</label>
      <input
        type="text"
        id="task"
        name="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default NewTodoForm;