import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div style={{ padding: 20, maxWidth: 420, margin: "0 auto" }}>
      <h1>Register</h1>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div style={{ display: "grid", gap: 10 }}>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            padding: "10px 14px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
          onClick={async () => {
            try {
              setError("");
              await register(email, password);
              nav("/login");
            } catch (e: any) {
              setError("Register failed");
            }
          }}
        >
          Create account
        </button>

        <p style={{ marginTop: 8 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}