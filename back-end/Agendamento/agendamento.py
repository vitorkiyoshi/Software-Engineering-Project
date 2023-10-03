from flask import jsonify
import pandas as pd
import csv

import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__)))

def encontra_agendamento(cpf):
    banco = pd.read_csv(f'{os.path.dirname(__file__)}/agendamentos.csv',dtype = str)
    linha_agendamento = banco.loc[banco['CPF']==cpf]
    return dict(linha_agendamento.iloc[-1,:]) if (not linha_agendamento.empty) else False

def verificarAgendamento(cpf):
    banco = pd.read_csv(f'{os.path.dirname(__file__)}/agendamentos.csv',dtype = str)
    return cpf in banco['CPF']

def setAgendamento(cpf, nome_banco, data, hora):
    if verificarAgendamento(cpf):
        return False
    string = f'{cpf},{nome_banco},{data},{hora}\n'
    
    banco2 = open(f'{os.path.dirname(__file__)}/agendamentos.csv', "a")
    banco2.write(string)
    banco2.close()

    return True  

def removeAgendamento(cpf):
    listaAg = []

    with open(f'{os.path.dirname(__file__)}/agendamentos.csv',"r+") as arquivo:
        reader = csv.reader(arquivo)
        for row in reader:

            print(row)

            if row[0]!=cpf and len(row) > 0:
                listaAg.append(row)
    
    print(listaAg)

    os.remove(f'{os.path.dirname(__file__)}/agendamentos.csv')

    banco = open(f'{os.path.dirname(__file__)}/agendamentos.csv', "a")
    
    for coisa in listaAg:
        banco.write(','.join(map(str, coisa))+"\n")

    banco.close()