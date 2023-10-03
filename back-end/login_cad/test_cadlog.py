import unittest
import validacoes_Cadastro
import validacoes_Login

### TESTES CADASTRO ###
# testes de nome
class TestNome(unittest.TestCase):
    def test_empty(self):
        self.assertEqual(validacoes_Cadastro.validacao_Nome(""),23,"")
    def test_complete(self):
        self.assertEqual(validacoes_Cadastro.validacao_Nome("Joao"),23,"")
    def test_max(self):
        self.assertEqual(validacoes_Cadastro.validacao_Nome("daoidjawioj daoidjawioj daoidjawioj daoidjawioj daoidjawioj"),24,"")
    def test_invalid(self):
        self.assertEqual(validacoes_Cadastro.validacao_Nome("Jo@o Silva"),25,"")
    def test_ok(self):
        self.assertEqual(validacoes_Cadastro.validacao_Nome("Joao Silva"),200,"")

# testes de cpf
class TestCPF(unittest.TestCase):
    def test_empty(self):
        self.assertEqual(validacoes_Cadastro.validacao_cpf(""),31,"")
    def test_short(self):
        self.assertEqual(validacoes_Cadastro.validacao_cpf("123.456"),32,"")
    def test_invalid(self):
        self.assertEqual(validacoes_Cadastro.validacao_cpf("123.ABC.456-00"),32,"")
    def test_invalid2(self):
        self.assertEqual(validacoes_Cadastro.validacao_cpf("111.111.111-11"),32,"")
    def test_ok(self):
        self.assertEqual(validacoes_Cadastro.validacao_cpf("772.676.667-01"),200,"")

# testes de sangue
class TestSangue(unittest.TestCase):
    def test_empty(self):
        self.assertEqual(validacoes_Cadastro.validacao_Sangue(""),40,"")
    def test_invalid(self):
        self.assertEqual(validacoes_Cadastro.validacao_Sangue("T+"),41,"")
    def test_ok(self):
        self.assertEqual(validacoes_Cadastro.validacao_Sangue("A+"),200,"")

# testes de senha
class TestSenha(unittest.TestCase):
    def test_short(self):
        self.assertEqual(validacoes_Cadastro.validacao_Senha("abcd","abcd"),50,"")
    def test_weak(self):
        self.assertEqual(validacoes_Cadastro.validacao_Senha("abcdefgh","abcdefgh"),51,"")
    def test_diff(self):
        self.assertEqual(validacoes_Cadastro.validacao_Senha("qwerty123@","qwerty123#"),52,"")
    def test_ok(self):
        self.assertEqual(validacoes_Cadastro.validacao_Senha("qwerty123@","qwerty123@"),200,"")

### TESTES LOGIN ###
class TestLOG(unittest.TestCase):
    def test_empty(self):
        self.assertEqual(validacoes_Login.verificar_login("",""),10,"")
    def test_wrong_cpf(self):
        self.assertEqual(validacoes_Login.verificar_login("AAA.AAA.AAA-AA","234"),11,"")
    def test_wrong_pass(self):
        self.assertEqual(validacoes_Login.verificar_login("444.444.444-44","ddfdg"),11,"")
    def test_ok(self):
        self.assertEqual(validacoes_Login.verificar_login("444.444.444-44","234"),200,"")

if __name__ == "__main__":
    unittest.main()