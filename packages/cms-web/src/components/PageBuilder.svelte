<script lang="ts">
import FullWidthModule from './FullWidthModule.svelte'

const pageConfig: UI.PageConfig = {
  sections: [
    {
      type: 'full-width',
      module: {
        type: 'full-width-header',
        title: 'Lorem ipsum',
        subTitle: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad aut debitis dicta exercitationem expedita laudantium magni modi molestiae necessitatibus nisi nobis non, praesentium reiciendis, repellat suscipit ut velit voluptas.',
        button1: {
          text: 'Goto'
        },
        button2: {
          text: 'Link',
          link: 'https://google.com'
        },
        style: {
          backgroundColor: '#7ebec5'
        }
      },
    },
  ],
}
</script>


<div class="page-container">
  {#each pageConfig.sections as section}
    {#if section.type === 'full-width'}
      <FullWidthModule module={section.module} />
    {/if}
  {/each}
</div>

<style>

</style>
