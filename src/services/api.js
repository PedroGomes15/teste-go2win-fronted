const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export function listTransfers() {
  return fetch(`${BASE_URL}/transaction`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching transaction:', error)
      throw error
    })
}

export function listTaxes() {
  return fetch(`${BASE_URL}/tax`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching fees:', error)
      throw error
    })
}

export function listTaxFromDate(date) {
  return fetch(`${BASE_URL}/tax/fromdate?date=${date}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching fees:', error)
      throw error
    })
}

export function createTransaction(newTransfer) {
  const transactionDTO = {
    fromAccount: newTransfer.origin,
    destinyAccount: newTransfer.destination,
    amount: newTransfer.amount,
    transferDate: newTransfer.transactionDate
  }

  return fetch(`${BASE_URL}/transaction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transactionDTO)
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error creating transfer:', error)
      throw error
    })
}
