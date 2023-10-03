import math
from pathlib import Path
import pandas as pd

import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__)))

from hemocentro import Hemocentro

class HemocentrosDB:

    def __init__(self) -> None:
        self.table = []
        self.nomes = []
        script_location = Path(__file__).absolute().parent
        self.file_location=  script_location / "hemocentros.csv"
        self.__csvfile = open(self.file_location, newline='\n', encoding= 'utf-8')
        self.__num_lines = sum(1 for _ in self.__csvfile)
        self.__csvfile.seek(0,0)

        self.campos = self.__csvfile.readline().replace("\r\n","").split(";") #descarta a primeira linha

        for _ in range(self.__num_lines-1):
            item = self.__csvfile.readline().replace('\r\n','').split(';')
            self.add_hemocentro_csv(item)

        self.__csvfile.close()
    #Retornar lista estoque a partir de nome
    #Retornar nome de todos os hemocentros
    def getAllNames(self):
        return self.nomes

    def getAllSuppy(self, nome):
        for i in range(len(self.nomes)):
            if self.nomes[i] == nome:
                return self.table[i].estoque

    def add_hemocentro_csv(self, item) -> None:
        self.nomes.append(item[0])

        camposSangue = {}

        for i in range(4,12):
            camposSangue[self.campos[i]] = int(item[i])

        estoque = camposSangue
        
        item[1] = (float(item[1]), float(item[2]))
        item.pop(2)
        hemo = Hemocentro(item[0], item[1], estoque)
        self.table.append(hemo)

    def GetSupply(self, hemo_tipo): #entrada eh um vetor do tipo [indice do hemocentro a ser atualizado, indice do tipo sanguineo]
        hemo = self.table[hemo_tipo[0]]
        estoque = hemo.estoque[hemo_tipo[1]]
        return(int(estoque))
    
    def SetSupply(self, hemo_tipo): #entrada eh um vetor do tipo [indice do hemocentro a ser atualizo, indice do tipo sanguineo, numero de bolsas de sangue]
        if not isinstance(hemo_tipo[0],int) or not isinstance(hemo_tipo[1],int) or not isinstance(hemo_tipo[2],int):
            raise(TypeError)
        if (hemo_tipo[2]<0):
            return False
        #atualiza o arquivo
        df = pd.read_csv(self.file_location,sep=';')
        df.iat[hemo_tipo[0],hemo_tipo[1]+4] = hemo_tipo[2]
        df.to_csv(self.file_location, index=False,sep=';')
        #atualiza a table
        self.table[hemo_tipo[0]].estoque[hemo_tipo[1]] = hemo_tipo[2]
        return True
