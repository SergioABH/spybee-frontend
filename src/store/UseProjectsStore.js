import { create } from "zustand";
import projectsData from "../data/mock_data.json";

export const useProjectsStore = create((set) => ({
  /* DATA */
  projects: projectsData,
  selectedProject: null,

  /* UI STATE */
  viewMode: "list", // list | grid | map
  isSummaryOpen: false,

  searchTerm: "",
  filterType: "alphabetical",
  currentPage: 1,

  /* ACTIONS */
  setViewMode: (mode) => set({ viewMode: mode }),

  toggleSummary: () =>
    set((state) => ({ isSummaryOpen: !state.isSummaryOpen })),

  setSelectedProject: (project) =>
    set({ selectedProject: project }),

  setSearchTerm: (term) =>
    set({ searchTerm: term, currentPage: 1 }),

  setFilterType: (type) =>
    set({ filterType: type }),

  setCurrentPage: (page) =>
    set({ currentPage: page }),
}));
