import { createSlice, type PayloadAction } from "@reduxjs/toolkit"



interface Usuario{
  id: number;
  email:string,
  nome: string,
  role: string
}


interface AuthState{
  isAutenticado: boolean,
  usuario: Usuario | null,
  token: string | null
}


const initialState: AuthState = {
  isAutenticado: false,
  usuario: null,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{usuario:Usuario, token:string}>) => {
      state.isAutenticado = true; 
      state.token = action.payload.token;
      state.usuario = action.payload.usuario;
    },
    logout: (state) => {
      state.isAutenticado = false;
      state.token = null;
      state.usuario = null;
    }
  }
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer