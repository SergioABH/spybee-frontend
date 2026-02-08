import styles from "../styles/ProjectItem.module.css";

export default function ProjectItem({ project, onClick, isSelected }) {
  const planMap = {
    small: { label: "Pequeño", className: styles.pequeno },
    big: { label: "Avanzado", className: styles.avanzado },
    premium: { label: "Premium", className: styles.premium },
  };

  const planKey = project.projectPlanData?.plan;
  const plan = planMap[planKey] || {
    label: "N/A",
    className: "",
  };

  const isActive = project.status === "active";

  const createdDate = new Date(project.createdAt).toLocaleDateString();
  const updatedDate = new Date(project.lastUpdated).toLocaleDateString();

  return (
    <article
      className={`${styles.projectItem} ${
        isSelected ? styles.highlighted : ""
      }`}
      onClick={onClick}
    >
      {/* Columna: Proyecto */}
      <div className={styles.projectInfo}>
        {project.img ? (
          <img
            src={project.img}
            alt={project.title}
            className={styles.projectImage}
          />
        ) : (
          <div className={styles.projectImage} />
        )}

        <div className={styles.projectText}>
          <div className={styles.projectName}>
            {project.title}
          </div>
          <div className={styles.projectDates}>
            🕒 {createdDate} ↺ {updatedDate}
          </div>
        </div>
      </div>

      {/* Plan */}
      <div
        className={`${styles.planBadge} ${plan.className}`}
      >
        {plan.label}
      </div>

      {/* Estado */}
      <div
        className={`${styles.statusBadge} ${
          isActive ? styles.activo : styles.inactivo
        }`}
      >
        {isActive ? "Activo" : "Inactivo"}
      </div>

      {/* Equipo */}
      <div className={styles.teamAvatars}>
        {project.users.slice(0, 5).map((user, index) => {
          const toneClass =
            styles[`avatarTone${(index % 5) + 1}`];

          return (
            <div
              key={index}
              className={`${styles.avatar} ${toneClass}`}
            >
              {user.name[0]}
              {user.lastName[0]}
            </div>
          );
        })}

        {project.users.length > 5 && (
          <div
            className={`${styles.avatar} ${styles.avatarTone1}`}
          >
            +{project.users.length - 5}
          </div>
        )}
      </div>

      {/* Items por vencer */}
      <div className={styles.itemsColumn}>
        <div className={styles.itemGroup}>
          <span className={styles.itemCount}>
            {project.incidents.length}
          </span>
          <span className={styles.itemLabel}>
            Incidencias
          </span>
        </div>

        <div className={styles.itemGroup}>
          <span className={styles.itemCount}>
            {project.rfi?.length || 0}
          </span>
          <span className={styles.itemLabel}>
            RFI
          </span>
        </div>

        <div className={styles.itemGroup}>
          <span className={styles.itemCount}>
            {project.tasks?.length || 0}
          </span>
          <span className={styles.itemLabel}>
            Tareas
          </span>
        </div>
      </div>

    </article>
  );
}
