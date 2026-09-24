import CartaoAviso from './CartaoAviso.jsx'

function ListaAvisos({ avisos, avisoEditando, onEditar, onExcluir }) {
  return (
    <ul className="lista">
      {avisos.map((aviso) => (
        <CartaoAviso
          key={aviso.id}
          aviso={aviso}
          editando={avisoEditando !== null && avisoEditando.id === aviso.id}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </ul>
  )
}

export default ListaAvisos