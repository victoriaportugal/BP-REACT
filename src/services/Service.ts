import axios from "axios";

//conexão front x back
const api = axios.create({
  baseURL: 'https://blogpessoal-scqp.onrender.com/'
})

export const cadastrarUsuario = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}
//await api.post(url, dados) = requisicao do usuario
//`await` pausa funções assíncronas até que promessas sejam resolvidas.
// setDados(resposta.data) = guarda resposta do usuario
//services = Funcao que vao realizar as requisicoes do back
//url = usuarios/logar
// Funções assíncronas são aquelas que operam de forma assíncrona, o que significa que elas podem realizar 
//tarefas em segundo plano enquanto o programa continua executando outras instruções

export const login = async(url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados)
  setDados(resposta.data)
}
