import { create } from "zustand";
import type { Filter } from "./types";

type FilterState = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
