<script>
	import QuickActionIcon from './QuickActionIcon.svelte';
</script>

<div class="quick-actions-container">
	<QuickActionIcon icon={'help'} tooltipText={'assistenza'} />
	<QuickActionIcon icon={'settings'} tooltipText={'impostazioni'} />
	<QuickActionIcon icon={'apps'} tooltipText={'applicazioni'} />
</div>

<style>
	:root {
		--quick-actions-icons-color: #5f6368;
		--icons-hover-bgcolor: #e8eaed;
	}

	.quick-actions-container {
		grid-area: quick-actions;
		align-self: center;
		display: flex;
		justify-content: space-between;
		width: fit-content;
		gap: 8px;
	}
</style>
