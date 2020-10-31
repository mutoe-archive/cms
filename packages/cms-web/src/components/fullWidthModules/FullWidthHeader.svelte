<template>
  <div class="full-width-header" style={styleToString(module.style)}>
    <div class="full-width-container">
      {#if module.title}
        <h2>{module.title}</h2>
      {/if}

      {#if module.subTitle}
        <h3>{module.subTitle}</h3>
      {/if}

      {#if module.body}
        <div class="body">{module.body}</div>
      {/if}

      {#if module.button1}
        <Button {...module.button1} />
      {/if}
      {#if module.button2}
        <Button {...module.button2} />
      {/if}
    </div>
  </div>
</template>

<script lang="ts">
import { styleToString } from 'src/utils'
import Button from '../button/Button.svelte'

export let module: UI.FullWidthHeaderModule
</script>

<style lang="scss">
.full-width-header {
  color: #fff;
  padding: 64px;

  h2 {
    margin-bottom: 16px;
  }

  .body {
    margin-bottom: 24px;
  }
}
</style>
