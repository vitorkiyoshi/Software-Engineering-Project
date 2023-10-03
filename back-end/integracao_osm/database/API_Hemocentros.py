from flask import request,Blueprint
from flask.json import jsonify
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__)))

import hemocentrosdb as HM

hemocentrosBP = Blueprint('hemocentros', __name__)

@hemocentrosBP.route('/nomesHemocentros',methods=['GET'])
@jwt_required()
def getNomes():
    get_jwt_identity()
    hemocentro = HM.HemocentrosDB()
    data = hemocentro.getAllNames()
    responseMapSuccess = {'status': 'Sucesso', 'message': 'OK.', 'data' : data}
    return jsonify(responseMapSuccess),200

@hemocentrosBP.route('/estoque/<nome_hemocentro>',methods=['GET'])
@jwt_required()
def getEstoque(nome_hemocentro):
    get_jwt_identity()
    hemocentros = HM.HemocentrosDB()
    data = hemocentros.getAllSuppy(nome_hemocentro)
    
    JSONdata = []

    ctd = 0
    for blood in data:
        obj = {
            "id":ctd,
            "tipo":blood,
            "estoque": data[blood]   
        }

        JSONdata.append(obj)
        ctd += 1

    responseMapSuccess = {'status': 'Sucesso', 'message': 'OK.', 'data' : JSONdata}
    return jsonify(responseMapSuccess),200