export function CepRegex(){
    let cep = document.getElementById('cep').value;
    return cep
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
}