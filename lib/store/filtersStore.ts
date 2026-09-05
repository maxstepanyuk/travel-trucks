import { FiltersFormValues } from "@/types/filters";
import { create } from "zustand";

interface FiltersFormValuesStore {
  catalogFilters: FiltersFormValues;
  setCatalogFilters: (filters: FiltersFormValues) => void;
  clearCatalogFilters: () => void;
}

const initialCatalogFilters: FiltersFormValues = {};

export const useFiltersFormValuesStore = create<FiltersFormValuesStore>()((
  set,
) => {
  return {
    catalogFilters: initialCatalogFilters,
    setCatalogFilters: (newCatalogFilters) => {
      set({ catalogFilters: newCatalogFilters });
    },
    clearCatalogFilters: () => {
      set({ catalogFilters: initialCatalogFilters });
    },
  };
});
