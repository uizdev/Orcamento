// Gerenciamento do calendário (Flatpickr)

let fp;

function initFlatpickr() {
    if (fp) fp.destroy();
    
    fp = flatpickr("#data_entrega", {
        minDate: "today",
        locale: "pt",
        dateFormat: "d/m/Y",
        enableTime: false,
        time_24hr: false,
        onValueUpdate: (selectedDates, dateStr, instance) => {
            instance.close();
        },
        onOpen: () => document.getElementById('calendar-overlay').classList.add('active'),
        onClose: () => {
            document.getElementById('calendar-overlay').classList.remove('active');
            calcular();
        }
    });
}

function fecharCalendario() {
    if (fp) fp.close();
}