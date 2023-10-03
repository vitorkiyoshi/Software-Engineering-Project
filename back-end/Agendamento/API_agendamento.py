from flask import request,Blueprint
from flask.json import jsonify
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__)))

import agendamento as AG

agendamentosBP = Blueprint('agendamentos', __name__)

@agendamentosBP.route('/getAgendamentos',methods=['GET'])
@jwt_required()
def getAgendamentos():
    key = get_jwt_identity()
    data = AG.encontra_agendamento(key)
    responseMapSuccess = {'status': 'Sucesso', 'message': 'OK.', 'data' : data}
    return jsonify(responseMapSuccess),200

@agendamentosBP.route('/setAgendamento',methods=['POST'])
@jwt_required()
def inserirAgendamento():
    cpf = get_jwt_identity()
    nome_hemocentro = request.form.get("Nome_Banco")
    data = request.form.get("Data")
    hora = request.form.get("Hora")

    print(f"{nome_hemocentro} {data} {hora}")
    responseSuccess = {'status': 'Sucesso', 'message': 'Sucesso ao agendar'}

    if AG.setAgendamento(cpf,nome_hemocentro,data,hora):
        dados = AG.encontra_agendamento(cpf)
    else:
        return False #Modificar para colocar response de que já existe agendamento
    return jsonify(responseSuccess),200

@agendamentosBP.route('/delAgendamento',methods=['DELETE'])
@jwt_required()
def deleteAgendamento():
    key = get_jwt_identity()
    AG.removeAgendamento(key)
    if not AG.encontra_agendamento(key):
        responseMapSuccess = {'status': 'Sucesso', 'message': 'Sucesso ao agendar'}
        return jsonify(responseMapSuccess),200
    else:
        responseMapSuccess = {'status': 'Sucesso', 'message': 'Erro, não existe agendamento'}
        return jsonify(responseMapSuccess),200