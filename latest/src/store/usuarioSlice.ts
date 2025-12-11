import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UsuarioDTO } from "../services/usuarioService";

interface UsuarioState {
  lista: UsuarioDTO[];
}

const initialState: UsuarioState = {
  lista: [],
};

const usuarioSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    setUsuariosList: (state, action: PayloadAction<UsuarioDTO[]>) => {
      state.lista = action.payload;
    },
    addUsuarioToList: (state, action: PayloadAction<UsuarioDTO>) => {
      state.lista.push(action.payload);
    },
    // --- NOVA ACTION AQUI ---
    removeUsuarioFromList: (state, action: PayloadAction<number>) => {
      state.lista = state.lista.filter((u) => u.id !== action.payload);
    },
  },
});

export const { setUsuariosList, addUsuarioToList, removeUsuarioFromList } =
  usuarioSlice.actions;
export default usuarioSlice.reducer;
