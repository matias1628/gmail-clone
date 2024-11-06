<script>
	import Tooltip from '../reusable/Tooltip.svelte';

	export let icon; // The Material icon name
	export let tooltipText; // Text that appears in the tooltip

	// Control tooltip visibility
	let isTooltipVisible = false;
</script>

<div
	class="icon-wrapper"
	role="button"
	tabindex="0"
	on:mouseenter={() => {
		isTooltipVisible = true;
	}}
	on:mouseleave={() => {
		isTooltipVisible = false;
	}}
>
	<span class="material-symbols-outlined">{icon}</span>
	{#if isTooltipVisible}
		<Tooltip text={tooltipText} />
	{/if}
</div>

<style>
	:root {
		--quick-actions-icons-color: #5f6368;
		--icons-hover-bgcolor: #e8eaed;
	}

	.icon-wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border-radius: 50%;
		height: 40px;
		width: 40px;
	}

	.icon-wrapper:hover {
		background-color: var(--icons-hover-bgcolor);
	}

	.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;

		color: var(--quick-actions-icons-color);
		font-size: 1.5rem;
		vertical-align: middle;
	}
</style>
