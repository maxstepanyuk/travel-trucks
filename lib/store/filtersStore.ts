import { FiltersFormValues } from "@/types/filters";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FiltersFormValuesStore {
  filters: FiltersFormValues;
  setFilters: (filters: FiltersFormValues) => void;
  clearFilters: () => void;
}

const initialFiltersFormValues: FiltersFormValues = {
  location: "",
  form: "",
  transmission: "",
  engine: "",
};

export const useFiltersFormValuesStore = create<FiltersFormValuesStore>()(
  persist(
    (set) => {
      return {
        filters: initialFiltersFormValues,
        setFilters: (newFilters) => {
          set({ filters: newFilters });
        },
        clearFilters: () => {
          set({ filters: initialFiltersFormValues });
        },
      };
    },
    {
      name: "filters",
      partialize: (store) => {
        return { filters: store.filters };
      },
    },
  ),
);
