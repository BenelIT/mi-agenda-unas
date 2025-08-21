"use client";

import React, { useState } from "react";
import Image from "next/image";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/src/shared/types.js";

const horasDisponibles = [
  "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00",
  "19:00", "20:00",
];

export default function AgendarPage() {
  const [fecha, setFecha] = useState<Date | null>(new Date());
  const [hora, setHora] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // 🔒 Rango bloqueado
  const year = new Date().getFullYear();
  const inicioBloqueo = new Date(year, 7, 21); // 21 agosto
  const finBloqueo = new Date(year, 8, 10);    // 10 septiembre

  const esBloqueada = (date: Date) => {
    return date >= inicioBloqueo && date <= finBloqueo;
  };

  const handleAgendar = async () => {
    if (!fecha || !hora) return;

    setLoading(true);
    setMensaje(null);

    try {
      const usuario_texto_id = 1;
      const fechaISO = fecha.toISOString().split("T")[0];

      const res = await fetch("https://backend-simple-7fdv.onrender.com/agenda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario_texto_id,
          fecha: fechaISO,
          hora,
        }),
      });

      if (!res.ok) throw new Error("Error al agendar cita");

      const data = await res.json();
      setMensaje(`✅ Cita agendada con éxito para el ${data.fecha} a las ${data.hora}`);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Hubo un error al agendar la cita.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 overflow-y-auto">
      {/* Header */}
      <header className="mb-6">
        <div className="flex justify-start">
          <div className="w-24 h-24 relative">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>
        <h1
          className="mt-2 text-4xl text-center"
          style={{ fontFamily: "var(--font-cursive)", color: "var(--color-rosa)" }}
        >
          Agendar Cita
        </h1>
      </header>

      {/* Calendario */}
      <section className="mb-1">
        <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--color-rosa)" }}>
          Selecciona una fecha
        </h2>
        <div className="transform scale-85 origin-top-left">
          <Calendar
            onChange={(value: Value) => setFecha(value as Date)}
            value={fecha}
            minDate={new Date()}
            locale="es-MX"
            className="rounded-lg border"
            calendarType="gregory"
            tileDisabled={({ date, view }) => view === "month" && esBloqueada(date)}
            tileClassName={({ date, view }) => {
              if (view !== "month") return "";

              // Bloqueadas -> números rojos
              if (esBloqueada(date)) {
                return "text-red-600 font-semibold cursor-not-allowed";
              }

              // Seleccionada -> número verde
              if (fecha && date.toDateString() === fecha.toDateString()) {
                return "text-green-600 font-bold";
              }

              return "";
            }}
          />
        </div>
      </section>

      {/* Selector de hora */}
      <section className="mb-2 -mt-2">
        <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--color-rosa)" }}>
          Selecciona una hora
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {horasDisponibles.map((h) => (
            <button
              key={h}
              onClick={() => setHora(h)}
              style={{
                backgroundColor: hora === h ? "var(--color-rosa)" : "#eeeeee",
                color: hora === h ? "#ffffff" : "var(--color-texto-secundario)",
              }}
              className="py-2 rounded-full text-sm font-medium transition hover:bg-[var(--color-rosa-oscuro)]"
            >
              {h}
            </button>
          ))}
        </div>
      </section>

      {/* Botón confirmar */}
      <button
        type="button"
        disabled={!fecha || !hora || loading}
        className="w-full py-3 rounded-full text-sm"
        style={{
          backgroundColor: "var(--color-rosa)",
          color: "#ffffff",
          opacity: loading ? 0.7 : 1,
        }}
        onClick={handleAgendar}
      >
        {loading ? "Agendando..." : "Confirmar Cita"}
      </button>

      {/* Mensaje de confirmación o error */}
      {mensaje && (
        <p className="mt-3 text-center text-sm" style={{ color: "var(--color-texto-secundario)" }}>
          {mensaje}
        </p>
      )}
    </main>
  );
}
