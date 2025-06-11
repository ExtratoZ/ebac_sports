import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../App'

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState: [] as Produto[],
  reducers: {
    adicionarFavorito: (state, action: PayloadAction<Produto>) => {
      if (!state.some((produto) => produto.id === action.payload.id)) {
        state.push(action.payload)
      }
    },
    removerFavorito: (state, action: PayloadAction<number>) => {
      return state.filter((produto) => produto.id !== action.payload)
    },
    toggleFavorito: (state, action: PayloadAction<Produto>) => {
      const index = state.findIndex((p) => p.id === action.payload.id)
      if (index >= 0) {
        state.splice(index, 1)
      } else {
        state.push(action.payload)
      }
    }
  }
})

export const { adicionarFavorito, removerFavorito, toggleFavorito } =
  favoritosSlice.actions
export default favoritosSlice.reducer
