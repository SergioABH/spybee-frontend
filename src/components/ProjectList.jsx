"use client";

import styles from "../styles/ProjectList.module.css";
import { useProjectsStore } from "../store/UseProjectsStore";
import ProjectItem from "./ProjectItem";

const ITEMS_PER_PAGE = 10;

export default function ProjectList() {
  const projects = useProjectsStore((state) => state.projects);
  const searchTerm = useProjectsStore((state) => state.searchTerm);
  const filterType = useProjectsStore((state) => state.filterType);
  const currentPage = useProjectsStore((state) => state.currentPage);
  const setCurrentPage = useProjectsStore((state) => state.setCurrentPage);
  const setSelectedProject = useProjectsStore((state) => state.setSelectedProject);
  const selectedProject = useProjectsStore((state) => state.selectedProject);

  // Búsqueda
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordenamiento
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (filterType) {
      case "incidents":
        return b.incidents.length - a.incidents.length;

      case "rfi":
        return (b.rfi?.length || 0) - (a.rfi?.length || 0);

      case "tasks":
        return (b.tasks?.length || 0) - (a.tasks?.length || 0);

      case "alphabetical":
      default: {
        const numA = Number(a.title.replace(/\D/g, ""));
        const numB = Number(b.title.replace(/\D/g, ""));
        return numA - numB;
      }
    }
  });

  // Paginación
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = sortedProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(
    sortedProjects.length / ITEMS_PER_PAGE
  );

  return (
    <section className={styles.projectList}>
      <div className={styles.tableHeader}>
        <div className={styles.headerCell}>Proyecto</div>
        <div className={styles.headerCell}>Plan</div>
        <div className={styles.headerCell}>Estado</div>
        <div className={styles.headerCell}>Equipo</div>
        <div className={styles.headerCell}>Items por vencer</div>
      </div>

      <div className={styles.tableBody}>
        {paginatedProjects.map((project) => (
          <ProjectItem
            key={project._id}
            project={project}
            isSelected={selectedProject?._id === project._id}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        <span>
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </span>

        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
}
