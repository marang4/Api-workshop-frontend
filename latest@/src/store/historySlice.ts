import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Workshop } from "../types/workshop";

interface HistoryState {
  itens: Workshop[];
}

const initialState: HistoryState = {
  itens: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action: PayloadAction<Workshop>) => {
      const workshop = action.payload;
      
      
      const listaSemDuplicata = state.itens.filter((w) => w.id !== workshop.id);
      
      
      state.itens = [workshop, ...listaSemDuplicata];

      
      if (state.itens.length > 10) {
        state.itens.pop();
      }
    },
    clearHistory: (state) => {
      state.itens = [];
    }
  },
});

export const { addToHistory, clearHistory } = historySlice.actions;
export default historySlice.reducer;