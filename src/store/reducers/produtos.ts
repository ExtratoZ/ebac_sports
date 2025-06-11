import { createSlice } from '@reduxjs/toolkit';
import { Produto } from '../../App';

const produtosSlice = createSlice({
  name: 'produtos',
  initialState: [] as Produto[],
  reducers: {
    carregarProdutos: (state, action) => {
      return action.payload;
    }
  }
});

export const { carregarProdutos } = produtosSlice.actions;
export default produtosSlice.reducer;
