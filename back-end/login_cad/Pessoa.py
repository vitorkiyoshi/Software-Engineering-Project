import pandas as pd

class Pessoa:
    def __init__(self, dict_pessoa):
        self.name = dict_pessoa["Nome"]
        self.cpf = dict_pessoa["CPF"]
        self.senha = dict_pessoa["senha"]
        self.senha_conf = dict_pessoa["senha_conf"]
        self.tipoSanguineo = dict_pessoa["tipoSanguineo"]
        self.endereco = dict_pessoa["Endereco"]
    
    def cadastrar(self):
        string= f'\n{self.name},{self.cpf},{self.senha},{self.tipoSanguineo},{self.endereco}'
        banco = open("csv/pessoas.csv", "a")
        banco.write(string)
        banco.close()
    
    def verificar_cpf(self):
        banco = pd.read_csv('csv/pessoas.csv')
        return (self.cpf in banco['CPF'])

    def verificar_senha(self):
        return (self.senha == self.senha_conf)