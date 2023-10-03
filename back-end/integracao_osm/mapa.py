import math
import folium

import sys,os
sys.path.append(os.path.join(os.path.dirname(__file__)))

from database.hemocentrosdb import HemocentrosDB
from geopy.geocoders import Nominatim

class Mapa:
    
    def __init__(self, address) -> None:
        origin = self.address_to_coords(address)
        if(len(origin)!=2):
            raise ValueError("Coordenadas devem conter valores para latitude e longitude")
        if ((type(origin[0])!=float and type(origin[0])!=int) or (type(origin[1])!= float and type(origin[1])!= int)):
            raise ValueError("Coordenadas devem ser valores numericos")
        
        if((origin[0] < -60 or origin[0]>-10) or (origin[1]<-80 or origin[1]>-20)):
            raise ValueError("Localizacao invalida, coordenadas devem estar na America do Sul")   

             
        self.coords=origin
        self.mapa=folium.Map(location=origin, zoom_start=11, tiles='OpenStreetMap')
        self.hemocentros=HemocentrosDB()
        self.add_hemocentros()
        self.add_usuario_ao_mapa()
        self.show_nearest()
    
    def address_to_coords(self, address):
        geolocator = Nominatim(user_agent="hemosimples")
        location = geolocator.geocode(address)
        if location is None:
            raise ValueError("The address is not valid")
        latitude = location.latitude
        longitude = location.longitude
        origin = []
        origin.append(latitude)
        origin.append(longitude)
        return origin

    def add_hemocentros(self) ->None:
        for hem in self.hemocentros.table:
            coords= hem.coordenadas
            tag= "<i> {content}</i>".format(content=hem.nome) 
            folium.Marker(location=coords, popup=tag, icon=folium.Icon(color='lightgray', icon_color='red', icon='plus')).add_to(self.mapa)
    
    def add_usuario_ao_mapa(self) -> None:
        coords=self.coords
        tag= "<i> Sua localização </i>"
        folium.Marker(location=coords, popup=tag, icon=folium.Icon(color='blue', icon_color='red', icon='plus')).add_to(self.mapa) 


    def show_nearest(self) -> None:
        nearest_hemoc=self.nearest()
        nearest_coords=nearest_hemoc[1].coordenadas
        tag= "<i> {content}</i>".format(content=nearest_hemoc[1].nome) 
        marker=folium.Marker(location=nearest_coords, popup=tag,tooltip="Hemocentro mais próximo da sua localização" , icon=folium.Icon(color='green', icon_color='red', icon='plus')).add_to(self.mapa)

    def nearest(self, origin=None):
        if origin is None:
            origin = self.coords
        ret = [10**10,[]]
        lat1, lon1 = origin
        for hemocentr in self.hemocentros.table:
            lat2, lon2 = hemocentr.coordenadas

            dlat = math.radians(lat2 - lat1)
            dlon = math.radians(lon2 - lon1)
            a = (math.sin(dlat / 2) * math.sin(dlat / 2) +
                math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
                math.sin(dlon / 2) * math.sin(dlon / 2))
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
            d = 6371000 * c  # raio da Terra em metros
            if d < ret[0]:
                ret[0] = d
                ret[1] = hemocentr
        return ret

         
    def salvar_mapa(self) -> None:
        self.mapa.save(f'{os.path.dirname(__file__)}/Map.html')

