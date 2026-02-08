# Spybee – Gestión de Proyectos (Frontend)

Este proyecto corresponde al desarrollo del frontend del módulo **“Mis Proyectos”**, implementado según el diseño y lineamientos definidos en el documento de referencia (mockup / PDF).

Incluye un listado de proyectos, vista en tabla y mapa, panel lateral de resumen y paginación personalizada.

---

## Tecnologías utilizadas

- Next.js 13+ (App Router)
- React
- CSS Modules
- Zustand (manejo de estado global)
- JavaScript (ES6+)

---

## Funcionalidades principales

- Listado de proyectos en formato tabla
- Vista alternativa de proyectos en mapa
- Panel lateral de resumen del proyecto
- Alternancia entre vistas (tabla / mapa)
- Información dinámica cargada desde JSON
- Estilos alineados al mockup original
- Paginación personalizada
- Estados visuales según el estado del proyecto (Activo / Inactivo)

---

## Arquitectura y decisiones

- El estado global (proyectos, vista activa, proyecto seleccionado y visibilidad del resumen) se maneja mediante Zustand.
- El panel de resumen se implementa como un panel lateral que desplaza el contenido principal sin superposición.
- Se utilizan CSS Modules para mantener los estilos encapsulados.
- Los colores, badges y espaciados fueron ajustados de acuerdo al documento de diseño proporcionado.

---

## Estructura del proyecto

src/
├── app/
│   └── page.js  
├── components/
│   ├── ProjectList.jsx  
│   ├── Summary.jsx  
│   ├── Map.jsx  
│   └── otros componentes  
├── store/
│   └── UseProjectsStore.js  
├── styles/
│   ├── Layout.module.css  
│   ├── Summary.module.css  
│   └── otros estilos  
└── data/
    └── projects.json  

---

## Cómo ejecutar el proyecto

1. Instalar dependencias:
   npm install

2. Ejecutar en modo desarrollo:
   npm run dev

3. Abrir en el navegador:
   http://localhost:3000

---
