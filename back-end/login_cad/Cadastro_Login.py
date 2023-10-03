from flask import request,Blueprint
from flask.json import jsonify
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__)))

import validacoes_Cadastro as VAL_C
import validacoes_Login as VAL_L

cadlogBP = Blueprint('cadlog', __name__)

# realiza login
@cadlogBP.route('/logar',methods=['POST'])
def login():
    cpf,password = request.form.get("CPF"),request.form.get("senha") # leitura de dados
    return VAL_L.validacao_API(cpf,password) # validacao

@cadlogBP.route('/user/me',methods=['GET'])
@jwt_required()
def perfil():
    user = get_jwt_identity()
    pessoa = VAL_L.encontra_pessoa(user)
    responseMapSuccess = {'status': 'Sucesso', 'message': 'Mapa retornado com sucesso', 'data' : pessoa}
    return jsonify(responseMapSuccess),200
# realiza cadastro
@cadlogBP.route('/cadastrar',methods=['POST'])
def cadastro():
    usuario = request.form.to_dict() # campos do formulario
    return VAL_C.validacao_API(usuario) # validacao