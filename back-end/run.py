from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from login_cad.Cadastro_Login import cadlogBP
from integracao_osm.API_mapa import mapBP
from integracao_osm.database.API_Hemocentros import hemocentrosBP
from Agendamento.API_agendamento import agendamentosBP

app = Flask(__name__)
app.config["DEBUG"] = True
app.config["JWT_SECRET_KEY"] = "45y4h6h5465666^$%&%^&56ygf4"
jwt = JWTManager(app)
CORS(app)

@app.route('/')
def main():
    return "<h1> API Flask <h1>"

# adiciona sistema de login e cadastro
app.register_blueprint(cadlogBP)

# adiciona sistema de mapa
app.register_blueprint(mapBP)

# adiciona sistema dos hemocentros
app.register_blueprint(hemocentrosBP)

# adiciona sistema de agendamento
app.register_blueprint(agendamentosBP)

# inicia server para api
app.run()