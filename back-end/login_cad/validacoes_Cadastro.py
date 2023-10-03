import re
from flask import jsonify
from Pessoa import Pessoa

def validacao_Nome(string_recebida):
    if string_recebida=="":
        return 23
    else:
        nome = string_recebida.split()
        carac_especial = re.findall("[^a-zA-Z ]",string_recebida)
        if len(nome)==1:
            return 23
        elif len(string_recebida) > 50:
            return 24
        elif not len(carac_especial) == 0:
            return 25
        else:
            return 200

def validacao_cpf(string_cpf):
    if string_cpf=="":
        return 31
    elif not len(string_cpf)==14:
        return 32
    else:
        caracteres = re.findall("[^0-9-.]",string_cpf)
        if not len(caracteres) == 0:
            return 32
        else:
            d=[0 for i in range(11)]
            d[0]=int(string_cpf[0])
            d[1]=int(string_cpf[1])
            d[2]=int(string_cpf[2])
            d[3]=int(string_cpf[4])
            d[4]=int(string_cpf[5])
            d[5]=int(string_cpf[6])
            d[6]=int(string_cpf[8])
            d[7]=int(string_cpf[9])
            d[8]=int(string_cpf[10])
            d[9]=int(string_cpf[12])
            d[10]=int(string_cpf[13])
            sum=0
            for i in range(10,1,-1):
                sum+= d[10-i]*(i)
            rest = (sum*10)%11
            if rest == 10:
                rest = 0
            if (not rest == d[9]) or d.count(d[0])==len(d):
                return 32
            else:
                sum=0
                for i in range(10,0,-1):
                    sum+= d[10-i]*(i+1)
                rest = (sum*10)%11
                if rest == 10:
                    rest = 0
                if not rest==d[10]:
                    return 32
                else:
                    return 200

def validacao_Sangue(string_sangue):
    tipos = ["O+","O-","A+","A-","AB+","AB-","B+","B-"] 
    if string_sangue in tipos:
        return 200
    if not len(string_sangue):
        return 40
    return 41

def validacao_Senha(string_s1, string_s2):
    if len(string_s1) < 8:
        return 50
    if not re.search("(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])",string_s1):
        return 51
    if string_s1 != string_s2:
        return 52
    return 200

def validacao_API(usuario):
    responseCadSuccess = {'status': 'Sucesso', 'message': 'Sucesso ao Cadastrar'}
    responseCadFail = {'status': 'Fail', 'message': 'Falha, verifique os dados preeenchidos'}

    pessoa = Pessoa(usuario)

    val = (validacao_Nome(pessoa.name) == 200)
    val = val and (validacao_cpf(pessoa.cpf)  == 200)
    val = val and (validacao_Sangue(pessoa.tipoSanguineo) == 200)
    val = val and (validacao_Senha(pessoa.senha, pessoa.senha_conf) == 200)

    if val:
        pessoa.cadastrar()
        return jsonify(responseCadSuccess),200
    return jsonify(responseCadFail),401