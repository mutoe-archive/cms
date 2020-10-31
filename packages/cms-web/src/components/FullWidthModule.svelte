<template>
  {#if module.type === 'full-width-header'}
    <FullWidthHeader {module} />
  {/if}
</template>

<script lang="ts">
import FullWidthHeader from './fullWidthModules/FullWidthHeader.svelte'

export let module: UI.FullWidthModule
</script>

<style lang="scss"></style>
