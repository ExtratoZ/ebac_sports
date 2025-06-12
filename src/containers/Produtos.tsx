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

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((f) => f.id === produto.id)
  }

  const handleFavoritar = (produto: ProdutoType) => {
    dispatch(toggleFavorito(produto))
  }

  const handleAdicionarAoCarrinho = (produto: ProdutoType) => {
    dispatch(adicionarAoCarrinho(produto))
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
            key={produto.id}
            produto={produto}
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            favoritar={() => handleFavoritar(produto)}
            adicionarAoCarrinho={() => handleAdicionarAoCarrinho(produto)}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
