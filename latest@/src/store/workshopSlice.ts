import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Workshop } from "../types/workshop";

interface WorkshopState {
  lista: Workshop[];
}

const initialState: WorkshopState = {
  lista: []
};

const workshopSlice = createSlice({
  name: 'workshop',
  initialState,
  reducers: {
    // Substitui a lista inteira (usado no useEffect inicial)
    setWorkshops: (state, action: PayloadAction<Workshop[]>) => {
      state.lista = action.payload;
    },
    // Adiciona um item à lista
    addWorkshopToList: (state, action: PayloadAction<Workshop>) => {
      state.lista.push(action.payload);
    },
    // Atualiza um item na lista
    updateWorkshopInList: (state, action: PayloadAction<Workshop>) => {
      const index = state.lista.findIndex(w => w.id === action.payload.id);
      if (index !== -1) {
        state.lista[index] = action.payload;
      }
    },
    // Remove um item da lista
    removeWorkshopFromList: (state, action: PayloadAction<number>) => {
      state.lista = state.lista.filter(w => w.id !== action.payload);
    }
  }
});

export const { 
  setWorkshops, 
  addWorkshopToList, 
  updateWorkshopInList, 
  removeWorkshopFromList 
} = workshopSlice.actions;

export default workshopSlice.reducer;