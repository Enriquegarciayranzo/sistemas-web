import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Layout.css";
import { getEmail, isLoggedIn, logout } from "../store/auth";

export default function Layout() {
  const nav = useNavigate();
  const logged = isLoggedIn();
  const email = getEmail();

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} end>
            Home
          </NavLink>

          <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Cart
          </NavLink>

          <NavLink to="/orders" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            Orders
          </NavLink>

          <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
            {logged ? (
              <>
                <span style={{ color: "white", opacity: 0.9, fontSize: 14 }}>
                  {email}
                </span>
                <button
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.25)",
                    borderRadius: 8,
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    logout();
                    nav("/login");
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  Login
                </NavLink>
                <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}