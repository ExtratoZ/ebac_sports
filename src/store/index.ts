import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import carrinhoReducer from './reducers/carrinho'
import favoritosReducer from './reducers/favoritos'
import produtosReducer from './reducers/favoritos'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    carrinho: carrinhoReducer,
    favoritos: favoritosReducer,
    produtos: produtosReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
