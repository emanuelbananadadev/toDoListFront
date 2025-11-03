import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export function Header() {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState("Usuário");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || "Usuário");
    }
  }, []);

  function handleLogout() {
    logout(); // remove token e user do localStorage
    navigate("/login");
  }

  return (
    <header style={headerStyle}>
      <span>👋 Olá, <strong>{userName}</strong></span>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setShowModal(true)}>
          ✏️ Editar Perfil
        </button>

        <button onClick={handleLogout} style={{ background: "darkred", color: "white" }}>
          🚪 Sair
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>
            <h2>Editar usuário</h2>
            <p>(Funcionalidade em desenvolvimento)</p>

            <button onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ----- ESTILOS INTERNOS ----- */

const headerStyle: React.CSSProperties = {
  width: "100%", // ocupa todo o comprimento disponível
  background: "#333",
  padding: "12px 24px",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  boxSizing: "border-box"
};

const overlay: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};

const modal: React.CSSProperties = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  maxWidth: "90%",
  textAlign: "center",
  boxSizing: "border-box"
};
