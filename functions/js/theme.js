// Alternância de tema (claro/escuro)

function toggleTheme() {
    const body = document.body;
    const current = body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    document.getElementById('active-icon').innerText = newTheme === 'light' ? '☀' : '☾';
}