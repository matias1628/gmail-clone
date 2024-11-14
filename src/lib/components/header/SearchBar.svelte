<script>
	// A searchbar component that can be used to search for specific text in the emails
	import { searchQuery } from '$lib/stores/searchStore.js';

	let inputText = '';
	let inputPlaceholder = 'Cerca nella posta';

	// Update the store whenever the input changes
	$: searchQuery.set(inputText);
</script>

<div class="search-bar-container">
	<button class="search-bar-button">
		<span class="material-symbols-outlined"> search </span>
	</button>
	<input type="text" class="search-input" placeholder={inputPlaceholder} bind:value={inputText} />
	<button class="search-bar-button">
		<span class="material-symbols-outlined"> tune </span>
	</button>
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

	.search-bar-button {
		border: none;
		background: none;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		text-decoration: none;
		padding: 0.3rem;
		cursor: pointer;
	}

	.search-bar-button:hover {
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
