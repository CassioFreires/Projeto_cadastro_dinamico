export function TellRegex() {
    let telefone = document.getElementById('telefone').value;
    return telefone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})/, '$1-$2')
}
