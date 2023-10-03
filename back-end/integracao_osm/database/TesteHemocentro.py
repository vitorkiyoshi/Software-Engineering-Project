import unittest

from hemocentrosdb import HemocentrosDB

class TestGetBloodSupply(unittest.TestCase):
    
    def testGetSupplyInRange(self):
        '''
        Testa pegar o valor do estoque de sangue A+ do primeiro hemocentro
        '''
        H = HemocentrosDB()
        values = [0,0]
        self.assertEqual(H.GetSupply(values),0)

    def testWrongType(self):
        '''
        Testa uma entrada em que não se recebe inteiros
        '''
        H = HemocentrosDB()
        values = [3.5,0]
        with self.assertRaises(TypeError):
            H.GetSupply(values)

    def testOutOfRange(self):
        '''
        Testa pegar um valor do estoque de um hemocentro não existente
        '''
        H = HemocentrosDB()
        values = [999,0]
        with self.assertRaises(IndexError):
            H.GetSupply(values)

class TestSetBloodSupply(unittest.TestCase):
    
    def testSetSupplyInRange(self):
        '''
        Testa Settar o valor do estoque de sangue A+ do primeiro hemocentro para 6
        '''
        H = HemocentrosDB()
        values = [0,0,6]
        self.assertTrue(H.SetSupply(values))
        H.SetSupply([0,0,0]) # volta para 0 para que outros testes não tenham problemas

    def testWrongType(self):
        '''
        Testa uma entrada em que não se recebe inteiros
        '''
        H = HemocentrosDB()
        values = [0,0,'banana']
        with self.assertRaises(TypeError):
            H.SetSupply(values)

    def testNegative(self):
        '''
        Testa uma entrada em que se recebe um numero negativo de bolsas de sangue
        '''
        H = HemocentrosDB()
        values = [0,0,-3]
        self.assertFalse(H.SetSupply(values))
    
    def testOutOfRange(self):
        '''
        Testa setar um valor do estoque impossivel
        '''
        H = HemocentrosDB()
        values = [0,999,0]
        with self.assertRaises(IndexError):
            H.SetSupply(values)

if __name__ == '__main__':
    unittest.main()

