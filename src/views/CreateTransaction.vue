<template>
  <div class="create-transaction-container">
    <h2>Criar Nova Transferência</h2>
    <form @submit.prevent="criarTransferencia">
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
        <input type="number" id="amount" v-model="newTransaction.amount" required />
      </div>
      <div class="form-group">
        <label for="transactionDate">Transaction Date</label>
        <input type="date" id="transactionDate" v-model="newTransaction.transactionDate" required />
      </div>
      <CustomButton @click="handleCreateTransaction" type="submit" :disabled="!formPreenchido"
        >Criar Transferência</CustomButton
      >
    </form>
    <router-link to="/">
      <button class="btn-voltar">Voltar</button>
    </router-link>
  </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'

export default {
  components: {
    CustomButton
  },
  data() {
    return {
      newTransaction: {
        origin: '',
        destination: '',
        amount: null,
        taxAmount: null,
        transactionDate: ''
      }
    }
  },
  computed: {
    formFilled() {
      return (
        this.newTransaction.origin !== '' &&
        this.newTransaction.destination !== '' &&
        this.newTransaction.amount !== null &&
        this.newTransaction.taxAmount !== null &&
        this.newTransaction.transactionDate !== ''
      )
    }
  },
  methods: {
    handleCreateTransaction() {
      // Simulated logic to send the new transaction to the backend
      console.log('New Transaction:', this.newTransaction)
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.create-transaction-container {
  max-width: 600px;
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
