import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gestión Clínica | FuenteJuv",
  description: "Sistema de gestión clínica FuenteJuv",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
