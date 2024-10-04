<div class="logo-section">
	<a href="#" class="menu-anchor">
		<span class="material-symbols-outlined"> menu </span>
	</a>
	<a href="#" class="logo-anchor">
		<img src="/gmail-logo.png" alt="Logo" class="logo" />
	</a>
</div>

<style>
	:root {
		--quick-actions-icons-color: #5f6368;
		--icons-hover-bgcolor: #e8eaed;
	}

	.logo-section {
		grid-area: logo-section;
		display: flex;
		align-items: center;
		gap: 8px;
		margin-left: 10px;
	}

	.menu-anchor {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		padding: 0.6rem;
		text-decoration: none;
	}

	.menu-anchor:hover {
		background-color: var(--icons-hover-bgcolor);
	}

	.logo-anchor {
		display: flex;
		align-items: center;
	}

	.logo {
		height: 40px;
	}

	.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;

		color: var(--quick-actions-icons-color);
	}
</style>
