## Para utilizar a função adress_to_coordinates, é preciso instalar o geopy

> pip install geopy

## A conversão da string adress para coordenadas pode dar problema caso o endereço seja escrito incorretamente. Para isso, podemos padronizar a entrada da seguinte forma: Rua + número + bairro + cidade

### Exemplo:

> adress = "Rua Roxo Moreira 1234 Barao Geraldo Campinas"