import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import workshopReducer from "./workshopSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workshop: workshopReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;