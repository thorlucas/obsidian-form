<script lang="ts">
	import type { FormElement } from '../form';
	import TextInputField from './TextInputField.svelte';

	const fieldMap = {
		'input.text': TextInputField,
	};

	export let el: FormElement;
	
	let comp = fieldMap[el.type];
</script>

<svelte:component this={comp} el={ el }/>
