<div class="quick-actions-container">
	<a href="#">
		<span class="material-symbols-outlined"> help </span>
	</a>
	<a href="#">
		<span class="material-symbols-outlined"> settings </span>
	</a>
	<a href="#">
		<span class="material-symbols-outlined"> apps </span>
	</a>
</div>

<style>
	:root {
		--quick-actions-icons-color: #5f6368;
		--icons-hover-bgcolor: #e8eaed;
	}

	.quick-actions-container {
		display: flex;
		justify-content: space-between;
		width: fit-content;
		gap: 10px;
	}

	a {
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.4rem;
		border-radius: 50%;
		height: 26px;
		width: 26px;
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
