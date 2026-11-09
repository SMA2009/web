"use client";

import { useState, type FormEvent } from "react";
import { Activity, Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const emailInvalid = submitted && (!email || !/^\S+@\S+\.\S+$/.test(email));
  const passwordInvalid = submitted && !password;
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
  return (
    <main className="login-page">
      <section className="login-aside">
        <div className="login-brand">
          <span className="login-mark">
            <Activity size={21} />
          </span>
          <span>
            <b>Gestión Clínica</b>
            <div className="brand-sub">FUENTEJUV · BPM PLATFORM</div>
          </span>
        </div>
        <div className="login-aside-copy">
          <h1>Cuidamos cada detalle de tu clínica.</h1>
          <p>
            Una plataforma clara y segura para organizar la atención, los
            pacientes y la operación diaria.
          </p>
        </div>
        <div className="login-footer">
          © 2024 FuenteJuv · Plataforma de gestión clínica
        </div>
      </section>
      <section className="login-main">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div style={{ color: "#3961c6", marginBottom: 18 }}>
            <ShieldCheck size={26} />
          </div>
          <h2>Bienvenido de nuevo</h2>
          <p className="login-intro">
            Ingresa tus datos para acceder al sistema.
          </p>
          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder="nombre@clinica.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={emailInvalid}
            />
            {emailInvalid && (
              <div className="login-error">
                Ingresa un correo electrónico válido.
              </div>
            )}
          </div>
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrap">
              <input
                id="password"
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={passwordInvalid}
              />
              <button
                type="button"
                className="password-toggle"
                aria-label={
                  visible ? "Ocultar contraseña" : "Mostrar contraseña"
                }
                onClick={() => setVisible(!visible)}
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {passwordInvalid && (
              <div className="login-error">Ingresa tu contraseña.</div>
            )}
          </div>
          <div className="login-options">
            <label className="remember">
              <input type="checkbox" /> Recordar usuario
            </label>
            <a href="#recuperar">¿Olvidaste tu contraseña?</a>
          </div>
          <button className="login-submit" type="submit">
            Iniciar sesión
          </button>
          {submitted && !emailInvalid && !passwordInvalid && (
            <div className="login-success" role="status">
              Formulario validado. La autenticación estará disponible
              próximamente.
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
