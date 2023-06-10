<template>
  <b-card class="bg-gray ">
    <div class="mt-2 mb-5 d-flex">
      <b-icon icon="map" font-scale="2" class="mr-2"></b-icon>
      <h3>Insira o destino e o peso</h3>
    </div>
    <div>
      <b-form @submit.prevent="onFormSubmit">
        <b-form-group id="destination-group" label="Destino" label-for="destination">
          <b-form-select id="destination" v-model="form.destination" :options="cities">
            <b-form-select-option disabled selected value="">Selecione o destino</b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group id="weight-group" label="Peso" label-for="weight">
          <b-form-input id="weight" type="number" step="0.01" v-model="form.weight" :options="cities"
            placeholder="Peso da carga em kg"></b-form-input>
        </b-form-group>
        <b-button type="submit" class="btn btn-info">Analisar</b-button>
      </b-form>
    </div>
  </b-card>
</template>

<script>
import eventBus from '@/utils/eventBus'
import {
  BButton,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormSelectOption,
  BIcon
} from 'bootstrap-vue'

export default {
  name: 'input-card',
  components: {
    BButton,
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormSelectOption,
    BIcon
  },
  props: ['cities'],
  data() {
    return {
      form: {
        destination: "",
        weight: ""
      }
    }
  },
  created() {
    eventBus.$on('clearData', () => {
      this.form.destination = ""
      this.form.weight = ""
    })
  },
  methods: {
    onFormSubmit() {
      if (this.form.destination == '' || this.form.weight == '') {
        this.$bvModal.show('modal')
      } else {
        eventBus.$emit('submitData', this.form)
      }
    }
  },
}
</script>
