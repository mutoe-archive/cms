<template>
  {#if link}
    <a class="button" href={link}>
      {text}
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </a>
  {:else}
    <button class="button">
      {text}
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </button>
  {/if}
</template>

<script lang="ts">
export let text: string
export let link: string
</script>

<style lang="scss">
.button {
  position: relative;
  display: inline-block;
  margin: 0 0.5em 0 0;
  padding: .3em 1em;
  color: inherit;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.7em;
  white-space: nowrap;
  text-decoration: none;
  text-shadow: none;
  background-color: transparent;
  transition: all .2s;
  border: 2px solid;
  border-radius: 3px;
  cursor: pointer;
  outline: none;

  ion-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    opacity: 0;
    transition: all .2s;
    height: unset;
    font-size: 120%;
    right: 0;
    width: 0;
  }

  &:hover,
  &:focus {
    padding: .3em 1.8em .3em .7em;
    background-color: hsla(0, 0%, 100%, .2);
    border-color: transparent;

    ion-icon {
      opacity: 1;
      right: 0.3em;
      width: 1em;
    }
  }

}
</style>
