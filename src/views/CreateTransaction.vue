<template>
  <div class="create-transaction-container">
    <h2>Criar Nova Transferência</h2>
    <form @submit.prevent="handleCreateTransaction">
      <div class="form-group">
        <label for="origin">Conta de Origem</label>
        <input type="text" id="origin" v-model="newTransaction.origin" required />
      </div>
      <div class="form-group">
        <label for="destination">Conta de Destino</label>
        <input type="text" id="destination" v-model="newTransaction.destination" required />
      </div>
      <div class="form-group">
        <label for="amount">Valor</label>
        <CurrencyInput
          id="amount"
          v-model="newTransaction.amount"
          :options="{
            locale: 'pt-BR',
            currency: 'BRL',
            currencyDisplay: 'symbol',
            precision: 2,
            hideCurrencySymbolOnFocus: false,
            hideGroupingSeparatorOnFocus: false,
            hideNegligibleDecimalDigitsOnFocus: false,
            autoDecimalDigits: true,
            useGrouping: true,
            accountingSign: false
          }"
          required
        />
      </div>
      <div class="form-group">
        <label for="transactionDate">Data do Agendamento</label>
        <input
          type="date"
          id="transactionDate"
          v-model="newTransaction.transactionDate"
          @input="handleDateChange"
          required
        />
      </div>
      <div v-if="currentTax" class="tax-container">
        <p>Taxa da transação: {{ currentTax.tax }}%</p>
        <p v-if="currentTax.money > 0">Taxa fixa: {{ formatCurrency(currentTax.money) }}</p>
      </div>
      <CustomButton type="submit" :disabled="!isFormFilled">Criar Transferência</CustomButton>
    </form>
    <router-link to="/">
      <button class="btn-voltar">Voltar</button>
    </router-link>
  </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'
import CurrencyInput from '@/components/CurrencyInput.vue'
import { listTaxFromDate, createTransaction } from '@/services/api'
import { formatCurrency } from '@/util/utils'

export default {
  components: {
    CustomButton,
    CurrencyInput
  },
  data() {
    return {
      newTransaction: {
        origin: '',
        destination: '',
        amount: null,
        transactionDate: ''
      },
      currentTax: null,
      currencySettings: {
        locale: 'pt-BR',
        prefix: 'R$ ',
        autoDecimalMode: true
      }
    }
  },
  computed: {
    isFormFilled() {
      return (
        this.newTransaction.origin !== '' &&
        this.newTransaction.destination !== '' &&
        this.newTransaction.amount !== null &&
        this.newTransaction.transactionDate !== ''
      )
    }
  },
  methods: {
    async handleCreateTransaction() {
      const transaction = await createTransaction(this.newTransaction)
      if (transaction.id != null) {
        this.$router.push('/')
      } else {
        console.error('Transaction ', transaction)
      }
    },
    async handleDateChange() {
      const tax = await listTaxFromDate(this.newTransaction.transactionDate)
      if (tax.status && tax.status === 500) {
        alert(`Erro ao buscar taxa \n${tax.message}`)
        this.currentTax = null
        this.newTransaction.transactionDate = null
      } else {
        this.currentTax = tax
      }
    },
    formatCurrency
  }
}
</script>

<style scoped>
.create-transaction-container {
  min-width: 400px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.tax-container {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  gap: 5px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 0 0 3px -1px var(--vt-c-black-soft);

  p {
    font-style: italic;
    font-size: 14px;
  }
}

.btn-voltar {
  background-color: unset;
  color: var(--secondary-color);
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: block;
  width: 100%;
  margin-top: 10px;
  text-decoration: none;
}

.btn-voltar:hover {
  color: var(--secondary-color-hover);
}

@media (max-width: 768px) {
  .create-transaction-container {
    padding: 15px;
  }

  .btn-criar,
  .btn-voltar {
    padding: 10px;
  }
}
</style>
