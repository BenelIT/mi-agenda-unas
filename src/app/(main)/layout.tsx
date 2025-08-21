// src/app/(main)/layout.tsx

"use client";

import Link from "next/link";
import { CalendarDays, PlusCircle } from "lucide-react";

const brandColor = "#f4b2b7";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenido principal con espacio para el nav */}
      <div className="flex-1 pb-20">{children}</div>

      {/* Barra de navegación inferior */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-2 shadow-lg rounded-t-2xl">
        <Link
          href="/citas"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-primary transition-colors"
        >
          <CalendarDays
            className="w-6 h-6 mb-1 transition-colors"
            color={brandColor}
          />
          Citas
        </Link>
        <Link
          href="/nueva-cita"
          className="flex flex-col items-center text-xs text-gray-600 hover:text-primary transition-colors"
        >
          <PlusCircle
            className="w-6 h-6 mb-1 transition-colors"
            color={brandColor}
          />
          Nueva
        </Link>
      </nav>

      <style jsx>{`
        nav a:hover {
          color: ${brandColor};
        }
        nav a:hover svg {
          stroke: ${brandColor};
          fill: ${brandColor};
        }
      `}</style>
    </div>
  );
}
