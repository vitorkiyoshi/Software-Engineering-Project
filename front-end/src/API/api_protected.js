import axios from "axios";
import { getToken, destroyToken } from '../API/auth';

let url = "http://127.0.0.1:5000";
const API = axios.create({baseURL: url});

API.interceptors.request.use(async (options) => {
    options.headers["Content-Type"] = "application/json"
    options.headers["Authorization"] = `Bearer ${getToken}`
    return options
})

API.interceptors.response.use(
    res => { return res },
    error => {
        //destroyToken();   
    }
)

export const getMap = async () => {
    return API.get(`/map`).then(res => res)
}

export const getUser = async () => {
    return API.get(`/user/me`).then(res => res)
}

export const getHemocentros = async () => {
    return API.get(`/nomesHemocentros`).then(res => res)
}

export const getEstoque = async (hemocentro) => {
    return API.get(`/estoque/${hemocentro}`).then(res => res)
}

export const getAgendamentos = async () => {
    return API.get(`/getAgendamentos`).then(res => res)
}

export const deleteAgendamento = async () => {
    return API.delete(`/delAgendamento`).then(res => res)
}

export const addAgendamento = async (data,time,hemocentroSelected) => {


    const valores = {Nome_Banco:hemocentroSelected,Data:data,Hora:time}

    console.log(valores);

    var fdata = new FormData();
    for (var key in valores) 
        fdata.append(key, valores[key]);

    return API.post(`/setAgendamento`,fdata).then(res => res)
}