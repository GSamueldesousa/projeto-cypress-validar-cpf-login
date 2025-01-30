import random

# Lista de CPFs considerados inválidos para validação
cpfs_falecidos_ou_menores = {"12345678909", "98765432100"}

# Função para calcular dígito verificador
def calcular_digito(cpf, multiplicador):
    soma = sum(int(cpf[i]) * (multiplicador - i) for i in range(len(cpf)))
    digito = (soma * 10) % 11
    return 0 if digito == 10 else digito

# Função para validar um CPF
def validar_cpf(cpf):
    # Remover caracteres não numéricos
    cpf = ''.join(filter(str.isdigit, cpf))
    if len(cpf) != 11 or cpf == cpf[0] * 11:  # Excluir CPFs de números repetidos como "11111111111"
        return False

    # Validar dígitos verificadores
    primeiro_digito = calcular_digito(cpf, 10)
    segundo_digito = calcular_digito(cpf, 11)

    # Verifica os dígitos e se está na lista de inválidos
    if cpf[-2:] == f"{primeiro_digito}{segundo_digito}" and cpf not in cpfs_falecidos_ou_menores:
        return True
    return False

# Função para gerar CPFs inválidos
def gerar_cpf_invalido():
    while True:
        cpf = "".join([str(random.randint(0, 9)) for _ in range(9)])  # Gerando apenas os primeiros 9 dígitos
        if not validar_cpf(cpf):
            return cpf + str(random.randint(0, 9))  # Adicionando o último dígito aleatório

# Gerar e salvar CPFs inválidos em um arquivo
try:
    with open("cypress/fixtures/cpfs_invalidos.txt", "w") as f:
        # Gerar 10 CPFs inválidos
        for _ in range(10):
            cpf_invalido = gerar_cpf_invalido()
            f.write(cpf_invalido + "\n")
            print(f"CPF Inválido Gerado: {cpf_invalido}")

        # Adicionar CPF válido no final
        cpf_valido = "35856495802"
        f.write(cpf_valido + "\n")
        print(f"CPF Válido Adicionado: {cpf_valido}")
except Exception as e:
    print(f"Erro ao salvar CPFs: {e}")
