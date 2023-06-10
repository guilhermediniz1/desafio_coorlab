export function numberToCurrencyString(number, currency) {
  return Number(number).toLocaleString('pt-BR', { style: 'currency', currency })
}