import { useEffect, useState } from 'react'
import FormularioAviso from './components/FormularioAviso.jsx'
import ListaAvisos from './components/ListaAvisos.jsx'
import './App.css'

const API = 'https://jsonplaceholder.typicode.com'

function App() {
  const [avisos, setAvisos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const [titulo, setTitulo] = useState('')
  const [texto, setTexto] = useState('')
  const [avisoEditando, setAvisoEditando] = useState(null)
  const [mensagemForm, setMensagemForm] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function buscarAvisos() {
      try {
        const response = await fetch(API + '/posts?_limit=15', {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error('Erro ' + response.status)
        }
        const dados = await response.json()
        setAvisos(dados)
      } catch (err) {
        if (err.name === 'AbortError') return
        setErro('Não foi possível conectar à API.')
      } finally {
        if (!controller.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    buscarAvisos()

    return () => controller.abort()
  }, [])

  function limparFormulario() {
    setTitulo('')
    setTexto('')
    setAvisoEditando(null)
    setMensagemForm('')
  }

  async function publicarAviso() {
    try {
      const response = await fetch(API + '/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, title: titulo, body: texto }),
      })
      if (!response.ok) {
        throw new Error('Erro ' + response.status)
      }
      const avisoCriado = await response.json()
      setAvisos([avisoCriado, ...avisos])
      limparFormulario()
    } catch (err) {
      setErro('Não foi possível publicar o aviso.')
    }
  }

  function comecarEdicao(aviso) {
    setAvisoEditando(aviso)
    setTitulo(aviso.title)
    setTexto(aviso.body)
    setMensagemForm('')
  }

  async function salvarEdicao() {
    try {
      const response = await fetch(API + '/posts/' + avisoEditando.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...avisoEditando, title: titulo, body: texto }),
      })
      if (!response.ok) {
        throw new Error('Erro ' + response.status)
      }
      const novaLista = avisos.map((a) =>
        a.id === avisoEditando.id ? { ...a, title: titulo, body: texto } : a
      )
      setAvisos(novaLista)
      limparFormulario()
    } catch (err) {
      setErro('Não foi possível salvar a edição.')
    }
  }

  async function excluirAviso(id) {
    setErro('')
    const listaAntiga = avisos
    setAvisos(avisos.filter((a) => a.id !== id))

    try {
      const response = await fetch(API + '/posts/' + id, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Erro ' + response.status)
      }
    } catch (err) {
      setAvisos(listaAntiga)
      setErro('Não foi possível excluir o aviso. Ele voltou para a lista.')
    }
  }

  function enviarFormulario() {
    if (titulo.trim() === '' || texto.trim() === '') {
      setMensagemForm('Preencha o título e o texto antes de publicar.')
      return
    }

    setMensagemForm('')
    setErro('')

    if (avisoEditando) {
      salvarEdicao()
    } else {
      publicarAviso()
    }
  }

  return (
    <div className="pagina">
      <header className="topo">
        <h1>Mural de Avisos</h1>
      </header>

      <main className="conteudo">
        <section>
          <FormularioAviso
            titulo={titulo}
            setTitulo={setTitulo}
            texto={texto}
            setTexto={setTexto}
            editando={avisoEditando == null}
            mensagem={mensagemForm}
            onSubmit={enviarFormulario}
            onCancelar={limparFormulario}
          />
        </section>

        <section>
          <h2>Avisos ({avisos.length})</h2>

          <ListaAvisos
            avisos={avisos}
            avisoEditando={avisoEditando}
            onEditar={comecarEdicao}
            onExcluir={excluirAviso}
          />

          {/* RF06 - estados da tela */}
          {carregando && <p className="estado">Carregando avisos...</p>}
          {erro && <p className="estado erro">{erro}</p>}
          {!carregando && !erro && avisos.length === 0 && (
            <p className="estado">
              Nenhum aviso publicado — seja a primeira pessoa a escrever no mural.
            </p>
          )}
        </section>
      </main>
    </div>
  )
}

export default App