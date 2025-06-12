// src/services/api.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Produto } from '../App'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-api-tau.vercel.app/api/ebac_sports'
  }),
  endpoints: (builder) => ({
    getProdutos: builder.query<Produto[], void>({
      query: () => '/produtos'
    }),
    adicionarFavorito: builder.mutation<Produto, number>({
      query: (produtoId) => ({
        url: `/favoritos/${produtoId}`,
        method: 'POST'
      })
    }),
    adicionarAoCarrinho: builder.mutation<void, number>({
      query: (produtoId) => ({
        url: `/carrinho/${produtoId}`,
        method: 'POST'
      })
    })
  })
})

export const {
  useGetProdutosQuery,
  useAdicionarFavoritoMutation,
  useAdicionarAoCarrinhoMutation
} = api
