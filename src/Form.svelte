<script lang="ts">
	import type { Form } from './form';
	export let form: Form;

	$: {
		console.log("Hello from Svelte");
	}
</script>

<div class="obsidian-form">
	{#if form.title}
		<h2>{ form.title }</h2>
	{/if}
</div>
