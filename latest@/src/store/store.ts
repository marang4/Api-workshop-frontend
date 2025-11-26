import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import workshopReducer from "./workshopSlice";
import usuarioReducer from "./usuarioSlice"; 
import historyReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workshop: workshopReducer,
    usuarios: usuarioReducer,
    history: historyReducer 
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;