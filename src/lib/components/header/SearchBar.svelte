<script>
	let inputPlaceholder = 'Cerca nella posta';
</script>

<div class="search-bar-container">
	<a href="#" class="search-button">
		<span class="material-symbols-outlined"> search </span>
	</a>
	<input type="text" class="search-input" placeholder={inputPlaceholder} />
	<a href="#" class="filter-options-button">
		<span class="material-symbols-outlined"> tune </span>
	</a>
</div>

<style>
	:root {
		--icons-color: #444746;
		--icons-hover-bgcolor: #dde3ec;
		--search-bar-bgcolor: #eaf1fb;
	}

	.search-bar-container {
		grid-area: searchbar;
		display: flex;
		width: 90%;
		max-width: 720px;
		padding: 0.4rem 0.6rem;
		border-radius: 800px;
		background-color: var(--search-bar-bgcolor);
		flex: 1;
	}

	a {
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		padding: 0.3rem;
	}

	a:hover {
		background-color: var(--icons-hover-bgcolor);
	}

	.search-input {
		border: none;
		outline: none;
		background-color: var(--search-bar-bgcolor);
		font-size: 1rem;
		flex: 1;
	}

	.material-symbols-outlined {
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;

		color: var(--icons-color);
	}
</style>
