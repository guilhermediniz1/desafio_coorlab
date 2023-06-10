<template>
  <div class="h-100 d-flex justify-content-center align-items-center">
    <b-container v-if="showResults">
      <p>Estas são as melhores alternativas de frete que encontramos para você.</p>
      <b-container>
        <b-col class="mb-3">
          <ResultItem class="mb-2">
            <template #icon>
              <IconPig />
            </template>
            <template #leftContent>
              <strong>Frete com menor valor</strong>
              <p class="mb-0">Transportadora: {{ cheaper.name }}</p>
              <p class="mb-0">Tempo estimado: {{ cheaper.lead_time }}h</p>
            </template>
            <template #rightContent>
              <strong>Preço</strong>
              <p>{{ numberToCurrencyString(weight > 100 ? cheaper.cost_transport_heavy : cheaper.cost_transport_light, 'BRL') }}</p>
            </template>
          </ResultItem>
          <ResultItem>
            <template #icon>
              <IconClock />
            </template>
            <template #leftContent>
              <strong>Frete mais rápido</strong>
              <p class="mb-0">Transportadora: {{ faster.name }}</p>
              <p class="mb-0">Tempo estimado: {{ faster.lead_time }}h</p>
            </template>
            <template #rightContent>
              <strong>Preço</strong>
              <p>{{ numberToCurrencyString(weight > 100 ? faster.cost_transport_heavy : faster.cost_transport_light, 'BRL') }}</p>
            </template>
          </ResultItem>
        </b-col>
        <b-button class="btn btn-info" @click="onClearDataClick">Limpar</b-button>
      </b-container>
    </b-container>
    <p v-else class="text-center">Nenhum dado selecionado.</p>
  </div>
</template>

<script>
import ResultItem from './ResultItem.vue'
import IconPig from '../assets/icons/IconPig.vue'
import IconClock from '../assets/icons/IconClock.vue'

import eventBus from '@/utils/eventBus'
import { numberToCurrencyString } from '@/utils/utils'

export default {
  name: 'result-card',
  components: {
    ResultItem,
    IconPig,
    IconClock
  },
  props: ['cheaper', 'faster'],
  data() {
    const showResults = false
    const weight = 0
  
    return { showResults, weight }
  },
  created() {
    eventBus.$on('submitData', (form) => {
      this.showResults = true
      this.weight = form.weight
    })
  },
  methods: {
    onClearDataClick() {
      eventBus.$emit('clearData')
      this.showResults = false
    },
    numberToCurrencyString
  }
}
</script>
