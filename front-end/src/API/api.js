import axios from "axios";

let url = "http://127.0.0.1:5000";
const API = axios.create({baseURL: url});

API.interceptors.request.use(async (options) => {
    options.headers["Content-Type"] = "application/json"
    return options
})

API.interceptors.response.use(
    res => { return res },
    error => {
        throw error
    }
)

export const Logar = async (dados) => {
    return API.post(`/logar`,dados).then(res => res)
}

export const Cadastrar = async (dados) => {
    return API.post(`/cadastrar`, dados).then(res => res)
}