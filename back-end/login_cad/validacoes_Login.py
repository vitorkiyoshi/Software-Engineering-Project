from Pessoa import Pessoa 
from flask import jsonify
from flask_jwt_extended import create_access_token
import pandas as pd

def encontra_pessoa(cpf):
    banco = pd.read_csv('./csv/pessoas.csv',dtype = str)
    linha_pessoa = banco.loc[banco['CPF']==cpf]
    return dict(linha_pessoa.iloc[-1,:]) if (not linha_pessoa.empty) else False  

def buscar_pessoa(cpf,senha):
    usuario = encontra_pessoa(cpf,senha)

    #definindo usuario
    if not usuario:
        return False
    else:
        usuario["senha_conf"] = senha
        #definindo a partir do repositório
        pessoa = Pessoa(usuario)
        return pessoa.verificar_senha()

def verificar_login(cpf,senha):
    if not len(cpf) or not len(senha):
        return 10

    user = encontra_pessoa(cpf)

    if type(user) == bool:
        return 11

    user["senha_conf"] = senha
    pessoa = Pessoa(user)

    if not pessoa.verificar_senha():
        return 11
    else:
        return 200

def validacao_API(cpf,senha):
    val = (verificar_login(cpf,senha) == 200)

    responseLoginFail = {'status': 'Fail', 'message': 'Falha ao logar(usuário/senha incorretas).'}
    responseLoginSuccess = {'status': 'Sucesso', 'message': 'Sucesso ao logar'}

    if not val:
        return jsonify(responseLoginFail),401
    else:
        access_token = create_access_token(identity=cpf)
        return jsonify(access_token=access_token),200