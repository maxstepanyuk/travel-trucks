import { FiltersFormValues } from "@/types/filters";
import { create } from "zustand";

interface FiltersFormValuesStore {
  catalogFilters: FiltersFormValues;
  setCatalogFilters: (filters: FiltersFormValues) => void;
  clearCatalogFilters: () => void;

  formFilters: FiltersFormValues;
  setFormFilters: (filters: FiltersFormValues) => void;
  clearFormFilters: () => void;
}

const initialCatalogFilters: FiltersFormValues = {};

const initialFormFilters: FiltersFormValues = {
  engine: "",
  form: "",
  location: "",
  transmission: "",
};

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

    formFilters: initialFormFilters,
    setFormFilters: (newFormFilters) => {
      set({ formFilters: newFormFilters });
    },
    clearFormFilters: () => {
      set({ formFilters: initialFormFilters });
    },
  };
});
