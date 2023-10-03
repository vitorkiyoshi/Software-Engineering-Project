from mapa import Mapa
from gps import GPS
import unittest

#Casos de teste referentes as coordenadas:
#Latitude: Entre -60 e -10; Longitude: Entre -80 e -20

class TestMapMethods(unittest.TestCase):
    def test_valid(self):
        self.assertEqual(Mapa("Guarulhos").coords, Mapa("Guarulhos").address_to_coords("Guarulhos"))

        self.assertEqual(Mapa("Campinas").coords, Mapa("Campinas").address_to_coords("Campinas"))

    def test_invalid_input_size(self):
        with self.assertRaises(ValueError):
            m = Mapa("")

    def test_invalid_type(self):
        with self.assertRaises(ValueError):
            m = Mapa([-45])
        
        with self.assertRaises(ValueError):
            m = Mapa([-30, "coord"])

    def test_invalid_range(self):
        with self.assertRaises(ValueError):
            m = Mapa("London")

        with self.assertRaises(ValueError):
            m = Mapa("Moscow")

        with self.assertRaises(ValueError):
            m = Mapa("Ankara")

        with self.assertRaises(ValueError):
            m = Mapa("Dublin")
              

if __name__ == '__main__':
    unittest.main()