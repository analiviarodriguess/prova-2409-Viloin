function FormularioAviso({
  titulo,
  setTitulo,
  texto,
  setTexto,
  editando,
  mensagem,
  onSubmit,
  onCancelar,
}) {
  function enviar(e) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <h2>{editando ? 'Editar aviso' : 'Novo aviso'}</h2>

      <label>Título</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Ex: Prova de sexta adiada"
      />

      <label>Texto do aviso</label>
      <textarea
        rows="5"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva o aviso aqui"
      />

      {mensagem && <p className="mensagem-form">{mensagem}</p>}

      <div className="botoes">
        <button type="submit" className="principal">
          {editando ? 'Salvar' : 'Publicar aviso'}
        </button>
        {editando && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioAviso

