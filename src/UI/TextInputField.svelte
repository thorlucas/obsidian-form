<script lang="ts">
import { getContext } from "svelte";
	import type { TextInputField } from "../form";

	export let el: TextInputField;

	const update: (property: string, value: string) => void = getContext('update');

	let value: string;
</script>

<div class="form-group">
	<label for={ el.binds }>
		{ el.label }
	</label>
	<input
		id={ el.binds } name={ el.binds } type="text"
		bind:value={ value }
		on:blur={ () => { update(el.binds, value) } }
	/>
</div>
