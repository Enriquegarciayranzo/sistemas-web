import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import { setAuth } from "../store/auth";
import { loadCart } from "../store/cart";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div style={{ padding: 20, maxWidth: 420, margin: "0 auto" }}>
      <h1>Login</h1>

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
              const r = await login(email, password);
              setAuth(r.access_token, email);
              await loadCart();
              nav("/");
            } catch (e: any) {
              setError("Login failed");
            }
          }}
        >
          Login
        </button>

        <p style={{ marginTop: 8 }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}