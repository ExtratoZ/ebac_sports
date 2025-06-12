import { useDispatch, useSelector } from 'react-redux'
import { Produto } from '../../App'
import * as S from './styles'
import { RootState } from '../../store'
import { toggleFavorito } from '../../store/reducers/favoritos'
import { adicionarAoCarrinho } from '../../store/reducers/carrinho'

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

type ProdutoProps = {
  produto: Produto
  estaNosFavoritos: boolean
  favoritar: () => void
  adicionarAoCarrinho: () => void
}

const ProdutoComponent = ({ produto }: ProdutoProps) => {
  const dispatch = useDispatch()
  const favoritos = useSelector((state: RootState) => state.favoritos)

  const estaFavoritado = favoritos.some((p) => p.id === produto.id)

  const handleFavoritar = () => {
    dispatch(toggleFavorito(produto))
  }

  const handleAdicionarAoCarrinho = () => {
    dispatch(adicionarAoCarrinho(produto))
  }

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>
      <S.BtnComprar onClick={handleFavoritar} type="button">
        {estaFavoritado
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>
      <S.BtnComprar onClick={handleAdicionarAoCarrinho} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
