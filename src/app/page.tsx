"use client";

import React from "react";
import Image from "next/image";
import { FaInstagram, FaTiktok } from "react-icons/fa";

// Importa la fuente Poppins desde Google Fonts
import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: ["500", "600"], subsets: ["latin"] });

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="Logo"
          width={180} // antes 120
          height={180} // antes 120
          style={{ objectFit: "contain" }}
          priority
        />
      </div>

      {/* Título */}
      <h1 className="text-4xl font-cursive text-primary mb-8">
        Bienvenida
      </h1>
      <p className="text-secondary text-center mb-10 max-w-xs">
        Elige tu método de inicio de sesión para continuar
      </p>

      {/* Botones de login */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          className={`flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-full text-lg shadow-md hover:shadow-lg transition ${poppins.className}`}
          onClick={() => (window.location.href = "/vson89yhs9d7ds97fds97")}
        >
          <FaInstagram size={24} />
          Iniciar con Instagram
        </button>

        <button
          className={`flex items-center justify-center gap-3 bg-black text-white py-3 px-4 rounded-full text-lg shadow-md hover:shadow-lg transition ${poppins.className}`}
          onClick={() => (window.location.href = "/asd89ayd9sha8729ads79")}
        >
          <FaTiktok size={24} />
          Iniciar con TikTok
        </button>
      </div>
    </main>
  );
}
