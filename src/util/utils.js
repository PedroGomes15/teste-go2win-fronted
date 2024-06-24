import { format, parseISO } from 'date-fns'

export function formatCurrency(amount) {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatDate(dateString) {
  if (!dateString) return '' // Verifica se dateString está definido

  try {
    const date = parseISO(dateString)

    // Verifica se a data contém uma parte de tempo
    const isDateTime = dateString.includes('T')

    if (isDateTime) {
      // Formato com hora:minuto:segundo dia/mês/ano
      return format(date, 'HH:mm:ss dd/MM/yyyy')
    } else {
      // Formato apenas dia/mês/ano
      return format(date, 'dd/MM/yyyy')
    }
  } catch (error) {
    console.error('Invalid date string:', dateString)
    return dateString
  }
}
