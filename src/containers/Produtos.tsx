import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import * as S from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { toggleFavorito } from '../store/reducers/favoritos'
import { useGetProdutosQuery } from '../services/api'
import { adicionarAoCarrinho } from '../store/reducers/carrinho'

const ProdutosComponent = () => {
  const { data: produtos, isLoading, error } = useGetProdutosQuery()
  const favoritos = useSelector((state: RootState) => state.favoritos)
  const dispatch = useDispatch()

  console.log('Dados da API:', { produtos, isLoading, error })

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((f) => f.id === produto.id)
  }

  const handleFavoritar = (produto: ProdutoType) => {
    dispatch(toggleFavorito(produto))
  }

  if (isLoading) return <div>Carregando...</div>
  if (error) {
    console.error('Erro na API:', error)
    return <div>Erro ao carregar produtos</div>
  }

  if (!produtos || !Array.isArray(produtos)) {
    console.error('Produtos não é um array:', produtos)
    return <div>Nenhum produto disponível</div>
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            favoritar={() => handleFavoritar(produto)}
            adicionarAoCarrinho={() => dispatch(adicionarAoCarrinho(produto))}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
