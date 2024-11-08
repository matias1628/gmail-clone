<script>
	import { fade } from 'svelte/transition';
	export let text;
</script>

<div class="tooltip" transition:fade>
	{text}
</div>

<style>
	.tooltip {
		position: absolute;
		bottom: -30px;
		left: 50%;
		transform: translateX(-50%);
		background-color: #4e4e4e;
		color: #fff;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 0.8rem;
		white-space: nowrap;
		z-index: 1;
	}
</style>
