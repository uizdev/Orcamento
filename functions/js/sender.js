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

    // 1. Monta a mensagem com quebras de linha limpas
    const textoMensagem = `*--- NOVO ORÇAMENTO ---*\n` +
        `*Faixa:* ${faixa}\n` +
        `*Cliente:* ${nome}\n` +
        `*Duração:* ${min}m ${seg}s\n` +
        `*Artistas:* ${art}\n` +
        `*Prazo:* ${dataEntrega}\n` +
        `*Valor Estimado:* ${total}`;

    // 2. Link universal (suporta WhatsApp e WhatsApp Business) com sanitização de caracteres
    const urlZap = `https://wa.me/5581991347440?text=${encodeURIComponent(textoMensagem)}`;

    // 3. Envia para a planilha em segundo plano (sem travar a interface)
    if (window.urlPlanilha) {
        fetch(window.urlPlanilha, {
            method: 'POST',
            mode: 'no-cors',
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
        }).catch(err => console.error("Erro no envio para a planilha:", err));
    }

    // 4. Redireciona para o WhatsApp imediatamente na mesma janela
    window.location.href = urlZap;
}