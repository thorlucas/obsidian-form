<script lang="ts">
	import { setContext } from 'svelte';
	import type { Form } from '../form';
	import FormElement from './FormElement.svelte';

	export let form: Form;
	export let update: (property: string, value: string) => void;

	setContext('update', update);
</script>

<div class="obsidian-form">
	{#if form.title}
		<h2>{ form.title }</h2>
	{/if}

	{#each form.elements as formEl}
		<FormElement el={ formEl } />
	{/each}
</div>
