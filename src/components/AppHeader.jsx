"use client";

import Image from "next/image";
import styles from "../styles/Layout.module.css";
import { UserIcon, ChevronDownIcon } from "./Icons";
import { useState, useRef, useEffect } from "react";

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const userRef = useRef(null);

  // Cerrar dropdown de filtros al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (userRef.current && !userRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <header className={styles.header}>
      <div className={styles.appWrapper}>
        {/* Logo */}
        <Image
          src="/logo-spybee.png"
          alt="Spybee"
          width={120}
          height={48}
          priority
        />

        {/* Usuario */}
        <div ref={userRef}>
          <button
            className={styles.userProfile}
            onClick={() => setOpen((prev) => !prev)}
          >
            <div className={styles.userHexagon}>
              <UserIcon size={16} />
            </div>

            <div className={styles.userInfo}>
              <span className={styles.userName}>Sergio</span>
              <span className={styles.userRole}>Administrador</span>
            </div>

            <span className={`${styles.userChevron} ${open ? styles.open : ""}`}>
              <ChevronDownIcon size={16} />
            </span>
          </button>

          {open && (
            <div className={styles.userDropdown}>
              <button>Mi perfil</button>
              <button>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
