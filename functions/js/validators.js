// Funções de validação de entrada

function validarMinutos(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.startsWith('0')) {
        input.value = input.value.substring(1);
    }
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
    }
}

function validarSegundos(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
    }
    if (input.value > 59) {
        input.value = 59;
    }
}

function validarArtistas(input) {
    // Remove caracteres não numéricos (caso o usuário digite algo estranho)
    input.value = input.value.replace(/[^0-9]/g, '');

    // Converte para número
    let valor = parseInt(input.value, 10);

    // Se não for um número válido, define como 0
    if (isNaN(valor)) {
        valor = 0;
    }

    // Limita o valor máximo a 15
    if (valor > 15) {
        valor = 15;
    }

    // Atualiza o campo com o valor corrigido
    input.value = valor;
}