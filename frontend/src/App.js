import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await axios.post('http://localhost:5000/tasks', { title });
    setTitle("");
    fetchTasks();
  };

const deleteTask = async (id) => {
  console.log("DELETE CLICKED" , id);
  try {
    await axios.delete('http:localhost:5000/tasks/${id}');
    fetchTasks();
  } catch (err) {
    console.log(err);
  }
};
const toggleTask = async (id) => {
  await axios.put('http:localhost:5000/tasks/${id}');
  fetchTasks();
};

  useEffect(() => {
    fetchTasks();
  }, []);
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
        onClick={(e) => {e.stopPropagation();
          deleteTask(task._id);
        }}
      >
        ❌
      </button>
    </li>
  ))}
</ul>
 return (
  <div style={styles.container}>
    <h1 style={styles.title}>Task Manager</h1>

    <div style={styles.inputBox}>
      <input
        style={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button style={styles.addBtn} onClick={addTask}>Add</button>
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
    width: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  title: { marginBottom: "20px" },
  inputBox: { display: "flex", gap: "10px" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addBtn: {
    padding: "10px 15px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  list: { marginTop: "20px", listStyle: "none", padding: 0 },
  task: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#f4f4f4",
    marginBottom: "8px",
    borderRadius: "5px",
  },
  deleteBtn: {
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
export default App;
