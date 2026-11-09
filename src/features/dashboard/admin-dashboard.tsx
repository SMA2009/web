"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  CalendarDays,
  Check,
  ClipboardCheck,
  DollarSign,
  Eye,
  FileText,
  Gauge,
  LayoutDashboard,
  Scissors,
  ShieldCheck,
  Stethoscope,
  UserRoundPlus,
  Users,
  Waves,
  X,
} from "lucide-react";

const navigation = [
  ["Panel de Control", LayoutDashboard],
  ["Control y Ejecución", Gauge],
  ["Portal de Registro", UserRoundPlus],
  ["Revisar Solicitudes", ClipboardCheck],
  ["Pacientes", Users],
  ["Citas", CalendarDays],
  ["Tratamientos", Stethoscope],
] as const;
const stats = [
  {
    value: "3",
    label: "Citas Atendidas",
    note: "7 citas en el período",
    Icon: Check,
    tone: "green",
  },
  {
    value: "1",
    label: "Citas Canceladas",
    note: "Ver pacientes para contactar",
    Icon: X,
    tone: "red",
  },
  {
    value: "1",
    label: "Citas Reprogramadas",
    note: "Fecha original preservada",
    Icon: CalendarDays,
    tone: "blue",
  },
  {
    value: "1",
    label: "Tratamientos Vendidos",
    note: "$ 3,000.00 en presupuestos aceptados",
    Icon: DollarSign,
    tone: "teal",
  },
  {
    value: "5",
    label: "Tratamientos Activos",
    note: "1 en revisión",
    Icon: Stethoscope,
    tone: "teal",
  },
  {
    value: "1",
    label: "Tratamientos Cancelados",
    note: "0 sesiones · 1 planes",
    Icon: X,
    tone: "red",
  },
];
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Activity size={20} />
        </div>
        <div>
          <div className="brand-name">Gestión Clínica</div>
          <div className="brand-sub">FUENTEJUV · BPM PLATFORM</div>
        </div>
      </div>
      <nav className="nav" aria-label="Navegación principal">
        {navigation.map(([label, Icon], i) => (
          <a
            className={`nav-link${i === 0 ? " active" : ""}`}
            href="#"
            key={label}
          >
            <Icon />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="sidebar-foot">Sistema de gestión clínica</div>
    </aside>
  );
}
function Header() {
  return (
    <header className="topbar">
      <div>
        <div className="page-title">Panel de Control</div>
        <div className="page-subtitle">Resumen operativo de la clínica</div>
      </div>
      <div className="profile">
        <div className="online">Sistema en línea</div>
        <div className="avatar">LG</div>
        <div>
          <div className="profile-name">Laura Gómez</div>
          <div className="role">Administración</div>
        </div>
      </div>
    </header>
  );
}
function StatCard({ item }: { item: (typeof stats)[number] }) {
  const { Icon } = item;
  return (
    <article className="stat-card">
      <div className="stat-icon">
        <Icon />
      </div>
      <div className="stat-value">{item.value}</div>
      <div className="stat-label">{item.label}</div>
      <div className="stat-note">{item.note}</div>
    </article>
  );
}
function DashboardSkeleton() {
  return (
    <main className="dashboard-content" aria-label="Cargando panel">
      <div className="skeleton" style={{ height: 42, marginBottom: 24 }} />
      <div
        className="skeleton"
        style={{ height: 36, width: "42%", marginBottom: 16 }}
      />
      <div className="stats-grid">
        {[0, 1, 2, 3].map((i) => (
          <div className="skeleton sk-card" key={i} />
        ))}
      </div>
      <div className="stats-grid second">
        {[0, 1].map((i) => (
          <div className="skeleton sk-card" key={i} />
        ))}
      </div>
      <div className="skeleton sk-wide" style={{ marginTop: 14 }} />
      <div className="two-col" style={{ marginTop: 14 }}>
        <div className="skeleton sk-panel" />
        <div className="skeleton sk-panel" />
      </div>
      <div className="two-col" style={{ marginTop: 14 }}>
        <div className="skeleton sk-panel" />
        <div className="skeleton sk-panel" />
      </div>
      <div
        className="skeleton sk-wide"
        style={{ marginTop: 14, height: 330 }}
      />
    </main>
  );
}
export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Header />
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <main className="dashboard-content">
            <div className="notice">
              <ShieldCheck size={17} /> Vista demostrativa del panel
              administrativo. Las cifras y actividades corresponden a datos
              ficticios.
            </div>
            <div className="period-row">
              <div>
                <h1 className="section-title">Indicadores del período</h1>
                <div className="small-muted">Datos del día · 20 may 2024</div>
              </div>
              <div className="filters">
                <select className="select" aria-label="Médico">
                  <option>Todos los médicos</option>
                  <option>Dr. Roberto Silva</option>
                  <option>Dr. Miguel Torres</option>
                </select>
                <button className="period-btn selected">Por día</button>
                <button className="period-btn">Por semana</button>
                <button className="period-btn">Por mes</button>
              </div>
            </div>
            <section className="stats-grid">
              {stats.slice(0, 4).map((item) => (
                <StatCard key={item.label} item={item} />
              ))}
            </section>
            <section className="stats-grid second">
              {stats.slice(4).map((item) => (
                <StatCard key={item.label} item={item} />
              ))}
            </section>
            <section className="panel">
              <div className="panel-head">
                <h2 className="panel-title">Citas por especialidad</h2>
                <a className="more" href="#">
                  Ver más →
                </a>
              </div>
              <div className="specialties">
                <article className="specialty">
                  <div className="specialty-icon">
                    <Eye size={19} />
                  </div>
                  <div>
                    <div className="specialty-name">Iridología</div>
                    <div className="specialty-meta">Total de citas</div>
                  </div>
                  <div className="specialty-num">2</div>
                  <div className="spec-foot">
                    <span>Presencial</span>
                    <b>2</b>
                  </div>
                </article>
                <article className="specialty">
                  <div className="specialty-icon">
                    <Waves size={19} />
                  </div>
                  <div>
                    <div className="specialty-name">Bio-resonancia</div>
                    <div className="specialty-meta">Total de citas</div>
                  </div>
                  <div className="specialty-num">2</div>
                  <div className="spec-foot">
                    <span>Presencial</span>
                    <b>2</b>
                  </div>
                </article>
              </div>
              <div className="chips">
                <span>MODALIDAD</span>
                <span className="chip">▣ Virtual 0</span>
                <span className="chip">⌖ Presencial 4</span>
                <span className="chip">✂ Muestra de cabello 0</span>
              </div>
            </section>
            <div className="two-col">
              <section className="panel">
                <div className="panel-head">
                  <h2 className="panel-title">Citas por médico</h2>
                  <a href="#" className="more">
                    Ver más →
                  </a>
                </div>
                <div className="table-wrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Médico</th>
                        <th>Atendidas</th>
                        <th>Canceladas</th>
                        <th>Reprog.</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="doctor">
                            Dr. Roberto Silva<small>Medicina General</small>
                          </span>
                        </td>
                        <td className="ok">1</td>
                        <td className="bad">0</td>
                        <td>1</td>
                        <td>
                          <b>4</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="doctor">
                            Dr. Miguel Torres<small>Dermatología</small>
                          </span>
                        </td>
                        <td className="ok">1</td>
                        <td className="bad">1</td>
                        <td>0</td>
                        <td>
                          <b>2</b>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="doctor">
                            Dra. Elena Vargas<small>Cardiología</small>
                          </span>
                        </td>
                        <td className="ok">1</td>
                        <td className="bad">0</td>
                        <td>0</td>
                        <td>
                          <b>1</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section className="panel">
                <div className="panel-head">
                  <h2 className="panel-title">
                    Tratamientos atendidos por tipo
                  </h2>
                  <a href="#" className="more">
                    Ver más →
                  </a>
                </div>
                {[
                  "Sesión de Fisioterapia",
                  "Terapia de Infusión (Sesión)",
                  "Terapia de Compresas Termoterápicas",
                ].map((x) => (
                  <div className="bar-item" key={x}>
                    <div className="bar-label">
                      <span>{x}</span>
                      <b>1</b>
                    </div>
                    <div className="bar">
                      <span style={{ width: "100%" }} />
                    </div>
                  </div>
                ))}
                <div className="chips">
                  <span className="chip">⊘ 1 cancelados</span>
                  <span className="chip">▣ 1 vendidos · $ 3,000.00</span>
                </div>
              </section>
            </div>
            <div className="two-col">
              <section className="panel">
                <div className="panel-head">
                  <h2 className="panel-title">Estado de citas · 20 may 2024</h2>
                  <a href="#" className="more">
                    Ver más →
                  </a>
                </div>
                <div className="donut-wrap">
                  <div className="donut">
                    <div className="donut-label">
                      7<small>citas</small>
                    </div>
                  </div>
                  <div className="legend">
                    <span>
                      <i className="swatch" />
                      Confirmadas <b>2</b>
                    </span>
                    <span>
                      <i className="swatch" style={{ background: "#07865c" }} />
                      Completadas <b>3</b>
                    </span>
                    <span>
                      <i className="swatch" style={{ background: "#c9495d" }} />
                      Canceladas <b>1</b>
                    </span>
                    <span>
                      <i className="swatch" style={{ background: "#d99118" }} />
                      No asistió <b>1</b>
                    </span>
                  </div>
                </div>
              </section>
              <section className="panel">
                <div className="panel-head">
                  <h2 className="panel-title">Tasa de aceptación</h2>
                  <a href="#" className="more">
                    Ver más →
                  </a>
                </div>
                <div className="acceptance">
                  <div className="acceptance-ring">
                    100%<small>Presupuestos</small>
                  </div>
                  <div className="acceptance-note">
                    ○ 3 aceptados　 <span className="bad">⊗ 0 rechazados</span>
                  </div>
                </div>
              </section>
            </div>
            <section className="panel">
              <div className="panel-head">
                <h2 className="panel-title">Pipeline de tratamientos</h2>
                <a href="#" className="more">
                  Ver más →
                </a>
              </div>
              <div className="pipeline">
                {[
                  ["Borrador", 1],
                  ["En Revisión", 1],
                  ["Aprobado", 1],
                  ["En Progreso", 2],
                  ["Completado", 1],
                  ["Cancelado", 1],
                ].map(([name, n]) => (
                  <div className="stage" key={name}>
                    <div className="stage-count">{n}</div>
                    <div className="stage-bar" />
                    <div className="stage-label">{name}</div>
                  </div>
                ))}
              </div>
            </section>
            <section className="panel">
              <div className="panel-head">
                <h2 className="panel-title">Actividad reciente</h2>
                <a href="#" className="more">
                  Ver más →
                </a>
              </div>
              <div className="activity">
                {[
                  {
                    Icon: UserRoundPlus,
                    title:
                      "Nueva solicitud de registro de Carlos Alberto Pérez",
                    meta: "Portal de Pacientes · hace 9 min · 10 may, 05:20",
                  },
                  {
                    Icon: CalendarDays,
                    title:
                      "Cita confirmada para María Fernández — Control de presión",
                    meta: "Laura Gómez · hace 13 min · 16 may, 02:00",
                  },
                  {
                    Icon: Stethoscope,
                    title:
                      "Plan de tratamiento enviado a revisión — José Castro",
                    meta: "Dr. Roberto Silva · hace 15 min · 14 may, 04:30",
                  },
                  {
                    Icon: Activity,
                    title:
                      "Consulta dermatológica finalizada — María Fernández",
                    meta: "Dr. Miguel Torres · hace 18 min · 18 may, 04:35",
                  },
                  {
                    Icon: FileText,
                    title: "Presupuesto emitido para tratamiento de ortodoncia",
                    meta: "Sistema · hace 20 min · 12 may, 03:15",
                  },
                  {
                    Icon: Scissors,
                    title: "Alerta de stock bajo: Anestésico Tópico 50ml",
                    meta: "Sistema · hace 22 min · 17 may, 08:00",
                  },
                ].map(({ Icon, title, meta }) => (
                  <div className="activity-item" key={title}>
                    <div className="activity-icon">
                      <Icon size={15} />
                    </div>
                    <div>
                      <div className="activity-text">{title}</div>
                      <div className="activity-meta">{meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}
