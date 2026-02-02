import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // 🔹 Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Add task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await axios.post("/tasks", { title });
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Add Error:", err);
    }
  };

  // 🔹 Toggle complete
  const toggleTask = async (id) => {
    try {
      const res = await axios.put(`/tasks/${id}`);
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
    } catch (err) {
      console.error("Toggle Error:", err);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Task Manager</h1>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addBtn}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              ...styles.task,
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            <span
              onClick={() => toggleTask(task._id)}
              style={{ cursor: "pointer" }}
            >
              {task.title}
            </span>

            <button
              style={styles.deleteBtn}
              onClick={() => deleteTask(task._id)}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
  },
  inputBox: {
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    width: "200px",
    marginRight: "10px",
  },
  addBtn: {
    padding: "8px 12px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  task: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    gap: "15px",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 8px",
    cursor: "pointer",
  },
};

export default App;