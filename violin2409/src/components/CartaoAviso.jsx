function CartaoAviso({ aviso, editando, onEditar, onExcluir }) {
  return (
    <li className={editando ? 'cartao editando' : 'cartao'}>
      <h3>{aviso.title}</h3>
      <p className="texto">{aviso.body}</p>
      <p className="meta">
        post #{aviso.id} - autor {aviso.userId}
      </p>

      <div className="botoes">
        <button onClick={() => onEditar(aviso)}>Editar</button>
        <button onClick={() => onExcluir(aviso.id)}>Excluir</button>
      </div>
    </li>
  )
}

export default CartaoAviso

