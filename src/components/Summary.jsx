"use client";

import { useProjectsStore } from "../store/UseProjectsStore";
import styles from "../styles/Summary.module.css";

export default function Summary() {
  const selectedProject = useProjectsStore(state => state.selectedProject);
  const setSelectedProject = useProjectsStore(state => state.setSelectedProject);
  const PLAN_LABELS = {
    small: "Pequeño",
    big: "Avanzado",
    premium: "Premium",
  };

  if (!selectedProject) {
    return (
      <div className={styles.emptyState}>
        <h3>Resumen del Proyecto</h3>
        <p>Selecciona un proyecto para ver sus detalles</p>
      </div>
    );
  }
  
  return (
    <div className={styles.summary}>
      <div className={styles.header}>
        <h3>{selectedProject.title}</h3>
        <button 
          className={styles.closeButton}
          onClick={() => setSelectedProject(null)}
        >
          ✕
        </button>
      </div>
      
      <div className={styles.section}>
        <h4>Estado</h4>
        <span
            className={`${styles.badge} ${
            selectedProject.status === "active"
                ? styles.active
                : styles.inactive
            }`}
        >
            {selectedProject.status === "active" ? "Activo" : "Inactivo"}
        </span>
      </div>
      
      <div className={styles.section}>
        <h4>Plan</h4>
        <span
            className={`${styles.planBadge} ${
            selectedProject.projectPlanData?.plan === "small"
                ? styles.planSmall
                : selectedProject.projectPlanData?.plan === "big"
                ? styles.planAdvanced
                : selectedProject.projectPlanData?.plan === "premium"
                ? styles.planPremium
                : styles.planDefault
            }`}
        >
            {PLAN_LABELS[selectedProject.projectPlanData?.plan] || "N/A"}
        </span>
      </div>

      <div className={styles.section}>
        <h4>Items por vencer</h4>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {selectedProject.incidents?.length || 0}
            </span>
            <span className={styles.statLabel}>Incidencias</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {selectedProject.rfi?.length || 0}
            </span>
            <span className={styles.statLabel}>RFI</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>
              {selectedProject.tasks?.length || 0}
            </span>
            <span className={styles.statLabel}>Tareas</span>
          </div>
        </div>
      </div>
      
      <div className={styles.section}>
        <h4>Equipo ({selectedProject.users?.length || 0})</h4>
        <div className={styles.teamList}>
          {selectedProject.users?.slice(0, 5).map((user, i) => (
            <div key={i} className={styles.teamMember}>
              <div className={styles.avatar}>
                {user.name[0]}{user.lastName[0]}
              </div>
              <span>{user.name} {user.lastName}</span>
            </div>
          ))}
          {selectedProject.users?.length > 5 && (
            <p className={styles.more}>
              +{selectedProject.users.length - 5} más
            </p>
          )}
        </div>
      </div>
      
      <div className={styles.section}>
        <h4>Ubicación</h4>
        <p>{selectedProject.city || 'No especificada'}</p>
        <p className={styles.small}>
          {selectedProject.address || ''}
        </p>
      </div>
      
      <div className={styles.section}>
        <h4>Fechas</h4>
        <p className={styles.small}>
          Creado: {new Date(selectedProject.createdAt).toLocaleDateString()}
        </p>
        <p className={styles.small}>
          Actualizado: {new Date(selectedProject.lastUpdated).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}