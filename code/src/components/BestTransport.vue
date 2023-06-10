<template>
  <div class="title">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand class="ml-2">
        <b>{{ appName }}</b>
      </b-navbar-brand>
    </b-navbar>
    <b-container class="pt-5">
      <b-row>
        <b-col cols="12" md="6">
          <InputCard :cities="cities" />
        </b-col>
        <b-col cols="12" md="6" class="pt-3 pt-md-0">
          <ResultCard :cheaper="cheaper" :faster="faster" />
        </b-col>
      </b-row>
    </b-container>
    <DefaultModal v-show="showModal" />
  </div>
</template>

<script>
import {
  BNavbar,
  BNavbarBrand,
  BContainer,
  BRow,
  BCol
} from 'bootstrap-vue'
import InputCard from '@/components/InputCard.vue'
import ResultCard from '@/components/ResultCard.vue'
import DefaultModal from '@/components/Modal.vue'
import eventBus from '@/utils/eventBus'

export default {
  name: 'best-transport',
  components: {
    BContainer,
    BRow,
    BCol,
    BNavbar,
    BNavbarBrand,
    InputCard,
    ResultCard,
    DefaultModal
  },
  data() {
    return {
      appName: 'Melhor Frete',
      dataArray: [],
      filteredTransports: [],
      cheaper: {},
      faster: {},
      showModal: false
    }
  },
  created() {
    fetch('http://localhost:3000/transport')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response wasn\'t Ok')
        }
        return response.json()
      })
      .then(data => this.dataArray = data)

    eventBus.$on('clearData', () => {
      this.cheaper = {}
      this.faster = {}
    })

    eventBus.$on('submitData', ({ destination, weight }) => {
      this.filterResults(destination, weight)
    })

    eventBus.$on('showWarningModal', () => this.showModal = !this.showModal)
  },
  computed: {
    cities() {
      const uniqueCities = new Set([])
      this.dataArray.forEach(transport => {
        uniqueCities.add(transport.city)
      })
      return Array.from(uniqueCities)
    },
    formattedData() {
      return this.dataArray.map(el => ({
        "id": el.id,
        "name": el.name,
        "cost_transport_light": Number(el.cost_transport_light.slice(3)),
        "cost_transport_heavy": Number(el.cost_transport_heavy.slice(3)),
        "city": el.city,
        "lead_time": Number(el.lead_time.replace(/\D/, ''))
      }))
    }
  },
  methods: {
    filterResults(city, weight) {
      this.filteredTransports = this.formattedData.filter(el => el.city == city)
      this.cheaper = this.findCheaperTransport(this.filteredTransports, weight)
      this.faster = this.findFasterTransport(this.filteredTransports)
    },

    findCheaperTransport(transports, weight) {
      let cheaper = transports[0]

      transports.forEach(transport => {
        if (weight < 100) {
          if (transport.cost_transport_light < cheaper.cost_transport_light)
            cheaper = transport
        } else {
          if (transport.cost_transport_heavy < cheaper.cost_transport_heavy)
            cheaper = transport
        }
      })

      return cheaper
    },

    findFasterTransport(transports) {
      let faster = transports[0]

      transports.forEach(transport => {
        if (transport.lead_time < faster.lead_time)
          faster = transport
      })
      return faster
    },
  },
}
</script>
