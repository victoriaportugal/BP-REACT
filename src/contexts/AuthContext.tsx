import { createContext, ReactNode, useState } from "react"

import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"

//2ª PARTE : TIPANDO O CONTEXTO, DECLARANDO AS INFORMAÇÕES QUE O CONTEXTO ARMAZENA
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}
//sempre antes do contexto existe uma interface
// Esta interface descreve as informações guardadas no nosso contexto
// possui 4 infomações, atibuto usuario, uma funcao hangleLogout, funcao handleLogin que é assincrona e o isLoading que é booleano (T/F)
//Promise<void> tipagem das funções assincronas = esta no Service.ts "export const login"
// promisse que pode demorar e void de talvez nao ter retorno.
//usuario: UsuarioLogin = o " : " é a tipagem do TypeScript
interface AuthProviderProps {
    children: ReactNode
}

// 1ª PARTE : CONSTRUÇÃO INICIAL DO CONTEXTO DE ARMAZENAMENTO
export const AuthContext = createContext({} as AuthContextProps)
// exporta uma constante chamada AuthContext, ela recebe o resultado de uma função. createContext = funcao do react para um contexto
//{} = um objeto, sendo qualquer informação, por exemplo do usuario que no caso esta na interface
//sendo informaçoes da interface AuthContextProps
//3ª PARTE : FUNCAO QUE GERENCIA O CONTEXTO DE ARMAZENAMENTO
export function AuthProvider({ children }: AuthProviderProps) {
//AuthProvider uma funcao que acessa o contexto e dentro dela gerenciar as informações que o contexto guarda
//tambem disponibiliza para toda a aplicação as informações

//CRIANDO UM ESTADO = useState (hook)
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })
 

    const [isLoading, setIsLoading] = useState(false)

    //RESPONSAVEL POR LOGAR O USUARIO E ATUALIZAR O ESTADO DE USUARIO LOGADO
    async function handleLogin(userLogin: UsuarioLogin) {

        setIsLoading(true)

        try {

            await login(`/usuarios/logar`, userLogin, setUsuario)
            alert("Usuário logado com sucesso")
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            alert("Dados do usuário inconsistentes")
            setIsLoading(false)
        }
    }
//RESPONSAVEL POR DESLOGAR O USUARIO REINICIANDO O ESTADO DE USUARIO LOGADO
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        //COMPARTILHAMENTO DOS DADOS PARA O RESTO DA APLICAÇÃO
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}