"use client";

import styles from "../styles/SearchBar.module.css";
import { useProjectsStore } from "../store/UseProjectsStore";
import { SearchIcon } from "./Icons";

export default function SearchBar() {
  const searchTerm = useProjectsStore((state) => state.searchTerm);
  const setSearchTerm = useProjectsStore((state) => state.setSearchTerm);

  return (
    <div className={styles.searchBar}>
      <span className={styles.searchIcon}><SearchIcon /></span>

      <input
        type="text"
        className={styles.searchInput}
        placeholder="Buscar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
