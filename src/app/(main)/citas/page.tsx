// src/app/(main)/citas/page.tsx

"use client";

import React, { useEffect, useState } from "react";

// ===== Tipos =====
export type EstadoCita = "pendiente"; // solo pendiente por defecto

export interface Cita {
  id: string;
  fecha: string; // YYYY-MM-DD
  hora: string; // HH:MM
  estado: EstadoCita;
}

// ===== Config estilos por estado =====
const estadoStyles: Record<EstadoCita, string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
};

// ===== Utilidad formato fecha =====
function formatFecha(fecha: string, hora: string) {
  if (!fecha || !hora) return "Fecha inválida";

  const [yearStr, monthStr, dayStr] = fecha.split("-");
  const [hourStr, minuteStr, secondStr] = hora.split(":");

  const year = Number(yearStr);
  const month = Number(monthStr) - 1; // JS: enero = 0
  const day = Number(dayStr);
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const second = Number(secondStr || "0");

  if ([year, month, day, hour, minute, second].some(isNaN)) return "Fecha inválida";

  const dt = new Date(year, month, day, hour, minute, second);

  if (isNaN(dt.getTime())) return "Fecha inválida";

  return new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dt);
}

export default function CitasPage() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await fetch("https://backend-simple-7fdv.onrender.com/agenda");
        const data = await res.json();

        // Mapear los datos para que tengan estado "pendiente"
        interface CitaApi {
          id: number | string;
          fecha: string;
          hora: string;
        }

        const citasFormateadas: Cita[] = data.map((cita: CitaApi) => ({
          id: cita.id.toString(),
          fecha: cita.fecha.split("T")[0],
          hora: cita.hora,
          estado: "pendiente",
        }));
        setCitas(citasFormateadas);
        setLoading(false);
      } catch (error) {
        console.error("Error cargando las citas:", error);
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  return (
    <main className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="mt-6 text-4xl font-cursive text-primary">Mis Citas</h1>
      </header>

      {/* Lista de citas */}
      {loading ? (
        <p className="text-center text-secondary">Cargando citas...</p>
      ) : citas.length === 0 ? (
        <p className="text-center text-secondary">No tienes citas agendadas.</p>
      ) : (
        <ul className="space-y-5" role="list">
          {citas.map((cita) => (
            <li
              key={cita.id}
              className="p-5 border border-borde rounded-xl shadow-sm hover:shadow-lg transition"
              role="article"
              aria-label={`Cita programada`}
            >
              <div className="flex justify-between items-center mb-2">
                <span>MogaSpa</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${estadoStyles[cita.estado]}`}
                >
                  {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                </span>
              </div>
              <time
                className="text-secondary text-sm mt-1 block"
                dateTime={`${cita.fecha}T${cita.hora}`}
              >
                {formatFecha(cita.fecha, cita.hora)}
              </time>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
