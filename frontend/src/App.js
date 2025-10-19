
import React, { useState } from "react";
import axios from "axios";

const skills = ["Java", "React", "JavaScript", "AI", "RAG"];

function App() {
  const [skill, setSkill] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    if (!skill) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/ai/recommend",
        {
          skill: skill.toLowerCase(),
        }
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      alert("Failed to fetch questions");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>AI Interview Question Recommender</h1>

        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          style={styles.select}
        >
          <option value="">Select a topic</option>
          {skills.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button style={styles.button} onClick={fetchQuestions}>
          {loading ? "Loading..." : "Get Questions"}
        </button>

        <div style={{ marginTop: "20px" }}>
          {questions.length > 0 && (
            <ul style={styles.list}>
              {questions.map((q, index) => (
                <li key={index} style={styles.listItem}>
                  {q}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// Inline styles (for simplicity)
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "400px",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  select: {
    padding: "10px",
    width: "80%",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#667eea",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  list: {
    textAlign: "left",
    paddingLeft: "0",
  },
  listItem: {
    marginBottom: "10px",
    background: "#f4f4f4",
    padding: "10px",
    borderRadius: "6px",
  },
};

export default App;
