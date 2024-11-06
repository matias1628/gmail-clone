<script>
	import QuickActionIcon from './QuickActionIcon.svelte';
</script>

<div class="quick-actions-container">
	<!-- <a href="#">
		<span class="material-symbols-outlined"> help </span>
	</a>
	<a href="#">
		<span class="material-symbols-outlined"> settings </span>
	</a>
	<a href="#">
		<span class="material-symbols-outlined"> apps </span>
	</a> -->
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

	/* a {
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		height: 40px;
		width: 40px;
	}

	a:hover {
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
