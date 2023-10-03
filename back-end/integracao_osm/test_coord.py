import unittest
from mapa import Mapa

class TestAdress(unittest.TestCase):
    def test_valid_address(self):
        self.assertEqual(Mapa(
            "Rua Luverci Pereira de Souza 123 Barao Geraldo Campinas").coords, [-22.8109051, -47.0771168])
        self.assertEqual(Mapa(
            "Campinas").coords, [-22.90556, -47.06083])
        self.assertEqual(Mapa(
            "Penedo RJ").coords, [-22.4409531, -44.5240711])   
            

    def test_invalid_address(self):
        with self.assertRaises(ValueError):
            origin = Mapa("Rua Luverci Peira de Souza 123 Barao Geraldo Campinas").coords
        with self.assertRaises(ValueError):
            origin = Mapa("London System Chess").coords

            
    def test_invalid_input(self):
        with self.assertRaises(ValueError):
            origin = Mapa(" ").coords
        with self.assertRaises(ValueError):
            origin = Mapa("\n").coords

if __name__ == '__main__':
    unittest.main()
