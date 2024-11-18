<script>
	// This component contains the action icons that can be found on the top right of the page

	import QuickActionIcon from './QuickActionIcon.svelte';
</script>

<div class="quick-actions-container">
	<QuickActionIcon icon={'help'} tooltipText={'assistenza'} />
	<QuickActionIcon icon={'settings'} tooltipText={'impostazioni'} />
	<QuickActionIcon icon={'apps'} tooltipText={'applicazioni'} />
</div>

<style>
	.quick-actions-container {
		grid-area: quick-actions;
		align-self: center;
		display: flex;
		justify-content: space-between;
		width: fit-content;
		gap: 8px;
	}
</style>
