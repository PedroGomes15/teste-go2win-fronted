<template>
  <div class="transaction-container">
    <h2>Listagem de Transferências</h2>
    <table class="transaction-table">
      <thead v-if="isLargeScreen">
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
      <tbody v-if="isLargeScreen">
        <tr v-for="transferencia in transferencias" :key="transferencia.id">
          <td>{{ transferencia.id }}</td>
          <td>{{ formatCurrency(transferencia.amount) }}</td>
          <td>{{ formatCurrency(transferencia.taxAmount) }}</td>
          <td>{{ transferencia.fromAccount }}</td>
          <td>{{ transferencia.destinyAccount }}</td>
          <td>{{ transferencia.transferDate }}</td>
          <td>{{ transferencia.createdAt }}</td>
        </tr>
      </tbody>
      <tbody v-if="!isLargeScreen">
        <tr v-for="transferencia in transferencias" :key="transferencia.id">
          <td>
            {{ transferencia.destinyAccount }} ({{ transferencia.createdAt }})<br />
            <span class="transaction-id">{{ transferencia.id }}</span>
          </td>
          <td class="td-transaction-value">
            {{ formatCurrency(transferencia.amount) }} <br />
            <span class="transaction-tax-amount">{{
              formatCurrency(transferencia.taxAmount)
            }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/transaction">
      <CustomButton>Criar Nova Transferência</CustomButton>
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
      transferencias: [],
      windowWidth: window.innerWidth
    }
  },
  computed: {
    isLargeScreen() {
      return this.windowWidth > 768
    }
  },
  created() {
    // Exemplo de dados de transferências (simulado)
    this.transferencias = [
      {
        id: 'eb5af113-5c5f-4ee0-8fca-24953cab6ca6',
        createdAt: '2024-06-22',
        fromAccount: '123123123',
        destinyAccount: '123123123',
        amount: 100.0,
        taxAmount: 6.8999996,
        transferDate: '2024-07-15'
      },
      {
        id: 'eb5af113-5c5f-4ee0-8fca-24953cab6ca6',
        createdAt: '2024-06-22',
        fromAccount: '123123123',
        destinyAccount: '123123123',
        amount: 100.0,
        taxAmount: 6.8999996,
        transferDate: '2024-07-15'
      }
    ]
    window.addEventListener('resize', this.updateWindowWidth)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    formatCurrency(amount) {
      return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
  }
}
</script>

<style scoped>
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
