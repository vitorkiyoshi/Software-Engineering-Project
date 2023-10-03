from flask import request
from flask import Blueprint
from flask import jsonify

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

import codecs

from login_cad.validacoes_Login import encontra_pessoa

import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__)))

from mapa import Mapa
mapBP = Blueprint('map', __name__)

# retorna mapa do usuario
@mapBP.route('/map',methods=['GET'])
@jwt_required()
def mapa():
    user = get_jwt_identity()

    pessoa = encontra_pessoa(user)

    user_map = Mapa(pessoa["Endereco"])    
    user_map.salvar_mapa()
    
    f = codecs.open(f'{os.path.dirname(__file__)}/Map.html','r')

    responseMapSuccess = {'status': 'Sucesso', 'message': 'Mapa retornado com sucesso', 'data' : f.read()}

    return jsonify(responseMapSuccess),200