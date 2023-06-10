<template>
  <b-row class="p-0 border border-info rounded flex-wrap">
    <b-col cols="12" md="8" class="p-0 d-flex">
      <div class="px-3 py-3 d-flex align-items-center justify-content-center bg-info">
        <slot name="icon" />
      </div>
      <div class="pl-3 py-2">
        <slot name="leftContent" />
      </div>
    </b-col>
    <b-col cols="12" md="4" class="py-2">
      <slot name="rightContent" />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'result-item'
}
</script>
