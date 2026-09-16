// Envio para WhatsApp e planilha
function enviarZap() {
    const nome = document.getElementById('nome_usuario').value;
    const faixa = document.getElementById('nome_faixa').value;
    const total = document.getElementById('display-total').innerText;
    const min = document.getElementById('min').value || "0";
    const seg = document.getElementById('seg').value || "0";
    const art = document.getElementById('artistas').value;
    const dataEntrega = document.getElementById('data_entrega').value;

    if (!nome) {
        alert("Por favor, digite seu nome.");
        return;
    }
    if (!faixa) {
        alert("Por favor, digite o nome da faixa.");
        return;
    }
    if (!dataEntrega) {
        alert("Por favor, selecione uma data.");
        return;
    }

    // 1. Envia para a planilha silenciosamente no fundo
    fetch(window.urlPlanilha, {
        method: 'POST',
        mode: 'no-cors', // Impede erro de bloqueio do navegador
        headers: {
            'Content-Type': 'text/plain;charset=utf-8' 
        },
        body: JSON.stringify({
            data: dataEntrega,
            nome: nome,
            faixa: faixa,
            valor: total,
            detalhes: `Faixa: ${faixa} | Duração: ${min}m ${seg}s | Artistas: ${art}`
        })
    }).then(() => {
        // 2. Abre o WhatsApp logo em seguida
        const msg = `*--- NOVO ORÇAMENTO ---*%0A*Faixa:* ${faixa}%0A*Cliente:* ${nome}%0A*Duração:* ${min}m ${seg}s%0A*Artistas:* ${art}%0A*Prazo:* ${dataEntrega}%0A*Valor Estimado:* ${total}`;
        window.open(`https://wa.me/5581991347440?text=${msg}`, '_blank');
    }).catch(err => {
        console.error("Erro no envio para a planilha:", err);
    });
}