// Cálculo do orçamento e atualização de cores

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
}

function calcular() {
    const minVal = document.getElementById('min').value;
    const min = parseInt(minVal) || 0;
    const seg = parseInt(document.getElementById('seg').value) || 0;
    const art = parseInt(document.getElementById('artistas').value) || 1;
    const tempoTotalSegundos = (min * 60) + seg;
    
    let total = 0;
    
    if (min > 0) {
        let valorTempo = 100;
        if (tempoTotalSegundos > 239) {
            const tempoExcedente = tempoTotalSegundos - 239;
            valorTempo = 100 + (Math.ceil(tempoExcedente / 30) * config.por_minuto);
        }
        
        // Nova lógica: cobra R$ 20,00 por artista adicional a partir do 3º
        const adicionaisArtistas = art >= 3 ? (art - 2) * config.por_artista : 0;
        
        total = valorTempo + adicionaisArtistas;
    }

    document.getElementById('display-total').innerText = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    atualizarCores(total);
}

function atualizarCores(valor) {
    const box = document.getElementById('box-total');
    const ratio = Math.min(valor / config.limite_cor, 1);
    const corA = hexToRgb(config.cor_inicial);
    const corB = hexToRgb(config.cor_final);
    const r = Math.round(corA.r + (corB.r - corA.r) * ratio);
    const g = Math.round(corA.g + (corB.g - corA.g) * ratio);
    const b = Math.round(corA.b + (corB.b - corA.b) * ratio);
    box.style.background = `rgb(${r}, ${g}, ${b})`;
    document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);
    box.style.color = ((r * 299 + g * 587 + b * 114) / 1000) < 128 ? 'white' : '#052c14';
}