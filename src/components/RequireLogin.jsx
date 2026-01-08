<<<<<<< HEAD
import React, { useState } from "react";
=======
ï»¿import React, { useState } from "react";
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

export default function RequireLogin({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (user === "admin" && pass === "password123") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid login.");
    }
  }

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 2px 16px rgba(203,53,107,0.11)",
          maxWidth: 320,
          margin: "80px auto",
        }}
      >
        <form onSubmit={handleLogin} style={{ width: "92%" }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: "1.09rem",
              marginBottom: 18,
              color: "#cb356b",
            }}
          >
            Login Required
          </div>
          <input
            type="text"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 12,
              padding: "8px 12px",
              borderRadius: 7,
              border: "1.5px solid #ddd",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 12,
              padding: "8px 12px",
              borderRadius: 7,
              border: "1.5px solid #ddd",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#cb356b",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              fontWeight: 700,
              fontSize: "1.03rem",
              padding: "8px 0",
              marginBottom: 12,
            }}
          >
            Login
          </button>
          {error && (
            <div style={{ color: "#c62828", fontSize: ".97rem" }}>{error}</div>
          )}
        </form>
      </div>
    );
  }

  return children;
}
<<<<<<< HEAD
=======

>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75

