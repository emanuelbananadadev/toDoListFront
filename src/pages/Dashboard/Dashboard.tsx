import { Link } from "react-router-dom";
import styles from "./dashboard.module.css";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { createTask, listTasks, deleteTask, updateTask, type Task } from "../../services/taskService";

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);

  // Campos do modal
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [type, setType] = useState<"TRABALHO" | "PROVA" | "REUNIAO" | "APRESENTACAO">("TRABALHO");
  const [icon, setIcon] = useState("📌");
  const [notes, setNotes] = useState("");

  async function fetchTasks() {
    setLoading(true);
    try {
      const data = await listTasks(1, 10);
      setTasks(data.tasks);
      setError(null);
    } catch (error) {
      setError((error as Error).message || "Erro ao buscar tarefas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleCreate() {
    await createTask({
      title,
      dueDate,
      type,
      icon,
      notes,
      completed: false,
      hasReminder: false,
      reminderTime: null
    });

    setShowModal(false);
    fetchTasks();
  }

  async function handleDelete(id: string) {
    await deleteTask(id);
    fetchTasks();
  }

  async function toggleComplete(task: Task) {
    await updateTask(task.id, { completed: !task.completed });
    fetchTasks();
  }

  if (loading) {
    return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Carregando Tarefas...</h1>;
  }

  if (error) {
    return <h1 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>Erro: {error}</h1>;
  }

  return (
    <div style={{ padding: "20px" }}>
        <Header/>
        
      <h1>Minhas tarefas (Total: {tasks.length})</h1>

      <button onClick={() => setShowModal(true)} style={{ marginBottom: "20px" }}>
        + Criar Task
      </button>

      {tasks.length === 0 ? (
        <p>Nenhuma tarefa encontrada. Que tal criar uma?</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                textDecoration: task.completed ? "line-through" : "none",
                borderRadius: "5px",
                marginBottom: "6px",
              }}
            >
              <span>{task.icon} {task.title} - {new Date(task.dueDate).toLocaleDateString("pt-BR")}</span>

              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => toggleComplete(task)}>
                  {task.completed ? "↩️ Desmarcar" : "✅ Concluir"}
                </button>

                <button onClick={() => handleDelete(task.id)} style={{ background: "darkred", color: "white" }}>
                  🗑️ Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.changePassword}>
        <Link to={"/profile/change-password"}>Redefinição de senha</Link>
      </p>

      {/* MODAL ---------------------------------------------------- */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalStyle}>
            <h2>Criar nova tarefa</h2>

            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputStyle}
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={inputStyle}
            />

            <select value={type} onChange={(e) => setType(e.target.value as any)} style={inputStyle}>
              <option value="TRABALHO">Trabalho</option>
              <option value="PROVA">Prova</option>
              <option value="REUNIAO">Reunião</option>
              <option value="APRESENTACAO">Apresentação</option>
            </select>

            <input
              placeholder="Ícone (emoji)"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              style={inputStyle}
            />

            <textarea
              placeholder="Notas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={inputStyle}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleCreate}>Criar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Estilos internos ----------------------------------------- */
const modalOverlay: React.CSSProperties = {
  position: "fixed",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalStyle: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "8px"
};

const inputStyle: React.CSSProperties = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #aaa"
};
