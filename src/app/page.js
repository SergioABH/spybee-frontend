"use client";

import AppHeader from "../components/AppHeader";
import PageHeader from "../components/PageHeader";
import ProjectList from "../components/ProjectList";
import Map from "../components/Map";
import Summary from "../components/Summary";
import { useProjectsStore } from "../store/UseProjectsStore";
import styles from "../styles/Layout.module.css";

// íconos (usa los que ya tengas)
import { ChevronLeft, ChevronRight } from "../components/Icons";

export default function Page() {
  const viewMode = useProjectsStore((state) => state.viewMode);
  const isSummaryOpen = useProjectsStore((state) => state.isSummaryOpen);
  const toggleSummary = useProjectsStore((state) => state.toggleSummary);

  return (
    <>
      {/* Header global */}
      <AppHeader />

      <main className={styles.page}>
        {/* Header de sección */}
        <PageHeader title="Mis proyectos" />

        {/* Workspace principal */}
        <div className={styles.workspace}>
          <div className={styles.leftColumn}>
            {/* Mapa */}
            {viewMode === "map" && (
              <div className={styles.mapWrapper}>
                <Map />
              </div>
            )}

            {/* Tabla de proyectos */}
            <div className={styles.tableWrapper}>
              <ProjectList />
            </div>
          </div>
          
          {/* Botón toggle resumen (SIEMPRE visible) */}
          <button
            className={`${styles.summaryToggle} ${
              !isSummaryOpen ? styles.summaryToggleClosed : ""
            }`}
            onClick={toggleSummary}
            aria-label={
              isSummaryOpen ? "Cerrar resumen" : "Abrir resumen"
            }
          >
            {isSummaryOpen ? <ChevronRight /> : <ChevronLeft />}
          </button>

          {/* Panel resumen */}
          {isSummaryOpen && (
            <aside className={styles.summaryPanel}>
              {/* <Summary /> */}
              <Summary />
            </aside>
          )}
        </div>
      </main>
    </>
  );
}
