"use client";

import styles from "../styles/Map.module.css";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { useProjectsStore } from "../store/UseProjectsStore";

export default function Map() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const projects = useProjectsStore((state) => state.projects);
  const selectedProject = useProjectsStore(
    (state) => state.selectedProject
  );

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [0, 0],
      zoom: 1,
    });

    projects.forEach((project) => {
      const { lat, lng } = project.position || {};
      
      // Validar coordenadas válidas
      if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
        console.warn(`Coordenadas inválidas para ${project.title}`);
        return;
      }
      
      // Validar rango
      if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        console.warn(`Coordenadas fuera de rango para ${project.title}`);
        return;
      }
      
      try {
        new maplibregl.Marker()
          .setLngLat([lng, lat])
          .setPopup(new maplibregl.Popup().setHTML(`<h3>${project.title}</h3>`))
          .addTo(mapRef.current);
      } catch (error) {
        console.error(`Error al crear marcador para ${project.title}:`, error);
      }
    });
  }, [projects]);

  useEffect(() => {
    if (!mapRef.current || !selectedProject?.position) return;

    mapRef.current.flyTo({
        center: [
        selectedProject.position.lng,
        selectedProject.position.lat,
        ],
        zoom: 6,
        essential: true,
    });
  }, [selectedProject]);

  return <div ref={mapContainerRef} className={styles.map} />;
}
