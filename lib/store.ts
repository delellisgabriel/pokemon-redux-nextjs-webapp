import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./features/CounterState/CounterSlice";
import { pokemonApi } from "./services/pokemon";
// import { setupListeners } from '@reduxjs/toolkit/query'

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
