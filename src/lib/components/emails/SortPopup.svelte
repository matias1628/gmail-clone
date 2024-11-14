<script>
	// This component provides a popup with sorting options for emails. It allows the user to sort emails
	// by "Newest to Oldest" or "Oldest to Newest" by dispatching a custom 'sort' event with the chosen order.

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sortByNewest() {
		dispatch('sort', { order: 'newest' });
	}

	function sortByOldest() {
		dispatch('sort', { order: 'oldest' });
	}
</script>

<div class="popup">
	<button on:click={sortByNewest}>Newest to Oldest</button>
	<button on:click={sortByOldest}>Oldest to Newest</button>
</div>

<style>
	.popup {
		position: absolute;
		top: 100%;
		left: 100%;
		transform: translateY(-50%);
		background-color: white;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		border-radius: 8px;
		padding: 8px;
		display: flex;
		flex-direction: column;
		z-index: 10;
		min-width: 200px;
	}

	button {
		padding: 8px;
		cursor: pointer;
		text-align: left;
		border: none;
		background: none;
		width: 100%;
	}

	button:hover {
		background-color: #f0f0f0;
	}
</style>
