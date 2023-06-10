<template>
  <b-modal id="modal" centered hide-footer hide-title>
    <div class="col-xs-1" align="center">
      <b-icon class="mx-auto" icon="info-square" font-scale="3" variant="info"></b-icon>
      <p class="my-4 text-center">Insira os valores para realizar a análise</p>
      <b-button class="" @click="$bvModal.hide('modal')" variant="info">Fechar</b-button>
    </div>
  </b-modal>
</template>

<script>
import { BButton, BIcon, BModal } from 'bootstrap-vue';

export default {
  name: 'default-modal',
  components: {
    BButton,
    BIcon,
    BModal,
  }
}
</script>
