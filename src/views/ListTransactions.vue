<template>
  <div class="main-container">
    <div class="transaction-container" v-if="transactions.length > 0">
      <h2>Listagem de Transferências</h2>
      <table class="transaction-table" v-if="isLargeScreen">
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor</th>
            <th>Taxa</th>
            <th>Origem</th>
            <th>Destino</th>
            <th>Agendamento</th>
            <th>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>{{ transaction.id }}</td>
            <td>{{ formatCurrency(transaction.amount) }}</td>
            <td>{{ formatCurrency(transaction.taxAmount) }}</td>
            <td>{{ transaction.fromAccount }}</td>
            <td>{{ transaction.destinyAccount }}</td>
            <td>{{ formatDate(transaction.transferDate) }}</td>
            <td>{{ formatDate(transaction.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
      <table class="transaction-table" v-if="!isLargeScreen">
        <thead>
          <tr>
            <th>Destino (Data de Criação)<br /><span class="transaction-id">ID</span></th>
            <th class="td-transaction-value">
              Valor<br /><span class="transaction-tax-amount">Taxa</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="!isLargeScreen">
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td>
              {{ transaction.destinyAccount }} ({{ formatDate(transaction.createdAt) }})<br />
              <span class="transaction-id">{{ transaction.id }}</span>
            </td>
            <td class="td-transaction-value">
              {{ formatCurrency(transaction.amount) }} <br />
              <span class="transaction-tax-amount">{{
                formatCurrency(transaction.taxAmount)
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Nenhuma transferencia foi criada ainda</div>
    <router-link to="/transaction">
      <CustomButton>Criar Nova Transferência</CustomButton>
    </router-link>
  </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'
import { formatCurrency, formatDate } from '@/util/utils'
import { listTransfers } from '@/services/api'

export default {
  components: {
    CustomButton
  },
  data() {
    return {
      transactions: [],
      windowWidth: window.innerWidth
    }
  },
  computed: {
    isLargeScreen() {
      return this.windowWidth > 768
    }
  },
  created() {
    this.loadTransactionList()
    window.addEventListener('resize', this.updateWindowWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    formatCurrency,
    formatDate,
    async loadTransactionList() {
      const transfersList = await listTransfers()
      console.log('TransferList', transfersList)
      this.transactions = transfersList
    }
  }
}
</script>

<style scoped>
.main-container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.transaction-container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.transaction-table th {
  background-color: var(--primary-color);
  color: var(--vt-c-white);
}

.transaction-table th,
.transaction-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.btn-criar {
  background-color: #45a049;
  color: white;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  border-radius: 15px;
  font-size: 16px;
}

.btn-criar:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .transaction-id {
    font-weight: 100;
    font-size: 12px;
  }

  .transaction-tax-amount {
    font-weight: bold;
    font-size: 12px;
  }

  .transaction-table th,
  .transaction-table td {
    border: none;
    padding: 4px;
    text-align: left;
  }

  .transaction-table tr {
    border: 1px solid #ccc;
  }

  .td-transaction-value {
    text-align: center !important;
  }
}
</style>
