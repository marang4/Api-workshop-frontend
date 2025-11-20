// src/store/types.ts

// Usamos import type para garantir que o 'store' é referenciado APENAS como tipo
import type { store } from './store'; 

// O RootState é o tipo de todo o estado da sua aplicação (RootReducer)
export type RootState = ReturnType<typeof store.getState>;

// O AppDispatch é o tipo da função dispatch
export type AppDispatch = typeof store.dispatch;