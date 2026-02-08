"use client";

import { useState, useRef, useEffect } from "react";
import { useProjectsStore } from "../store/UseProjectsStore";
import SearchBar from "./SearchBar";
import styles from "../styles/PageHeader.module.css";
import {
  FilterIcon,
  ListIcon,
  GridIcon,
  MapIcon,
  PresentationIcon,
} from "./Icons";

export default function PageHeader({ title }) {
  const projects = useProjectsStore((state) => state.projects);

  const viewMode = useProjectsStore((state) => state.viewMode);
  const setViewMode = useProjectsStore((state) => state.setViewMode);

  const filterType = useProjectsStore((state) => state.filterType);
  const setFilterType = useProjectsStore((state) => state.setFilterType);

  const toggleSummary = useProjectsStore((state) => state.toggleSummary);
  const isSummaryOpen = useProjectsStore((state) => state.isSummaryOpen);

  const [openFilters, setOpenFilters] = useState(false);
  const filterRef = useRef(null);

  // Cerrar dropdown de filtros al hacer click fuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilters(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.pageHeader}>
      {/* IZQUIERDA */}
      <div className={styles.appWrapper}>
        <div className={styles.left}>
          <h2 className={styles.title}>{title}</h2>
          <span className={styles.count}>{projects.length} Proyectos</span>
        </div>

        {/* DERECHA */}
        <div className={styles.right}>
          {/* BOTÓN FILTROS */}
          <div ref={filterRef} className={styles.filterWrapper}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setOpenFilters((prev) => !prev)}
              aria-label="Filtrar proyectos"
            >
              <FilterIcon />
            </button>

            {openFilters && (
              <div className={styles.filterDropdown}>
                <button
                  className={filterType === "alphabetical" ? styles.active : ""}
                  onClick={() => {
                    setFilterType("alphabetical");
                    setOpenFilters(false);
                  }}
                >
                  Orden alfabético
                </button>

                <button
                  className={filterType === "incidents" ? styles.active : ""}
                  onClick={() => {
                    setFilterType("incidents");
                    setOpenFilters(false);
                  }}
                >
                  Más incidentes
                </button>

                <button
                  className={filterType === "rfi" ? styles.active : ""}
                  onClick={() => {
                    setFilterType("rfi");
                    setOpenFilters(false);
                  }}
                >
                  Más RFI
                </button>

                <button
                  className={filterType === "tasks" ? styles.active : ""}
                  onClick={() => {
                    setFilterType("tasks");
                    setOpenFilters(false);
                  }}
                >
                  Más tareas
                </button>
              </div>
            )}
          </div>
  
          {/* GRUPO DE VISTAS */}
          <div className={styles.viewGroup}>
            <button
              type="button"
              className={`${styles.viewButton} ${
                viewMode === "list" ? styles.viewButtonActive : ""
              }`}
              onClick={() => setViewMode("list")}
              aria-label="Vista lista"
            >
              <ListIcon />
            </button>

            <button
              type="button"
              className={`${styles.viewButton} ${
                viewMode === "grid" ? styles.viewButtonActive : ""
              }`}
              onClick={() => setViewMode("grid")}
              aria-label="Vista tarjetas"
            >
              <GridIcon />
            </button>

            <button
              type="button"
              className={`${styles.viewButton} ${
                viewMode === "map" ? styles.viewButtonActive : ""
              }`}
              onClick={() => setViewMode("map")}
              aria-label="Vista mapa"
            >
              <MapIcon />
            </button>
          </div>

          {/* BUSCADOR */}
          <div className={styles.searchWrapper}>
            <SearchBar />
          </div>

          {/* CTA */}
          <button
            type="button"
            className={styles.createButton}
            onClick={() => console.log("Crear proyecto")}
          >
            + Crear proyecto
          </button>
        </div>
      </div>
    </header>
  );
}
